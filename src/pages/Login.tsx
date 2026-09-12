import React, { useState } from 'react';

interface LoginProps {
  navigate: (route: string) => void;
  showToast: (msg: string) => void;
}

export const Login: React.FC<LoginProps> = ({ navigate, showToast }) => {
  const [email, setEmail] = useState('ananya.kujur@bitmesra.ac.in');
  const [password, setPassword] = useState('••••••••');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Signed in successfully! Redirecting to dashboard...');
    navigate('dashboard-student');
  };

  const quickLoginAs = (role: string, targetRoute: string) => {
    showToast(`Logged in as demo ${role}`);
    navigate(targetRoute);
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
        <h2>From Problems to Innovation. From Innovation to Impact.</h2>
        <p>
          Sign in to track your registered problems, review matched student ideas, evaluate prototypes, or administer municipal deployments.
        </p>

        {/* Quick Persona Access for SIH evaluation */}
        <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '10px', fontWeight: 600 }}>
            Quick Demo Login
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '12px' }}
              onClick={() => quickLoginAs('Citizen', 'dashboard-citizen')}
            >
              🧑 Citizen
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '12px' }}
              onClick={() => quickLoginAs('Student', 'dashboard-student')}
            >
              🎓 Student
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '12px' }}
              onClick={() => quickLoginAs('University', 'dashboard-university')}
            >
              🏛️ University
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '12px' }}
              onClick={() => quickLoginAs('Industry', 'dashboard-industry')}
            >
              🏭 Industry
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '12px' }}
              onClick={() => quickLoginAs('Government', 'dashboard-government')}
            >
              🏢 Government
            </button>
          </div>
        </div>
      </div>

      <div className="split-right">
        <div className="auth-box">
          <h3 style={{ fontSize: '24px' }}>Welcome back</h3>
          <p className="muted" style={{ fontSize: '14px', marginTop: '6px' }}>
            Log in to your verified ECHELON account.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
            <div className="field">
              <label>Official Email</label>
              <input
                type="email"
                placeholder="you@institution.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="checkbox-row">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ width: 'auto' }}
                />
                <span>Remember me</span>
              </label>
              <a
                href="#/forgot"
                onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to demo email.'); }}
                style={{ color: 'var(--primary-light)', fontWeight: 600 }}
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login to Platform
            </button>
          </form>

          <p className="muted" style={{ textAlign: 'center', marginTop: '20px', fontSize: '13.5px' }}>
            Don't have an account yet?{' '}
            <button
              onClick={() => navigate('register')}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, padding: 0, cursor: 'pointer' }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
