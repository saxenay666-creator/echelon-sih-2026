export type Severity = 'High' | 'Medium' | 'Low';

export type ProblemStatus =
  | 'New'
  | 'AI Analyzed'
  | 'Open for Solutions'
  | 'Solution Selected'
  | 'Prototype'
  | 'Government Review'
  | 'Pilot'
  | 'Implemented'
  | 'Solved';

export interface Problem {
  id: string;
  title: string;
  district: string;
  state: string;
  village?: string;
  pin?: string;
  cat: string;
  subcat?: string;
  sev: Severity;
  date: string;
  status: ProblemStatus;
  tech: string[];
  students: number;
  solutions: number;
  description?: string;
  evidenceCount?: number;
  affectedPopulation?: string;
  department?: string;
  reportedBy?: string;
  upvotes?: number;
}

export interface Idea {
  id: string;
  title: string;
  problem: string;
  problemId?: string;
  uni: string;
  team: string;
  tech: string[];
  impact: string;
  cost: string;
  match: number;
  proto: string;
  interest: number;
  description?: string;
  mentor?: string;
  stage?: string;
}

export interface DistrictData {
  name: string;
  total: number;
  unresolved: number;
  inProgress: number;
  solved: number;
}

export interface CategoryData {
  name: string;
  count: number;
}

export interface LeaderboardStudent {
  name: string;
  uni: string;
  skills: string;
  solved: number;
  ideas: number;
  projects: number;
  credits: number;
}

export interface LeaderboardUni {
  name: string;
  accepted: number;
  solutions: number;
  projects: number;
  solved: number;
  credits: number;
}

export interface LeaderboardIndustry {
  name: string;
  selected: number;
  projects: number;
  products: number;
  implementations: number;
  credits: number;
}

export interface LeaderboardGov {
  name: string;
  addressed: number;
  implemented: number;
  satisfaction: string;
  credits: number;
}

export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  time: string;
  category: 'problem' | 'solution' | 'evaluation' | 'system';
  unread?: boolean;
}

export type RoleType = 'Citizen' | 'Student' | 'University' | 'Industry' | 'Government' | 'Admin';
