// ========== Fallback job data (used when API is not available) ==========
const fallbackJobs = [
    { id: 1, title: "Full-Stack Web Developer", company: "TechCorp Inc.", location: "Remote", type: "Full-time", salary: "$50-70/hr", posted_date: "2 days ago", description: "Looking for an experienced full-stack developer to build a modern e-commerce platform.", tags: ["React", "Node.js", "MongoDB"], logo_color: "blue", logo_text: "TC" },
    { id: 2, title: "UI/UX Designer for Mobile App", company: "InnoDesign Studio", location: "Remote", type: "Project-based", salary: "$2,500 (Fixed)", posted_date: "3 days ago", description: "We need a talented UI/UX designer to redesign our existing mobile app.", tags: ["Figma", "UI Design", "Mobile App"], logo_color: "purple", logo_text: "ID" },
    { id: 3, title: "Content Writer for Tech Blog", company: "TechTrends Media", location: "Remote", type: "Part-time", salary: "$25-35/hr", posted_date: "1 day ago", description: "We're looking for a tech-savvy content writer to create engaging blog posts.", tags: ["Content Writing", "SEO", "Tech Knowledge"], logo_color: "green", logo_text: "TT" },
    { id: 4, title: "Video Editor for YouTube Channel", company: "VisualCraft Studios", location: "Remote", type: "Part-time", salary: "$30-45/hr", posted_date: "4 days ago", description: "Seeking a creative video editor to produce engaging content for our YouTube channel.", tags: ["Adobe Premiere", "After Effects", "Motion Graphics"], logo_color: "red", logo_text: "VC" },
    { id: 5, title: "Senior Data Scientist", company: "DataInsights", location: "New York, NY", type: "Full-time", salary: "$120k-150k/yr", posted_date: "5 days ago", description: "Join our data science team to build predictive models and analyze large datasets.", tags: ["Python", "Machine Learning", "SQL"], logo_color: "yellow", logo_text: "DI" },
    { id: 6, title: "DevOps Engineer", company: "CloudSystems", location: "San Francisco, CA", type: "Contract", salary: "$80-100/hr", posted_date: "1 week ago", description: "We need a DevOps engineer to optimize our CI/CD pipelines and manage cloud infrastructure.", tags: ["AWS", "Docker", "Kubernetes"], logo_color: "indigo", logo_text: "CS" }
];

// ========== Mobile menu toggle ==========
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ========== User menu toggle ==========
const userMenuButton = document.getElementById('user-menu-button');
const userMenu = userMenuButton ? userMenuButton.nextElementSibling : null;
if (userMenuButton && userMenu) {
    userMenuButton.addEventListener('click', () => {
        userMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (event) => {
        if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
    });
}

// ========== Apply to job handler ==========
function applyToJob(jobId, jobTitle, companyName) {
    // Show a confirmation modal/alert
    const confirmed = confirm(`Apply for "${jobTitle}" at ${companyName}?\n\nClick OK to proceed to the contact page.`);
    if (confirmed) {
        window.location.href = `contact.html?subject=Application for: ${encodeURIComponent(jobTitle)} at ${encodeURIComponent(companyName)}`;
    }
}

// ========== Job card HTML generator ==========
function createJobCard(job) {
    const tagsHtml = (job.tags || []).map(tag =>
        `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">${tag}</span>`
    ).join('');

    const colors = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        purple: 'bg-purple-100 text-purple-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        indigo: 'bg-indigo-100 text-indigo-800',
        gray: 'bg-gray-100 text-gray-800'
    };
    const logoColorClass = colors[job.logo_color] || colors.gray;

    // Escape quotes for onclick attribute
    const safeTitle = (job.title || '').replace(/'/g, "\\'");
    const safeCompany = (job.company || '').replace(/'/g, "\\'");

    return `
        <div class="job-card bg-white shadow-sm rounded-lg overflow-hidden transition-all duration-300 card-hover">
            <div class="p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium text-gray-900">${job.title}</h3>
                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ${job.salary}
                    </span>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    ${job.type} &bull; ${job.posted_date}
                </div>
                <p class="mt-3 text-base text-gray-500">${job.description}</p>
                <div class="mt-4">
                    <div class="flex flex-wrap gap-2">${tagsHtml}</div>
                </div>
            </div>
            <div class="border-t border-gray-200 bg-gray-50 px-6 py-3 flex justify-between items-center">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full ${logoColorClass} flex items-center justify-center">
                            <span class="font-medium">${job.logo_text}</span>
                        </div>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">${job.company}</p>
                        <p class="text-sm text-gray-500">${job.location}</p>
                    </div>
                </div>
                <button onclick="applyToJob(${job.id}, '${safeTitle}', '${safeCompany}')" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                    Apply Now
                </button>
            </div>
        </div>
    `;
}

// ========== Fetch and render jobs (with fallback) ==========
async function fetchAndRenderJobs() {
    const jobListingsContainer = document.getElementById('job-listings');
    if (!jobListingsContainer) return;

    let jobs = fallbackJobs;

    try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
            jobs = await response.json();
        }
    } catch (error) {
        console.log('API not available, using fallback job data.');
    }

    jobListingsContainer.innerHTML = '';

    if (jobs.length === 0) {
        jobListingsContainer.innerHTML = `
            <div class="col-span-full text-center py-16">
                <svg class="mx-auto h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p class="mt-4 text-gray-500">No jobs found. Check back soon!</p>
            </div>`;
        return;
    }

    jobs.forEach((job, index) => {
        const card = createJobCard(job);
        const delay = index * 0.2; // 200ms stagger
        const wrapper = `<div class="animate-slide-up" style="animation-delay: ${delay}s; opacity: 0;">${card}</div>`;
        jobListingsContainer.innerHTML += wrapper;
    });
}

// Initial fetch on page load
document.addEventListener('DOMContentLoaded', fetchAndRenderJobs);

// ========== Search functionality ==========
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const jobListings = document.getElementById('job-listings');

if (searchButton && searchInput && jobListings) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    // Also search on input (live filter)
    searchInput.addEventListener('input', performSearch);
}

function performSearch() {
    if (!searchInput || !jobListings) return;
    const searchTerm = searchInput.value.toLowerCase().trim();
    const jobCards = jobListings.getElementsByClassName('job-card');

    if (searchTerm === '') {
        // Show all cards
        Array.from(jobCards).forEach(card => card.style.display = '');
        return;
    }

    Array.from(jobCards).forEach(card => {
        const title = (card.querySelector('h3') || {}).innerText || '';
        const companyEl = card.querySelector('.ml-3 p.text-gray-900');
        const company = companyEl ? companyEl.innerText : '';
        const tags = Array.from(card.querySelectorAll('.bg-indigo-100')).map(t => t.innerText).join(' ');
        const combinedText = `${title} ${company} ${tags}`.toLowerCase();

        card.style.display = combinedText.includes(searchTerm) ? '' : 'none';
    });
}

// ========== Popular tag click handlers ==========
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.popular-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const searchTerm = tag.getAttribute('data-search');
            if (searchInput) {
                searchInput.value = searchTerm;
                // Scroll to jobs section
                const jobSection = document.getElementById('find-jobs');
                if (jobSection) {
                    jobSection.scrollIntoView({ behavior: 'smooth' });
                }
                // Wait for scroll, then filter
                setTimeout(performSearch, 400);
            }
        });
    });
});

// ========== Chat widget toggle ==========
const chatBubble = document.getElementById('chat-bubble');
const chatWidget = document.getElementById('chat-widget');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const chatTyping = document.getElementById('chat-typing');
const chatSuggestions = document.getElementById('chat-suggestions');

if (chatBubble && chatWidget) {
    chatBubble.addEventListener('click', () => {
        chatWidget.classList.toggle('hidden');
        if (!chatWidget.classList.contains('hidden') && chatInput) {
            setTimeout(() => chatInput.focus(), 300);
        }
    });
}

if (chatClose && chatWidget) {
    chatClose.addEventListener('click', () => {
        chatWidget.classList.add('hidden');
    });
}

// ========== Intelligent Chatbot Engine ==========

// Client-side fallback intents (used when server is unavailable)
const clientIntents = [
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
        keywords: ['job', 'jobs', 'work', 'find work', 'find job', 'opportunities', 'openings', 'career', 'gig', 'gigs', 'freelance work'],
        responses: [
            "🔍 We have hundreds of jobs across Web Development, Design, Mobile, Data Science and more! <a href='#find-jobs' class='chatbot-link'>Browse Latest Jobs</a>",
            "Looking for your next gig? Use our search bar to filter by skill, or check out the <a href='#find-jobs' class='chatbot-link'>Jobs section</a> for the latest openings!"
        ],
        suggestions: ["Web Dev Jobs", "Design Jobs", "Post a Job"]
    },
    {
        name: 'hiring',
        keywords: ['hire', 'hiring', 'recruit', 'post job', 'post a job', 'need developer', 'need designer', 'find talent'],
        responses: [
            "🎯 Ready to find amazing talent? <a href='post-job.html' class='chatbot-link'>Post a Job</a> and connect with skilled freelancers in minutes!",
            "Hiring is easy on SkillMatch! Just <a href='post-job.html' class='chatbot-link'>post your project</a>, review proposals, and pick the perfect freelancer."
        ],
        suggestions: ["Post a Job", "Find Freelancers", "How it Works"]
    },
    {
        name: 'freelancers',
        keywords: ['freelancer', 'freelancers', 'developer', 'designer', 'writer', 'talent', 'expert', 'professional'],
        responses: [
            "🌟 We have top-rated freelancers in development, design, writing, data science and more. <a href='find-freelancers.html' class='chatbot-link'>Browse Freelancers</a>",
            "Our freelancers are hand-vetted professionals. Check out <a href='find-freelancers.html' class='chatbot-link'>our talent pool</a> to find your perfect match!"
        ],
        suggestions: ["View All Freelancers", "Post a Job", "Contact Us"]
    },
    {
        name: 'pricing',
        keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'rates', 'budget', 'money', 'pay', 'payment', 'salary', 'hourly'],
        responses: [
            "💰 Pricing on SkillMatch is flexible! Freelancers set their own rates — you'll see hourly rates or fixed prices on each listing. No hidden fees for posting jobs.",
            "SkillMatch is free to browse! You only pay when you hire. Each job listing shows the freelancer's rate so there are no surprises."
        ],
        suggestions: ["Post a Job", "Find Jobs", "Contact Us"]
    },
    {
        name: 'how_it_works',
        keywords: ['how', 'how it works', 'process', 'steps', 'start', 'getting started', 'begin', 'new here', 'explain', 'guide'],
        responses: [
            "📋 It's simple! 1️⃣ Post a job or search for gigs → 2️⃣ Connect with freelancers → 3️⃣ Complete your project. <a href='#how-it-works' class='chatbot-link'>Learn More</a>",
            "Getting started is easy: Browse jobs, create your profile, and start connecting! Check the <a href='#how-it-works' class='chatbot-link'>How It Works</a> section for the full guide."
        ],
        suggestions: ["Find Jobs", "Post a Job", "Find Freelancers"]
    },
    {
        name: 'support',
        keywords: ['support', 'help', 'contact', 'issue', 'problem', 'bug', 'error', 'complaint', 'feedback', 'question'],
        responses: [
            "📞 Our support team is here to help! Visit our <a href='contact.html' class='chatbot-link'>Contact page</a> to send us a message.",
            "Need assistance? Head to our <a href='contact.html' class='chatbot-link'>Contact page</a> and we'll get back to you within 24 hours!"
        ],
        suggestions: ["Contact Us", "About Us", "Find Jobs"]
    },
    {
        name: 'thanks',
        keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'awesome', 'great', 'perfect', 'cool', 'nice'],
        responses: [
            "You're welcome! 😊 Let me know if there's anything else I can help with.",
            "Happy to help! 🙌 Don't hesitate to ask if you need anything else."
        ],
        suggestions: ["Find Jobs", "Find Freelancers", "That's all!"]
    },
    {
        name: 'farewell',
        keywords: ['bye', 'goodbye', 'see you', 'later', 'quit', 'exit', 'close', "that's all", 'done', 'nothing'],
        responses: [
            "Goodbye! 👋 Come back anytime — I'm always here to help.",
            "See you later! 🚀 Good luck with your project!"
        ],
        suggestions: ["Find Jobs", "Post a Job"]
    }
];

const fallbackReplies = [
    "I'm not sure I understood that. Could you rephrase? I can help with finding jobs, hiring freelancers, pricing, and more!",
    "Hmm, I didn't quite get that. Try asking about jobs, freelancers, pricing, or how SkillMatch works!",
    "I'm still learning! Try asking me about finding jobs, hiring talent, or how the platform works."
];

function getTimeString() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addMessage(content, isUser) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'chat-msg-user' : 'chat-msg-bot'}`;
    msgDiv.innerHTML = `
        <div class="chat-msg-bubble ${isUser ? '' : 'chat-msg-bot-bubble'}">${content}</div>
        <span class="chat-msg-time">${getTimeString()}</span>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    if (chatTyping) chatTyping.classList.remove('hidden');
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    if (chatTyping) chatTyping.classList.add('hidden');
}

function updateSuggestions(suggestions) {
    if (!chatSuggestions) return;
    chatSuggestions.innerHTML = '';
    (suggestions || []).forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'chat-chip';
        btn.setAttribute('data-msg', text);
        btn.textContent = text;
        btn.addEventListener('click', () => handleChatInput(text));
        chatSuggestions.appendChild(btn);
    });
}

function clientSideReply(message) {
    const msg = message.toLowerCase().trim();
    let matchedIntent = null;
    let bestScore = 0;

    for (const intent of clientIntents) {
        let score = 0;
        for (const keyword of intent.keywords) {
            if (msg.includes(keyword)) {
                score += keyword.split(' ').length;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            matchedIntent = intent;
        }
    }

    if (matchedIntent && bestScore > 0) {
        return {
            reply: matchedIntent.responses[Math.floor(Math.random() * matchedIntent.responses.length)],
            suggestions: matchedIntent.suggestions
        };
    }
    return {
        reply: fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)],
        suggestions: ["Find Jobs", "Post a Job", "Find Freelancers", "Contact Us"]
    };
}

async function getBotReply(message) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        // Server unavailable, use client fallback
    }
    return clientSideReply(message);
}

async function handleChatInput(text) {
    const message = text || (chatInput ? chatInput.value.trim() : '');
    if (!message) return;

    // Add user message
    addMessage(escapeHtml(message), true);
    if (chatInput) chatInput.value = '';

    // Show typing indicator
    showTyping();

    // Get bot reply (server or client fallback)
    const { reply, suggestions } = await getBotReply(message);

    // Simulate realistic typing delay (600-1200ms)
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
        hideTyping();
        addMessage(reply, false);
        updateSuggestions(suggestions);
    }, delay);
}

// Wire up send button and enter key
if (chatSend) {
    chatSend.addEventListener('click', () => handleChatInput());
}
if (chatInput) {
    chatInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleChatInput();
    });
}

// Wire up initial suggestion chips
document.addEventListener('DOMContentLoaded', () => {
    if (chatSuggestions) {
        chatSuggestions.querySelectorAll('.chat-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                handleChatInput(chip.getAttribute('data-msg'));
            });
        });
    }
});

// ========== Smooth scrolling for anchor links ==========
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip plain # links
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
