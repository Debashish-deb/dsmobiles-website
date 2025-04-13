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
    applySavedDarkMode();
    setCopyrightYear();
    initializePageSpecificFeatures();
    injectNotificationCSS();
    setupDarkModeToggle();
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
            title: "Frontend Development",
            description: "Modern, responsive web interfaces with a focus on user experience and performance.",
            icon: "💻"
        },
        {
            title: "Backend Development",
            description: "Robust server-side solutions to power your websites and applications securely and efficiently.",
            icon: "🛠️"
        },
        {
            title: "Android Development",
            description: "Custom Android applications tailored to your business needs.",
            icon: "📱"
        }
    ];
    renderFeatureCards(features);
    setupCtaButton();
}

function setupCtaButton() {
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            NotificationSystem.show(
                'Thank you for your interest in DreamSd! Let\'s build your next project together.',
                'info',
                5000
            );
        });
    }
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


function initializeContactPage() {
    setupContactForm();
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            NotificationSystem.show(
                'Thank you! Your message is being sent...',
                'info',
                2000
            );
            setTimeout(() => {
                window.location.href = 'thankyou.html';
            }, 2000);
        });
    }
}

function setupDarkModeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark Mode';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.padding = '10px 15px';
    toggleButton.style.backgroundColor = '#333';
    toggleButton.style.color = '#fff';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '1001';

    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

function applySavedDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function setCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}