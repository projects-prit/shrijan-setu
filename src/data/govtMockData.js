export const initialGlobalStats = {
  totalChallenges: 12450,
  solutionsDeployed: 485,
  activeProjects: 1250,
  fundingMobilized: 45000000, // 4.5 Cr
  citizensImpacted: 1250000 // 12.5 L
};

export const initialChallengesList = [
  {
    id: 'CH-8902',
    title: 'Severe Water Logging in Monsoon',
    district: 'Mumbai Suburban',
    category: 'Civic Infrastructure',
    stage: 'Deployed',
    dateSubmitted: '2025-06-12',
    heiAssigned: 'VJTI Mumbai',
    industryPartner: 'L&T CSR',
    impact: 50000
  },
  {
    id: 'CH-9104',
    title: 'Crop Yield Prediction needed for unseasonal rain',
    district: 'Nashik',
    category: 'Agriculture',
    stage: 'Pilot',
    dateSubmitted: '2026-01-05',
    heiAssigned: 'MPKV Pune',
    industryPartner: 'Mahindra Tech',
    impact: 15000
  },
  {
    id: 'CH-9211',
    title: 'Digital Literacy for Tribal Women',
    district: 'Palghar',
    category: 'Smart Education',
    stage: 'Testing',
    dateSubmitted: '2026-03-20',
    heiAssigned: 'Mumbai University',
    industryPartner: 'TCS Foundation',
    impact: 8000
  },
  {
    id: 'CH-9400',
    title: 'Smart Traffic Management at key junctions',
    district: 'Pune',
    category: 'Smart Mobility',
    stage: 'Prototype',
    dateSubmitted: '2026-07-10',
    heiAssigned: 'COEP Pune',
    industryPartner: 'Pending',
    impact: 120000
  },
  {
    id: 'CH-9502',
    title: 'Solid Waste Segregation Automation',
    district: 'Nagpur',
    category: 'Environment',
    stage: 'Open',
    dateSubmitted: '2026-09-01',
    heiAssigned: 'Pending',
    industryPartner: 'Pending',
    impact: 0
  }
];

export const districtData = [
  { name: 'Mumbai', challenges: 1200, solved: 150, funding: 12000000 },
  { name: 'Pune', challenges: 950, solved: 85, funding: 8500000 },
  { name: 'Nashik', challenges: 450, solved: 40, funding: 3000000 },
  { name: 'Nagpur', challenges: 600, solved: 60, funding: 4500000 },
  { name: 'Thane', challenges: 800, solved: 95, funding: 7000000 },
  { name: 'Aurangabad', challenges: 300, solved: 25, funding: 1500000 },
];

export const themeData = [
  { name: 'Civic Infrastructure', value: 35 },
  { name: 'Smart Education', value: 25 },
  { name: 'Agriculture', value: 20 },
  { name: 'Environment', value: 15 },
  { name: 'Smart Mobility', value: 5 },
];

export const topHEIs = [
  { rank: 1, name: 'IIT Bombay', activeProjects: 45, deployed: 12, impact: '1.2L' },
  { rank: 2, name: 'COEP Pune', activeProjects: 38, deployed: 9, impact: '85K' },
  { rank: 3, name: 'VJTI Mumbai', activeProjects: 25, deployed: 7, impact: '60K' },
  { rank: 4, name: 'ICT Mumbai', activeProjects: 20, deployed: 5, impact: '45K' },
];

export const topIndustries = [
  { rank: 1, name: 'Reliance Foundation', funds: '₹1.2 Cr', projects: 15 },
  { rank: 2, name: 'TCS Foundation', funds: '₹85 L', projects: 12 },
  { rank: 3, name: 'Mahindra CSR', funds: '₹60 L', projects: 8 },
  { rank: 4, name: 'L&T Public Charitable Trust', funds: '₹45 L', projects: 6 },
];

export const initialGovtProfile = {
  departmentName: 'Ministry of Innovation',
  region: 'Maharashtra State',
  contactEmail: 'admin@innovation.mah.gov.in',
  phone: '+91-22-22020202',
  notificationsEnabled: true,
  language: 'English'
};
