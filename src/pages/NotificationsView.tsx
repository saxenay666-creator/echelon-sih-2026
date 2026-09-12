import React, { useState } from 'react';
import { NOTIFICATIONS } from '../data/mockData';
import { NotificationItem } from '../types';
import { CheckCheck } from 'lucide-react';

interface NotificationsViewProps {
  navigate: (route: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ navigate, showToast }) => {
  const [items, setItems] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'problem' | 'solution' | 'evaluation'>('all');

  const handleMarkAllRead = () => {
    setItems(items.map((i) => ({ ...i, unread: false })));
    showToast('All notifications marked as read.');
  };

  const filteredItems = items.filter((i) => {
    if (activeFilter === 'all') return true;
    return i.category === activeFilter;
  });

  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <h2>Platform Activity & Notifications</h2>
          <p>Real-time telemetry and state changes on problems, student solution proposals, and government evaluation approvals.</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={handleMarkAllRead}>
          <CheckCheck size={14} />
          <span>Mark all read</span>
        </button>
      </div>

      <div className="tabs" style={{ marginBottom: '20px' }}>
        <button
          className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Updates ({items.length})
        </button>
        <button
          className={`tab-btn ${activeFilter === 'problem' ? 'active' : ''}`}
          onClick={() => setActiveFilter('problem')}
        >
          Problem Logs
        </button>
        <button
          className={`tab-btn ${activeFilter === 'solution' ? 'active' : ''}`}
          onClick={() => setActiveFilter('solution')}
        >
          Proposals & Matches
        </button>
        <button
          className={`tab-btn ${activeFilter === 'evaluation' ? 'active' : ''}`}
          onClick={() => setActiveFilter('evaluation')}
        >
          Government Reviews
        </button>
      </div>

      <div className="card" style={{ padding: '0 20px' }}>
        {filteredItems.map((item) => (
          <div className="notif-row" key={item.id}>
            <div className="notif-icon">{item.icon}</div>
            <div className="notif-text" style={{ flex: 1 }}>
              <p style={{ fontWeight: item.unread ? 600 : 400 }}>{item.title}</p>
              <span>{item.time}</span>
            </div>
            {item.unread && (
              <span className="badge st-selected" style={{ fontSize: '11px', alignSelf: 'center' }}>
                New
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
