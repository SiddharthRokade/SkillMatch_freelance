const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Colors for console output
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m"
};

const icons = {
    pass: '✅',
    fail: '❌',
    warn: '⚠️',
    info: 'ℹ️'
};

const REQUIRED_FILES = [
    'server.js',
    'index.html',
    'about.html',
    'contact.html',
    'find-freelancers.html',
    'freelancer-profile.html',
    'post-job.html',
    'style.css',
    'script.js',
    'jobs.json',
    'freelancers.json',
    'README.md'
];

let errorCount = 0;
let warningCount = 0;

console.log(`\n${colors.cyan}${colors.bold}SkillMatch Project Verification${colors.reset}\n`);

// 1. Check for Required Files
console.log(`${colors.blue}1. Checking for Required Files...${colors.reset}`);
REQUIRED_FILES.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ${icons.pass} ${file} exists.`);
    } else {
        console.error(`  ${icons.fail} ${colors.red}${file} is MISSING!${colors.reset}`);
        errorCount++;
    }
});

// 2. Validate JSON Files
console.log(`\n${colors.blue}2. Validating JSON Data...${colors.reset}`);
['jobs.json', 'freelancers.json'].forEach(file => {
    if (fs.existsSync(file)) {
        try {
            const data = fs.readFileSync(file, 'utf8');
            JSON.parse(data);
            console.log(`  ${icons.pass} ${file} is valid JSON.`);
        } catch (e) {
            console.error(`  ${icons.fail} ${colors.red}${file} has Invalid JSON: ${e.message}${colors.reset}`);
            errorCount++;
        }
    } else {
        console.warn(`  ${icons.warn} ${colors.yellow}Skipping ${file} validation (file missing).${colors.reset}`);
    }
});

// 3. Check for Node Environment
console.log(`\n${colors.blue}3. Checking Node.js Environment...${colors.reset}`);

if (fs.existsSync('package.json')) {
    console.log(`  ${icons.pass} package.json exists.`);

    // Check if express is in dependencies
    try {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        if (pkg.dependencies && pkg.dependencies.express) {
            console.log(`  ${icons.pass} express dependency listed.`);
        } else {
            console.warn(`  ${icons.warn} ${colors.yellow}express is missing from dependencies in package.json.${colors.reset}`);
            warningCount++;
        }
    } catch (e) {
        console.error(`  ${icons.fail} ${colors.red}Error parsing package.json: ${e.message}${colors.reset}`);
        errorCount++;
    }

} else {
    console.warn(`  ${icons.warn} ${colors.yellow}package.json is missing.${colors.reset}`);
    warningCount++;
}

if (fs.existsSync('node_modules')) {
    console.log(`  ${icons.pass} node_modules exists.`);
} else {
    console.warn(`  ${icons.warn} ${colors.yellow}node_modules is missing. You may need to run 'npm install'.${colors.reset}`);
    warningCount++;
}

// 4. Basic Link Validation in HTML
console.log(`\n${colors.blue}4. Check HTML Links (CSS/JS)...${colors.reset}`);
const htmlFiles = REQUIRED_FILES.filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const hasCss = content.includes('href="style.css"') || content.includes("href='style.css'");
        const hasJs = content.includes('src="script.js"') || content.includes("src='script.js'");

        if (hasCss) {
            console.log(`  ${icons.pass} ${file} links to style.css`);
        } else {
            console.warn(`  ${icons.warn} ${colors.yellow}${file} missing link to style.css${colors.reset}`);
            warningCount++;
        }

        if (hasJs) {
            console.log(`  ${icons.pass} ${file} links to script.js`);
        } else {
            // Not strictly error for all pages, but good to note
            // console.log(`  ${icons.info} ${file} no local script.js link`); 
        }
    }
});


console.log(`\n${colors.cyan}${colors.bold}Verification Complete.${colors.reset}`);
if (errorCount > 0) {
    console.log(`${colors.red}Found ${errorCount} errors and ${warningCount} warnings.${colors.reset}`);
    process.exit(1);
} else {
    console.log(`${colors.green}All checks passed. (${warningCount} warnings)${colors.reset}`);
    process.exit(0);
}
