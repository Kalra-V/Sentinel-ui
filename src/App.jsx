import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Overview from './views/Overview'
import Calls from './views/Calls'
import Patients from './views/Patients'
import PatientJourney from './views/PatientJourney'
import Revenue from './views/Revenue'
import AskSentinel from './views/AskSentinel'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Overview />} />
          <Route path="calls" element={<Calls />} />
          <Route path="patients" element={<Patients />} />
          <Route path="journey" element={<PatientJourney />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="ask" element={<AskSentinel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
