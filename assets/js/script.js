document.addEventListener('DOMContentLoaded', () => {
    // Translations
    const translations = {
        en: {
            nav: {
                home: "Home",
                about: "About",
                contact: "Contact"
            },
            hero: {
                title: ".NET/React Software Engineer",
                subtitle: "Full-stack development, Team Leadership, and Cloud Solutions. Based in Warsaw, Poland.",
                cta: "Get in Touch"
            },
            about: {
                title: "About Me",
                p1: "I worked as a full stack ASP.NET/React developer most of the time. I have several years of experience of leading a team.",
                p2: "As a solo entrepreneur (JDG) based in Warsaw, Poland, I specialize in delivering high-quality B2B services tailored to your specific needs. I focus on clear communication, timely delivery, and maintainable code.",
                p3: "I actively leverage modern AI tools to enhance productivity and deliver robust solutions faster."
            },
            skills: {
                leadership: "Team Leadership",
                ai: "AI-Assisted Dev"
            },
            contact: {
                title: "Contact",
                subtitle: "Let's Work Together",
                text: "Open for B2B cooperation. Feel free to reach out to discuss your project.",
                linkedin: "LinkedIn Profile",
                github: "GitHub Profile",
                business_details: "Business Details",
                company_name: "Company Name:"
            },
            footer: {
                rights: "All rights reserved."
            },
            cookies: {
                text: "We use cookies to improve your experience and analyze site traffic.",
                accept: "Accept",
                reject: "Reject"
            }
        },
        pl: {
            nav: {
                home: "Strona Główna",
                about: "O Mnie",
                contact: "Kontakt"
            },
            hero: {
                title: "Programista .NET/React",
                subtitle: "Full-stack development, zarządzanie zespołem i rozwiązania chmurowe. Warszawa, Polska.",
                cta: "Skontaktuj się"
            },
            about: {
                title: "O Mnie",
                p1: "Przez większość czasu pracowałem jako programista full stack ASP.NET/React. Mam kilkuletnie doświadczenie w prowadzeniu zespołu.",
                p2: "Jako jednoosobowa działalność gospodarcza (JDG) z siedzibą w Warszawie, specjalizuję się w dostarczaniu wysokiej jakości usług B2B dostosowanych do Twoich potrzeb. Stawiam na jasną komunikację, terminowość i łatwy w utrzymaniu kod.",
                p3: "Aktywnie wykorzystuję nowoczesne narzędzia AI, aby zwiększyć produktywność i szybciej dostarczać solidne rozwiązania."
            },
            skills: {
                leadership: "Zarządzanie Zespołem",
                ai: "Programowanie z AI"
            },
            contact: {
                title: "Kontakt",
                subtitle: "Współpraca",
                text: "Otwarty na współpracę B2B. Zapraszam do kontaktu w celu omówienia projektu.",
                linkedin: "Profil LinkedIn",
                github: "Profil GitHub",
                business_details: "Dane Firmowe",
                company_name: "Nazwa Firmy:"
            },
            footer: {
                rights: "Wszelkie prawa zastrzeżone."
            },
            cookies: {
                text: "Używamy plików cookie, aby poprawić jakość korzystania z serwisu i analizować ruch na stronie.",
                accept: "Akceptuj",
                reject: "Odrzuć"
            }
        }
    };

    // Language Switcher Logic
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('lang', lang);
        });
    });

    function setLanguage(lang) {
        // Update active button state
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[lang];
            
            keys.forEach(k => {
                if (value) value = value[k];
            });

            if (value) {
                element.textContent = value;
            }
        });
        
        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check current theme state (set by head script) and update icon
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                document.documentElement.removeAttribute('data-theme');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));

    // Update Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links (polyfill for older browsers if needed, though CSS scroll-behavior handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    function updateGAConsent(granted) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': granted ? 'granted' : 'denied',
                'analytics_storage': granted ? 'granted' : 'denied'
            });
        }
    }

    const savedConsent = localStorage.getItem('cookieConsent');

    if (!savedConsent) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.remove('hidden');
        }, 1000);
    } else if (savedConsent === 'granted' || savedConsent === 'true') {
        updateGAConsent(true);
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'granted');
        updateGAConsent(true);
        cookieBanner.classList.add('hidden');
    });

    rejectCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'denied');
        updateGAConsent(false);
        cookieBanner.classList.add('hidden');
    });

    // Parallax Effect
    const parallaxContainer = document.querySelector('.parallax-container');
    
    if (parallaxContainer) {
        const updateParallax = () => {
            const scrolled = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight;
            const containerHeight = parallaxContainer.offsetHeight;
            
            // Calculate the maximum scrollable distance of the page
            const maxScroll = documentHeight - windowHeight;
            
            // Calculate the maximum distance the background can move
            // (difference between container height and viewport height)
            const maxTranslate = containerHeight - windowHeight;
            
            if (maxScroll > 0 && maxTranslate > 0) {
                // Map the scroll position to the translation range
                // As we scroll down (scrolled increases), we move the background up (negative translateY)
                // When scrolled == maxScroll, translateY should be -maxTranslate
                const translateValue = (scrolled / maxScroll) * maxTranslate;
                
                parallaxContainer.style.transform = `translateY(-${translateValue}px)`;
            } else {
                parallaxContainer.style.transform = 'translateY(0px)';
            }
        };

        window.addEventListener('scroll', updateParallax);
        window.addEventListener('resize', updateParallax);
        // Initial call to set position
        updateParallax();
    }
});