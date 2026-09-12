import React, { useState } from 'react';
import { Problem, ProblemStatus } from '../../types';
import { CATEGORIES } from '../../data/mockData';
import { Shield, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminDashboardProps {
  problems: Problem[];
  showToast: (msg: string) => void;
}

const ALL_STATUSES: ProblemStatus[] = [
  'New',
  'AI Analyzed',
  'Open for Solutions',
  'Solution Selected',
  'Prototype',
  'Government Review',
  'Pilot',
  'Implemented',
  'Solved'
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ problems, showToast }) => {
  const [modCounts, setModCounts] = useState({
    problems: 6,
    students: 3,
    unis: 1,
    industries: 2,
    flags: 4,
    reports: 2
  });

  const handleReview = (key: keyof typeof modCounts, name: string) => {
    setModCounts(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] - 1)
    }));
    showToast(`Moderation item for ${name} verified and approved.`);
  };

  const statusCounts = ALL_STATUSES.map((status) => {
    const count = problems.filter((p) => p.status === status).length || Math.floor(Math.random() * 20) + 4;
    return { status, count };
  });

  const catMax = Math.max(...CATEGORIES.map((c) => c.count));

  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>Admin & System Oversight Dashboard</h2>
          <p>Platform-wide metrics, telemetry, institutional onboarding verification, and moderation tools.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
          <Shield size={20} />
          <span style={{ fontWeight: 600, fontSize: '13.5px' }}>SIH Root Administrator</span>
        </div>
      </div>

      {/* Top Telemetry KPIs */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="num">6,340</div>
          <div className="lab">Total registered users</div>
        </div>
        <div className="kpi-card">
          <div className="num">{(1240 + problems.length).toLocaleString()}</div>
          <div className="lab">Logged problems</div>
        </div>
        <div className="kpi-card">
          <div className="num">612</div>
          <div className="lab">Student solutions</div>
        </div>
        <div className="kpi-card">
          <div className="num">94</div>
          <div className="lab">Active prototype pipelines</div>
        </div>
      </div>

      {/* User Segments */}
      <div className="grid-4" style={{ marginBottom: '36px' }}>
        <div className="kpi-card">
          <div className="num">4,120</div>
          <div className="lab">Citizens registered</div>
        </div>
        <div className="kpi-card">
          <div className="num">1,680</div>
          <div className="lab">Student innovators</div>
        </div>
        <div className="kpi-card">
          <div className="num">42</div>
          <div className="lab">Participating universities</div>
        </div>
        <div className="kpi-card">
          <div className="num">31</div>
          <div className="lab">Industry CSR partners</div>
        </div>
      </div>

      {/* Analytical Charts */}
      <div className="grid-3">
        <div className="card admin-chart-card">
          <h4>Problems by Pipeline Status</h4>
          {statusCounts.map((s) => (
            <div className="cat-bar-row" key={s.status}>
              <div className="cname" style={{ width: '130px', fontSize: '12px' }}>{s.status}</div>
              <div className="cat-bar-track">
                <div className="cat-bar-fill" style={{ width: `${Math.min(100, s.count * 4)}%` }} />
              </div>
              <div className="cval">{s.count}</div>
            </div>
          ))}
        </div>

        <div className="card admin-chart-card">
          <h4>Problems by Category</h4>
          {CATEGORIES.slice(0, 7).map((c) => (
            <div className="cat-bar-row" key={c.name}>
              <div className="cname" style={{ width: '130px', fontSize: '12px' }}>{c.name}</div>
              <div className="cat-bar-track">
                <div className="cat-bar-fill" style={{ width: `${Math.round((c.count / catMax) * 100)}%`, background: 'var(--accent)' }} />
              </div>
              <div className="cval">{c.count}</div>
            </div>
          ))}
        </div>

        <div className="card admin-chart-card">
          <h4>Implementation & Satisfaction Index</h4>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span>Implementation Rate</span>
              <b>31%</b>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '31%' }} />
            </div>
            <div className="small-caps" style={{ marginTop: '4px' }}>386 of 1,248 problems deployed</div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span>Citizen Satisfaction Score</span>
              <b>84%</b>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '84%', background: 'var(--success)' }} />
            </div>
            <div className="small-caps" style={{ marginTop: '4px' }}>Based on post-deployment surveys</div>
          </div>
        </div>
      </div>

      {/* Moderation Controls */}
      <div className="section-head" style={{ marginTop: '48px' }}>
        <div>
          <h2>Moderation & Trust Queues</h2>
          <p>Verify user authenticity, examine duplicate problem filings, and clear moderation reports.</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="mod-row">
            <span>Verify Problem Submissions</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleReview('problems', 'Problem Submissions')}
            >
              Review ({modCounts.problems})
            </button>
          </div>
          <div className="mod-row">
            <span>Verify Student IDs</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleReview('students', 'Student IDs')}
            >
              Review ({modCounts.students})
            </button>
          </div>
          <div className="mod-row">
            <span>Verify Universities</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleReview('unis', 'Universities')}
            >
              Review ({modCounts.unis})
            </button>
          </div>
        </div>

        <div className="card">
          <div className="mod-row">
            <span>Verify Industry CSR Accounts</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleReview('industries', 'Industry CSR')}
            >
              Review ({modCounts.industries})
            </button>
          </div>
          <div className="mod-row">
            <span>Review Flagged Content</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleReview('flags', 'Flagged Content')}
            >
              Review ({modCounts.flags})
            </button>
          </div>
          <div className="mod-row">
            <span>Manage Escalated Reports</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleReview('reports', 'Escalated Reports')}
            >
              Review ({modCounts.reports})
            </button>
          </div>
        </div>

        <div className="card">
          <h4 style={{ fontSize: '15px', marginBottom: '10px' }}>Recent System Audit Log</h4>
          <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
            Verified 3 regional polytechnic institutions and cleared 2 duplicate water contamination reports in Ranchi district in the past 24 hours.
          </p>
          <div className="small-caps" style={{ marginTop: '14px', color: 'var(--primary-light)' }}>
            ✓ Automated daily backup verified
          </div>
        </div>
      </div>
    </section>
  );
};
