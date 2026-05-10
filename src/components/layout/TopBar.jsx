import { Bell, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopBar() {
  const navigate = useNavigate()

  return (
    <header style={{ position: 'fixed', top: 0, left: 220, right: 0, height: 48, background: '#0F0F0F', borderBottom: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', zIndex: 30, padding: '0 20px', gap: 16 }}>
      {/* Search / Ask Sentinel bar */}
      <div
        onClick={() => navigate('/ask')}
        style={{ flex: 1, maxWidth: 460, background: '#141414', border: '1px solid #2A2A2A', borderRadius: 5, height: 30, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 8, cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#3A3A3A'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2A2A'}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="5" cy="5" r="3.5" stroke="#4A4A4A" strokeWidth="1.2"/>
          <path d="M8 8L10 10" stroke="#4A4A4A" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 11, color: '#4A4A4A', flex: 1 }}>Ask Sentinel, or search practice data…</span>
        <span style={{ fontSize: 10, color: '#3A3A3A', background: '#1E1E1E', padding: '1px 5px', borderRadius: 3, border: '1px solid #2A2A2A' }}>⌘K</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Live status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#111', border: '1px solid #1E1E1E', borderRadius: 4 }}>
        <span className="pulse-amber" style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5A623', display: 'inline-block' }} />
        <span style={{ fontSize: 10, color: '#6B6B6B', letterSpacing: '0.08em' }}>LIVE</span>
        <span style={{ color: '#2A2A2A', fontSize: 10 }}>·</span>
        <span style={{ fontSize: 10, color: '#4A4A4A', letterSpacing: '0.05em' }}>DENTALLY</span>
        <span style={{ color: '#2A2A2A', fontSize: 10 }}>·</span>
        <span style={{ fontSize: 10, color: '#4A4A4A', letterSpacing: '0.05em' }}>GHL</span>
        <span style={{ color: '#2A2A2A', fontSize: 10 }}>·</span>
        <span style={{ fontSize: 10, color: '#4A4A4A', letterSpacing: '0.05em' }}>TWILIO</span>
      </div>

      {/* Icons */}
      <button style={{ width: 30, height: 30, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, color: '#6B6B6B', position: 'relative' }}
        onMouseEnter={e => e.currentTarget.style.background = '#1A1A1A'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <Bell size={15} strokeWidth={1.5} />
        <span style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, background: '#F5A623', borderRadius: '50%' }} />
      </button>

      <button style={{ width: 30, height: 30, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, color: '#6B6B6B' }}
        onMouseEnter={e => e.currentTarget.style.background = '#1A1A1A'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <Download size={15} strokeWidth={1.5} />
      </button>
    </header>
  )
}
