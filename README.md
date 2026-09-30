# RessureIt

RessureIt is an application that analyzes resumes, extracts information, and utilizes AI to provide insights, next best actions, and interview prep.

## Features
- **Frontend**: Modern web interface built with React/Next.js and Tailwind CSS. Includes dashboards for Overview, Analysis, Assessments, Interview Prep, and more.
- **Backend**: Fast and scalable Python backend using FastAPI.
- **Document Processing**: Uses `pypdf`, `pytesseract`, and `opencv` to read and parse PDF documents and extract text via OCR.
- **AI Integration**: Connects to AI providers (like OpenRouter and Ollama) using the `openai` SDK to analyze text and provide intelligent feedback.

## Project Structure
- `backend/`: FastAPI Python server.
- `bolt_frontend/`: Legacy/alternative frontend.
- `new_frontend/`: Next.js React frontend.

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your database and AI API keys.
5. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd new_frontend/project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
