// Mobile Menu
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
};

// Smooth Scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Scroll Animations
const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.card, .testimonial-card, .gallery-grid figure, .section-title').forEach(element => {
        observer.observe(element);
    });
};

// Form Handling
const initForms = () => {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            try {
                // Here you would typically send the data to your backend
                // For now, we'll simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            const email = newsletterForm.querySelector('input[type="email"]').value;

            try {
                // Here you would typically send the email to your backend
                // For now, we'll simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } catch (error) {
                console.error('Error subscribing:', error);
                alert('There was an error subscribing. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
};

// Paystack Integration
const initPaystack = () => {
    const paystackBtn = document.getElementById('paystack-btn');
    if (paystackBtn) {
        paystackBtn.addEventListener('click', () => {
            const handler = PaystackPop.setup({
                key: 'pk_test_8911f76a81b1549a484a3a40667e7c674b2a030b', // Replace with your public key
                email: prompt('Please enter your email:') || 'donor@example.com',
                amount: 10000, // Amount in kobo (100 NGN)
                currency: 'NGN',
                ref: '' + Math.floor((Math.random() * 1000000000) + 1),
                callback: function(response) {
                    alert('Thank you for your donation! Transaction reference: ' + response.reference);
                    // Here you would typically verify the payment on your backend
                },
                onClose: function() {
                    alert('Transaction cancelled.');
                }
            });
            handler.openIframe();
        });
    }
};

// Header Scroll Effect
const initHeaderScroll = () => {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
};

// Gallery Image Modal
const initGalleryModal = () => {
    const images = document.querySelectorAll('.gallery-grid img');
    const body = document.body;

    images.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('gallery-modal');
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            
            modal.appendChild(modalImg);
            body.appendChild(modal);

            modal.addEventListener('click', () => {
                modal.remove();
            });
        });
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initForms();
    initPaystack();
    initHeaderScroll();
    initGalleryModal();
});

// Add some basic error handling
window.addEventListener('error', function(e) {
    console.error('Global error handler:', e.error);
});