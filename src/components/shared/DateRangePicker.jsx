import { useState } from 'react'

const ranges = ['Today', '7d', '30d', '90d', 'Custom']

export default function DateRangePicker({ value = '30d', onChange }) {
  return (
    <div style={{ display: 'flex', background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
      {ranges.map(r => (
        <button
          key={r}
          onClick={() => onChange && onChange(r)}
          style={{
            padding: '5px 10px',
            fontSize: 11,
            background: value === r ? '#252525' : 'transparent',
            color: value === r ? '#F0EDE8' : '#5A5A5A',
            border: 'none',
            borderRight: '1px solid #2A2A2A',
            cursor: 'pointer',
            transition: 'all 0.1s',
          }}
          onMouseEnter={e => { if (value !== r) e.target.style.color = '#9A9A9A' }}
          onMouseLeave={e => { if (value !== r) e.target.style.color = '#5A5A5A' }}
        >
          {r}
        </button>
      ))}
    </div>
  )
}
