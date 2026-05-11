import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useOutletContext } from 'react-router-dom'
import { journeyData } from '../data/journey'
import { toPracticeKey } from '../utils/practice'
import DateRangePicker from '../components/shared/DateRangePicker'

const cohortMetricKeys = ['m0', 'm1', 'm3', 'm6', 'm12', 'm24']
const cohortMetricLabels = ['Mo. 0', 'Mo. 1', 'Mo. 3', 'Mo. 6', 'Mo. 12', 'Mo. 24']

function getCellColor(value, max) {
  if (!value) return '#0F0F0F'
  const intensity = value / max
  return `rgba(245, 166, 35, ${intensity * 0.75 + 0.08})`
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, padding: '8px 12px' }}>
      <div style={{ fontSize: 10, color: '#6B6B6B', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#F5A623', fontVariantNumeric: 'tabular-nums' }}>£{payload[0]?.value?.toLocaleString()}</div>
      <div style={{ fontSize: 9, color: '#5A5A5A' }}>12-month LTV</div>
    </div>
  )
}

// Simple Sankey visualization using proportional bars
function SankeyViz({ data }) {
  const sources = data.links.filter(l => data.nodes.find(n => n.id === l.source)?.category === 'source')
  const totalFlow = sources.reduce((sum, l) => sum + l.value, 0)
  const bySource = {}
  sources.forEach(l => {
    const src = data.nodes.find(n => n.id === l.source)?.label
    if (!bySource[src]) bySource[src] = { total: 0, targets: [] }
    const tgt = data.nodes.find(n => n.id === l.target)?.label
    bySource[src].total += l.value
    bySource[src].targets.push({ label: tgt, value: l.value, revenue: l.revenue, avgDays: l.avgDays })
  })

  const treatment2Links = data.links.filter(l => {
    const src = data.nodes.find(n => n.id === l.source)?.category
    return src === 'treatment1'
  })

  const colors = { 'Meta Ads': '#F5A623', 'Google Search': '#3B82F6', 'Referral': '#22C55E', 'AI Call Intake': '#A855F7', 'Walk-in': '#6B6B6B' }

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 800, padding: '0 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 32px 220px 32px 220px', gap: 0 }}>
          {/* Column headers */}
          <div style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: 10 }}>Acquisition Source</div>
          <div />
          <div style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: 10 }}>First Treatment</div>
          <div />
          <div style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: 10 }}>Second Treatment</div>

          {/* Source columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {Object.entries(bySource).map(([src, d]) => (
              <div key={src} title={`${src}: ${d.total} patients`} style={{ height: Math.max(28, Math.round(d.total / totalFlow * 240)), background: (colors[src] || '#6B6B6B') + '33', border: `1px solid ${colors[src] || '#6B6B6B'}55`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '0 8px', cursor: 'pointer' }}>
                <span style={{ fontSize: 10, color: colors[src] || '#9A9A9A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{src}</span>
                <span style={{ fontSize: 10, color: '#5A5A5A', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{d.total}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg height="100%" width="32" style={{ overflow: 'visible' }}>
              <path d="M0 50% Q16 50% 32 50%" stroke="#2A2A2A" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* First treatments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Invisalign', 'Hygiene', 'Exam', 'Implant', 'Whitening'].map(t => {
              const total = sources.filter(l => data.nodes.find(n => n.id === l.target)?.label === t).reduce((s, l) => s + l.value, 0)
              if (!total) return null
              const rev = sources.filter(l => data.nodes.find(n => n.id === l.target)?.label === t).reduce((s, l) => s + l.revenue, 0)
              return (
                <div key={t} title={`${t}: ${total} patients, £${rev.toLocaleString()} revenue`} style={{ height: Math.max(28, Math.round(total / totalFlow * 240)), background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3, display: 'flex', alignItems: 'center', padding: '0 8px', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#F5A62355'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2A2A'}
                >
                  <span style={{ fontSize: 10, color: '#F0EDE8' }}>{t}</span>
                  <span style={{ fontSize: 10, color: '#4A4A4A', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{total}</span>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 1, height: '100%', background: '#1E1E1E' }} />
          </div>

          {/* Second treatments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Whitening', 'Hygiene', 'Exam', 'Bonding', 'Implant'].map(t => {
              const links = treatment2Links.filter(l => data.nodes.find(n => n.id === l.target)?.label === t)
              const total = links.reduce((s, l) => s + l.value, 0)
              const avgDays = total ? Math.round(links.reduce((s, l) => s + l.avgDays * l.value, 0) / total) : 0
              if (!total) return null
              return (
                <div key={t} title={`${t}: ${total} patients, avg ${avgDays} days between treatments`} style={{ height: Math.max(28, Math.round(total / totalFlow * 240)), background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8px', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#F5A62355'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2A2A'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: '#F0EDE8' }}>{t}</span>
                    <span style={{ fontSize: 10, color: '#4A4A4A', fontVariantNumeric: 'tabular-nums' }}>{total}</span>
                  </div>
                  {total > 20 && <div style={{ fontSize: 9, color: '#3A3A3A' }}>avg {avgDays}d</div>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PatientJourney() {
  const [range, setRange] = useState('30d')
  const [cohortMetric, setCohortMetric] = useState('m6')
  const { practice } = useOutletContext()

  const practiceKey = toPracticeKey(practice)
  const practiceData = journeyData[practiceKey]
  const journeyMetrics = practiceData.metrics
  const cohortData = practiceData.cohortData
  const sankeyData = practiceData.sankeyData
  const sourceLTV = practiceData.sourceLTV

  const maxCohortVal = Math.max(...cohortData.map(c => c[cohortMetric] || 0))

  return (
    <div style={{ padding: '28px 28px', maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Strategic Intelligence</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.03em' }}>Patient Journey</div>
          <div style={{ fontSize: 11, color: '#4A4A4A', marginTop: 4 }}>From first touch to lifetime value — which channels compound, which don't.</div>
        </div>
        <DateRangePicker value={range} onChange={setRange} />
      </div>

      {/* Headline Metrics */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {journeyMetrics.map(m => (
          <div key={m.label} style={{ flex: 1, background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#F5A623', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: 9, color: '#3A3A3A', marginTop: 3 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Cohort Heatmap */}
      <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '16px 20px', marginBottom: 16, overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Cohort Retention Heatmap</div>
            <div style={{ fontSize: 9, color: '#3A3A3A' }}>Grouped by acquisition month and source. Colour intensity = value.</div>
          </div>
          <div style={{ display: 'flex', gap: 0, background: '#0F0F0F', border: '1px solid #2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
            {[['m6', 'Cum. Revenue'], ['m12', 'Avg Revenue'], ['m3', 'Retention %']].map(([key, label]) => (
              <button key={key} onClick={() => setCohortMetric(key)} style={{ padding: '4px 10px', fontSize: 10, background: cohortMetric === key ? '#252525' : 'transparent', color: cohortMetric === key ? '#F5A623' : '#4A4A4A', border: 'none', borderRight: key !== 'm3' ? '1px solid #2A2A2A' : 'none', cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr>
                <th style={{ fontSize: 9, color: '#3A3A3A', textAlign: 'left', padding: '4px 8px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Cohort</th>
                <th style={{ fontSize: 9, color: '#3A3A3A', textAlign: 'center', padding: '4px 8px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', width: 50 }}>N</th>
                {cohortMetricLabels.map((l, i) => (
                  <th key={l} style={{ fontSize: 9, color: cohortMetricKeys[i] === cohortMetric ? '#F5A623' : '#3A3A3A', textAlign: 'center', padding: '4px 8px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', width: 80 }}>{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData.map((row, ri) => (
                <tr key={ri}>
                  <td style={{ fontSize: 10, color: '#9A9A9A', padding: '4px 8px', whiteSpace: 'nowrap' }}>{row.cohort}</td>
                  <td style={{ fontSize: 10, color: '#5A5A5A', padding: '4px 8px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{row.patients}</td>
                  {cohortMetricKeys.map(key => (
                    <td key={key} style={{ padding: '3px 4px' }}>
                      {row[key] != null ? (
                        <div style={{ background: getCellColor(row[key], maxCohortVal), borderRadius: 3, padding: '5px 6px', textAlign: 'center' }}>
                          <span style={{ fontSize: 10, color: row[key] > maxCohortVal * 0.6 ? '#0B0B0B' : '#F0EDE8', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                            {row[key] >= 1000 ? `£${(row[key]/1000).toFixed(1)}k` : `£${row[key]}`}
                          </span>
                        </div>
                      ) : (
                        <div style={{ borderRadius: 3, padding: '5px 6px', textAlign: 'center' }}>
                          <span style={{ fontSize: 10, color: '#2A2A2A' }}>—</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two columns: Sankey + LTV chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        {/* Sankey */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '16px 20px' }}>
          <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Treatment Flow</div>
          <div style={{ fontSize: 9, color: '#3A3A3A', marginBottom: 16 }}>Source → First treatment → Second treatment. Width = patient count. Hover for details.</div>
          <SankeyViz data={sankeyData} />
        </div>

        {/* Source LTV */}
        <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '16px 20px' }}>
          <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>LTV by Acquisition Source</div>
          <div style={{ fontSize: 9, color: '#3A3A3A', marginBottom: 16 }}>12-month avg lifetime value per patient</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sourceLTV} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 9, fill: '#4A4A4A' }} axisLine={false} tickLine={false} tickFormatter={v => `£${v.toLocaleString()}`} />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 10, fill: '#9A9A9A' }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={({ active, payload }) => active && payload?.length ? (
                <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 4, padding: '8px 12px' }}>
                  <div style={{ fontSize: 10, color: '#6B6B6B' }}>{payload[0].payload.source}</div>
                  <div style={{ fontSize: 14, color: '#F5A623', fontVariantNumeric: 'tabular-nums' }}>£{payload[0].value.toLocaleString()}</div>
                </div>
              ) : null} />
              <Bar dataKey="ltv" radius={2} fill="#F5A623" fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
