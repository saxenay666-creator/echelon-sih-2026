import React from 'react';
import { Problem, Idea } from '../types';
import { ProblemCard } from '../components/ProblemCard';
import { IdeaCard } from '../components/IdeaCard';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomeProps {
  problems: Problem[];
  ideas: Idea[];
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

const PATHWAY_STEPS = [
  'Citizen Reports Problem',
  'AI Analysis & Tagging',
  'University & Student Matching',
  'Industry Selection',
  'Prototype & Testing',
  'Government Evaluation',
  'Field Implementation',
  'Citizen Feedback & Resolution'
];

export const Home: React.FC<HomeProps> = ({ problems, ideas, navigate, showToast }) => {
  const solvedCount = problems.filter(p => p.status === 'Solved' || p.status === 'Implemented').length + 380;
  const activeProjectsCount = ideas.length + 90;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="wrap hero-inner">
          <div>
            <div className="eyebrow-tag">
              <span className="dot" />
              <span>Citizens · Universities · Industry · Government</span>
            </div>
            <h1 className="hero-h">Turn real-world problems into real-world solutions.</h1>
            <p className="hero-sub">
              ECHELON connects citizens with universities, students, industries and government to move local problems from report to verified implementation — with every step fully traceable.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={() => navigate('submit')}>
                <span>Submit a Problem</span>
                <ArrowRight size={16} />
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('explorer')}>
                <span>Explore Problems</span>
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('jharkhand')}>
                <span>Jharkhand Impact</span>
              </button>
            </div>
          </div>

          {/* Pathway Flow Card */}
          <div className="flow-card">
            <div className="flow-title">THE ECHELON PATHWAY</div>
            {PATHWAY_STEPS.map((step, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === PATHWAY_STEPS.length - 1;
              return (
                <React.Fragment key={idx}>
                  <div className={`flow-node ${isFirst ? '' : isLast ? 'end' : 'mid'}`}>
                    <div className="fn-dot">{idx + 1}</div>
                    <span className="label">{step}</span>
                  </div>
                  {!isLast && <div className="flow-connector" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="wrap stats-grid">
          <div className="stat">
            <div className="num">{(1240 + problems.length).toLocaleString()}</div>
            <div className="lab">Problems reported</div>
          </div>
          <div className="stat">
            <div className="num">{solvedCount.toLocaleString()}</div>
            <div className="lab">Problems solved</div>
          </div>
          <div className="stat">
            <div className="num">{activeProjectsCount}</div>
            <div className="lab">Active projects</div>
          </div>
          <div className="stat">
            <div className="num">42</div>
            <div className="lab">Universities engaged</div>
          </div>
        </div>
      </section>

      {/* Principle Band */}
      <section className="principle-band">
        <div className="wrap principle-cols">
          <div>
            <h4>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> AI ASSISTS
              </span>
            </h4>
            <div className="chain">Analyze → Categorize → Recommend → Match → Assist</div>
          </div>
          <div className="divider" />
          <div>
            <h4>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} /> HUMANS DECIDE
              </span>
            </h4>
            <div className="chain">Propose → Select → Develop → Evaluate → Approve → Implement</div>
          </div>
        </div>
      </section>

      {/* Featured Problems */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2>Problems moving through the pipeline</h2>
            <p>A live sample of citizen-reported problems at different stages, drawn from the Jharkhand prototype.</p>
          </div>
          <button className="pill-link" onClick={() => navigate('explorer')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            View all problems →
          </button>
        </div>
        <div className="grid-3">
          {problems.slice(0, 3).map((p) => (
            <ProblemCard
              key={p.id}
              problem={p}
              onClick={() => navigate('problem', p.id)}
            />
          ))}
        </div>
      </section>

      {/* High-Potential Ideas */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <h2>High-potential student ideas</h2>
            <p>Solutions proposed by student and university teams, ready for industry CSR & prototyping review.</p>
          </div>
          <button className="pill-link" onClick={() => navigate('ideas')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            View all ideas →
          </button>
        </div>
        <div className="grid-3">
          {ideas.slice(0, 3).map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onView={() => navigate('project', idea.id)}
              onExpressInterest={() => showToast(`Interest recorded for "${idea.title}" by Tata Steel Foundation CSR portal.`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
