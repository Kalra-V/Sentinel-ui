import { useState, useEffect } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import { Search, Download, ChevronUp, ChevronDown } from 'lucide-react'
import DateRangePicker from '../components/shared/DateRangePicker'
import PatientTimelinePanel from '../components/patients/PatientTimelinePanel'
import { patientsData } from '../data/patients'
import { toPracticeKey } from '../utils/practice'

const columns = [
  { key: 'name', label: 'Name', width: '1fr' },
  { key: 'age', label: 'Age', width: '50px' },
  { key: 'lastVisit', label: 'Last Visit', width: '110px' },
  { key: 'nextAppt', label: 'Next Appt', width: '110px' },
  { key: 'lifetimeValue', label: 'Lifetime Value', width: '110px' },
  { key: 'planValue', label: 'Plan Value', width: '100px' },
  { key: 'membership', label: 'Membership', width: '90px' },
  { key: 'lastContact', label: 'Last Contact', width: '140px' },
]

export default function Patients() {
  const [range, setRange] = useState('30d')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const location = useLocation()
  const { practice } = useOutletContext()

  const practiceKey = toPracticeKey(practice)
  const data = patientsData[practiceKey]
  const patientMetrics = data.metrics[range] || data.metrics['30d']
  const patients = data.patients

  useEffect(() => {
    if (location.state?.openPatientId) {
      const p = patients.find(pt => pt.id === location.state.openPatientId)
      if (p) setSelectedPatient(p)
    }
  }, [location.state, patients])

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.acquisitionSource.toLowerCase().includes(search.toLowerCase()) ||
    p.practitioner.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    let av = a[sortKey], bv = b[sortKey]
    if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    return 0
  })

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  return (
    <div style={{ padding: '28px 28px', maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Patient Intelligence</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', letterSpacing: '-0.03em' }}>
            Patient Base
          </div>
          <div style={{ fontSize: 11, color: '#4A4A4A', marginTop: 4 }}>Working view of every patient — reactivation, follow-up, and lifecycle.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <DateRangePicker value={range} onChange={setRange} />
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', fontSize: 11, background: 'transparent', border: '1px solid #2A2A2A', borderRadius: 4, color: '#9A9A9A', cursor: 'pointer' }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Headline Metrics */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'Active Patients', value: patientMetrics.active.toLocaleString(), color: '#F0EDE8' },
          { label: 'New This Period', value: patientMetrics.newThisPeriod, color: '#22C55E' },
          { label: 'Lapsed (12+ mo)', value: patientMetrics.lapsed, color: '#EF4444' },
          { label: 'Reactivation Candidates', value: patientMetrics.reactivationCandidates, color: '#F5A623', sub: 'lapsed + LTV > £500' },
          { label: 'Avg Patient LTV', value: `£${patientMetrics.avgLTV.toLocaleString()}`, color: '#F5A623' },
        ].map(m => (
          <div key={m.label} style={{ flex: 1, background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, color: '#4A4A4A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: m.color, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{m.value}</div>
            {m.sub && <div style={{ fontSize: 9, color: '#3A3A3A', marginTop: 3 }}>{m.sub}</div>}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <div style={{ flex: 1, maxWidth: 320, position: 'relative' }}>
          <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#4A4A4A' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patients, source, practitioner…"
            style={{ width: '100%', background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, padding: '6px 10px 6px 28px', fontSize: 11, color: '#F0EDE8', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#3A3A3A'}
            onBlur={e => e.target.style.borderColor = '#2A2A2A'}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['All', 'Active', 'Lapsed', 'Plan'].map(f => (
            <button key={f} style={{ padding: '5px 10px', fontSize: 10, background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, color: '#5A5A5A', cursor: 'pointer' }}
              onMouseEnter={e => { e.target.style.color = '#F0EDE8'; e.target.style.borderColor = '#3A3A3A' }}
              onMouseLeave={e => { e.target.style.color = '#5A5A5A'; e.target.style.borderColor = '#2A2A2A' }}>
              {f}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 10, color: '#3A3A3A', marginLeft: 'auto' }}>{sorted.length} patients</span>
      </div>

      {/* Table */}
      <div style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: `1fr 50px 110px 110px 110px 100px 90px 140px`, padding: '8px 16px', borderBottom: '1px solid #1E1E1E', gap: 8 }}>
          {columns.map(col => (
            <button key={col.key} onClick={() => toggleSort(col.key)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: sortKey === col.key ? '#F5A623' : '#3A3A3A', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              {col.label}
              {sortKey === col.key && (sortDir === 'asc' ? <ChevronUp size={9} /> : <ChevronDown size={9} />)}
            </button>
          ))}
        </div>
        {sorted.map((patient, i) => (
          <div
            key={patient.id}
            onClick={() => setSelectedPatient(patient)}
            style={{ display: 'grid', gridTemplateColumns: '1fr 50px 110px 110px 110px 100px 90px 140px', padding: '10px 16px', borderBottom: i < sorted.length - 1 ? '1px solid #1A1A1A' : 'none', gap: 8, alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#191919'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div>
              <div style={{ fontSize: 12, color: '#F0EDE8', fontWeight: 500 }}>{patient.name}</div>
              <div style={{ fontSize: 10, color: '#4A4A4A' }}>{patient.acquisitionSource} · {patient.practitioner}</div>
            </div>
            <div style={{ fontSize: 11, color: '#9A9A9A', fontVariantNumeric: 'tabular-nums' }}>{patient.age}</div>
            <div style={{ fontSize: 11, color: patient.status === 'lapsed' ? '#EF4444' : '#9A9A9A' }}>{patient.lastVisit}</div>
            <div style={{ fontSize: 11, color: patient.nextAppt ? '#22C55E' : '#3A3A3A' }}>{patient.nextAppt || '—'}</div>
            <div style={{ fontSize: 11, color: '#F5A623', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>£{patient.lifetimeValue.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: patient.planValue > 0 ? '#F0EDE8' : '#3A3A3A', fontVariantNumeric: 'tabular-nums' }}>
              {patient.planValue > 0 ? `£${patient.planValue.toLocaleString()}` : '—'}
            </div>
            <div>
              <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: patient.membership === 'Plan' ? '#1A3A1A' : '#1A1A1A', color: patient.membership === 'Plan' ? '#22C55E' : '#4A4A4A', border: `1px solid ${patient.membership === 'Plan' ? '#2A4A2A' : '#2A2A2A'}` }}>
                {patient.membership}
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#5A5A5A' }}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{patient.lastContact.channel}</div>
              <div style={{ fontSize: 9, color: '#3A3A3A' }}>{patient.lastContact.date}</div>
            </div>
          </div>
        ))}
      </div>

      <PatientTimelinePanel patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    </div>
  )
}
