import React, { useState } from 'react';
import { RoleType } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface RegisterProps {
  navigate: (route: string) => void;
  showToast: (msg: string) => void;
}

const ROLES: { name: RoleType; icon: string; desc: string }[] = [
  { name: 'Citizen', icon: '🧑', desc: 'Report local community problems and verify field solutions.' },
  { name: 'Student', icon: '🎓', desc: 'Build technology prototypes, collaborate in teams, and earn impact credits.' },
  { name: 'University', icon: '🏛️', desc: 'Connect faculty research labs and departments to verified state challenges.' },
  { name: 'Industry', icon: '🏭', desc: 'Deploy CSR capital, sponsor prototypes, and co-develop scalable hardware/software.' },
  { name: 'Government', icon: '🏢', desc: 'Evaluate prototypes for regulatory feasibility, budget compliance, and state rollout.' }
];

export const Register: React.FC<RegisterProps> = ({ navigate, showToast }) => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  // Form State
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
    org: '',
    dept: '',
    skills: '',
    location: 'Ranchi, Jharkhand'
  });

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Account successfully created for ${formData.name || 'User'} (${selectedRole})!`);
    
    // Direct user to their respective dashboard
    const dashboardMap: Record<RoleType, string> = {
      'Citizen': 'dashboard-citizen',
      'Student': 'dashboard-student',
      'University': 'dashboard-university',
      'Industry': 'dashboard-industry',
      'Government': 'dashboard-government',
      'Admin': 'admin'
    };
    navigate(dashboardMap[selectedRole || 'Student']);
  };

  return (
    <div className="split">
      <div className="split-left">
        <div className="brand" style={{ color: '#fff', marginBottom: '28px' }}>
          <svg width="32" height="32" viewBox="0 0 30 30" fill="none">
            <rect x="1" y="16" width="7" height="13" rx="1.5" fill="#fff" opacity="0.9" />
            <rect x="11.5" y="9" width="7" height="20" rx="1.5" fill="#fff" opacity="0.7" />
            <rect x="22" y="1" width="7" height="28" rx="1.5" fill="#C7922E" />
          </svg>
          ECHELON
        </div>
        <h2>Join a shared civic pipeline for solving real problems.</h2>
        <p>
          Every role — citizen, student, university, industry or government — plays an indispensable part in transforming problems into verified outcomes.
        </p>
      </div>

      <div className="split-right">
        <div className="auth-box" style={{ maxWidth: '440px' }}>
          {!selectedRole ? (
            <div>
              <h3 style={{ fontSize: '22px' }}>How do you want to participate in ECHELON?</h3>
              <p className="muted" style={{ fontSize: '14px', marginTop: '6px' }}>
                Select your primary stakeholder role to begin onboarding.
              </p>

              <div className="role-grid">
                {ROLES.map((r) => (
                  <div
                    key={r.name}
                    className="role-card"
                    onClick={() => handleRoleSelect(r.name)}
                  >
                    <div className="ricon">{r.icon}</div>
                    <div className="rname">{r.name}</div>
                    <div className="muted" style={{ fontSize: '11.5px', marginTop: '4px' }}>
                      {r.desc.slice(0, 48)}…
                    </div>
                  </div>
                ))}
              </div>

              <p className="muted" style={{ textAlign: 'center', marginTop: '24px', fontSize: '13.5px' }}>
                Already have an account?{' '}
                <button
                  onClick={() => navigate('login')}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, padding: 0, cursor: 'pointer' }}
                >
                  Login
                </button>
              </p>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginBottom: '16px' }}
                onClick={() => setSelectedRole(null)}
              >
                <ArrowLeft size={14} />
                <span>Change role</span>
              </button>

              <h3 style={{ fontSize: '22px' }}>Register as {selectedRole}</h3>
              <p className="muted" style={{ fontSize: '13.5px', marginTop: '4px' }}>
                Step 2 of 2 — Onboarding details for your {selectedRole.toLowerCase()} profile.
              </p>

              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <div className="field">
                  <label>Full Name / Primary Contact</label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Kujur"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="field">
                  <label>Official Email</label>
                  <input
                    type="email"
                    placeholder="you@domain.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                {selectedRole === 'Citizen' && (
                  <div className="field">
                    <label>District & Village / Ward</label>
                    <input
                      type="text"
                      placeholder="e.g. Nagri, Ranchi District"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                )}

                {(selectedRole === 'Student' || selectedRole === 'University') && (
                  <>
                    <div className="field">
                      <label>University / College Name</label>
                      <input
                        type="text"
                        placeholder="e.g. BIT Mesra"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Department / Discipline</label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Science & Engineering"
                        value={formData.dept}
                        onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {selectedRole === 'Student' && (
                  <div className="field">
                    <label>Key Technologies & Skills</label>
                    <input
                      type="text"
                      placeholder="e.g. IoT, LoRaWAN, Python, Embedded C"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />
                  </div>
                )}

                {selectedRole === 'Industry' && (
                  <>
                    <div className="field">
                      <label>Enterprise / Foundation Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Tata Steel Foundation"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        required
                      />
                    </div>
                    <div className="field">
                      <label>CSR / Technology Focus Areas</label>
                      <input
                        type="text"
                        placeholder="e.g. Rural Water, Renewable Energy, AgriTech"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {selectedRole === 'Government' && (
                  <>
                    <div className="field">
                      <label>Government Department / Agency</label>
                      <input
                        type="text"
                        placeholder="e.g. Dept. of Water Resources, Govt. of Jharkhand"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Jurisdiction Level</label>
                      <input
                        type="text"
                        placeholder="e.g. State / District Division"
                        value={formData.dept}
                        onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                  <span>Create {selectedRole} Profile</span>
                  <Check size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
