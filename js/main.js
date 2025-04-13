document.addEventListener('DOMContentLoaded', initApplication);

const NotificationSystem = {
    show(message, type = 'success', duration = 3000) {
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

    dismiss(notification) {
        notification.classList.remove('show');
        notification.classList.add('hide');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        }, { once: true });
    }
};

function initApplication() {
    setCopyrightYear();
    initializePageSpecificFeatures();
    injectNotificationCSS();
}

function injectNotificationCSS() {
    if (document.getElementById('dynamic-notification-styles')) return;

    const css = `
        .notification { /* kept minimal, handled in style.css */ }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'dynamic-notification-styles';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
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

    features.forEach(({ title, description, icon }) => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-card';
        featureElement.innerHTML = `
            <div class="feature-icon">${icon}</div>
            <h4>${title}</h4>
            <p>${description}</p>
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
    setupContactForm();
    injectContactInfo();
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            NotificationSystem.show(
                'Thank you! Your message is being sent...',
                'info',
                3000
            );
        });
    }
}

function injectContactInfo() {
    const infoContainer = document.getElementById('info-container');
    if (!infoContainer) return;

    const infos = [
        { icon: "📞", label: "Phone", value: "+1-234-567-890" },
        { icon: "📧", label: "Email", value: "support@dsmobiles.com" },
        { icon: "🏢", label: "Address", value: "123 Mobile Street, Tech City, USA" }
    ];

    infos.forEach(({ icon, label, value }) => {
        const infoCard = document.createElement('div');
        infoCard.className = 'info-card';
        infoCard.innerHTML = `
            <div class="info-icon">${icon}</div>
            <h4>${label}</h4>
            <p>${value}</p>
        `;
        infoContainer.appendChild(infoCard);
    });
}

function setCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
