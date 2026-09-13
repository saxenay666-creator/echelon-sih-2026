import { supabase } from '../lib/supabase';
import type { Problem, Idea, Severity, ProblemStatus } from '../types';

const statusMap: Record<string, ProblemStatus> = {
  new: 'New',
  ai_analyzed: 'AI Analyzed',
  open_for_solutions: 'Open for Solutions',
  solution_selected: 'Solution Selected',
  prototype: 'Prototype',
  government_review: 'Government Review',
  pilot: 'Pilot',
  implemented: 'Implemented',
  solved: 'Solved',
};

const normalizeStatus = (value?: string | null): ProblemStatus =>
  statusMap[value ?? ''] ?? (value as ProblemStatus) ?? 'New';

export async function fetchProblems(): Promise<Problem[]> {
  const { data, error } = await supabase.from('problems').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.problem_code || row.id,
    title: row.title || 'Untitled problem',
    district: row.district || '',
    state: row.state || 'Jharkhand',
    village: row.village_city || '',
    pin: row.pin_code || '',
    cat: row.category || 'Other',
    subcat: row.subcategory || '',
    sev: (row.severity || 'Medium') as Severity,
    date: row.created_at ? new Date(row.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
    status: normalizeStatus(row.status),
    tech: row.required_technologies ? String(row.required_technologies).split(',').map((x: string) => x.trim()).filter(Boolean) : [],
    students: 0,
    solutions: 0,
    description: row.description || '',
    evidenceCount: 0,
    affectedPopulation: row.affected_population || '',
    department: row.relevant_departments || '',
    reportedBy: row.user_id || '',
    upvotes: 0,
  }));
}

export async function fetchIdeas(): Promise<Idea[]> {
  const { data, error } = await supabase.from('solutions').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id,
    title: row.title || 'Untitled solution',
    problem: row.problem_id || '',
    problemId: row.problem_id || undefined,
    uni: row.university_id || 'University',
    team: row.submitted_by || 'Contributor',
    tech: row.technology ? String(row.technology).split(',').map((x: string) => x.trim()).filter(Boolean) : [],
    impact: row.expected_impact || '',
    cost: row.estimated_cost == null ? '' : `₹${row.estimated_cost}`,
    match: Number(row.match_score ?? 0),
    proto: row.prototype_status || '',
    interest: 0,
    description: row.description || '',
    stage: row.status || '',
  }));
}

export async function submitProblem(input: {
  title: string;
  category: string;
  severity: Severity;
  state: string;
  district: string;
  village: string;
  pin: string;
  description: string;
  affectedPopulation: string;
}) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error('Please sign in before submitting a problem.');

  const code = `EC-2026-JH-${String(Date.now()).slice(-6)}`;
  const { data, error } = await supabase.from('problems').insert({
    problem_code: code,
    user_id: auth.user.id,
    title: input.title,
    state: input.state,
    district: input.district,
    village_city: input.village,
    pin_code: input.pin,
    description: input.description,
    category: input.category,
    subcategory: 'Field Grievance',
    severity: input.severity,
    status: 'ai_analyzed',
    affected_population: input.affectedPopulation,
  }).select('*').single();
  if (error) throw error;
  return { data, code };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function registerProfile(input: { email: string; password: string; fullName: string; role: string; organization: string; location: string }) {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: { data: { full_name: input.fullName } },
  });
  if (error) throw error;
  if (!data.user) throw new Error('Registration did not return a user.');

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: data.user.id,
    full_name: input.fullName,
    email: input.email,
    role: input.role,
    organization: input.organization,
    location: input.location,
  });
  if (profileError) throw profileError;
  return data;
}
