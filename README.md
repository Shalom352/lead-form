# Axle IA Enhanced Lead Generation Form

A professional lead generation form with automatic lead scoring, ClickUp integration, and multi-regional support.

## 🚀 Features

### Lead Qualification System
- **15+ fields** for comprehensive lead capture
- **Automatic lead scoring** (0-100 points)
- **Lead classification**: 🔥 Hot, ⚡ Qualified, 📧 Warm, ❄️ Cold
- **Conditional fields** that appear based on user responses

### ClickUp Integration
- Automatic task creation in ClickUp
- Smart routing to regional lists (Dubai/Côte d'Ivoire)
- Informative task titles with all key information visible
- Structured descriptions with recommended actions
- Priority assignment based on lead score

### User Experience
- Clean, modern design with smooth animations
- Real-time form validation
- Mobile-responsive layout
- Multi-language support (English/French)
- Loading states and success/error messages

## 📋 Form Fields

### Basic Information
- Full Name*
- Email Address*
- Company Name*
- Job Title
- Phone Number

### Business Needs
- Main Objective* (with custom option)
- Company Size*
- Budget Range*
- Decision Maker Status (conditional)

### Timeline
- Project Timeline*
- Preferred Call Time (conditional)

### Additional
- Project Description
- Region Selection*
- Language Preference*

### Hidden Tracking
- Time on site
- Pages visited
- Traffic source
- Device type
- Page source URL

## 🎯 Lead Scoring Algorithm

The form automatically calculates a lead score based on:

- **Budget** (30 points max)
  - < €10k: 5 points
  - €10-25k: 15 points
  - €25-50k: 25 points
  - €50k+: 30 points

- **Company Size** (25 points max)
  - Startup: 10 points
  - SME: 15 points
  - Medium: 20 points
  - Large: 25 points

- **Timeline** (20 points max)
  - Immediate: 20 points
  - 1 month: 15 points
  - 3 months: 10 points
  - 6 months: 5 points

- **Decision Maker** (15 points max)
  - Yes: 15 points
  - Partial: 10 points
  - No: 5 points

- **Contact Completeness** (10 points max)
  - Phone provided: 3 points
  - Job title provided: 3 points
  - Detailed message: 4 points

- **Engagement Bonus** (up to 10 points)
  - Based on time spent on site

## 🔧 Installation

1. Clone or download this repository
2. Update the ClickUp configuration in `js/clickup-integration.js`:
   ```javascript
   const CLICKUP_CONFIG = {
       apiToken: 'YOUR_CLICKUP_API_TOKEN',
       lists: {
           dubai: 'YOUR_DUBAI_LIST_ID',
           ci: 'YOUR_CI_LIST_ID'
       }
   };
   ```
3. Host the files on your web server
4. Embed or link to the form from your main website

## 🌐 Usage Options

### Standalone Page
Simply host and link to `index.html`

### Embed in Existing Site
```html
<iframe 
    src="path/to/form/index.html" 
    width="100%" 
    height="800" 
    frameborder="0">
</iframe>
```

### Modal Integration
```javascript
// Open form in a modal
function openLeadForm() {
    const modal = document.createElement('div');
    modal.className = 'lead-form-modal';
    modal.innerHTML = `
        <iframe src="path/to/form/index.html" 
                width="100%" 
                height="100%" 
                frameborder="0">
        </iframe>
    `;
    document.body.appendChild(modal);
}
```

## 📊 ClickUp Task Format

Tasks are created with the following format:

### Title
```
🔥 HOT LEAD | John Doe | Acme Corp | CEO | €50,000+ | +971501234567
```

### Description
- Lead score and classification
- Complete contact information
- Company details
- Project requirements
- Engagement metrics
- Recommended actions based on score

### Tags
- Lead quality (hot-lead, qualified-lead, etc.)
- Region (dubai, ci)
- Language (en, fr)
- Score range
- Budget range
- Urgency level

## 🛠️ Customization

### Styling
Edit `css/styles.css` to match your brand:
- Update color variables in `:root`
- Modify fonts and spacing
- Adjust animations

### Fields
Add or remove fields in `index.html` and update:
- Form validation in `js/form-handler.js`
- Lead scoring algorithm
- ClickUp task generation

### Translations
The form supports multiple languages. Update text content for additional languages in the HTML and JavaScript files.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔒 Security Notes

- API token is client-side (consider using a backend proxy for production)
- Form includes basic validation
- No sensitive data is stored locally
- HTTPS recommended for production

## 📞 Support

For questions or issues:
- Email: hello@axle-ia.com
- Create an issue in this repository

## 📄 License

© 2024 Axle IA. All rights reserved.