import { useState, useEffect } from 'react'
import { X, Phone, Calendar, FileText, CreditCard, MessageSquare, Zap, AlertTriangle } from 'lucide-react'

const nodeIcons = {
  acquisition: <Zap size={11} color="#F5A623" />,
  call: <Phone size={11} color="#3B82F6" />,
  appointment: <Calendar size={11} color="#22C55E" />,
  plan: <FileText size={11} color="#F5A623" />,
  payment: <CreditCard size={11} color="#22C55E" />,
  sms: <MessageSquare size={11} color="#6B6B6B" />,
  email: <MessageSquare size={11} color="#6B6B6B" />,
  lapse: <AlertTriangle size={11} color="#EF4444" />,
}

const nodeColors = {
  acquisition: '#F5A623',
  call: '#3B82F6',
  appointment: '#22C55E',
  plan: '#F5A623',
  payment: '#22C55E',
  sms: '#2A2A2A',
  email: '#2A2A2A',
  lapse: '#EF4444',
}

export default function PatientTimelinePanel({ patient, onClose }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (patient) setTimeout(() => setIsOpen(true), 10)
    else setIsOpen(false)
  }, [patient])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  if (!patient) return null

  const cumulativeLTV = []
  let running = 0
  patient.timeline.forEach(e => {
    if (e.value) running += e.value
    cumulativeLTV.push(running)
  })

  return (
    <>
      <div onClick={handleClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49, opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 500, background: '#141414', borderLeft: '1px solid #2A2A2A', zIndex: 50, overflowY: 'auto', transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #2A2A2A', position: 'sticky', top: 0, background: '#141414', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Patient Timeline</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8', marginBottom: 4 }}>{patient.name}</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#5A5A5A' }}>
                <span>DOB: {patient.dob}</span>
                <span>·</span>
                <span>{patient.practitioner}</span>
                <span>·</span>
                <span style={{ color: '#F5A623' }}>LTV: £{patient.lifetimeValue.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={handleClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6B6B6B', padding: 4 }}>
              <X size={16} />
            </button>
          </div>
          {/* Quick stats */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {[
              { label: 'Lifetime Value', value: `£${patient.lifetimeValue.toLocaleString()}`, color: '#F5A623' },
              { label: 'Last Visit', value: patient.lastVisit || 'Lapsed', color: patient.status === 'lapsed' ? '#EF4444' : '#F0EDE8' },
              { label: 'Source', value: patient.acquisitionSource, color: '#9A9A9A' },
              { label: 'Membership', value: patient.membership, color: patient.membership === 'Plan' ? '#22C55E' : '#6B6B6B' },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3, padding: '6px 8px' }}>
                <div style={{ fontSize: 8, color: '#3A3A3A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: s.color, fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Full History</div>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 1, background: '#1E1E1E' }} />

            {patient.timeline.map((event, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: event.type === 'lapse' ? 20 : 12, position: 'relative' }}>
                {/* Node icon */}
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: event.type === 'lapse' ? '#1A0A0A' : '#1A1A1A', border: `1px solid ${nodeColors[event.type]}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                  {nodeIcons[event.type]}
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <div style={{ fontSize: 11, color: event.type === 'lapse' ? '#EF4444' : '#F0EDE8', lineHeight: 1.4 }}>{event.text}</div>
                    {event.value ? (
                      <span style={{ fontSize: 11, color: '#F5A623', fontVariantNumeric: 'tabular-nums', flexShrink: 0, marginLeft: 8, fontWeight: 500 }}>
                        {event.value > 0 ? `+£${event.value.toLocaleString()}` : ''}
                      </span>
                    ) : null}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#4A4A4A' }}>{event.date}</span>
                    {event.campaign && <span style={{ fontSize: 9, color: '#3A3A3A', background: '#1A1A1A', border: '1px solid #2A2A2A', padding: '1px 5px', borderRadius: 3 }}>{event.campaign}</span>}
                    {event.source && <span style={{ fontSize: 9, color: '#F5A623', background: '#2A1A00', border: '1px solid #3A2800', padding: '1px 5px', borderRadius: 3 }}>{event.source}</span>}
                    {event.handler && <span style={{ fontSize: 9, color: event.handler === 'ai' ? '#F5A623' : '#6B6B6B' }}>{event.handler === 'ai' ? '· Sophie (AI)' : '· Human'}</span>}
                    {event.gap && <span style={{ fontSize: 9, color: '#EF4444' }}>{event.gap}-month gap flagged</span>}
                  </div>
                  {/* Running LTV after this event */}
                  {event.value && event.value > 0 && (
                    <div style={{ fontSize: 9, color: '#3A3A3A', marginTop: 3 }}>
                      Cumulative LTV: £{cumulativeLTV[i].toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
