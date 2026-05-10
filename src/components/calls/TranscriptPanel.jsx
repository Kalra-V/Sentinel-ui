import { useState, useEffect } from 'react'
import { X, Play, Pause, ExternalLink, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TranscriptPanel({ call, onClose, onOpenPatient }) {
  const [isOpen, setIsOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (call) setTimeout(() => setIsOpen(true), 10)
    else setIsOpen(false)
  }, [call])

  useEffect(() => {
    if (playing) {
      const max = 100
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= max) { setPlaying(false); clearInterval(interval); return 0 }
          return p + 0.5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [playing])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  if (!call) return null

  const outcomeColors = { BOOKED: '#22C55E', CALLBACK: '#3B82F6', MISSED: '#EF4444', BOOKED_URGENT: '#F5A623', INFO_ONLY: '#6B6B6B', RESOLVED: '#06B6D4' }
  const outcomeLabels = { BOOKED: 'BOOKED', CALLBACK: 'CALLBACK', MISSED: 'MISSED', BOOKED_URGENT: 'BOOKED · URGENT', INFO_ONLY: 'INFO ONLY', RESOLVED: 'RESOLVED' }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49, opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 480,
        background: '#141414', borderLeft: '1px solid #2A2A2A',
        zIndex: 50, overflowY: 'auto',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #2A2A2A', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#141414', zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Call Transcript</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE8', marginBottom: 2 }}>
              {call.patientName || call.caller}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#5A5A5A' }}>{call.time} · {call.duration}</span>
              <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 3, letterSpacing: '0.06em', background: outcomeColors[call.outcome] + '22', color: outcomeColors[call.outcome], border: `1px solid ${outcomeColors[call.outcome]}44` }}>
                {outcomeLabels[call.outcome]}
              </span>
            </div>
          </div>
          <button onClick={handleClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6B6B6B', padding: 4, borderRadius: 4 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '16px 20px' }}>
          {/* Handler */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, padding: 12, background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4 }}>
            {call.handler.type === 'ai' ? (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#0B0B0B', flexShrink: 0 }}>S</div>
            ) : (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: '#F0EDE8', flexShrink: 0 }}>{call.handler.initials}</div>
            )}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#F0EDE8' }}>{call.handler.name}</div>
              <div style={{ fontSize: 10, color: '#5A5A5A' }}>{call.handler.type === 'ai' ? 'AI Receptionist' : 'Human Agent'}</div>
            </div>
          </div>

          {/* Audio Player */}
          {call.handler.type !== 'missed' && (
            <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, padding: '10px 14px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setPlaying(!playing)} style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5A623', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {playing ? <Pause size={11} color="#0B0B0B" /> : <Play size={11} color="#0B0B0B" style={{ marginLeft: 1 }} />}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 3, background: '#2A2A2A', borderRadius: 2, cursor: 'pointer', position: 'relative' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: '#F5A623', borderRadius: 2, transition: playing ? 'none' : 'width 0.1s' }} />
                  </div>
                </div>
                <span style={{ fontSize: 10, color: '#5A5A5A', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{call.duration}</span>
              </div>
            </div>
          )}

          {/* Cross-system links */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Linked Records</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {call.patientName && (
                <button
                  onClick={() => { onOpenPatient && onOpenPatient(call.patientId); handleClose(); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3, cursor: 'pointer', width: '100%' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#3A3A3A'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2A2A'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <User size={11} color="#F5A623" />
                    <span style={{ fontSize: 11, color: '#F0EDE8' }}>Patient Record — {call.patientName}</span>
                  </div>
                  <ExternalLink size={10} color="#4A4A4A" />
                </button>
              )}
              {call.appointmentLink && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 9, color: '#3B82F6', fontWeight: 700, letterSpacing: '0.04em' }}>D</span>
                    <span style={{ fontSize: 11, color: '#F0EDE8' }}>{call.appointmentLink}</span>
                  </div>
                  <ExternalLink size={10} color="#4A4A4A" />
                </div>
              )}
              {call.ghlLink && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 9, color: '#22C55E', fontWeight: 700, letterSpacing: '0.04em' }}>GHL</span>
                    <span style={{ fontSize: 11, color: '#F0EDE8' }}>{call.ghlLink}</span>
                  </div>
                  <ExternalLink size={10} color="#4A4A4A" />
                </div>
              )}
              {call.revenueValue && (
                <div style={{ padding: '7px 10px', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3 }}>
                  <span style={{ fontSize: 10, color: '#5A5A5A' }}>Revenue attributed: </span>
                  <span style={{ fontSize: 11, color: '#22C55E', fontVariantNumeric: 'tabular-nums' }}>{call.revenueValue}</span>
                </div>
              )}
            </div>
          </div>

          {/* Transcript */}
          {call.transcript.length > 0 && (
            <div>
              <div style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Full Transcript</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {call.transcript.map((line, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: line.role === 'sophie' ? '#F5A623' : line.role === 'human' ? '#2A2A2A' : '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: line.role === 'sophie' ? '#0B0B0B' : '#F0EDE8', flexShrink: 0, marginTop: 2 }}>
                      {line.role === 'sophie' ? 'S' : line.role === 'human' ? call.handler.initials?.slice(0, 2) || 'H' : 'PT'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, color: '#4A4A4A', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {line.role === 'sophie' ? 'Sophie (AI)' : line.role === 'human' ? call.handler.name : 'Patient'}
                      </div>
                      <div style={{ fontSize: 12, color: '#C0BDB8', lineHeight: 1.6 }}>{line.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {call.transcript.length === 0 && (
            <div style={{ padding: 16, background: '#1A1A1A', borderRadius: 4, border: '1px solid #2A2A2A', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#4A4A4A' }}>No transcript available for this call.</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
