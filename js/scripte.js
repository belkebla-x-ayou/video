/**
 * ANISAPHIR - Comprehensive JavaScript Controller
 * Features:
 * 1. Background Interactive Sapphire Particles (Canvas)
 * 2. Multi-Language System (FR / EN / AR + Auto-detect & RTL)
 * 3. Typewriter Effect (Hero Subtitle)
 * 4. Custom Right Click Context Menu
 * 5. Floating Toast Notifications
 * 6. ScrollSpy & Navigation Elevation
 * 7. External Link Security
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. INTERACTIVE SAPPHIRE PARTICLES (CANVAS)
    // ==========================================
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.min(65, Math.floor(window.innerWidth / 20));

        const mouse = { x: null, y: null, radius: 130 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.2 + 0.8;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.color = Math.random() > 0.4 ? '#38bdf8' : '#2563eb';
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > width) this.speedX *= -1;
                if (this.y < 0 || this.y > height) this.speedY *= -1;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= (dx / distance) * force * 2;
                        this.y -= (dy / distance) * force * 2;
                    }
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.save();
                        ctx.globalAlpha = (1 - dist / 100) * 0.15;
                        ctx.strokeStyle = '#38bdf8';
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                particles[a].update();
                particles[a].draw();
            }

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }


    // ==========================================
    // 2. MULTI-LANGUAGE TRANSLATIONS
    // ==========================================
    const translations = {
        fr: {
            langCode: 'FR',
            nextLang: 'EN',
            dir: 'ltr',
            navHome: 'Accueil',
            navAbout: 'À propos',
            navContact: 'Contact',
            heroBtnDiscover: 'Découvrir',
            heroBtnContact: 'Contactez-moi',
            typewriterPhrases: [
                "Bienvenue sur la chaîne officielle Anisaphir",
                "Les meilleures sélections Anime & Manga",
                "Le meilleur contenu repartagé pour vous"
            ],
            presentationText: "ANISAPHIR. est mas petite channe qui j'ais fais pour que elle vas etre pour le grands publique, et mois je fais pas les video a ma main je fais que republier les video de otre youtuber",
            presentationLike: "Comme",
            contactTitle: "Rejoignez la Communauté",
            footerText: "cody by Anisaphir. &copy; 2026 All rights reserved .",
            menuHome: 'Accueil',
            menuAbout: 'À propos',
            menuContact: 'Contact',
            menuRefresh: 'Actualiser',
            menuCopy: 'Copier le lien',
            toastCopy: 'Lien copié dans le presse-papiers !',
            toastLang: 'Langue : Français'
        },
        en: {
            langCode: 'EN',
            nextLang: 'AR',
            dir: 'ltr',
            navHome: 'Home',
            navAbout: 'About',
            navContact: 'Contact',
            heroBtnDiscover: 'Discover',
            heroBtnContact: 'Contact Me',
            typewriterPhrases: [
                "Welcome to the official Anisaphir channel",
                "Top curated Anime & Manga selections",
                "The best content shared for you"
            ],
            presentationText: "ANISAPHIR is my channel created for everyone, where I curate and share the best videos from great creators.",
            presentationLike: "Such as",
            contactTitle: "Join the Community",
            footerText: "cody by Anisaphir. &copy; 2026 All rights reserved .",
            menuHome: 'Home',
            menuAbout: 'About',
            menuContact: 'Contact',
            menuRefresh: 'Refresh',
            menuCopy: 'Copy Link',
            toastCopy: 'Link copied to clipboard!',
            toastLang: 'Language: English'
        },
        ar: {
            langCode: 'AR',
            nextLang: 'FR',
            dir: 'rtl',
            navHome: 'الرئيسية',
            navAbout: 'عن القناة',
            navContact: 'تواصل معنا',
            heroBtnDiscover: 'اكتشف المزيد',
            heroBtnContact: 'تواصل معي',
            typewriterPhrases: [
                "مرحبًا بكم في قناة أنيسفير الرسمية",
                "أفضل مقاطع وفيديوهات الأنمي المختارة",
                "أفضل محتوى معاد مشاركته من أجلكم"
            ],
            presentationText: "أنيسفير. هي قناتي التي أنشأتها للجمهور، حيث أشارك أفضل مقاطع الفيديو المميزة من صناع المحتوى.",
            presentationLike: "مثل",
            contactTitle: "انضم إلى مجتمعنا",
            footerText: "cody by Anisaphir. &copy; 2026 All rights reserved .",
            menuHome: 'الرئيسية',
            menuAbout: 'عن القناة',
            menuContact: 'تواصل معنا',
            menuRefresh: 'تحديث الصفحة',
            menuCopy: 'نسخ رابط الموقع',
            toastCopy: 'تم نسخ الرابط إلى الحافظة!',
            toastLang: 'اللغة: العربية'
        }
    };

    function getInitialLanguage() {
        const savedLang = localStorage.getItem('anisaphir_lang');
        if (savedLang && translations[savedLang]) return savedLang;

        const userLangs = navigator.languages || [navigator.language || 'fr'];
        for (const lang of userLangs) {
            if (!lang) continue;
            const primaryCode = lang.toLowerCase().split('-')[0];
            if (translations[primaryCode]) return primaryCode;
        }
        return 'fr';
    }

    let currentLang = getInitialLanguage();

    function applyLanguage(langKey, showToastNotification = false) {
        if (!translations[langKey]) langKey = 'fr';
        currentLang = langKey;
        localStorage.setItem('anisaphir_lang', langKey);

        const t = translations[langKey];
        document.documentElement.lang = langKey;
        document.documentElement.dir = t.dir;

        // Navigation
        const navLinks = document.querySelectorAll('nav ul li a');
        if (navLinks.length >= 4) {
            navLinks[0].textContent = t.navHome;
            navLinks[1].textContent = t.navAbout;
            navLinks[2].textContent = t.navContact;
            navLinks[3].textContent = `${t.langCode} (${t.nextLang})`;
        }

        // Hero Buttons
        const heroBtnDisc = document.querySelector('.hero-actions .btn-primary');
        const heroBtnCont = document.querySelector('.hero-actions .btn-secondary');
        if (heroBtnDisc) heroBtnDisc.textContent = t.heroBtnDiscover;
        if (heroBtnCont) heroBtnCont.textContent = t.heroBtnContact;

        // Presentation
        const presP1 = document.querySelector('.presentation p:first-of-type');
        const presP2 = document.querySelector('.presentation p:nth-of-type(2)');
        if (presP1) presP1.textContent = t.presentationText;
        if (presP2) presP2.textContent = t.presentationLike;

        // Section Title
        const conTitle = document.querySelector('.contact-section .section-title');
        if (conTitle) conTitle.textContent = t.contactTitle;

        // Footer
        const footerP = document.querySelector('footer p');
        if (footerP) footerP.innerHTML = t.footerText;

        // Context Menu
        const menuItems = document.querySelectorAll('.context-menu .menu-item span:last-child');
        if (menuItems.length >= 5) {
            menuItems[0].textContent = t.menuHome;
            menuItems[1].textContent = t.menuAbout;
            menuItems[2].textContent = t.menuContact;
            menuItems[3].textContent = t.menuRefresh;
            menuItems[4].textContent = t.menuCopy;
        }

        // Restart typewriter with new phrases
        startTypewriter(t.typewriterPhrases);

        if (showToastNotification) {
            showToast(t.toastLang);
        }
    }

    const langSwitchBtn = document.querySelector('nav ul li:last-child a');
    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const order = ['fr', 'en', 'ar'];
            const nextIndex = (order.indexOf(currentLang) + 1) % order.length;
            applyLanguage(order[nextIndex], true);
        });
    }


    // ==========================================
    // 3. TYPEWRITER EFFECT
    // ==========================================
    let typewriterTimeout = null;
    function startTypewriter(phrases) {
        if (!phrases || phrases.length === 0) return;
        const textElement = document.getElementById('typewriter-text');
        if (!textElement) return;

        if (typewriterTimeout) clearTimeout(typewriterTimeout);

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            typewriterTimeout = setTimeout(typeLoop, typingSpeed);
        }

        typeLoop();
    }


    // ==========================================
    // 4. TOAST NOTIFICATION SYSTEM
    // ==========================================
    function showToast(message, duration = 2800) {
        let toast = document.getElementById('anisaphir-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'anisaphir-toast';
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');

        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        toast.timeoutId = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }


    // ==========================================
    // 5. CUSTOM CONTEXT MENU (RIGHT CLICK)
    // ==========================================
    const contextMenu = document.getElementById('custom-context-menu');
    if (contextMenu) {
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            const menuWidth = 230;
            const menuHeight = 280;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let posX = e.clientX;
            let posY = e.clientY;

            if (posX + menuWidth > windowWidth) {
                posX = windowWidth - menuWidth - 12;
            }
            if (posY + menuHeight > windowHeight) {
                posY = windowHeight - menuHeight - 12;
            }

            contextMenu.style.left = `${Math.max(10, posX)}px`;
            contextMenu.style.top = `${Math.max(10, posY)}px`;
            contextMenu.classList.add('show');
        });

        window.addEventListener('click', (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.classList.remove('show');
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') contextMenu.classList.remove('show');
        });

        window.addEventListener('scroll', () => {
            contextMenu.classList.remove('show');
        }, { passive: true });

        const copyLinkItem = contextMenu.querySelector('.menu-item:last-child');
        if (copyLinkItem) {
            copyLinkItem.onclick = () => {
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        const t = translations[currentLang] || translations.fr;
                        showToast(t.toastCopy);
                        contextMenu.classList.remove('show');
                    })
                    .catch(() => {
                        showToast('URL: ' + window.location.href);
                    });
            };
        }
    }


    // ==========================================
    // 6. SCROLLSPY & HEADER SCROLLED
    // ==========================================

    // ==========================================
    // THEME SWITCHER (BUTTON + CONTEXT MENU)
    // ==========================================
    const themeBtn = document.getElementById('theme-btn');
    const contextThemeBtn = document.getElementById('context-theme-btn');
    const themeNameEl = document.getElementById('theme-name');

    const themes = ['sapphire', 'midnight', 'solar', 'emerald'];

    function formatThemeLabel(theme) {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }

    function getSavedTheme() {
        const saved = localStorage.getItem('anisaphir_theme');
        if (saved && themes.includes(saved)) return saved;
        const docTheme = document.documentElement.getAttribute('data-theme');
        return docTheme && themes.includes(docTheme) ? docTheme : themes[0];
    }

    function applyTheme(theme, showToastNotification = true) {
        if (!themes.includes(theme)) theme = themes[0];
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('anisaphir_theme', theme);
        if (themeNameEl) themeNameEl.textContent = formatThemeLabel(theme);
        if (showToastNotification) showToast('Thème : ' + formatThemeLabel(theme));
    }

    function cycleTheme() {
        const current = getSavedTheme();
        const idx = themes.indexOf(current);
        const next = themes[(idx + 1) % themes.length];
        applyTheme(next);
    }

    // Initialize theme on load
    applyTheme(getSavedTheme(), false);

    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cycleTheme();
        });
    }

    if (contextThemeBtn) {
        contextThemeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cycleTheme();
            if (contextMenu) contextMenu.classList.remove('show');
        });
    }
    
    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('nav ul li a[href^="#"]');
    const headerEl = document.querySelector('header');

    function onScroll() {
        const scrollPosition = window.scrollY + 140;

        if (headerEl) {
            if (window.scrollY > 30) {
                headerEl.classList.add('scrolled');
            } else {
                headerEl.classList.remove('scrolled');
            }
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navAnchors.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    // ==========================================
    // 7. FIX EXTERNAL LINKS SECURITY
    // ==========================================
    document.querySelectorAll('a').forEach(link => {
        let href = link.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Initialize Language & Typewriter on start
    applyLanguage(currentLang, false);
});
