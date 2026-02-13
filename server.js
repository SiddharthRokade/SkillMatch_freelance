const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // Serve HTML, CSS, JS
app.use(express.json());

// Get jobs from JSON
app.get('/api/jobs', (req, res) => {
    const jobs = JSON.parse(fs.readFileSync('jobs.json', 'utf8'));
    res.json(jobs);
});

// Add new job to JSON
app.post('/api/jobs', (req, res) => {
    const jobs = JSON.parse(fs.readFileSync('jobs.json', 'utf8'));
    const newJob = req.body;

    // Server-side ID generation
    const maxId = jobs.reduce((max, job) => (job.id > max ? job.id : max), 0);
    newJob.id = maxId + 1;
    newJob.posted_date = "Just now"; // Ensure consistent date format on server if needed, or keep client's

    jobs.push(newJob);
    fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
    res.status(201).json({ message: 'Job added successfully', job: newJob });
});

// Get all freelancers
app.get('/api/freelancers', (req, res) => {
    const freelancers = JSON.parse(fs.readFileSync('freelancers.json', 'utf8'));
    res.json(freelancers);
});

// Get single freelancer by ID
app.get('/api/freelancers/:id', (req, res) => {
    const freelancers = JSON.parse(fs.readFileSync('freelancers.json', 'utf8'));
    const freelancer = freelancers.find(f => f.id === parseInt(req.params.id));
    if (freelancer) {
        res.json(freelancer);
    } else {
        res.status(404).json({ message: 'Freelancer not found' });
    }
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Save to messages.json
    let messages = [];
    if (fs.existsSync('messages.json')) {
        try {
            messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
        } catch (e) {
            console.error("Error reading messages.json", e);
            messages = [];
        }
    }

    const newMessage = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
    };

    messages.push(newMessage);
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));

    console.log('📧 New contact form submission saved.');
    res.status(200).json({ message: 'Message sent successfully' });
});

// ── Chat API endpoint ───────────────────────────────────────
const chatIntents = [
    {
        name: 'greeting',
        keywords: ['hello', 'hi', 'hey', 'hola', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'yo', 'greetings'],
        responses: [
            "Hey there! 👋 Welcome to SkillMatch. How can I help you today?",
            "Hi! 😊 I'm here to help you find the perfect freelance match. What are you looking for?",
            "Hello! Great to see you. Are you looking to hire talent or find work?"
        ],
        suggestions: ["Find Jobs", "Hire Freelancers", "How it Works"]
    },
    {
        name: 'find_jobs',
        keywords: ['job', 'jobs', 'work', 'find work', 'find job', 'opportunities', 'openings', 'vacancy', 'vacancies', 'career', 'employ', 'gig', 'gigs', 'freelance work'],
        responses: [
            "🔍 We have hundreds of jobs across Web Development, Design, Mobile, Data Science and more! <a href='#find-jobs' class='chatbot-link'>Browse Latest Jobs</a>",
            "Looking for your next gig? Use our search bar to filter by skill, or check out the <a href='#find-jobs' class='chatbot-link'>Jobs section</a> for the latest openings!",
            "Great news — new jobs are posted daily! Check the <a href='#find-jobs' class='chatbot-link'>Latest Jobs</a> section, or search by skill to find your perfect match."
        ],
        suggestions: ["Web Dev Jobs", "Design Jobs", "Post a Job"]
    },
    {
        name: 'hiring',
        keywords: ['hire', 'hiring', 'recruit', 'post job', 'post a job', 'looking for freelancer', 'need developer', 'need designer', 'find talent', 'talent'],
        responses: [
            "🎯 Ready to find amazing talent? <a href='post-job.html' class='chatbot-link'>Post a Job</a> and connect with skilled freelancers in minutes!",
            "Hiring is easy on SkillMatch! Just <a href='post-job.html' class='chatbot-link'>post your project</a>, review proposals, and pick the perfect freelancer.",
            "Looking to hire? Start by <a href='post-job.html' class='chatbot-link'>creating a job listing</a> — our top freelancers will apply within hours!"
        ],
        suggestions: ["Post a Job", "Find Freelancers", "How it Works"]
    },
    {
        name: 'freelancers',
        keywords: ['freelancer', 'freelancers', 'developer', 'designer', 'writer', 'talent', 'expert', 'professional', 'specialist', 'contractor'],
        responses: [
            "🌟 We have top-rated freelancers in development, design, writing, data science and more. <a href='find-freelancers.html' class='chatbot-link'>Browse Freelancers</a>",
            "Our freelancers are hand-vetted professionals. Check out <a href='find-freelancers.html' class='chatbot-link'>our talent pool</a> to find your perfect match!",
            "From React developers to UI designers — we've got the talent you need. <a href='find-freelancers.html' class='chatbot-link'>Explore Freelancers →</a>"
        ],
        suggestions: ["View All Freelancers", "Post a Job", "Contact Us"]
    },
    {
        name: 'pricing',
        keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'fees', 'charge', 'rate', 'rates', 'budget', 'money', 'pay', 'payment', 'salary', 'hourly'],
        responses: [
            "💰 Pricing on SkillMatch is flexible! Freelancers set their own rates — you'll see hourly rates or fixed prices on each listing. No hidden fees for posting jobs.",
            "Our freelancers offer competitive rates. Full-stack developers range $50-100/hr, designers $40-80/hr, and writers $25-50/hr. Set your budget when posting a job!",
            "SkillMatch is free to browse! You only pay when you hire. Each job listing shows the freelancer's rate so there are no surprises."
        ],
        suggestions: ["Post a Job", "Find Jobs", "Contact Us"]
    },
    {
        name: 'how_it_works',
        keywords: ['how', 'how it works', 'process', 'steps', 'start', 'getting started', 'begin', 'new here', 'explain', 'guide', 'tutorial', 'help me understand'],
        responses: [
            "📋 It's simple! 1️⃣ Post a job or search for gigs → 2️⃣ Connect with freelancers → 3️⃣ Complete your project. <a href='#how-it-works' class='chatbot-link'>Learn More</a>",
            "Getting started is easy: Browse jobs, create your profile, and start connecting! Check the <a href='#how-it-works' class='chatbot-link'>How It Works</a> section for the full guide.",
            "Here's the flow: Post your project → Review proposals from freelancers → Hire the best match → Get your project done. <a href='#how-it-works' class='chatbot-link'>See Details →</a>"
        ],
        suggestions: ["Find Jobs", "Post a Job", "Find Freelancers"]
    },
    {
        name: 'account',
        keywords: ['account', 'sign up', 'register', 'login', 'log in', 'sign in', 'profile', 'password', 'settings', 'my account'],
        responses: [
            "👤 You can manage your profile and settings from the user menu at the top-right corner. Click your avatar to access your profile!",
            "Need help with your account? You can update your profile settings or <a href='contact.html' class='chatbot-link'>contact our support team</a> for assistance."
        ],
        suggestions: ["Contact Support", "Find Jobs", "How it Works"]
    },
    {
        name: 'support',
        keywords: ['support', 'help', 'contact', 'issue', 'problem', 'bug', 'error', 'complaint', 'feedback', 'question', 'assist'],
        responses: [
            "📞 Our support team is here to help! Visit our <a href='contact.html' class='chatbot-link'>Contact page</a> to send us a message, or email us directly.",
            "Need assistance? Head to our <a href='contact.html' class='chatbot-link'>Contact page</a> and we'll get back to you within 24 hours!",
            "I'm sorry you're having trouble! Please reach out through our <a href='contact.html' class='chatbot-link'>Contact form</a> and our team will help resolve it."
        ],
        suggestions: ["Contact Us", "About Us", "Find Jobs"]
    },
    {
        name: 'thanks',
        keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'awesome', 'great', 'perfect', 'cool', 'nice', 'wonderful'],
        responses: [
            "You're welcome! 😊 Let me know if there's anything else I can help with.",
            "Happy to help! 🙌 Don't hesitate to ask if you need anything else.",
            "Glad I could assist! Is there anything else you'd like to know about SkillMatch?"
        ],
        suggestions: ["Find Jobs", "Find Freelancers", "That's all!"]
    },
    {
        name: 'farewell',
        keywords: ['bye', 'goodbye', 'see you', 'later', 'quit', 'exit', 'close', "that's all", 'done', 'nothing'],
        responses: [
            "Goodbye! 👋 Come back anytime — I'm always here to help.",
            "See you later! 🚀 Good luck with your project!",
            "Take care! Feel free to chat anytime you need help. 😊"
        ],
        suggestions: ["Find Jobs", "Post a Job"]
    }
];

const fallbackResponses = [
    "I'm not sure I understood that. Could you rephrase? I can help with finding jobs, hiring freelancers, pricing, and more!",
    "Hmm, I didn't quite get that. Try asking about jobs, freelancers, pricing, or how SkillMatch works!",
    "I'm still learning! Try asking me about finding jobs, hiring talent, or how the platform works."
];

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    const msg = message.toLowerCase().trim();

    // Find matching intent
    let matchedIntent = null;
    let bestScore = 0;

    for (const intent of chatIntents) {
        let score = 0;
        for (const keyword of intent.keywords) {
            if (msg.includes(keyword)) {
                score += keyword.split(' ').length; // Multi-word keywords score higher
            }
        }
        if (score > bestScore) {
            bestScore = score;
            matchedIntent = intent;
        }
    }

    let reply, suggestions;
    if (matchedIntent && bestScore > 0) {
        reply = matchedIntent.responses[Math.floor(Math.random() * matchedIntent.responses.length)];
        suggestions = matchedIntent.suggestions;
    } else {
        reply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        suggestions = ["Find Jobs", "Post a Job", "Find Freelancers", "Contact Us"];
    }

    res.json({ reply, suggestions });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
