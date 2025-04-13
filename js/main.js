/**
 * DSMobiles - Enhanced Professional JavaScript Implementation
 * 
 * Features:
 * - Animated notification system (replacing alert())
 * - Form submission feedback with progress indication
 * - Smooth animations for UI interactions
 * - Improved error handling
 * - Accessibility enhancements
 */

document.addEventListener('DOMContentLoaded', initApplication);

// Notification system
const NotificationSystem = {
    /**
     * Shows a notification message
     * @param {string} message - The message to display
     * @param {string} type - Type of notification (success, error, info)
     * @param {number} duration - Time in ms before auto-dismiss (0 = manual close)
     */
    show: function(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close" aria-label="Close notification">
                &times;
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger reflow for animation
        void notification.offsetWidth;
        notification.classList.add('show');
        
        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.dismiss(notification);
        });
        
        // Auto-dismiss if duration is set
        if (duration > 0) {
            setTimeout(() => this.dismiss(notification), duration);
        }
    },
    
    /**
     * Dismisses a notification
     * @param {HTMLElement} notification - The notification element to dismiss
     */
    dismiss: function(notification) {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Remove after animation completes
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }
};

// Main application initialization
function initApplication() {
    setCopyrightYear();
    initializePageSpecificFeatures();
    injectNotificationCSS();
}

/**
 * Injects notification CSS dynamically
 */
function injectNotificationCSS() {
    const css = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            background: #4CAF50;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(120%);
            transition: transform 0.3s ease-out;
            z-index: 1000;
            display: flex;
            align-items: center;
            max-width: 350px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.hide {
            transform: translateX(120%);
        }
        
        .notification-success {
            background: #4CAF50;
        }
        
        .notification-error {
            background: #F44336;
        }
        
        .notification-info {
            background: #2196F3;
        }
        
        .notification-content {
            flex: 1;
            padding-right: 10px;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            line-height: 1;
            padding: 0 0 0 10px;
        }
        
        .form-feedback {
            display: none;
            padding: 20px;
            text-align: center;
            background: #f5f5f5;
            border-radius: 4px;
            margin-top: 20px;
        }
        
        .form-success {
            display: block;
            animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

function setCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initializePageSpecificFeatures() {
    if (document.getElementById('features-container')) {
        initializeHomePage();
    } else if (document.getElementById('contactForm')) {
        initializeContactPage();
    }
}

function initializeHomePage() {
    const features = [
        {
            title: "Latest Devices",
            description: "We offer the newest mobile devices from top brands at competitive prices.",
            icon: "📱"
        },
        {
            title: "Expert Support",
            description: "Our team of mobile experts is always ready to assist you with any questions.",
            icon: "👨‍💼"
        },
        {
            title: "Quality Guarantee",
            description: "All our products come with a comprehensive warranty and quality guarantee.",
            icon: "✅"
        }
    ];

    renderFeatureCards(features);
    setupCtaButton();
}

function renderFeatureCards(features) {
    const featuresContainer = document.getElementById('features-container');
    
    if (!featuresContainer) return;

    features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-card';
        featureElement.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h4>${feature.title}</h4>
            <p>${feature.description}</p>
        `;
        featuresContainer.appendChild(featureElement);
    });
}

function setupCtaButton() {
    const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            NotificationSystem.show(
                'Thank you for your interest in DSMobiles! Our full product catalog will be available soon.',
                'info',
                5000
            );
        });
    }
}

function initializeContactPage() {
    const contactInfo = [
        {
            title: "Email",
            content: '<a href="mailto:customerservice@dsmobiles.com">customerservice@dsmobiles.com</a>',
            icon: "✉️"
        },
        {
            title: "Phone",
            content: "+1 (555) 123-4567",
            icon: "📞"
        },
        {
            title: "Address",
            content: "123 Mobile Street, Tech City, TC 10001",
            icon: "📍"
        }
    ];

    renderContactInfo(contactInfo);
    setupContactForm();
}

function renderContactInfo(contactInfo) {
    const infoContainer = document.getElementById('info-container');
    
    if (!infoContainer) return;

    contactInfo.forEach(info => {
        const infoElement = document.createElement('div');
        infoElement.className = 'info-card';
        infoElement.innerHTML = `
            <div class="info-icon">${info.icon}</div>
            <h4>${info.title}</h4>
            <p>${info.content}</p>
        `;
        infoContainer.appendChild(infoElement);
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Create feedback element
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'form-feedback';
        contactForm.parentNode.insertBefore(feedbackEl, contactForm.nextSibling);
        
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            try {
                // Show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner"></span> Sending...';
                
                // Simulate API call
                await submitFormData(contactForm);
                
                // Show success feedback
                feedbackEl.innerHTML = `
                    <h3>Thank you for your message!</h3>
                    <p>We've received your inquiry and will respond within 24 hours.</p>
                    <button class="close-form-btn">Close Form</button>
                `;
                feedbackEl.classList.add('form-success');
                
                // Hide form
                contactForm.style.display = 'none';
                
                // Add close button handler
                feedbackEl.querySelector('.close-form-btn').addEventListener('click', () => {
                    feedbackEl.style.display = 'none';
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    contactForm.querySelector('input').focus();
                });
                
                NotificationSystem.show(
                    'Your message has been sent successfully!',
                    'success',
                    5000
                );
            } catch (error) {
                NotificationSystem.show(
                    'There was an error sending your message. Please try again.',
                    'error',
                    5000
                );
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
}

/**
 * Simulates form submission to a server
 * @param {HTMLFormElement} form - The form element
 */
function submitFormData(form) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // In a real application, this would be a fetch() call
            const formData = {
                name: form.querySelector('#name').value.trim(),
                email: form.querySelector('#email').value.trim(),
                message: form.querySelector('#message').value.trim()
            };
            
            console.log('Form data submitted:', formData);
            
            // Simulate 90% success rate for demo purposes
            Math.random() > 0.1 ? resolve() : reject(new Error('Network error'));
        }, 1500);
    });
}