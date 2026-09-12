import React from 'react';

interface AboutProps {
  navigate: (route: string) => void;
}

export const About: React.FC<AboutProps> = ({ navigate }) => {
  return (
    <div>
      <section className="section wrap" style={{ paddingTop: '56px' }}>
        <div className="eyebrow-tag">
          <span className="dot" />
          <span>About ECHELON</span>
        </div>
        <h1 style={{ fontSize: '38px', maxWidth: '20ch' }}>
          A shared pipeline from citizen problem to implemented solution.
        </h1>
        <p className="muted" style={{ fontSize: '16px', maxWidth: '64ch', marginTop: '18px', lineHeight: 1.65 }}>
          ECHELON is a collaborative civic-innovation ecosystem that connects genuine, grassroots local problems with academic knowledge, student ingenuity, industry execution and government implementation — with complete transparency at every milestone.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: '60px' }}>
        <div className="grid-3">
          <div className="card">
            <h3 style={{ fontSize: '19px', marginBottom: '12px' }}>Our Mission</h3>
            <p className="muted" style={{ fontSize: '14.5px', lineHeight: 1.6 }}>
              Make societal problem-solving participatory, technology-driven, transparent, collaborative and measurable — for every citizen, across every district in Jharkhand and beyond.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '19px', marginBottom: '12px' }}>Our Vision</h3>
            <p className="muted" style={{ fontSize: '14.5px', lineHeight: 1.6 }}>
              A public infrastructure where no community issue is lost in bureaucratic silos. Every verified problem systematically moves through: Problem → Knowledge → Innovation → Industry → Implementation.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '19px', marginBottom: '12px' }}>Our Core Principle</h3>
            <p className="muted" style={{ fontSize: '14.5px', lineHeight: 1.6 }}>
              AI analyzes, categorizes, recommends and matches. Human experts propose, select, develop, evaluate, approve and implement. The vital decisions always remain strictly human.
            </p>
          </div>
        </div>

        {/* Stakeholder Ecosystem */}
        <div className="section-head" style={{ marginTop: '56px' }}>
          <div>
            <h2>The Four Pillars of ECHELON</h2>
            <p>Every participant has a defined role, incentives, and measurable impact credits.</p>
          </div>
        </div>

        <div className="grid-4">
          <div className="card">
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>🧑</div>
            <h4 style={{ fontSize: '16px', marginBottom: '6px' }}>Citizens</h4>
            <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
              Report ground-level issues with photos, audio notes, and pinpoints. Track progress in real-time and provide final resolution feedback.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>🎓</div>
            <h4 style={{ fontSize: '16px', marginBottom: '6px' }}>Students & Academia</h4>
            <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
              Apply engineering and scientific training to verified local challenges. Earn academic credits, national visibility, and prototype grants.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>🏭</div>
            <h4 style={{ fontSize: '16px', marginBottom: '6px' }}>Industry & CSR</h4>
            <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
              Discover vetted grassroots prototypes, deploy CSR capital with verified audit trails, and co-develop commercial scalable products.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>🏢</div>
            <h4 style={{ fontSize: '16px', marginBottom: '6px' }}>Government</h4>
            <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
              Evaluate vetted technological solutions for feasibility, safety, and budget before approving pilots or state-wide implementation.
            </p>
          </div>
        </div>

        <div className="card center" style={{ marginTop: '48px', padding: '44px 20px', background: 'var(--primary)', color: '#fff' }}>
          <h3 style={{ color: '#fff', fontSize: '22px' }}>Ready to contribute to the pipeline?</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', maxWidth: '48ch', margin: '8px auto 20px' }}>
            Whether you are reporting an urgent community need or building an engineering solution, ECHELON bridges the gap.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-accent" onClick={() => navigate('submit')}>
              Submit a Problem
            </button>
            <button className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }} onClick={() => navigate('register')}>
              Join as Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
