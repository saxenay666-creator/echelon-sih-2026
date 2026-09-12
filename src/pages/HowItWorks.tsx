import React from 'react';

const STEPS = [
  {
    num: 1,
    title: 'Citizen reports a problem',
    desc: 'The citizen submits a problem with title, location (district, village, coordinates), detailed description, and multi-format evidence — images, videos, voice recordings, or documents.',
    stakeholder: 'Citizen'
  },
  {
    num: 2,
    title: 'AI understands and tags the problem',
    desc: 'The AI analysis engine parses natural language submissions, extracts core problem category, subcategory, severity index, estimated affected population, required engineering disciplines, and relevant government departments.',
    stakeholder: 'AI Diagnostic Engine'
  },
  {
    num: 3,
    title: 'Smart matching to universities & departments',
    desc: 'ECHELON recommends the problem to matched academic institutions, faculty mentors, and student bodies based on departmental expertise, geographic proximity, and laboratory capabilities.',
    stakeholder: 'University & Students'
  },
  {
    num: 4,
    title: 'Students & universities propose ideas & solutions',
    desc: 'Student engineering teams form, design technology solutions, model costs and impact projections, and submit working conceptual blueprints or code repositories to the platform.',
    stakeholder: 'Student Teams'
  },
  {
    num: 5,
    title: 'Industry selects promising ideas for CSR / R&D',
    desc: 'Industry partners browse the idea repository, review technical feasibility and community reach, express sponsorship interest, and form joint co-development agreements.',
    stakeholder: 'Industry & CSR Partners'
  },
  {
    num: 6,
    title: 'Prototype development and validation',
    desc: 'The selected team develops a functional prototype through iterative milestones, sensor bench tests, and field trials under faculty and industry mentorship.',
    stakeholder: 'University + Industry'
  },
  {
    num: 7,
    title: 'Government evaluation and compliance review',
    desc: 'Relevant state administrative departments evaluate the prototype across safety, regulatory compliance, public health standards, scalability, and lifecycle costs — issuing approval, requests for changes, or pilot permissions.',
    stakeholder: 'Government Authority'
  },
  {
    num: 8,
    title: 'Field implementation in the target locality',
    desc: 'The approved technological system is deployed in the specific hamlet, ward, or block where the problem originated, with initial municipal or community oversight.',
    stakeholder: 'Implementation Agency'
  },
  {
    num: 9,
    title: 'Citizen feedback and loop closure',
    desc: 'The reporting citizen and the community verify the resolution on-site, rate the solution’s ongoing effectiveness, and officially complete the lifecycle.',
    stakeholder: 'Citizen & Community'
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>How ECHELON Works</h2>
          <p>One unified, transparent journey from a citizen's initial report to a government-approved, verified field solution.</p>
        </div>
      </div>

      <div style={{ maxWidth: '760px' }}>
        {STEPS.map((s, i) => {
          const isLast = i === STEPS.length - 1;
          return (
            <div key={s.num} style={{ display: 'flex', gap: '22px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: isLast ? 'var(--accent)' : 'var(--primary)',
                    color: isLast ? '#241a05' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '15px',
                    flexShrink: 0
                  }}
                >
                  {s.num}
                </div>
                {!isLast && (
                  <div style={{ width: '2px', flex: 1, background: 'var(--line)', margin: '6px 0' }} />
                )}
              </div>

              <div style={{ paddingBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '18px' }}>{s.title}</h4>
                  <span className="tag" style={{ background: 'var(--accent-soft)', color: '#6B4E12', borderColor: '#E0CC98' }}>
                    {s.stakeholder}
                  </span>
                </div>
                <p className="muted" style={{ fontSize: '14.5px', maxWidth: '58ch', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
