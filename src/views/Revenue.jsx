import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import { useNavigate } from 'react-router-dom'
import { Download, ArrowUpRight } from 'lucide-react'
import DateRangePicker from '../components/shared/DateRangePicker'
import { revenueMetrics, monthlyRevenue, drilldownPlans } from '../data/revenue'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, padding: '10px 14px' }}>
      <div style={{ fontSize: 10, color: '#6B6B6B', marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ fontSize: 11, display: 'flex', gap: 8, marginBottom: 3 }}>
          <span style={{ color: p.fill || p.color }}>■</span>
          <span style={{ color: '#6B6B6B' }}>{p.name}:</span>
          <span style={{ color: '#F0EDE8', fontVariantNumeric: 'tabular-nums' }}>£{p.value.toLocaleString()}</span>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#4A4A4A', marginTop: 6, borderTop: '1px solid #2A2A2A', paddingTop: 6 }}>
        Total: £{payload.reduce((s, p) => s + p.value, 0).toLocaleString()}
      </div>
    </div>
  )
}

const statusColors = { Completed: '#22C55E', 'In Progress': '#F5A623', Accepted: '#3B82F6', Pending: '#6B6B6B' }

export default function Revenue() {
  const [range, setRange] = useState('12m')
  const [chartMode, setChartMode] = useState('side-by-side')
  const [selectedMonth, setSelectedMonth] = useState(null)
  const navigate = useNavigate()

  const displayData = range === '6m' ? monthlyRevenue.slice(-6) : range === '24m' ? monthlyRevenue : monthlyRevenue.slice(-12)
  const drillData = selectedMonth ? drilldownPlans : []

  const totalNew = displayData.reduce((s, d) => s + d.newPlans, 0)
  const totalExisting = displayData.reduce((s, d) => s + d.existingPlans, 0)

  return (
    <div style={{ padding: '28px 28px', maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Revenue Intelligence</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.03em' }}>Revenue</div>
          <div style={{ fontSize: 11, color: '#4A4A4A', marginTop: 4 }}>New vs existing treatment plan revenue — leading vs lagging signal.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', fontSize: 11, background: 'transparent', border: '1px solid #2A2A2A', borderRadius: 4, color: '#9A9A9A', cursor: 'pointer' }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Metrics strip */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'New Plan Value', value: `£${revenueMetrics.newPlanValue.toLocaleString()}`, sub: 'leading indicator', color: '#F5A623' },
          { label: 'Existing Plan Revenue', value: `£${revenueMetrics.existingPlanRevenue.toLocaleString()}`, sub: 'lagging indicator', color: '#F0EDE8' },
          { label: 'Avg Treatment Value', value: `£${revenueMetrics.avgTreatmentValue.toLocaleString()}`, sub: 'new plans', color: '#F0EDE8' },
          { label: 'Days to First Payment', value: revenueMetrics.daysToFirstPayment, sub: 'avg from plan creation', color: '#F0EDE8' },
          { label: 'Acceptance Rate', value: `${revenueMetrics.acceptanceRate}%`, sub: 'of plans presented', color: '#22C55E' },
        ].map(m => (
          <div key={m.label} style={{ flex: 1, background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: m.color, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: 9, color: '#3A3A3A', marginTop: 3 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>New vs Existing Treatment Plan Revenue</div>
            <div style={{ fontSize: 9, color: '#3A3A3A' }}>Click any bar to drill down into underlying treatment plans.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 0, background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
              {[['side-by-side', 'Side by Side'], ['stacked', 'Stacked']].map(([key, label]) => (
                <button key={key} onClick={() => setChartMode(key)} style={{ padding: '4px 10px', fontSize: 10, background: chartMode === key ? '#252525' : 'transparent', color: chartMode === key ? '#F5A623' : '#4A4A4A', border: 'none', borderRight: key === 'side-by-side' ? '1px solid #2A2A2A' : 'none', cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 0, background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
              {['6m', '12m', '24m'].map(r => (
                <button key={r} onClick={() => setRange(r)} style={{ padding: '4px 10px', fontSize: 10, background: range === r ? '#252525' : 'transparent', color: range === r ? '#F5A623' : '#4A4A4A', border: 'none', borderRight: r !== '24m' ? '1px solid #2A2A2A' : 'none', cursor: 'pointer' }}>{r}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#6B6B6B' }}>
            <span style={{ width: 10, height: 10, background: '#F5A623', display: 'inline-block', borderRadius: 1 }} />
            New Plans — £{totalNew.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#6B6B6B' }}>
            <span style={{ width: 10, height: 10, background: '#3A3A3A', display: 'inline-block', borderRadius: 1, border: '1px solid #5A5A5A' }} />
            Existing Plans — £{totalExisting.toLocaleString()}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={displayData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }} barGap={chartMode === 'stacked' ? 0 : 4}
            onClick={data => { if (data?.activePayload) setSelectedMonth(data.activeLabel) }}>
            <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1E1E1E' }} />
            <Bar dataKey="newPlans" name="New Plans" stackId={chartMode === 'stacked' ? 'a' : undefined} fill="#F5A623" fillOpacity={0.85} radius={chartMode === 'stacked' ? [0,0,0,0] : [2,2,0,0]} />
            <Bar dataKey="existingPlans" name="Existing Plans" stackId={chartMode === 'stacked' ? 'a' : undefined} fill="#3A3A3A" radius={chartMode === 'stacked' ? [2,2,0,0] : [2,2,0,0]} />
          </BarChart>
        </ResponsiveContainer>

        {selectedMonth && (
          <div style={{ textAlign: 'center', fontSize: 10, color: '#F5A623', marginTop: 4, cursor: 'pointer' }} onClick={() => setSelectedMonth(null)}>
            Showing drill-down for {selectedMonth} — click to clear
          </div>
        )}
      </div>

      {/* Drill-down table */}
      <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Treatment Plans {selectedMonth ? `— ${selectedMonth}` : '— All Periods'}
          </div>
          <span style={{ fontSize: 10, color: '#3A3A3A' }}>{drilldownPlans.length} plans</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px 100px 110px 110px 90px', padding: '7px 16px', borderBottom: '1px solid #1E1E1E', gap: 8 }}>
          {['Patient', 'Practitioner', 'Treatment', 'Value', 'Created', 'Completed', 'Status'].map(h => (
            <div key={h} style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>
        {drilldownPlans.map((plan, i) => (
          <div key={plan.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px 100px 110px 110px 90px', padding: '9px 16px', borderBottom: i < drilldownPlans.length - 1 ? '1px solid #1A1A1A' : 'none', gap: 8, alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#191919'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#F0EDE8' }}>{plan.patient}</span>
              {plan.patientId && <ArrowUpRight size={10} color="#4A4A4A" />}
            </div>
            <div style={{ fontSize: 11, color: '#9A9A9A' }}>{plan.practitioner}</div>
            <div style={{ fontSize: 11, color: '#9A9A9A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{plan.treatment}</div>
            <div style={{ fontSize: 11, color: '#F5A623', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>£{plan.value.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: '#6B6B6B' }}>{plan.dateCreated}</div>
            <div style={{ fontSize: 11, color: plan.dateCompleted ? '#6B6B6B' : '#3A3A3A' }}>{plan.dateCompleted || '—'}</div>
            <div>
              <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: statusColors[plan.status] + '22', color: statusColors[plan.status], border: `1px solid ${statusColors[plan.status]}44` }}>
                {plan.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
