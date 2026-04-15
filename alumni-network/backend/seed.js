const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User.model');
const Job = require('./src/models/Job.model');
const Event = require('./src/models/Event.model');

const seedDB = async () => {
    try {
        console.log('Connecting to Database inside container...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://admin:secret@mongo:27017/alumni_db?authSource=admin');
        console.log('Connected to cluster.');

        console.log('Purging existing datastore mappings...');
        await User.deleteMany({});
        await Job.deleteMany({});
        await Event.deleteMany({});

        console.log('Generating seed tree arrays...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // 1. Create Users
        const admin = new User({
            name: 'System Admin',
            email: 'admin@alumninet.com',
            password: hashedPassword,
            role: 'admin',
            graduationYear: 2020,
            branch: 'CSE',
            currentCompany: 'AlumniNet Tech',
            currentRole: 'Superuser Matrix'
        });

        const alumni1 = new User({
            name: 'Jane Doe',
            email: 'jane@google.com',
            password: hashedPassword,
            role: 'alumni',
            graduationYear: 2018,
            branch: 'IT',
            currentCompany: 'Google',
            currentRole: 'Senior SWE',
            location: 'Mountain View, CA',
            skills: ['React', 'Node.js', 'Kubernetes', 'AWS', 'System Design']
        });

        const alumni2 = new User({
            name: 'Alex Johnson',
            email: 'alex@microsoft.com',
            password: hashedPassword,
            role: 'alumni',
            graduationYear: 2016,
            branch: 'CSE',
            currentCompany: 'Microsoft',
            currentRole: 'Cloud Architect',
            location: 'Seattle, WA',
            skills: ['Azure', 'C#', 'SQL', 'Docker', 'Distributed Systems']
        });

        const alumni3 = new User({
            name: 'Priya Sharma',
            email: 'priya@startup.io',
            password: hashedPassword,
            role: 'alumni',
            graduationYear: 2021,
            branch: 'ECE',
            currentCompany: 'FastTrade Startup',
            currentRole: 'Full Stack Engineer',
            location: 'Bangalore, India',
            skills: ['Next.js', 'GraphQL', 'MongoDB', 'Tailwind', 'WebSockets']
        });

        const student = new User({
            name: 'John Smith',
            email: 'john@student.com',
            password: hashedPassword,
            role: 'student',
            graduationYear: 2025,
            branch: 'IT',
            skills: ['Python', 'DSA', 'C++']
        });

        await admin.save();
        await alumni1.save();
        await alumni2.save();
        await alumni3.save();
        await student.save();
        console.log('✅ Users populated');

        // 2. Create Jobs
        const job1 = new Job({
            title: 'Frontend Engineer',
            company: 'Google',
            location: 'Remote',
            type: 'Full-time',
            description: 'We are looking for a skilled Frontend Engineer to join our core Search team.',
            requirements: ['3+ years experience with React', 'Strong JavaScript fundamentals'],
            salaryRange: { min: 120000, max: 180000 },
            postedBy: alumni1._id,
            status: 'open'
        });

        const job2 = new Job({
            title: 'SDE Intern (Summer)',
            company: 'Microsoft',
            location: 'Seattle, WA',
            type: 'Internship',
            description: 'Join the Azure Networking team for the summer! Great opportunity for upcoming grads.',
            requirements: ['Strong DSA skills', 'Familiarity with Cloud Concepts'],
            postedBy: alumni2._id,
            status: 'open'
        });

        const job3 = new Job({
            title: 'Backend Node.js Developer',
            company: 'FastTrade Startup',
            location: 'Bangalore, India',
            type: 'Full-time',
            description: 'Exciting early-stage crypto startup looking for robust API engineers.',
            requirements: ['Node.js expertise', 'MongoDB experience'],
            postedBy: alumni3._id,
            status: 'open'
        });

        await job1.save();
        await job2.save();
        await job3.save();
        console.log('✅ Jobs populated');

        // 3. Create Events
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 15);

        const soonDate = new Date();
        soonDate.setDate(soonDate.getDate() + 5);

        const event1 = new Event({
            title: 'Navigating Big Tech Interviews',
            description: 'Join Jane and Alex as they discuss how to crack system design and DSA rounds at FAANG companies.',
            date: futureDate,
            time: '18:00',
            venue: 'Google Meet',
            onlineLink: 'https://meet.google.com/xyz',
            type: 'Online',
            maxAttendees: 150,
            organizer: alumni1._id
        });

        const event2 = new Event({
            title: 'Annual Alumni Meetup 2026',
            description: 'The biggest networking event of the year!',
            date: soonDate,
            time: '19:00',
            venue: 'Grand Plaza Hotel',
            type: 'Offline',
            maxAttendees: 500,
            organizer: admin._id
        });

        await event1.save();
        await event2.save();
        console.log('✅ Events populated');

        console.log('\n=======================================');
        console.log('🚀 Database Fully Enriched!');
        console.log('=======================================\n');
        process.exit(0);
    } catch (err) {
        console.error('Seeding Exception Handled:', err);
        process.exit(1);
    }
};

seedDB();
