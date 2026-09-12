import React, { useState } from 'react';
import { Problem, Idea } from '../types';
import { LB_UNIS, LB_STUDENTS } from '../data/mockData';
import { Search } from 'lucide-react';

interface GlobalSearchProps {
  problems: Problem[];
  ideas: Idea[];
  navigate: (route: string, param?: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ problems, ideas, navigate }) => {
  const [searchTerm, setSearchTerm] = useState('water');

  const q = searchTerm.toLowerCase().trim();

  const matchingProblems = q
    ? problems.filter((p) =>
        (p.title + ' ' + p.district + ' ' + p.cat + ' ' + p.id + ' ' + p.tech.join(' '))
          .toLowerCase()
          .includes(q)
      )
    : [];

  const matchingIdeas = q
    ? ideas.filter((i) =>
        (i.title + ' ' + i.problem + ' ' + i.uni + ' ' + i.tech.join(' '))
          .toLowerCase()
          .includes(q)
      )
    : [];

  const matchingUnis = q
    ? LB_UNIS.filter((u) => u.name.toLowerCase().includes(q))
    : [];

  const matchingStudents = q
    ? LB_STUDENTS.filter((s) => (s.name + ' ' + s.uni + ' ' + s.skills).toLowerCase().includes(q))
    : [];

  const totalMatches =
    matchingProblems.length + matchingIdeas.length + matchingUnis.length + matchingStudents.length;

  return (
    <section className="section wrap">
      <div className="center" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '30px' }}>Search ECHELON</h2>
        <p className="muted" style={{ marginTop: '8px' }}>
          Instantly search across problems, university research teams, student innovations, and industry initiatives.
        </p>

        <div className="search-hero-input" style={{ marginTop: '24px' }}>
          <Search size={20} color="#4B5955" />
          <input
            type="text"
            placeholder="Try searching “water”, “BIT Mesra”, “solar”, or “Ranchi”…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {q ? (
          totalMatches > 0 ? (
            <div>
              {matchingProblems.length > 0 && (
                <div>
                  <div className="search-cat-label">PROBLEMS ({matchingProblems.length})</div>
                  <div className="card" style={{ padding: '0 20px' }}>
                    {matchingProblems.map((p) => (
                      <div
                        key={p.id}
                        className="search-result-row"
                        onClick={() => navigate('problem', p.id)}
                      >
                        <div>
                          <span style={{ fontWeight: 600 }}>{p.title}</span>
                          <div className="small-caps" style={{ marginTop: '2px' }}>
                            {p.id} · {p.cat} · {p.district}
                          </div>
                        </div>
                        <span className="muted small-caps">{p.district}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingIdeas.length > 0 && (
                <div>
                  <div className="search-cat-label">IDEAS & SOLUTIONS ({matchingIdeas.length})</div>
                  <div className="card" style={{ padding: '0 20px' }}>
                    {matchingIdeas.map((i) => (
                      <div
                        key={i.id}
                        className="search-result-row"
                        onClick={() => navigate('project', i.id)}
                      >
                        <div>
                          <span style={{ fontWeight: 600 }}>{i.title}</span>
                          <div className="small-caps" style={{ marginTop: '2px' }}>
                            For: {i.problem}
                          </div>
                        </div>
                        <span className="muted small-caps">{i.uni}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingUnis.length > 0 && (
                <div>
                  <div className="search-cat-label">UNIVERSITIES & LABS ({matchingUnis.length})</div>
                  <div className="card" style={{ padding: '0 20px' }}>
                    {matchingUnis.map((u) => (
                      <div
                        key={u.name}
                        className="search-result-row"
                        onClick={() => navigate('dashboard-university')}
                      >
                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                        <span className="muted small-caps">{u.solved} solved problems</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingStudents.length > 0 && (
                <div>
                  <div className="search-cat-label">STUDENT INNOVATORS ({matchingStudents.length})</div>
                  <div className="card" style={{ padding: '0 20px' }}>
                    {matchingStudents.map((s) => (
                      <div
                        key={s.name}
                        className="search-result-row"
                        onClick={() => navigate('dashboard-student')}
                      >
                        <div>
                          <span style={{ fontWeight: 600 }}>{s.name}</span>
                          <div className="small-caps" style={{ marginTop: '2px' }}>
                            {s.uni} · {s.skills}
                          </div>
                        </div>
                        <span className="credits">★ {s.credits}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card center" style={{ padding: '40px 20px' }}>
              <p className="muted">No results found for “{searchTerm}”. Try different keywords.</p>
            </div>
          )
        ) : (
          <div className="card center" style={{ padding: '40px 20px' }}>
            <p className="muted">Type a query above to explore the ECHELON database.</p>
          </div>
        )}
      </div>
    </section>
  );
};
