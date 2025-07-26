// ClickUp Integration for Enhanced Form
const CLICKUP_CONFIG = {
    apiUrl: 'https://api.clickup.com/api/v2',
    apiToken: 'pk_154427951_ELO40BTJM5VF0Q9M10J4L1BS2HR6RXI1',
    lists: {
        dubai: '901605644154',
        ci: '901605644153'
    }
};

// Main submission function
async function submitToClickUp(formData) {
    // Select the appropriate list based on region
    const listId = CLICKUP_CONFIG.lists[formData.region] || CLICKUP_CONFIG.lists.dubai;
    
    // Prepare task data
    const taskData = prepareTaskData(formData);
    
    // Send to ClickUp
    const response = await fetch(`${CLICKUP_CONFIG.apiUrl}/list/${listId}/task`, {
        method: 'POST',
        headers: {
            'Authorization': CLICKUP_CONFIG.apiToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(`ClickUp API Error: ${response.status} - ${JSON.stringify(error)}`);
    }
    
    const result = await response.json();
    console.log('✅ Lead successfully created in ClickUp:', result.id);
    
    return result;
}

// Prepare task data for ClickUp
function prepareTaskData(formData) {
    // Generate task name with all key information visible
    const taskName = generateTaskName(formData);
    
    // Generate detailed description
    const description = generateDescription(formData);
    
    // Generate tags
    const tags = generateTags(formData);
    
    // Determine priority based on lead score
    const priority = getPriority(formData.leadScore);
    
    return {
        name: taskName,
        description: description,
        tags: tags,
        priority: priority,
        status: 'Open'
    };
}

// Generate informative task name
function generateTaskName(formData) {
    const leadQuality = getLeadQuality(formData.leadScore);
    const budget = getBudgetText(formData.budget);
    const company = formData.company || 'Individual';
    const jobTitle = formData.jobTitle || 'Contact';
    const phone = formData.phone || 'No phone';
    
    return `${leadQuality.emoji} ${leadQuality.text} | ${formData.name} | ${company} | ${jobTitle} | ${budget} | ${phone}`;
}

// Generate detailed description
function generateDescription(formData) {
    const leadQuality = getLeadQuality(formData.leadScore);
    const objective = getObjectiveText(formData.objective, formData.customObjective);
    const companySize = getCompanySizeText(formData.companySize);
    const budget = getBudgetText(formData.budget);
    const timeline = getTimelineText(formData.timeline);
    const decisionMaker = getDecisionMakerText(formData.decisionMaker);
    const preferredTime = getPreferredTimeText(formData.preferredCallTime);
    
    return `
**📊 LEAD SCORE: ${formData.leadScore}/100 - ${leadQuality.emoji} ${leadQuality.text}**

---

**🎯 LEAD SUMMARY**
- **Quality:** ${leadQuality.text} (${formData.leadScore}/100)
- **Budget:** ${budget}
- **Timeline:** ${timeline}
- **Objective:** ${objective}

---

**👤 CONTACT INFORMATION**
- **Name:** ${formData.name}
- **Email:** ${formData.email}
- **Phone:** ${formData.phone || 'Not provided'}
- **Company:** ${formData.company}
- **Job Title:** ${formData.jobTitle || 'Not specified'}

---

**🏢 COMPANY DETAILS**
- **Size:** ${companySize}
- **Budget Range:** ${budget}
- **Decision Maker:** ${decisionMaker}

---

**📅 TIMELINE & AVAILABILITY**
- **Project Timeline:** ${timeline}
- **Preferred Call Time:** ${preferredTime}

---

**💬 PROJECT DETAILS**
${formData.message || 'No additional details provided'}

---

**📈 ENGAGEMENT METRICS**
- **Time on Site:** ${formatTime(formData.timeOnSite)}
- **Pages Visited:** ${formData.pagesVisited}
- **Source:** ${formData.referrer}
- **Device:** ${getDeviceType(formData.userAgent)}

---

**🔔 RECOMMENDED ACTIONS**
${getRecommendedActions(formData.leadScore)}

---

**📍 METADATA**
- **Region:** ${formData.region === 'dubai' ? '🇦🇪 Dubai, UAE' : '🇨🇮 Côte d\'Ivoire'}
- **Language:** ${formData.language === 'en' ? 'English' : 'Français'}
- **Submitted:** ${new Date(formData.submittedAt).toLocaleString()}
- **Source:** Enhanced Lead Form
`;
}

// Generate tags
function generateTags(formData) {
    const tags = [
        'lead-website',
        'enhanced-form',
        formData.region,
        formData.language,
        `score-${getScoreRange(formData.leadScore)}`,
        formData.objective
    ];
    
    // Add quality tag
    const quality = getLeadQuality(formData.leadScore);
    tags.push(quality.tag);
    
    // Add budget tag
    if (formData.budget) {
        tags.push(`budget-${formData.budget}`);
    }
    
    // Add timeline tag
    if (formData.timeline === 'immediate') {
        tags.push('urgent');
    }
    
    return tags;
}

// Helper functions
function getLeadQuality(score) {
    if (score >= 80) {
        return { emoji: '🔥', text: 'HOT LEAD', tag: 'hot-lead' };
    } else if (score >= 60) {
        return { emoji: '⚡', text: 'QUALIFIED', tag: 'qualified-lead' };
    } else if (score >= 40) {
        return { emoji: '📧', text: 'WARM', tag: 'warm-lead' };
    } else {
        return { emoji: '❄️', text: 'COLD', tag: 'cold-lead' };
    }
}

function getScoreRange(score) {
    if (score >= 80) return '80-100';
    if (score >= 60) return '60-79';
    if (score >= 40) return '40-59';
    return '0-39';
}

function getPriority(score) {
    if (score >= 80) return 1; // Urgent
    if (score >= 60) return 2; // High
    if (score >= 40) return 3; // Normal
    return 4; // Low
}

function getObjectiveText(objective, customObjective) {
    const objectives = {
        'automation': 'Process Automation',
        'chatbot': 'AI Chatbot',
        'data-analysis': 'Data Analysis & AI Insights',
        'marketing': 'AI-Powered Marketing',
        'custom': 'Custom AI Solution',
        'other': customObjective || 'Other'
    };
    return objectives[objective] || objective || 'Not specified';
}

function getCompanySizeText(size) {
    const sizes = {
        'startup': 'Startup (1-10 employees)',
        'sme': 'SME (11-50 employees)',
        'medium': 'Medium (51-200 employees)',
        'large': 'Large (200+ employees)'
    };
    return sizes[size] || 'Not specified';
}

function getBudgetText(budget) {
    const budgets = {
        'under-10k': '< €10,000',
        '10k-25k': '€10,000 - €25,000',
        '25k-50k': '€25,000 - €50,000',
        'over-50k': '€50,000+',
        'discuss': 'To be discussed'
    };
    return budgets[budget] || 'Not specified';
}

function getTimelineText(timeline) {
    const timelines = {
        'immediate': '🚨 Immediately',
        'month': 'Within 1 month',
        'quarter': 'Within 3 months',
        'semester': 'Within 6 months',
        'undefined': 'Not defined'
    };
    return timelines[timeline] || 'Not specified';
}

function getDecisionMakerText(decision) {
    const decisions = {
        'yes': '✅ Yes, final decision maker',
        'partial': '⚡ Partial influence',
        'no': '❌ Needs to consult others'
    };
    return decisions[decision] || 'Not specified';
}

function getPreferredTimeText(time) {
    const times = {
        'morning': 'Morning (9AM - 12PM)',
        'afternoon': 'Afternoon (12PM - 5PM)',
        'evening': 'Evening (5PM - 8PM)',
        'anytime': 'Any time'
    };
    return times[time] || 'Not specified';
}

function formatTime(seconds) {
    const secs = parseInt(seconds) || 0;
    if (secs < 60) return `${secs} seconds`;
    if (secs < 3600) return `${Math.floor(secs / 60)} minutes`;
    return `${Math.floor(secs / 3600)} hours ${Math.floor((secs % 3600) / 60)} minutes`;
}

function getDeviceType(userAgent) {
    if (/mobile/i.test(userAgent)) return '📱 Mobile';
    if (/tablet/i.test(userAgent)) return '📱 Tablet';
    return '💻 Desktop';
}

function getRecommendedActions(score) {
    if (score >= 80) {
        return `1. 🔥 **HOT LEAD - Call within 2 hours**
2. 📞 Schedule personalized demo immediately
3. 💼 Assign to sales director
4. 📊 Prepare custom proposal`;
    } else if (score >= 60) {
        return `1. ⚡ **QUALIFIED - Call within 24 hours**
2. 📧 Send company presentation
3. 📅 Schedule demo within 48 hours
4. 📋 Gather additional requirements`;
    } else if (score >= 40) {
        return `1. 📧 **WARM - Add to nurturing sequence**
2. 📋 Qualify needs further
3. 📅 Follow up in 1 week
4. 📚 Send educational content`;
    } else {
        return `1. 📧 **COLD - Send educational content**
2. 📅 Follow up in 2 weeks
3. 🎯 Identify actual decision maker
4. 📊 Monitor engagement`;
    }
}

// Make function globally available
window.submitToClickUp = submitToClickUp;