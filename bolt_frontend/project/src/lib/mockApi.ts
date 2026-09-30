import type {
  AnalysisData,
  Assessment,
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
  VerificationRecord,
} from '@/types';
import {
  analysisData,
  assessments,
  dashboardData,
  evidence,
  gaps,
  interviewPrep,
  interviewQuestions,
  learning,
  nextBestAction,
  requirements,
  resumeOptimization,
  skills,
  verificationHistory,
} from '@/data/mockData';

// Mock API service layer.
// Each function simulates a network request with a small delay.
// Later these can be replaced with real fetch calls to the FastAPI backend:
//   GET /api/v1/dashboard
//   GET /api/v1/analysis/{job_id}
//   GET /api/v1/requirements/{job_id}
//   GET /api/v1/skills/{job_id}
//   GET /api/v1/evidence/{job_id}
//   GET /api/v1/actions/{job_id}
//   etc.

const MOCK_LATENCY = 120;

function delay<T>(value: T, ms = MOCK_LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const mockApi = {
  getDashboard(): Promise<DashboardData> {
    return delay(dashboardData);
  },
  getAnalysis(): Promise<AnalysisData> {
    return delay(analysisData);
  },
  getRequirements(): Promise<Requirement[]> {
    return delay(requirements);
  },
  getSkills(): Promise<Skill[]> {
    return delay(skills);
  },
  getEvidence(): Promise<EvidenceItem[]> {
    return delay(evidence);
  },
  getGaps(): Promise<SkillGap[]> {
    return delay(gaps);
  },
  getNextBestAction(): Promise<NextBestAction> {
    return delay(nextBestAction);
  },
  getLearningPath(): Promise<LearningItem[]> {
    return delay(learning);
  },
  getAssessments(): Promise<Assessment[]> {
    return delay(assessments);
  },
  getVerificationHistory(): Promise<VerificationRecord[]> {
    return delay(verificationHistory);
  },
  getInterviewQuestions(): Promise<InterviewQuestion[]> {
    return delay(interviewQuestions);
  },
  getInterviewPrep(): Promise<InterviewPrep> {
    return delay(interviewPrep);
  },
  getResumeSuggestions(): Promise<ResumeOptimization> {
    return delay(resumeOptimization);
  },
};
