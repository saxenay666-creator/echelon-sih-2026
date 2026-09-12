import React from 'react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer id="siteFooter">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: '14px' }}>
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <rect x="1" y="16" width="7" height="13" rx="1.5" fill="#0F3D3E" />
                <rect x="11.5" y="9" width="7" height="20" rx="1.5" fill="#1B6B65" />
                <rect x="22" y="1" width="7" height="28" rx="1.5" fill="#C7922E" />
              </svg>
              ECHELON
            </div>
            <p className="muted" style={{ fontSize: '13.5px', maxWidth: '34ch', lineHeight: 1.6 }}>
              From Problems to Innovation. From Innovation to Impact. A transparent civic-innovation pipeline connecting citizens, universities, industry and government.
            </p>
          </div>

          <div>
            <h5>Platform</h5>
            <a href="#/explorer" onClick={(e) => { e.preventDefault(); navigate('explorer'); }}>Problem Explorer</a>
            <a href="#/ideas" onClick={(e) => { e.preventDefault(); navigate('ideas'); }}>Ideas & Solutions</a>
            <a href="#/jharkhand" onClick={(e) => { e.preventDefault(); navigate('jharkhand'); }}>Jharkhand Impact</a>
            <a href="#/leaderboard" onClick={(e) => { e.preventDefault(); navigate('leaderboard'); }}>Leaderboard</a>
          </div>

          <div>
            <h5>Participate</h5>
            <a href="#/submit" onClick={(e) => { e.preventDefault(); navigate('submit'); }}>Submit a Problem</a>
            <a href="#/register" onClick={(e) => { e.preventDefault(); navigate('register'); }}>Register</a>
            <a href="#/partners" onClick={(e) => { e.preventDefault(); navigate('partners'); }}>Become a Partner</a>
            <a href="#/track" onClick={(e) => { e.preventDefault(); navigate('track'); }}>Track a Problem</a>
          </div>

          <div>
            <h5>About</h5>
            <a href="#/about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>Our Mission</a>
            <a href="#/how" onClick={(e) => { e.preventDefault(); navigate('how'); }}>How It Works</a>
            <a href="#/admin" onClick={(e) => { e.preventDefault(); navigate('admin'); }}>Admin & Moderation</a>
            <a href="#/notifications" onClick={(e) => { e.preventDefault(); navigate('notifications'); }}>Platform Updates</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ECHELON — SIH Prototype, Problem ID 26043</span>
          <span>Built for Smart India Hackathon 2026 · Jharkhand Prototype Focus</span>
        </div>
      </div>
    </footer>
  );
};
