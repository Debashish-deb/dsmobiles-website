document.addEventListener('DOMContentLoaded', initApplication);

// Notification System
const NotificationSystem = {
    show: function (message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;

        document.body.appendChild(notification);

        void notification.offsetWidth;
        notification.classList.add('show');

        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.dismiss(notification);
        });

        if (duration > 0) {
            setTimeout(() => this.dismiss(notification), duration);
        }
    },
    dismiss: function (notification) {
        notification.classList.remove('show');
        notification.classList.add('hide');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }
};

// Main initialization
function initApplication() {
    setCopyrightYear();
    initializePageSpecificFeatures();
    injectNotificationCSS();
}

// Inject notification styles dynamically
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
        .notification-success { background: #4CAF50; }
        .notification-error { background: #F44336; }
        .notification-info { background: #2196F3; }
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
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

// Footer year
function setCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize based on page
function initializePageSpecificFeatures() {
    if (document.getElementById('features-container')) {
        initializeHomePage();
    } else if (document.getElementById('contactForm')) {
        initializeContactPage();
    }
}

// Initialize Home Page (features)
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

// Render feature cards
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

// Setup CTA button
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

// Initialize Contact Page (form)
function initializeContactPage() {
    setupContactForm();
}

// Setup Contact Form (notification only)
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            NotificationSystem.show(
                'Thank you! Your message is being sent...',
                'info',
                3000
            );
        });
    }
}
