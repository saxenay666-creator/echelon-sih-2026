import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string, param?: string) => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate, unreadCount = 2 }) => {
  const [isDashOpen, setIsDashOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDashOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (route: string, param?: string) => {
    navigate(route, param);
    setIsMobileOpen(false);
    setIsDashOpen(false);
  };

  return (
    <header className="topbar">
      <div className="wrap nav-row">
        {/* Brand Logo */}
        <a
          href="#/home"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            handleNav('home');
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <rect x="1" y="16" width="7" height="13" rx="1.5" fill="#0F3D3E" />
            <rect x="11.5" y="9" width="7" height="20" rx="1.5" fill="#1B6B65" />
            <rect x="22" y="1" width="7" height="28" rx="1.5" fill="#C7922E" />
          </svg>
          ECHELON
        </a>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li>
            <a
              href="#/home"
              className={currentRoute === 'home' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#/about"
              className={currentRoute === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('about'); }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#/how"
              className={currentRoute === 'how' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('how'); }}
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#/explorer"
              className={currentRoute === 'explorer' || currentRoute === 'problem' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('explorer'); }}
            >
              Problems
            </a>
          </li>
          <li>
            <a
              href="#/ideas"
              className={currentRoute === 'ideas' || currentRoute === 'project' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('ideas'); }}
            >
              Ideas & Solutions
            </a>
          </li>
          <li>
            <a
              href="#/jharkhand"
              className={currentRoute === 'jharkhand' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('jharkhand'); }}
            >
              Impact
            </a>
          </li>
          <li>
            <a
              href="#/leaderboard"
              className={currentRoute === 'leaderboard' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('leaderboard'); }}
            >
              Leaderboard
            </a>
          </li>
          <li>
            <a
              href="#/partners"
              className={currentRoute === 'partners' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNav('partners'); }}
            >
              Partners
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Global Search Button */}
          <button
            className="icon-btn"
            aria-label="Search"
            title="Search"
            onClick={() => handleNav('search')}
          >
            <Search size={16} strokeWidth={1.8} />
          </button>

          {/* Notifications Button */}
          <button
            className="icon-btn"
            aria-label="Notifications"
            title="Notifications"
            onClick={() => handleNav('notifications')}
          >
            <Bell size={16} strokeWidth={1.8} />
            {unreadCount > 0 && <span className="ping" />}
          </button>

          {/* Dashboards Dropdown */}
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsDashOpen(!isDashOpen)}
              aria-expanded={isDashOpen}
            >
              <span>Dashboards</span>
              <ChevronDown size={14} />
            </button>
            {isDashOpen && (
              <div className="dropdown-panel">
                <div className="dd-label">Demo: view as</div>
                <a href="#/dashboard-citizen" onClick={(e) => { e.preventDefault(); handleNav('dashboard-citizen'); }}>
                  <span>🧑</span> Citizen Profile
                </a>
                <a href="#/dashboard-student" onClick={(e) => { e.preventDefault(); handleNav('dashboard-student'); }}>
                  <span>🎓</span> Student Dashboard
                </a>
                <a href="#/dashboard-university" onClick={(e) => { e.preventDefault(); handleNav('dashboard-university'); }}>
                  <span>🏛️</span> University Dashboard
                </a>
                <a href="#/dashboard-industry" onClick={(e) => { e.preventDefault(); handleNav('dashboard-industry'); }}>
                  <span>🏭</span> Industry Dashboard
                </a>
                <a href="#/dashboard-government" onClick={(e) => { e.preventDefault(); handleNav('dashboard-government'); }}>
                  <span>🏢</span> Government Dashboard
                </a>
                <div className="dd-sep" />
                <a href="#/admin" onClick={(e) => { e.preventDefault(); handleNav('admin'); }}>
                  <span>⚙️</span> Admin Dashboard
                </a>
              </div>
            )}
          </div>

          <button
            className="btn btn-ghost btn-sm top-btn"
            onClick={() => handleNav('track')}
          >
            Track Problem
          </button>
          <button
            className="btn btn-ghost btn-sm top-btn"
            onClick={() => handleNav('login')}
          >
            Login
          </button>
          <button
            className="btn btn-primary btn-sm top-btn"
            onClick={() => handleNav('register')}
          >
            Register
          </button>

          {/* Mobile menu trigger */}
          <button
            className="hamburger"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={22} color="#0F3D3E" /> : <Menu size={22} color="#0F3D3E" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="mobile-panel">
          <a href="#/home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Home</a>
          <a href="#/about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>About ECHELON</a>
          <a href="#/how" onClick={(e) => { e.preventDefault(); handleNav('how'); }}>How It Works</a>
          <a href="#/explorer" onClick={(e) => { e.preventDefault(); handleNav('explorer'); }}>Problems</a>
          <a href="#/ideas" onClick={(e) => { e.preventDefault(); handleNav('ideas'); }}>Ideas & Solutions</a>
          <a href="#/jharkhand" onClick={(e) => { e.preventDefault(); handleNav('jharkhand'); }}>Impact Dashboard</a>
          <a href="#/leaderboard" onClick={(e) => { e.preventDefault(); handleNav('leaderboard'); }}>Leaderboard</a>
          <a href="#/partners" onClick={(e) => { e.preventDefault(); handleNav('partners'); }}>Partners</a>
          <a href="#/track" onClick={(e) => { e.preventDefault(); handleNav('track'); }}>Track a Problem</a>
          <a href="#/search" onClick={(e) => { e.preventDefault(); handleNav('search'); }}>Search</a>
          <a href="#/notifications" onClick={(e) => { e.preventDefault(); handleNav('notifications'); }}>Notifications</a>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
            <div className="small-caps" style={{ fontWeight: 700, marginBottom: '8px' }}>DASHBOARDS</div>
            <a href="#/dashboard-citizen" onClick={(e) => { e.preventDefault(); handleNav('dashboard-citizen'); }}>🧑 Citizen Profile</a>
            <a href="#/dashboard-student" onClick={(e) => { e.preventDefault(); handleNav('dashboard-student'); }}>🎓 Student Dashboard</a>
            <a href="#/dashboard-university" onClick={(e) => { e.preventDefault(); handleNav('dashboard-university'); }}>🏛️ University Dashboard</a>
            <a href="#/dashboard-industry" onClick={(e) => { e.preventDefault(); handleNav('dashboard-industry'); }}>🏭 Industry Dashboard</a>
            <a href="#/dashboard-government" onClick={(e) => { e.preventDefault(); handleNav('dashboard-government'); }}>🏢 Government Dashboard</a>
            <a href="#/admin" onClick={(e) => { e.preventDefault(); handleNav('admin'); }}>⚙️ Admin Dashboard</a>
          </div>

          <div className="mp-actions">
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => handleNav('login')}>
              Login
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => handleNav('register')}>
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
