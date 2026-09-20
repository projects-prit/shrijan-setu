export const initialProfile = {
  name: 'Ramesh Patil',
  phone: '+91-9876543210',
  district: 'Pune',
  ward: 'Ward 14, Kothrud',
  language: 'Marathi',
  notificationsEnabled: true,
  impact: {
    reported: 3,
    resolved: 1,
    upvotes: 24
  }
};

export const initialMyReports = [
  {
    id: '#SS-2026',
    title: 'Severe water logging near main market',
    category: 'Water Issue',
    description: 'Every time it rains, the main market road floods completely. It takes days to clear and causes major traffic issues and health hazards.',
    submittedDate: 'Oct 12, 2025',
    status: 'Being Tested',
    location: 'Kothrud Market, Pune',
    assignedTo: 'COEP Pune',
    timeline: [
      { status: 'Submitted', date: 'Oct 12, 2025', note: 'We received your report.' },
      { status: 'Matched', date: 'Oct 15, 2025', note: 'Matched with College of Engineering Pune (COEP).' },
      { status: 'Being Built', date: 'Nov 02, 2025', note: 'Students are building a smart drainage sensor system.' },
      { status: 'Being Tested', date: 'Jan 10, 2026', note: 'Sensors are being tested at the location.' },
    ]
  },
  {
    id: '#SS-3041',
    title: 'Primary school lacks digital learning tools',
    category: 'Education',
    description: 'The ZP primary school has no computers or smart boards. Kids are falling behind.',
    submittedDate: 'Jan 05, 2026',
    status: 'Matched',
    location: 'ZP School, Bavdhan',
    assignedTo: 'Pune University',
    timeline: [
      { status: 'Submitted', date: 'Jan 05, 2026', note: 'We received your report.' },
      { status: 'Matched', date: 'Jan 20, 2026', note: 'Matched with Pune University Dept of Education.' },
    ]
  },
  {
    id: '#SS-1092',
    title: 'Broken streetlights on Karve Road',
    category: 'Infrastructure',
    description: 'Streetlights have been broken for 3 months. Very unsafe at night.',
    submittedDate: 'Aug 14, 2025',
    status: 'Deployed',
    location: 'Karve Road, Pune',
    assignedTo: 'MIT Pune',
    rating: 0,
    timeline: [
      { status: 'Submitted', date: 'Aug 14, 2025', note: 'Report received.' },
      { status: 'Matched', date: 'Aug 20, 2025', note: 'Matched with MIT Pune.' },
      { status: 'Being Built', date: 'Sep 05, 2025', note: 'Solar-powered smart lights proposed.' },
      { status: 'Being Tested', date: 'Oct 10, 2025', note: '2 lights installed for testing.' },
      { status: 'Deployed', date: 'Nov 01, 2025', note: 'All lights repaired and upgraded to solar! Supported by Tata CSR.' },
    ]
  }
];

export const initialCommunityFeed = [
  {
    id: 'CF-1',
    title: 'Smart Solar Streetlights Installed',
    category: 'Infrastructure',
    description: 'Replaced 45 broken streetlights with self-monitoring solar lights.',
    location: 'Karve Road, Pune',
    solver: 'MIT Pune',
    partner: 'Tata CSR',
    upvotes: 145,
    rating: 4.8,
    date: 'Nov 2025'
  },
  {
    id: 'CF-2',
    title: 'Automated Waste Segregation Bins',
    category: 'Environment',
    description: 'Installed 10 AI-powered bins that automatically segregate wet and dry waste.',
    location: 'Shivajinagar, Pune',
    solver: 'COEP Pune',
    partner: 'Reliance Foundation',
    upvotes: 312,
    rating: 4.9,
    date: 'Dec 2025'
  },
  {
    id: 'CF-3',
    title: 'Digital Literacy Tablet Program',
    category: 'Education',
    description: 'Distributed 500 loaded tablets with offline educational content to 5 local ZP schools.',
    location: 'Mulshi Taluka',
    solver: 'Symbiosis University',
    partner: 'Infosys Foundation',
    upvotes: 520,
    rating: 5.0,
    date: 'Feb 2026'
  },
  {
    id: 'CF-4',
    title: 'Low-cost Water Purification Unit',
    category: 'Water Issue',
    description: 'Installed a community water purification unit utilizing graphene filters.',
    location: 'Hadapsar, Pune',
    solver: 'NCL & IISER Pune',
    partner: 'Bajaj CSR',
    upvotes: 210,
    rating: 4.6,
    date: 'Jan 2026'
  }
];

export const initialNotifications = [
  {
    id: 'N-1',
    title: 'Status Update: #SS-2026',
    message: 'Your report about "Severe water logging" has moved to the "Being Tested" stage!',
    date: '2 days ago',
    read: false,
    type: 'report'
  },
  {
    id: 'N-2',
    title: 'New solution deployed near you',
    message: 'Check out the new Digital Literacy Tablet Program deployed in Mulshi Taluka.',
    date: '1 week ago',
    read: true,
    type: 'community'
  },
  {
    id: 'N-3',
    title: 'Thank you!',
    message: '5 people upvoted the issue you reported on Karve Road.',
    date: '2 weeks ago',
    read: true,
    type: 'system'
  }
];
