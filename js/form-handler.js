// Form Handler JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Track page load time
    window.pageLoadTime = Date.now();
    
    // Get form elements
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-button');
    const buttonText = form.querySelector('.button-text');
    const buttonLoading = form.querySelector('.button-loading');
    
    // Initialize form
    initializeForm();
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = collectFormData();
        
        // Calculate lead score
        formData.leadScore = calculateLeadScore(formData);
        
        // Update button state
        setLoadingState(true);
        
        try {
            // Submit to ClickUp
            await submitToClickUp(formData);
            
            // Show success message
            showMessage('success', getSuccessMessage(formData.language));
            
            // Reset form
            form.reset();
            
            // Close form after delay (if in modal)
            setTimeout(() => {
                if (window.parent !== window) {
                    window.parent.postMessage({ action: 'closeForm' }, '*');
                }
            }, 3000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('error', getErrorMessage(formData.language));
        } finally {
            setLoadingState(false);
        }
    });
    
    // Initialize form features
    function initializeForm() {
        // Populate tracking fields
        populateTrackingFields();
        
        // Setup conditional fields
        setupConditionalFields();
        
        // Setup real-time validation
        setupValidation();
        
        // Set default region/language from localStorage or browser
        setDefaultValues();
    }
    
    // Populate hidden tracking fields
    function populateTrackingFields() {
        // Page source
        document.getElementById('pageSource').value = window.location.href;
        
        // Time on site (will be calculated on submit)
        const timeField = document.getElementById('timeOnSite');
        if (timeField) {
            form.addEventListener('submit', () => {
                const timeOnSite = Math.round((Date.now() - window.pageLoadTime) / 1000);
                timeField.value = timeOnSite;
            });
        }
        
        // Pages visited
        let pagesVisited = sessionStorage.getItem('pagesVisited') || '0';
        pagesVisited = parseInt(pagesVisited) + 1;
        sessionStorage.setItem('pagesVisited', pagesVisited.toString());
        document.getElementById('pagesVisited').value = pagesVisited;
        
        // User agent
        document.getElementById('userAgent').value = navigator.userAgent;
        
        // Referrer
        document.getElementById('referrer').value = document.referrer || 'Direct';
    }
    
    // Setup conditional field logic
    function setupConditionalFields() {
        // Project type → Objective options
        const projectTypeField = document.getElementById('projectType');
        if (projectTypeField) {
            projectTypeField.addEventListener('change', function() {
                const currentLang = localStorage.getItem('formLanguage') || 'en';
                window.updateObjectiveOptions(this.value, currentLang);
            });
        }
        
        // Objective → Custom objective
        const objectiveField = document.getElementById('objective');
        const customObjectiveGroup = document.getElementById('customObjectiveGroup');
        
        objectiveField.addEventListener('change', function() {
            if (this.value === 'other' || this.value === 'custom') {
                showField(customObjectiveGroup);
            } else {
                hideField(customObjectiveGroup);
            }
        });
        
        // Budget → Decision maker
        const budgetField = document.getElementById('budget');
        const decisionMakerSection = document.getElementById('decisionMakerSection');
        
        budgetField.addEventListener('change', function() {
            if (this.value === '25k-50k' || this.value === 'over-50k') {
                showField(decisionMakerSection);
            } else {
                hideField(decisionMakerSection);
            }
        });
        
        // Timeline → Urgent call
        const timelineField = document.getElementById('timeline');
        const urgentCallSection = document.getElementById('urgentCallSection');
        
        timelineField.addEventListener('change', function() {
            if (this.value === 'immediate') {
                showField(urgentCallSection);
            } else {
                hideField(urgentCallSection);
            }
        });
    }
    
    // Show/hide field with animation
    function showField(element) {
        element.style.display = 'block';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.maxHeight = '200px';
        }, 10);
    }
    
    function hideField(element) {
        element.style.opacity = '0';
        element.style.maxHeight = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }
    
    // Setup form validation
    function setupValidation() {
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });
    }
    
    function validateField(field) {
        const isValid = field.checkValidity();
        
        if (isValid && field.value.trim() !== '') {
            field.classList.remove('invalid');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
        }
    }
    
    // Set default values
    function setDefaultValues() {
        // Region
        const savedRegion = localStorage.getItem('selectedRegion');
        const browserLang = navigator.language.toLowerCase();
        
        if (savedRegion) {
            document.getElementById('region').value = savedRegion;
        } else if (browserLang.includes('fr')) {
            document.getElementById('region').value = 'ci';
        }
        
        // Language
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            document.getElementById('language').value = savedLang;
        } else if (browserLang.includes('fr')) {
            document.getElementById('language').value = 'fr';
        }
    }
    
    // Collect all form data
    function collectFormData() {
        const formData = {
            // Basic info
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            jobTitle: document.getElementById('jobTitle').value,
            phone: document.getElementById('phone').value,
            
            // Project type
            projectType: document.getElementById('projectType').value,
            
            // Business needs
            objective: document.getElementById('objective').value,
            customObjective: document.getElementById('customObjective').value,
            companySize: document.getElementById('companySize').value,
            budget: document.getElementById('budget').value,
            decisionMaker: document.getElementById('decisionMaker').value,
            
            // Timeline
            timeline: document.getElementById('timeline').value,
            preferredCallTime: document.getElementById('preferredCallTime').value,
            
            // Message
            message: document.getElementById('message').value,
            
            // Tracking
            pageSource: document.getElementById('pageSource').value,
            timeOnSite: document.getElementById('timeOnSite').value,
            pagesVisited: document.getElementById('pagesVisited').value,
            userAgent: document.getElementById('userAgent').value,
            referrer: document.getElementById('referrer').value,
            
            // System
            region: document.getElementById('region').value,
            language: document.getElementById('language').value,
            submittedAt: new Date().toISOString()
        };
        
        // Save preferences
        localStorage.setItem('selectedRegion', formData.region);
        localStorage.setItem('selectedLanguage', formData.language);
        
        return formData;
    }
    
    // Calculate lead score
    function calculateLeadScore(formData) {
        let score = 0;
        
        // Budget scoring (30 points max)
        const budgetScores = {
            'under-10k': 5,
            '10k-25k': 15,
            '25k-50k': 25,
            'over-50k': 30,
            'discuss': 20
        };
        score += budgetScores[formData.budget] || 0;
        
        // Company size scoring (25 points max)
        const sizeScores = {
            'startup': 10,
            'sme': 15,
            'medium': 20,
            'large': 25
        };
        score += sizeScores[formData.companySize] || 0;
        
        // Timeline urgency scoring (20 points max)
        const timelineScores = {
            'immediate': 20,
            'month': 15,
            'quarter': 10,
            'semester': 5,
            'undefined': 2
        };
        score += timelineScores[formData.timeline] || 0;
        
        // Decision maker scoring (15 points max)
        const decisionScores = {
            'yes': 15,
            'partial': 10,
            'no': 5
        };
        score += decisionScores[formData.decisionMaker] || 0;
        
        // Contact completeness (10 points max)
        if (formData.phone) score += 3;
        if (formData.jobTitle) score += 3;
        if (formData.message && formData.message.length > 50) score += 4;
        
        // Engagement bonus (up to 10 points)
        const timeOnSite = parseInt(formData.timeOnSite) || 0;
        if (timeOnSite > 60) score += 2;
        if (timeOnSite > 180) score += 3;
        if (timeOnSite > 300) score += 5;
        
        return Math.min(score, 100);
    }
    
    // UI Helper Functions
    function setLoadingState(isLoading) {
        submitButton.disabled = isLoading;
        buttonText.style.display = isLoading ? 'none' : 'inline';
        buttonLoading.style.display = isLoading ? 'inline-flex' : 'none';
    }
    
    function showMessage(type, message) {
        const messagesDiv = document.getElementById('formMessages');
        messagesDiv.innerHTML = `
            <div class="${type}-message">
                ${message}
            </div>
        `;
        
        // Auto-hide message after 8 seconds
        setTimeout(() => {
            messagesDiv.innerHTML = '';
        }, 8000);
    }
    
    function getSuccessMessage(language) {
        const messages = {
            en: '✅ Thank you! We\'ve received your information and will contact you within 24-48 hours.',
            fr: '✅ Merci ! Nous avons reçu vos informations et vous contacterons sous 24-48h.'
        };
        return messages[language] || messages.en;
    }
    
    function getErrorMessage(language) {
        const messages = {
            en: '❌ Sorry, there was an error. Please try again or contact us at hello@axle-ia.com',
            fr: '❌ Désolé, une erreur s\'est produite. Veuillez réessayer ou nous contacter à hello@axle-ia.com'
        };
        return messages[language] || messages.en;
    }
});