// =============================================
// Reality Plus - Premium Real Estate Website
// WEB NA MÍRU Showcase
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ─── Mobile Menu ───
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ─── Scroll-based Navbar ───
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ─── Smooth Scroll ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── Stats Counter Animation ───
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
            el.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach((el, i) => {
                    setTimeout(() => animateCounter(el), i * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) statsObserver.observe(statsSection);

    // ─── Property Filter ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            propertyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ─── Favorite Button Toggle ───
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // ─── Mortgage Calculator ───
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('loanAmount').value);
            const years = parseFloat(document.getElementById('loanYears').value);
            const rate = parseFloat(document.getElementById('interestRate').value);

            if (!amount || !years || !rate) {
                alert('Prosím vyplňte všechna pole.');
                return;
            }

            const monthlyRate = rate / 100 / 12;
            const totalMonths = years * 12;
            const monthly = amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                           (Math.pow(1 + monthlyRate, totalMonths) - 1);
            const total = monthly * totalMonths;
            const interest = total - amount;

            document.getElementById('monthlyPayment').textContent =
                Math.round(monthly).toLocaleString('cs-CZ') + ' Kč';
            document.getElementById('totalPayment').textContent =
                Math.round(total).toLocaleString('cs-CZ') + ' Kč';
            document.getElementById('totalInterest').textContent =
                Math.round(interest).toLocaleString('cs-CZ') + ' Kč';

            // Animate results
            document.querySelectorAll('.result-item strong').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // reflow
                el.style.animation = 'fadeInUp 0.5s ease forwards';
            });
        });

        // Auto-calculate on load
        calculateBtn.click();
    }

    // ─── Testimonials Slider ───
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoSlide;

    function goToSlide(index) {
        testimonials.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = index;
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % testimonials.length);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoSlide();
        });
    });

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 5000);
    }

    if (testimonials.length > 0) {
        autoSlide = setInterval(nextSlide, 5000);
    }

    // ─── Scroll to Top ───
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Contact Form ───
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const checkbox = contactForm.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                alert('Prosím potvrďte souhlas se zpracováním osobních údajů.');
                return;
            }

            alert('Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.');
            contactForm.reset();
        });
    }

    // ─── Newsletter Form ───
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert('Děkujeme za přihlášení k odběru novinek!');
                newsletterForm.reset();
            }
        });
    }

    // ─── Property Search Form ───
    const searchForm = document.querySelector('.property-search');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vyhledávání... (funkce bude dostupná v ostrém provozu)');
        });
    }

    // ─── Scroll Animations ───
    const animateElements = document.querySelectorAll(
        '.property-card, .service-card, .team-member, .blog-card, .contact-card, .feature-box, .stat-item'
    );

    animateElements.forEach(el => el.classList.add('animate-in'));

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => scrollObserver.observe(el));

});
