export const practices = [
  'Chelsea Dental Studio',
  'Manchester Smile Clinic',
  'Harrow Dental Care',
  'SmileCraft London',
]

// ─── KPI builders ────────────────────────────────────────────────────────────
const kpi = (id, label, value, trend, trendDir, sparkline) => ({ id, label, value, trend, trendDir, sparkline })

// ─── Chelsea Dental Studio ────────────────────────────────────────────────────
const chelseaKpis = {
  today: [
    kpi('utilisation', 'Diary Utilisation', '78%', '+4.2 pts', 'up', [68,70,72,71,74,75,76,77,78,76,78,78,78,78]),
    kpi('calls', 'Calls Handled', '47', '+12%', 'up', [3,5,8,9,7,4,3,8,7,5,4,2,1,0]),
    kpi('revenue_booked', 'Revenue Booked', '£9,420', '+8%', 'up', [400,820,1200,1600,2100,2800,3400,4200,5100,6200,7400,8100,8900,9420]),
    kpi('fta', 'FTA Rate', '4.1%', '−0.6 pts', 'down-good', [5.8,5.5,5.2,5.4,5.0,4.9,4.7,4.8,4.5,4.4,4.3,4.2,4.1,4.1]),
    kpi('ai_resolution', 'AI Resolution Rate', '73%', '+3 pts', 'up', [62,63,65,66,67,68,69,70,70,71,72,72,73,73]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£184', '+£11', 'up', [155,158,160,162,165,167,169,170,172,175,178,180,182,184]),
  ],
  '7d': [
    kpi('utilisation', 'Diary Utilisation', '76%', '+2.1 pts', 'up', [64,66,68,67,70,72,71,74,75,76,76,74,76,76]),
    kpi('calls', 'Calls Handled', '312', '+9%', 'up', [220,235,248,262,274,286,295,304,308,310,312,312,312,312]),
    kpi('revenue_booked', 'Revenue Booked', '£64,800', '+6%', 'up', [42000,45000,48000,51000,54000,57000,59000,61000,62500,63800,64500,64800,64800,64800]),
    kpi('fta', 'FTA Rate', '3.9%', '−0.8 pts', 'down-good', [5.2,5.0,4.8,4.7,4.5,4.3,4.2,4.1,4.0,3.9,3.9,3.9,3.9,3.9]),
    kpi('ai_resolution', 'AI Resolution Rate', '71%', '+2 pts', 'up', [62,63,64,65,66,67,68,69,70,71,71,71,71,71]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£178', '+£8', 'up', [155,158,160,162,165,167,168,170,172,174,176,178,178,178]),
  ],
  '30d': [
    kpi('utilisation', 'Diary Utilisation', '78%', '+4.2 pts', 'up', [62,65,68,64,70,72,71,74,75,76,77,78,76,78]),
    kpi('calls', 'Calls Handled', '1,284', '+12%', 'up', [820,870,900,880,950,980,1020,1050,1100,1150,1180,1220,1260,1284]),
    kpi('revenue_booked', 'Revenue Booked', '£124,800', '+8%', 'up', [95000,98000,100000,102000,104000,107000,109000,112000,115000,118000,120000,122000,124000,124800]),
    kpi('fta', 'FTA Rate', '4.1%', '−0.6 pts', 'down-good', [5.8,5.5,5.2,5.4,5.0,4.9,4.7,4.8,4.5,4.4,4.3,4.2,4.1,4.1]),
    kpi('ai_resolution', 'AI Resolution Rate', '73%', '+3 pts', 'up', [62,63,65,66,67,68,69,70,70,71,72,72,73,73]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£184', '+£11', 'up', [155,158,160,162,165,167,169,170,172,175,178,180,182,184]),
  ],
  '90d': [
    kpi('utilisation', 'Diary Utilisation', '75%', '+1.8 pts', 'up', [60,62,64,63,66,68,67,70,71,72,73,74,75,75]),
    kpi('calls', 'Calls Handled', '3,840', '+14%', 'up', [2400,2520,2600,2640,2720,2800,2900,3000,3200,3400,3600,3720,3800,3840]),
    kpi('revenue_booked', 'Revenue Booked', '£371,200', '+11%', 'up', [280000,295000,305000,315000,324000,334000,342000,350000,358000,364000,368000,370000,371000,371200]),
    kpi('fta', 'FTA Rate', '4.4%', '−0.4 pts', 'down-good', [5.8,5.6,5.4,5.2,5.0,4.9,4.8,4.7,4.6,4.5,4.5,4.4,4.4,4.4]),
    kpi('ai_resolution', 'AI Resolution Rate', '70%', '+4 pts', 'up', [58,59,60,61,62,63,64,65,66,67,68,69,70,70]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£176', '+£14', 'up', [148,150,152,154,156,158,160,162,164,166,168,170,174,176]),
  ],
}

const chelseaCallVolume = {
  today: [
    { date: '08:00', ai: 3, human: 2 }, { date: '09:00', ai: 8, human: 5 },
    { date: '10:00', ai: 11, human: 7 }, { date: '11:00', ai: 9, human: 6 },
    { date: '12:00', ai: 5, human: 3 }, { date: '13:00', ai: 4, human: 2 },
    { date: '14:00', ai: 7, human: 4 }, { date: '15:00', ai: 6, human: 3 },
    { date: '16:00', ai: 4, human: 2 }, { date: '17:00', ai: 2, human: 1 },
  ],
  '7d': [
    { date: 'Mon', ai: 38, human: 22 }, { date: 'Tue', ai: 42, human: 24 },
    { date: 'Wed', ai: 37, human: 21 }, { date: 'Thu', ai: 44, human: 26 },
    { date: 'Fri', ai: 40, human: 23 }, { date: 'Sat', ai: 14, human: 8 },
    { date: 'Sun', ai: 0, human: 0 },
  ],
  '30d': [
    { date: 'Apr 27', ai: 28, human: 18 }, { date: 'Apr 28', ai: 31, human: 20 },
    { date: 'Apr 29', ai: 26, human: 16 }, { date: 'Apr 30', ai: 33, human: 19 },
    { date: 'May 1', ai: 35, human: 22 }, { date: 'May 2', ai: 29, human: 17 },
    { date: 'May 3', ai: 12, human: 8 }, { date: 'May 4', ai: 14, human: 9 },
    { date: 'May 5', ai: 38, human: 23 }, { date: 'May 6', ai: 41, human: 25 },
    { date: 'May 7', ai: 37, human: 21 }, { date: 'May 8', ai: 43, human: 26 },
    { date: 'May 9', ai: 39, human: 22 }, { date: 'May 10', ai: 31, human: 16 },
  ],
  '90d': [
    { date: 'W1 Feb', ai: 148, human: 84 }, { date: 'W2 Feb', ai: 162, human: 90 },
    { date: 'W3 Feb', ai: 155, human: 88 }, { date: 'W4 Feb', ai: 170, human: 95 },
    { date: 'W1 Mar', ai: 174, human: 96 }, { date: 'W2 Mar', ai: 168, human: 92 },
    { date: 'W3 Mar', ai: 180, human: 100 }, { date: 'W4 Mar', ai: 188, human: 104 },
    { date: 'W1 Apr', ai: 192, human: 106 }, { date: 'W2 Apr', ai: 185, human: 102 },
    { date: 'W3 Apr', ai: 196, human: 108 }, { date: 'W4 Apr', ai: 202, human: 110 },
    { date: 'W1 May', ai: 155, human: 80 },
  ],
}

const chelseaOutcomes = {
  today: [
    { name: 'Booked', value: 22, color: '#22C55E' }, { name: 'Info only', value: 9, color: '#6B6B6B' },
    { name: 'Callback req.', value: 8, color: '#3B82F6' }, { name: 'Missed / dropped', value: 6, color: '#EF4444' },
  ],
  '7d': [
    { name: 'Booked', value: 148, color: '#22C55E' }, { name: 'Info only', value: 62, color: '#6B6B6B' },
    { name: 'Callback req.', value: 34, color: '#3B82F6' }, { name: 'Missed / dropped', value: 24, color: '#EF4444' },
  ],
  '30d': [
    { name: 'Booked', value: 581, color: '#22C55E' }, { name: 'Info only', value: 268, color: '#6B6B6B' },
    { name: 'Callback req.', value: 138, color: '#3B82F6' }, { name: 'Missed / dropped', value: 95, color: '#EF4444' },
  ],
  '90d': [
    { name: 'Booked', value: 1740, color: '#22C55E' }, { name: 'Info only', value: 840, color: '#6B6B6B' },
    { name: 'Callback req.', value: 420, color: '#3B82F6' }, { name: 'Missed / dropped', value: 280, color: '#EF4444' },
  ],
}

// ─── Manchester Smile Clinic ──────────────────────────────────────────────────
const manchesterKpis = {
  today: [
    kpi('utilisation', 'Diary Utilisation', '65%', '−1.2 pts', 'down', [68,66,65,67,64,63,65,66,64,63,62,64,65,65]),
    kpi('calls', 'Calls Handled', '31', '+3%', 'up', [2,3,5,4,4,2,2,4,4,2,1,1,1,0]),
    kpi('revenue_booked', 'Revenue Booked', '£5,840', '+2%', 'up', [200,480,840,1200,1800,2400,3000,3600,4200,4800,5200,5600,5840,5840]),
    kpi('fta', 'FTA Rate', '5.2%', '+0.4 pts', 'up', [4.6,4.8,5.0,5.1,5.0,5.2,5.1,5.3,5.4,5.2,5.1,5.2,5.2,5.2]),
    kpi('ai_resolution', 'AI Resolution Rate', '61%', '−1 pt', 'down', [64,63,62,63,62,61,60,62,61,60,61,61,61,61]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£142', '+£3', 'up', [132,134,135,136,137,138,139,140,140,141,141,142,142,142]),
  ],
  '7d': [
    kpi('utilisation', 'Diary Utilisation', '63%', '−2.1 pts', 'down', [68,66,65,64,64,63,63,63,63,63,63,63,63,63]),
    kpi('calls', 'Calls Handled', '218', '−4%', 'down', [235,232,228,224,222,220,219,218,218,218,218,218,218,218]),
    kpi('revenue_booked', 'Revenue Booked', '£41,200', '−3%', 'down', [44000,43500,43000,42500,42200,41800,41500,41200,41200,41200,41200,41200,41200,41200]),
    kpi('fta', 'FTA Rate', '5.4%', '+0.8 pts', 'up', [4.6,4.8,5.0,5.1,5.2,5.3,5.4,5.4,5.4,5.4,5.4,5.4,5.4,5.4]),
    kpi('ai_resolution', 'AI Resolution Rate', '59%', '−2 pts', 'down', [64,63,62,61,60,60,59,59,59,59,59,59,59,59]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£138', '−£4', 'down', [142,141,140,140,139,139,138,138,138,138,138,138,138,138]),
  ],
  '30d': [
    kpi('utilisation', 'Diary Utilisation', '65%', '−1.2 pts', 'down', [68,66,65,67,64,63,65,66,64,63,62,64,65,65]),
    kpi('calls', 'Calls Handled', '892', '+3%', 'up', [720,740,760,750,780,800,820,840,850,860,870,880,888,892]),
    kpi('revenue_booked', 'Revenue Booked', '£83,200', '+4%', 'up', [68000,70000,72000,74000,76000,77500,79000,80000,81000,82000,82800,83000,83100,83200]),
    kpi('fta', 'FTA Rate', '5.2%', '+0.4 pts', 'up', [4.6,4.8,5.0,5.1,5.0,5.2,5.1,5.3,5.4,5.2,5.1,5.2,5.2,5.2]),
    kpi('ai_resolution', 'AI Resolution Rate', '61%', '−2 pts', 'down', [64,63,62,63,62,61,60,62,61,60,61,61,61,61]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£142', '+£3', 'up', [132,134,135,136,137,138,139,140,140,141,141,142,142,142]),
  ],
  '90d': [
    kpi('utilisation', 'Diary Utilisation', '64%', '−0.9 pts', 'down', [66,65,64,65,64,63,64,65,64,63,64,64,64,64]),
    kpi('calls', 'Calls Handled', '2,680', '+6%', 'up', [2100,2180,2260,2300,2380,2440,2500,2540,2580,2620,2640,2660,2672,2680]),
    kpi('revenue_booked', 'Revenue Booked', '£248,000', '+7%', 'up', [200000,208000,216000,222000,228000,233000,238000,241000,244000,246000,247000,247800,248000,248000]),
    kpi('fta', 'FTA Rate', '5.1%', '+0.2 pts', 'up', [4.8,4.9,5.0,5.0,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1]),
    kpi('ai_resolution', 'AI Resolution Rate', '60%', '+1 pt', 'up', [57,57,58,58,59,59,59,60,60,60,60,60,60,60]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£138', '+£5', 'up', [128,130,131,132,133,134,135,136,136,137,137,138,138,138]),
  ],
}

const manchesterCallVolume = {
  today: [
    { date: '08:00', ai: 2, human: 2 }, { date: '09:00', ai: 5, human: 4 },
    { date: '10:00', ai: 7, human: 6 }, { date: '11:00', ai: 6, human: 5 },
    { date: '12:00', ai: 3, human: 3 }, { date: '13:00', ai: 2, human: 2 },
    { date: '14:00', ai: 4, human: 4 }, { date: '15:00', ai: 4, human: 3 },
    { date: '16:00', ai: 3, human: 2 }, { date: '17:00', ai: 1, human: 1 },
  ],
  '7d': [
    { date: 'Mon', ai: 24, human: 18 }, { date: 'Tue', ai: 28, human: 20 },
    { date: 'Wed', ai: 26, human: 19 }, { date: 'Thu', ai: 30, human: 22 },
    { date: 'Fri', ai: 27, human: 20 }, { date: 'Sat', ai: 10, human: 8 },
    { date: 'Sun', ai: 0, human: 0 },
  ],
  '30d': [
    { date: 'Apr 27', ai: 18, human: 14 }, { date: 'Apr 28', ai: 22, human: 16 },
    { date: 'Apr 29', ai: 19, human: 13 }, { date: 'Apr 30', ai: 24, human: 17 },
    { date: 'May 1', ai: 26, human: 18 }, { date: 'May 2', ai: 20, human: 14 },
    { date: 'May 3', ai: 8, human: 6 }, { date: 'May 4', ai: 10, human: 8 },
    { date: 'May 5', ai: 28, human: 19 }, { date: 'May 6', ai: 30, human: 20 },
    { date: 'May 7', ai: 26, human: 18 }, { date: 'May 8', ai: 32, human: 21 },
    { date: 'May 9', ai: 28, human: 18 }, { date: 'May 10', ai: 21, human: 12 },
  ],
  '90d': [
    { date: 'W1 Feb', ai: 108, human: 74 }, { date: 'W2 Feb', ai: 116, human: 80 },
    { date: 'W3 Feb', ai: 112, human: 78 }, { date: 'W4 Feb', ai: 120, human: 84 },
    { date: 'W1 Mar', ai: 124, human: 86 }, { date: 'W2 Mar', ai: 118, human: 82 },
    { date: 'W3 Mar', ai: 128, human: 88 }, { date: 'W4 Mar', ai: 132, human: 90 },
    { date: 'W1 Apr', ai: 136, human: 92 }, { date: 'W2 Apr', ai: 130, human: 88 },
    { date: 'W3 Apr', ai: 138, human: 94 }, { date: 'W4 Apr', ai: 142, human: 96 },
    { date: 'W1 May', ai: 100, human: 65 },
  ],
}

const manchesterOutcomes = {
  today: [
    { name: 'Booked', value: 14, color: '#22C55E' }, { name: 'Info only', value: 8, color: '#6B6B6B' },
    { name: 'Callback req.', value: 5, color: '#3B82F6' }, { name: 'Missed / dropped', value: 8, color: '#EF4444' },
  ],
  '7d': [
    { name: 'Booked', value: 96, color: '#22C55E' }, { name: 'Info only', value: 58, color: '#6B6B6B' },
    { name: 'Callback req.', value: 32, color: '#3B82F6' }, { name: 'Missed / dropped', value: 44, color: '#EF4444' },
  ],
  '30d': [
    { name: 'Booked', value: 384, color: '#22C55E' }, { name: 'Info only', value: 228, color: '#6B6B6B' },
    { name: 'Callback req.', value: 124, color: '#3B82F6' }, { name: 'Missed / dropped', value: 168, color: '#EF4444' },
  ],
  '90d': [
    { name: 'Booked', value: 1152, color: '#22C55E' }, { name: 'Info only', value: 684, color: '#6B6B6B' },
    { name: 'Callback req.', value: 372, color: '#3B82F6' }, { name: 'Missed / dropped', value: 504, color: '#EF4444' },
  ],
}

// ─── Harrow Dental Care ───────────────────────────────────────────────────────
const harrowKpis = {
  today: [
    kpi('utilisation', 'Diary Utilisation', '71%', '+1.4 pts', 'up', [62,64,66,65,68,70,69,71,71,70,71,71,71,71]),
    kpi('calls', 'Calls Handled', '24', '+5%', 'up', [1,3,5,4,4,2,2,4,4,2,1,0,0,0]),
    kpi('revenue_booked', 'Revenue Booked', '£4,680', '+3%', 'up', [200,400,700,1000,1500,2000,2500,3000,3500,4000,4300,4500,4680,4680]),
    kpi('fta', 'FTA Rate', '3.8%', '−1.2 pts', 'down-good', [5.4,5.2,5.0,4.8,4.6,4.4,4.2,4.0,3.9,3.8,3.8,3.8,3.8,3.8]),
    kpi('ai_resolution', 'AI Resolution Rate', '68%', '+2 pts', 'up', [60,61,62,63,64,65,66,67,67,68,68,68,68,68]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£156', '+£6', 'up', [140,142,144,146,148,149,150,151,152,153,154,155,156,156]),
  ],
  '7d': [
    kpi('utilisation', 'Diary Utilisation', '70%', '+1.1 pts', 'up', [62,64,66,65,68,70,69,70,70,70,70,70,70,70]),
    kpi('calls', 'Calls Handled', '168', '+8%', 'up', [124,130,136,142,148,156,160,164,166,168,168,168,168,168]),
    kpi('revenue_booked', 'Revenue Booked', '£32,800', '+7%', 'up', [24000,25600,27000,28400,29600,30800,31600,32200,32500,32700,32800,32800,32800,32800]),
    kpi('fta', 'FTA Rate', '3.6%', '−1.4 pts', 'down-good', [5.4,5.2,5.0,4.8,4.4,4.0,3.8,3.7,3.6,3.6,3.6,3.6,3.6,3.6]),
    kpi('ai_resolution', 'AI Resolution Rate', '66%', '+1 pt', 'up', [60,61,62,63,64,65,65,66,66,66,66,66,66,66]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£152', '+£4', 'up', [140,142,144,145,147,148,149,150,151,151,152,152,152,152]),
  ],
  '30d': [
    kpi('utilisation', 'Diary Utilisation', '71%', '+1.4 pts', 'up', [62,64,66,65,68,70,69,71,71,70,71,71,71,71]),
    kpi('calls', 'Calls Handled', '692', '+9%', 'up', [520,540,560,550,580,600,620,640,650,660,672,680,688,692]),
    kpi('revenue_booked', 'Revenue Booked', '£134,000', '+8%', 'up', [100000,104000,108000,112000,116000,120000,124000,127000,129000,131000,132500,133200,133800,134000]),
    kpi('fta', 'FTA Rate', '3.8%', '−1.2 pts', 'down-good', [5.4,5.2,5.0,4.8,4.6,4.4,4.2,4.0,3.9,3.8,3.8,3.8,3.8,3.8]),
    kpi('ai_resolution', 'AI Resolution Rate', '68%', '+2 pts', 'up', [60,61,62,63,64,65,66,67,67,68,68,68,68,68]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£156', '+£6', 'up', [140,142,144,146,148,149,150,151,152,153,154,155,156,156]),
  ],
  '90d': [
    kpi('utilisation', 'Diary Utilisation', '69%', '+2.1 pts', 'up', [58,60,62,61,64,66,65,68,68,68,69,69,69,69]),
    kpi('calls', 'Calls Handled', '2,080', '+11%', 'up', [1520,1600,1680,1720,1800,1860,1920,1960,1998,2020,2040,2060,2072,2080]),
    kpi('revenue_booked', 'Revenue Booked', '£398,400', '+9%', 'up', [310000,320000,332000,344000,356000,366000,374000,381000,386000,391000,395000,397000,398000,398400]),
    kpi('fta', 'FTA Rate', '4.0%', '−0.8 pts', 'down-good', [5.2,5.0,4.8,4.6,4.4,4.2,4.1,4.0,4.0,4.0,4.0,4.0,4.0,4.0]),
    kpi('ai_resolution', 'AI Resolution Rate', '65%', '+4 pts', 'up', [56,57,58,59,60,61,62,63,63,64,64,65,65,65]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£150', '+£8', 'up', [134,136,138,140,142,144,145,146,147,148,149,149,150,150]),
  ],
}

const harrowCallVolume = {
  today: [
    { date: '08:00', ai: 2, human: 1 }, { date: '09:00', ai: 5, human: 3 },
    { date: '10:00', ai: 7, human: 4 }, { date: '11:00', ai: 6, human: 3 },
    { date: '12:00', ai: 3, human: 2 }, { date: '13:00', ai: 2, human: 1 },
    { date: '14:00', ai: 5, human: 3 }, { date: '15:00', ai: 4, human: 2 },
    { date: '16:00', ai: 3, human: 2 }, { date: '17:00', ai: 1, human: 1 },
  ],
  '7d': [
    { date: 'Mon', ai: 22, human: 12 }, { date: 'Tue', ai: 26, human: 14 },
    { date: 'Wed', ai: 24, human: 13 }, { date: 'Thu', ai: 28, human: 15 },
    { date: 'Fri', ai: 25, human: 13 }, { date: 'Sat', ai: 9, human: 5 },
    { date: 'Sun', ai: 0, human: 0 },
  ],
  '30d': [
    { date: 'Apr 27', ai: 16, human: 10 }, { date: 'Apr 28', ai: 19, human: 12 },
    { date: 'Apr 29', ai: 15, human: 9 }, { date: 'Apr 30', ai: 21, human: 13 },
    { date: 'May 1', ai: 23, human: 14 }, { date: 'May 2', ai: 18, human: 11 },
    { date: 'May 3', ai: 7, human: 5 }, { date: 'May 4', ai: 8, human: 6 },
    { date: 'May 5', ai: 25, human: 15 }, { date: 'May 6', ai: 27, human: 16 },
    { date: 'May 7', ai: 23, human: 14 }, { date: 'May 8', ai: 29, human: 17 },
    { date: 'May 9', ai: 26, human: 15 }, { date: 'May 10', ai: 18, human: 10 },
  ],
  '90d': [
    { date: 'W1 Feb', ai: 88, human: 52 }, { date: 'W2 Feb', ai: 96, human: 58 },
    { date: 'W3 Feb', ai: 92, human: 54 }, { date: 'W4 Feb', ai: 100, human: 60 },
    { date: 'W1 Mar', ai: 104, human: 62 }, { date: 'W2 Mar', ai: 98, human: 58 },
    { date: 'W3 Mar', ai: 108, human: 64 }, { date: 'W4 Mar', ai: 114, human: 68 },
    { date: 'W1 Apr', ai: 118, human: 70 }, { date: 'W2 Apr', ai: 112, human: 66 },
    { date: 'W3 Apr', ai: 120, human: 72 }, { date: 'W4 Apr', ai: 124, human: 74 },
    { date: 'W1 May', ai: 90, human: 52 },
  ],
}

const harrowOutcomes = {
  today: [
    { name: 'Booked', value: 13, color: '#22C55E' }, { name: 'Info only', value: 6, color: '#6B6B6B' },
    { name: 'Callback req.', value: 4, color: '#3B82F6' }, { name: 'Missed / dropped', value: 4, color: '#EF4444' },
  ],
  '7d': [
    { name: 'Booked', value: 88, color: '#22C55E' }, { name: 'Info only', value: 44, color: '#6B6B6B' },
    { name: 'Callback req.', value: 24, color: '#3B82F6' }, { name: 'Missed / dropped', value: 24, color: '#EF4444' },
  ],
  '30d': [
    { name: 'Booked', value: 342, color: '#22C55E' }, { name: 'Info only', value: 172, color: '#6B6B6B' },
    { name: 'Callback req.', value: 96, color: '#3B82F6' }, { name: 'Missed / dropped', value: 96, color: '#EF4444' },
  ],
  '90d': [
    { name: 'Booked', value: 1026, color: '#22C55E' }, { name: 'Info only', value: 516, color: '#6B6B6B' },
    { name: 'Callback req.', value: 288, color: '#3B82F6' }, { name: 'Missed / dropped', value: 288, color: '#EF4444' },
  ],
}

// ─── SmileCraft London ────────────────────────────────────────────────────────
const smilecraftKpis = {
  today: [
    kpi('utilisation', 'Diary Utilisation', '82%', '+6.1 pts', 'up', [68,70,72,74,76,78,79,80,81,82,82,82,82,82]),
    kpi('calls', 'Calls Handled', '38', '+18%', 'up', [2,4,7,8,6,3,3,7,6,4,2,1,0,0]),
    kpi('revenue_booked', 'Revenue Booked', '£12,480', '+22%', 'up', [500,1000,1800,2600,3600,4800,6000,7400,8800,10200,11200,11900,12400,12480]),
    kpi('fta', 'FTA Rate', '2.8%', '−1.8 pts', 'down-good', [5.2,5.0,4.6,4.2,3.8,3.6,3.4,3.2,3.0,2.9,2.8,2.8,2.8,2.8]),
    kpi('ai_resolution', 'AI Resolution Rate', '76%', '+6 pts', 'up', [62,63,65,67,68,70,71,72,73,74,75,76,76,76]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£198', '+£24', 'up', [162,166,170,174,178,182,186,188,190,193,195,196,198,198]),
  ],
  '7d': [
    kpi('utilisation', 'Diary Utilisation', '80%', '+5.2 pts', 'up', [66,68,70,72,74,76,78,79,80,80,80,80,80,80]),
    kpi('calls', 'Calls Handled', '266', '+16%', 'up', [185,196,208,218,228,238,246,252,257,260,263,265,266,266]),
    kpi('revenue_booked', 'Revenue Booked', '£87,400', '+19%', 'up', [58000,62000,66000,70000,74000,78000,81000,83500,85000,86200,87000,87400,87400,87400]),
    kpi('fta', 'FTA Rate', '2.6%', '−2.0 pts', 'down-good', [5.0,4.6,4.2,3.8,3.4,3.0,2.8,2.7,2.6,2.6,2.6,2.6,2.6,2.6]),
    kpi('ai_resolution', 'AI Resolution Rate', '74%', '+5 pts', 'up', [62,63,65,67,69,70,72,73,74,74,74,74,74,74]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£192', '+£20', 'up', [162,166,170,174,178,182,184,186,188,190,191,192,192,192]),
  ],
  '30d': [
    kpi('utilisation', 'Diary Utilisation', '82%', '+6.1 pts', 'up', [68,70,72,74,76,78,79,80,81,82,82,82,82,82]),
    kpi('calls', 'Calls Handled', '1,092', '+21%', 'up', [720,760,800,840,880,920,950,980,1010,1035,1055,1070,1085,1092]),
    kpi('revenue_booked', 'Revenue Booked', '£142,800', '+24%', 'up', [94000,98000,104000,110000,116000,120000,125000,129000,133000,137000,139500,141000,142000,142800]),
    kpi('fta', 'FTA Rate', '2.8%', '−1.8 pts', 'down-good', [5.2,5.0,4.6,4.2,3.8,3.6,3.4,3.2,3.0,2.9,2.8,2.8,2.8,2.8]),
    kpi('ai_resolution', 'AI Resolution Rate', '76%', '+6 pts', 'up', [62,63,65,67,68,70,71,72,73,74,75,76,76,76]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£198', '+£24', 'up', [162,166,170,174,178,182,186,188,190,193,195,196,198,198]),
  ],
  '90d': [
    kpi('utilisation', 'Diary Utilisation', '79%', '+7.8 pts', 'up', [60,62,64,66,68,70,72,73,75,76,77,78,79,79]),
    kpi('calls', 'Calls Handled', '3,280', '+28%', 'up', [2000,2120,2240,2360,2480,2600,2700,2800,2900,3000,3100,3180,3240,3280]),
    kpi('revenue_booked', 'Revenue Booked', '£426,000', '+31%', 'up', [260000,280000,300000,320000,340000,360000,376000,390000,402000,412000,419000,423000,425000,426000]),
    kpi('fta', 'FTA Rate', '3.1%', '−1.4 pts', 'down-good', [5.4,5.2,4.8,4.4,4.0,3.8,3.6,3.4,3.2,3.1,3.1,3.1,3.1,3.1]),
    kpi('ai_resolution', 'AI Resolution Rate', '73%', '+8 pts', 'up', [58,59,61,63,65,67,68,70,71,72,73,73,73,73]),
    kpi('revenue_chair', 'Revenue / Chair Hr', '£190', '+£28', 'up', [152,156,160,164,168,172,176,180,182,184,186,188,190,190]),
  ],
}

const smilecraftCallVolume = {
  today: [
    { date: '08:00', ai: 3, human: 1 }, { date: '09:00', ai: 7, human: 3 },
    { date: '10:00', ai: 9, human: 4 }, { date: '11:00', ai: 8, human: 3 },
    { date: '12:00', ai: 4, human: 2 }, { date: '13:00', ai: 3, human: 1 },
    { date: '14:00', ai: 6, human: 3 }, { date: '15:00', ai: 5, human: 2 },
    { date: '16:00', ai: 4, human: 2 }, { date: '17:00', ai: 2, human: 1 },
  ],
  '7d': [
    { date: 'Mon', ai: 30, human: 12 }, { date: 'Tue', ai: 34, human: 14 },
    { date: 'Wed', ai: 31, human: 13 }, { date: 'Thu', ai: 36, human: 14 },
    { date: 'Fri', ai: 33, human: 12 }, { date: 'Sat', ai: 12, human: 5 },
    { date: 'Sun', ai: 0, human: 0 },
  ],
  '30d': [
    { date: 'Apr 27', ai: 22, human: 9 }, { date: 'Apr 28', ai: 26, human: 11 },
    { date: 'Apr 29', ai: 22, human: 9 }, { date: 'Apr 30', ai: 28, human: 12 },
    { date: 'May 1', ai: 30, human: 13 }, { date: 'May 2', ai: 24, human: 10 },
    { date: 'May 3', ai: 10, human: 4 }, { date: 'May 4', ai: 11, human: 5 },
    { date: 'May 5', ai: 32, human: 13 }, { date: 'May 6', ai: 35, human: 14 },
    { date: 'May 7', ai: 31, human: 12 }, { date: 'May 8', ai: 37, human: 15 },
    { date: 'May 9', ai: 33, human: 13 }, { date: 'May 10', ai: 26, human: 10 },
  ],
  '90d': [
    { date: 'W1 Feb', ai: 118, human: 44 }, { date: 'W2 Feb', ai: 128, human: 48 },
    { date: 'W3 Feb', ai: 124, human: 46 }, { date: 'W4 Feb', ai: 136, human: 50 },
    { date: 'W1 Mar', ai: 142, human: 52 }, { date: 'W2 Mar', ai: 136, human: 50 },
    { date: 'W3 Mar', ai: 148, human: 54 }, { date: 'W4 Mar', ai: 156, human: 56 },
    { date: 'W1 Apr', ai: 162, human: 58 }, { date: 'W2 Apr', ai: 155, human: 56 },
    { date: 'W3 Apr', ai: 168, human: 60 }, { date: 'W4 Apr', ai: 174, human: 62 },
    { date: 'W1 May', ai: 130, human: 46 },
  ],
}

const smilecraftOutcomes = {
  today: [
    { name: 'Booked', value: 21, color: '#22C55E' }, { name: 'Info only', value: 8, color: '#6B6B6B' },
    { name: 'Callback req.', value: 6, color: '#3B82F6' }, { name: 'Missed / dropped', value: 3, color: '#EF4444' },
  ],
  '7d': [
    { name: 'Booked', value: 148, color: '#22C55E' }, { name: 'Info only', value: 56, color: '#6B6B6B' },
    { name: 'Callback req.', value: 42, color: '#3B82F6' }, { name: 'Missed / dropped', value: 20, color: '#EF4444' },
  ],
  '30d': [
    { name: 'Booked', value: 602, color: '#22C55E' }, { name: 'Info only', value: 228, color: '#6B6B6B' },
    { name: 'Callback req.', value: 172, color: '#3B82F6' }, { name: 'Missed / dropped', value: 82, color: '#EF4444' },
  ],
  '90d': [
    { name: 'Booked', value: 1806, color: '#22C55E' }, { name: 'Info only', value: 684, color: '#6B6B6B' },
    { name: 'Callback req.', value: 516, color: '#3B82F6' }, { name: 'Missed / dropped', value: 246, color: '#EF4444' },
  ],
}

// ─── Main export ──────────────────────────────────────────────────────────────
export const overviewData = {
  chelsea: {
    greeting: 'Charlotte',
    headline: { calls: 47, util: 78, alerts: 2 },
    kpis: chelseaKpis,
    callVolume: chelseaCallVolume,
    callOutcomes: chelseaOutcomes,
    activityFeed: [
      { time: '09:42', text: 'Sophie booked Margaret Doyle for exam with Dr Fletcher', type: 'booked' },
      { time: '09:38', text: 'New Invisalign enquiry — Claire H. logged GHL warm lead', type: 'lead' },
      { time: '09:31', text: 'Missed call — unknown caller, no voicemail left', type: 'missed' },
      { time: '09:24', text: 'Sophie booked emergency appt — A. Hargreaves, swelling, 11:00', type: 'urgent' },
      { time: '09:18', text: 'Opening hours enquiry resolved in-call by Sophie', type: 'resolved' },
      { time: '09:11', text: 'Complaint logged — Tom B. noted 20-min wait, apology in GHL', type: 'complaint' },
      { time: '09:02', text: 'Sophie booked J. Weaver for hygiene with Dr Morrison — Wed 10:30', type: 'booked' },
      { time: '08:54', text: 'Treatment plan accepted — G. Whitmore, Invisalign, £3,200', type: 'revenue' },
    ],
    practitionerTable: [
      { name: 'Dr Fletcher', utilisation: 84, appts: 12, revenue: '£3,840', trend: 'up' },
      { name: 'Dr Morrison', utilisation: 76, appts: 10, revenue: '£2,900', trend: 'up' },
      { name: 'Dr Okafor', utilisation: 71, appts: 9, revenue: '£2,430', trend: 'down' },
      { name: 'Dr Hewitt', utilisation: 68, appts: 8, revenue: '£2,120', trend: 'up' },
    ],
    alerts: [
      { id: 1, text: 'FTA rate for Invisalign consultations increased 14% week-over-week.', type: 'warning' },
      { id: 2, text: 'Dr Fletcher has 11 unfilled chair hours next Tuesday.', type: 'info' },
      { id: 3, text: 'AI receptionist resolved 82% of inbound booking calls this week.', type: 'positive' },
      { id: 4, text: '£18,400 in outstanding treatment plan value — 9 patients, no follow-up booked.', type: 'warning' },
    ],
  },

  manchester: {
    greeting: 'Charlotte',
    headline: { calls: 31, util: 65, alerts: 4 },
    kpis: manchesterKpis,
    callVolume: manchesterCallVolume,
    callOutcomes: manchesterOutcomes,
    activityFeed: [
      { time: '09:48', text: 'Sophie booked William Barnes for hygiene with Dr Williams', type: 'booked' },
      { time: '09:41', text: 'Missed call — patient did not leave voicemail', type: 'missed' },
      { time: '09:33', text: 'New patient enquiry — composite bonding, GHL lead created', type: 'lead' },
      { time: '09:22', text: 'Sophie handled NHS availability query — resolved in-call', type: 'resolved' },
      { time: '09:14', text: 'Recall SMS campaign — 48 patients contacted, 6 replies received', type: 'revenue' },
      { time: '09:06', text: 'Sophie booked S. Clarke for whitening consult — Dr Patel', type: 'booked' },
      { time: '08:58', text: 'FTA — G. Thompson did not attend 09:00 exam with Dr Ahmed', type: 'missed' },
      { time: '08:52', text: 'Treatment plan signed off — D. Harris, crown, £1,100', type: 'revenue' },
    ],
    practitionerTable: [
      { name: 'Dr Williams', utilisation: 72, appts: 11, revenue: '£2,640', trend: 'up' },
      { name: 'Dr Patel', utilisation: 68, appts: 9, revenue: '£2,160', trend: 'up' },
      { name: 'Dr Ahmed', utilisation: 61, appts: 8, revenue: '£1,840', trend: 'down' },
      { name: 'Dr Barnes', utilisation: 54, appts: 7, revenue: '£1,540', trend: 'down' },
    ],
    alerts: [
      { id: 1, text: 'Dr Barnes chair utilisation below 55% for second consecutive week.', type: 'warning' },
      { id: 2, text: 'Missed call rate up 8% week-over-week — consider additional reception cover.', type: 'warning' },
      { id: 3, text: '£6,800 in NHS band 3 treatment plans overdue — 12 patients affected.', type: 'info' },
      { id: 4, text: 'Sophie handling only 61% of inbound calls autonomously — 3 pts below target.', type: 'warning' },
    ],
  },

  harrow: {
    greeting: 'Charlotte',
    headline: { calls: 24, util: 71, alerts: 4 },
    kpis: harrowKpis,
    callVolume: harrowCallVolume,
    callOutcomes: harrowOutcomes,
    activityFeed: [
      { time: '09:54', text: 'Sophie booked P. Sharma for implant consult with Dr Singh', type: 'booked' },
      { time: '09:44', text: 'New patient enquiry — Invisalign — logged in GHL', type: 'lead' },
      { time: '09:36', text: 'Sophie resolved NHS band query in-call — 0:54', type: 'resolved' },
      { time: '09:28', text: 'Recall SMS sent — 32 lapsed patients targeted this morning', type: 'revenue' },
      { time: '09:19', text: 'Sophie booked K. Obi for hygiene — Dr Clarke — Thu 14:00', type: 'booked' },
      { time: '09:10', text: 'Missed call — no voicemail left', type: 'missed' },
      { time: '09:02', text: 'Treatment plan accepted — M. Hussain, crowns ×2, £1,900', type: 'revenue' },
      { time: '08:55', text: 'FTA — E. Morris, 08:30 appointment, Dr Kumar', type: 'missed' },
    ],
    practitionerTable: [
      { name: 'Dr Singh', utilisation: 78, appts: 10, revenue: '£2,880', trend: 'up' },
      { name: 'Dr Kumar', utilisation: 74, appts: 9, revenue: '£2,520', trend: 'up' },
      { name: 'Dr Obi', utilisation: 68, appts: 8, revenue: '£2,160', trend: 'up' },
      { name: 'Dr Clarke', utilisation: 62, appts: 7, revenue: '£1,820', trend: 'down' },
    ],
    alerts: [
      { id: 1, text: 'Implant consultation wait time now 6 weeks — 4 patients pending referral.', type: 'info' },
      { id: 2, text: 'FTA rate improved to 3.8% — best performance in 6 months.', type: 'positive' },
      { id: 3, text: 'Dr Clarke utilisation below target — 5 unfilled slots this week.', type: 'warning' },
      { id: 4, text: '£12,200 in active treatment plans with no follow-up appointment booked.', type: 'warning' },
    ],
  },

  smilecraft: {
    greeting: 'Charlotte',
    headline: { calls: 38, util: 82, alerts: 4 },
    kpis: smilecraftKpis,
    callVolume: smilecraftCallVolume,
    callOutcomes: smilecraftOutcomes,
    activityFeed: [
      { time: '09:52', text: 'Sophie booked H. Fairfax for Invisalign consult — Dr Sterling', type: 'booked' },
      { time: '09:44', text: 'New high-value enquiry — full smile makeover, £8,400 plan', type: 'revenue' },
      { time: '09:36', text: 'Sophie booked L. Reid for whitening — Dr Lane — Fri 11:00', type: 'booked' },
      { time: '09:27', text: 'Treatment plan sent to C. Morgan — composite bonding £3,200', type: 'lead' },
      { time: '09:18', text: 'Finance enquiry resolved in-call — 0% options explained', type: 'resolved' },
      { time: '09:09', text: 'Sophie booked emergency appt — T. Walsh, chipped tooth, 10:30', type: 'urgent' },
      { time: '09:01', text: 'VIP patient — A. Pemberton returning after 8-month gap, rebooked', type: 'booked' },
      { time: '08:52', text: 'Missed call — unknown number, GHL follow-up task created', type: 'missed' },
    ],
    practitionerTable: [
      { name: 'Dr Sterling', utilisation: 91, appts: 14, revenue: '£5,460', trend: 'up' },
      { name: 'Dr Fairfax', utilisation: 84, appts: 12, revenue: '£4,320', trend: 'up' },
      { name: 'Dr Lane', utilisation: 78, appts: 11, revenue: '£3,640', trend: 'up' },
      { name: 'Dr Reid', utilisation: 72, appts: 9, revenue: '£2,880', trend: 'up' },
    ],
    alerts: [
      { id: 1, text: 'SmileCraft on track for best monthly revenue since opening — 8 days remaining.', type: 'positive' },
      { id: 2, text: 'Dr Sterling fully booked through end of month — waitlist has 12 patients.', type: 'info' },
      { id: 3, text: 'AI resolution rate hit 76% — above 75% target for the first time.', type: 'positive' },
      { id: 4, text: '£24,600 in new treatment plans this week — highest ever single-week pipeline.', type: 'positive' },
    ],
  },
}
