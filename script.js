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











// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Menu Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    currentTestimonial = index;
}

prevBtn.addEventListener('click', () => {
    let index = currentTestimonial - 1;
    if (index < 0) {
        index = testimonials.length - 1;
    }
    showTestimonial(index);
});

nextBtn.addEventListener('click', () => {
    let index = currentTestimonial + 1;
    if (index >= testimonials.length) {
        index = 0;
    }
    showTestimonial(index);
});

// Auto-rotate testimonials
setInterval(() => {
    let index = currentTestimonial + 1;
    if (index >= testimonials.length) {
        index = 0;
    }
    showTestimonial(index);
}, 5000);

// Quote Form Submission
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    // For demonstration, we'll just show an alert
    alert(`Thank you ${data.name}! Your catering quote request has been submitted. We will contact you at ${data.email} within 24 hours.`);
    
    // Reset form
    this.reset();
});

// Date validation - prevent past dates
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Smooth scrolling for anchor links
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

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .menu-item, .gallery-item, .payment-method');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
document.querySelectorAll('.service-card, .menu-item, .gallery-item, .payment-method').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Trigger once on page load
window.addEventListener('load', animateOnScroll);



































/*js for ordering.html */
// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.deliveryFee = 3000;
        this.init();
    }

    init() {
        this.loadCart();
        this.updateCartUI();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.btn-add').forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.closest('.btn-add');
                const itemName = item.getAttribute('data-item');
                const itemPrice = parseInt(item.getAttribute('data-price'));
                this.addItem(itemName, itemPrice);
            });
        });

        // Cart icon click
        document.querySelector('.cart-icon').addEventListener('click', () => {
            this.openCart();
        });

        // Close cart
        document.getElementById('closeCart').addEventListener('click', () => {
            this.closeCart();
        });

        // Cart overlay click
        document.getElementById('cartOverlay').addEventListener('click', () => {
            this.closeCart();
        });

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });

        // Category filters
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterMenu(filter);
                
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            });
        });

        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = card.getAttribute('data-category');
                this.filterMenu(category);
                
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');
            });
        });
    }

    addItem(name, price) {
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showAddToCartAnimation();
    }

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(name, change) {
        const item = this.items.find(item => item.name === name);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                this.removeItem(name);
            } else {
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('foodhub-cart', JSON.stringify(this.items));
    }

    loadCart() {
        const savedCart = localStorage.getItem('foodhub-cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');

        // Update cart count
        cartCount.textContent = this.getItemCount();

        // Update cart items
        if (this.items.length === 0) {
            emptyCart.style.display = 'block';
            cartItems.innerHTML = '';
            cartItems.appendChild(emptyCart);
        } else {
            emptyCart.style.display = 'none';
            cartItems.innerHTML = '';
            
            this.items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h5>${item.name}</h5>
                        <div class="cart-item-price">UGX ${item.price.toLocaleString()}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn minus" data-item="${item.name}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-item="${item.name}">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove-item" data-item="${item.name}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });

            // Add event listeners to quantity buttons
            cartItems.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemName = e.target.closest('.quantity-btn').getAttribute('data-item');
                    this.updateQuantity(itemName, -1);
                });
            });

            cartItems.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemName = e.target.closest('.quantity-btn').getAttribute('data-item');
                    this.updateQuantity(itemName, 1);
                });
            });

            cartItems.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemName = e.target.closest('.remove-item').getAttribute('data-item');
                    this.removeItem(itemName);
                });
            });
        }

        // Update totals
        const subtotal = this.getTotal();
        const total = subtotal + this.deliveryFee;

        cartSubtotal.textContent = `UGX ${subtotal.toLocaleString()}`;
        cartTotal.textContent = `UGX ${total.toLocaleString()}`;
    }

    openCart() {
        document.getElementById('cartSidebar').classList.add('active');
        document.getElementById('cartOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        document.getElementById('cartSidebar').classList.remove('active');
        document.getElementById('cartOverlay').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty. Add some items before checking out.');
            return;
        }

        const total = this.getTotal() + this.deliveryFee;
        alert(`Proceeding to checkout! Total: UGX ${total.toLocaleString()}\n\nIn a real application, this would redirect to a payment page.`);
        
        // In a real app, you would redirect to checkout page
        // window.location.href = 'checkout.html';
    }

    showAddToCartAnimation() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('bounce');
        setTimeout(() => {
            cartIcon.classList.remove('bounce');
        }, 1000);
    }

    filterMenu(category) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Search functionality
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', performSearch);
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchBox.value.toLowerCase().trim();
    
    if (searchTerm) {
        const menuItems = document.querySelectorAll('.menu-item');
        let foundItems = 0;
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('h4').textContent.toLowerCase();
            const itemDescription = item.querySelector('p').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                item.style.display = 'block';
                foundItems++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Reset filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        
        if (foundItems === 0) {
            alert(`No items found for "${searchTerm}". Try a different search term.`);
        }
    }
}

// Initialize the shopping cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    
    // Add CSS for bounce animation
    const style = document.createElement('style');
    style.textContent = `
        .bounce {
            animation: bounce 0.5s;
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            80% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
});

// Smooth scrolling for anchor links
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








/*js for giftcard.html */
// Gift Card functionality
class GiftCardSystem {
    constructor() {
        this.selectedAmount = 0;
        this.serviceFee = 0;
        this.giftCardCode = '';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateSampleCode();
    }

    setupEventListeners() {
        // Gift card selection
        document.querySelectorAll('.btn-select').forEach(button => {
            button.addEventListener('click', (e) => {
                const amount = parseInt(e.target.getAttribute('data-amount'));
                this.selectGiftCard(amount);
            });
        });

        // Custom amount selection
        document.querySelector('.btn-select-custom').addEventListener('click', () => {
            const customAmount = parseInt(document.getElementById('customAmount').value);
            if (this.validateCustomAmount(customAmount)) {
                this.selectGiftCard(customAmount);
            }
        });

        // Custom amount input validation
        document.getElementById('customAmount').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value < 25000) {
                e.target.setCustomValidity('Minimum amount is UGX 25,000');
            } else if (value > 500000) {
                e.target.setCustomValidity('Maximum amount is UGX 500,000');
            } else {
                e.target.setCustomValidity('');
            }
        });

        // Form submission
        document.getElementById('giftCardForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processPurchase();
        });

        // Form validation
        document.getElementById('giftCardForm').addEventListener('input', () => {
            this.validateForm();
        });

        // FAQ toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
            });
        });

        // Modal close buttons
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.btn-done').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.btn-print').addEventListener('click', () => {
            window.print();
        });

        // Close modal when clicking outside
        document.getElementById('successModal').addEventListener('click', (e) => {
            if (e.target.id === 'successModal') {
                this.closeModal();
            }
        });
    }

    selectGiftCard(amount) {
        this.selectedAmount = amount;
        this.calculateServiceFee();
        this.updateSummary();
        this.showPurchaseForm();
        this.generateNewCode();
        
        // Scroll to purchase form
        document.getElementById('purchaseForm').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    validateCustomAmount(amount) {
        if (!amount || isNaN(amount)) {
            alert('Please enter a valid amount');
            return false;
        }

        if (amount < 25000) {
            alert('Minimum gift card amount is UGX 25,000');
            return false;
        }

        if (amount > 500000) {
            alert('Maximum gift card amount is UGX 500,000');
            return false;
        }

        return true;
    }

    calculateServiceFee() {
        // Service fee is 2% of the gift card amount, minimum 1000 UGX
        this.serviceFee = Math.max(Math.floor(this.selectedAmount * 0.02), 1000);
    }

    updateSummary() {
        document.getElementById('summaryAmount').textContent = `UGX ${this.selectedAmount.toLocaleString()}`;
        document.getElementById('summaryFee').textContent = `UGX ${this.serviceFee.toLocaleString()}`;
        
        const total = this.selectedAmount + this.serviceFee;
        document.getElementById('summaryTotal').textContent = `UGX ${total.toLocaleString()}`;
        document.getElementById('purchaseTotal').textContent = `UGX ${total.toLocaleString()}`;

        // Update preview
        document.getElementById('previewAmount').textContent = `UGX ${this.selectedAmount.toLocaleString()}`;
    }

    showPurchaseForm() {
        document.getElementById('purchaseForm').classList.add('active');
    }

    generateNewCode() {
        // Generate a random gift card code (in real app, this would come from backend)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
            if (i === 3) code += '-';
        }
        this.giftCardCode = code;
        document.getElementById('previewCode').textContent = code;
    }

    generateSampleCode() {
        // Initial sample code for display
        this.giftCardCode = 'FOOD-2023';
        document.getElementById('previewCode').textContent = this.giftCardCode;
        document.getElementById('modalCode').textContent = this.giftCardCode;
    }

    validateForm() {
        const form = document.getElementById('giftCardForm');
        const purchaseButton = document.querySelector('.btn-purchase');
        const requiredFields = form.querySelectorAll('[required]');
        let allValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allValid = false;
            }
        });

        // Additional validation for custom amount
        if (this.selectedAmount === 0) {
            allValid = false;
        }

        purchaseButton.disabled = !allValid;
    }

    processPurchase() {
        if (this.selectedAmount === 0) {
            alert('Please select a gift card amount first');
            return;
        }

        // Get form data
        const formData = new FormData(document.getElementById('giftCardForm'));
        const data = Object.fromEntries(formData);

        // In a real application, you would send this data to your backend
        // For demonstration, we'll simulate a successful purchase
        
        // Update modal with recipient info
        document.getElementById('modalAmount').textContent = `UGX ${this.selectedAmount.toLocaleString()}`;
        document.getElementById('modalRecipient').textContent = data.recipientName;
        document.getElementById('modalCode').textContent = this.giftCardCode;

        // Show success modal
        this.showSuccessModal();

        // Reset form for next purchase
        this.resetForm();
    }

    showSuccessModal() {
        document.getElementById('successModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('successModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    resetForm() {
        document.getElementById('giftCardForm').reset();
        this.selectedAmount = 0;
        this.serviceFee = 0;
        document.getElementById('purchaseForm').classList.remove('active');
        document.querySelector('.btn-purchase').disabled = true;
        
        // Reset summary
        document.getElementById('summaryAmount').textContent = 'UGX 0';
        document.getElementById('summaryFee').textContent = 'UGX 0';
        document.getElementById('summaryTotal').textContent = 'UGX 0';
        document.getElementById('purchaseTotal').textContent = 'UGX 0';
        document.getElementById('previewAmount').textContent = 'UGX 0';
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .gift-card-option, .faq-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
document.querySelectorAll('.benefit-card, .gift-card-option, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Initialize the gift card system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const giftCardSystem = new GiftCardSystem();
    
    // Trigger once on page load
    window.addEventListener('load', animateOnScroll);
});

// Add some interactive effects for gift cards
document.querySelectorAll('.gift-card-option').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});