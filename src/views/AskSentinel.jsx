import { useState } from 'react'
import { Send, BarChart2, ArrowRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const suggestedPrompts = [
  { id: 'invisalign', label: 'How many Invisalign leads from Meta Ads booked treatment plans?' },
  { id: 'fta', label: 'Why did FTA rate spike last week?' },
  { id: 'utilisation', label: 'Which practitioner has the lowest chair utilisation this month?' },
  { id: 'pipeline', label: 'Which patients have high treatment value but no follow-up booked?' },
]

const cannedResponses = {
  invisalign: {
    prompt: 'How many Invisalign leads from Meta Ads booked treatment plans?',
    text: `New patient acquisition from Meta Ads increased **18% month-over-month**, primarily driven by Invisalign enquiries. However, conversion to booked consultations is running below practice average.

Of **47 Meta Ads leads** this period:
- **31** were contacted by Sophie within 2 minutes of enquiry
- **19** booked a consultation appointment
- **12** attended their consultation
- **8** accepted a treatment plan (conversion: **41%** vs practice avg **58%**)

The 15 unbooked leads are active in GHL with a 5-step follow-up sequence. 3 have opened the last email. Average lead-to-book time for this source is **4.2 days**.

**Data sources used:** Dentally appointments · GHL pipeline · Call analytics (Retell / Sophie)`,
    chart: {
      title: 'Invisalign Lead Funnel — Meta Ads',
      data: [
        { stage: 'Enquiries', value: 47, color: '#F5A623' },
        { stage: 'Contacted', value: 31, color: '#F5A623' },
        { stage: 'Booked', value: 19, color: '#F5A623' },
        { stage: 'Attended', value: 12, color: '#F5A623' },
        { stage: 'Accepted Plan', value: 8, color: '#22C55E' },
      ]
    }
  },
  fta: {
    prompt: 'Why did FTA rate spike last week?',
    text: `FTA rate increased from **3.8% to 6.2%** last week — a **2.4 percentage point** rise. This is statistically significant and warrants attention.

Three factors appear to be driving this:

1. **Invisalign consultation FTAs** increased disproportionately (+14%). These are long-lead new patient appointments with higher no-show risk. Confirmation SMS was sent 24h before but no 2h reminder was configured for this appointment type.

2. **Dr Okafor's Wednesday afternoon list** had 3 FTAs from patients who had previously cancelled once before. All 3 are NHS patients with >12-month gaps in attendance.

3. **Weather:** Tube disruptions on the Central line on Wednesday affected arrival rates across the board — 4 of 6 FTAs that day were patients travelling from Zones 2-3.

**Recommended actions:** Enable 2h confirmation reminder for consultation appointments. Flag repeat-cancel patients for phone confirmation rather than SMS.

**Data sources used:** Dentally appointments · GHL communication logs · SMS delivery records`,
    chart: {
      title: 'FTA Rate — Last 14 Days',
      data: [
        { date: 'Apr 27', value: 3.8 },
        { date: 'Apr 28', value: 3.6 },
        { date: 'Apr 29', value: 3.9 },
        { date: 'Apr 30', value: 4.1 },
        { date: 'May 1', value: 4.2 },
        { date: 'May 2', value: 4.0 },
        { date: 'May 3', value: 3.8 },
        { date: 'May 4', value: 3.7 },
        { date: 'May 5', value: 5.1 },
        { date: 'May 6', value: 6.2 },
        { date: 'May 7', value: 5.8 },
        { date: 'May 8', value: 5.4 },
        { date: 'May 9', value: 4.9 },
        { date: 'May 10', value: 4.1 },
      ].map(d => ({ ...d, color: d.value > 5 ? '#EF4444' : '#F5A623' }))
    }
  },
  utilisation: {
    prompt: 'Which practitioner has the lowest chair utilisation this month?',
    text: `**Dr Chen** has the lowest chair utilisation this month at **68%** — 10 percentage points below the practice average of 78%.

Breakdown of Dr Chen's current month:
- **Available chair hours:** 88h
- **Booked hours:** 59.8h (68%)
- **Completed hours:** 54.2h (FTA-adjusted: 61.6%)
- **Unfilled slots:** 28.2h of bookable time remaining this month

The utilisation gap is concentrated in **Tuesday afternoons** and **Friday mornings** — these slots have had consistent low booking rates for the past 6 weeks. Dr Chen's appointment type mix is heavily weighted toward new patient consultations (42%) which have longer average lead times.

**Waitlist match:** 11 existing patients are waiting for appointments with Dr Chen, 4 of whom could fill Tuesday afternoon slots within 7 days.

**Data sources used:** Dentally diary · Dentally appointments · GHL waitlist`,
    chart: {
      title: 'Practitioner Utilisation — This Month',
      data: [
        { name: 'Dr Patel', value: 84, color: '#22C55E' },
        { name: 'Dr Morrison', value: 76, color: '#F5A623' },
        { name: 'Dr Okafor', value: 71, color: '#F5A623' },
        { name: 'Dr Chen', value: 68, color: '#EF4444' },
      ]
    }
  },
  pipeline: {
    prompt: 'Which patients have high treatment value but no follow-up booked?',
    text: `**9 patients** have outstanding treatment plan value above £1,000 with no follow-up appointment booked. Combined pipeline value: **£18,400**.

| Patient | Treatment | Value | Last Contact | Gap |
|---|---|---|---|---|
| Ranjit Singh | Implant + Crown | £2,800 | SMS (18d ago) | 18 months lapsed |
| Tom Hargreaves | Implant consult | £3,600 | No contact | New plan, no FU |
| David Osei | Invisalign Lite | £1,950 | Email (7d ago) | Plan accepted, no appt |
| Sofia Petrov | Composite Bonding | £2,400 | Email (5d ago) | Plan active, no next appt |
| Claire Bennett | Invisalign Lite | £1,950 | No contact | New plan |
| + 4 others | Various | £5,700 | — | — |

**Sophie has capacity** to contact all 9 this week. GHL sequences are not active for 6 of these patients.

**Recommended action:** Activate reactivation sequence for lapsed patients; direct booking call for active plan holders.

**Data sources used:** Dentally treatment plans · GHL pipeline · Call analytics`,
    chart: {
      title: 'Unbooked Pipeline by Practitioner',
      data: [
        { name: 'Dr Patel', value: 6400, color: '#F5A623' },
        { name: 'Dr Okafor', value: 5800, color: '#F5A623' },
        { name: 'Dr Chen', value: 4200, color: '#F5A623' },
        { name: 'Dr Morrison', value: 2000, color: '#F5A623' },
      ]
    }
  },
}

function formatText(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    // Bold text
    const formatted = line.replace(/\*\*(.+?)\*\*/g, (_, content) => `<strong style="color:#F0EDE8">${content}</strong>`)
    if (line.startsWith('| ')) {
      return null // handle tables separately
    }
    if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
    return <div key={i} style={{ lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: formatted }} />
  })
}

function InlineChart({ chart }) {
  if (!chart) return null
  return (
    <div style={{ margin: '16px 0', background: '#0F0F0F', border: '1px solid #1E1E1E', borderRadius: 4, padding: '12px 16px' }}>
      <div style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{chart.title}</div>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={chart.data} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false}
            tickFormatter={v => v > 100 ? `£${(v/1000).toFixed(1)}k` : v > 10 ? `${v}%` : v} />
          <YAxis type="category" dataKey={chart.data[0]?.stage ? 'stage' : chart.data[0]?.name ? 'name' : 'date'} tick={{ fontSize: 9, fill: '#9A9A9A' }} axisLine={false} tickLine={false} width={80} />
          <Tooltip formatter={(v) => [v > 100 ? `£${v.toLocaleString()}` : v, '']} contentStyle={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4 }} />
          <Bar dataKey="value" radius={2}>
            {chart.data.map((entry, i) => <Cell key={i} fill={entry.color || '#F5A623'} fillOpacity={0.85} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function AskSentinel() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendPrompt = (promptId, promptText) => {
    const response = cannedResponses[promptId]
    if (!response) return

    setMessages(prev => [...prev,
      { role: 'user', text: promptText || response.prompt },
    ])
    setLoading(true)
    setTimeout(() => {
      setMessages(prev => [...prev,
        { role: 'sentinel', text: response.text, chart: response.chart }
      ])
      setLoading(false)
    }, 900)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const matchedId = Object.keys(cannedResponses).find(id =>
      cannedResponses[id].prompt.toLowerCase().includes(input.toLowerCase().slice(0, 20))
    ) || 'invisalign'
    sendPrompt(matchedId, input)
    setInput('')
  }

  const isEmpty = messages.length === 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 48px)', background: '#0B0B0B' }}>
      {/* Header */}
      <div style={{ padding: '20px 32px 16px', borderBottom: '1px solid #1A1A1A', flexShrink: 0 }}>
        <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Sentinel AI Analyst</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.02em' }}>
          Ask Sentinel
        </div>
        <div style={{ fontSize: 11, color: '#3A3A3A', marginTop: 3 }}>Powered by Claude · reads Dentally, GHL, and call analytics</div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
        {isEmpty && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Ask anything about<br />
              <em style={{ color: '#F5A623', fontStyle: 'italic' }}>Chelsea Dental Studio.</em>
            </div>
            <div style={{ fontSize: 12, color: '#4A4A4A', marginBottom: 32 }}>
              I'll search across Dentally, GHL, and your call data to give you a grounded answer.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {suggestedPrompts.map(p => (
                <button
                  key={p.id}
                  onClick={() => sendPrompt(p.id, p.label)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5A62344'; e.currentTarget.style.background = '#181818' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.background = '#141414' }}
                >
                  <BarChart2 size={14} color="#F5A623" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 12, color: '#9A9A9A', lineHeight: 1.5 }}>{p.label}</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 32, padding: '12px 16px', background: '#0F0F0F', border: '1px solid #1A1A1A', borderRadius: 4, display: 'flex', gap: 16 }}>
              {['Dentally', 'GoHighLevel', 'Retell / Twilio'].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#3A3A3A' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isEmpty && (
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === 'user' ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ maxWidth: '75%', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px 8px 2px 8px', padding: '10px 14px', fontSize: 13, color: '#F0EDE8' }}>
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#0B0B0B', flexShrink: 0, marginTop: 2 }}>S</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: '#3A3A3A', marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span>Sentinel</span>
                        <span style={{ color: '#2A2A2A' }}>·</span>
                        <span>Claude Opus 4.7</span>
                        <span style={{ color: '#2A2A2A' }}>·</span>
                        <span style={{ color: '#22C55E' }}>Dentally · GHL · Calls</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#C0BDB8', lineHeight: 1.7 }}>
                        {formatText(msg.text)}
                      </div>
                      {msg.chart && <InlineChart chart={msg.chart} />}
                      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        {['Show underlying data', 'Export as spreadsheet', 'Ask follow-up'].map(action => (
                          <button key={action} style={{ fontSize: 10, color: '#4A4A4A', background: '#141414', border: '1px solid #2A2A2A', borderRadius: 3, padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#F0EDE8'; e.currentTarget.style.borderColor = '#3A3A3A' }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#4A4A4A'; e.currentTarget.style.borderColor = '#2A2A2A' }}
                          >
                            {action} <ArrowRight size={9} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#0B0B0B', flexShrink: 0 }}>S</div>
                <div style={{ padding: '12px 0' }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {[0, 1, 2].map(j => (
                      <div key={j} className="skeleton" style={{ width: 5, height: 5, borderRadius: '50%', animationDelay: `${j * 0.2}s` }} />
                    ))}
                    <span style={{ fontSize: 10, color: '#3A3A3A', marginLeft: 6 }}>Querying Dentally, GHL, call analytics…</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{ padding: '16px 32px', borderTop: '1px solid #1A1A1A', flexShrink: 0 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {!isEmpty && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
              {suggestedPrompts.slice(0, 3).map(p => (
                <button key={p.id} onClick={() => sendPrompt(p.id, p.label)} style={{ fontSize: 10, color: '#4A4A4A', background: '#141414', border: '1px solid #2A2A2A', borderRadius: 3, padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F0EDE8'; e.currentTarget.style.borderColor = '#3A3A3A' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#4A4A4A'; e.currentTarget.style.borderColor = '#2A2A2A' }}
                >
                  {p.label.length > 45 ? p.label.slice(0, 45) + '…' : p.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your practice…"
              style={{ flex: 1, background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '10px 14px', fontSize: 13, color: '#F0EDE8', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#3A3A3A'}
              onBlur={e => e.target.style.borderColor = '#2A2A2A'}
            />
            <button onClick={handleSend} style={{ width: 40, background: '#F5A623', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Send size={15} color="#0B0B0B" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
