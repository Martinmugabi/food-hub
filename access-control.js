// access-control.js - Require login for entire website
class AccessControl {
    constructor() {
        this.publicPages = ['login.html', 'signup.html', 'forgot-password.html'];
        this.currentPage = window.location.pathname.split('/').pop();
        this.checkAccess();
    }

    checkAccess() {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('foodhub_session');
        
        // If not logged in and not on a public page, redirect to login
        if (!isLoggedIn && !this.publicPages.includes(this.currentPage)) {
            window.location.href = 'login.html';
            return;
        }

        // If logged in and on login/signup pages, redirect to home
        if (isLoggedIn && this.publicPages.includes(this.currentPage)) {
            window.location.href = 'index.html';
            return;
        }

        // If access granted, initialize page
        this.initializePage();
    }

    initializePage() {
        const user = JSON.parse(localStorage.getItem('foodhub_session') || '{}');
        
        if (user.id) {
            // Track visit
            this.trackVisit();
            
            // Show welcome message on first visit today
            this.showWelcomeMessage();
        }
    }

    trackVisit() {
        const user = JSON.parse(localStorage.getItem('foodhub_session'));
        const today = new Date().toDateString();
        
        let visits = JSON.parse(localStorage.getItem('user_visits') || '{}');
        
        if (!visits[user.id]) {
            visits[user.id] = [];
        }
        
        // Add today's visit if not already recorded
        if (!visits[user.id].includes(today)) {
            visits[user.id].push(today);
            localStorage.setItem('user_visits', JSON.stringify(visits));
        }
    }

    showWelcomeMessage() {
        // Show welcome message only once per session
        if (!sessionStorage.getItem('welcome_shown')) {
            setTimeout(() => {
                this.showNotification('Thanks for logging in to FoodHub! 🎉', 'success');
            }, 1000);
            sessionStorage.setItem('welcome_shown', 'true');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `welcome-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Close button
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Initialize access control on every page
new AccessControl();