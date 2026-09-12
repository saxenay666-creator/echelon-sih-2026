import React, { useState, useMemo } from 'react';
import { Problem, ProblemStatus, Severity } from '../types';
import { ProblemCard } from '../components/ProblemCard';
import { Search, Plus, RotateCcw } from 'lucide-react';
import { DISTRICTS, CATEGORIES } from '../data/mockData';

interface ProblemExplorerProps {
  problems: Problem[];
  navigate: (route: string, param?: string) => void;
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

export const ProblemExplorer: React.FC<ProblemExplorerProps> = ({ problems, navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch =
        searchTerm === '' ||
        (p.title + ' ' + p.district + ' ' + p.cat + ' ' + (p.subcat || '') + ' ' + p.id + ' ' + p.tech.join(' '))
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
      const matchesDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
      const matchesCategory = selectedCategory === 'All' || p.cat === selectedCategory;
      const matchesSeverity = selectedSeverity === 'All' || p.sev === selectedSeverity;

      return matchesSearch && matchesStatus && matchesDistrict && matchesCategory && matchesSeverity;
    });
  }, [problems, searchTerm, selectedStatus, selectedDistrict, selectedCategory, selectedSeverity]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedDistrict('All');
    setSelectedCategory('All');
    setSelectedSeverity('All');
  };

  const isFiltered =
    searchTerm !== '' ||
    selectedStatus !== 'All' ||
    selectedDistrict !== 'All' ||
    selectedCategory !== 'All' ||
    selectedSeverity !== 'All';

  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>Problem Explorer</h2>
          <p>
            Browse real-world problems submitted across Jharkhand. Filter by status, geography, discipline, or engineering technology.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('submit')}>
          <Plus size={16} />
          <span>Report Problem</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-input">
          <Search size={16} color="#4B5955" />
          <input
            type="text"
            placeholder="Search by keyword, district, category, tech or ID…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value="All">All Districts (24)</option>
          {DISTRICTS.map((d) => (
            <option key={d.name} value={d.name}>{d.name}</option>
          ))}
        </select>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select value={selectedSeverity} onChange={(e) => setSelectedSeverity(e.target.value)}>
          <option value="All">All Severities</option>
          <option value="High">High Severity</option>
          <option value="Medium">Medium Severity</option>
          <option value="Low">Low Severity</option>
        </select>

        {isFiltered && (
          <button className="btn btn-ghost btn-sm" onClick={resetFilters} title="Reset filters">
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', fontSize: '13.5px', color: 'var(--ink-soft)' }}>
        <span>Showing <b>{filteredProblems.length}</b> problem{filteredProblems.length === 1 ? '' : 's'}</span>
      </div>

      {/* Grid */}
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
        <div className="card center" style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
          <h3>No matching problems found</h3>
          <p className="muted" style={{ maxWidth: '44ch', margin: '8px auto 20px' }}>
            Try broadening your search keywords or resetting your active district or status filters.
          </p>
          <button className="btn btn-ghost btn-sm" onClick={resetFilters}>
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
};
