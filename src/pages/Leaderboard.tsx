import React, { useState } from 'react';
import { LB_STUDENTS, LB_UNIS, LB_INDUSTRY, LB_GOV } from '../data/mockData';
import { Award, ShieldCheck } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'universities' | 'industries' | 'government'>('students');

  const getRankBadge = (idx: number) => {
    const cls = idx === 0 ? 'g1' : idx === 1 ? 'g2' : idx === 2 ? 'g3' : '';
    return <div className={`rank-badge ${cls}`}>{idx + 1}</div>;
  };

  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>ECHELON Impact Leaderboard</h2>
          <p>
            Recognizing genuine contributions across the civic innovation pipeline — measured in audited community outcomes, deployed field pilots, and verified resolutions.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontSize: '13.5px', fontWeight: 600 }}>
          <ShieldCheck size={18} />
          <span>Audited by SIH Governance Registry</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={`tab-btn ${activeTab === 'universities' ? 'active' : ''}`}
          onClick={() => setActiveTab('universities')}
        >
          Universities
        </button>
        <button
          className={`tab-btn ${activeTab === 'industries' ? 'active' : ''}`}
          onClick={() => setActiveTab('industries')}
        >
          Industries & CSR
        </button>
        <button
          className={`tab-btn ${activeTab === 'government' ? 'active' : ''}`}
          onClick={() => setActiveTab('government')}
        >
          Government Depts
        </button>
      </div>

      {/* Table Container */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        {activeTab === 'students' && (
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student Innovator</th>
                <th>University</th>
                <th>Core Disciplines</th>
                <th>Solved</th>
                <th>Ideas</th>
                <th>Projects</th>
                <th>Impact Credits</th>
              </tr>
            </thead>
            <tbody>
              {LB_STUDENTS.map((s, idx) => (
                <tr key={idx}>
                  <td>{getRankBadge(idx)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="avatar">{s.name.charAt(0)}</div>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                    </div>
                  </td>
                  <td>{s.uni}</td>
                  <td>
                    <span className="tag">{s.skills}</span>
                  </td>
                  <td>{s.solved}</td>
                  <td>{s.ideas}</td>
                  <td>{s.projects}</td>
                  <td className="credits">★ {s.credits.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'universities' && (
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>University / Institution</th>
                <th>Accepted Challenges</th>
                <th>Solutions Submitted</th>
                <th>Active Projects</th>
                <th>Verified Solved</th>
                <th>Institutional Credits</th>
              </tr>
            </thead>
            <tbody>
              {LB_UNIS.map((u, idx) => (
                <tr key={idx}>
                  <td>{getRankBadge(idx)}</td>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td>{u.accepted}</td>
                  <td>{u.solutions}</td>
                  <td>{u.projects}</td>
                  <td><b style={{ color: 'var(--success)' }}>{u.solved}</b></td>
                  <td className="credits">★ {u.credits.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'industries' && (
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Industry / Foundation</th>
                <th>Ideas Sponsored</th>
                <th>Active Co-Devs</th>
                <th>Products Built</th>
                <th>Field Deployments</th>
                <th>CSR Credits</th>
              </tr>
            </thead>
            <tbody>
              {LB_INDUSTRY.map((ind, idx) => (
                <tr key={idx}>
                  <td>{getRankBadge(idx)}</td>
                  <td style={{ fontWeight: 600 }}>{ind.name}</td>
                  <td>{ind.selected}</td>
                  <td>{ind.projects}</td>
                  <td>{ind.products}</td>
                  <td><b style={{ color: 'var(--success)' }}>{ind.implementations}</b></td>
                  <td className="credits">★ {ind.credits.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'government' && (
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Department / Agency</th>
                <th>Problems Addressed</th>
                <th>Implemented Solutions</th>
                <th>Citizen Satisfaction</th>
                <th>Governance Credits</th>
              </tr>
            </thead>
            <tbody>
              {LB_GOV.map((g, idx) => (
                <tr key={idx}>
                  <td>{getRankBadge(idx)}</td>
                  <td style={{ fontWeight: 600 }}>{g.name}</td>
                  <td>{g.addressed}</td>
                  <td><b style={{ color: 'var(--success)' }}>{g.implemented}</b></td>
                  <td>
                    <span className="badge st-open" style={{ background: '#EAF5EF', color: 'var(--success)' }}>
                      {g.satisfaction}
                    </span>
                  </td>
                  <td className="credits">★ {g.credits.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Award size={16} color="#C7922E" />
        <span>Credits are earned strictly upon verified field outcomes and citizen verification, ensuring zero inflation or superficial activity gaming.</span>
      </div>
    </section>
  );
};
