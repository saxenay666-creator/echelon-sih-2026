import React, { useState } from 'react';
import { Problem } from '../types';
import { ProblemCard } from '../components/ProblemCard';
import { DISTRICTS, CATEGORIES } from '../data/mockData';
import { MapPin, X } from 'lucide-react';

interface JharkhandDashboardProps {
  problems: Problem[];
  navigate: (route: string, param?: string) => void;
}

export const JharkhandDashboard: React.FC<JharkhandDashboardProps> = ({ problems, navigate }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const totals = DISTRICTS.reduce(
    (acc, d) => [acc[0] + d.total, acc[1] + d.unresolved, acc[2] + d.inProgress, acc[3] + d.solved],
    [0, 0, 0, 0]
  );

  const catMax = Math.max(...CATEGORIES.map((c) => c.count));

  const filteredProblems = selectedDistrict
    ? problems.filter((p) => p.district.toLowerCase() === selectedDistrict.toLowerCase())
    : problems;

  const handleDistrictClick = (name: string) => {
    setSelectedDistrict(prev => (prev === name ? null : name));
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="jh-hero">
        <div className="wrap">
          <div
            className="eyebrow-tag"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              borderColor: 'rgba(255, 255, 255, 0.22)',
              color: '#F4E7C8'
            }}
          >
            <span className="dot" style={{ background: '#C7922E' }} />
            <span>Prototype Focus Geography</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '36px', maxWidth: '22ch' }}>
            Jharkhand Problem & Impact Dashboard
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '56ch', marginTop: '12px', fontSize: '15.5px', lineHeight: 1.6 }}>
            Live civic intelligence covering all 24 districts of Jharkhand — tracking ground reports from initial citizen submission to verified resolution.
          </p>

          <div className="jh-stats">
            <div className="stat">
              <div className="num">{(totals[0] + problems.length).toLocaleString()}</div>
              <div className="lab">Total reported</div>
            </div>
            <div className="stat">
              <div className="num">{totals[1].toLocaleString()}</div>
              <div className="lab">Unresolved</div>
            </div>
            <div className="stat">
              <div className="num">{totals[2].toLocaleString()}</div>
              <div className="lab">In progress</div>
            </div>
            <div className="stat">
              <div className="num">{totals[3].toLocaleString()}</div>
              <div className="lab">Solved</div>
            </div>
          </div>
        </div>
      </section>

      {/* 24 Districts Grid */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2>District Coverage across Jharkhand</h2>
            <p>
              Click on any of the 24 districts below to inspect localized issues, ongoing student projects, and resolution status.
            </p>
          </div>
          {selectedDistrict && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setSelectedDistrict(null)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <X size={14} />
              <span>Clear Filter ({selectedDistrict})</span>
            </button>
          )}
        </div>

        <div className="district-grid">
          {DISTRICTS.map((d) => {
            const isSelected = selectedDistrict === d.name;
            return (
              <div
                key={d.name}
                className={`district-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleDistrictClick(d.name)}
                title={`Click to view problems in ${d.name}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h5>{d.name}</h5>
                  {isSelected && <MapPin size={14} color="#C7922E" />}
                </div>
                <div className="dc-row">
                  <span>Total Reports</span>
                  <b>{d.total}</b>
                </div>
                <div className="dc-row">
                  <span>Unresolved</span>
                  <b style={{ color: 'var(--error)' }}>{d.unresolved}</b>
                </div>
                <div className="dc-row">
                  <span>In Progress</span>
                  <b style={{ color: 'var(--warning)' }}>{d.inProgress}</b>
                </div>
                <div className="dc-row">
                  <span>Solved</span>
                  <b style={{ color: 'var(--success)' }}>{d.solved}</b>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Problems by Category Breakdown */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <h2>Problems by Category</h2>
            <p>Distribution of all reported issues across Jharkhand classified by primary municipal and state domain.</p>
          </div>
        </div>
        <div className="card" style={{ maxWidth: '780px' }}>
          {CATEGORIES.map((c) => {
            const pct = Math.round((c.count / catMax) * 100);
            return (
              <div className="cat-bar-row" key={c.name}>
                <div className="cname">{c.name}</div>
                <div className="cat-bar-track">
                  <div className="cat-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="cval">{c.count}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Filtered Problems */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <h2>
              {selectedDistrict ? `Problems in ${selectedDistrict}` : 'Featured Problems in Jharkhand'}
            </h2>
            <p>
              {selectedDistrict
                ? `Filtered view of community issues logged in ${selectedDistrict} district.`
                : 'Prioritized community issues awaiting academic proposals and municipal pilot evaluations.'}
            </p>
          </div>
        </div>

        {filteredProblems.length > 0 ? (
          <div className="grid-3">
            {filteredProblems.map((p) => (
              <ProblemCard
                key={p.id}
                problem={p}
                onClick={() => navigate('problem', p.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card center" style={{ padding: '40px 20px' }}>
            <p className="muted">No problems currently seeded for {selectedDistrict} in this demo view.</p>
            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedDistrict(null)} style={{ marginTop: '12px' }}>
              View all districts
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
