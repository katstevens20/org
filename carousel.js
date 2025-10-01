// Enhanced Background Carousel for Hero Section
class HeroCarousel {
    constructor() {
        this.slides = [
            { 
                class: 'moroccan-justice', 
                name: 'العدالة المغربية',
                description: 'عدالة أسرية مستوحاة من التراث المغربي' 
            },
            { 
                class: 'children-rights', 
                name: 'حقوق الطفل',
                description: 'حماية حقوق الأطفال في المجتمع المغربي' 
            },
            { 
                class: 'family-harmony', 
                name: 'الوئام الأسري',
                description: 'تعزيز الحقوق الأسرية والمساواة' 
            }
        ];
        this.currentSlide = 0;
        this.slideInterval = 5000; // 5 seconds
        this.autoPlay = true;
        this.intervalId = null;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.createCarousel();
        this.createIndicators();
        this.addEnhancedControls();
        this.startCarousel();
        this.addEventListeners();
    }

    createCarousel() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create carousel container
        const carousel = document.createElement('div');
        carousel.className = 'hero-carousel';
        carousel.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            overflow: hidden;
        `;

        // Create slides with images + CSS backgrounds as effect
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `carousel-slide ${slide.class}`;
            slideElement.setAttribute('data-slide', index);
            slideElement.setAttribute('aria-label', slide.description);
            
            // Add image layer
            const imageLayer = document.createElement('div');
            imageLayer.className = 'carousel-image-layer';
            imageLayer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0.85;
                mix-blend-mode: screen;
                pointer-events: none;
            `;
            
            // Set image based on slide type
            if (window.CarouselImagesGenerator) {
                switch (slide.class) {
                    case 'moroccan-justice':
                        imageLayer.style.backgroundImage = `url('${CarouselImagesGenerator.generateMoroccanJusticeImage()}')`;
                        break;
                    case 'children-rights':
                        imageLayer.style.backgroundImage = `url('${CarouselImagesGenerator.generateChildrenRightsImage()}')`;
                        break;
                    case 'family-harmony':
                        imageLayer.style.backgroundImage = `url('${CarouselImagesGenerator.generateFamilyHarmonyImage()}')`;
                        break;
                }
            }
            
            slideElement.appendChild(imageLayer);
            
            if (index === 0) slideElement.classList.add('active');
            carousel.appendChild(slideElement);
        });

        hero.insertBefore(carousel, hero.firstChild);
    }

    createIndicators() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';

        this.slides.forEach((slide, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('title', slide.name);
            indicator.setAttribute('aria-label', `الانتقال إلى الشريحة ${index + 1}: ${slide.name}`);
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('tabindex', '0');
            
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                }
            });
            
            indicatorsContainer.appendChild(indicator);
        });

        hero.appendChild(indicatorsContainer);
    }

    addEnhancedControls() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Add navigation arrows
        const navContainer = document.createElement('div');
        navContainer.className = 'carousel-nav';
        navContainer.style.cssText = `
            position: absolute;
            top: 50%;
            width: 100%;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            z-index: 15;
            pointer-events: none;
        `;

        const prevButton = this.createNavButton('السابق', 'left', () => this.previousSlide());
        const nextButton = this.createNavButton('التالي', 'right', () => this.nextSlide());

        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);
        hero.appendChild(navContainer);
    }

    createNavButton(text, direction, callback) {
        const button = document.createElement('button');
        button.className = `carousel-nav-btn carousel-nav-${direction}`;
        button.setAttribute('aria-label', text);
        button.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            pointer-events: auto;
            backdrop-filter: blur(10px);
            opacity: 0.8;
        `;
        
        button.innerHTML = direction === 'left' ? 
            '<i class="fas fa-chevron-left"></i>' : 
            '<i class="fas fa-chevron-right"></i>';
        
        button.addEventListener('click', callback);
        
        // Hover effects
        button.addEventListener('mouseenter', () => {
            button.style.background = 'rgba(212, 175, 55, 0.8)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            button.style.opacity = '1';
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = 'rgba(255, 255, 255, 0.2)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            button.style.opacity = '0.8';
            button.style.transform = 'scale(1)';
        });

        return button;
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        if (slides.length === 0) return;

        // Remove active class from current slide and indicator
        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide index
        this.currentSlide = index;
        
        // Add active class to new slide and indicator
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');

        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1200);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = this.currentSlide === 0 ? 
            this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }

    startCarousel() {
        if (this.intervalId) clearInterval(this.intervalId);
        
        this.intervalId = setInterval(() => {
            if (this.autoPlay && !this.isTransitioning) {
                this.nextSlide();
            }
        }, this.slideInterval);
    }

    pauseCarousel() {
        this.autoPlay = false;
    }

    resumeCarousel() {
        this.autoPlay = true;
    }

    addEventListeners() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Pause on hover
        hero.addEventListener('mouseenter', () => this.pauseCarousel());
        hero.addEventListener('mouseleave', () => this.resumeCarousel());

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        hero.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        hero.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // Visibility API - pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseCarousel();
            } else {
                this.resumeCarousel();
            }
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    
    // Add enhanced scroll indicator
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.style.cssText = `
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 20;
            opacity: 0.8;
            transition: all 0.3s ease;
            animation: bounce 2s infinite;
        `;
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
        scrollIndicator.setAttribute('aria-label', 'التمرير للأسفل');
        scrollIndicator.setAttribute('role', 'button');
        
        hero.appendChild(scrollIndicator);

        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });

        scrollIndicator.addEventListener('mouseenter', () => {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) scale(1.2)';
        });

        scrollIndicator.addEventListener('mouseleave', () => {
            scrollIndicator.style.opacity = '0.8';
            scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
        });
    }
});