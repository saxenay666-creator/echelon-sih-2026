import React, { useState } from 'react';
import { Problem } from '../../types';
import { Check, AlertTriangle, X, FileCheck, Building } from 'lucide-react';

interface GovernmentDashboardProps {
  problems: Problem[];
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({
  problems,
  navigate,
  showToast
}) => {
  const [evaluationQueue, setEvaluationQueue] = useState(() =>
    problems.filter((p) =>
      ['Government Review', 'Prototype', 'Solution Selected'].includes(p.status)
    )
  );

  const handleApprove = (id: string, title: string) => {
    setEvaluationQueue(prev => prev.filter(p => p.id !== id));
    showToast(`Approved "${title}" for district field pilot deployment!`);
  };

  const handleRequestMod = (title: string) => {
    showToast(`Modification request sent to university team for "${title}".`);
  };

  const handleReject = (id: string, title: string) => {
    setEvaluationQueue(prev => prev.filter(p => p.id !== id));
    showToast(`Proposal "${title}" returned to university research pool.`);
  };

  return (
    <div>
      <section className="wrap">
        <div className="profile-head">
          <div className="profile-avatar">JH</div>
          <div>
            <h2 style={{ fontSize: '24px' }}>Department of Water Resources, Govt. of Jharkhand</h2>
            <div className="profile-meta">
              <span>State Secretariat, Nepal House, Doranda, Ranchi</span>
              <span>·</span>
              <span>Jurisdiction: All 24 Districts</span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <span className="tag">State Evaluation Committee</span>
              <span className="tag">SIH Fast-Track Nodal Cell</span>
            </div>
          </div>
          <div className="impact-score">
            <div className="val">2,680</div>
            <div className="lab">Governance Credits · 88% Satisfaction</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="num">31</div>
            <div className="lab">Civic challenges received</div>
          </div>
          <div className="kpi-card">
            <div className="num" style={{ color: 'var(--warning)' }}>{evaluationQueue.length}</div>
            <div className="lab">Under technical evaluation</div>
          </div>
          <div className="kpi-card">
            <div className="num" style={{ color: 'var(--success)' }}>18</div>
            <div className="lab">Pilots & rollouts approved</div>
          </div>
          <div className="kpi-card">
            <div className="num">88%</div>
            <div className="lab">Citizen verification satisfaction</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '60px' }}>
        <div className="section-head">
          <div>
            <h2>Projects Awaiting Government Technical & Budget Evaluation</h2>
            <p>
              Review technical feasibility, public health safety benchmarks, state compliance standards, and lifecycle scalability.
            </p>
          </div>
        </div>

        {evaluationQueue.length > 0 ? (
          <div className="grid-3">
            {evaluationQueue.map((p) => (
              <div className="card eval-card" key={p.id}>
                <div className="pc-top">
                  <h4 style={{ fontSize: '16px' }}>{p.title}</h4>
                  <span className={`severity sev-${p.sev.toLowerCase()}`}>{p.sev}</span>
                </div>
                <div className="pc-meta">
                  <span>{p.district}, {p.state}</span>
                  <span>·</span>
                  <span>{p.cat}</span>
                </div>

                <div className="eval-grid">
                  <span>Industry Partner</span>
                  <b>Tata Steel Foundation</b>
                  <span>University Mentor</span>
                  <b>BIT Mesra / NIT</b>
                  <span>Estimated Budget</span>
                  <b>₹4.2 Lakhs</b>
                  <span>Beneficiaries</span>
                  <b>{p.affectedPopulation || '~12,000 residents'}</b>
                </div>

                <div className="eval-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleApprove(p.id, p.title)}
                  >
                    <Check size={14} />
                    <span>Approve Pilot</span>
                  </button>
                  <button
                    className="btn btn-outline-warn btn-sm"
                    onClick={() => handleRequestMod(p.title)}
                  >
                    <AlertTriangle size={14} />
                    <span>Request Changes</span>
                  </button>
                  <button
                    className="btn btn-outline-err btn-sm"
                    onClick={() => handleReject(p.id, p.title)}
                  >
                    <X size={14} />
                    <span>Reject</span>
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => navigate('problem', p.id)}
                  >
                    Inspect File
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card center" style={{ padding: '48px 20px' }}>
            <FileCheck size={36} color="#2F7A4F" style={{ margin: '0 auto 12px' }} />
            <h3>Evaluation queue cleared</h3>
            <p className="muted" style={{ maxWidth: '44ch', margin: '8px auto' }}>
              All submitted student engineering prototypes have been reviewed for district deployment.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
