import React from 'react';
import { Problem } from '../../types';
import { ProblemCard } from '../../components/ProblemCard';
import { LB_STUDENTS } from '../../data/mockData';
import { Building2, Users, Award } from 'lucide-react';

interface UniversityDashboardProps {
  problems: Problem[];
  navigate: (route: string, param?: string) => void;
}

export const UniversityDashboard: React.FC<UniversityDashboardProps> = ({ problems, navigate }) => {
  return (
    <div>
      <section className="wrap">
        <div className="profile-head">
          <div className="profile-avatar">BM</div>
          <div>
            <h2 style={{ fontSize: '24px' }}>Birla Institute of Technology, Mesra</h2>
            <div className="profile-meta">
              <span>Ranchi, Jharkhand</span>
              <span>·</span>
              <span>Accredited Labs: CSE · ECE · Mechanical · Civil · Environmental</span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <span className="tag">Deemed University</span>
              <span className="tag">DST Teqip-III Node</span>
              <span className="tag">SIH 2026 Nodal Centre</span>
            </div>
          </div>
          <div className="impact-score">
            <div className="val">3,120</div>
            <div className="lab">Institutional Credits · Rank #1 in State</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="num">38</div>
            <div className="lab">Problems accepted</div>
          </div>
          <div className="kpi-card">
            <div className="num">52</div>
            <div className="lab">Solutions submitted</div>
          </div>
          <div className="kpi-card">
            <div className="num">21</div>
            <div className="lab">Active laboratory projects</div>
          </div>
          <div className="kpi-card">
            <div className="num" style={{ color: 'var(--success)' }}>14</div>
            <div className="lab">Field solutions solved</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '60px' }}>
        {/* Recommended Regional Problems */}
        <div className="section-head">
          <div>
            <h2>High-Priority Problems Matched to Campus Facilities</h2>
            <p>Directly aligned with BIT Mesra faculty research labs and student capstone cohorts.</p>
          </div>
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

        {/* Students Participating */}
        <div className="section-head" style={{ marginTop: '48px' }}>
          <div>
            <h2>Top Performing Student Innovators</h2>
            <p>Students from your institution registered in the ECHELON innovation network.</p>
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                <th>Student Innovator</th>
                <th>Core Disciplines</th>
                <th>Problems Solved</th>
                <th>Projects Active</th>
                <th>Individual Credits</th>
              </tr>
            </thead>
            <tbody>
              {LB_STUDENTS.map((s, idx) => (
                <tr key={idx}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="avatar">{s.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div className="small-caps">{s.uni}</div>
                    </div>
                  </td>
                  <td><span className="tag">{s.skills}</span></td>
                  <td><b style={{ color: 'var(--success)' }}>{s.solved}</b></td>
                  <td>{s.projects}</td>
                  <td className="credits">★ {s.credits.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
