import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { practices } from '../../data/overview'

export default function AppShell() {
  const [practice, setPractice] = useState(practices[0])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0B0B', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 6 }}>
            Sentinel - Web Widget Testing Page
          </div>
      {/* <div> Dummy page </div> */}
      {/* <Sidebar practice={practice} setPractice={setPractice} />
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar />
        <main style={{ flex: 1, paddingTop: 48, overflowY: 'auto' }}>
          <Outlet context={{ practice }} />
        </main>
      </div> */}
    </div>
  )
}
