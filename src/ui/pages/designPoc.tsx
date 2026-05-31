import { useState } from 'react'

export function DesignPocPage() {
  const [currentActivity, setCurrentActivity] = useState({ name: 'Begging', progress: 67, icon: '🧎' })
  const [queuedActivities] = useState([
    { name: 'Carry Goods', icon: '📦', duration: '2h' },
    { name: 'Study Classics', icon: '📚', duration: '4h' },
  ])

  const activities = [
    { id: 'beg', name: 'Begging', icon: '🧎', duration: '1h', reward: '+12 copper', unlocked: true },
    { id: 'carry', name: 'Carry Goods', icon: '📦', duration: '2h', reward: '+8 Strength', unlocked: true },
    { id: 'study', name: 'Study Classics', icon: '📚', duration: '4h', reward: '+15 Wisdom', unlocked: true },
    { id: 'meditate', name: 'Meditate', icon: '🧘', duration: '3h', reward: '??? Qi ???', unlocked: false },
    { id: 'forge', name: 'Forge Artifacts', icon: '⚒️', duration: '6h', reward: '??? Treasures ???', unlocked: false },
  ]

  return (
    <div className="poc-container">
      <div className="poc-status-bar">
        <div className="poc-age-realm">
          <span className="poc-age">Age: 23</span>
          <span className="poc-divider">|</span>
          <span className="poc-realm">Mortal • Stage 9</span>
        </div>
        <div className="poc-resources">
          <span className="poc-spirit-stones">🪙 1,234 copper</span>
        </div>
      </div>

      <div className="poc-main-layout">
        <aside className="poc-sidebar">
          <div className="poc-vitality-section">
            <div className="poc-stat-label">Vitality</div>
            <div className="poc-vitality-bar">
              <div className="poc-vitality-fill" style={{ width: '73%' }} />
            </div>
            <div className="poc-stat-value">73 / 100</div>
          </div>

          <div className="poc-qi-section">
            <div className="poc-stat-label">Qi</div>
            <div className="poc-qi-bar">
              <div className="poc-qi-fill" style={{ width: '0%' }} />
            </div>
            <div className="poc-stat-value-locked">Locked</div>
          </div>

          <nav className="poc-nav">
            <div className="poc-nav-item active">⚔️ Life</div>
            <div className="poc-nav-item">📖 Study</div>
            <div className="poc-nav-item">💼 Work</div>
            <div className="poc-nav-item locked">✧ Qi Path</div>
          </nav>
        </aside>

        <main className="poc-content">
          <h1 className="poc-page-title">Activities</h1>
          <p className="poc-page-subtitle">Choose your path through mortal toil</p>

          <div className="poc-activities-grid">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`poc-activity-card ${!activity.unlocked ? 'locked' : ''}`}
                onClick={() => activity.unlocked && setCurrentActivity({ name: activity.name, progress: 0, icon: activity.icon })}
              >
                <div className="poc-activity-icon">{activity.icon}</div>
                <div className="poc-activity-name">{activity.name}</div>
                <div className="poc-activity-duration">{activity.duration}</div>
                <div className="poc-activity-reward">{activity.reward}</div>
                {!activity.unlocked && <div className="poc-unlock-hint">Reach Stage 10</div>}
              </div>
            ))}
          </div>
        </main>
      </div>

      <div className="poc-queue">
        <div className="poc-queue-current">
          <div className="poc-queue-icon glowing">{currentActivity.icon}</div>
          <div className="poc-queue-details">
            <div className="poc-queue-name">{currentActivity.name}</div>
            <div className="poc-queue-progress-bar">
              <div className="poc-queue-progress-fill" style={{ width: `${currentActivity.progress}%` }} />
            </div>
          </div>
          <div className="poc-queue-percent">{currentActivity.progress}%</div>
        </div>

        {queuedActivities.length > 0 && (
          <div className="poc-queue-next">
            {queuedActivities.map((act, i) => (
              <div key={i} className="poc-queue-item">
                <div className="poc-queue-icon">{act.icon}</div>
                <div className="poc-queue-item-name">{act.name}</div>
                <div className="poc-queue-item-duration">{act.duration}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .poc-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%);
          background-image:
            radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 168, 107, 0.02) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.01'/%3E%3C/svg%3E");
          color: #f0f4f8;
          font-family: 'Crimson Pro', serif;
          overflow-x: hidden;
        }

        .poc-status-bar {
          background: linear-gradient(90deg, rgba(10, 14, 26, 0.95) 0%, rgba(26, 31, 53, 0.95) 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .poc-age-realm {
          display: flex;
          gap: 1rem;
          align-items: center;
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }

        .poc-age {
          color: #d4af37;
          font-weight: 600;
        }

        .poc-divider {
          color: rgba(240, 244, 248, 0.3);
        }

        .poc-realm {
          color: #f0f4f8;
          font-weight: 400;
        }

        .poc-resources {
          font-family: 'JetBrains Mono', monospace;
          color: #d4af37;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .poc-main-layout {
          display: flex;
          gap: 0;
          min-height: calc(100vh - 180px);
        }

        .poc-sidebar {
          width: 280px;
          background: linear-gradient(180deg, rgba(10, 14, 26, 0.6) 0%, rgba(15, 20, 35, 0.6) 100%);
          border-right: 1px solid rgba(212, 175, 55, 0.15);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .poc-vitality-section,
        .poc-qi-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .poc-stat-label {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #d4af37;
          font-weight: 600;
        }

        .poc-vitality-bar,
        .poc-qi-bar {
          height: 8px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .poc-vitality-fill {
          height: 100%;
          background: linear-gradient(90deg, #00a86b 0%, #4ade80 100%);
          box-shadow: 0 0 10px rgba(0, 168, 107, 0.5);
          transition: width 0.5s ease;
        }

        .poc-qi-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4af37 0%, #fbbf24 100%);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
          transition: width 0.5s ease;
        }

        .poc-stat-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: rgba(240, 244, 248, 0.7);
        }

        .poc-stat-value-locked {
          font-family: 'Crimson Pro', serif;
          font-size: 0.75rem;
          color: rgba(139, 0, 255, 0.7);
          font-style: italic;
        }

        .poc-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .poc-nav-item {
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(26, 31, 53, 0.3);
          border: 1px solid transparent;
        }

        .poc-nav-item:hover:not(.locked) {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.3);
          transform: translateX(4px);
        }

        .poc-nav-item.active {
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
          color: #d4af37;
          font-weight: 600;
        }

        .poc-nav-item.locked {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .poc-content {
          flex: 1;
          padding: 3rem 4rem;
        }

        .poc-page-title {
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #d4af37 0%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
        }

        .poc-page-subtitle {
          font-family: 'Crimson Pro', serif;
          font-size: 1.1rem;
          color: rgba(240, 244, 248, 0.5);
          margin: 0 0 3rem 0;
          font-style: italic;
          font-weight: 300;
        }

        .poc-activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .poc-activity-card {
          background: linear-gradient(135deg, rgba(26, 31, 53, 0.4) 0%, rgba(15, 20, 35, 0.6) 100%);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .poc-activity-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .poc-activity-card:hover:not(.locked)::before {
          left: 100%;
        }

        .poc-activity-card:hover:not(.locked) {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
        }

        .poc-activity-card.locked {
          opacity: 0.4;
          cursor: not-allowed;
          filter: grayscale(0.8);
        }

        .poc-activity-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .poc-activity-name {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 0.5rem;
          color: #f0f4f8;
        }

        .poc-activity-duration {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          text-align: center;
          color: rgba(240, 244, 248, 0.5);
          margin-bottom: 0.75rem;
        }

        .poc-activity-reward {
          font-family: 'Crimson Pro', serif;
          font-size: 0.9rem;
          text-align: center;
          color: #00a86b;
          font-weight: 600;
        }

        .poc-unlock-hint {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(139, 0, 255, 0.2);
          padding: 0.5rem;
          font-size: 0.75rem;
          text-align: center;
          color: #c084fc;
          font-style: italic;
          border-top: 1px solid rgba(139, 0, 255, 0.3);
        }

        .poc-queue {
          background: linear-gradient(90deg, rgba(10, 14, 26, 0.95) 0%, rgba(26, 31, 53, 0.95) 100%);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          padding: 1.5rem 2rem;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .poc-queue-current {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          max-width: 600px;
        }

        .poc-queue-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26, 31, 53, 0.6);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
        }

        .poc-queue-icon.glowing {
          animation: glow 2s ease-in-out infinite;
          border-color: rgba(212, 175, 55, 0.8);
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
          }
        }

        .poc-queue-details {
          flex: 1;
        }

        .poc-queue-name {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #d4af37;
        }

        .poc-queue-progress-bar {
          height: 6px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
          overflow: hidden;
        }

        .poc-queue-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4af37 0%, #fbbf24 100%);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
          transition: width 0.3s ease;
        }

        .poc-queue-percent {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          color: #d4af37;
          font-weight: 500;
          min-width: 50px;
          text-align: right;
        }

        .poc-queue-next {
          display: flex;
          gap: 1rem;
          padding-left: 2rem;
          border-left: 1px solid rgba(212, 175, 55, 0.2);
        }

        .poc-queue-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.6;
        }

        .poc-queue-item .poc-queue-icon {
          width: 40px;
          height: 40px;
          font-size: 1.5rem;
        }

        .poc-queue-item-name {
          font-size: 0.75rem;
          font-family: 'Cinzel', serif;
          text-align: center;
        }

        .poc-queue-item-duration {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: rgba(240, 244, 248, 0.5);
        }
      `}</style>
    </div>
  )
}
