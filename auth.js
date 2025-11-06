// auth.js - Enhanced Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.checkExistingSession();
        this.setupEventListeners();
    }

    loadUsers() {
        const users = localStorage.getItem('foodhub_users');
        return users ? JSON.parse(users) : [];
    }

    saveUsers() {
        localStorage.setItem('foodhub_users', JSON.stringify(this.users));
    }

    checkExistingSession() {
        const session = localStorage.getItem('foodhub_session');
        if (session) {
            this.currentUser = JSON.parse(session);
        }
    }

    createSession(user) {
        this.currentUser = user;
        localStorage.setItem('foodhub_session', JSON.stringify(user));
        
        // Track login
        this.trackLogin();
    }

    trackLogin() {
        const loginData = {
            userId: this.currentUser.id,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        let logins = JSON.parse(localStorage.getItem('user_logins') || '[]');
        logins.push(loginData);
        localStorage.setItem('user_logins', JSON.stringify(logins));
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Forgot password form
        const forgotForm = document.getElementById('forgotPasswordForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }

        // Password toggle
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const icon = this.querySelector('i');
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            submitBtn.innerHTML = '<span class="loading"></span> Signing In...';
            submitBtn.disabled = true;

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            await this.login(email, password);
            
            this.showNotification('Thanks for logging in to FoodHub! 🎉', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            this.showNotification(error, 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            submitBtn.innerHTML = '<span class="loading"></span> Creating Account...';
            submitBtn.disabled = true;

            const formData = {
                fullName: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                password: document.getElementById('registerPassword').value,
                phone: document.getElementById('registerPhone')?.value || '',
                location: document.getElementById('registerLocation')?.value || '',
                agreeTerms: document.getElementById('agreeTerms').checked
            };

            await this.register(formData);
            
            this.showNotification('Account created successfully! Welcome to FoodHub! 🎉', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            this.showNotification(error, 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleForgotPassword(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            const email = document.getElementById('resetEmail').value;
            await this.sendPasswordReset(email);
            
            this.showNotification('Password reset link sent to your email!', 'success');
            
        } catch (error) {
            this.showNotification(error, 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            const user = this.users.find(u => u.email === email.toLowerCase());
            
            if (!user) {
                reject('No account found with this email.');
                return;
            }

            if (user.password !== this.hashPassword(password)) {
                reject('Invalid password. Please try again.');
                return;
            }

            const sessionUser = { ...user };
            delete sessionUser.password;
            this.createSession(sessionUser);

            resolve('Login successful!');
        });
    }

    register(userData) {
        return new Promise((resolve, reject) => {
            if (!this.validateEmail(userData.email)) {
                reject('Please enter a valid email address.');
                return;
            }

            if (!this.validatePassword(userData.password)) {
                reject('Password must be at least 6 characters long.');
                return;
            }

            if (!this.validateName(userData.fullName)) {
                reject('Please enter your full name.');
                return;
            }

            if (!userData.agreeTerms) {
                reject('Please agree to the terms and conditions.');
                return;
            }

            if (this.users.find(user => user.email === userData.email)) {
                reject('An account with this email already exists.');
                return;
            }

            const newUser = {
                id: Date.now().toString(),
                fullName: userData.fullName.trim(),
                email: userData.email.toLowerCase(),
                password: this.hashPassword(userData.password),
                phone: userData.phone,
                location: userData.location,
                profilePhoto: '',
                joinDate: new Date().toISOString(),
                preferences: {
                    newsletter: true,
                    notifications: true
                },
                orders: []
            };

            this.users.push(newUser);
            this.saveUsers();
            
            const sessionUser = { ...newUser };
            delete sessionUser.password;
            this.createSession(sessionUser);

            resolve('Account created successfully!');
        });
    }

    sendPasswordReset(email) {
        return new Promise((resolve, reject) => {
            if (!this.validateEmail(email)) {
                reject('Please enter a valid email address.');
                return;
            }

            const user = this.users.find(u => u.email === email.toLowerCase());
            if (!user) {
                reject('No account found with this email.');
                return;
            }

            // Simulate sending email
            setTimeout(() => {
                resolve('Password reset email sent!');
            }, 2000);
        });
    }

    // Utility methods
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateName(name) {
        return name.trim().length >= 2;
    }

    hashPassword(password) {
        return btoa(password).split('').reverse().join('');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `auth-notification ${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icons[type]}"></i>
                <span>${message}</span>
            </div>
        `;

        const colors = {
            success: '#4CAF50',
            error: '#ff4757',
            info: '#2196F3'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize auth system
const authSystem = new AuthSystem();