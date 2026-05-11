import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { TrendingUp, TrendingDown, ArrowUpRight, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import KpiCard from '../components/shared/KpiCard'
import DateRangePicker from '../components/shared/DateRangePicker'
import { overviewData } from '../data/overview'
import { toPracticeKey } from '../utils/practice'

const activityTypeColors = {
  booked: '#22C55E',
  lead: '#3B82F6',
  missed: '#EF4444',
  urgent: '#F5A623',
  resolved: '#6B6B6B',
  complaint: '#EF4444',
  revenue: '#F5A623',
}

const alertIcons = {
  warning: <AlertTriangle size={12} color="#F5A623" />,
  info: <Info size={12} color="#3B82F6" />,
  positive: <CheckCircle size={12} color="#22C55E" />,
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, padding: '8px 12px' }}>
      <div style={{ fontSize: 10, color: '#6B6B6B', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ fontSize: 11, color: p.color, display: 'flex', gap: 8 }}>
          <span>{p.name}:</span>
          <span style={{ color: '#F0EDE8' }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Overview() {
  const [range, setRange] = useState('30d')
  const navigate = useNavigate()
  const { practice } = useOutletContext()

  const practiceKey = toPracticeKey(practice)
  const data = overviewData[practiceKey]
  const kpis = data.kpis[range] || data.kpis['30d']
  const callVolumeData = data.callVolume[range] || data.callVolume['30d']
  const callOutcomes = data.callOutcomes[range] || data.callOutcomes['30d']
  const { activityFeed, practitionerTable, alerts, greeting, headline } = data

  return (
    <div style={{ padding: '28px 28px', maxWidth: 1400 }}>
      {/* Hero Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 10, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            SATURDAY · 10 MAY 2026
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 6 }}>
            Good morning, {greeting}.{' '}
            <em style={{ color: '#F5A623', fontStyle: 'italic' }}>{range === 'today' ? 'Things are quiet.' : range === '7d' ? 'A solid week.' : range === '90d' ? 'Strong quarter.' : 'Things are quiet.'}</em>
          </div>
          <div style={{ fontSize: 12, color: '#5A5A5A' }}>
            {headline.calls} calls handled so far today. Diary at {headline.util}% utilisation. {headline.alerts} item{headline.alerts !== 1 ? 's' : ''} want your eye.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <DateRangePicker value={range} onChange={setRange} />
          <button style={{ padding: '5px 12px', fontSize: 11, background: 'transparent', border: '1px solid #2A2A2A', borderRadius: 4, color: '#9A9A9A', cursor: 'pointer' }}>
            Export
          </button>
          <button
            onClick={() => navigate('/ask')}
            style={{ padding: '5px 12px', fontSize: 11, background: '#F5A623', border: 'none', borderRadius: 4, color: '#0B0B0B', cursor: 'pointer', fontWeight: 600 }}
          >
            Ask Sentinel
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {kpis.map(kpi => (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendDir={kpi.trendDir}
            period={kpi.period}
            sparkline={kpi.sparkline}
            onClick={() => {}}
          />
        ))}
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Call Volume Chart */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                Call Volume · AI vs Human
              </div>
              <div style={{ fontSize: 9, color: '#3A3A3A' }}>Last 14 days · daily rollup</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['TWILIO', 'RETELL', 'DEEPGRAM'].map(s => (
                <span key={s} style={{ fontSize: 9, color: '#4A4A4A', background: '#1A1A1A', border: '1px solid #2A2A2A', padding: '2px 6px', borderRadius: 3, letterSpacing: '0.06em' }}>{s}</span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={callVolumeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ai" name="AI" stroke="#F5A623" strokeWidth={1.5} fill="url(#aiGrad)" />
              <Area type="monotone" dataKey="human" name="Human" stroke="#F0EDE8" strokeWidth={1} fill="transparent" strokeDasharray="3 2" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#6B6B6B' }}>
              <span style={{ width: 16, height: 2, background: '#F5A623', display: 'inline-block' }} />AI handled
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#6B6B6B' }}>
              <span style={{ width: 16, height: 1, background: '#F0EDE8', display: 'inline-block', opacity: 0.5 }} />Human
            </div>
          </div>
        </div>

        {/* Call Outcomes Donut */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '16px 20px' }}>
          <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
            Call Outcomes
          </div>
          <div style={{ fontSize: 9, color: '#3A3A3A', marginBottom: 12 }}>Last 7 days</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={callOutcomes} cx="50%" cy="50%" innerRadius={42} outerRadius={58} dataKey="value" strokeWidth={0}>
                {callOutcomes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 18, fontWeight: 600, fill: '#F0EDE8', fontVariantNumeric: 'tabular-nums' }}>
                {callOutcomes.reduce((a, b) => a + b.value, 0)}
              </text>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
            {callOutcomes.map(o => (
              <div key={o.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: o.color, display: 'inline-block' }} />
                  <span style={{ color: '#9A9A9A' }}>{o.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: '#F0EDE8', fontVariantNumeric: 'tabular-nums' }}>{o.value}</span>
                  <span style={{ color: '#4A4A4A', width: 28, textAlign: 'right' }}>{Math.round(o.value / callOutcomes.reduce((a, b) => a + b.value, 0) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity + Practitioners + Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {/* Live Activity Feed */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Activity</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="pulse-amber" style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              <span style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.08em' }}>streaming</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {activityFeed.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: i < activityFeed.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                <div style={{ fontSize: 10, color: '#4A4A4A', fontVariantNumeric: 'tabular-nums', flexShrink: 0, width: 32 }}>{item.time}</div>
                <div style={{ fontSize: 10, color: '#9A9A9A', lineHeight: 1.4 }}>
                  <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: activityTypeColors[item.type], marginRight: 5, marginBottom: 1, verticalAlign: 'middle' }} />
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practitioner Table */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Practitioner Performance</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px 70px 24px', gap: 8, paddingBottom: 6, borderBottom: '1px solid #1E1E1E', marginBottom: 4 }}>
              {['Name', 'Util.', 'Appts', 'Revenue', ''].map(h => (
                <div key={h} style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {practitionerTable.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px 70px 24px', gap: 8, padding: '7px 0', borderBottom: i < practitionerTable.length - 1 ? '1px solid #1A1A1A' : 'none', alignItems: 'center' }}>
                <div style={{ fontSize: 11, color: '#F0EDE8' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: p.utilisation >= 80 ? '#22C55E' : p.utilisation >= 70 ? '#F5A623' : '#EF4444', fontVariantNumeric: 'tabular-nums' }}>{p.utilisation}%</div>
                <div style={{ fontSize: 11, color: '#9A9A9A', fontVariantNumeric: 'tabular-nums' }}>{p.appts}</div>
                <div style={{ fontSize: 11, color: '#F0EDE8', fontVariantNumeric: 'tabular-nums' }}>{p.revenue}</div>
                <div>{p.trend === 'up' ? <TrendingUp size={11} color="#22C55E" /> : <TrendingDown size={11} color="#EF4444" />}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Alerts</div>
            <span style={{ fontSize: 9, color: '#4A4A4A', background: '#1E1E1E', padding: '1px 6px', borderRadius: 3, border: '1px solid #2A2A2A' }}>{alerts.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{ display: 'flex', gap: 8, padding: '8px 10px', background: '#0F0F0F', border: `1px solid ${alert.type === 'warning' ? '#3A2800' : alert.type === 'positive' ? '#1A3A1A' : '#1A2A3A'}`, borderRadius: 3, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = alert.type === 'warning' ? '#5A4000' : alert.type === 'positive' ? '#2A4A2A' : '#2A3A4A'}
                onMouseLeave={e => e.currentTarget.style.borderColor = alert.type === 'warning' ? '#3A2800' : alert.type === 'positive' ? '#1A3A1A' : '#1A2A3A'}
              >
                <div style={{ flexShrink: 0, paddingTop: 1 }}>{alertIcons[alert.type]}</div>
                <div style={{ fontSize: 11, color: '#9A9A9A', lineHeight: 1.5 }}>{alert.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
