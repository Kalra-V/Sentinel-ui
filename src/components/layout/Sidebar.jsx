import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, Phone, Users, GitBranch, DollarSign, Settings, Link2, Bell } from 'lucide-react'
import { useState } from 'react'
import { practices } from '../../data/overview'

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { path: '/ask', label: 'Ask Sentinel', icon: MessageSquare, badge: '⌘K' },
    ],
  },
  {
    label: 'SIGNALS',
    items: [
      { path: '/calls', label: 'Calls', icon: Phone, badge: '312' },
      { path: '/patients', label: 'Patients', icon: Users },
      { path: '/journey', label: 'Patient Journey', icon: GitBranch },
      { path: '/revenue', label: 'Revenue', icon: DollarSign },
    ],
  },
  {
    label: 'CONNECTIONS',
    items: [
      { path: '/integrations', label: 'Integrations', icon: Link2, stub: true },
      { path: '/settings', label: 'Settings', icon: Settings, stub: true },
    ],
  },
]

export default function Sidebar({ practice, setPractice }) {
  const [showPracticeMenu, setShowPracticeMenu] = useState(false)
  const navigate = useNavigate()

  return (
    <aside style={{ width: 220, minWidth: 220, background: '#0F0F0F', borderRight: '1px solid #2A2A2A', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 40 }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #2A2A2A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 24, height: 24, background: '#F5A623', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" stroke="#0B0B0B" strokeWidth="1.5" fill="none"/>
              <circle cx="7" cy="7" r="2" fill="#0B0B0B"/>
            </svg>
          </div>
          <span style={{ color: '#F5A623', fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Sentinel</span>
        </div>
        <div style={{ color: '#3A3A3A', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>Practice Intelligence</div>
      </div>

      {/* Practice Selector */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1E1E1E', position: 'relative' }}>
        <div style={{ color: '#3A3A3A', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Viewing</div>
        <button
          onClick={() => setShowPracticeMenu(!showPracticeMenu)}
          style={{ width: '100%', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', color: '#F0EDE8', fontSize: 12 }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11 }}>{practice}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
            <path d="M2 4L5 7L8 4" stroke="#6B6B6B" strokeWidth="1.5"/>
          </svg>
        </button>
        {showPracticeMenu && (
          <div style={{ position: 'absolute', top: '100%', left: 16, right: 16, background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, zIndex: 100, overflow: 'hidden' }}>
            {practices.map(p => (
              <button
                key={p}
                onClick={() => { setPractice(p); setShowPracticeMenu(false) }}
                style={{ width: '100%', padding: '8px 12px', textAlign: 'left', fontSize: 11, color: p === practice ? '#F5A623' : '#F0EDE8', background: p === practice ? '#252525' : 'transparent', border: 'none', cursor: 'pointer', display: 'block' }}
                onMouseEnter={e => e.target.style.background = '#252525'}
                onMouseLeave={e => e.target.style.background = p === practice ? '#252525' : 'transparent'}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {navGroups.map(group => (
          <div key={group.label} style={{ marginBottom: 4 }}>
            <div style={{ padding: '10px 16px 4px', color: '#3A3A3A', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {group.label}
            </div>
            {group.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={e => { if (item.stub) e.preventDefault() }}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 16px',
                  fontSize: 12,
                  color: item.stub ? '#3A3A3A' : isActive ? '#F5A623' : '#9A9A9A',
                  background: isActive && !item.stub ? '#1A1A1A' : 'transparent',
                  borderLeft: isActive && !item.stub ? '2px solid #F5A623' : '2px solid transparent',
                  textDecoration: 'none',
                  cursor: item.stub ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s',
                })}
                onMouseEnter={e => { if (!item.stub) e.currentTarget.style.color = '#F0EDE8' }}
                onMouseLeave={e => { if (!item.stub) e.currentTarget.style.color = '' }}
              >
                <item.icon size={13} strokeWidth={1.8} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: 9, color: '#6B6B6B', background: '#1E1E1E', padding: '1px 5px', borderRadius: 3, letterSpacing: '0.05em' }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0B0B0B', flexShrink: 0 }}>
          CW
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: 11, color: '#F0EDE8', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Charlotte Webb</div>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Principal</div>
        </div>
      </div>
    </aside>
  )
}
