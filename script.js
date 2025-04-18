document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponents();
    
    // Initialize functionality after components are loaded
    setTimeout(initializeApp, 300);
});

// Component loader function
function loadComponents() {
    // Define components to load
    const components = [
        { id: 'header-container', path: 'components/header.html' },
        { id: 'hero-container', path: 'components/hero.html' },
        { id: 'services-container', path: 'components/services.html' },
        { id: 'about-container', path: 'components/about.html' },
        { id: 'approach-container', path: 'components/approach.html' },
        { id: 'testimonials-container', path: 'components/testimonials.html' },
        { id: 'contact-container', path: 'components/contact.html' },
        { id: 'footer-container', path: 'components/footer.html' }
    ];
    
    // Load each component
    components.forEach(component => {
        fetch(component.path)
            .then(response => response.text())
            .then(html => {
                document.getElementById(component.id).innerHTML = html;
                
                // Special handling for sections with their own IDs
                if (component.id === 'services-container') {
                    document.querySelector('#services-container section').id = 'services';
                } else if (component.id === 'about-container') {
                    document.querySelector('#about-container section').id = 'about';
                } else if (component.id === 'approach-container') {
                    document.querySelector('#approach-container section').id = 'approach';
                } else if (component.id === 'testimonials-container') {
                    document.querySelector('#testimonials-container section').id = 'testimonials';
                } else if (component.id === 'contact-container') {
                    document.querySelector('#contact-container section').id = 'contact';
                }
            })
            .catch(error => {
                console.error(`Error loading component ${component.path}:`, error);
            });
    });
}

function initializeApp() {
    // Initialize mobile menu first
    const mobileMenu = initMobileMenu();
    
    // Then other functions that might depend on components
    initSmoothScrolling(mobileMenu.navLinks);
    initTestimonialsSlider();
    initContactForm();
    initHeaderScrollEffect();
    initScrollAnimations();
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        return {
            navLinks: navLinks
        };
    }
    
    return {
        navLinks: null
    };
}

function initSmoothScrolling(navLinks) {
    setTimeout(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }, 500); // Increased timeout to ensure components are loaded
}

function initTestimonialsSlider() {
    // Wait for testimonials to be loaded
    setTimeout(() => {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        let currentTestimonial = 0;
        
        if (!testimonials.length || !dots.length) return;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        // Initialize slider with first testimonial
        showTestimonial(0);
        
        // Set up dot click event
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto rotate testimonials
        setInterval(() => {
            let nextTestimonial = currentTestimonial + 1;
            if (nextTestimonial >= testimonials.length) {
                nextTestimonial = 0;
            }
            showTestimonial(nextTestimonial);
        }, 7000);
    }, 800);
}

function initContactForm() {
    setTimeout(() => {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) {
            console.error('Форма не найдена!');
            return; // Прерываем выполнение, если форма не загружена
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !phone) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }
            
            // Simulate form submission
            const formData = {
                name,
                email,
                phone,
                service,
                message
            };
            
            console.log('Form submitted:', formData);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <svg width="60" height="60" viewBox="0 0 24 24">
                        <path fill="#4CAF50" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2ZM10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/>
                    </svg>
                    <h3>Спасибо за вашу заявку!</h3>
                    <p>Я свяжусь с вами в ближайшее время.</p>
                </div>
            `;
        });
    }, 800);
}

function initHeaderScrollEffect() {
    // Wait for header to be loaded
    setTimeout(() => {
        const header = document.querySelector('header');
        
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }, 200);
}

function initScrollAnimations() {
    // Wait for elements to be loaded
    setTimeout(() => {
        const animateElements = document.querySelectorAll('.service-card, .step, .about-image, .contact-form');
        
        function checkScroll() {
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight * 0.9) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Initial check
        checkScroll();
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
    }, 800);
}
