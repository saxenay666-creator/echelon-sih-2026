import React, { useState } from 'react';
import { Problem, ProblemStatus } from '../types';
import { STATUS_CLASSES } from '../data/statusClasses';
import { Search } from 'lucide-react';

interface TrackProblemProps {
  problems: Problem[];
  navigate: (route: string, param?: string) => void;
}

const STAGE_NAMES = [
  'Problem Submitted',
  'AI Analysis & Tagging',
  'University Matched',
  'Student Solution Proposed',
  'Industry Partner Selected',
  'Prototype & Testing',
  'Government Evaluation',
  'Field Implementation',
  'Citizen Feedback & Verified Resolution'
];

const STATUS_TO_STAGE: Record<ProblemStatus, number> = {
  'New': 0,
  'AI Analyzed': 1,
  'Open for Solutions': 2,
  'Solution Selected': 4,
  'Prototype': 5,
  'Government Review': 6,
  'Pilot': 7,
  'Implemented': 7,
  'Solved': 8,
};

export const TrackProblem: React.FC<TrackProblemProps> = ({ problems, navigate }) => {
  const [queryId, setQueryId] = useState('EC-2026-JH-001248');
  const [activeProblem, setActiveProblem] = useState<Problem>(() => {
    return problems.find((p) => p.id === 'EC-2026-JH-001248') || problems[0];
  });
  const [hasSearched, setHasSearched] = useState(true);

  const handleTrack = () => {
    const trimmed = queryId.trim().toUpperCase();
    const found = problems.find((p) => p.id.toUpperCase() === trimmed);
    if (found) {
      setActiveProblem(found);
    } else {
      // Fallback with mock structure if not found
      setActiveProblem({
        id: trimmed,
        title: 'Community Query in Verification',
        district: 'Ranchi',
        state: 'Jharkhand',
        cat: 'Public Services',
        sev: 'Medium',
        date: 'Today',
        status: 'AI Analyzed',
        tech: ['Diagnostics'],
        students: 3,
        solutions: 1,
        department: 'District Redressal Cell'
      });
    }
    setHasSearched(true);
  };

  const currentStageIndex = STATUS_TO_STAGE[activeProblem.status] ?? 2;

  return (
    <section className="section wrap">
      <div className="track-box">
        <div className="eyebrow-tag">
          <span className="dot" />
          <span>Public Transparency Pipeline</span>
        </div>
        <h2 style={{ fontSize: '32px' }}>Track a Problem</h2>
        <p className="muted" style={{ marginTop: '8px' }}>
          Enter the unique tracking ID provided at submission to inspect live progress, assigned universities, and government review stages.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <input
            type="text"
            placeholder="e.g. EC-2026-JH-001248"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            style={{ textAlign: 'center', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
          />
          <button className="btn btn-primary" onClick={handleTrack}>
            <Search size={16} />
            <span>Track</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '12px' }}>
          <span className="small-caps" style={{ alignSelf: 'center' }}>Try:</span>
          {problems.slice(0, 3).map((p) => (
            <button
              key={p.id}
              className="tag"
              onClick={() => {
                setQueryId(p.id);
                setActiveProblem(p);
              }}
              style={{ cursor: 'pointer', background: 'var(--paper-raised)' }}
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>

      {hasSearched && activeProblem && (
        <div className="card" style={{ maxWidth: '680px', margin: '36px auto 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="mono small-caps">{activeProblem.id}</div>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>{activeProblem.title}</h3>
            </div>
            <span className={`badge ${STATUS_CLASSES[activeProblem.status] || 'st-new'}`}>
              <span className="d" />
              {activeProblem.status}
            </span>
          </div>

          <div className="pc-meta" style={{ marginTop: '12px' }}>
            <span>{activeProblem.district}, {activeProblem.state}</span>
            <span>·</span>
            <span>Reported {activeProblem.date}</span>
            <span>·</span>
            <span>Authority: <b>{activeProblem.department || 'State Administration'}</b></span>
          </div>

          <div className="timeline">
            {STAGE_NAMES.map((stageName, idx) => {
              const isDone = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const stateClass = isDone ? 'done' : isCurrent ? 'current' : 'pending';

              let statusText = 'Not initiated yet.';
              if (isDone) {
                statusText = 'Completed and verified by platform audit.';
              } else if (isCurrent) {
                statusText = 'Active stage — in progress under oversight.';
              }

              return (
                <div className="tl-step" key={idx}>
                  <div className="tl-line" />
                  <div className={`tl-dot ${stateClass}`}>
                    {isDone ? '✓' : isCurrent ? '●' : '○'}
                  </div>
                  <div className="tl-content">
                    <h5>{stageName}</h5>
                    <p>{statusText}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--line)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('problem', activeProblem.id)}>
              View Problem Details
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('explorer')}>
              Explore Similar Issues
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
