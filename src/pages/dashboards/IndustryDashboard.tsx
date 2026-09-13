import React from 'react';
import { Idea } from '../../types';
import { IdeaCard } from '../../components/IdeaCard';

interface IndustryDashboardProps {
  ideas: Idea[];
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const IndustryDashboard: React.FC<IndustryDashboardProps> = ({ ideas, navigate, showToast }) => {
  return (
    <div>
      <section className="wrap">
        <div className="profile-head">
          <div className="profile-avatar">TS</div>
          <div>
            <h2 style={{ fontSize: '24px' }}>Tata Steel Foundation</h2>
            <div className="profile-meta">
              <span>CSR & Rural Engineering Division · Jamshedpur & Ranchi</span>
              <span>·</span>
              <span>Mandate: Water Security, Clean Energy, Village Infrastructure</span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <span className="tag">Anchor CSR Partner</span>
              <span className="tag">Seed Grant Pool: ₹2.5 Cr</span>
              <span className="tag">Incubation Mentor</span>
            </div>
          </div>
          <div className="impact-score">
            <div className="val">2,960</div>
            <div className="lab">CSR Impact Credits · Rank #1</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="num">14</div>
            <div className="lab">Available student ideas</div>
          </div>
          <div className="kpi-card">
            <div className="num">9</div>
            <div className="lab">Selected CSR proposals</div>
          </div>
          <div className="kpi-card">
            <div className="num">7</div>
            <div className="lab">Active field prototypes</div>
          </div>
          <div className="kpi-card">
            <div className="num" style={{ color: 'var(--success)' }}>4</div>
            <div className="lab">Commercialized / deployed</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '60px' }}>
        <div className="section-head">
          <div>
            <h2>High-Potential Grassroots Ideas for Sponsorship</h2>
            <p>
              Pre-vetted engineering proposals with validated student teams and faculty mentorship ready for CSR capital deployment.
            </p>
          </div>
        </div>

        <div className="grid-3">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onView={() => navigate('project', idea.id)}
              onExpressInterest={() =>
                showToast(`Tata Steel Foundation logged CSR sponsorship interest for "${idea.title}".`)
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};
