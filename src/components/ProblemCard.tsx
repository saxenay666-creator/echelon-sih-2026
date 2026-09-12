import React from 'react';
import { Problem, ProblemStatus } from '../types';

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

export const STATUS_CLASSES: Record<ProblemStatus, string> = {
  'New': 'st-new',
  'AI Analyzed': 'st-analyzed',
  'Open for Solutions': 'st-open',
  'Solution Selected': 'st-selected',
  'Prototype': 'st-prototype',
  'Government Review': 'st-review',
  'Pilot': 'st-pilot',
  'Implemented': 'st-implemented',
  'Solved': 'st-solved',
};

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onClick }) => {
  return (
    <div
      className="card card-interactive problem-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="pc-top">
        <h4>{problem.title}</h4>
        <span className={`severity sev-${problem.sev.toLowerCase()}`}>{problem.sev}</span>
      </div>

      <div className="pc-meta">
        <span>{problem.district}, {problem.state}</span>
        <span>·</span>
        <span>{problem.cat}</span>
        {problem.subcat && (
          <>
            <span>·</span>
            <span style={{ fontStyle: 'italic' }}>{problem.subcat}</span>
          </>
        )}
      </div>

      <div className="pc-meta">
        {problem.tech.map((t, i) => (
          <span className="tag" key={i}>{t}</span>
        ))}
      </div>

      <div className="pc-foot">
        <span className={`badge ${STATUS_CLASSES[problem.status] || 'st-new'}`}>
          <span className="d" />
          {problem.status}
        </span>
        <span>{problem.students} students · {problem.solutions} solutions</span>
      </div>

      <div className="mono small-caps" style={{ marginTop: '-4px', display: 'flex', justifyContent: 'space-between' }}>
        <span>{problem.id} · {problem.date}</span>
        {problem.upvotes !== undefined && <span>▲ {problem.upvotes}</span>}
      </div>
    </div>
  );
};
