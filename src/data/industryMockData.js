export const initialDiscoverProjects = [
  {
    id: 'PRJ-2041',
    title: 'Low-cost Water Purification System',
    category: 'Civic Infrastructure',
    stage: 'Prototype',
    university: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    description: 'A scalable, solar-powered water purification prototype designed for rural panchayats. Needs funding for field testing materials and technical mentorship on solar efficiency.',
    supportNeeded: ['Funding', 'Technical Support'],
    impactEstimate: '5,000+ residents',
    fundingRequested: 500000,
    milestones: ['Design Finalized', 'Initial Lab Tests Passed']
  },
  {
    id: 'PRJ-2088',
    title: 'AI Crop Disease Detection App',
    category: 'Agriculture',
    stage: 'Testing',
    university: 'Punjab Agricultural University',
    location: 'Ludhiana, Punjab',
    description: 'Mobile application using edge AI to detect 15 common wheat and rice diseases. Seeking UI/UX mentoring and cloud credits for backend hosting.',
    supportNeeded: ['Mentoring', 'Technical Support'],
    impactEstimate: '10,000+ farmers',
    fundingRequested: 0,
    milestones: ['Model Trained (92% accuracy)', 'Beta App Developed']
  },
  {
    id: 'PRJ-1902',
    title: 'Smart Traffic Light Controller',
    category: 'Smart Mobility',
    stage: 'Pilot',
    university: 'NIT Trichy',
    location: 'Trichy, Tamil Nadu',
    description: 'Dynamic traffic signal controller reducing wait times by 20%. Currently running at 2 intersections. Needs scaling funds.',
    supportNeeded: ['Funding'],
    impactEstimate: '50,000+ commuters',
    fundingRequested: 1200000,
    milestones: ['Prototype Built', 'City Council Approval', 'Pilot at 2 Intersections Active']
  },
  {
    id: 'PRJ-2105',
    title: 'Vernacular Financial Literacy Platform',
    category: 'Smart Education',
    stage: 'Prototype',
    university: 'Delhi University',
    location: 'Delhi',
    description: 'Gamified learning platform in 5 regional languages for women SHGs. Needs mentoring on go-to-market strategy for rural areas.',
    supportNeeded: ['Mentoring'],
    impactEstimate: '2,000+ women',
    fundingRequested: 0,
    milestones: ['Content Translated', 'Web Prototype Active']
  },
  {
    id: 'PRJ-2210',
    title: 'Biodegradable Packaging from Agri-Waste',
    category: 'Environment',
    stage: 'Testing',
    university: 'IISc Bangalore',
    location: 'Bangalore, Karnataka',
    description: 'Developing sturdy, water-resistant packaging material from stubble waste to replace single-use plastics.',
    supportNeeded: ['Funding', 'Mentoring'],
    impactEstimate: 'Environmental scale',
    fundingRequested: 800000,
    milestones: ['Material Formulated', 'Tensile Testing Ongoing']
  }
];

export const initialCollaborations = [
  {
    id: 'COL-001',
    projectId: 'PRJ-1805',
    projectTitle: 'Solar Micro-grids for Tribal Hamlets',
    supportType: ['Funding', 'Technical Support'],
    status: 'Active',
    dateJoined: '2026-03-15',
    university: 'IIT Kanpur',
    stage: 'Pilot',
    timeline: [
      { date: '2026-03-15', action: 'Collaboration Agreement Signed' },
      { date: '2026-04-10', action: 'First Tranche Disbursed (₹5L)' },
      { date: '2026-06-01', action: 'Hardware Procured' }
    ],
    logs: [
      { date: '2026-06-15', type: 'Note', content: 'Reviewed installation plan for Hamlet A. Looks good.' }
    ]
  },
  {
    id: 'COL-002',
    projectId: 'PRJ-1950',
    projectTitle: 'AI for Maternal Health Monitoring',
    supportType: ['Mentoring'],
    status: 'Completed',
    dateJoined: '2025-11-20',
    university: 'AIIMS Delhi',
    stage: 'Deployed',
    timeline: [
      { date: '2025-11-20', action: 'Mentorship Started' },
      { date: '2026-02-15', action: 'Clinical Trials Completed' },
      { date: '2026-07-10', action: 'Solution Deployed to 5 PHCs' }
    ],
    logs: []
  },
  {
    id: 'COL-003',
    projectId: 'PRJ-2099',
    projectTitle: 'Drone-based Reforestation Seeding',
    supportType: ['Funding'],
    status: 'Pending',
    dateJoined: '2026-09-10',
    university: 'Forest Research Institute',
    stage: 'Prototype',
    timeline: [
      { date: '2026-09-10', action: 'Support Offer Sent' }
    ],
    logs: []
  }
];

export const initialFunding = [
  { id: 'FND-101', projectId: 'PRJ-1805', amount: 500000, date: '2026-04-10', status: 'Disbursed', note: 'First tranche for hardware' },
  { id: 'FND-102', projectId: 'PRJ-1805', amount: 500000, date: '2026-10-15', status: 'Committed', note: 'Second tranche upon pilot completion' },
  { id: 'FND-103', projectId: 'PRJ-2099', amount: 1500000, date: '2026-09-10', status: 'Committed', note: 'Pending HEI acceptance' }
];

export const initialMentorships = [
  { 
    id: 'MNT-1', 
    projectId: 'PRJ-1950', 
    projectTitle: 'AI for Maternal Health Monitoring',
    mentor: 'Dr. Sarah Chen (Chief Data Scientist)',
    sessionCount: 8,
    nextSession: null,
    notes: []
  },
  { 
    id: 'MNT-2', 
    projectId: 'PRJ-1805', 
    projectTitle: 'Solar Micro-grids',
    mentor: 'Rajiv Mehta (VP Engineering)',
    sessionCount: 3,
    nextSession: '2026-09-18T14:00',
    notes: ['Discussing battery management systems next week.']
  }
];

export const initialIndustryProfile = {
  orgName: 'TechCorp India Foundation',
  sector: 'Information Technology',
  focusAreas: ['Smart Education', 'Civic Infrastructure', 'Environment'],
  contactEmail: 'csr@techcorp.in',
  phone: '+91-11-45678900',
  notificationsEnabled: true,
  language: 'English'
};

export const initialIndustryNotifications = [
  { id: 'N1', title: 'New Matching Project', message: 'IIT Bombay posted a new project in Civic Infrastructure needing funding.', type: 'Projects', read: false, time: '2 hours ago' },
  { id: 'N2', title: 'HEI Accepted Request', message: 'IIT Kanpur accepted your collaboration offer for Solar Micro-grids.', type: 'Collaborations', read: true, time: '3 days ago' },
  { id: 'N3', title: 'Upcoming Mentorship Session', message: 'Session with PRJ-1805 starts in 30 minutes.', type: 'Sessions', read: false, time: '1 week ago' }
];
