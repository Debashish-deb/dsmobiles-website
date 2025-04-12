// Common functionality for both pages

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Check which page we're on and run page-specific code
    if (document.body.contains(document.getElementById('features-container'))) {
        // Home page specific code
        setupHomePage();
    } else if (document.body.contains(document.getElementById('contactForm'))) {
        // Contact page specific code
        setupContactPage();
    }
});

function setupHomePage() {
    // Features data
    const features = [
        {
            title: "Latest Devices",
            description: "We offer the newest mobile devices from top brands at competitive prices."
        },
        {
            title: "Expert Support",
            description: "Our team of mobile experts is always ready to assist you with any questions."
        },
        {
            title: "Quality Guarantee",
            description: "All our products come with a comprehensive warranty and quality guarantee."
        }
    ];

    const featuresContainer = document.getElementById('features-container');
    
    // Add features to the page
    features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-card';
        featureElement.innerHTML = `
            <h4>${feature.title}</h4>
            <p>${feature.description}</p>
        `;
        featuresContainer.appendChild(featureElement);
    });

    // Add click event to CTA button
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Thank you for your interest in DSMobiles! Our full product catalog will be available soon.');
        });
    }
}

function setupContactPage() {
    // Contact info data
    const contactInfo = [
        {
            title: "Email",
            content: "info@dsmobiles.com"
        },
        {
            title: "Phone",
            content: "+1 (555) 123-4567"
        },
        {
            title: "Address",
            content: "123 Mobile Street, Tech City, TC 10001"
        }
    ];

    const infoContainer = document.getElementById('info-container');
    
    // Add contact info to the page
    contactInfo.forEach(info => {
        const infoElement = document.createElement('div');
        infoElement.className = 'info-card';
        infoElement.innerHTML = `
            <h4>${info.title}</h4>
            <p>${info.content}</p>
        `;
        infoContainer.appendChild(infoElement);
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real app, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}