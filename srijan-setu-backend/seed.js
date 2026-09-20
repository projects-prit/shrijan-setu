const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables (from .env if running from backend dir)
require('dotenv').config();

// Mongoose Models
const User = require('./src/models/User');
const Organization = require('./src/models/Organization');
const Institution = require('./src/models/Institution');
const Challenge = require('./src/models/Challenge');
const Project = require('./src/models/Project');
const Collaboration = require('./src/models/Collaboration');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/srijan_setu';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Organization.deleteMany({});
    await Institution.deleteMany({});
    await Challenge.deleteMany({});
    await Project.deleteMany({});
    await Collaboration.deleteMany({});
    console.log('Data cleared.');

    // 1. Create Institutions
    console.log('Seeding Institutions...');
    const bitMesra = await Institution.create({
      name: 'BIT Mesra',
      type: 'University',
      region: 'Ranchi',
      expertise_domains: ['Water Resources', 'IoT', 'Infrastructure'],
      verification_status: 'verified'
    });

    const nitJamshedpur = await Institution.create({
      name: 'NIT Jamshedpur',
      type: 'University',
      region: 'Jamshedpur',
      expertise_domains: ['Energy', 'Agriculture', 'Infrastructure'],
      verification_status: 'verified'
    });

    const vbu = await Institution.create({
      name: 'Vinoba Bhave University',
      type: 'University',
      region: 'Hazaribagh',
      expertise_domains: ['Education', 'Healthcare'],
      verification_status: 'verified'
    });

    // 2. Create Organizations
    console.log('Seeding Organizations...');
    const tataSteel = await Organization.create({
      name: 'Tata Steel Foundation',
      sector: 'Infrastructure',
      region: 'Jamshedpur',
      csr_focus_tags: ['Infrastructure', 'Livelihood'],
      verification_status: 'verified'
    });

    const demoCsr = await Organization.create({
      name: 'Demo CSR Foundation',
      sector: 'Technology',
      region: 'Ranchi',
      csr_focus_tags: ['Water', 'Agriculture', 'Digital'],
      verification_status: 'verified'
    });

    // 3. Create Users
    console.log('Seeding Users...');
    const passwordHash = bcrypt.hashSync('password123', 10);

    const admin = await User.create({
      email: 'admin@srijansetu.in',
      password_hash: passwordHash,
      role: 'admin',
      is_email_verified: true
    });

    const citizen1 = await User.create({
      email: 'citizen@srijansetu.in',
      password_hash: passwordHash,
      role: 'citizen',
      profile: { name: 'Ramesh Kumar Oraon', district: 'Khunti', preferred_language: 'Hindi' },
      is_email_verified: true
    });

    const citizen2 = await User.create({
      email: 'sunita@srijansetu.in',
      password_hash: passwordHash,
      role: 'citizen',
      profile: { name: 'Sunita Devi', district: 'Gumla', preferred_language: 'Hindi' },
      is_email_verified: true
    });

    const heiUser = await User.create({
      email: 'hei@srijansetu.in',
      password_hash: passwordHash,
      role: 'hei_coordinator',
      profile: { institution_id: bitMesra._id, department: 'Water Technology', name: 'Dr. Anjali Mishra' },
      is_email_verified: true
    });

    const industryUser = await User.create({
      email: 'industry@srijansetu.in',
      password_hash: passwordHash,
      role: 'industry',
      sub_role: 'org_admin',
      profile: { organization_id: demoCsr._id, name: 'Sanjay Kumar' },
      is_email_verified: true
    });

    const govUser = await User.create({
      email: 'gov@srijansetu.in',
      password_hash: passwordHash,
      role: 'government',
      sub_role: 'gov_admin',
      profile: { department: 'Rural Development', jurisdiction: 'Statewide', name: 'Sh. Vikram Singh' },
      is_email_verified: true
    });

    // 4. Create Challenges
    console.log('Seeding Challenges...');
    const challenge1 = await Challenge.create({
      tracking_id: 'JH-2026-00472',
      submitted_by: citizen1._id,
      title: 'Frequent Hand-Pump Failures Affecting Rural Communities',
      description: 'Over 40% of hand-pumps in Khunti break down during summer. Need predictive maintenance.',
      category: 'Water Resources',
      priority_score: 94,
      location: { type: 'Point', coordinates: [85.27, 22.83] }, // Lng, Lat
      district: 'Khunti',
      status: 'pilot',
      matched_institutions: [{ institution_id: bitMesra._id, match_score: 92 }]
    });

    const challenge2 = await Challenge.create({
      tracking_id: 'JH-2026-00489',
      submitted_by: citizen2._id,
      title: 'Irregular Electricity Supply in Tribal Villages',
      description: 'Frequent power cuts lasting 8-12 hours disrupt education and healthcare.',
      category: 'Infrastructure',
      priority_score: 89,
      location: { type: 'Point', coordinates: [84.54, 23.04] },
      district: 'Gumla',
      status: 'testing',
      matched_institutions: [{ institution_id: nitJamshedpur._id, match_score: 87 }]
    });

    const challenge3 = await Challenge.create({
      tracking_id: 'JH-2026-00523',
      submitted_by: citizen1._id,
      title: 'Dropout Rate in Secondary Schools',
      description: '47% of girls drop out before Class 10 due to distance and sanitation issues.',
      category: 'Education',
      priority_score: 87,
      location: { type: 'Point', coordinates: [87.25, 24.26] },
      district: 'Dumka',
      status: 'submitted',
      matched_institutions: [{ institution_id: vbu._id, match_score: 85 }]
    });

    // 5. Create Projects
    console.log('Seeding Projects...');
    const project1 = await Project.create({
      challenge_id: challenge1._id,
      hei_id: bitMesra._id,
      stage: 'pilot',
      stage_history: [
        { stage: 'prototype', changed_by: heiUser._id, changed_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        { stage: 'testing', changed_by: heiUser._id, changed_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
        { stage: 'pilot', changed_by: heiUser._id, changed_at: new Date() }
      ],
      notes: [{ author: heiUser._id, text: 'IoT sensors installed on 40 hand-pumps.', created_at: new Date() }]
    });

    const project2 = await Project.create({
      challenge_id: challenge2._id,
      hei_id: nitJamshedpur._id,
      stage: 'testing',
      stage_history: [
        { stage: 'prototype', changed_by: heiUser._id, changed_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
        { stage: 'testing', changed_by: heiUser._id, changed_at: new Date() }
      ],
      notes: [{ author: heiUser._id, text: 'Solar micro-grid prototype successfully tested.', created_at: new Date() }]
    });

    // 6. Create Collaborations
    console.log('Seeding Collaborations...');
    await Collaboration.create({
      project_id: project1._id,
      organization_id: demoCsr._id,
      support_type: 'funding',
      status: 'active',
      pledge_amount: 1200000,
      contribution_log: [{ amount: 400000, note: 'Initial tranche for prototype', logged_by: industryUser._id, logged_at: new Date() }]
    });

    await Collaboration.create({
      project_id: project2._id,
      organization_id: tataSteel._id,
      support_type: 'technical',
      status: 'active',
      pledge_amount: 0,
      contribution_log: [{ amount: 0, note: 'Mentorship on power distribution', logged_by: admin._id, logged_at: new Date() }]
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
