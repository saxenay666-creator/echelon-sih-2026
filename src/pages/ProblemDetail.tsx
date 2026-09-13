import React, { useState } from 'react';
import { Problem, Idea } from '../types';
import { STATUS_CLASSES } from '../data/statusClasses';
import { ArrowLeft, Bot, ThumbsUp, Camera, Video, FileText, Share2 } from 'lucide-react';

interface ProblemDetailProps {
  problemId: string;
  problems: Problem[];
  ideas: Idea[];
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const ProblemDetail: React.FC<ProblemDetailProps> = ({
  problemId,
  problems,
  ideas,
  navigate,
  showToast
}) => {
  const problem = problems.find((p) => p.id.toUpperCase() === problemId.toUpperCase()) || problems[0];
  const [upvotes, setUpvotes] = useState(problem.upvotes || 42);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const relatedIdeas = ideas.filter(
    (i) => i.problemId === problem.id || i.problem.toLowerCase() === problem.title.toLowerCase()
  );

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
      showToast('Community urgency upvoted! Priority escalated in matching queue.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Problem link copied to clipboard.');
  };

  return (
    <section className="section wrap">
      <button
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '20px' }}
        onClick={() => navigate('explorer')}
      >
        <ArrowLeft size={14} />
        <span>Back to Problems</span>
      </button>

      {/* Header */}
      <div className="detail-hero">
        <div>
          <div className="mono small-caps">{problem.id}</div>
          <h2 style={{ fontSize: '28px', marginTop: '6px', maxWidth: '34ch' }}>
            {problem.title}
          </h2>
          <div className="pc-meta" style={{ marginTop: '10px' }}>
            <span>{problem.village ? `${problem.village}, ` : ''}{problem.district}, {problem.state}</span>
            <span>·</span>
            <span>Reported by <b>{problem.reportedBy || 'Citizen'}</b></span>
            <span>·</span>
            <span>{problem.date}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span className={`badge ${STATUS_CLASSES[problem.status] || 'st-new'}`} style={{ fontSize: '13.5px', padding: '6px 14px' }}>
            <span className="d" />
            {problem.status}
          </span>
          <span className={`severity sev-${problem.sev.toLowerCase()}`}>{problem.sev} Severity</span>
        </div>
      </div>

      <div className="detail-grid">
        <div>
          {/* Detailed Narrative */}
          <div className="detail-block">
            <h3>Problem Description</h3>
            <p className="muted" style={{ fontSize: '15px', lineHeight: 1.7 }}>
              {problem.description ||
                `Residents of ${problem.district} have reported persistent challenges related to ${problem.cat.toLowerCase()}. Community leaders and local health workers emphasize that this issue requires a sustainable, technology-backed intervention rather than ad-hoc temporary measures.`}
            </p>
          </div>

          {/* Evidence Attachments */}
          <div className="detail-block">
            <h3>Verified Evidence ({problem.evidenceCount || 4} files)</h3>
            <div className="evidence-row">
              <div
                className="evidence-thumb"
                onClick={() => showToast('Viewing photo evidence #1')}
                style={{ cursor: 'pointer' }}
                title="Photo Evidence #1"
              >
                <Camera size={26} />
              </div>
              <div
                className="evidence-thumb"
                onClick={() => showToast('Viewing photo evidence #2')}
                style={{ cursor: 'pointer' }}
                title="Photo Evidence #2"
              >
                <Camera size={26} />
              </div>
              <div
                className="evidence-thumb"
                onClick={() => showToast('Playing recorded video survey')}
                style={{ cursor: 'pointer' }}
                title="Video Survey"
              >
                <Video size={26} />
              </div>
              <div
                className="evidence-thumb"
                onClick={() => showToast('Opening official gram panchayat resolution')}
                style={{ cursor: 'pointer' }}
                title="Gram Panchayat Resolution"
              >
                <FileText size={26} />
              </div>
            </div>
            <div className="small-caps" style={{ marginTop: '8px' }}>
              Files cryptographically stamped and pinned to state IPFS repository.
            </div>
          </div>

          {/* AI Diagnostic Breakdown */}
          <div className="detail-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <h3>AI Diagnostic Analysis</h3>
              <span className="tag" style={{ background: 'var(--accent-soft)', color: '#6B4E12', borderColor: '#E0CC98' }}>
                Subject to Human Verification
              </span>
            </div>

            <div className="card ai-result-card" style={{ padding: '20px' }}>
              <div className="ai-fact-grid" style={{ marginTop: 0 }}>
                <div className="ai-fact">
                  <div className="k">CORE DOMAIN</div>
                  <div className="v">{problem.cat}</div>
                </div>
                <div className="ai-fact">
                  <div className="k">SUBCATEGORY</div>
                  <div className="v">{problem.subcat || 'Public Health & Safety'}</div>
                </div>
                <div className="ai-fact">
                  <div className="k">AFFECTED POPULATION</div>
                  <div className="v">{problem.affectedPopulation || '~5,000 residents'}</div>
                </div>
                <div className="ai-fact">
                  <div className="k">URGENCY INDEX</div>
                  <div className="v">{problem.sev} Priority</div>
                </div>
                <div className="ai-fact">
                  <div className="k">REQUIRED TECHNOLOGIES</div>
                  <div className="v">{problem.tech.join(', ')}</div>
                </div>
                <div className="ai-fact">
                  <div className="k">MATCHED DEPARTMENTS</div>
                  <div className="v">CSE, Civil, Environmental Engg.</div>
                </div>
              </div>

              <div className="ai-note" style={{ marginTop: '16px' }}>
                <Bot size={18} style={{ flexShrink: 0 }} />
                <span>
                  <b>Algorithmic Recommendation:</b> Matched with high confidence to research laboratories at <b>BIT Mesra</b> and <b>NIT Jamshedpur</b>. Department mentors have received problem dossiers.
                </span>
              </div>
            </div>
          </div>

          {/* Solutions Proposed */}
          <div className="detail-block">
            <h3>Submitted Solutions ({relatedIdeas.length})</h3>
            {relatedIdeas.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {relatedIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="card card-interactive"
                    style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => navigate('project', idea.id)}
                  >
                    <div>
                      <h4 style={{ fontSize: '15px' }}>{idea.title}</h4>
                      <div className="muted" style={{ fontSize: '13px', marginTop: '4px' }}>
                        By <b>{idea.team}</b> ({idea.uni}) · Projected Impact: {idea.impact}
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm">Inspect Prototype</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card center" style={{ padding: '30px' }}>
                <p className="muted" style={{ fontSize: '14px', margin: 0 }}>
                  No student solutions submitted yet. Open for university and polytechnic innovation teams.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Status Card */}
        <div>
          <div className="card" style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '14px' }}>Pipeline Status</h4>
            <div className="fact-row">
              <span>Universities Matched</span>
              <b>2 institutions</b>
            </div>
            <div className="fact-row">
              <span>Students Interested</span>
              <b>{problem.students} innovators</b>
            </div>
            <div className="fact-row">
              <span>Proposed Solutions</span>
              <b>{problem.solutions} designs</b>
            </div>
            <div className="fact-row">
              <span>Industry CSR Interest</span>
              <b>Tata Steel Foundation</b>
            </div>
            <div className="fact-row">
              <span>Government Review</span>
              <b>{problem.department || 'In Review'}</b>
            </div>
            <div className="fact-row" style={{ borderBottom: 'none' }}>
              <span>Citizen Satisfaction</span>
              <b>{problem.status === 'Solved' ? '4.8 / 5' : 'Pending Deployment'}</b>
            </div>

            <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
              <button
                className={`btn ${hasUpvoted ? 'btn-ghost' : 'btn-primary'} btn-sm`}
                style={{ width: '100%', marginBottom: '8px' }}
                onClick={handleUpvote}
              >
                <ThumbsUp size={14} />
                <span>{hasUpvoted ? `Upvoted (${upvotes})` : `Upvote Urgency (${upvotes})`}</span>
              </button>
              <button
                className="btn btn-ghost btn-sm"
                style={{ width: '100%' }}
                onClick={handleShare}
              >
                <Share2 size={14} />
                <span>Share Problem</span>
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '10px' }}
            onClick={() => navigate('track')}
          >
            Track Live Timeline
          </button>

          <button
            className="btn btn-ghost"
            style={{ width: '100%' }}
            onClick={() => navigate('ideas')}
          >
            Explore Related Solutions
          </button>
        </div>
      </div>
    </section>
  );
};
