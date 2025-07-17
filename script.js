document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fa fa-bars"></i>';
    document.querySelector('.header').insertBefore(mobileMenuToggle, document.querySelector('.nav'));
    
    const navList = document.querySelector('.nav-list');
    
    mobileMenuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        mobileMenuToggle.innerHTML = navList.classList.contains('active') ? 
            '<i class="fa fa-times"></i>' : '<i class="fa fa-bars"></i>';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if(navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fa fa-bars"></i>';
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            let isValid = true;
            
            if(!name.value.trim()) {
                name.style.borderColor = 'red';
                isValid = false;
            } else {
                name.style.borderColor = '#ddd';
            }
            
            if(!email.value.trim() || !email.value.includes('@')) {
                email.style.borderColor = 'red';
                isValid = false;
            } else {
                email.style.borderColor = '#ddd';
            }
            
            if(!message.value.trim()) {
                message.style.borderColor = 'red';
                isValid = false;
            } else {
                message.style.borderColor = '#ddd';
            }
            
            if(!isValid) {
                e.preventDefault();
                alert('Please fill in all fields correctly');
            } else {
                // In a real app, you would submit the form here
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                e.preventDefault();
            }
        });
    }

    // Portfolio slider
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if(portfolioSlider) {
        const portfolioImages = portfolioSlider.querySelectorAll('img');
        let currentPortfolioIndex = 0;
        
        function showPortfolioImage(index) {
            portfolioImages.forEach(img => img.classList.remove('active'));
            portfolioImages[index].classList.add('active');
        }
        
        document.querySelector('.slider-next').addEventListener('click', function() {
            currentPortfolioIndex = (currentPortfolioIndex + 1) % portfolioImages.length;
            showPortfolioImage(currentPortfolioIndex);
        });
        
        document.querySelector('.slider-prev').addEventListener('click', function() {
            currentPortfolioIndex = (currentPortfolioIndex - 1 + portfolioImages.length) % portfolioImages.length;
            showPortfolioImage(currentPortfolioIndex);
        });
        
        // Auto-rotate every 5 seconds
        setInterval(function() {
            currentPortfolioIndex = (currentPortfolioIndex + 1) % portfolioImages.length;
            showPortfolioImage(currentPortfolioIndex);
        }, 5000);
        
        // Initialize
        showPortfolioImage(0);
    }

    // Testimonials slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if(testimonialItems.length > 0) {
        let currentTestimonialIndex = 0;
        
        function showTestimonial(index) {
            testimonialItems.forEach(item => item.classList.remove('active'));
            testimonialItems[index].classList.add('active');
        }
        
        document.querySelector('.testimonial-next').addEventListener('click', function() {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
        });
        
        document.querySelector('.testimonial-prev').addEventListener('click', function() {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
        });
        
        // Auto-rotate every 7 seconds
        setInterval(function() {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
        }, 7000);
        
        // Initialize
        showTestimonial(0);
    }

    // Add to cart functionality
    let cartCount = 0;
    const cartCounter = document.querySelector('.cart-counter');
    
    document.querySelectorAll('.product-btn, .featured-btn').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-item, .featured-item');
            const productName = product.querySelector('h3').textContent;
            
            cartCount++;
            cartCounter.textContent = cartCount;
            
            // Add animation
            cartCounter.classList.add('pulse');
            setTimeout(() => {
                cartCounter.classList.remove('pulse');
            }, 300);
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `${productName} added to cart!`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            
            if(email.value && email.value.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                email.style.borderColor = 'red';
                alert('Please enter a valid email address');
            }
        });
    }

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.style.background = 'rgba(51, 51, 51, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = '#333';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-item, .product-item, .featured-item, .team-member, .blog-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-item, .product-item, .featured-item, .team-member, .blog-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Additional CSS for animations
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .cart-notification.show {
        transform: translateX(0);
    }
    
    .pulse {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .mobile-menu-toggle {
        display: none;
        cursor: pointer;
        font-size: 24px;
        color: white;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-list {
            display: none;
            width: 100%;
            text-align: center;
        }
        
        .nav-list.active {
            display: flex;
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);