import React, { useState } from 'react';
import { signIn } from '../services/data';

interface LoginProps { navigate: (route: string) => void; showToast: (msg: string) => void; }

export const Login: React.FC<LoginProps> = ({ navigate, showToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(email, password);
      showToast('Signed in successfully.');
      navigate('dashboard-student');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally { setLoading(false); }
  };

  return (
    <div className="split">
      <div className="split-left">
        <div className="brand" style={{ color: '#fff', marginBottom: '28px' }}>ECHELON</div>
        <h2>From Problems to Innovation. From Innovation to Impact.</h2>
        <p>Sign in to track registered problems, matched ideas, prototypes and deployments.</p>
      </div>
      <div className="split-right">
        <div className="auth-box">
          <h3 style={{ fontSize: '24px' }}>Welcome back</h3>
          <p className="muted" style={{ fontSize: '14px', marginTop: '6px' }}>Log in to your ECHELON account.</p>
          <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
            <div className="field"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div className="field"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>{loading ? 'Signing in…' : 'Login to Platform'}</button>
          </form>
          <p className="muted" style={{ textAlign: 'center', marginTop: '20px', fontSize: '13.5px' }}>
            Don't have an account yet? <button onClick={() => navigate('register')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, padding: 0, cursor: 'pointer' }}>Register here</button>
          </p>
        </div>
      </div>
    </div>
  );
};
