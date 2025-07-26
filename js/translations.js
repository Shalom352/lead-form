// Translations for the form
const translations = {
    en: {
        // Header
        formTitle: "Transform Your Business with AI",
        formSubtitle: "Tell us about your needs and we'll create a tailored solution for you",
        
        // Section titles
        contactSection: "Contact Information",
        regionSection: "Region & Language", 
        projectTypeSection: "Project Type",
        businessSection: "Business Needs",
        timelineSection: "Timeline & Availability",
        additionalSection: "Additional Information",
        
        // Contact fields
        fullName: "Full Name",
        email: "Email Address",
        company: "Company Name",
        jobTitle: "Job Title",
        phone: "Phone Number",
        
        // Placeholders
        namePlaceholder: {
            dubai: "Ahmed Al-Rashid",
            ci: "Kouadio Yves"
        },
        emailPlaceholder: "john@company.com",
        companyPlaceholder: "Acme Corp",
        jobTitlePlaceholder: "CEO / CTO / Manager",
        phonePlaceholder: {
            dubai: "+971 50 123 4567",
            ci: "+225 07 08 09 10 11"
        },
        
        // Project type
        projectType: "What type of project is this?",
        selectProjectType: "Select project type",
        projectTypeOptions: {
            consumer: "Smart Customer Experience",
            business: "Business Automation", 
            public: "Public Sector AI"
        },
        
        // Business fields
        objective: "What's your main objective?",
        selectObjective: "Select an objective",
        objectiveOptions: {
            consumer: {
                automation: "Customer Service Automation",
                chatbot: "Intelligent Customer Support", 
                personalization: "Personalized User Experience",
                marketing: "Smart Marketing Campaigns",
                recommendation: "AI Recommendation Engine",
                analytics: "Customer Insights & Analytics",
                ecommerce: "E-commerce Optimization",
                custom: "Custom Consumer Solution",
                other: "Other"
            },
            business: {
                automation: "Process & Workflow Automation",
                assistant: "Business Intelligence Assistant",
                analytics: "Advanced Business Analytics", 
                sales: "Sales Optimization & CRM",
                productivity: "Team Productivity Tools",
                integration: "System Integration & APIs",
                optimization: "Operational Efficiency",
                custom: "Custom Business Solution",
                other: "Other"
            },
            public: {
                automation: "Administrative Automation",
                service: "Digital Public Services",
                analytics: "Public Data Intelligence",
                compliance: "Regulatory Compliance Tools",
                reporting: "Government Reporting Systems",
                citizen: "Citizen Service Platform",
                transparency: "Digital Transparency Tools",
                custom: "Custom Government Solution", 
                other: "Other"
            }
        },
        specifyObjective: "Please specify your objective",
        objectiveDescription: "Describe your specific needs",
        
        companySize: "Company Size",
        selectSize: "Select size",
        sizeOptions: {
            startup: "Startup (1-10 employees)",
            sme: "SME (11-50 employees)",
            medium: "Medium (51-200 employees)",
            large: "Large (200+ employees)"
        },
        
        budget: "Budget Range",
        selectBudget: "Select budget",
        budgetOptions: {
            dubai: {
                under10k: "< $10,000",
                "10k-25k": "$10,000 - $25,000",
                "25k-50k": "$25,000 - $50,000",
                over50k: "$50,000+",
                discuss: "To be discussed"
            },
            ci: {
                under10k: "< 6,000,000 FCFA",
                "10k-25k": "6,000,000 - 15,000,000 FCFA",
                "25k-50k": "15,000,000 - 30,000,000 FCFA",
                over50k: "30,000,000+ FCFA",
                discuss: "To be discussed"
            }
        },
        
        decisionMaker: "Are you the final decision maker?",
        selectOne: "Select one",
        decisionOptions: {
            yes: "Yes, I make the final decision",
            partial: "I have partial influence",
            no: "I need to consult others"
        },
        
        // Timeline fields
        timeline: "When do you need the solution?",
        selectTimeline: "Select timeline",
        timelineOptions: {
            immediate: "Immediately",
            month: "Within 1 month",
            quarter: "Within 3 months",
            semester: "Within 6 months",
            undefined: "Not sure yet"
        },
        
        preferredTime: "Preferred time for a call?",
        selectTime: "Select time",
        timeOptions: {
            morning: "Morning (9AM - 12PM)",
            afternoon: "Afternoon (12PM - 5PM)",
            evening: "Evening (5PM - 8PM)",
            anytime: "Any time"
        },
        
        // Additional fields
        message: "Tell us more about your project",
        messagePlaceholder: "Describe your challenges, goals, and any specific requirements...",
        
        // Region and language
        region: "Region",
        regionOptions: {
            dubai: "🇦🇪 Dubai, UAE",
            ci: "🇨🇮 Côte d'Ivoire"
        },
        preferredLanguage: "Preferred Language",
        languageOptions: {
            en: "English",
            fr: "Français"
        },
        
        // Buttons and notes
        submitButton: "Get Started",
        submitting: "Sending...",
        formNote: "We'll contact you within 24-48 hours",
        
        // Messages
        successMessage: "✅ Thank you! We've received your information and will contact you within 24-48 hours.",
        errorMessage: "❌ Sorry, there was an error. Please try again or contact us at hello@axle-ia.com",
        
        // Required field indicator
        required: " *"
    },
    
    fr: {
        // Header
        formTitle: "Transformez votre entreprise avec l'IA",
        formSubtitle: "Parlez-nous de vos besoins et nous créerons une solution sur mesure pour vous",
        
        // Section titles
        contactSection: "Informations de contact",
        regionSection: "Région et langue",
        projectTypeSection: "Type de projet",
        businessSection: "Besoins d'affaires",
        timelineSection: "Échéancier et disponibilité",
        additionalSection: "Informations supplémentaires",
        
        // Contact fields
        fullName: "Nom complet",
        email: "Adresse e-mail",
        company: "Nom de l'entreprise",
        jobTitle: "Poste",
        phone: "Numéro de téléphone",
        
        // Placeholders
        namePlaceholder: {
            dubai: "Ahmed Al-Rashid",
            ci: "Kouassi Jean-Marc"
        },
        emailPlaceholder: "jean@entreprise.com",
        companyPlaceholder: "Entreprise SARL",
        jobTitlePlaceholder: "PDG / DG / Directeur",
        phonePlaceholder: {
            dubai: "+971 50 123 4567",
            ci: "+225 07 08 09 10 11"
        },
        
        // Project type
        projectType: "Quel type de projet est-ce ?",
        selectProjectType: "Sélectionnez le type de projet",
        projectTypeOptions: {
            consumer: "Expérience Client Intelligente",
            business: "Automatisation Métier",
            public: "IA Secteur Public"
        },
        
        // Business fields
        objective: "Quel est votre objectif principal ?",
        selectObjective: "Sélectionnez un objectif",
        objectiveOptions: {
            consumer: {
                automation: "Automatisation service client",
                chatbot: "Support client intelligent", 
                personalization: "Expérience utilisateur personnalisée",
                marketing: "Campagnes marketing intelligentes",
                recommendation: "Moteur de recommandation IA",
                analytics: "Analyses et insights clients",
                ecommerce: "Optimisation e-commerce",
                custom: "Solution consommateur sur mesure",
                other: "Autre"
            },
            business: {
                automation: "Automatisation processus & workflows",
                assistant: "Assistant intelligence d'affaires",
                analytics: "Analytics d'entreprise avancées", 
                sales: "Optimisation ventes & CRM",
                productivity: "Outils productivité équipe",
                integration: "Intégration systèmes & APIs",
                optimization: "Efficacité opérationnelle",
                custom: "Solution d'affaires sur mesure",
                other: "Autre"
            },
            public: {
                automation: "Automatisation administrative",
                service: "Services publics numériques",
                analytics: "Intelligence données publiques",
                compliance: "Outils conformité réglementaire",
                reporting: "Systèmes reporting gouvernemental",
                citizen: "Plateforme service citoyen",
                transparency: "Outils transparence numérique",
                custom: "Solution gouvernementale sur mesure", 
                other: "Autre"
            }
        },
        specifyObjective: "Veuillez préciser votre objectif",
        objectiveDescription: "Décrivez vos besoins spécifiques",
        
        companySize: "Taille de l'entreprise",
        selectSize: "Sélectionnez la taille",
        sizeOptions: {
            startup: "Startup (1-10 employés)",
            sme: "PME (11-50 employés)",
            medium: "Moyenne (51-200 employés)",
            large: "Grande (200+ employés)"
        },
        
        budget: "Fourchette budgétaire",
        selectBudget: "Sélectionnez le budget",
        budgetOptions: {
            dubai: {
                under10k: "< 10 000 $",
                "10k-25k": "10 000 $ - 25 000 $",
                "25k-50k": "25 000 $ - 50 000 $",
                over50k: "50 000 $+",
                discuss: "À discuter"
            },
            ci: {
                under10k: "< 6 000 000 FCFA",
                "10k-25k": "6 000 000 - 15 000 000 FCFA",
                "25k-50k": "15 000 000 - 30 000 000 FCFA",
                over50k: "30 000 000+ FCFA",
                discuss: "À discuter"
            }
        },
        
        decisionMaker: "Êtes-vous le décideur final ?",
        selectOne: "Sélectionnez une option",
        decisionOptions: {
            yes: "Oui, je prends la décision finale",
            partial: "J'ai une influence partielle",
            no: "Je dois consulter d'autres personnes"
        },
        
        // Timeline fields
        timeline: "Quand avez-vous besoin de la solution ?",
        selectTimeline: "Sélectionnez l'échéancier",
        timelineOptions: {
            immediate: "Immédiatement",
            month: "Dans 1 mois",
            quarter: "Dans 3 mois",
            semester: "Dans 6 mois",
            undefined: "Pas encore sûr"
        },
        
        preferredTime: "Heure préférée pour un appel ?",
        selectTime: "Sélectionnez l'heure",
        timeOptions: {
            morning: "Matin (9h - 12h)",
            afternoon: "Après-midi (12h - 17h)",
            evening: "Soir (17h - 20h)",
            anytime: "N'importe quand"
        },
        
        // Additional fields
        message: "Parlez-nous de votre projet",
        messagePlaceholder: "Décrivez vos défis, objectifs et exigences spécifiques...",
        
        // Region and language
        region: "Région",
        regionOptions: {
            dubai: "🇦🇪 Dubaï, EAU",
            ci: "🇨🇮 Côte d'Ivoire"
        },
        preferredLanguage: "Langue préférée",
        languageOptions: {
            en: "English",
            fr: "Français"
        },
        
        // Buttons and notes
        submitButton: "Commencer",
        submitting: "Envoi en cours...",
        formNote: "Nous vous contacterons dans les 24-48 heures",
        
        // Messages
        successMessage: "✅ Merci ! Nous avons reçu vos informations et vous contacterons sous 24-48h.",
        errorMessage: "❌ Désolé, une erreur s'est produite. Veuillez réessayer ou nous contacter à hello@axle-ia.com",
        
        // Required field indicator
        required: " *"
    }
};

// Export for use in other files
window.translations = translations;