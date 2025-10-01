// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips for better UX
    initializeTooltips();
    
    // Mobile Navigation with improved accessibility
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    function toggleMobileMenu() {
        const isExpanded = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Focus management
        if (!isExpanded) {
            // When opening menu, focus first nav link
            const firstNavLink = navMenu.querySelector('.nav-link');
            if (firstNavLink) firstNavLink.focus();
        }
    }
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Also support keyboard activation
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach((section, index) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .about-item, .testimonial-card, .right-item').forEach(el => {
        observer.observe(el);
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show success message
                showMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                
                // Reset form
                this.reset();
            } else {
                showMessage('يرجى ملء جميع الحقول المطلوبة.', 'error');
            }
        });
    }

    // Form Validation
    function validateForm(data) {
        return data.name && data.email && data.subject && data.message;
    }

    // Show Message Function
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.innerHTML = `
            <p>${message}</p>
            <button class="close-message" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Insert message
        contactForm.insertBefore(messageEl, contactForm.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentElement) {
                messageEl.remove();
            }
        }, 5000);
    }

    // Calculate years since founding
    function calculateYearsSince2023() {
        const foundingYear = 2023;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
        
        // Calculate years, adding 1 if we're past the founding month
        let years = currentYear - foundingYear;
        
        // If it's 2023, show "1+" otherwise calculate actual difference
        if (years === 0) {
            years = 1;
        } else {
            years = years + 1; // Add 1 to show ongoing year
        }
        
        return years;
    }

    // Update years stat
    const yearsStatElement = document.querySelector('.about-stats .stat-item:nth-child(3) .stat-number');
    if (yearsStatElement) {
        const calculatedYears = calculateYearsSince2023();
        yearsStatElement.textContent = calculatedYears + '+';
        yearsStatElement.setAttribute('data-target', calculatedYears);
    }

    // Update copyright year dynamically
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
        copyrightYearElement.textContent = new Date().getFullYear();
    }

    // Statistics Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            // Check if counter has data-target attribute, otherwise parse from text
            const targetValue = counter.getAttribute('data-target') || counter.textContent.replace('+', '');
            const target = parseInt(targetValue);
            const increment = target / 200;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + '+';
            }, 10);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'العودة إلى الأعلى');
    document.body.appendChild(backToTopButton);

    // Show/Hide Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Back to Top Functionality
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Tab Functionality for Rights Section
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName('tab-content');
    const tablinks = document.getElementsByClassName('tab-button');
    
    // Hide all tab content
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }
    
    // Remove active class from all tab buttons
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }
    
    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const debouncedScrollHandler = debounce(() => {
    highlightNavigation();
}, 10);

// Replace the scroll event listener
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility Improvements
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Enter key for button-like elements
    if (e.key === 'Enter' && e.target.classList.contains('tab-button')) {
        e.target.click();
    }
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Tooltip Initialization and Enhancement
function initializeTooltips() {
    // Enhanced tooltip functionality for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(44, 85, 48, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced tooltip functionality for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.backgroundColor = 'rgba(44, 85, 48, 0.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '';
        });
    });

    // Add visual feedback for all elements with title attributes
    const elementsWithTitles = document.querySelectorAll('[title]');
    elementsWithTitles.forEach(element => {
        // Add a subtle glow effect on hover for elements with tooltips
        element.addEventListener('mouseenter', function() {
            if (!this.classList.contains('service-card') && !this.classList.contains('contact-item')) {
                this.style.filter = 'brightness(1.1)';
                this.style.transition = 'all 0.3s ease';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (!this.classList.contains('service-card') && !this.classList.contains('contact-item')) {
                this.style.filter = '';
            }
        });
    });
}

// Dahir Tooltip Management
function toggleDahirTooltip() {
    const tooltip = document.getElementById('dahirTooltip');
    const overlay = document.getElementById('tooltipOverlay');
    
    if (!overlay) {
        // Create overlay if it doesn't exist
        const newOverlay = document.createElement('div');
        newOverlay.id = 'tooltipOverlay';
        newOverlay.className = 'tooltip-overlay';
        newOverlay.onclick = toggleDahirTooltip;
        document.body.appendChild(newOverlay);
    }
    
    const overlayElement = document.getElementById('tooltipOverlay');
    
    if (tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
        overlayElement.classList.remove('show');
        document.body.style.overflow = '';
    } else {
        tooltip.classList.add('show');
        overlayElement.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Close tooltip with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const tooltip = document.getElementById('dahirTooltip');
        const overlay = document.getElementById('tooltipOverlay');
        
        if (tooltip && tooltip.classList.contains('show')) {
            tooltip.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
});
