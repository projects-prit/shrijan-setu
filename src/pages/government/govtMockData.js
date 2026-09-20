// Realistic mock data for the Government Dashboard

export const mockStats = {
  totalChallenges: 1245,
  activeProjects: 382,
  solutionsDeployed: 156,
  institutionsOnboarded: 84
};

export const mockChallenges = [
  { id: 'CH-2026-001', title: 'Severe Waterlogging in Monsoon', category: 'Civic Infrastructure', district: 'Mumbai', priority: 'High', status: 'Submitted', date: '2026-09-12', hei: 'Unassigned', description: 'Annual severe waterlogging in Andheri subway leading to traffic halts.' },
  { id: 'CH-2026-002', title: 'Digital Literacy Gap in Rural Schools', category: 'Smart Education', district: 'Pune', priority: 'Medium', status: 'Matched', date: '2026-09-10', hei: 'Pune University', description: 'Lack of trained teachers for new smart boards.' },
  { id: 'CH-2026-003', title: 'Groundwater Contamination', category: 'Water & Sanitation', district: 'Nashik', priority: 'High', status: 'Prototype', date: '2026-08-22', hei: 'IIT Bombay', description: 'Chemical runoff detected in local borewells.' },
  { id: 'CH-2026-004', title: 'Primary PHC Staffing Shortage', category: 'Health', district: 'Nagpur', priority: 'High', status: 'Testing', date: '2026-08-15', hei: 'AIIMS Nagpur', description: 'Only one doctor available for 3 villages.' },
  { id: 'CH-2026-005', title: 'Crop Yield Drop due to Pests', category: 'Agriculture', district: 'Aurangabad', priority: 'Medium', status: 'Pilot', date: '2026-07-10', hei: 'VNMKV', description: 'Unidentified pest destroying cotton crops.' },
  { id: 'CH-2026-006', title: 'Traffic Congestion at Main Square', category: 'Civic Infrastructure', district: 'Thane', priority: 'Low', status: 'Deployed', date: '2026-05-05', hei: 'VJTI', description: 'Smart traffic light system needed.' },
  { id: 'CH-2026-007', title: 'Waste Management in Slums', category: 'Environment', district: 'Mumbai', priority: 'High', status: 'Testing', date: '2026-08-01', hei: 'TISS', description: 'No daily garbage collection.' },
  { id: 'CH-2026-008', title: 'Lack of Cold Storage', category: 'Agriculture', district: 'Nashik', priority: 'Medium', status: 'Matched', date: '2026-09-01', hei: 'MPKV', description: 'Onions rotting due to lack of facilities.' },
  { id: 'CH-2026-009', title: 'Air Quality Deterioration', category: 'Environment', district: 'Pune', priority: 'High', status: 'Submitted', date: '2026-09-14', hei: 'Unassigned', description: 'AQI crossing 300 regularly.' },
  { id: 'CH-2026-010', title: 'Malnutrition in Tribal Areas', category: 'Health', district: 'Palghar', priority: 'High', status: 'Pilot', date: '2026-06-20', hei: 'NIN', description: 'Severe acute malnutrition rates rising.' }
];

export const mockProjects = [
  { id: 'PRJ-101', title: 'Smart Sub-surface Drainage', stage: 'Testing', district: 'Mumbai', theme: 'Civic Infrastructure', hei: 'IIT Bombay', csr: 'Tata Trusts', lastUpdate: '2026-09-10', stalled: false },
  { id: 'PRJ-102', title: 'AI-assisted Teacher Training', stage: 'Pilot', district: 'Pune', theme: 'Smart Education', hei: 'Pune University', csr: 'Infosys Foundation', lastUpdate: '2026-08-25', stalled: false },
  { id: 'PRJ-103', title: 'Low-cost Water Filtration', stage: 'Prototype', district: 'Nashik', theme: 'Water & Sanitation', hei: 'ICT Mumbai', csr: 'Reliance Foundation', lastUpdate: '2026-07-01', stalled: true },
  { id: 'PRJ-104', title: 'Telemedicine Kiosks', stage: 'Deployed', district: 'Nagpur', theme: 'Health', hei: 'AIIMS Nagpur', csr: 'Piramal Foundation', lastUpdate: '2026-09-05', stalled: false },
  { id: 'PRJ-105', title: 'Drone-based Pest Detection', stage: 'Testing', district: 'Aurangabad', theme: 'Agriculture', hei: 'VNMKV', csr: 'Mahindra', lastUpdate: '2026-09-12', stalled: false },
  { id: 'PRJ-106', title: 'Adaptive Traffic Lights', stage: 'Deployed', district: 'Thane', theme: 'Civic Infrastructure', hei: 'VJTI', csr: 'L&T', lastUpdate: '2026-06-15', stalled: false },
  { id: 'PRJ-107', title: 'Community Biogas Plants', stage: 'Prototype', district: 'Mumbai', theme: 'Environment', hei: 'TISS', csr: 'Godrej', lastUpdate: '2026-08-10', stalled: false },
  { id: 'PRJ-108', title: 'Solar Cold Storage', stage: 'Pilot', district: 'Nashik', theme: 'Agriculture', hei: 'MPKV', csr: 'Bajaj', lastUpdate: '2026-09-08', stalled: false }
];

export const mockInstitutions = [
  { id: 'I-1', name: 'IIT Bombay', type: 'HEI', region: 'Mumbai', solved: 45, timeToDeploy: '8 mos', sparkline: [10, 20, 15, 25, 45] },
  { id: 'I-2', name: 'Pune University', type: 'HEI', region: 'Pune', solved: 32, timeToDeploy: '10 mos', sparkline: [5, 12, 18, 22, 32] },
  { id: 'I-3', name: 'Tata Trusts', type: 'CSR', region: 'Mumbai', funding: '₹12.5 Cr', projectsSupported: 28, sparkline: [10, 15, 20, 25, 28] },
  { id: 'I-4', name: 'AIIMS Nagpur', type: 'HEI', region: 'Nagpur', solved: 18, timeToDeploy: '6 mos', sparkline: [2, 5, 10, 15, 18] },
  { id: 'I-5', name: 'Infosys Foundation', type: 'CSR', region: 'Pune', funding: '₹8.2 Cr', projectsSupported: 15, sparkline: [3, 8, 12, 14, 15] },
  { id: 'I-6', name: 'VJTI', type: 'HEI', region: 'Mumbai', solved: 24, timeToDeploy: '9 mos', sparkline: [5, 10, 15, 20, 24] },
  { id: 'I-7', name: 'Reliance Foundation', type: 'CSR', region: 'Mumbai', funding: '₹15.0 Cr', projectsSupported: 35, sparkline: [10, 15, 25, 30, 35] }
];

export const mockFeedback = [
  { id: 'F-1', rating: 5, district: 'Thane', theme: 'Civic Infrastructure', comment: 'The new traffic lights have reduced my commute by 20 minutes daily!', date: '2026-09-10' },
  { id: 'F-2', rating: 2, district: 'Nagpur', theme: 'Health', comment: 'The telemedicine kiosk is often offline due to power cuts.', date: '2026-09-12' },
  { id: 'F-3', rating: 4, district: 'Pune', theme: 'Smart Education', comment: 'Teachers are much more confident using the digital boards now.', date: '2026-09-08' },
  { id: 'F-4', rating: 1, district: 'Nashik', theme: 'Water & Sanitation', comment: 'The prototype filters broke after one week of use.', date: '2026-09-05' },
  { id: 'F-5', rating: 5, district: 'Aurangabad', theme: 'Agriculture', comment: 'Drone alerts saved 30% of my crop this season.', date: '2026-09-13' }
];

export const mockInsights = [
  { id: 'PI-1', text: 'Water & Sanitation challenges have risen 42% in Nashik over the last quarter.', metric: '+42%', bookmarked: false },
  { id: 'PI-2', text: 'Health sector deployments in Nagpur show the fastest time-to-resolution (avg 6 months).', metric: '6 mos', bookmarked: true },
  { id: 'PI-3', text: 'Education projects in rural Pune are stalling at the Prototype phase at a higher rate than urban areas.', metric: '18% stall rate', bookmarked: false },
  { id: 'PI-4', text: 'Agriculture challenges remain underserved; they account for 20% of submissions but only 8% of active projects.', metric: '-12% gap', bookmarked: false }
];

export const mockNotifications = [
  { id: 'N-1', type: 'System', title: 'Report Export Complete', message: 'Your Q3 Impact Report is ready for download.', read: false, date: '10 mins ago' },
  { id: 'N-2', type: 'Project', title: 'Project Stalled', message: 'Low-cost Water Filtration (PRJ-103) has had no updates for 45 days.', read: false, date: '2 hours ago' },
  { id: 'N-3', type: 'Institution', title: 'New Partner Onboarded', message: 'Wipro Foundation has joined the platform.', read: true, date: '1 day ago' },
  { id: 'N-4', type: 'Challenge', title: 'High Priority Alert', message: 'AQI crossing 300 regularly in Pune requires immediate attention.', read: true, date: '2 days ago' }
];

export const mockGovUsers = [
  { id: 'U-1', name: 'Rajesh Kumar', email: 'rajesh.k@mah.gov.in', role: 'Admin', department: 'Chief Minister Office', lastActive: '2026-09-14' },
  { id: 'U-2', name: 'Priya Sharma', email: 'priya.s@mah.gov.in', role: 'Editor', department: 'Urban Development', lastActive: '2026-09-13' },
  { id: 'U-3', name: 'Amit Patel', email: 'amit.p@mah.gov.in', role: 'View Only', department: 'Agriculture Dept', lastActive: '2026-09-10' }
];

// Recharts data
export const themeDistributionData = [
  { name: 'Civic Infra', value: 35 },
  { name: 'Health', value: 25 },
  { name: 'Education', value: 20 },
  { name: 'Agriculture', value: 15 },
  { name: 'Environment', value: 5 }
];

export const timeSeriesData = [
  { month: 'Jan', submitted: 45, resolved: 12 },
  { month: 'Feb', submitted: 52, resolved: 18 },
  { month: 'Mar', submitted: 61, resolved: 24 },
  { month: 'Apr', submitted: 58, resolved: 30 },
  { month: 'May', submitted: 75, resolved: 42 },
  { month: 'Jun', submitted: 82, resolved: 51 }
];
