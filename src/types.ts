export interface SurveyQuestion {
  c: number; // Category index (1-6)
  t: 'L' | 'R' | 'V'; // Question type
  q: string; // Question text
  left?: string; // Dilemma left
  right?: string; // Dilemma right
  descL?: string; // Dilemma desc left
  descR?: string; // Dilemma desc right
  isCrossValidation?: boolean;
  crossValidationTargetIndex?: number;
}

export interface AnswerData {
  value: number;
  latencyMs: number;
}

export interface PersonaMatch {
  type: string;
  emoji: string;
  description: string;
}

export interface SurveyResultContent {
  persona: string;
  emoji: string;
  hashtags: string[];
  headline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  workManual: string[];
  worstMatch: {
    type: string;
    description: string;
    handling: string;
  };
  bestMatch: {
    type: string;
    emoji: string;
    description: string;
  };
  leadershipFit: {
    role: string;
    score: number;
    risk: string;
  }[];
}

export interface SurveyConfig {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string; // rich intro description
  color: string;
  icon: string;
  keyPoints?: { icon: string; title: string; description: string }[];
  categories: string[];
  questions: SurveyQuestion[];
  getResultContent: (averageScore: number, categoryScores: number[], answers?: Record<number, AnswerData>) => SurveyResultContent;
}

export interface PersonaDetail {
  id: string;
  surveyId: string;
  name: string;
  emoji: string;
  shortDesc: string;
  longDescription: string;
}

export interface BlogPost {
  surveyId: string;
  title: string;
  subtitle: string;
  emoji: string;
  readTime: string;
  sections: BlogSection[];
  relatedPersonas: string[];
}

export interface BlogSection {
  heading: string;
  emoji: string;
  body: string;
  highlight?: string; // pull-quote
}
