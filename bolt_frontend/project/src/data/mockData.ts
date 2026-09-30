import type {
  AnalysisData,
  Assessment,
  Candidate,
  DashboardData,
  EvidenceItem,
  InterviewPrep,
  InterviewQuestion,
  LearningItem,
  NextBestAction,
  Requirement,
  ResumeOptimization,
  Skill,
  SkillGap,
  TargetRole,
  VerificationRecord,
  Project,
} from '@/types';

export const candidate: Candidate = {
  id: 'cand_001',
  name: 'Arun Kumar',
  experienceLevel: 'Student / Entry Level',
  avatarInitials: 'AK',
};

export const targetRole: TargetRole = {
  company: 'Acme Technologies',
  role: 'Backend / AI Engineer',
  lastAnalyzed: '2 minutes ago',
  analysisStatus: 'Analysis complete',
};

export const projects: Project[] = [
  {
    name: 'OCR Parser Engine',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR'],
    description:
      'Invoice extraction pipeline using Python, OpenCV and Tesseract OCR.',
  },
  {
    name: 'Local Mind',
    technologies: ['RAG', 'Ollama', 'LangChain', 'ChromaDB'],
    description: 'Local RAG assistant using Ollama, LangChain and ChromaDB.',
  },
  {
    name: 'Student Academic Dashboard',
    technologies: ['React', 'Node.js', 'MySQL', 'REST APIs'],
    description: 'Full-stack student dashboard with REST APIs and MySQL.',
  },
  {
    name: 'Phishing Website Detector',
    technologies: ['Python', 'Machine Learning', 'Random Forest', 'SVM', 'XGBoost'],
    description: 'ML-based phishing detection with ensemble models.',
  },
];

export const requirements: Requirement[] = [
  {
    skill: 'Python',
    importance: 'Required',
    candidateState: 'DEMONSTRATED',
    matchState: 'MATCH',
    evidence: 'FastAPI backend and ML projects',
  },
  {
    skill: 'FastAPI',
    importance: 'Required',
    candidateState: 'DEMONSTRATED',
    matchState: 'MATCH',
    evidence: 'Backend API project',
  },
  {
    skill: 'SQL',
    importance: 'Required',
    candidateState: 'DEMONSTRATED',
    matchState: 'PARTIAL_MATCH',
    evidence: 'MySQL student dashboard',
  },
  {
    skill: 'REST APIs',
    importance: 'Required',
    candidateState: 'DEMONSTRATED',
    matchState: 'MATCH',
    evidence: 'Student Academic Dashboard',
  },
  {
    skill: 'Docker',
    importance: 'Required',
    candidateState: 'CLAIMED',
    matchState: 'NO_EVIDENCE',
    evidence: null,
  },
  {
    skill: 'Machine Learning',
    importance: 'Required',
    candidateState: 'DEMONSTRATED',
    matchState: 'MATCH',
    evidence: 'Phishing detection ML project',
  },
  {
    skill: 'AWS',
    importance: 'Preferred',
    candidateState: 'CLAIMED',
    matchState: 'NO_EVIDENCE',
    evidence: null,
  },
  {
    skill: 'React',
    importance: 'Preferred',
    candidateState: 'DEMONSTRATED',
    matchState: 'MATCH',
    evidence: 'Student Academic Dashboard',
  },
  {
    skill: 'Cloud Deployment',
    importance: 'Preferred',
    candidateState: 'NO_EVIDENCE',
    matchState: 'NO_EVIDENCE',
    evidence: null,
  },
];

export const skills: Skill[] = [
  {
    name: 'Python',
    state: 'DEMONSTRATED',
    importance: 'Required',
    matchState: 'MATCH',
    evidenceCount: 3,
    verified: false,
  },
  {
    name: 'FastAPI',
    state: 'DEMONSTRATED',
    importance: 'Required',
    matchState: 'MATCH',
    evidenceCount: 1,
    verified: false,
  },
  {
    name: 'Machine Learning',
    state: 'DEMONSTRATED',
    importance: 'Required',
    matchState: 'MATCH',
    evidenceCount: 1,
    verified: false,
  },
  {
    name: 'SQL',
    state: 'VERIFIED',
    importance: 'Required',
    matchState: 'PARTIAL_MATCH',
    evidenceCount: 1,
    verified: true,
  },
  {
    name: 'REST APIs',
    state: 'DEMONSTRATED',
    importance: 'Required',
    matchState: 'MATCH',
    evidenceCount: 1,
    verified: false,
  },
  {
    name: 'Docker',
    state: 'CLAIMED',
    importance: 'Required',
    matchState: 'NO_EVIDENCE',
    evidenceCount: 0,
    verified: false,
  },
  {
    name: 'AWS',
    state: 'CLAIMED',
    importance: 'Preferred',
    matchState: 'NO_EVIDENCE',
    evidenceCount: 0,
    verified: false,
  },
  {
    name: 'React',
    state: 'DEMONSTRATED',
    importance: 'Preferred',
    matchState: 'MATCH',
    evidenceCount: 1,
    verified: false,
  },
  {
    name: 'Cloud Deployment',
    state: 'NO_EVIDENCE',
    importance: 'Preferred',
    matchState: 'NO_EVIDENCE',
    evidenceCount: 0,
    verified: false,
  },
  {
    name: 'Java',
    state: 'CLAIMED',
    importance: null,
    matchState: 'NO_EVIDENCE',
    evidenceCount: 0,
    verified: false,
  },
];

export const evidence: EvidenceItem[] = [
  {
    id: 'ev_001',
    skill: 'Python',
    skillState: 'DEMONSTRATED',
    source: 'OCR Parser Engine',
    sourceType: 'Project',
    evidence:
      'Implemented invoice extraction using Python, OpenCV and Tesseract OCR.',
    strength: 'Strong',
  },
  {
    id: 'ev_002',
    skill: 'Python',
    skillState: 'DEMONSTRATED',
    source: 'Phishing Website Detector',
    sourceType: 'Project',
    evidence:
      'Built phishing detection models using Python, Random Forest, SVM and XGBoost.',
    strength: 'Strong',
  },
  {
    id: 'ev_003',
    skill: 'Python',
    skillState: 'DEMONSTRATED',
    source: 'Local Mind',
    sourceType: 'Project',
    evidence:
      'Developed RAG pipeline in Python using LangChain and ChromaDB.',
    strength: 'Strong',
  },
  {
    id: 'ev_004',
    skill: 'FastAPI',
    skillState: 'DEMONSTRATED',
    source: 'Backend project',
    sourceType: 'Project',
    evidence:
      'Built REST APIs using FastAPI for document processing and AI workflows.',
    strength: 'Strong',
  },
  {
    id: 'ev_005',
    skill: 'SQL',
    skillState: 'VERIFIED',
    source: 'Student Academic Dashboard',
    sourceType: 'Project',
    evidence:
      'Designed MySQL schema and queries for student academic records.',
    strength: 'Moderate',
  },
  {
    id: 'ev_006',
    skill: 'Machine Learning',
    skillState: 'DEMONSTRATED',
    source: 'Phishing Website Detector',
    sourceType: 'Project',
    evidence:
      'Trained and compared ensemble ML models for phishing classification.',
    strength: 'Strong',
  },
  {
    id: 'ev_007',
    skill: 'REST APIs',
    skillState: 'DEMONSTRATED',
    source: 'Student Academic Dashboard',
    sourceType: 'Project',
    evidence:
      'Implemented REST API endpoints with Node.js for the dashboard frontend.',
    strength: 'Strong',
  },
  {
    id: 'ev_008',
    skill: 'React',
    skillState: 'DEMONSTRATED',
    source: 'Student Academic Dashboard',
    sourceType: 'Project',
    evidence:
      'Built interactive frontend dashboard UI with React.',
    strength: 'Moderate',
  },
];

export const gaps: SkillGap[] = [
  {
    skill: 'Docker',
    importance: 'Required',
    currentState: 'CLAIMED',
    matchState: 'NO_EVIDENCE',
    whyItMatters:
      'The target role explicitly lists containerization as a required skill.',
    currentStateDescription: 'No evidence',
    targetState: 'DEMONSTRATED',
    suggestedAction: 'Containerize an existing FastAPI project.',
  },
  {
    skill: 'AWS',
    importance: 'Preferred',
    currentState: 'CLAIMED',
    matchState: 'NO_EVIDENCE',
    whyItMatters:
      'Cloud deployment experience is preferred for this AI engineering role.',
    currentStateDescription: 'No evidence',
    targetState: 'DEMONSTRATED',
    suggestedAction: 'Deploy an existing project to AWS (EC2 or Lambda).',
  },
  {
    skill: 'Advanced SQL',
    importance: 'Required',
    currentState: 'DEMONSTRATED',
    matchState: 'PARTIAL_MATCH',
    whyItMatters:
      'The role expects advanced SQL beyond basic CRUD queries.',
    currentStateDescription: 'Partial match — MySQL student dashboard',
    targetState: 'DEMONSTRATED (advanced)',
    suggestedAction: 'Practice window functions, CTEs, and query optimization.',
  },
];

export const nextBestAction: NextBestAction = {
  id: 'nba_001',
  title: 'Containerize your FastAPI project',
  why: 'Docker is required for the target role, but your resume currently contains no evidence of Docker.',
  currentState: 'CLAIMED',
  action:
    'Add Dockerfile and docker-compose configuration to an existing FastAPI project.',
  verification: 'Successfully build and run the API inside a container.',
  afterCompletion: 'Docker → DEMONSTRATED',
  relatedSkill: 'Docker',
  relatedImportance: 'Required',
};

export const learning: LearningItem[] = [
  {
    id: 'learn_001',
    title: 'Docker Fundamentals',
    status: 'Not Started',
    estimatedEffort: '3 hours',
    relatedSkill: 'Docker',
    relatedGap: 'Docker',
    description:
      'Learn containers, images, Dockerfile basics, and docker-compose.',
  },
  {
    id: 'learn_002',
    title: 'Dockerize FastAPI',
    status: 'Recommended',
    estimatedEffort: '2 hours',
    relatedSkill: 'Docker',
    relatedGap: 'Docker',
    description:
      'Hands-on: containerize a FastAPI app with multi-stage builds.',
  },
  {
    id: 'learn_003',
    title: 'SQL Advanced Queries',
    status: 'In Progress',
    estimatedEffort: '4 hours',
    relatedSkill: 'SQL',
    relatedGap: 'Advanced SQL',
    description:
      'Window functions, CTEs, indexing, and query optimization.',
  },
  {
    id: 'learn_004',
    title: 'AWS Fundamentals',
    status: 'Optional',
    estimatedEffort: '5 hours',
    relatedSkill: 'AWS',
    relatedGap: 'AWS',
    description:
      'EC2, IAM, S3, and deploying a containerized service to AWS.',
  },
];

export const assessments: Assessment[] = [
  {
    id: 'asmt_001',
    title: 'Python Backend Assessment',
    skill: 'Python',
    questionCount: 12,
    status: 'Not Started',
    completedDate: null,
    score: null,
  },
  {
    id: 'asmt_002',
    title: 'SQL Assessment',
    skill: 'SQL',
    questionCount: 15,
    status: 'In Progress',
    completedDate: null,
    score: null,
  },
  {
    id: 'asmt_003',
    title: 'FastAPI Assessment',
    skill: 'FastAPI',
    questionCount: 10,
    status: 'Completed',
    completedDate: '2026-09-20',
    score: 9,
  },
];

export const verificationHistory: VerificationRecord[] = [
  {
    id: 'ver_001',
    skill: 'SQL',
    method: 'SQL Assessment',
    date: '2026-09-20',
    result: 'Passed — 9/10',
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq_001',
    category: 'Technical',
    topic: 'Python',
    question: 'How do you structure a large Python backend codebase for maintainability?',
  },
  {
    id: 'iq_002',
    category: 'Technical',
    topic: 'FastAPI',
    question: 'Explain how dependency injection works in FastAPI and when you would use it.',
  },
  {
    id: 'iq_003',
    category: 'Technical',
    topic: 'SQL',
    question: 'Write a query to find the top 3 students by average score using a window function.',
  },
  {
    id: 'iq_004',
    category: 'Technical',
    topic: 'Machine Learning',
    question: 'How do you handle class imbalance in a phishing detection dataset?',
  },
  {
    id: 'iq_005',
    category: 'Technical',
    topic: 'REST APIs',
    question: 'How do you design API versioning and handle breaking changes?',
  },
  {
    id: 'iq_006',
    category: 'Technical',
    topic: 'Docker',
    question: 'Explain multi-stage builds and how they reduce final image size.',
  },
  {
    id: 'iq_007',
    category: 'Project',
    topic: 'OCR Parser Engine',
    question: 'Explain how your OCR pipeline handles noisy invoice images.',
  },
  {
    id: 'iq_008',
    category: 'Project',
    topic: 'OCR Parser Engine',
    question: 'What preprocessing steps did you apply before passing images to Tesseract?',
  },
  {
    id: 'iq_009',
    category: 'Project',
    topic: 'Local Mind',
    question: 'Why did you use ChromaDB in your RAG project?',
  },
  {
    id: 'iq_010',
    category: 'Project',
    topic: 'Local Mind',
    question: 'How did you chunk documents for the RAG pipeline?',
  },
  {
    id: 'iq_011',
    category: 'Project',
    topic: 'Student Academic Dashboard',
    question: 'How did you design the REST API for the academic dashboard?',
  },
  {
    id: 'iq_012',
    category: 'Company',
    topic: 'Acme Technologies',
    question: 'How would you deploy your FastAPI service at Acme?',
    context: 'Acme uses containerized microservices on AWS.',
  },
  {
    id: 'iq_013',
    category: 'Company',
    topic: 'Acme Technologies',
    question: 'What would you improve first in our document processing pipeline?',
    context: 'Acme processes invoices and contracts at scale.',
  },
];

export const interviewPrep: InterviewPrep = {
  company: 'Acme Technologies',
  role: 'Backend / AI Engineer',
  technicalTopics: ['Python', 'FastAPI', 'SQL', 'Machine Learning', 'REST APIs', 'Docker'],
  projectQuestions: [
    {
      project: 'OCR Parser Engine',
      questions: [
        'Explain how your OCR pipeline handles noisy invoice images.',
        'What preprocessing steps did you apply before passing images to Tesseract?',
      ],
    },
    {
      project: 'Local Mind',
      questions: [
        'Why did you use ChromaDB in your RAG project?',
        'How did you chunk documents for the RAG pipeline?',
      ],
    },
    {
      project: 'Student Academic Dashboard',
      questions: [
        'How did you design the REST API for the academic dashboard?',
      ],
    },
  ],
  companyQuestions: [
    'How would you deploy your FastAPI service at Acme?',
    'What would you improve first in our document processing pipeline?',
  ],
};

export const resumeOptimization: ResumeOptimization = {
  currentResume: `Arun Kumar
Student / Entry Level

Experience
- Worked on backend development.
- Built a student dashboard.

Projects
- OCR Parser Engine
- Local Mind
- Phishing Website Detector`,
  targetJobDescription: `Acme Technologies — Backend / AI Engineer

Required:
- Python, FastAPI, SQL, REST APIs, Docker, Machine Learning

Preferred:
- AWS, React, Cloud deployment`,
  suggestions: [
    {
      id: 'rs_001',
      section: 'Experience',
      current: 'Worked on backend development.',
      suggested:
        'Developed REST APIs using FastAPI for document processing workflows.',
      reason:
        'The suggestion is supported by demonstrated backend experience in the OCR Parser Engine project.',
      evidenceRef: 'OCR Parser Engine — FastAPI',
    },
    {
      id: 'rs_002',
      section: 'Projects',
      current: 'OCR Parser Engine',
      suggested:
        'OCR Parser Engine — Implemented invoice extraction using Python, OpenCV and Tesseract OCR.',
      reason:
        'Adds concrete technologies and outcomes traceable to project evidence.',
      evidenceRef: 'Evidence item: ev_001',
    },
    {
      id: 'rs_003',
      section: 'Projects',
      current: 'Local Mind',
      suggested:
        'Local Mind — Built a local RAG assistant using LangChain, Ollama and ChromaDB.',
      reason:
        'Surfaces AI/RAG experience relevant to the Backend / AI Engineer role.',
      evidenceRef: 'Evidence item: ev_003',
    },
    {
      id: 'rs_004',
      section: 'Projects',
      current: 'Phishing Website Detector',
      suggested:
        'Phishing Website Detector — Trained ensemble ML models (Random Forest, SVM, XGBoost) for phishing classification.',
      reason:
        'Quantifies ML experience matching the required Machine Learning skill.',
      evidenceRef: 'Evidence item: ev_006',
    },
  ],
};

export const dashboardData: DashboardData = {
  summary: {
    candidate,
    target: targetRole,
    requiredSkills: 6,
    fullyMatched: 4,
    partialMatch: 1,
    skillGaps: 1,
    evidenceBackedSkills: 7,
    verifiedSkills: 1,
    preferredMatched: 1,
    preferredPartial: 0,
    preferredNoEvidence: 2,
  },
  requirements,
  skills,
  evidence,
  gaps,
  nextBestAction,
  learning,
  assessments,
  verificationHistory,
};

export const analysisData: AnalysisData = {
  candidate,
  target: targetRole,
  jobState: 'COMPLETED',
  timeline: [
    { step: 'uploaded', label: 'Uploaded', status: 'complete' },
    { step: 'extracted', label: 'Extracted', status: 'complete' },
    { step: 'normalized', label: 'Normalized', status: 'complete' },
    { step: 'analyzed', label: 'Analyzed', status: 'complete' },
    { step: 'results', label: 'Results Generated', status: 'complete' },
  ],
  candidateProfile: {
    name: candidate.name,
    experienceLevel: candidate.experienceLevel,
    skills: ['Python', 'FastAPI', 'Machine Learning', 'SQL', 'React', 'Java', 'Docker', 'AWS'],
    projects,
  },
  roleProfile: {
    company: targetRole.company,
    role: targetRole.role,
    required: ['Python', 'FastAPI', 'SQL', 'REST APIs', 'Docker', 'Machine Learning'],
    preferred: ['AWS', 'React', 'Cloud Deployment'],
  },
  requirements,
  evidence,
  gaps,
  nextBestActions: [nextBestAction],
};

// --- DYNAMIC OVERRIDE FROM BACKEND API ---
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('ressure_analysis');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      // Map Backend FinalReport to DashboardData
      if (data.candidate_profile?.name) candidate.name = data.candidate_profile.name;
      if (data.jd_profile?.company) targetRole.company = data.jd_profile.company;
      if (data.jd_profile?.role) targetRole.role = data.jd_profile.role;
      targetRole.analysisStatus = "AI Analysis Complete";
      targetRole.lastAnalyzed = "Just now";
      
      // Map requirements
      if (data.skill_matches && data.skill_matches.length > 0) {
        requirements.length = 0; // Clear mock
        let fullyMatched = 0;
        let partial = 0;
        let skillGaps = 0;
        data.skill_matches.forEach((sm: any, index: number) => {
          let state = 'NO_EVIDENCE';
          if (sm.category === 'MATCHED') { state = 'VERIFIED'; fullyMatched++; }
          else if (sm.category === 'PARTIAL') { state = 'DEMONSTRATED'; partial++; }
          else { skillGaps++; }
          
          requirements.push({
            id: `req_${index}`,
            skill: sm.skill || "Unknown",
            importance: 'Required',
            type: 'Technical',
            candidateState: state as any,
            matchState: (sm.category === 'MATCHED' ? 'MATCH' : sm.category === 'PARTIAL' ? 'PARTIAL_MATCH' : 'NO_EVIDENCE') as any,
            matchReasoning: sm.reasoning || sm.category,
            evidence: sm.evidence || "Analyzed from resume",
            assessmentAvailable: false
          });
        });
        if (dashboardData.summary) {
          dashboardData.summary.fullyMatched = fullyMatched;
          dashboardData.summary.partialMatch = partial;
          dashboardData.summary.skillGaps = skillGaps;
          dashboardData.summary.requiredSkills = requirements.length;
        }
      }
      
      // Update gap analysis string if exists
      if (data.gap_analysis?.missing_required_skills?.length > 0) {
        if (gaps && gaps.length > 0) {
          gaps[0].reasoning = "Missing required skills: " + data.gap_analysis.missing_required_skills.join(", ");
        }
      }

      // Update global dashboardData object fields
      dashboardData.candidate = candidate;
      if (dashboardData.summary) dashboardData.summary.candidate = candidate;
      if (dashboardData.summary) dashboardData.summary.target = targetRole;
      dashboardData.requirements = requirements;
      
      // Map Learning Roadmap
      if (data.learning_roadmap && data.learning_roadmap.length > 0) {
        learning.length = 0; // Clear mock
        data.learning_roadmap.forEach((lr: any, index: number) => {
          let resUrl = "";
          if (lr.resources && lr.resources.length > 0 && lr.resources[0].url) {
            resUrl = lr.resources[0].url;
          }
          learning.push({
            id: `learn_${index}`,
            title: `Learn ${lr.skill}`,
            status: 'Recommended',
            estimatedEffort: lr.estimated_effort || '2 hours',
            relatedSkill: lr.skill,
            relatedGap: lr.skill,
            description: lr.learning_objective || `Master the fundamentals of ${lr.skill}.`,
            url: resUrl
          });
        });
      }
      
    } catch (e) {
      console.error("Failed to parse local analysis data", e);
    }
  }
}

