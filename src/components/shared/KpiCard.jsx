import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function KpiCard({ label, value, trend, trendDir, period, sparkline, sub, onClick }) {
  const trendColor = trendDir === 'up' ? '#22C55E' : trendDir === 'down-good' ? '#22C55E' : trendDir === 'down-bad' ? '#EF4444' : '#EF4444'
  const trendArrow = trendDir === 'up' ? '↑' : '↓'
  const sparkData = sparkline ? sparkline.map((v, i) => ({ v })) : []

  return (
    <div
      onClick={onClick}
      style={{
        background: '#141414',
        border: '1px solid #2A2A2A',
        borderRadius: 4,
        padding: '14px 16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.15s',
        flex: 1,
        minWidth: 0,
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.borderColor = '#3A3A3A' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.borderColor = '#2A2A2A' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, lineHeight: 1.3 }}>
          {label}
        </div>
        {period && (
          <span style={{ fontSize: 9, color: '#3A3A3A', letterSpacing: '0.06em' }}>{period}</span>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginBottom: 6 }}>
        {value}
      </div>
      {trend && (
        <div style={{ fontSize: 10, color: trendColor, marginBottom: sub ? 4 : 0 }}>
          {trendArrow} {trend} vs. prior {period}
        </div>
      )}
      {sub && (
        <div style={{ fontSize: 10, color: '#5A5A5A', marginBottom: 6 }}>{sub}</div>
      )}
      {sparkData.length > 0 && (
        <div style={{ height: 28, marginTop: 6 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line type="monotone" dataKey="v" stroke="#F5A623" strokeWidth={1.2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
