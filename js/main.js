/* ==========================================================================
   AFRICONNECT SUMMIT 2026 - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initNavbarScroll();
    initCountdown();
    initSpeakerFilter();
    initBackToTop();
    initCurrentYear();
    initFormValidation();
    initAnimatedCounters();
    initProgramTabs();
});

/* ==========================================================================
   1. GESTION DU THÈME (CLAIR / SOMBRE) & PERSISTANCE
   ========================================================================== */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon(false);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
    });
}

function updateThemeIcon(isDark) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    if (isDark) {
        icon.className = 'bi bi-sun-fill';
    } else {
        icon.className = 'bi bi-moon-fill';
    }
}

/* ==========================================================================
   2. MENU MOBILE RESPONSIVE (HAMBURGER)
   ========================================================================== */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('mobile-active');
        
        const icon = hamburger.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('mobile-active')) {
                icon.className = 'bi bi-x-lg';
            } else {
                icon.className = 'bi bi-list';
            }
        }
    });
}

/* ==========================================================================
   3. EFFET DE FLOU SUR LA NAVBAR AU SCROLL
   ========================================================================== */
function initNavbarScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   4. COMPTE À REBOURS IMMERSIF (PAGE D'ACCUEIL)
   ========================================================================== */
function initCountdown() {
    const targetDate = new Date('November 12, 2026 09:00:00').getTime();
    if (!document.getElementById('days')) return;

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            const container = document.querySelector('.countdown-container');
            if (container) container.innerHTML = "<h3>Le Sommet a commencé !</h3>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================================================
   5. FILTRAGE DYNAMIQUE DES INTERVENANTS (PAGE INTERVENANTS)
   ========================================================================== */
function initSpeakerFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const speakerCards = document.querySelectorAll('.speaker-full-card');

    if (filterButtons.length === 0 || speakerCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            speakerCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   6. BOUTON RETOUR EN HAUT (BACK TO TOP)
   ========================================================================== */
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.style.display = 'flex';
        } else {
            backBtn.style.display = 'none';
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   7. ANNÉE DYNAMIQUE DANS LE FOOTER
   ========================================================================== */
function initCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
}
/* ==========================================================================
   8. VALIDATION DU FORMULAIRE DE CONTACT
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('registration-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        let isValid = true;

        // Fonction utilitaire pour afficher/effacer l'erreur
        const checkField = (fieldId, errorId, condition, errorMsg) => {
            const field = document.getElementById(fieldId);
            const errorElem = document.getElementById(errorId);
            if (!field || !errorElem) return;

            if (condition) {
                errorElem.innerText = errorMsg;
                errorElem.style.color = "#dc3545";
                errorElem.style.fontSize = "0.85rem";
                errorElem.style.marginTop = "4px";
                errorElem.style.display = "block";
                isValid = false;
            } else {
                errorElem.innerText = "";
            }
        };

        // 1. Nom complet (min 3 caractères)
        const fullname = document.getElementById('fullname')?.value.trim() || "";
        checkField('fullname', 'error-fullname', fullname.length < 3, "Le nom doit contenir au moins 3 caractères.");

        // 2. Email
        const email = document.getElementById('email')?.value.trim() || "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        checkField('email', 'error-email', !emailRegex.test(email), "Veuillez entrer une adresse email valide.");

        // 3. Téléphone (min 8 caractères)
        const phone = document.getElementById('phone')?.value.trim() || "";
        checkField('phone', 'error-phone', phone.length < 8, "Veuillez entrer un numéro de téléphone valide.");

        // 4. Type de ticket
        const ticket = document.getElementById('ticket-type')?.value || "";
        checkField('ticket-type', 'error-ticket', ticket === "", "Veuillez sélectionner un type de participation.");

        // 5. Pays
        const country = document.getElementById('country')?.value || "";
        checkField('country', 'error-country', country === "", "Veuillez sélectionner votre pays.");

        // 6. Motivation (min 20 caractères)
        const motivation = document.getElementById('motivation')?.value.trim() || "";
        checkField('motivation', 'error-motivation', motivation.length < 20, "Veuillez écrire au moins 20 caractères.");

        // 7. Si tout est valide -> Afficher le message de succès
        const successBox = document.getElementById('form-success');
        if (isValid) {
            if (successBox) {
                successBox.style.display = "block";
                successBox.style.marginTop = "20px";
                successBox.style.padding = "15px";
                successBox.style.backgroundColor = "#d4edda";
                successBox.style.color = "#155724";
                successBox.style.borderRadius = "8px";
            }
            form.reset(); // Vide les champs du formulaire
        } else if (successBox) {
            successBox.style.display = "none";
        }
    });
}
/* ==========================================================================
   9. COMPTEUR ANIMÉ POUR LES STATISTIQUES
   ========================================================================== */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; // Plus c'est petit, plus c'est rapide
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    // Animation au défilement (Intersection Observer)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target); // S'exécute une seule fois
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}
/* ==========================================================================
   GESTION DES ONGLETS DU PROGRAMME
   ========================================================================== */
function initProgramTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');

            // 1. Retirer la classe 'active' de tous les boutons et contenus
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 2. Ajouter la classe 'active' au bouton cliqué
            btn.classList.add('active');

            // 3. Afficher le contenu correspondant
            const activeContent = document.getElementById(targetDay);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}
function initProgramTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');

            // 1. On retire la classe 'active' de TOUS les boutons et panneaux
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // 2. On ajoute 'active' au bouton cliqué
            btn.classList.add('active');

            // 3. On active UNIQUEMENT le panneau du jour sélectionné
            const activePanel = document.getElementById(targetDay);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });
}