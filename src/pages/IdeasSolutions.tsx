import React, { useState } from 'react';
import { Idea } from '../types';
import { IdeaCard } from '../components/IdeaCard';
import { Search } from 'lucide-react';

interface IdeasSolutionsProps {
  ideas: Idea[];
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const IdeasSolutions: React.FC<IdeasSolutionsProps> = ({ ideas, navigate, showToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUni, setSelectedUni] = useState('All');

  const universities = Array.from(new Set(ideas.map((i) => i.uni)));

  const filteredIdeas = ideas.filter((i) => {
    const matchesSearch =
      searchTerm === '' ||
      (i.title + ' ' + i.problem + ' ' + i.uni + ' ' + i.team + ' ' + i.tech.join(' '))
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesUni = selectedUni === 'All' || i.uni === selectedUni;
    return matchesSearch && matchesUni;
  });

  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>Ideas & Solutions Showcase</h2>
          <p>
            Student and university teams propose technology-backed solutions to matched citizen problems. Industry CSR and venture incubators review and select promising prototypes for co-development.
          </p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input">
          <Search size={16} color="#4B5955" />
          <input
            type="text"
            placeholder="Search ideas by title, university, problem, or technology…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={selectedUni} onChange={(e) => setSelectedUni(e.target.value)}>
          <option value="All">All Universities</option>
          {universities.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      <div className="grid-3">
        {filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onView={() => navigate('project', idea.id)}
            onExpressInterest={() =>
              showToast(`Interest recorded for "${idea.title}" (${idea.uni}). The student team has been alerted.`)
            }
          />
        ))}
      </div>
    </section>
  );
};
