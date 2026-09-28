/* ===================================================================
   VEERESH BABU V K - MAIN APPLICATION LOGIC
   Framer Ruhi Pro Inspired Animations & Interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initHeroLetterAnimation();
  initScrollRevealText();
  initHeaderNav();
  initDrawerMenu();
  initCard3DTilt();
  initReviewsCarousel();
  initProjectModals();
  initContactForm();
  initQuickCopy();
});

/* -------------------------------------------------------------------
   1. TOP SCROLL PROGRESS BAR
   ------------------------------------------------------------------- */
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* -------------------------------------------------------------------
   2. HERO DISPLAY TITLE LETTER ENTRANCE
   ------------------------------------------------------------------- */
function initHeroLetterAnimation() {
  const letters = document.querySelectorAll('.hero-letter');
  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${0.1 + index * 0.08}s`;
  });
}

/* -------------------------------------------------------------------
   3. SIGNATURE WORD-BY-WORD SCROLL REVEAL (FRAMER EXACT)
   ------------------------------------------------------------------- */
function initScrollRevealText() {
  const container = document.getElementById('scroll-reveal-container');
  if (!container) return;

  const rawText = container.getAttribute('data-text') || container.innerText.trim();
  container.innerHTML = '';

  const words = rawText.split(/\s+/);
  const wordElements = [];

  words.forEach((word) => {
    const span = document.createElement('span');
    span.className = 'reveal-word';
    span.innerText = word;

    // Highlight key terms with accent orange
    if (['Biomedical', 'Zifo', 'LIMS', 'ThermoFisher', 'Azure', 'Three.js', 'Rust', 'DevSecOps', 'Digital', 'Twin', 'SIH', 'Winner'].includes(word.replace(/[^a-zA-Z]/g, ''))) {
      span.classList.add('highlight-orange');
    }

    container.appendChild(span);
    wordElements.push(span);
  });

  function updateReveal() {
    const rect = container.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Calculate how far the container is into the viewport
    const startOffset = windowH * 0.85;
    const endOffset = windowH * 0.15;

    if (rect.top > startOffset) {
      wordElements.forEach(w => w.classList.remove('revealed'));
      return;
    }

    const totalDistance = startOffset - endOffset;
    const currentProgress = (startOffset - rect.top) / totalDistance;
    const progressClamped = Math.max(0, Math.min(1, currentProgress));

    const activeCount = Math.floor(progressClamped * wordElements.length);

    wordElements.forEach((wordEl, idx) => {
      if (idx <= activeCount) {
        wordEl.classList.add('revealed');
      } else {
        wordEl.classList.remove('revealed');
      }
    });
  }

  window.addEventListener('scroll', updateReveal, { passive: true });
  window.addEventListener('resize', updateReveal, { passive: true });
  updateReveal();
}

/* -------------------------------------------------------------------
   4. HEADER NAVIGATION & ACTIVE SECTION HIGHLIGHT
   ------------------------------------------------------------------- */
function initHeaderNav() {
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* -------------------------------------------------------------------
   5. DRAWER MENU (RUHI MEGA MENU CARD)
   ------------------------------------------------------------------- */
function initDrawerMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawer = document.getElementById('drawer-card');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    toggleBtn.classList.add('open');
    backdrop.classList.add('active');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggleBtn.classList.remove('open');
    backdrop.classList.remove('active');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* -------------------------------------------------------------------
   6. 3D CARD PERSPECTIVE TILT ON MOUSEMOVE
   ------------------------------------------------------------------- */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.hero-image-card, .service-card-outer');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* -------------------------------------------------------------------
   7. REVIEWS & TESTIMONIALS CAROUSEL
   ------------------------------------------------------------------- */
function initReviewsCarousel() {
  const track = document.getElementById('reviews-track');
  const prevBtn = document.getElementById('reviews-prev');
  const nextBtn = document.getElementById('reviews-next');

  if (!track || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll('.review-slide');
  let currentIndex = 0;
  const maxIndex = slides.length - (window.innerWidth <= 992 ? 1 : 2);

  function updateSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 20;
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener('click', () => {
    const currentMax = slides.length - (window.innerWidth <= 992 ? 1 : 2);
    if (currentIndex < currentMax) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop
    }
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      const currentMax = slides.length - (window.innerWidth <= 992 ? 1 : 2);
      currentIndex = currentMax;
    }
    updateSlide();
  });

  // Touch Swipe for mobile
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      nextBtn.click();
    } else if (diff < -40) {
      prevBtn.click();
    }
  }, { passive: true });

  // Autoplay
  let timer = setInterval(() => {
    nextBtn.click();
  }, 6000);

  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(() => nextBtn.click(), 6000);
  });

  window.addEventListener('resize', updateSlide);
}

/* -------------------------------------------------------------------
   8. PROJECT CASE STUDY MODAL DIALOG
   ------------------------------------------------------------------- */
const projectData = {
  meika: {
    title: 'Meika Security Suite',
    category: 'Open-Source IAM & Cryptography Stack',
    image: 'assets/images/project_meika.jpg',
    tags: ['Rust (Meika256)', 'Python (FastAPI)', 'Redis', 'Azure', 'Oracle Cloud (OCI)', 'DevSecOps'],
    docsUrl: 'https://meikadocs.vercel.app/',
    githubUrl: 'https://github.com/Veeresh-11',
    repos: [
      { name: 'Meika256 (Rust Core)', url: 'https://github.com/Veeresh-11/Meika256' },
      { name: 'Meika_Secure (FastAPI & Redis)', url: 'https://github.com/Veeresh-11/Meika_Secure' },
      { name: 'Meika-Devops (12+ Scanners)', url: 'https://github.com/Veeresh-11/Meika-Devops' }
    ],
    body: 'Independently engineered a modular, production-ready Identity and Access Management (IAM) software prototype combining features of Okta and Samsung Knox. Engineered a hardened architecture to ensure defense-in-depth across enterprise multi-cloud environments, accompanied by an interactive documentation platform at meikadocs.vercel.app.',
    highlights: [
      'Core Cryptography (Meika256): Designed and compiled a low-latency, proprietary 256-bit security algorithm in Rust optimizing thread-safe memory allocations and execution speed.',
      'Backend Engine (Meika Secure): Built a hardened core using Python (FastAPI) and Redis, driven dynamically via granular YAML configuration engines dictating core authorization rules.',
      'DevSecOps Pipelines (Meika-Devops): Engineered a 12+ scanner suite with GitHub Actions (Snyk, SonarQube, Trivy, CodeQL, OWASP ZAP, Bandit, Nuclei) for total vulnerability mitigation.',
      'Multi-Cloud Deployment: Configured, secured, and scaled the platform infrastructure layer deploying resilient virtual machines and databases across Azure and Oracle Cloud (OCI).',
      'Documentation Site: Created full documentation and developer portal deployed live at meikadocs.vercel.app.'
    ]
  },
  lims: {
    title: 'ThermoFisher Enterprise LIMS Platform',
    category: 'Enterprise Life-Sciences Data Automation (Zifo)',
    image: 'assets/images/project_lims.jpg',
    tags: ['C# (.NET Core)', 'VB.NET', 'Oracle DB', 'PostgreSQL', 'PowerShell', 'Power BI'],
    githubUrl: 'https://github.com/Veeresh-11/enterprise-secure-document-platform',
    repos: [
      { name: 'enterprise-secure-document-platform', url: 'https://github.com/Veeresh-11/enterprise-secure-document-platform' }
    ],
    body: 'Delivered high-impact SampleManager LIMS and LabVantage LIMS software engineering for high-tier AMER clients across Pharmaceutical, Chemical, Mining, and Food Tech domains under the ThermoFisher vendor network at Zifo Technologies.',
    highlights: [
      'Architected a highly secure document transaction framework leveraging advanced C# (.NET Core) compilation patterns.',
      'Designed low-latency data exchange pipelines linking Instrument Manager software to centralized relational databases (Oracle DB, PostgreSQL, MySQL).',
      'Automated server configuration management, structural database migrations, and environment setups via complex PowerShell scripting across Windows and Linux infrastructures.',
      'Built and deployed automated executive-level reporting pipelines using Power BI alongside personalized Jira Dashboards.'
    ]
  },
  loco: {
    title: 'Loco-Agent Integration Framework',
    category: 'Autonomous Agentic Middleware & Tool Integration',
    image: 'assets/images/project_loco.jpg',
    tags: ['Structural JavaScript', 'Agentic AI', 'Async Workflows', 'Tool Integration'],
    githubUrl: 'https://github.com/Veeresh-11/Loco-Agent',
    repos: [
      { name: 'Loco-Agent (Structural JS)', url: 'https://github.com/Veeresh-11/Loco-Agent' }
    ],
    body: 'Engineered an automated agentic middleware platform using structural JavaScript to manage dynamic contextual tool integrations and asynchronous LLM workflows.',
    highlights: [
      'Designed dynamic contextual tool integration pipeline allowing autonomous agents to execute multi-step API actions.',
      'Engineered asynchronous state management to prevent tool hallucination and optimize task execution latency.',
      'Provided robust telemetry logging and observability hooks across all agentic execution paths.'
    ]
  },
  sih: {
    title: 'Smart India Hackathon (SIH) 2022 Hardware IoT Solution',
    category: 'Award-Winning Hardware Engineering & Embedded Systems',
    image: 'assets/images/project_sih.jpg',
    tags: ['C Programming', 'IoT Sensors', 'Embedded Mechanics', 'Real-Time Processing'],
    githubUrl: 'https://github.com/Veeresh-11',
    body: 'Winner of the national Smart India Hackathon (SIH) 2022 (Hardware Edition). Designed and built a fully functional, hardware-integrated IoT solution utilizing C programming, real-time sensor processing, and embedded mechanics.',
    highlights: [
      'Engineered real-time telemetry processing using custom embedded C on microcontrollers.',
      'Integrated physical sensor arrays with custom PCB circuitry and mechanical industrial actuators.',
      'Won 1st prize at national level tackling critical industry-grade operational bottlenecks.'
    ]
  },
  digital_twin: {
    title: '3D Web Portals & Digital Twin Engineering',
    category: 'Interactive WebGL, Three.js & Blender Systems',
    image: 'assets/images/project_digital_twin.jpg',
    tags: ['Three.js', 'Babylon.js', 'Blender', 'Maya', 'React', 'TypeScript', 'WebGL'],
    githubUrl: 'https://github.com/Veeresh-11',
    body: 'Architected and delivered lightweight web portals and 3D user platforms for 3+ business clients utilizing React and TypeScript alongside interactive 3D assets.',
    highlights: [
      'Modelled, rigged, and optimized interactive low-poly 3D assets using Blender and Maya.',
      'Implemented responsive WebGL rendering via Three.js and Babylon.js with high frame-rate performance.',
      'Constructed real-time sensor data overlays mapped onto 3D digital twin models in the browser.'
    ]
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');

  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalBody = document.getElementById('modal-body');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTags = document.getElementById('modal-tags');
  const modalActions = document.getElementById('modal-actions');

  if (!modalBackdrop) return;

  function openModal(key) {
    const data = projectData[key];
    if (!data) return;

    modalImg.src = data.image;
    modalTitle.innerText = data.title;
    modalCategory.innerText = data.category;
    modalBody.innerText = data.body;

    modalTags.innerHTML = '';
    data.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'project-pill highlight';
      span.innerText = t;
      modalTags.appendChild(span);
    });

    modalHighlights.innerHTML = '';
    data.highlights.forEach(h => {
      const li = document.createElement('li');
      li.className = 'modal-highlight-item';
      li.innerText = h;
      modalHighlights.appendChild(li);
    });

    if (modalActions) {
      let buttonsHtml = '';

      if (data.docsUrl) {
        buttonsHtml += `
          <a href="${data.docsUrl}" target="_blank" rel="noopener" class="btn-submit-appointment" style="width: auto; padding: 12px 20px; text-decoration: none;">
            <span>🌐 Open Live Documentation</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `;
      }

      if (data.githubUrl) {
        buttonsHtml += `
          <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn-contact-pill" style="padding: 10px 18px; font-size: 13px; text-decoration: none; background: #1b1b1b; color: #ffffff; border-color: #1b1b1b; display: inline-flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span>GitHub Repository</span>
          </a>
        `;
      }

      if (data.repos && data.repos.length > 0) {
        buttonsHtml += `
          <div style="width: 100%; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-light); display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Repositories:</span>
            ${data.repos.map(r => `
              <a href="${r.url}" target="_blank" rel="noopener" class="key-pill" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: var(--text-dark); background: var(--bg-card-inner); padding: 4px 10px; border-radius: var(--radius-pill); transition: background 0.2s;">
                <span>📂 ${r.name}</span>
                <span style="color: var(--accent-orange);">↗</span>
              </a>
            `).join('')}
          </div>
        `;
      }

      modalActions.innerHTML = buttonsHtml;
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-project-key]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.getAttribute('data-project-key');
      openModal(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------
   9. INTERACTIVE CONTACT FORM
   ------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('appointment-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = form.querySelector('[name="firstName"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();

    if (!firstName || !email) {
      feedback.style.display = 'block';
      feedback.className = 'form-feedback-message';
      feedback.style.color = '#dc2626';
      feedback.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      feedback.innerText = 'Please complete all required fields.';
      return;
    }

    // Success Simulation
    feedback.className = 'form-feedback-message success';
    feedback.innerText = `Thank you, ${firstName}! Your message has been sent to Veeresh. I will reply to ${email} shortly.`;
    feedback.style.display = 'block';

    form.reset();

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 6000);
  });
}

/* -------------------------------------------------------------------
   10. QUICK COPY CONTACT WITH TOAST
   ------------------------------------------------------------------- */
function initQuickCopy() {
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy');
      if (!val) return;

      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied to clipboard: ${val}`);
      }).catch(() => {
        showToast(`Copied: ${val}`);
      });
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#1b1b1b';
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '13px';
    toast.style.fontWeight = '500';
    toast.style.zIndex = '100000';
    toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    document.body.appendChild(toast);
  }

  toast.innerText = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 2800);
}
