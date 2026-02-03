// Reality Plus - Real Estate Agency Website JS
// PLUS Package - Advanced Features & Interactivity

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks?.classList.remove('active');
            }
        });
    });
    
    // Stats Counter Animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const observeStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observeStats.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => observeStats.observe(stat));
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('cs-CZ');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('cs-CZ');
            }
        }, 30);
    }
    
    // Property Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            propertyCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Favorite Button Toggle
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });
    
    // Mortgage Calculator
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const amount = parseFloat(document.getElementById('loanAmount').value);
            const years = parseInt(document.getElementById('loanYears').value);
            const rate = parseFloat(document.getElementById('interestRate').value);
            
            const monthlyRate = rate / 100 / 12;
            const numPayments = years * 12;
            
            const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                                 (Math.pow(1 + monthlyRate, numPayments) - 1);
            
            const totalPayment = monthlyPayment * numPayments;
            const totalInterest = totalPayment - amount;
            
            document.getElementById('monthlyPayment').textContent = 
                monthlyPayment.toLocaleString('cs-CZ', { maximumFractionDigits: 0 }) + ' Kč';
            document.getElementById('totalPayment').textContent = 
                totalPayment.toLocaleString('cs-CZ', { maximumFractionDigits: 0 }) + ' Kč';
            document.getElementById('totalInterest').textContent = 
                totalInterest.toLocaleString('cs-CZ', { maximumFractionDigits: 0 }) + ' Kč';
        });
    }
    
    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.');
            this.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Děkujeme za přihlášení k odběru novinek!');
            this.reset();
        });
    }
    
    // Property Search
    const propertySearch = document.querySelector('.property-search');
    if (propertySearch) {
        propertySearch.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Vyhledávání nemovitostí - tato funkce je ukázková.');
        });
    }
    
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.property-card, .service-card, .team-member, .blog-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    console.log('Reality Plus website loaded successfully!');
});
