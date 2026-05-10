export const practices = [
  'Chelsea Dental Studio',
  'Manchester Smile Clinic',
  'Harrow Dental Care',
  'SmileCraft London',
]

export const overviewKPIs = [
  { id: 'utilisation', label: 'Diary Utilisation', value: '78%', trend: '+4.2 pts', trendDir: 'up', period: '30d', sparkline: [62,65,68,64,70,72,71,74,75,76,77,78,76,78] },
  { id: 'calls', label: 'Calls Handled', value: '1,284', trend: '+12%', trendDir: 'up', period: '30d', sparkline: [820,870,900,880,950,980,1020,1050,1100,1150,1180,1220,1260,1284] },
  { id: 'revenue_booked', label: 'Revenue Booked', value: '£124,800', trend: '+8%', trendDir: 'up', period: '30d', sparkline: [95000,98000,100000,102000,104000,107000,109000,112000,115000,118000,120000,122000,124000,124800] },
  { id: 'fta', label: 'FTA Rate', value: '4.1%', trend: '−0.6 pts', trendDir: 'down-good', period: '30d', sparkline: [5.8,5.5,5.2,5.4,5.0,4.9,4.7,4.8,4.5,4.4,4.3,4.2,4.1,4.1] },
  { id: 'ai_resolution', label: 'AI Resolution Rate', value: '73%', trend: '+3 pts', trendDir: 'up', period: '30d', sparkline: [62,63,65,66,67,68,69,70,70,71,72,72,73,73] },
  { id: 'revenue_chair', label: 'Revenue / Chair Hr', value: '£184', trend: '+£11', trendDir: 'up', period: '30d', sparkline: [155,158,160,162,165,167,169,170,172,175,178,180,182,184] },
]

export const callVolumeData = [
  { date: 'Apr 27', ai: 28, human: 18 },
  { date: 'Apr 28', ai: 31, human: 20 },
  { date: 'Apr 29', ai: 26, human: 16 },
  { date: 'Apr 30', ai: 33, human: 19 },
  { date: 'May 1', ai: 35, human: 22 },
  { date: 'May 2', ai: 29, human: 17 },
  { date: 'May 3', ai: 12, human: 8 },
  { date: 'May 4', ai: 14, human: 9 },
  { date: 'May 5', ai: 38, human: 23 },
  { date: 'May 6', ai: 41, human: 25 },
  { date: 'May 7', ai: 37, human: 21 },
  { date: 'May 8', ai: 43, human: 26 },
  { date: 'May 9', ai: 39, human: 22 },
  { date: 'May 10', ai: 31, human: 16 },
]

export const callOutcomes = [
  { name: 'Booked', value: 181, color: '#22C55E' },
  { name: 'Info only', value: 68, color: '#6B6B6B' },
  { name: 'Callback req.', value: 38, color: '#3B82F6' },
  { name: 'Missed / dropped', value: 25, color: '#EF4444' },
]

export const activityFeed = [
  { time: '09:42', text: 'Sophie booked Margaret Doyle for exam with Dr Patel', type: 'booked' },
  { time: '09:38', text: 'New Invisalign enquiry — Claire H. logged GHL warm lead', type: 'lead' },
  { time: '09:31', text: 'Missed call — unknown caller, no voicemail left', type: 'missed' },
  { time: '09:24', text: 'Sophie booked emergency appt — A. Khan, swelling, 11:00 today', type: 'urgent' },
  { time: '09:18', text: 'Opening hours enquiry resolved in-call by Sophie', type: 'resolved' },
  { time: '09:11', text: 'Complaint logged — Raj K. noted 20-min wait, apology in GHL', type: 'complaint' },
  { time: '09:02', text: 'Sophie booked J. Weaver for hygiene with Dr Morrison — Wed 10:30', type: 'booked' },
  { time: '08:54', text: 'Treatment plan accepted — R. Singh, Invisalign, £3,200', type: 'revenue' },
]

export const practitionerTable = [
  { name: 'Dr Patel', utilisation: 84, appts: 12, revenue: '£3,840', trend: 'up' },
  { name: 'Dr Morrison', utilisation: 76, appts: 10, revenue: '£2,900', trend: 'up' },
  { name: 'Dr Okafor', utilisation: 71, appts: 9, revenue: '£2,430', trend: 'down' },
  { name: 'Dr Chen', utilisation: 68, appts: 8, revenue: '£2,120', trend: 'up' },
]

export const alerts = [
  { id: 1, text: 'FTA rate for Invisalign consultations increased 14% week-over-week.', type: 'warning' },
  { id: 2, text: 'Dr Patel has 11 unfilled chair hours next Tuesday.', type: 'info' },
  { id: 3, text: 'AI receptionist resolved 82% of inbound booking calls this week.', type: 'positive' },
  { id: 4, text: '£18,400 in outstanding treatment plan value — 9 patients, no follow-up booked.', type: 'warning' },
]
