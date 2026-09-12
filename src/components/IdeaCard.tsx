import React from 'react';
import { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onView: () => void;
  onExpressInterest: () => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onView, onExpressInterest }) => {
  return (
    <div className="card card-interactive idea-card">
      <div>
        <span className="tag" style={{ marginBottom: '8px', display: 'inline-block' }}>
          {idea.problem}
        </span>
        <h4 style={{ fontSize: '16.5px', marginTop: '6px' }}>{idea.title}</h4>
      </div>

      <div className="pc-meta">
        <strong>{idea.uni}</strong> · <span>{idea.team}</span>
      </div>

      <div className="pc-meta">
        {idea.tech.map((t, idx) => (
          <span className="tag" key={idx}>{t}</span>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '5px' }}>
          <span>Skill & Tech Match</span>
          <span style={{ fontWeight: 700, color: 'var(--success)' }}>{idea.match}%</span>
        </div>
        <div className="match-bar">
          <div className="match-fill" style={{ width: `${idea.match}%` }} />
        </div>
      </div>

      <div className="pc-foot">
        <span>Impact: <b>{idea.impact}</b></span>
        <span>Est. cost: <b>{idea.cost}</b></span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
        <button
          className="btn btn-ghost btn-sm"
          style={{ flex: 1 }}
          onClick={onView}
        >
          View Idea
        </button>
        <button
          className="btn btn-primary btn-sm"
          style={{ flex: 1 }}
          onClick={onExpressInterest}
        >
          Express Interest
        </button>
      </div>
    </div>
  );
};
