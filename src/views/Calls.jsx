import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Download } from 'lucide-react'
import DateRangePicker from '../components/shared/DateRangePicker'
import TranscriptPanel from '../components/calls/TranscriptPanel'
import { callsData } from '../data/calls'
import { toPracticeKey } from '../utils/practice'

const outcomeColors = { BOOKED: '#22C55E', CALLBACK: '#3B82F6', MISSED: '#EF4444', BOOKED_URGENT: '#F5A623', INFO_ONLY: '#6B6B6B', RESOLVED: '#06B6D4' }
const outcomeLabels = { BOOKED: 'BOOKED', CALLBACK: 'CALLBACK', MISSED: 'MISSED', BOOKED_URGENT: 'BOOKED · URGENT', INFO_ONLY: 'INFO ONLY', RESOLVED: 'RESOLVED' }

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function getHeatColor(val, max) {
  const intensity = val / max
  const alpha = Math.round(intensity * 200 + 20)
  return `rgba(245, 166, 35, ${intensity * 0.8 + 0.05})`
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, padding: '8px 12px' }}>
      <div style={{ fontSize: 10, color: '#6B6B6B', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ fontSize: 11, color: p.color || '#F0EDE8', display: 'flex', gap: 8 }}>
          <span style={{ color: '#6B6B6B' }}>{p.name}:</span>
          <span style={{ color: '#F0EDE8' }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Calls() {
  const [toggle, setToggle] = useState('All')
  const [range, setRange] = useState('30d')
  const [selectedCall, setSelectedCall] = useState(null)
  const [openPatientId, setOpenPatientId] = useState(null)
  const navigate = useNavigate()
  const { practice } = useOutletContext()

  const practiceKey = toPracticeKey(practice)
  const data = callsData[practiceKey]
  const callKPIs = data.kpis[range] || data.kpis['30d']
  const aiVsHuman = data.aiVsHuman[range] || data.aiVsHuman['30d']
  const callVolumeDaily = data.callVolume[range] || data.callVolume['30d']
  const outcomeData = data.outcomes[range] || data.outcomes['30d']
  const hourHeatmapData = data.heatmap
  const callLog = data.callLog

  const filteredLog = toggle === 'All' ? callLog : toggle === 'AI' ? callLog.filter(c => c.handler.type === 'ai') : callLog.filter(c => c.handler.type === 'human')
  const outcomes = outcomeData[toggle.toLowerCase()]
  const maxHeat = Math.max(...hourHeatmapData.flatMap(h => days.map(d => h[d])))

  const handleOpenPatient = (patientId) => {
    navigate('/patients', { state: { openPatientId: patientId } })
  }

  return (
    <div style={{ padding: '28px 28px', maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Call Intelligence</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Every call, <em style={{ color: '#F5A623', fontStyle: 'italic' }}>understood.</em>
          </div>
          <div style={{ fontSize: 11, color: '#4A4A4A', marginTop: 6 }}>Transcribed, summarised, and tagged — whether Sophie or your reception team handled it.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <DateRangePicker value={range} onChange={setRange} />
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', fontSize: 11, background: 'transparent', border: '1px solid #2A2A2A', borderRadius: 4, color: '#9A9A9A', cursor: 'pointer' }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Source Toggle */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, width: 'fit-content' }}>
        {['All', 'AI', 'Human'].map(t => (
          <button key={t} onClick={() => setToggle(t)} style={{
            padding: '6px 20px', fontSize: 12, fontWeight: toggle === t ? 600 : 400,
            background: toggle === t ? '#252525' : 'transparent',
            color: toggle === t ? '#F5A623' : '#5A5A5A',
            border: 'none', borderRight: t !== 'Human' ? '1px solid #2A2A2A' : 'none',
            cursor: 'pointer', transition: 'all 0.15s',
            borderLeft: toggle === t ? '2px solid #F5A623' : '2px solid transparent',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '12px 14px' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>TODAY · TOTAL</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{callKPIs.total.value}</div>
          <div style={{ fontSize: 10, color: '#5A5A5A' }}>{callKPIs.total.sub}</div>
        </div>
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '12px 14px' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>AI Resolution</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#22C55E', lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{callKPIs.aiResolution.value}</div>
          <div style={{ fontSize: 10, color: '#5A5A5A' }}>{callKPIs.aiResolution.sub}</div>
        </div>
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '12px 14px' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Avg Handle Time</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{callKPIs.avgHandle.value}</div>
          <div style={{ fontSize: 10, color: '#5A5A5A' }}>{callKPIs.avgHandle.sub}</div>
        </div>
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '12px 14px' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Sentiment</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#22C55E', lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{callKPIs.sentiment.value}</div>
          <div style={{ fontSize: 10, color: '#5A5A5A' }}>{callKPIs.sentiment.sub}</div>
        </div>
      </div>

      {/* AI vs Human Comparison Block — only when All */}
      {toggle === 'All' && (
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>AI vs Human — Side by Side</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: 0 }}>
            {/* AI Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#0B0B0B' }}>S</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#F5A623' }}>Sophie (AI)</span>
              </div>
              {Object.entries({ 'Calls Handled': aiVsHuman.ai.callsHandled, 'Booking Rate': aiVsHuman.ai.bookingRate, 'Revenue Booked': aiVsHuman.ai.revenueBooked, 'Missed / Abandoned': aiVsHuman.ai.missed, 'Avg Duration': aiVsHuman.ai.avgDuration }).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1E1E1E' }}>
                  <span style={{ fontSize: 11, color: '#5A5A5A' }}>{k}</span>
                  <span style={{ fontSize: 11, color: '#F0EDE8', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 1, background: '#2A2A2A' }} />
            </div>
            {/* Human Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#F0EDE8' }}>H</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#F0EDE8' }}>Reception Team</span>
              </div>
              {Object.entries({ 'Calls Handled': aiVsHuman.human.callsHandled, 'Booking Rate': aiVsHuman.human.bookingRate, 'Revenue Booked': aiVsHuman.human.revenueBooked, 'Missed / Abandoned': aiVsHuman.human.missed, 'Avg Duration': aiVsHuman.human.avgDuration }).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1E1E1E' }}>
                  <span style={{ fontSize: 11, color: '#5A5A5A' }}>{k}</span>
                  <span style={{ fontSize: 11, color: '#F0EDE8', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 16 }}>
        {/* Call Volume Chart */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '14px 16px' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Call Volume · Last 7 Days</div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={callVolumeDaily} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="aiGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {(toggle === 'All' || toggle === 'AI') && <Area type="monotone" dataKey="ai" name="AI" stroke="#F5A623" strokeWidth={1.5} fill={toggle === 'All' ? 'url(#aiGrad2)' : 'url(#aiGrad2)'} />}
              {(toggle === 'All' || toggle === 'Human') && <Area type="monotone" dataKey="human" name="Human" stroke="#F0EDE8" strokeWidth={1} fill="transparent" strokeDasharray={toggle === 'All' ? '3 2' : undefined} />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Outcome Donut */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '14px 16px' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Outcomes</div>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie data={outcomes} cx="50%" cy="50%" innerRadius={32} outerRadius={46} dataKey="value" strokeWidth={0}>
                {outcomes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
            {outcomes.map(o => (
              <div key={o.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: o.color, display: 'inline-block' }} />
                  <span style={{ color: '#9A9A9A' }}>{o.name}</span>
                </div>
                <span style={{ color: '#F0EDE8', fontVariantNumeric: 'tabular-nums' }}>{o.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hour Heatmap */}
      <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '14px 16px', marginBottom: 16, overflowX: 'auto' }}>
        <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Calls by Hour of Day</div>
        <div style={{ display: 'grid', gridTemplateColumns: '48px repeat(5, 1fr)', gap: 3, minWidth: 400 }}>
          <div />
          {days.map(d => <div key={d} style={{ fontSize: 9, color: '#4A4A4A', textAlign: 'center', paddingBottom: 4 }}>{d}</div>)}
          {hourHeatmapData.map(row => (
            <>
              <div key={row.hour + '_label'} style={{ fontSize: 9, color: '#4A4A4A', display: 'flex', alignItems: 'center' }}>{row.hour}</div>
              {days.map(d => (
                <div key={d} title={`${row.hour} ${d}: ${row[d]} calls`} style={{ height: 22, borderRadius: 2, background: getHeatColor(row[d], maxHeat), display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 9, color: row[d] > maxHeat * 0.5 ? '#0B0B0B' : '#F5A623', fontWeight: 600 }}>{row[d]}</span>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>

      {/* Unified Call Log */}
      <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Unified Call Log</div>
          <span style={{ fontSize: 10, color: '#4A4A4A' }}>{filteredLog.length} calls</span>
        </div>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '60px 100px 1fr 70px 120px 70px 36px', gap: 0, padding: '8px 16px', borderBottom: '1px solid #1E1E1E' }}>
          {['Time', 'Handled By', 'Summary', 'Duration', 'Outcome', 'Sentiment', ''].map(h => (
            <div key={h} style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>
        {filteredLog.map((call, i) => (
          <div
            key={call.id}
            style={{ display: 'grid', gridTemplateColumns: '60px 100px 1fr 70px 120px 70px 36px', gap: 0, padding: '10px 16px', borderBottom: i < filteredLog.length - 1 ? '1px solid #1A1A1A' : 'none', alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#191919'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            onClick={() => setSelectedCall(call)}
          >
            <div style={{ fontSize: 11, color: '#6B6B6B', fontVariantNumeric: 'tabular-nums' }}>{call.time}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {call.handler.type === 'missed' ? (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#2A1A1A', border: '1px solid #3A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#EF4444' }}>—</div>
              ) : call.handler.type === 'ai' ? (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#0B0B0B' }}>S</div>
              ) : (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 600, color: '#F0EDE8' }}>{call.handler.initials?.slice(0,2)}</div>
              )}
              <span style={{ fontSize: 11, color: '#9A9A9A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{call.handler.name}</span>
            </div>
            <div style={{ paddingRight: 12 }}>
              <div style={{ fontSize: 11, color: '#F0EDE8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>{call.summary}</div>
              <div style={{ fontSize: 10, color: '#4A4A4A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{call.caller}{call.patientName ? ` · ${call.patientName}` : ' · unknown'}</div>
            </div>
            <div style={{ fontSize: 11, color: '#6B6B6B', fontVariantNumeric: 'tabular-nums' }}>{call.duration}</div>
            <div>
              <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 3, letterSpacing: '0.04em', background: outcomeColors[call.outcome] + '22', color: outcomeColors[call.outcome], border: `1px solid ${outcomeColors[call.outcome]}44`, whiteSpace: 'nowrap' }}>
                {outcomeLabels[call.outcome]}
              </span>
            </div>
            <div style={{ fontSize: 11, color: call.sentiment === null ? '#3A3A3A' : call.sentiment > 0 ? '#22C55E' : '#EF4444', fontVariantNumeric: 'tabular-nums' }}>
              {call.sentiment !== null ? (call.sentiment > 0 ? '+' : '') + call.sentiment.toFixed(2) : '—'}
            </div>
            <button
              onClick={e => { e.stopPropagation(); setSelectedCall(call) }}
              style={{ width: 24, height: 24, borderRadius: '50%', background: '#2A2A2A', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9A9A9A' }}
            >
              <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor"><path d="M0 0l8 5-8 5V0z"/></svg>
            </button>
          </div>
        ))}
      </div>

      <TranscriptPanel call={selectedCall} onClose={() => setSelectedCall(null)} onOpenPatient={handleOpenPatient} />
    </div>
  )
}
