document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header-content').appendChild(menuToggle);
    
    const nav = document.querySelector('.nav');
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header-section');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'var(--white)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== this && q.parentElement.classList.contains('active')) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause auto-rotation on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(() => {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon at ${email}.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            
            this.reset();
        });
    }
    
    // Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .product-card, .portfolio-item, .team-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .product-card, .portfolio-item, .team-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});



/*

start of ....................................events

*/

// Get elements
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        const promoModal = document.getElementById('promoModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        
        // Show modal when Learn More is clicked
        learnMoreBtn.addEventListener('click', function() {
            promoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        // Close modal
        closeModalBtn.addEventListener('click', function() {
            promoModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close when clicking outside modal
        promoModal.addEventListener('click', function(e) {
            if (e.target === promoModal) {
                promoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });




        
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const wineBtn = document.getElementById('wineTastingBtn');
    const wineModal = document.getElementById('wineModal');
    const closeModal = document.querySelector('.wine-modal .close-modal');
    const form = document.getElementById('wineBookingForm');

    // Open modal
    wineBtn.addEventListener('click', function() {
        wineModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        wineModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside
    wineModal.addEventListener('click', function(e) {
        if (e.target === wineModal) {
            wineModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your wine tasting reservation has been confirmed. We\'ll email you the details.');
        wineModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.reset();
    });
});





document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const registerBtn = document.getElementById('registerCookingBtn');
    const cookingModal = document.getElementById('cookingModal');
    const closeModal = document.querySelector('.close-modal');
    const form = document.getElementById('cookingForm');

    // Open modal
    registerBtn.addEventListener('click', function() {
        cookingModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        cookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside
    cookingModal.addEventListener('click', function(e) {
        if (e.target === cookingModal) {
            cookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for registering! We\'ve sent confirmation details to your email.');
        cookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.reset();
    });
});

/*end of events */




// Current order data
let currentOrder = {};

// Format UGX currency
function formatUGX(amount) {
    return new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX'
    }).format(amount);
}

// Initialize order buttons
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentOrder = {
            item: this.getAttribute('data-item'),
            desc: this.getAttribute('data-desc'),
            price: parseInt(this.getAttribute('data-price')),
            img: this.getAttribute('data-img'),
            qty: 1,
            notes: '',
            customer: {},
            date: new Date().toISOString().split('T')[0]
        };
        
        // Update modal with item info
        document.getElementById('orderItem').textContent = currentOrder.item;
        document.getElementById('orderDesc').textContent = currentOrder.desc;
        document.getElementById('orderPrice').textContent = formatUGX(currentOrder.price);
        document.getElementById('orderImg').src = currentOrder.img;
        document.getElementById('deliveryDate').value = currentOrder.date;
        document.getElementById('deliveryDate').min = currentOrder.date;
        
        // Show modal
        document.getElementById('orderModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Modal navigation
function nextStep() {
    // Save step 1 data
    currentOrder.qty = parseInt(document.getElementById('orderQty').value);
    currentOrder.notes = document.getElementById('orderNotes').value;
    
    // Switch to step 2
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
}

function prevStep() {
    // Switch back to step 1
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
}

// Place order and generate receipt
function placeOrder() {
    // Save delivery info
    currentOrder.customer = {
        name: document.getElementById('deliveryName').value,
        email: document.getElementById('deliveryEmail').value,
        phone: document.getElementById('deliveryPhone').value,
        address: document.getElementById('deliveryAddress').value,
        date: document.getElementById('deliveryDate').value
    };
    
    // Generate receipt
    generateReceipt();
    
    // Go to receipt step
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
}

// Generate receipt HTML
function generateReceipt() {
    const receipt = document.getElementById('receiptContent');
    const total = currentOrder.price * currentOrder.qty;
    const orderDate = new Date().toLocaleString();
    
    receipt.innerHTML = `
        <div class="receipt-header">
            <h3>FoodHub</h3>
            <p>Order Receipt</p>
            <p>${orderDate}</p>
        </div>
        <div class="receipt-item">
            <h4>${currentOrder.item} × ${currentOrder.qty}</h4>
            <p>${currentOrder.desc}</p>
            <p class="price">${formatUGX(currentOrder.price)} each</p>
            ${currentOrder.notes ? `<p><strong>Notes:</strong> ${currentOrder.notes}</p>` : ''}
        </div>
        <div class="receipt-item">
            <h4>Delivery Details</h4>
            <p><strong>Name:</strong> ${currentOrder.customer.name}</p>
            <p><strong>Address:</strong> ${currentOrder.customer.address}</p>
            <p><strong>Date:</strong> ${currentOrder.customer.date}</p>
            <p><strong>Contact:</strong> ${currentOrder.customer.phone}</p>
        </div>
        <div class="receipt-total">
            <h4>Total: ${formatUGX(total)}</h4>
        </div>
        <div class="receipt-thankyou">
            <p>Thank you for your order!</p>
        </div>
    `;
}

// Download receipt as PDF
function downloadReceipt() {
    // Check if html2pdf is available
    if (typeof html2pdf === 'undefined') {
        alert('PDF generation library not loaded. Please try again.');
        return;
    }

    const element = document.getElementById('receiptContent');
    const opt = {
        margin: 10,
        filename: 'FoodHub_Receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            logging: true,
            useCORS: true,
            allowTaint: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Create a clone to prevent CSS issues
    const clone = element.cloneNode(true);
    document.body.appendChild(clone);
    clone.style.visibility = 'hidden';

    // Generate PDF
    html2pdf()
        .from(clone)
        .set(opt)
        .save()
        .then(() => {
            document.body.removeChild(clone);
        });
}

// Close modal
function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset steps
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    // Reset forms
    document.getElementById('orderForm').reset();
    document.getElementById('deliveryForm').reset();
}

// Close when clicking outside
document.getElementById('orderModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close button
document.querySelector('.close-modal').addEventListener('click', closeModal);

 /* products 
 ..
 .
 .
 .
 .
 */
// Current order data

// Format UGX currency
function formatUGX(amount) {
    return new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0
    }).format(amount);
}

// Initialize order buttons
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const price = parseInt(this.getAttribute('data-price'));
        
        currentOrder = {
            item: this.getAttribute('data-item'),
            desc: this.getAttribute('data-desc'),
            price: price,
            img: this.getAttribute('data-img'),
            qty: 1,
            notes: '',
            customer: {},
            date: new Date().toISOString().split('T')[0]
        };
        
        // Update modal with item info
        document.getElementById('orderItem').textContent = currentOrder.item;
        document.getElementById('orderDesc').textContent = currentOrder.desc;
        document.getElementById('orderPrice').textContent = formatUGX(currentOrder.price);
        document.getElementById('orderImg').src = currentOrder.img;
        document.getElementById('deliveryDate').value = currentOrder.date;
        document.getElementById('deliveryDate').min = currentOrder.date;
        
        // Show modal
        document.getElementById('orderModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Modal navigation
function nextStep() {
    // Save step 1 data
    currentOrder.qty = parseInt(document.getElementById('orderQty').value);
    currentOrder.notes = document.getElementById('orderNotes').value;
    
    // Validate quantity
    if (currentOrder.qty < 1) {
        alert('Please enter a valid quantity');
        return;
    }
    
    // Switch to step 2
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
}

function prevStep() {
    // Switch back to step 1
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
}

// Place order and generate receipt
function placeOrder() {
    // Validate delivery form
    const name = document.getElementById('deliveryName').value;
    const email = document.getElementById('deliveryEmail').value;
    const phone = document.getElementById('deliveryPhone').value;
    const address = document.getElementById('deliveryAddress').value;
    const date = document.getElementById('deliveryDate').value;
    const payment = document.getElementById('paymentMethod').value;
    
    if (!name || !email || !phone || !address || !date || !payment) {
        alert('Please fill all delivery information');
        return;
    }
    
    // Save delivery info
    currentOrder.customer = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        date: date,
        payment: payment
    };
    
    // Generate receipt
    generateReceipt();
    
    // Go to receipt step
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
}

// Generate receipt HTML
function generateReceipt() {
    const receipt = document.getElementById('receiptContent');
    const total = currentOrder.price * currentOrder.qty;
    const orderDate = new Date().toLocaleString('en-UG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    receipt.innerHTML = `
        <div class="receipt-header">
            <h3>FoodHub Uganda</h3>
            <p>Order Receipt</p>
            <p>${orderDate}</p>
        </div>
        <div class="receipt-item">
            <h4>${currentOrder.item} × ${currentOrder.qty}</h4>
            <p>${currentOrder.desc}</p>
            <p class="price">${formatUGX(currentOrder.price)} each</p>
            ${currentOrder.notes ? `<p><strong>Notes:</strong> ${currentOrder.notes}</p>` : ''}
        </div>
        <div class="receipt-item">
            <h4>Delivery Details</h4>
            <p><strong>Name:</strong> ${currentOrder.customer.name}</p>
            <p><strong>Address:</strong> ${currentOrder.customer.address}</p>
            <p><strong>Date:</strong> ${currentOrder.customer.date}</p>
            <p><strong>Phone:</strong> ${currentOrder.customer.phone}</p>
            <p><strong>Payment:</strong> ${currentOrder.customer.payment}</p>
        </div>
        <div class="receipt-total">
            <h4>Total: ${formatUGX(total)}</h4>
        </div>
        <div class="receipt-thankyou">
            <p>Thank you for your order!</p>
            <p>We'll contact you to confirm delivery.</p>
        </div>
    `;
}

// Download receipt as PDF
function downloadReceipt() {
    // Check if html2pdf is available
    if (typeof html2pdf === 'undefined') {
        alert('PDF generation is currently unavailable. Please try again later.');
        return;
    }

    const element = document.getElementById('receiptContent');
    const opt = {
        margin: 10,
        filename: `FoodHub_Order_${Date.now()}.pdf`,
        image: { 
            type: 'jpeg', 
            quality: 0.98 
        },
        html2canvas: { 
            scale: 2,
            logging: true,
            useCORS: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };
     

    
    // Create clone to prevent CSS issues
    const clone = element.cloneNode(true);
    document.body.appendChild(clone);
    clone.style.visibility = 'hidden';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';

    // Generate PDF
    html2pdf()
        .set(opt)
        .from(clone)
        .save()
        .then(() => {
            document.body.removeChild(clone);
        })
        .catch(err => {
            console.error('Error generating PDF:', err);
            alert('Error generating receipt. Please try again.');
            document.body.removeChild(clone);
        });
}

// Close modal
function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset steps
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    // Reset forms
    document.getElementById('orderForm').reset();
    document.getElementById('deliveryForm').reset();
}

// Close when clicking outside
document.getElementById('orderModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close button
document.querySelector('.close-modal').addEventListener('click', closeModal);

function downloadReceipt() {
    try {
        // 1. Get the receipt element
        const element = document.getElementById('receiptContent');
        if (!element) throw new Error("Receipt content not found");
        
        // 2. Create a clean clone
        const clone = element.cloneNode(true);
        
        // 3. Apply PDF-friendly styles
        clone.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white;
            color: black !important;
            font-family: Arial, sans-serif !important;
            visibility: visible;
            opacity: 1;
            z-index: 9999;
        `;
        
        // 4. Add to DOM temporarily
        document.body.appendChild(clone);
        
        // 5. Generate PDF with proper settings
        const opt = {
            margin: 10,
            filename: `FoodHub_Receipt_${new Date().getTime()}.pdf`,
            image: { 
                type: 'jpeg', 
                quality: 1 
            },
            html2canvas: { 
                scale: 2,
                logging: true,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#FFFFFF',
                ignoreElements: (element) => {
                    // Skip any problematic elements
                    return false;
                }
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait'
            }
        };

        // 6. Generate and download
        html2pdf()
            .set(opt)
            .from(clone)
            .save()
            .then(() => {
                // 7. Clean up
                document.body.removeChild(clone);
            })
            .catch(err => {
                document.body.removeChild(clone);
                throw err;
            });

    } catch (error) {
        console.error("Receipt generation failed:", error);
        alert("Could not generate receipt. Please try again or contact support.");
    }
}















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










// auth.js - Authentication system */
// Simple Auth System for Header
    class HeaderAuth {
        constructor() {
            this.currentUser = null;
            this.checkAuth();
        }

        checkAuth() {
            // Check if user is logged in
            const session = localStorage.getItem('foodhub_session');
            if (session) {
                this.currentUser = JSON.parse(session);
                this.updateHeader(true);
            } else {
                this.updateHeader(false);
            }
        }

        updateHeader(isLoggedIn) {
            const authElement = document.querySelector('.auth-element');
            const userElement = document.querySelector('.user-element');
            
            if (isLoggedIn && this.currentUser) {
                // User is logged in
                authElement.style.display = 'none';
                userElement.style.display = 'block';
                
                // Update user info
                const userName = document.getElementById('headerUserName');
                const userAvatar = document.getElementById('headerUserAvatar');
                
                userName.textContent = this.currentUser.fullName.split(' ')[0];
                userAvatar.textContent = this.getUserInitials(this.currentUser.fullName);
            } else {
                // User is not logged in
                authElement.style.display = 'flex';
                userElement.style.display = 'none';
            }
        }

        getUserInitials(fullName) {
            return fullName.split(' ').map(n => n[0]).join('').toUpperCase();
        }

        logout() {
            localStorage.removeItem('foodhub_session');
            this.currentUser = null;
            this.updateHeader(false);
            window.location.href = 'index.html';
        }
    }

    // Initialize header auth when page loads
    document.addEventListener('DOMContentLoaded', function() {
        const headerAuth = new HeaderAuth();
        
        // Logout button
        const logoutBtn = document.getElementById('headerLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                headerAuth.logout();
            });
        }

        // Update header when storage changes (for multiple tabs)
        window.addEventListener('storage', function(e) {
            if (e.key === 'foodhub_session') {
                headerAuth.checkAuth();
            }
        });
    });