import os
import json
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Ressure AI Hackathon Demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
AI_MODEL = os.environ.get("AI_MODEL", "openrouter/free") # Use free tier

client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

# --- Pydantic Models for LLM Extraction ---
class JobDescriptionProfile(BaseModel):
    role: str = "Unknown Role"
    company: Optional[str] = None
    required_skills: List[str] = Field(default_factory=list)
    preferred_skills: List[str] = Field(default_factory=list)
    responsibilities: List[str] = Field(default_factory=list)

class CandidateProfile(BaseModel):
    name: str = "Candidate"
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    skills: List[str] = Field(default_factory=list)
    projects: List[dict] = Field(default_factory=list)
    experience: List[dict] = Field(default_factory=list)
    education: List[dict] = Field(default_factory=list)

class SkillMatch(BaseModel):
    skill: str = ""
    category: str = Field(default="MISSING", description="MATCHED, PARTIAL, MISSING, or ADDITIONAL")
    reasoning: str = ""
    evidence: Optional[str] = None

class ResumeGapAnalysis(BaseModel):
    strong_matches: List[str] = Field(default_factory=list)
    partial_matches: List[str] = Field(default_factory=list)
    missing_required_skills: List[str] = Field(default_factory=list)
    missing_preferred_skills: List[str] = Field(default_factory=list)
    additional_candidate_skills: List[str] = Field(default_factory=list)
    improvement_recommendations: List[dict] = Field(default_factory=list)

class EvaluationQuestion(BaseModel):
    skill: str = ""
    question: str = ""

class LearningResource(BaseModel):
    skill: str = ""
    current_level: str = ""
    target_level: str = ""
    learning_objective: str = ""
    estimated_effort: str = ""
    resources: List[dict] = Field(default_factory=list)

class FinalReport(BaseModel):
    jd_profile: JobDescriptionProfile = Field(default_factory=JobDescriptionProfile)
    candidate_profile: CandidateProfile = Field(default_factory=CandidateProfile)
    skill_matches: List[SkillMatch] = Field(default_factory=list)
    gap_analysis: ResumeGapAnalysis = Field(default_factory=ResumeGapAnalysis)
    ats_friendly_resume: str = ""
    knowledge_evaluation: List[EvaluationQuestion] = Field(default_factory=list)
    learning_roadmap: List[LearningResource] = Field(default_factory=list)
    top_3_actions: List[str] = Field(default_factory=list)

import io
import pypdfium2 as pdfium

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text using pypdfium2 and Tesseract OCR"""
    try:
        pdf = pdfium.PdfDocument(file_content)
        text = ""
        for i in range(len(pdf)):
            page = pdf[i]
            page_text = page.get_textpage().get_text_range()
            if page_text:
                text += f"\n--- PAGE {i + 1} ---\n{page_text}"
            
            # Simple heuristic: if page has no text, try OCR
            if not page_text or len(page_text.strip()) < 50:
                try:
                    import pytesseract
                    # Render page to a PIL Image
                    pil_image = page.render(scale=2).to_pil()
                    ocr_text = pytesseract.image_to_string(pil_image)
                    text += f"\n[OCR Extracted for page {i+1}]: {ocr_text}"
                except Exception as e:
                    print(f"OCR failed for page {i + 1}: {e}")
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")

@app.post("/api/analyze")
async def analyze_documents(resume: UploadFile = File(...), jd: UploadFile = File(...)):
    resume_content = await resume.read()
    jd_content = await jd.read()
    
    resume_text = extract_text_from_pdf(resume_content)
    jd_text = extract_text_from_pdf(jd_content)
    
    system_prompt = f"""
You are Ressure AI, an expert career advisor and technical recruiter.
Your objective is to analyze a candidate's Resume and a Target Job Description (JD).
You must output a highly structured JSON response strictly adhering to the exact JSON schema provided below.

CRITICAL RULES:
1. Do NOT fabricate skills, experience, or projects for the candidate.
2. Skill Canonicalization: Normalize obvious variants (e.g., 'React.js' -> 'React').
3. Skill Matching Categories:
   - MATCHED: Evidence exists in resume for a JD requirement.
   - PARTIAL: Related evidence exists, but not exact.
   - MISSING: JD requires it, but no evidence in resume.
   - ADDITIONAL: Candidate has it, but JD doesn't ask for it.
4. ATS Resume Generation: Output a clean, text-only resume based ONLY on verified information.
5. Learning Resources: You MUST include at least one GeeksForGeeks (https://www.geeksforgeeks.org) link for EVERY missing or partial skill in the learning_roadmap resources array. Do NOT invent URLs, construct valid GeeksForGeeks search or topic URLs.

JSON SCHEMA TO FOLLOW:
{json.dumps(FinalReport.model_json_schema(), indent=2)}

Return ONLY a complete JSON object matching the above schema keys exactly.
"""
    
    user_prompt = f"""
--- RESUME TEXT ---
{resume_text}

--- TARGET JOB DESCRIPTION TEXT ---
{jd_text}
"""

    try:
        response = await client.chat.completions.create(
            model=AI_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
        )
        
        content = response.choices[0].message.content
        if not content:
            raise Exception(f"LLM returned an empty response. Finish reason: {response.choices[0].finish_reason}")
            
        result_text = content.strip()
        
        # Clean markdown wrapper if LLM mistakenly adds it
        if result_text.startswith("```json"):
            result_text = result_text[7:]
        if result_text.endswith("```"):
            result_text = result_text[:-3]
            
        try:
            raw_json = json.loads(result_text)
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            raise HTTPException(status_code=500, detail=f"LLM returned invalid JSON: {result_text[:200]}...")
            
        # Pydantic will automatically fill missing lists with empty arrays
        validated_report = FinalReport.model_validate(raw_json)
        return validated_report.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Analysis Failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
