export const initialChallenges = [
  {
    id: 'CH-2031',
    title: 'Water logging near Govt. School',
    category: 'Civic Infrastructure',
    location: 'Ward 4, North Zone',
    priority: 'High',
    matchScore: 92,
    date: '2 Days Ago',
    description: 'During monsoon, the main access road to the government school floods, preventing students from attending classes. Needs a low-cost drainage solution.',
    submitter: 'Panchayat Leader, Ward 4',
    clusterCount: 3
  },
  {
    id: 'CH-1987',
    title: 'Digital literacy gap among rural women',
    category: 'Smart Education',
    location: 'Block A Villages',
    priority: 'Medium',
    matchScore: 81,
    date: '1 Week Ago',
    description: 'Self-help groups in Block A struggle to use online banking and government portals. Need a simple vernacular training module.',
    submitter: 'NGO: Rural Uplift',
    clusterCount: 0
  },
  {
    id: 'CH-1844',
    title: 'Traffic congestion at Main Market intersection',
    category: 'Smart Mobility',
    location: 'Main Market Square',
    priority: 'Low',
    matchScore: 65,
    date: '2 Weeks Ago',
    description: 'Heavy traffic during peak hours at the main market. Need an automated traffic light timing optimization based on vehicle flow.',
    submitter: 'Traffic Police Dept',
    clusterCount: 5
  },
  {
    id: 'CH-2101',
    title: 'High energy consumption in local hospital',
    category: 'Energy',
    location: 'District Hospital',
    priority: 'High',
    matchScore: 88,
    date: '3 Days Ago',
    description: 'The district hospital faces high electricity bills due to inefficient HVAC systems. Seeking AI-based monitoring and optimization.',
    submitter: 'CMO Office',
    clusterCount: 1
  },
  {
    id: 'CH-2150',
    title: 'Crop yield reduction due to unknown pest',
    category: 'Agriculture',
    location: 'South District Farms',
    priority: 'Medium',
    matchScore: 45,
    date: '4 Days Ago',
    description: 'Farmers report a new type of pest affecting tomato crops. Need an AI image recognition tool for early detection.',
    submitter: 'Farmers Cooperative',
    clusterCount: 2
  }
];

export const initialProjects = [
  {
    id: 'PRJ-102',
    title: 'Solar-powered Water Purification',
    challengeId: 'CH-1002',
    stage: 'Prototype',
    teamSize: 4,
    daysActive: 45,
    nextMilestone: 'Lab Testing (Oct 15)',
    history: [
      { date: '2026-08-01', action: 'Challenge Accepted' },
      { date: '2026-08-15', action: 'Moved to Prototype' }
    ],
    notes: ['Initial materials procured.', 'Waiting for solar panel delivery.']
  },
  {
    id: 'PRJ-098',
    title: 'AI-based Traffic Signal Optimization',
    challengeId: 'CH-1844',
    stage: 'Testing',
    teamSize: 6,
    daysActive: 90,
    nextMilestone: 'Field Trial (Nov 1)',
    history: [
      { date: '2026-06-10', action: 'Challenge Accepted' },
      { date: '2026-07-20', action: 'Moved to Prototype' },
      { date: '2026-09-01', action: 'Moved to Testing' }
    ],
    notes: ['Simulation results look promising (20% wait time reduction).']
  },
  {
    id: 'PRJ-055',
    title: 'Vernacular E-learning App for Farmers',
    challengeId: 'CH-0991',
    stage: 'Pilot',
    teamSize: 3,
    daysActive: 120,
    nextMilestone: 'User Feedback Review (Oct 5)',
    history: [
      { date: '2026-05-15', action: 'Challenge Accepted' },
      { date: '2026-07-01', action: 'Moved to Prototype' },
      { date: '2026-08-10', action: 'Moved to Pilot' }
    ],
    notes: ['Deployed to 50 test users in rural district.']
  }
];

export const initialTeam = [
  { id: 'T-1', name: 'Dr. Anita Sharma', role: 'Faculty Lead', email: 'anita.s@university.edu', project: 'PRJ-102' },
  { id: 'T-2', name: 'Rahul Kumar', role: 'Student (M.Tech)', email: 'rahul.k@university.edu', project: 'PRJ-102' },
  { id: 'T-3', name: 'Priya Patel', role: 'Student (B.Tech)', email: 'priya.p@university.edu', project: 'PRJ-098' },
  { id: 'T-4', name: 'Dr. Vivek Singh', role: 'Faculty Co-Lead', email: 'vivek.s@university.edu', project: 'PRJ-055' }
];

export const initialCollabs = [
  { id: 'REQ-1', partnerName: 'TechCorp India', supportType: 'Cloud Credits', projectId: 'PRJ-098', status: 'Pending', date: '2 Days Ago' },
  { id: 'REQ-2', partnerName: 'GreenEarth NGO', supportType: 'Funding', projectId: 'PRJ-102', status: 'Pending', date: '1 Week Ago' },
  { id: 'REQ-3', partnerName: 'Innovate Solutions', supportType: 'Mentoring', projectId: 'PRJ-055', status: 'Accepted', date: '1 Month Ago' }
];

export const initialNotifications = [
  { id: 'N1', title: 'New High-Match Challenge', message: 'A new challenge matches 92% with your expertise.', type: 'Challenge', read: false, time: '2 hours ago' },
  { id: 'N2', title: 'Collaboration Request', message: 'TechCorp India requested to join PRJ-098.', type: 'Collaboration', read: false, time: '1 day ago' },
  { id: 'N3', title: 'Project Milestone Due', message: 'PRJ-055 User Feedback Review is due soon.', type: 'System', read: true, time: '3 days ago' }
];

export const initialProfile = {
  institutionName: 'National Institute of Technology',
  contactEmail: 'admin@nit.edu',
  phone: '+91-9876543210',
  expertise: ['Smart Mobility', 'Civic Infrastructure', 'Smart Education'],
  notificationsEnabled: true,
  language: 'English'
};
