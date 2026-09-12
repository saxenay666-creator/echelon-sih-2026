import React from 'react';
import { Problem, Idea } from '../../types';
import { IdeaCard } from '../../components/IdeaCard';
import { Sparkles, Trophy, Award, ArrowRight } from 'lucide-react';

interface StudentDashboardProps {
  problems: Problem[];
  ideas: Idea[];
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  problems,
  ideas,
  navigate,
  showToast
}) => {
  const matches = [
    { p: problems[2] || problems[0], skill: 95, techMatch: 'Mobile App, Offline-first, SQLite' },
    { p: problems[3] || problems[1], skill: 88, techMatch: 'IoT, Weather API, Python' },
    { p: problems[5] || problems[0], skill: 76, techMatch: 'mHealth, SMS, Cloud' }
  ];

  return (
    <div>
      <section className="wrap">
        <div className="profile-head">
          <div className="profile-avatar">AK</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '24px' }}>Welcome, Ananya Kujur</h2>
              <span className="badge st-selected" style={{ fontSize: '11px' }}>
                <Trophy size={12} /> Rank #1 Innovator
              </span>
            </div>
            <div className="profile-meta">
              <span>BIT Mesra · Computer Science & Engineering</span>
              <span>·</span>
              <span>Final Year B.Tech</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span className="skill-chip">IoT Telemetry</span>
              <span className="skill-chip">LoRaWAN</span>
              <span className="skill-chip">Python</span>
              <span className="skill-chip">Cloud Architectures</span>
              <span className="skill-chip">Embedded C</span>
            </div>
          </div>

          <div className="impact-score">
            <div className="val">2,450</div>
            <div className="lab">Impact Credits · Rank #1 in Jharkhand</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="num" style={{ color: 'var(--success)' }}>6</div>
            <div className="lab">Problems solved</div>
          </div>
          <div className="kpi-card">
            <div className="num">9</div>
            <div className="lab">Ideas submitted</div>
          </div>
          <div className="kpi-card">
            <div className="num">4</div>
            <div className="lab">Active team projects</div>
          </div>
          <div className="kpi-card">
            <div className="num">#1</div>
            <div className="lab">State leaderboard rank</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '60px' }}>
        {/* Recommended Problems Matching Skills */}
        <div className="section-head">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2>Problems Matching Your Skill Profile</h2>
              <span className="tag" style={{ background: 'var(--accent-soft)', color: '#6B4E12' }}>
                <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                AI Smart Matched
              </span>
            </div>
            <p>Algorithmic fit based on your verified GitHub repositories, hackathon submissions, and lab skills.</p>
          </div>
        </div>

        <div className="card" style={{ padding: '6px 20px', marginBottom: '40px' }}>
          {matches.map((m, idx) => (
            <div className="match-row" key={idx}>
              <div className="match-pct">
                {m.skill}%
                <div style={{ fontSize: '10px', color: 'var(--ink-soft)', fontWeight: 400 }}>skill match</div>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '16px' }}>{m.p.title}</h4>
                <div className="pc-meta" style={{ marginTop: '4px' }}>
                  <span>{m.p.district}, {m.p.state}</span>
                  <span>·</span>
                  <span>{m.p.cat}</span>
                  <span>·</span>
                  <span>Match: <b>{m.techMatch}</b></span>
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate('problem', m.p.id)}
              >
                Inspect Problem
              </button>
            </div>
          ))}
        </div>

        {/* Active Projects */}
        <div className="section-head">
          <div>
            <h2>My Active Co-Development Projects</h2>
            <p>Prototypes currently co-funded with industry mentors and undergoing testing.</p>
          </div>
        </div>

        <div className="grid-3">
          {ideas.slice(0, 2).map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onView={() => navigate('project', idea.id)}
              onExpressInterest={() => showToast(`Project ${idea.title} is already active in your workspace.`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
