import React from 'react';
import { Problem } from '../../types';
import { ProblemCard } from '../../components/ProblemCard';
import { Plus } from 'lucide-react';

interface CitizenProfileProps {
  problems: Problem[];
  navigate: (route: string, param?: string) => void;
}

export const CitizenProfile: React.FC<CitizenProfileProps> = ({ problems, navigate }) => {
  const myProblems = problems.slice(0, 3);

  return (
    <div>
      <section className="wrap">
        <div className="profile-head">
          <div className="profile-avatar round">RK</div>
          <div>
            <h2 style={{ fontSize: '24px' }}>Rekha Kumari</h2>
            <div className="profile-meta">
              <span>Nagri Gram Panchayat, Ranchi District · Jharkhand</span>
              <span>·</span>
              <span className="tag" style={{ background: 'var(--accent-soft)', color: '#6B4E12' }}>
                Verified Citizen Contributor
              </span>
            </div>
          </div>
          <div className="impact-score">
            <div className="val">1,240</div>
            <div className="lab">Residents Impacted · 2 Solved</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="num">5</div>
            <div className="lab">Problems reported</div>
          </div>
          <div className="kpi-card">
            <div className="num" style={{ color: 'var(--success)' }}>2</div>
            <div className="lab">Problems solved</div>
          </div>
          <div className="kpi-card">
            <div className="num">3</div>
            <div className="lab">Community feedbacks</div>
          </div>
          <div className="kpi-card">
            <div className="num">1,240</div>
            <div className="lab">Impacted residents</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '60px' }}>
        <div className="section-head">
          <div>
            <h2>My Reported Problems</h2>
            <p>Track real-time progress and student solutions for issues submitted in your locality.</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('submit')}>
            <Plus size={14} />
            <span>Report New Issue</span>
          </button>
        </div>

        <div className="grid-3">
          {myProblems.map((p) => (
            <ProblemCard
              key={p.id}
              problem={p}
              onClick={() => navigate('problem', p.id)}
            />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="section-head" style={{ marginTop: '48px' }}>
          <div>
            <h2>Recent Activity Updates</h2>
            <p>Automated notifications on your active problem tickets.</p>
          </div>
        </div>

        <div className="card" style={{ padding: '0 20px' }}>
          <div className="notif-row">
            <div className="notif-icon">✅</div>
            <div className="notif-text">
              <p>Problem <b>EC-2026-JH-001248</b> reached Government Evaluation stage under Dept. of Water Resources.</p>
              <span>3 hours ago</span>
            </div>
          </div>
          <div className="notif-row">
            <div className="notif-icon">💡</div>
            <div className="notif-text">
              <p>Team Aquasense (BIT Mesra) uploaded functional sensor prototype data for your hamlet.</p>
              <span>2 days ago</span>
            </div>
          </div>
          <div className="notif-row">
            <div className="notif-icon">🎉</div>
            <div className="notif-text">
              <p>Community well solar purification installed — please confirm and rate resolution quality.</p>
              <span>1 week ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
