import React, { useState } from 'react';
import { Idea } from '../types';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';

interface ProjectDetailProps {
  ideaId: string;
  ideas: Idea[];
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

const STAGE_LIST = [
  'Idea Submitted',
  'Industry Selected',
  'Team Formed',
  'Prototype Built',
  'Development & Bench Test',
  'Field Testing',
  'Government Review',
  'Pilot Approved',
  'State Implementation'
];

interface CommentItem {
  author: string;
  role: string;
  text: string;
  time: string;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  ideaId,
  ideas,
  navigate,
  showToast
}) => {
  const idea = ideas.find((i) => i.id === ideaId) || ideas[0];
  const stageIdx = 3; // Demo: Prototype Built
  const progressPct = Math.round(((stageIdx + 1) / STAGE_LIST.length) * 100);

  const [comments, setComments] = useState<CommentItem[]>([
    {
      author: `${idea.uni} Faculty Mentor`,
      role: 'Academic Oversight',
      text: 'Sensor calibration curves show strong linearity between 15°C and 42°C. Battery life needs one more bench charge-discharge cycle before government field review.',
      time: 'Yesterday at 4:20 PM'
    },
    {
      author: 'Tata Steel Foundation CSR Lead',
      role: 'Industry Co-Developer',
      text: 'Bill of Materials updated with local Jharkhand suppliers in Adityapur industrial cluster, reducing unit sensor cost by 22%.',
      time: '3 days ago'
    },
    {
      author: 'Jharkhand Dept. of Water Resources',
      role: 'Government Technical Evaluator',
      text: 'Scheduled for preliminary district lab water standard cross-validation on 18 September.',
      time: '1 week ago'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        author: 'You (Reviewer)',
        role: 'Stakeholder Commentator',
        text: newComment,
        time: 'Just now'
      },
      ...comments
    ]);
    setNewComment('');
    showToast('Stakeholder commentary logged to project audit trail.');
  };

  return (
    <section className="section wrap">
      <button
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '20px' }}
        onClick={() => navigate('ideas')}
      >
        <ArrowLeft size={14} />
        <span>Back to Ideas</span>
      </button>

      <div className="detail-hero">
        <div>
          <div className="pc-meta" style={{ marginBottom: '4px' }}>
            <span>Target Problem: <b>{idea.problem}</b></span>
          </div>
          <h2 style={{ fontSize: '28px', maxWidth: '34ch' }}>{idea.title}</h2>
        </div>
        <span className="badge st-prototype" style={{ fontSize: '13.5px', padding: '6px 14px' }}>
          <span className="d" />
          {STAGE_LIST[stageIdx]}
        </span>
      </div>

      <div className="pc-meta" style={{ marginBottom: '8px' }}>
        <span>Pipeline: Problem → Selected Idea → {idea.uni} → {idea.team} → Industry Sponsor → Prototype → Government Review</span>
      </div>

      {/* Progress Track */}
      <div className="progress-track" style={{ height: '10px' }}>
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--ink-soft)', marginTop: '4px' }}>
        <span>Stage 4 of 9</span>
        <span><b>{progressPct}%</b> Pipeline Maturity</span>
      </div>

      {/* Stages Stepper Chips */}
      <div className="stage-row" style={{ marginTop: '14px' }}>
        {STAGE_LIST.map((stageName, idx) => {
          const isDone = idx < stageIdx;
          const isCurrent = idx === stageIdx;
          const cls = isDone ? 'done' : isCurrent ? 'current' : '';
          return (
            <span key={idx} className={`stage-chip ${cls}`}>
              {isDone ? '✓ ' : ''}{stageName}
            </span>
          );
        })}
      </div>

      <div className="detail-grid" style={{ marginTop: '24px' }}>
        <div>
          {/* Project Overview */}
          <div className="detail-block">
            <h3>Project Architecture</h3>
            <p className="muted" style={{ fontSize: '15px', lineHeight: 1.7 }}>
              {idea.description ||
                `Engineered by ${idea.team} from ${idea.uni}, this solution leverages low-power telemetry and edge processing to solve chronic ${idea.problem.toLowerCase()}. Designed for an anticipated community impact of ${idea.impact} at an estimated budget of ${idea.cost}.`}
            </p>
          </div>

          {/* Technologies */}
          <div className="detail-block">
            <h3>Core Engineering Technologies</h3>
            <div className="pc-meta">
              {idea.tech.map((t, idx) => (
                <span className="tag" key={idx}>{t}</span>
              ))}
            </div>
          </div>

          {/* Prototype Gallery */}
          <div className="detail-block">
            <h3>Hardware & Test Artifacts</h3>
            <div className="evidence-row">
              <div className="evidence-thumb" title="Microcontroller Bench Test">🧪</div>
              <div className="evidence-thumb" title="Field Enclosure 3D Print">🔧</div>
              <div className="evidence-thumb" title="Circuit Schematic & PCB">📐</div>
              <div className="evidence-thumb" title="Calibration Log">📄</div>
            </div>
          </div>

          {/* Milestones */}
          <div className="detail-block">
            <h3>Development Milestones</h3>
            <div className="milestone">
              <div className="mdot" />
              <div>
                <b style={{ fontSize: '14px' }}>Conceptual Design Validated</b>
                <p className="muted" style={{ fontSize: '13px', margin: '2px 0 0' }}>
                  10 Jul 2026 — Component schematics and microcontroller BOM approved by faculty mentor.
                </p>
              </div>
            </div>
            <div className="milestone">
              <div className="mdot" />
              <div>
                <b style={{ fontSize: '14px' }}>Working Bench Prototype Assembled</b>
                <p className="muted" style={{ fontSize: '13px', margin: '2px 0 0' }}>
                  02 Aug 2026 — First functional telemetry unit successfully broadcast sensor data to cloud gateway.
                </p>
              </div>
            </div>
            <div className="milestone">
              <div className="mdot" style={{ background: 'var(--accent)' }} />
              <div>
                <b style={{ fontSize: '14px' }}>Field Pilot Trials (In Progress)</b>
                <p className="muted" style={{ fontSize: '13px', margin: '2px 0 0' }}>
                  Currently running — Live sensors deployed at 2 field testing sites in Nagri block.
                </p>
              </div>
            </div>
          </div>

          {/* Stakeholder Commentary */}
          <div className="detail-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <MessageSquare size={18} color="#0F3D3E" />
              <h3>Inter-Stakeholder Review Thread</h3>
            </div>

            <form onSubmit={handleAddComment} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Add an engineering or evaluation note to this prototype audit…"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={14} />
                  <span>Post</span>
                </button>
              </div>
            </form>

            <div className="card" style={{ padding: '0 20px' }}>
              {comments.map((c, idx) => (
                <div className="comment" key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b>{c.author}</b>
                    <span className="small-caps">{c.time}</span>
                  </div>
                  <div className="tag" style={{ fontSize: '10.5px', marginTop: '2px', display: 'inline-block' }}>
                    {c.role}
                  </div>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '14px' }}>Team & Sponsorship</h4>
            <div className="fact-row">
              <span>University</span>
              <b>{idea.uni}</b>
            </div>
            <div className="fact-row">
              <span>Student Team</span>
              <b>{idea.team}</b>
            </div>
            <div className="fact-row">
              <span>Faculty Mentor</span>
              <b>{idea.mentor || 'Dr. S. K. Singh'}</b>
            </div>
            <div className="fact-row">
              <span>CSR Co-Developers</span>
              <b>Tata Steel Foundation</b>
            </div>
            <div className="fact-row">
              <span>Estimated Budget</span>
              <b>{idea.cost}</b>
            </div>
            <div className="fact-row" style={{ borderBottom: 'none' }}>
              <span>Projected Reach</span>
              <b>{idea.impact}</b>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '10px' }}
            onClick={() => navigate('dashboard-government')}
          >
            Review in Government Queue
          </button>

          <button
            className="btn btn-ghost"
            style={{ width: '100%' }}
            onClick={() => {
              showToast('CSR sponsorship interest registered with team lead.');
            }}
          >
            Express CSR Sponsorship
          </button>
        </div>
      </div>
    </section>
  );
};
