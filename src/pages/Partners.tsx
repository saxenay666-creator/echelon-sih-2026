import React from 'react';
import { ArrowRight, Building2, GraduationCap, Factory, Sparkles } from 'lucide-react';

interface PartnersProps {
  navigate: (route: string) => void;
}

const PARTNER_GROUPS = [
  {
    title: 'University & Research Partners',
    icon: <GraduationCap size={20} />,
    members: ['BIT Mesra', 'NIT Jamshedpur', 'Ranchi University', 'BAU Ranchi', 'XLRI Jamshedpur', 'IIT (ISM) Dhanbad']
  },
  {
    title: 'Industry & CSR Foundations',
    icon: <Factory size={20} />,
    members: ['Tata Steel Foundation', 'Adani Foundation', 'JSPL CSR', 'Infosys Springboard', 'Coal India CSR']
  },
  {
    title: 'Government Departments',
    icon: <Building2 size={20} />,
    members: [
      'Dept. of Water Resources, Jharkhand',
      'Dept. of Education, Jharkhand',
      'Jharkhand Rural Development Dept.',
      'Urban Development & Housing Dept.',
      'Jharkhand State Pollution Control Board'
    ]
  },
  {
    title: 'Incubation & Innovation Ecosystem',
    icon: <Sparkles size={20} />,
    members: ['NASSCOM Foundation', 'Startup Jharkhand', 'IIT Patna Incubation Cell', 'Atal Innovation Mission', 'DST NIDHI']
  }
];

export const Partners: React.FC<PartnersProps> = ({ navigate }) => {
  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>Ecosystem Partners</h2>
          <p>
            Universities, industries, government departments and incubators powering the ECHELON innovation pipeline across Jharkhand.
          </p>
        </div>
      </div>

      {PARTNER_GROUPS.map((group, idx) => (
        <div key={idx} style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary)' }}>{group.icon}</span>
            <h3 style={{ fontSize: '18px' }}>{group.title}</h3>
          </div>

          <div className="grid-4">
            {group.members.map((name, mIdx) => (
              <div className="card center" key={mIdx} style={{ padding: '24px 16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--accent-soft)',
                    margin: '0 auto 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    fontFamily: 'Source Serif 4, serif',
                    fontSize: '18px'
                  }}
                >
                  {name.charAt(0)}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Join CTA */}
      <div className="card center" style={{ marginTop: '40px', padding: '48px 24px', background: 'var(--paper-raised)' }}>
        <h3 style={{ fontSize: '24px' }}>Become an ECHELON Partner</h3>
        <p className="muted" style={{ maxWidth: '52ch', margin: '10px auto 24px', lineHeight: 1.6 }}>
          Join our collaborative network as an academic institution, corporate CSR arm, municipal body or incubator to directly source verified local challenges and mentor promising engineering teams.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('register')}>
          <span>Register as a Partner</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};
