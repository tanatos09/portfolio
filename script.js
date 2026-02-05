/**
 * Portfolio JS - Tomáš Frank
 * All interactive features and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Preloader
    // ========================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
            }
            // Initialize GSAP animations after preloader
            initGSAPAnimations();
        }, 1500);
    });

    // ========================================
    // Code Window Typing Effect
    // ========================================
    function initCodeAnimation() {
        const codeContent = document.querySelector('.code-content');
        if (!codeContent) return;

        const codeElement = codeContent.querySelector('code');
        if (!codeElement) return;

        // Define the code structure with inline HTML
        const codeHTML = `<span class="keyword">class</span> <span class="class-name">WebDeveloper</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="self">self</span>):
        <span class="self">self</span>.name = <span class="string">"Tomáš Frank"</span>
        <span class="self">self</span>.skills = [
            <span class="string">"Python"</span>, <span class="string">"Django"</span>,
            <span class="string">"JavaScript"</span>, <span class="string">"React"</span>
        ]
        <span class="self">self</span>.passion = <span class="string">"Tvořit weby"</span>

    <span class="keyword">def</span> <span class="function">create_project</span>(<span class="self">self</span>):
        <span class="keyword">return</span> <span class="string">"🚀 Váš úspěšný web"</span>`;

        // Convert HTML to nodes that we can iterate through
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = codeHTML;

        // Get all child nodes
        const allNodes = [];
        
        function flattenNodes(node) {
            for (let child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    // Split text node into individual characters
                    for (let char of child.textContent) {
                        allNodes.push({ type: 'text', char: char });
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    // Add span with text
                    const className = child.className;
                    for (let char of child.textContent) {
                        allNodes.push({ type: 'span', class: className, char: char });
                    }
                }
            }
        }

        flattenNodes(tempDiv);

        // Initialize line numbers
        const lineNumbersDiv = document.querySelector('.code-line-numbers');
        lineNumbersDiv.innerHTML = '';
        let lineNum = document.createElement('div');
        lineNum.className = 'line-number';
        lineNum.textContent = '1';
        lineNumbersDiv.appendChild(lineNum);

        let nodeIndex = 0;
        let currentSpan = null;
        let currentClass = null;
        let lineCount = 1;

        function typeNextChar() {
            if (nodeIndex < allNodes.length) {
                const node = allNodes[nodeIndex];

                if (node.type === 'text') {
                    // Add text to current span or directly to code
                    if (node.char === '\n') {
                        codeElement.appendChild(document.createTextNode('\n'));
                        lineCount++;
                        
                        // Add new line number
                        const newLineNum = document.createElement('div');
                        newLineNum.className = 'line-number';
                        newLineNum.textContent = lineCount;
                        lineNumbersDiv.appendChild(newLineNum);
                        
                        currentSpan = null;
                        currentClass = null;
                    } else {
                        if (!currentSpan || currentClass !== null) {
                            currentSpan = document.createTextNode('');
                            codeElement.appendChild(currentSpan);
                            currentClass = null;
                        }
                        currentSpan.textContent += node.char;
                    }
                } else if (node.type === 'span') {
                    // Add colored text
                    if (!currentSpan || currentClass !== node.class) {
                        currentSpan = document.createElement('span');
                        currentSpan.className = node.class;
                        codeElement.appendChild(currentSpan);
                        currentClass = node.class;
                    }
                    currentSpan.textContent += node.char;
                }

                nodeIndex++;
                setTimeout(typeNextChar, 30);
            }
        }

        // Start typing after a slight delay
        setTimeout(typeNextChar, 500);
    }

    // Initialize code animation when hero section is visible
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        // Start animation when element comes into view or immediately if already visible
        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initCodeAnimation();
                    codeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        codeObserver.observe(codeWindow);
    }

    // ========================================
    // Magnetic Buttons
    // ========================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            
            const inner = btn.querySelector('span') || btn;
            if (inner !== btn) {
                inner.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            const inner = btn.querySelector('span');
            if (inner) inner.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // Navigation
    // ========================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easing);
            
            el.textContent = current;
            el.classList.add('counting');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
                el.classList.remove('counting');
            }
        }

        requestAnimationFrame(update);
    }

    // ========================================
    // Reveal on Scroll
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Stat counter observer
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    // Skill bars observer
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // ========================================
    // Timeline Animation
    // ========================================
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeline.classList.add('animated');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineObserver.observe(timeline);
    }

    // ========================================
    // Project Image Slider
    // ========================================
    const projectSliders = document.querySelectorAll('.project-slider');
    
    projectSliders.forEach(slider => {
        const images = slider.querySelectorAll('.project-img');
        const dots = slider.querySelectorAll('.slider-dots .dot');
        let currentIndex = 0;
        let interval;
        
        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
        
        function startSlider() {
            interval = setInterval(nextImage, 3000);
        }
        
        function stopSlider() {
            clearInterval(interval);
        }
        
        // Click on dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = i;
                showImage(currentIndex);
                stopSlider();
                startSlider();
            });
        });
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
        
        startSlider();
    });

    // ========================================
    // Project Filter
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ========================================
    // Project Modal
    // ========================================
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const detailBtns = document.querySelectorAll('.project-detail-btn');

    const projectData = {
        geometry: {
            title: 'GeomeTry',
            category: 'Webová aplikace',
            year: '2026',
            status: 'Ve vývoji',
            description: '2D hra zaměřená čistě na JavaScript a HTML5 Canvas. Prioritou byla jednoduchost a čistý kód – 100% vlastní kód, 0% textur.',
            challenge: 'Vytvořit vzdělávací hru pro výuku geometrie pouze pomocí Canvas API bez použití herních enginů nebo externích textur.',
            solution: 'Kompletní implementace v čistém JavaScriptu s důrazem na čitelnost kódu a modulární architekturu. Všechny grafické prvky jsou generovány programaticky.',
            results: ['Čistý, udržovatelný kód', 'Žádné závislosti na externích knihovnách', 'Rychlé načítání bez textur'],
            tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
            features: ['Interaktivní geometrické vizualizace', 'Procedurálně generovaná grafika', 'Responzivní design'],
            link: 'https://github.com/tanatos09/GeomeTry'
        },
        realityplus: {
            title: 'Reality Plus',
            category: 'Realitní kancelář',
            year: '2026',
            status: 'Dokončeno',
            description: 'Profesionální web pro realitní kancelář s administrací a správou nemovitostí.',
            challenge: 'Vytvořit web, který umožní správu nemovitostí a prezentaci nabídky online.',
            solution: 'Admin panel pro správu nemovitostí, galerie, pokročilé SEO a možnost rozšíření o e-shop modul.',
            results: ['Moderní prezentace nemovitostí', 'Admin správa', 'Pokročilá SEO optimalizace'],
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            features: ['Správa nemovitostí', 'Galerie', 'Admin panel', 'Responzivní design'],
            link: '#',
            images: ['img/realityplus/rp1.jpg', 'img/realityplus/rp2.jpg', 'img/realityplus/rp3.jpg', 'img/realityplus/rp4.jpg']
        },
        ticketpass: {
            title: 'TicketPass',
            category: 'Webová aplikace',
            year: '2025',
            status: 'Ve vývoji',
            description: 'Platforma pro prodej vstupenek podobná TicketPortálu. Umožňuje vytváření událostí, online prodej a správu účastníků.',
            challenge: 'Vytvořit škálovatelnou platformu pro prodej vstupenek s podporou více událostí a organizátorů.',
            solution: 'Modulární architektura s oddělením logiky pro organizátory a návštěvníky. QR kódy pro validaci vstupenek.',
            results: ['Funkční MVP platformy', 'QR validace vstupenek', 'Přehledná správa událostí'],
            tech: ['Python', 'Django', 'SQLite', 'QR kódy'],
            features: ['Správa událostí', 'Online prodej vstupenek', 'QR kódy pro vstupenky', 'Reporting a statistiky'],
            link: 'https://github.com/tanatos09/ticketpass'
        },
        pubhouse: {
            title: 'Hospůdka na Kurtech',
            category: 'Prezentační web',
            year: '2026',
            status: 'Dokončeno',
            description: 'Moderní webová prezentace pro restauraci s důrazem na atmosféru pivnice a uživatelskou přívětivost.',
            challenge: 'Vytvořit web, který přenese atmosféru pivnice do digitálního prostředí a přiláká nové zákazníky.',
            solution: 'Čistý design s důrazem na fotografie interiéru, přehledné menu a jednoduchou navigaci.',
            results: ['Zvýšení povědomí o restauraci', 'Online menu s cenami', 'Kontaktní formulář pro rezervace'],
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            features: ['Online menu', 'Galerie interiéru', 'Kontaktní formulář', 'Responzivní design'],
            link: 'https://github.com/tanatos09/HospudkaNaKurtech'
        },
        motogarage: {
            title: 'Motogarage',
            category: 'Web pro dílnu',
            year: '2026',
            status: 'Dokončeno',
            description: 'Jednoduchý web pro malou dílnu na opravy motorek. Rychlé dodání a nízká cena.',
            challenge: 'Vytvořit web pro malou dílnu s důrazem na jednoduchost a rychlost.',
            solution: 'Použití šablony s úpravou na míru, kontaktní formulář, základní SEO.',
            results: ['Rychlé dodání', 'Nízká cena', 'Spokojený klient'],
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            features: ['Přehled služeb', 'Galerie realizací', 'Kontaktní formulář', 'SEO optimalizace'],
            link: '#',
            images: ['img/motogarage/mg1.png', 'img/motogarage/mg2.png', 'img/motogarage/mg3.png']
        },
        pubhouse: {
            title: 'Hospůdka na Kurtech',
            category: 'Prezentační web',
            year: '2026',
            status: 'Dokončeno',
            description: 'Moderní webová prezentace pro restauraci s galerií a online menu.',
            challenge: 'Vytvořit web, který přenese atmosféru pivnice do digitálního prostředí a přiláká nové zákazníky.',
            solution: 'Čistý design s důrazem na fotografie interiéru, přehledné menu a jednoduchou navigaci.',
            results: ['Zvýšení povědomí o restauraci', 'Online menu s cenami', 'Kontaktní formulář pro rezervace'],
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            features: ['Online menu', 'Galerie interiéru', 'Kontaktní formulář', 'Responzivní design'],
            link: '#',
            images: ['img/pubhouse/ph1.png', 'img/pubhouse/ph2.png', 'img/pubhouse/ph3.png']
        }
    };

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        const imagesHTML = project.images ? `
            <div class="modal-gallery">
                ${project.images.map((img, i) => `
                    <img src="${img}" alt="${project.title} screenshot ${i+1}" class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="setModalImage(this)">
                `).join('')}
            </div>
            <div class="modal-main-image">
                <img src="${project.images[0]}" alt="${project.title}" id="modalMainImage">
            </div>
        ` : '';

        modalBody.innerHTML = `
            <div class="modal-project">
                <div class="modal-header-info">
                    <span class="modal-category">${project.category}</span>
                    <span class="modal-year">${project.year}</span>
                    <span class="modal-status ${project.status === 'Dokončeno' ? 'completed' : 'in-progress'}">${project.status}</span>
                </div>
                <h2>${project.title}</h2>
                
                ${imagesHTML}
                
                <div class="modal-case-study">
                    <div class="case-section">
                        <h3>📋 O projektu</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="case-section">
                        <h3>🎯 Výzva</h3>
                        <p>${project.challenge}</p>
                    </div>
                    
                    <div class="case-section">
                        <h3>💡 Řešení</h3>
                        <p>${project.solution}</p>
                    </div>
                    
                    <div class="case-section">
                        <h3>✅ Výsledky</h3>
                        <ul class="case-results">
                            ${project.results.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Technologie</h3>
                    <div class="modal-tech">
                        ${project.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <a href="${project.link}" target="_blank" rel="noopener" class="btn btn-primary magnetic-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        Zobrazit na GitHubu
                    </a>
                </div>
            </div>
        `;

        // Add enhanced modal styles
        if (!document.getElementById('modal-case-study-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-case-study-styles';
            style.textContent = `
                .modal-project h2 {
                    font-family: var(--font-display);
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                }
                .modal-header-info {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
                    flex-wrap: wrap;
                }
                .modal-category {
                    color: var(--accent-primary);
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .modal-year {
                    color: var(--text-muted);
                    font-size: 0.875rem;
                }
                .modal-status {
                    padding: 0.25rem 0.75rem;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                .modal-status.completed {
                    background: rgba(34, 197, 94, 0.1);
                    color: var(--success);
                }
                .modal-status.in-progress {
                    background: rgba(245, 158, 11, 0.1);
                    color: var(--warning);
                }
                .modal-gallery {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    overflow-x: auto;
                    padding-bottom: 0.5rem;
                }
                .modal-thumb {
                    width: 80px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 8px;
                    cursor: pointer;
                    opacity: 0.6;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                .modal-thumb:hover,
                .modal-thumb.active {
                    opacity: 1;
                    border-color: var(--accent-primary);
                }
                .modal-main-image {
                    margin-bottom: 2rem;
                    border-radius: var(--border-radius);
                    overflow: hidden;
                }
                .modal-main-image img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
                .modal-case-study {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .case-section {
                    padding: 1.5rem;
                    background: var(--bg-glass);
                    border-radius: var(--border-radius-sm);
                    border: 1px solid var(--border-color);
                }
                .case-section h3 {
                    font-family: var(--font-display);
                    font-size: 1rem;
                    margin-bottom: 0.75rem;
                }
                .case-section p {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.7;
                }
                .case-results {
                    list-style: none;
                    padding: 0;
                }
                .case-results li {
                    position: relative;
                    padding-left: 1.5rem;
                    color: var(--text-secondary);
                    margin-bottom: 0.5rem;
                }
                .case-results li::before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: var(--success);
                }
                .modal-section {
                    margin-bottom: 2rem;
                }
                .modal-section h3 {
                    font-family: var(--font-display);
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                }
                .modal-tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .modal-tech span {
                    padding: 0.5rem 1rem;
                    background: var(--bg-glass);
                    border: 1px solid var(--border-color);
                    border-radius: 100px;
                    font-size: 0.875rem;
                }
                .modal-actions {
                    margin-top: 2rem;
                }
                @media (max-width: 768px) {
                    .modal-case-study {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Global function for modal image switching
    window.setModalImage = function(thumb) {
        const mainImage = document.getElementById('modalMainImage');
        if (mainImage) {
            mainImage.src = thumb.src;
            document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        }
    };

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.dataset.project;
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ========================================
    // Contact Form
    // ========================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show success message
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Odesláno!
        `;
        btn.style.background = 'var(--success)';
        btn.disabled = true;

        // Reset after delay
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);

        // Here you would typically send the data to a server
        // For now, we'll just log it
        console.log('Form submitted:', data);
    });

    // ========================================
    // FAQ - Using native <details> elements now
    // ========================================
    // FAQ now uses native HTML <details> elements for accordion behavior
    // No JavaScript needed for basic functionality
    
    // Optional: Close other details when one opens (single accordion behavior)
    const faqDetails = document.querySelectorAll('.faq-details');
    faqDetails.forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                faqDetails.forEach(other => {
                    if (other !== detail && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });
    
    // Legacy FAQ support for old accordion style (if any remain)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Typing effect for code window (optional)
    // ========================================
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        const originalHTML = codeContent.innerHTML;
        codeContent.innerHTML = '';
        let i = 0;
        
        function typeCode() {
            if (i < originalHTML.length) {
                if (originalHTML.substring(i).startsWith('<')) {
                    const tagEnd = originalHTML.indexOf('>', i) + 1;
                    codeContent.innerHTML += originalHTML.substring(i, tagEnd);
                    i = tagEnd;
                } else {
                    codeContent.innerHTML += originalHTML.charAt(i);
                    i++;
                }
                setTimeout(typeCode, 10);
            }
        }

        // Start typing after preloader
        setTimeout(typeCode, 2000);
    }

    // ========================================
    // Easter Egg - Enhanced Konami Code
    // ========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    // Create easter egg overlay
    const easterEggOverlay = document.createElement('div');
    easterEggOverlay.className = 'easter-egg-overlay';
    easterEggOverlay.innerHTML = `
        <div class="easter-egg-content">
            <h2>🎮 Achievement Unlocked!</h2>
            <p>Našel jsi tajný kód! Jsi opravdový geek 🚀</p>
            <p style="font-size: 3rem; margin-top: 1rem;">⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️</p>
            <button class="btn btn-primary" style="margin-top: 2rem;">Zavřít</button>
        </div>
    `;
    document.body.appendChild(easterEggOverlay);
    
    easterEggOverlay.querySelector('button').addEventListener('click', () => {
        easterEggOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                easterEggOverlay.classList.add('active');
                
                // Confetti effect
                for (let i = 0; i < 100; i++) {
                    createConfetti();
                }
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function createConfetti() {
        const confetti = document.createElement('div');
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#22c55e', '#f59e0b'];
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 10002;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ========================================
    // GSAP Scroll Animations
    // ========================================
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);

        // Hero text reveal
        gsap.fromTo('.hero-title .line', 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            }
        );

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header, 
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Project cards stagger
        gsap.utils.toArray('.projects-grid').forEach(grid => {
            const cards = grid.querySelectorAll('.project-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: grid,
                        start: 'top 70%'
                    }
                }
            );
        });

        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%'
                    }
                }
            );
        });

        // Service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60, rotateX: -10 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        });

        // Parallax effect on hero glow
        gsap.to('.hero-glow-1', {
            y: -100,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.hero-glow-2', {
            y: -50,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Skill bars animation
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        });
    }

    // ========================================
    // Add fade animation
    // ========================================
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeStyle);
});
