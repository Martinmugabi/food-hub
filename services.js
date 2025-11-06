// services.js - Shared JavaScript for all service pages

// Initialize maps
function initMap() {
    // Default coordinates (Kampala, Uganda)
    const defaultLocation = { lat: 0.3476, lng: 32.5825 };
    
    const map = new google.maps.Map(document.getElementById('deliveryMap'), {
        zoom: 12,
        center: defaultLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"weight": "2.00"}]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#9c9c9c"}]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        draggable: true,
        title: "Drag to set your location"
    });

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                map.setCenter(userLocation);
                marker.setPosition(userLocation);
                
                // Update location fields
                updateLocationFields(userLocation.lat, userLocation.lng);
            },
            () => {
                console.log('Geolocation failed, using default location');
            }
        );
    }

    // Update location when marker is dragged
    marker.addListener('dragend', () => {
        const position = marker.getPosition();
        updateLocationFields(position.lat(), position.lng());
    });

    return { map, marker };
}

// Update location input fields
function updateLocationFields(lat, lng) {
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    
    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;
}

// Calculate delivery fee based on distance
function calculateDeliveryFee(distance) {
    const baseFee = 5000; // UGX 5,000 base fee
    const perKmFee = 1000; // UGX 1,000 per km
    
    return baseFee + (distance * perKmFee);
}

// Star rating system
function initializeStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            // Update stars visual state
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            
            // Update hidden input
            if (ratingInput) {
                ratingInput.value = index + 1;
            }
        });
    });
}

// Gift card progress calculation
function updateGiftCardProgress() {
    const totalSpent = parseFloat(localStorage.getItem('totalSpent') || '0');
    const visits = parseInt(localStorage.getItem('websiteVisits') || '0');
    
    // Calculate progress (example: 10% of total spent + 5% per visit)
    let progress = Math.min((totalSpent * 0.1) + (visits * 5), 100);
    
    const progressBar = document.getElementById('giftCardProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    
    if (progressText) {
        progressText.textContent = `Progress: ${Math.round(progress)}%`;
    }
    
    return progress;
}

// Session booking functionality
function bookSession(sessionId, sessionType, price) {
    const sessionData = {
        id: sessionId,
        type: sessionType,
        price: price,
        date: new Date().toISOString()
    };
    
    // Store in localStorage
    let bookedSessions = JSON.parse(localStorage.getItem('bookedSessions') || '[]');
    bookedSessions.push(sessionData);
    localStorage.setItem('bookedSessions', JSON.stringify(bookedSessions));
    
    alert(`Successfully booked ${sessionType} session!`);
    return true;
}

// Meal plan subscription
function subscribeToMealPlan(planId, planName, price) {
    const subscriptionData = {
        planId: planId,
        planName: planName,
        price: price,
        startDate: new Date().toISOString(),
        status: 'active'
    };
    
    // Store in localStorage
    localStorage.setItem('mealPlanSubscription', JSON.stringify(subscriptionData));
    
    alert(`Successfully subscribed to ${planName} meal plan!`);
    return true;
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Delivery fee calculation based on location
function calculateDeliveryFeeFromLocation() {
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    const feeDisplay = document.getElementById('deliveryFee');
    
    if (latInput && lngInput && feeDisplay && latInput.value && lngInput.value) {
        // Simulate distance calculation (in a real app, you'd use a proper API)
        const distance = Math.random() * 20 + 1; // Random distance between 1-20 km
        const fee = calculateDeliveryFee(distance);
        
        feeDisplay.textContent = `UGX ${fee.toLocaleString()}`;
        return fee;
    }
    
    return 0;
}

// Feedback submission
function submitFeedback() {
    if (!validateForm('feedbackForm')) {
        alert('Please fill in all required fields and provide a rating.');
        return false;
    }
    
    const formData = {
        rating: document.getElementById('rating').value,
        comments: document.getElementById('comments').value,
        deliveryExperience: document.getElementById('deliveryExperience').value,
        timestamp: new Date().toISOString()
    };
    
    // Store feedback
    let allFeedback = JSON.parse(localStorage.getItem('deliveryFeedback') || '[]');
    allFeedback.push(formData);
    localStorage.setItem('deliveryFeedback', JSON.stringify(allFeedback));
    
    alert('Thank you for your feedback! We appreciate your input.');
    document.getElementById('feedbackForm').reset();
    
    // Reset stars
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
    });
    
    return true;
}

// Track website visits
function trackWebsiteVisit() {
    let visits = parseInt(localStorage.getItem('websiteVisits') || '0');
    visits++;
    localStorage.setItem('websiteVisits', visits.toString());
    
    // Update last visit date
    localStorage.setItem('lastVisit', new Date().toISOString());
}

// Initialize all services when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Track website visit
    trackWebsiteVisit();
    
    // Initialize star rating if exists
    initializeStarRating();
    
    // Initialize gift card progress if exists
    updateGiftCardProgress();
    
    // Initialize map if exists
    if (document.getElementById('deliveryMap')) {
        // Note: Google Maps API key would be required in production
        console.log('Map container found - initialize with Google Maps API');
        // initMap(); // Uncomment when you have Google Maps API key
    }
    
    // Add event listeners for delivery fee calculation
    const locationInputs = document.querySelectorAll('#latitude, #longitude');
    locationInputs.forEach(input => {
        input.addEventListener('change', calculateDeliveryFeeFromLocation);
    });
});

// Utility function to format currency
function formatCurrency(amount) {
    return `UGX ${amount.toLocaleString()}`;
}

// Export functions for use in HTML
window.initMap = initMap;
window.calculateDeliveryFee = calculateDeliveryFee;
window.initializeStarRating = initializeStarRating;
window.updateGiftCardProgress = updateGiftCardProgress;
window.bookSession = bookSession;
window.subscribeToMealPlan = subscribeToMealPlan;
window.validateForm = validateForm;
window.submitFeedback = submitFeedback;
window.calculateDeliveryFeeFromLocation = calculateDeliveryFeeFromLocation;







// Additional functions for the new pages
function trackUserVisits() {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Track total visits
    userData.totalVisits = (userData.totalVisits || 0) + 1;
    
    // Track last visit
    userData.lastVisit = new Date().toISOString();
    
    // Track visit days
    const today = new Date().toLocaleDateString();
    if (!userData.visitDays) userData.visitDays = [];
    if (!userData.visitDays.includes(today)) {
        userData.visitDays.push(today);
    }
    
    localStorage.setItem('userData', JSON.stringify(userData));
    return userData;
}

function calculateWeekendBonus(totalSpent, visits) {
    const weekendMultiplier = 1.5; // 50% bonus on weekends
    const visitBonus = visits * 0.02; // 2% per visit
    return (totalSpent * weekendMultiplier) + (totalSpent * visitBonus);
}

// Initialize all services
document.addEventListener('DOMContentLoaded', function() {
    trackUserVisits();
    
    // Update gift card progress if on gift cards page
    if (document.getElementById('giftCardProgress')) {
        updateGiftCardProgress();
    }
    
    // Initialize any other page-specific functionality
    console.log('FoodHub Services initialized');
});








// footer.js - Footer functionality

document.addEventListener('DOMContentLoaded', function() {
    // Back to top functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate newsletter subscription
                subscribeToNewsletter(email);
                emailInput.value = '';
                
                // Show success message
                showNotification('Successfully subscribed to newsletter!', 'success');
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        });
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter subscription function
function subscribeToNewsletter(email) {
    // In a real application, you would send this to your backend
    console.log('Subscribing email:', email);
    
    // Store in localStorage for demo purposes
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    }
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// Intersection Observer for footer animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe footer sections when added to DOM
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.footer-section').forEach(section => {
        observer.observe(section);
    });
});