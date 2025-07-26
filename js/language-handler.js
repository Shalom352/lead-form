// Language and region handler
document.addEventListener('DOMContentLoaded', function() {
    
    // Get saved language or detect from browser
    let currentLang = localStorage.getItem('formLanguage') || 
                     (navigator.language.toLowerCase().includes('fr') ? 'fr' : 'en');
    
    // Get current region
    let currentRegion = localStorage.getItem('selectedRegion') || 'dubai';
    
    // Language toggle button
    const langToggle = document.getElementById('languageToggle');
    const regionSelect = document.getElementById('region');
    
    // Initialize
    applyTranslations(currentLang);
    updateRegionSpecificContent(currentRegion);
    
    // Language toggle click
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'fr' : 'en';
            localStorage.setItem('formLanguage', currentLang);
            applyTranslations(currentLang);
            updateLanguageToggleButton();
        });
    }
    
    // Region change
    if (regionSelect) {
        regionSelect.value = currentRegion;
        regionSelect.addEventListener('change', function() {
            currentRegion = this.value;
            localStorage.setItem('selectedRegion', currentRegion);
            updateRegionSpecificContent(currentRegion);
            updateBudgetOptions(currentRegion, currentLang);
        });
    }
    
    // Apply translations
    function applyTranslations(lang) {
        const trans = window.translations[lang];
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update all elements with data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const keys = key.split('.');
            let value = trans;
            
            // Navigate nested objects
            for (let k of keys) {
                value = value[k];
            }
            
            if (value) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else if (element.tagName === 'SELECT') {
                    // Handle select options
                    updateSelectOptions(element, key, value);
                } else {
                    // Add required asterisk for labels
                    if (element.tagName === 'LABEL' && element.parentElement.querySelector('[required]')) {
                        element.innerHTML = value + trans.required;
                    } else {
                        element.textContent = value;
                    }
                }
            }
        });
        
        // Update placeholders with region-specific content
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const placeholder = trans[key];
            
            if (placeholder) {
                if (typeof placeholder === 'object' && placeholder[currentRegion]) {
                    element.placeholder = placeholder[currentRegion];
                } else if (typeof placeholder === 'string') {
                    element.placeholder = placeholder;
                }
            }
        });
        
        // Update budget options based on region
        updateBudgetOptions(currentRegion, lang);
        
        // Update language selector
        const langSelect = document.getElementById('language');
        if (langSelect) {
            langSelect.value = lang;
        }
    }
    
    // Update budget options based on region
    function updateBudgetOptions(region, lang) {
        const budgetSelect = document.getElementById('budget');
        if (!budgetSelect) return;
        
        const trans = window.translations[lang];
        const budgetOptions = trans.budgetOptions[region];
        
        // Save current value
        const currentValue = budgetSelect.value;
        
        // Update options
        budgetSelect.innerHTML = `
            <option value="">${trans.selectBudget}</option>
            <option value="under-10k">${budgetOptions['under10k']}</option>
            <option value="10k-25k">${budgetOptions['10k-25k']}</option>
            <option value="25k-50k">${budgetOptions['25k-50k']}</option>
            <option value="over-50k">${budgetOptions['over50k']}</option>
            <option value="discuss">${budgetOptions.discuss}</option>
        `;
        
        // Restore value
        budgetSelect.value = currentValue;
    }
    
    // Update region-specific content
    function updateRegionSpecificContent(region) {
        // Update name placeholder
        const nameInput = document.getElementById('name');
        if (nameInput) {
            const namePlaceholder = window.translations[currentLang].namePlaceholder[region];
            nameInput.placeholder = namePlaceholder;
        }
        
        // Update phone placeholder
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            const phonePlaceholder = window.translations[currentLang].phonePlaceholder[region];
            phoneInput.placeholder = phonePlaceholder;
        }
    }
    
    // Update language toggle button
    function updateLanguageToggleButton() {
        if (langToggle) {
            const langText = langToggle.querySelector('.lang-text');
            langText.textContent = currentLang === 'en' ? 'FR' : 'EN';
        }
    }
    
    // Update select options
    function updateSelectOptions(select, key, options) {
        const currentValue = select.value;
        
        // Special handling for each select type
        if (key === 'objectiveOptions') {
            select.innerHTML = `
                <option value="">${window.translations[currentLang].selectObjective}</option>
                <option value="automation">${options.automation}</option>
                <option value="chatbot">${options.chatbot}</option>
                <option value="data-analysis">${options.dataAnalysis}</option>
                <option value="marketing">${options.marketing}</option>
                <option value="custom">${options.custom}</option>
                <option value="other">${options.other}</option>
            `;
        } else if (key === 'sizeOptions') {
            select.innerHTML = `
                <option value="">${window.translations[currentLang].selectSize}</option>
                <option value="startup">${options.startup}</option>
                <option value="sme">${options.sme}</option>
                <option value="medium">${options.medium}</option>
                <option value="large">${options.large}</option>
            `;
        } else if (key === 'decisionOptions') {
            select.innerHTML = `
                <option value="">${window.translations[currentLang].selectOne}</option>
                <option value="yes">${options.yes}</option>
                <option value="partial">${options.partial}</option>
                <option value="no">${options.no}</option>
            `;
        } else if (key === 'timelineOptions') {
            select.innerHTML = `
                <option value="">${window.translations[currentLang].selectTimeline}</option>
                <option value="immediate">${options.immediate}</option>
                <option value="month">${options.month}</option>
                <option value="quarter">${options.quarter}</option>
                <option value="semester">${options.semester}</option>
                <option value="undefined">${options.undefined}</option>
            `;
        } else if (key === 'timeOptions') {
            select.innerHTML = `
                <option value="">${window.translations[currentLang].selectTime}</option>
                <option value="morning">${options.morning}</option>
                <option value="afternoon">${options.afternoon}</option>
                <option value="evening">${options.evening}</option>
                <option value="anytime">${options.anytime}</option>
            `;
        } else if (key === 'regionOptions') {
            select.innerHTML = `
                <option value="dubai">${options.dubai}</option>
                <option value="ci">${options.ci}</option>
            `;
        } else if (key === 'languageOptions') {
            select.innerHTML = `
                <option value="en">${options.en}</option>
                <option value="fr">${options.fr}</option>
            `;
        }
        
        // Restore previous value
        select.value = currentValue;
    }
    
    // Initialize language toggle button
    updateLanguageToggleButton();
    
    // Make functions available globally
    window.applyTranslations = applyTranslations;
    window.updateRegionSpecificContent = updateRegionSpecificContent;
});