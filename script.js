/**
 * Portfolio JS - Tomáš Frank
 * All interactive features and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Lazy-load GSAP for better mobile performance
    // ========================================
    function loadGSAP() {
        const s1 = document.createElement('script');
        s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        s1.onload = () => {
            const s2 = document.createElement('script');
            s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            s2.onload = () => initGSAPAnimations();
            document.head.appendChild(s2);
        };
        document.head.appendChild(s1);
    }

    window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadGSAP);
        } else {
            setTimeout(loadGSAP, 200);
        }
    });

    // ========================================
    // Code Window Typing Effect (multi-tab: HTML → CSS → JS, then cycle tabs)
    // ========================================
    function initCodeAnimation() {
        const codeWindow = document.querySelector('.code-window');
        if (!codeWindow) return;

        const tabs = codeWindow.querySelectorAll('.code-tab');
        const panels = codeWindow.querySelectorAll('.code-panel');

        // Define code for each tab
        const codeData = {
            html: `<span class="punctuation">&lt;!</span><span class="tag">DOCTYPE</span> <span class="attr">html</span><span class="punctuation">&gt;</span>
<span class="punctuation">&lt;</span><span class="tag">html</span> <span class="attr">lang</span>=<span class="attr-value">"cs"</span><span class="punctuation">&gt;</span>
<span class="punctuation">&lt;</span><span class="tag">head</span><span class="punctuation">&gt;</span>
  <span class="punctuation">&lt;</span><span class="tag">meta</span> <span class="attr">charset</span>=<span class="attr-value">"UTF-8"</span><span class="punctuation">&gt;</span>
  <span class="punctuation">&lt;</span><span class="tag">title</span><span class="punctuation">&gt;</span>Můj Web<span class="punctuation">&lt;/</span><span class="tag">title</span><span class="punctuation">&gt;</span>
  <span class="punctuation">&lt;</span><span class="tag">link</span> <span class="attr">href</span>=<span class="attr-value">"webside.css"</span><span class="punctuation">&gt;</span>
<span class="punctuation">&lt;/</span><span class="tag">head</span><span class="punctuation">&gt;</span>
<span class="punctuation">&lt;</span><span class="tag">body</span><span class="punctuation">&gt;</span>
  <span class="punctuation">&lt;</span><span class="tag">h1</span><span class="punctuation">&gt;</span>Vítejte!<span class="punctuation">&lt;/</span><span class="tag">h1</span><span class="punctuation">&gt;</span>
  <span class="punctuation">&lt;</span><span class="tag">p</span><span class="punctuation">&gt;</span>Váš nový web<span class="punctuation">&lt;/</span><span class="tag">p</span><span class="punctuation">&gt;</span>
  <span class="punctuation">&lt;</span><span class="tag">script</span> <span class="attr">src</span>=<span class="attr-value">"webside.js"</span><span class="punctuation">&gt;</span><span class="punctuation">&lt;/</span><span class="tag">script</span><span class="punctuation">&gt;</span>
<span class="punctuation">&lt;/</span><span class="tag">body</span><span class="punctuation">&gt;</span>
<span class="punctuation">&lt;/</span><span class="tag">html</span><span class="punctuation">&gt;</span>`,

            css: `<span class="comment">/* Základní styly */</span>
<span class="selector">body</span> {
  <span class="property">margin</span>: <span class="number">0</span>;
  <span class="property">font-family</span>: <span class="value">'Segoe UI'</span>;
  <span class="property">background</span>: <span class="value">#0a0a0a</span>;
  <span class="property">color</span>: <span class="value">#fff</span>;
}

<span class="selector">h1</span> {
  <span class="property">font-size</span>: <span class="number">3rem</span>;
  <span class="property">text-align</span>: <span class="value">center</span>;
  <span class="property">color</span>: <span class="value">#00d4ff</span>;
}`,

            js: `<span class="comment">// Interaktivní efekty</span>
<span class="keyword">const</span> <span class="function">h1</span> = <span class="function">document</span>.<span class="function">querySelector</span>(<span class="string">'h1'</span>);

<span class="function">h1</span>.<span class="function">addEventListener</span>(<span class="string">'mouseenter'</span>,
  () <span class="keyword">=></span> {
    <span class="function">h1</span>.style.<span class="property">transform</span> = <span class="string">'scale(1.05)'</span>;
});

<span class="function">h1</span>.<span class="function">addEventListener</span>(<span class="string">'mouseleave'</span>,
  () <span class="keyword">=></span> {
    <span class="function">h1</span>.style.<span class="property">transform</span> = <span class="string">'scale(1)'</span>;
});

<span class="function">console</span>.<span class="function">log</span>(<span class="string">'🚀 Web připraven!'</span>);`
        };

        const tabOrder = ['html', 'css', 'js'];

        // Flatten code HTML into typeable characters
        function parseCodeToNodes(html) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const nodes = [];
            function flatten(node) {
                for (let child of node.childNodes) {
                    if (child.nodeType === Node.TEXT_NODE) {
                        for (let ch of child.textContent) {
                            nodes.push({ type: 'text', char: ch });
                        }
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        const cls = child.className;
                        for (let ch of child.textContent) {
                            nodes.push({ type: 'span', class: cls, char: ch });
                        }
                    }
                }
            }
            flatten(tempDiv);
            return nodes;
        }

        // Switch active tab and panel
        function switchTab(tabName) {
            tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
            panels.forEach(p => p.classList.toggle('active', p.dataset.panel === tabName));
        }

        // Type code into a panel
        function typeCode(tabName, callback) {
            switchTab(tabName);
            const panel = codeWindow.querySelector(`.code-panel[data-panel="${tabName}"]`);
            const codeEl = panel.querySelector('code');
            const lineNumsDiv = panel.querySelector('.code-line-numbers');
            const codeContentEl = panel.querySelector('.code-content');

            codeEl.innerHTML = '';
            lineNumsDiv.innerHTML = '';
            codeContentEl.classList.add('typing');

            // First line number
            const ln = document.createElement('div');
            ln.className = 'line-number';
            ln.textContent = '1';
            lineNumsDiv.appendChild(ln);

            const nodes = parseCodeToNodes(codeData[tabName]);
            let i = 0;
            let lineCount = 1;
            let currentSpan = null;
            let currentClass = null;

            function typeNext() {
                if (i >= nodes.length) {
                    codeContentEl.classList.remove('typing');
                    if (callback) setTimeout(callback, 600);
                    return;
                }

                const node = nodes[i];
                if (node.type === 'text') {
                    if (node.char === '\n') {
                        codeEl.appendChild(document.createTextNode('\n'));
                        lineCount++;
                        const newLn = document.createElement('div');
                        newLn.className = 'line-number';
                        newLn.textContent = lineCount;
                        lineNumsDiv.appendChild(newLn);
                        currentSpan = null;
                        currentClass = null;
                    } else {
                        if (!currentSpan || currentClass !== null) {
                            currentSpan = document.createTextNode('');
                            codeEl.appendChild(currentSpan);
                            currentClass = null;
                        }
                        currentSpan.textContent += node.char;
                    }
                } else if (node.type === 'span') {
                    if (!currentSpan || currentClass !== node.class) {
                        currentSpan = document.createElement('span');
                        currentSpan.className = node.class;
                        codeEl.appendChild(currentSpan);
                        currentClass = node.class;
                    }
                    currentSpan.textContent += node.char;
                }

                i++;
                setTimeout(typeNext, 25);
            }

            setTimeout(typeNext, 400);
        }

        // After all tabs are typed, cycle between them
        function startTabCycling() {
            let cycleIndex = 0;
            setInterval(() => {
                cycleIndex = (cycleIndex + 1) % tabOrder.length;
                switchTab(tabOrder[cycleIndex]);
            }, 3000);
        }

        // Allow manual tab clicks at any time
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                switchTab(tab.dataset.tab);
            });
        });

        // Sequence: type HTML → type CSS → type JS → cycle
        typeCode('html', () => {
            typeCode('css', () => {
                typeCode('js', () => {
                    startTabCycling();
                });
            });
        });
    }

    // Initialize code animation when hero section is visible
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
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
    }, { passive: true });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.contains('active');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
        hamburger.setAttribute('aria-label', isActive ? 'Otevřít navigaci' : 'Zavřít navigaci');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Otevřít navigaci');
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
            title: 'PubHouse',
            category: 'Prezentační web',
            year: '2026',
            status: 'Dokončeno',
            description: 'Moderní webová prezentace pro restauraci s důrazem na atmosféru a uživatelskou přívětivost.',
            challenge: 'Vytvořit web, který přenese atmosféru restaurace do digitálního prostředí a přiláká nové zákazníky.',
            solution: 'Čistý design s důrazem na fotografie interiéru, přehledné menu a jednoduchou navigaci.',
            results: ['Zvýšení povědomí o restauraci', 'Online menu s cenami', 'Kontaktní formulář pro rezervace'],
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            features: ['Online menu', 'Galerie interiéru', 'Kontaktní formulář', 'Responzivní design'],
            link: 'https://github.com/tanatos09/PubHouse'
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
            title: 'PubHouse',
            category: 'Prezentační web',
            year: '2026',
            status: 'Dokončeno',
            description: 'Moderní webová prezentace pro restauraci s galerií a online menu.',
            challenge: 'Vytvořit web, který přenese atmosféru restaurace do digitálního prostředí a přiláká nové zákazníky.',
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
    // Contact Form with FormSubmit (AJAX)
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Custom validation helper
        function validateForm() {
            let isValid = true;
            // Clear previous errors
            contactForm.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));

            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const gdpr = contactForm.querySelector('#gdpr');

            if (!name.value.trim()) {
                name.closest('.form-group').classList.add('has-error');
                isValid = false;
            }
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                email.closest('.form-group').classList.add('has-error');
                isValid = false;
            }
            if (!gdpr.checked) {
                gdpr.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Scroll to first error
            if (!isValid) {
                const firstError = contactForm.querySelector('.form-group.has-error');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return isValid;
        }

        // Clear error on input
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            const event = field.type === 'checkbox' ? 'change' : 'input';
            field.addEventListener(event, () => {
                const group = field.closest('.form-group');
                if (group) group.classList.remove('has-error');
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm()) return;

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            const formStatus = document.getElementById('formStatus');

            // Show loading state
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
                Odesílám...
            `;
            btn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                // Remove gdpr checkbox from submission data (not needed for email)
                formData.delete('gdpr');

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json().catch(() => null);

                if (response.ok || (data && data.success)) {
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status form-status-success';
                    formStatus.innerHTML = '✅ Zpráva byla úspěšně odeslána! Ozvu se vám do 24 hodin.';
                    contactForm.reset();
                } else if (data && data.message && data.message.toLowerCase().includes('confirm')) {
                    // FormSubmit first-time activation
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status form-status-success';
                    formStatus.innerHTML = '✅ Zpráva byla přijata! Formulář se právě aktivuje — další zprávy budou doručeny okamžitě.';
                    contactForm.reset();
                } else {
                    throw new Error('Chyba odesílání');
                }
            } catch (error) {
                formStatus.style.display = 'block';
                formStatus.className = 'form-status form-status-error';
                formStatus.innerHTML = '❌ Odeslání se nezdařilo. Zkuste to prosím znovu nebo mi napište přímo na <a href="mailto:franktomas@seznam.cz">franktomas@seznam.cz</a>.';
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

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
    // GSAP Scroll Animations
    // ========================================
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        // Respect prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
