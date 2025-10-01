// Internationalization (i18n) System
class I18n {
    constructor() {
        this.currentLanguage = 'ar'; // Default language
        this.translations = {};
        // TEMPORARILY ONLY ARABIC - will reactivate when Arabic is complete
        this.supportedLanguages = ['ar'];
        // DISABLED: this.supportedLanguages = ['ar', 'fr', 'en'];
        this.fallbackLanguage = 'ar';
        
        // Initialize
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Load saved language preference
        const savedLang = localStorage.getItem('preferredLanguage') || 'ar';
        await this.loadLanguage(savedLang);
        this.setupLanguageSwitcher();
        
        // Apply translations again after a short delay to ensure DOM is fully rendered
        setTimeout(() => {
            this.applyTranslations();
        }, 100);
    }

    async loadLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Language ${lang} not supported, falling back to ${this.fallbackLanguage}`);
            lang = this.fallbackLanguage;
        }

        try {
            console.log(`Loading language: ${lang}`);
            
            // Essayer plusieurs méthodes pour charger les traductions
            let data = null;
            
            // Méthode 1: Fetch standard
            try {
                const response = await fetch(`translations/${lang}.json`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-cache'
                });
                
                if (response.ok) {
                    data = await response.json();
                    console.log(`Successfully loaded ${lang} via fetch`);
                }
            } catch (fetchError) {
                console.warn(`Fetch failed for ${lang}:`, fetchError);
            }
            
            // Méthode 2: Fallback avec XMLHttpRequest pour Docker/CORS
            if (!data) {
                try {
                    data = await this.loadLanguageXHR(lang);
                    console.log(`Successfully loaded ${lang} via XHR`);
                } catch (xhrError) {
                    console.warn(`XHR failed for ${lang}:`, xhrError);
                }
            }
            
            // Méthode 3: Données embarquées en fallback
            if (!data && lang === this.fallbackLanguage) {
                data = this.getEmbeddedTranslations(lang);
                console.log(`Using embedded translations for ${lang}`);
            }
            
            if (!data) {
                throw new Error(`Failed to load translations for ${lang}`);
            }
            
            // Valider la structure des données
            if (!data[lang] || typeof data[lang] !== 'object') {
                throw new Error(`Invalid translation structure for ${lang}`);
            }
            
            this.translations = data[lang];
            this.currentLanguage = lang;
            
            // Save preference
            localStorage.setItem('preferredLanguage', lang);
            
            // Apply translations
            this.applyTranslations();
            this.updatePageAttributes();
            
            console.log(`Language successfully loaded and applied: ${lang}`);
            
        } catch (error) {
            console.error('Error loading language:', error);
            if (lang !== this.fallbackLanguage) {
                console.log(`Falling back to ${this.fallbackLanguage}`);
                await this.loadLanguage(this.fallbackLanguage);
            } else {
                // Dernière solution: traductions de base embarquées
                this.useBasicTranslations();
            }
        }
    }

    applyTranslations() {
        console.log('Applying translations...', this.currentLanguage, Object.keys(this.translations || {}));
        
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`Found ${elements.length} elements with data-i18n attributes`);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation && translation !== key) {
                // Check if element has data-i18n-attr for attributes
                const attr = element.getAttribute('data-i18n-attr');
                if (attr) {
                    element.setAttribute(attr, translation);
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`No translation found for key: ${key}`);
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            if (translation && translation !== key) {
                element.placeholder = translation;
            }
        });

        // Update select options
        this.updateSelectOptions();
    }

    updateSelectOptions() {
        // Update contact form subject options
        const subjectSelect = document.querySelector('select[name="subject"]');
        if (subjectSelect && this.translations.contact?.form?.subjects) {
            const subjects = this.translations.contact.form.subjects;
            const options = subjectSelect.querySelectorAll('option[data-value]');
            
            options.forEach(option => {
                const value = option.getAttribute('data-value');
                if (subjects[value]) {
                    option.textContent = subjects[value];
                }
            });
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation not found: ${key}`);
                return key; // Return key as fallback
            }
        }
        
        return value;
    }

    updatePageAttributes() {
        // Update HTML attributes
        const html = document.documentElement;
        html.setAttribute('lang', this.currentLanguage);
        html.setAttribute('dir', this.translations.direction || 'rtl');
        
        // Update font family
        if (this.translations.font) {
            document.body.style.fontFamily = this.translations.font;
        }

        // Update active language button
        this.updateLanguageButtons();
    }

    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
    }

    setupLanguageSwitcher() {
        console.log('Setting up language switcher...');
        console.log('Supported languages (Arabic-only mode):', this.supportedLanguages);
        
        // Add event listeners to existing buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        console.log('Found language buttons:', langButtons.length);
        
        langButtons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            
            // Only enable Arabic button in current mode
            if (this.supportedLanguages.includes(lang)) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Language button clicked:', lang);
                    this.switchLanguage(lang);
                });
            } else {
                // Disable other language buttons
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                btn.title = 'Temporarily disabled - Arabic completion in progress';
            }
        });

        // Update active state
        this.updateLanguageButtons();
    }

    async switchLanguage(lang) {
        console.log('Switching to language:', lang);
        if (lang && lang !== this.currentLanguage) {
            await this.loadLanguage(lang);
        }
    }

    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn" data-lang="ar" title="العربية">عربي</button>
            <button class="lang-btn" data-lang="fr" title="Français">FR</button>
            <button class="lang-btn" data-lang="en" title="English">EN</button>
        `;

        // Add to header
        const navbar = document.querySelector('.nav-container');
        if (navbar) {
            navbar.appendChild(switcher);
        }
        
        // Add event listeners immediately after creation
        const langButtons = switcher.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                console.log('Language button clicked:', lang);
                this.switchLanguage(lang);
            });
        });
    }

    async switchLanguage(lang) {
        console.log(`Switching from ${this.currentLanguage} to ${lang}`);
        if (lang !== this.currentLanguage && this.supportedLanguages.includes(lang)) {
            // Add loading state
            document.body.classList.add('i18n-loading');
            
            try {
                await this.loadLanguage(lang);
                
                // Trigger custom event
                const event = new CustomEvent('languageChanged', {
                    detail: { 
                        oldLang: this.currentLanguage, 
                        newLang: lang 
                    }
                });
                document.dispatchEvent(event);
                
                console.log(`Language switched successfully to ${lang}`);
            } catch (error) {
                console.error('Error switching language:', error);
            } finally {
                // Remove loading state
                document.body.classList.remove('i18n-loading');
            }
        }
    }

    // Méthode XHR alternative pour les problèmes CORS
    loadLanguageXHR(lang) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `translations/${lang}.json`, true);
            xhr.setRequestHeader('Accept', 'application/json');
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            resolve(data);
                        } catch (parseError) {
                            reject(new Error(`Failed to parse JSON for ${lang}: ${parseError.message}`));
                        }
                    } else {
                        reject(new Error(`HTTP error: ${xhr.status}`));
                    }
                }
            };
            
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.send();
        });
    }
    
    // Traductions de base embarquées en cas d'échec total
    getEmbeddedTranslations(lang) {
        const embedded = {
            ar: {
                direction: 'rtl',
                font: "'Cairo', 'Amiri', sans-serif",
                navigation: {
                    home: 'الرئيسية',
                    about: 'عن الجمعية',
                    services: 'خدماتنا',
                    contact: 'اتصل بنا'
                },
                hero: {
                    title: 'نحو عدالة أسرية حقيقية',
                    subtitle: 'الجمعية المغربية للدفاع عن حقوق الأب والأبناء'
                }
            },
            fr: {
                direction: 'ltr',
                font: "'Inter', 'Roboto', sans-serif",
                navigation: {
                    home: 'Accueil',
                    about: 'À propos',
                    services: 'Nos services',
                    contact: 'Contact'
                },
                hero: {
                    title: 'Vers une vraie justice familiale',
                    subtitle: 'Association Marocaine pour la Défense des Droits du Père et des Enfants'
                }
            },
            en: {
                direction: 'ltr',
                font: "'Inter', 'Roboto', sans-serif",
                navigation: {
                    home: 'Home',
                    about: 'About Us',
                    services: 'Our Services',
                    contact: 'Contact'
                },
                hero: {
                    title: 'Towards Real Family Justice',
                    subtitle: 'Moroccan Association for the Defense of Fathers and Children Rights'
                }
            }
        };
        
        return { [lang]: embedded[lang] || embedded.ar };
    }
    
    // Utilisation des traductions de base si tout échoue
    useBasicTranslations() {
        console.warn('Using basic embedded translations');
        const basicData = this.getEmbeddedTranslations(this.fallbackLanguage);
        this.translations = basicData[this.fallbackLanguage];
        this.currentLanguage = this.fallbackLanguage;
        this.applyTranslations();
        this.updatePageAttributes();
    }

    getSupportedLanguages() {
        return this.supportedLanguages;
    }

    // Helper method for dynamic content
    t(key, params = {}) {
        let translation = this.getTranslation(key);
        
        // Simple parameter replacement
        if (typeof translation === 'string' && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
                translation = translation.replace(`{{${param}}}`, params[param]);
            });
        }
        
        return translation;
    }

    // Format numbers based on language
    formatNumber(number) {
        const locale = {
            'ar': 'ar-MA',
            'fr': 'fr-MA',
            'en': 'en-US'
        }[this.currentLanguage] || 'ar-MA';

        return new Intl.NumberFormat(locale).format(number);
    }
}

// Initialize i18n system when DOM is ready
let i18n;

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing i18n...');
    i18n = new I18n();
    window.i18n = i18n;
    
    // Wait a bit for the i18n to fully initialize
    setTimeout(() => {
        if (i18n && i18n.applyTranslations) {
            console.log('Re-applying translations after DOM ready');
            i18n.applyTranslations();
        }
    }, 500);
});

// Fallback for already loaded DOM
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already ready, initializing i18n immediately...');
    i18n = new I18n();
    window.i18n = i18n;
}

// Export for global use
window.I18n = I18n;

// Event listener for dynamic content updates
document.addEventListener('languageChanged', (event) => {
    console.log(`Language changed from ${event.detail.oldLang} to ${event.detail.newLang}`);
    
    // Update stats when language changes
    updateStatsNumbers();
});

// Helper function to update numbers in stats
function updateStatsNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(element => {
        const number = parseInt(element.textContent.replace(/[^\d]/g, ''));
        if (!isNaN(number)) {
            element.textContent = i18n.formatNumber(number) + '+';
        }
    });
}