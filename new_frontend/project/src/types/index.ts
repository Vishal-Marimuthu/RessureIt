// Core domain types for Ressure AI
// Structured so mock data can later be replaced by REST API responses from FastAPI.

export type SkillState = 'CLAIMED' | 'DEMONSTRATED' | 'VERIFIED' | 'NO_EVIDENCE';

export type MatchState =
  | 'MATCH'
  | 'PARTIAL_MATCH'
  | 'NO_EVIDENCE'
  | 'SKILL_GAP';

export type Importance = 'Required' | 'Preferred';

export type AnalysisJobState =
  | 'UPLOADING'
  | 'VALIDATING'
  | 'EXTRACTING'
  | 'NORMALIZING'
  | 'INGESTED'
  | 'ANALYZING'
  | 'COMPLETED'
  | 'FAILED';

export type EvidenceStrength = 'Strong' | 'Moderate' | 'Weak';

export type EvidenceSourceType =
  | 'Project'
  | 'Experience'
  | 'Achievement'
  | 'Course'
  | 'Certification';

export type LearningStatus =
  | 'Not Started'
  | 'Recommended'
  | 'In Progress'
  | 'Completed'
  | 'Optional';

export type AssessmentStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Candidate {
  id: string;
  name: string;
  experienceLevel: string;
  avatarInitials: string;
}

export interface TargetRole {
  company: string;
  role: string;
  lastAnalyzed: string;
  analysisStatus: string;
}

export interface Requirement {
  skill: string;
  importance: Importance;
  candidateState: SkillState;
  matchState: MatchState;
  evidence: string | null;
}

export interface Skill {
  name: string;
  state: SkillState;
  importance: Importance | null;
  matchState: MatchState;
  evidenceCount: number;
  verified: boolean;
}

export interface EvidenceItem {
  id: string;
  skill: string;
  skillState: SkillState;
  source: string;
  sourceType: EvidenceSourceType;
  evidence: string;
  strength: EvidenceStrength;
}

export interface SkillGap {
  skill: string;
  importance: Importance;
  currentState: SkillState;
  matchState: MatchState;
  whyItMatters: string;
  currentStateDescription: string;
  targetState: string;
  suggestedAction: string;
}

export interface NextBestAction {
  id: string;
  title: string;
  why: string;
  currentState: SkillState;
  action: string;
  verification: string;
  afterCompletion: string;
  relatedSkill: string;
  relatedImportance: Importance;
}

export interface LearningItem {
  id: string;
  title: string;
  status: LearningStatus;
  estimatedEffort: string;
  relatedSkill: string;
  relatedGap: string;
  description: string;
}

export interface Assessment {
  id: string;
  title: string;
  skill: string;
  questionCount: number;
  status: AssessmentStatus;
  completedDate: string | null;
  score: number | null;
}

export interface VerificationRecord {
  id: string;
  skill: string;
  method: string;
  date: string;
  result: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'Technical' | 'Project' | 'Company';
  topic: string;
  question: string;
  context?: string;
}

export interface InterviewPrep {
  company: string;
  role: string;
  technicalTopics: string[];
  projectQuestions: { project: string; questions: string[] }[];
  companyQuestions: string[];
}

export interface ResumeSuggestion {
  id: string;
  section: string;
  current: string;
  suggested: string;
  reason: string;
  evidenceRef: string;
}

export interface ResumeOptimization {
  currentResume: string;
  targetJobDescription: string;
  suggestions: ResumeSuggestion[];
}

export interface AnalysisTimelineStep {
  step: string;
  label: string;
  status: 'complete' | 'pending' | 'failed';
}

export interface AnalysisSummary {
  candidate: Candidate;
  target: TargetRole;
  requiredSkills: number;
  fullyMatched: number;
  partialMatch: number;
  skillGaps: number;
  evidenceBackedSkills: number;
  verifiedSkills: number;
  preferredMatched: number;
  preferredPartial: number;
  preferredNoEvidence: number;
}

export interface DashboardData {
  summary: AnalysisSummary;
  requirements: Requirement[];
  skills: Skill[];
  evidence: EvidenceItem[];
  gaps: SkillGap[];
  nextBestAction: NextBestAction;
  learning: LearningItem[];
  assessments: Assessment[];
  verificationHistory: VerificationRecord[];
}

export interface AnalysisData {
  candidate: Candidate;
  target: TargetRole;
  jobState: AnalysisJobState;
  timeline: AnalysisTimelineStep[];
  candidateProfile: {
    name: string;
    experienceLevel: string;
    skills: string[];
    projects: Project[];
  };
  roleProfile: {
    company: string;
    role: string;
    required: string[];
    preferred: string[];
  };
  requirements: Requirement[];
  evidence: EvidenceItem[];
  gaps: SkillGap[];
  nextBestActions: NextBestAction[];
}

export interface Project {
  name: string;
  technologies: string[];
  description: string;
}
