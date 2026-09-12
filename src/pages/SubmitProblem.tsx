import React, { useState } from 'react';
import { Problem, Severity } from '../types';
import { DISTRICTS, CATEGORIES } from '../data/mockData';
import { Check, ArrowRight, ArrowLeft, Copy, MapPin, Upload, Camera, Video, Mic, FileText, Bot } from 'lucide-react';

interface SubmitProblemProps {
  onProblemSubmitted: (newProblem: Problem) => void;
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const SubmitProblem: React.FC<SubmitProblemProps> = ({ onProblemSubmitted, navigate, showToast }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    cat: 'Water',
    sev: 'High' as Severity,
    state: 'Jharkhand',
    district: 'Ranchi',
    village: '',
    pin: '',
    coords: '23.3441° N, 85.3096° E (Nagri Block)',
    desc: '',
    affectedPopulation: '~2,500 residents',
    evidence: ['photo_sample_1.jpg'] as string[]
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [mapPinPlaced, setMapPinPlaced] = useState(false);

  const handleNext = () => {
    if (step === 1 && !formData.title.trim()) {
      showToast('Please provide a brief problem title.');
      return;
    }
    if (step === 3 && !formData.desc.trim()) {
      showToast('Please provide a short description of the problem.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const toggleEvidence = (type: string) => {
    setFormData(prev => {
      const exists = prev.evidence.includes(type);
      const updated = exists ? prev.evidence.filter(e => e !== type) : [...prev.evidence, type];
      return { ...prev, evidence: updated };
    });
  };

  const handleSubmitFinal = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `EC-2026-JH-00${randomNum}`;
    setGeneratedId(newId);

    const now = new Date();
    const dateStr = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;

    // Extract basic tech based on category
    const defaultTechMap: Record<string, string[]> = {
      'Water': ['IoT', 'Sensors', 'Telemetry'],
      'Education': ['Mobile App', 'Offline-first', 'Audio'],
      'Healthcare': ['mHealth', 'SMS', 'Diagnostics'],
      'Agriculture': ['Data Analytics', 'Weather API', 'Sensors'],
      'Infrastructure': ['Solar', 'Civil Design', 'IoT'],
      'Sanitation': ['GPS', 'Sensors', 'Logistics'],
      'Environment': ['GIS', 'Satellite Imagery', 'Sensors']
    };

    const newProblem: Problem = {
      id: newId,
      title: formData.title || 'Community Problem',
      district: formData.district,
      state: formData.state,
      village: formData.village || 'Local Hamlet',
      pin: formData.pin || '834001',
      cat: formData.cat,
      subcat: 'Field Grievance',
      sev: formData.sev,
      date: dateStr,
      status: 'AI Analyzed',
      tech: defaultTechMap[formData.cat] || ['IoT', 'Cloud', 'Data'],
      students: 0,
      solutions: 0,
      description: formData.desc,
      evidenceCount: formData.evidence.length || 1,
      affectedPopulation: formData.affectedPopulation,
      department: `Dept. of ${formData.cat}, Govt. of Jharkhand`,
      reportedBy: 'Citizen Contributor',
      upvotes: 1
    };

    onProblemSubmitted(newProblem);
    setIsSubmitted(true);
    showToast(`Problem logged successfully with ID ${newId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId);
    showToast(`Tracking ID ${generatedId} copied to clipboard!`);
  };

  const stepsLabels = ['Problem Title', 'Location', 'Description', 'Evidence', 'Review & AI'];

  if (isSubmitted) {
    return (
      <section className="section wrap">
        <div className="card success-box" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--success)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '28px'
          }}>
            <Check size={32} />
          </div>

          <h3 style={{ fontSize: '26px', marginTop: '18px' }}>Problem submitted successfully</h3>
          <p className="muted" style={{ marginTop: '8px' }}>
            Your submission has entered the public ECHELON innovation pipeline.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div className="pid-chip">{generatedId}</div>
            <button className="icon-btn" onClick={copyToClipboard} title="Copy tracking ID">
              <Copy size={16} />
            </button>
          </div>

          <div style={{ margin: '14px 0' }}>
            <span className="badge st-analyzed">
              <span className="d" />
              AI Analysis in Progress
            </span>
          </div>

          <p className="muted" style={{ fontSize: '13.5px', maxWidth: '44ch', margin: '12px auto 28px' }}>
            Academic departments and student innovators across Jharkhand are being algorithmically notified based on skill match.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('track')}>
              Track this Problem
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('explorer')}>
              Explore Problem Explorer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>Submit a Local Problem</h2>
          <p>
            Report an urgent community issue in your area. Every verified report is diagnosed by AI and matched with students and university engineering labs.
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="stepper">
        {stepsLabels.map((lbl, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < step;
          const isActive = stepNum === step;
          const cls = isDone ? 'done' : isActive ? 'active' : '';
          return (
            <div className={`step-pip ${cls}`} key={idx}>
              <div className="circle">{isDone ? '✓' : stepNum}</div>
              <div className="slabel">{lbl}</div>
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="form-card card">
        {step === 1 && (
          <div>
            <div className="field">
              <label>Problem Title</label>
              <input
                type="text"
                placeholder="e.g. Unsafe drinking water in rural hamlet"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <div className="hint">Describe the core issue in a concise, unambiguous sentence.</div>
            </div>

            <div className="row2">
              <div className="field">
                <label>Primary Category</label>
                <select
                  value={formData.cat}
                  onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Community Urgency / Severity</label>
                <select
                  value={formData.sev}
                  onChange={(e) => setFormData({ ...formData, sev: e.target.value as Severity })}
                >
                  <option value="High">High (Immediate hazard / health risk)</option>
                  <option value="Medium">Medium (Chronic difficulty / inefficiency)</option>
                  <option value="Low">Low (Maintenance / improvement)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="row2">
              <div className="field">
                <label>State</label>
                <select value={formData.state} disabled>
                  <option value="Jharkhand">Jharkhand (Prototype Focus)</option>
                </select>
              </div>

              <div className="field">
                <label>District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                >
                  {DISTRICTS.map((d) => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row2">
              <div className="field">
                <label>Village / Block / City</label>
                <input
                  type="text"
                  placeholder="e.g. Nagri Block, Ward 4"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Postal PIN Code</label>
                <input
                  type="text"
                  placeholder="e.g. 835222"
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label>Geographic Map Placement</label>
              <div
                onClick={() => {
                  setMapPinPlaced(true);
                  showToast('GPS coordinates pinned to map!');
                }}
                style={{
                  height: '140px',
                  border: '1.5px dashed var(--line)',
                  borderRadius: '9px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: mapPinPlaced ? 'var(--primary)' : 'var(--ink-soft)',
                  cursor: 'pointer',
                  background: mapPinPlaced ? 'var(--accent-soft)' : 'var(--paper)',
                  transition: 'background 0.2s'
                }}
              >
                <MapPin size={24} color={mapPinPlaced ? '#C7922E' : '#4B5955'} />
                <span style={{ fontSize: '13px', marginTop: '6px', fontWeight: mapPinPlaced ? 600 : 400 }}>
                  {mapPinPlaced
                    ? `Pinned: ${formData.coords}`
                    : 'Click to drop GPS coordinate pin on location map'}
                </span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="field">
              <label>Describe the Problem in Detail</label>
              <textarea
                placeholder="What exactly is happening? How long has this been an issue? What previous attempts were made?"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                rows={5}
              />
              <div className="hint">Include specific observations (e.g. seasonal variations, equipment breakdowns).</div>
            </div>

            <div className="field">
              <label>Estimated Affected Population</label>
              <input
                type="text"
                placeholder="e.g. ~4,000 residents across 3 hamlets"
                value={formData.affectedPopulation}
                onChange={(e) => setFormData({ ...formData, affectedPopulation: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="field">
              <label>Attach Evidence (Photos, Audio, Video, Docs)</label>
              <div className="evidence-row">
                <div
                  className={`evidence-tile ${formData.evidence.includes('photo') ? 'active' : ''}`}
                  onClick={() => toggleEvidence('photo')}
                >
                  <Camera size={22} style={{ margin: '0 auto 6px' }} />
                  <div>Upload Photos</div>
                </div>

                <div
                  className={`evidence-tile ${formData.evidence.includes('video') ? 'active' : ''}`}
                  onClick={() => toggleEvidence('video')}
                >
                  <Video size={22} style={{ margin: '0 auto 6px' }} />
                  <div>Attach Video</div>
                </div>

                <div
                  className={`evidence-tile ${formData.evidence.includes('audio') ? 'active' : ''}`}
                  onClick={() => toggleEvidence('audio')}
                >
                  <Mic size={22} style={{ margin: '0 auto 6px' }} />
                  <div>Voice Recording</div>
                </div>

                <div
                  className={`evidence-tile ${formData.evidence.includes('doc') ? 'active' : ''}`}
                  onClick={() => toggleEvidence('doc')}
                >
                  <FileText size={22} style={{ margin: '0 auto 6px' }} />
                  <div>Official Letter</div>
                </div>
              </div>

              <div className="hint" style={{ marginTop: '12px' }}>
                Selected evidence files: <b>{formData.evidence.length} file(s) attached</b>. Concrete evidence significantly increases the algorithmic match confidence with university research grants.
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h4 style={{ fontSize: '17px', marginBottom: '16px' }}>Review Submission Summary</h4>
            <div className="review-row">
              <span>Problem Title</span>
              <b>{formData.title || 'Untitled'}</b>
            </div>
            <div className="review-row">
              <span>Category & Urgency</span>
              <span>{formData.cat} · <b>{formData.sev} Severity</b></span>
            </div>
            <div className="review-row">
              <span>Location</span>
              <span>{formData.village || 'Village'}, {formData.district}, {formData.state}</span>
            </div>
            <div className="review-row">
              <span>Affected Population</span>
              <span>{formData.affectedPopulation}</span>
            </div>
            <div className="review-row">
              <span>Evidence Attached</span>
              <span>{formData.evidence.length} item(s)</span>
            </div>
            <div className="review-row" style={{ borderBottom: 'none' }}>
              <span>Detailed Narrative</span>
              <span style={{ maxWidth: '60%', textAlign: 'right', fontStyle: 'italic' }}>
                {(formData.desc || 'No description provided.').slice(0, 90)}…
              </span>
            </div>

            <div className="ai-note">
              <Bot size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <b>Automated AI Pipeline Note:</b> Upon clicking submit, our natural language model extracts key engineering domains and initiates matchmaking across universities like BIT Mesra & NIT Jamshedpur. Final approvals always remain with human evaluation committees.
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-nav">
          {step > 1 ? (
            <button className="btn btn-ghost" onClick={handlePrev}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-accent" onClick={handleSubmitFinal}>
              <span>Submit Problem to ECHELON</span>
              <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
