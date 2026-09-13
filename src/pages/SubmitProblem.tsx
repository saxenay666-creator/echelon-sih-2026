import React, { useState } from 'react';
import { Problem, Severity } from '../types';
import { DISTRICTS, CATEGORIES } from '../data/mockData';
import { submitProblem } from '../services/data';
import { Check, ArrowRight, ArrowLeft, Copy, MapPin, Camera, Video, Mic, FileText, Bot } from 'lucide-react';

interface SubmitProblemProps { onProblemSubmitted: (newProblem: Problem) => void; navigate: (route: string, param?: string) => void; showToast: (msg: string) => void; }

export const SubmitProblem: React.FC<SubmitProblemProps> = ({ onProblemSubmitted, navigate, showToast }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ title: '', cat: 'Water', sev: 'High' as Severity, state: 'Jharkhand', district: 'Ranchi', village: '', pin: '', coords: '', desc: '', affectedPopulation: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [mapPinPlaced, setMapPinPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 1 && !formData.title.trim()) return showToast('Please provide a brief problem title.');
    if (step === 3 && !formData.desc.trim()) return showToast('Please provide a short description.');
    setStep((prev) => prev + 1);
  };
  const handlePrev = () => setStep((prev) => Math.max(1, prev - 1));

  const handleSubmitFinal = async () => {
    try {
      setLoading(true);
      const result = await submitProblem({ title: formData.title, category: formData.cat, severity: formData.sev, state: formData.state, district: formData.district, village: formData.village, pin: formData.pin, description: formData.desc, affectedPopulation: formData.affectedPopulation });
      const row: any = result.data;
      const newProblem: Problem = { id: result.code, title: row.title, district: row.district, state: row.state, village: row.village_city, pin: row.pin_code, cat: row.category, subcat: row.subcategory, sev: row.severity, date: new Date(row.created_at || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'AI Analyzed', tech: [], students: 0, solutions: 0, description: row.description, affectedPopulation: row.affected_population, evidenceCount: 0, reportedBy: 'Authenticated user', upvotes: 0 };
      onProblemSubmitted(newProblem);
      setGeneratedId(result.code);
      setIsSubmitted(true);
      showToast(`Problem logged successfully with ID ${result.code}`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to submit problem.');
    } finally { setLoading(false); }
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(generatedId); showToast(`Tracking ID ${generatedId} copied!`); };
  const stepsLabels = ['Problem Title', 'Location', 'Description', 'Evidence', 'Review & AI'];

  if (isSubmitted) return <section className="section wrap"><div className="card success-box" style={{ maxWidth: '640px', margin: '0 auto' }}><div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><Check size={32} /></div><h3 style={{ fontSize: 26, marginTop: 18 }}>Problem submitted successfully</h3><p className="muted">Your submission is now stored in the ECHELON live database.</p><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}><div className="pid-chip">{generatedId}</div><button className="icon-btn" onClick={copyToClipboard}><Copy size={16} /></button></div><div style={{ margin: '14px 0' }}><span className="badge st-analyzed"><span className="d" /> AI Analysis in Progress</span></div><div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}><button className="btn btn-primary" onClick={() => navigate('track')}>Track this Problem</button><button className="btn btn-ghost" onClick={() => navigate('explorer')}>Explore Problem Explorer</button></div></div></section>;

  return <section className="section wrap">
    <div className="section-head"><div><h2>Submit a Local Problem</h2><p>Report an urgent community issue. Verified reports enter the live ECHELON innovation pipeline.</p></div></div>
    <div className="stepper">{stepsLabels.map((label, i) => <div className={`step-pip ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : ''}`} key={label}><div className="circle">{i + 1 < step ? '✓' : i + 1}</div><div className="slabel">{label}</div></div>)}</div>
    <div className="form-card card">
      {step === 1 && <div><div className="field"><label>Problem Title</label><input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Unsafe drinking water in rural hamlet" required /></div><div className="row2"><div className="field"><label>Primary Category</label><select value={formData.cat} onChange={(e) => setFormData({ ...formData, cat: e.target.value })}>{CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}</select></div><div className="field"><label>Severity</label><select value={formData.sev} onChange={(e) => setFormData({ ...formData, sev: e.target.value as Severity })}><option>High</option><option>Medium</option><option>Low</option></select></div></div></div>}
      {step === 2 && <div><div className="row2"><div className="field"><label>State</label><input value={formData.state} disabled /></div><div className="field"><label>District</label><select value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}>{DISTRICTS.map((d) => <option key={d.name}>{d.name}</option>)}</select></div></div><div className="row2"><div className="field"><label>Village / Block / City</label><input value={formData.village} onChange={(e) => setFormData({ ...formData, village: e.target.value })} /></div><div className="field"><label>Postal PIN</label><input value={formData.pin} onChange={(e) => setFormData({ ...formData, pin: e.target.value })} /></div></div><div className="field"><label>Map Placement</label><div onClick={() => { setMapPinPlaced(true); setFormData({ ...formData, coords: 'User selected location' }); }} style={{ height: 140, border: '1.5px dashed var(--line)', borderRadius: 9, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><MapPin size={24} /><span>{mapPinPlaced ? 'Location pinned' : 'Click to place location pin'}</span></div></div></div>}
      {step === 3 && <div><div className="field"><label>Describe the Problem</label><textarea value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} rows={6} required /></div><div className="field"><label>Estimated Affected Population</label><input value={formData.affectedPopulation} onChange={(e) => setFormData({ ...formData, affectedPopulation: e.target.value })} placeholder="e.g. ~4,000 residents" /></div></div>}
      {step === 4 && <div><h4>Evidence</h4><p className="muted">Evidence upload is ready for the Supabase Storage bucket; this submission stores the problem data now.</p><div className="evidence-row"><div className="evidence-tile"><Camera size={22} /><div>Photos</div></div><div className="evidence-tile"><Video size={22} /><div>Video</div></div><div className="evidence-tile"><Mic size={22} /><div>Audio</div></div><div className="evidence-tile"><FileText size={22} /><div>Documents</div></div></div></div>}
      {step === 5 && <div><h4>Review Submission</h4>{[['Problem Title', formData.title], ['Category & Severity', `${formData.cat} · ${formData.sev}`], ['Location', `${formData.village}, ${formData.district}, ${formData.state}`], ['Affected Population', formData.affectedPopulation], ['Description', formData.desc]].map(([a, b]) => <div className="review-row" key={a}><span>{a}</span><b>{b}</b></div>)}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}><button className="btn btn-ghost" onClick={handlePrev} disabled={step === 1}><ArrowLeft size={15} /> Back</button>{step < 5 ? <button className="btn btn-primary" onClick={handleNext}>Continue <ArrowRight size={15} /></button> : <button className="btn btn-primary" onClick={handleSubmitFinal} disabled={loading}>{loading ? 'Saving…' : 'Submit Problem'} <Bot size={15} /></button>}</div>
    </div>
  </section>;
};
