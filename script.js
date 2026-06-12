/* ============================================================
   SCRIPT.JS — Personal Scientific Journey Website
   Responsibilities:
     1. Project data store (edit this to add/remove projects)
     2. Timeline rendering (cards injected from data)
     3. Timeline navigation (drag, arrow buttons, progress dots)
     4. Project modal (open / close / keyboard trap)
     5. Scroll-triggered reveal animations
     6. Sticky header on scroll
     7. Footer year auto-update
   ============================================================ */

'use strict';


/* ============================================================
   1. PROJECT DATA
   ============================================================
   Add objects to this array to create new timeline cards.
   'image': path to an image file, or '' for the placeholder.
   'tags': short keyword strings shown as chips.
   'sections': keyed content blocks rendered inside the modal.

   The array is roughly chronological — oldest first.
   ============================================================ */
const PROJECTS = [
  {
    id: 'carry-select-adder',
    year: '2022',
    title: '512-bit Carry-Select Adder',
    shortDesc: 'Deriving critical path delay formulae across four block-size configurations for a high-speed adder design.',
    image: '',   // Replace with: 'images/carry-select.jpg'
    tags: ['Digital Logic', 'VLSI', 'Computer Architecture'],
    sections: {
      overview: 'A deep-dive into the timing analysis of a carry-select adder architecture, working through the mathematics of critical path delay from first principles.',
      motivation: 'Understanding why certain adder topologies trade area for speed is fundamental to any serious work in hardware design. This project was the forcing function.',
      problemStatement: 'Given a 512-bit carry-select adder partitioned into blocks of varying widths, derive the critical path delay for each configuration and identify the optimal block-size scheme.',
      technicalDetails: 'Block sizes of 8, 16, 32, and 64 bits were analysed. Delay formulae were derived iteratively, accounting for the dual ripple-carry structure within each block and the final selection multiplexers.',
      lessonsLearned: 'Small errors in delay modelling compound quickly across 512 bits. Getting the foundational formula right before substituting numbers is not optional.',
      futureWork: 'Implement a simulation in a hardware description language and compare measured timing against the analytical model.',
    },
  },
  {
    id: 'pmsm-foc-model',
    year: '2023',
    title: 'PMSM Motor Model & FOC Simulation',
    shortDesc: 'Building a physically grounded Python model for a Permanent Magnet Synchronous Motor — and fixing the subtle physics errors that caused a PI controller to run away.',
    image: '',   // Replace with: 'images/pmsm-sim.jpg'
    tags: ['Motor Control', 'FOC', 'Python', 'PMSM'],
    sections: {
      overview: 'A rigorous audit and correction of a PMSM model in Python, followed by a full Field-Oriented Control simulation built from verified physical primitives.',
      motivation: 'The popular model in circulation had three silent but critical errors: independently chosen Ke and Kt constants (violating energy conservation), a 90° back-EMF phase error, and missing pole pairs in the torque equation. None of them triggered obvious warnings.',
      problemStatement: 'An FOC PI controller was diverging in simulation. The source was traced to the back-EMF error propagating through the dq-frame transformations.',
      technicalDetails: 'The corrected model derives all constants from two physical primitives: λ_m (flux linkage) and p (pole pairs). This guarantees Kt = (3/2)·Ke and correct phase relationships by construction. The back-EMF is expressed as a function of cos(θ_e), not sin(θ_e).',
      lessonsLearned: 'A model that produces plausible-looking graphs can still be fundamentally wrong. Physical consistency checks — energy balance, dimensional analysis — should precede any tuning.',
      futureWork: 'Extend the model to include iron losses, saturation effects, and a full space-vector PWM stage.',
    },
  },
  {
    id: 'as5311-encoder',
    year: '2024',
    title: 'AS5311 Incremental Absolute Encoder',
    shortDesc: 'Implementing a high-resolution magnetic encoder for FOC using the AS5311 sensor and a 63-pole-pair ring magnet — including angle wrap correction logic.',
    image: '',
    tags: ['Embedded', 'FOC', 'Encoder', 'C/C++'],
    sections: {
      overview: 'Firmware implementation of an absolute position encoder using the AS5311 magnetic sensor paired with a 63 pole-pair ring, for use in real-time FOC angle feedback.',
      motivation: 'Precise electrical angle is the critical input for any FOC algorithm. Optical encoders are fragile; this design uses a contactless magnetic approach suitable for the target motor geometry.',
      problemStatement: 'The raw sensor output wraps at each magnetic pole boundary. Converting this to a continuous mechanical angle — and then to an electrical angle — requires careful bookkeeping across wraps.',
      technicalDetails: 'The firmware maintains a wrap counter that increments/decrements based on the direction of the discontinuity. Electrical angle is derived as θ_e = (θ_mechanical × p) mod 2π, where p = 63.',
      lessonsLearned: 'Angle wrap bugs are invisible at low speed and catastrophic at high speed. Testing the wrap logic explicitly, with simulated discontinuities, is mandatory before connecting to a real motor.',
      futureWork: 'Integrate with the PMSM FOC firmware loop and benchmark latency against the control cycle period.',
    },
  },
  {
    id: 'iot-energy-platform',
    year: '2024–2025',
    title: 'IoT Energy Monitoring Platform',
    shortDesc: 'A multi-tenant ESP8266-based platform for real-time household energy monitoring — with dynamic Wi-Fi provisioning, WebSocket Secure communication, and an AI auditing layer.',
    image: '',
    tags: ['IoT', 'ESP8266', 'Embedded', 'AI', 'Research'],
    sections: {
      overview: 'A full-stack IoT platform designed at VIIT Pune, combining embedded sensor nodes, a cloud backend, and an AI-driven energy auditing system called EnergyIQ.',
      motivation: 'Most consumer energy monitors are single-tenant, cloud-locked, and opaque. This platform is open, multi-tenant, and designed to expose actionable intelligence rather than raw numbers.',
      problemStatement: 'Design a system that allows multiple households to monitor energy independently on shared infrastructure, with secure communication, offline fallback, and an AI layer that interprets consumption patterns.',
      technicalDetails: 'Sensor nodes run on ESP8266 with dynamic Wi-Fi provisioning (no hardcoded credentials). Communication uses WebSocket Secure (WSS) over TLS. The AI layer (EnergyIQ) uses XGBoost for anomaly detection and a RAG pipeline with Llama 3.1 via Groq for natural-language energy advice.',
      lessonsLearned: 'Multi-tenancy at the firmware level requires careful namespace isolation. The WiFi provisioning flow is the most user-visible part of the system — it must be foolproof.',
      futureWork: 'Publish the IEEE paper, deploy a pilot with real households, and open-source the firmware.',
    },
  },
  // ── ADD FUTURE PROJECTS BELOW THIS LINE ──────────────────────
  // {
  //   id: 'unique-id',
  //   year: '2025',
  //   title: 'Project Title',
  //   shortDesc: 'One or two sentences describing the project.',
  //   image: '',
  //   tags: ['Tag1', 'Tag2'],
  //   sections: {
  //     overview: 'Placeholder',
  //     motivation: 'Placeholder',
  //     problemStatement: 'Placeholder',
  //     technicalDetails: 'Placeholder',
  //     lessonsLearned: 'Placeholder',
  //     futureWork: 'Placeholder',
  //   },
  // },
];


/* ============================================================
   2. DOM REFERENCES
   ============================================================ */
const track        = document.getElementById('timelineTrack');
const dotsContainer = document.getElementById('timelineDots');
const btnPrev      = document.getElementById('tlPrev');
const btnNext      = document.getElementById('tlNext');
const modalOverlay = document.getElementById('modalOverlay');
const modal        = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');
const siteHeader   = document.getElementById('siteHeader');


/* ============================================================
   3. TIMELINE — RENDER CARDS
   ============================================================ */
function renderTimeline () {
  // Clear any existing content
  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  PROJECTS.forEach((project, index) => {
    // ── Card element ──────────────────────────────────────────
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open project: ${project.title}`);
    // Staggered entrance animation delay
    card.style.setProperty('--delay', `${index * 0.1}s`);

    // Image or placeholder
    const imageHtml = project.image
      ? `<img src="${project.image}" alt="${project.title}" loading="lazy" />`
      : `<div class="placeholder-image" style="width:100%;height:100%;border-radius:0;border:none;">
           <span class="placeholder-label">Image coming</span>
         </div>`;

    // Tags
    const tagsHtml = project.tags
      .map(t => `<span class="card-tag">${t}</span>`)
      .join('');

    card.innerHTML = `
      <div class="card-image">${imageHtml}</div>
      <div class="card-body">
        <span class="card-year">${project.year}</span>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.shortDesc}</p>
        <div class="card-tags">${tagsHtml}</div>
        <p class="card-link-hint">Click to read full account →</p>
      </div>
    `;

    // Open modal on click or keyboard
    card.addEventListener('click', () => openModal(project));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(project);
      }
    });

    track.appendChild(card);

    // ── Dot for this card ─────────────────────────────────────
    const dot = document.createElement('button');
    dot.className = 'tl-dot';
    dot.setAttribute('aria-label', `Go to project: ${project.title}`);
    dot.dataset.index = index;
    dot.addEventListener('click', () => scrollToCard(index));
    dotsContainer.appendChild(dot);
  });

  // Activate first dot
  updateDots(0);
  updateArrows();
}


/* ============================================================
   4. TIMELINE — SCROLL / NAVIGATION
   ============================================================ */
let currentIndex = 0;

function cardStepWidth () {
  // Width of one card + its gap
  const card = track.querySelector('.project-card');
  if (!card) return 340;
  const gap = parseInt(getComputedStyle(track).gap) || 24;
  return card.offsetWidth + gap;
}

function scrollToCard (index) {
  const total = PROJECTS.length;
  // Clamp
  index = Math.max(0, Math.min(index, total - 1));
  currentIndex = index;

  const offset = cardStepWidth() * index;
  track.style.transform = `translateX(-${offset}px)`;

  updateDots(index);
  updateArrows();
}

function updateDots (activeIndex) {
  dotsContainer.querySelectorAll('.tl-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

function updateArrows () {
  btnPrev.disabled = currentIndex <= 0;
  btnNext.disabled = currentIndex >= PROJECTS.length - 1;
}

btnPrev.addEventListener('click', () => scrollToCard(currentIndex - 1));
btnNext.addEventListener('click', () => scrollToCard(currentIndex + 1));


/* ============================================================
   4a. TIMELINE — DRAG TO SCROLL
   ============================================================ */
(function initDrag () {
  const wrapper = document.querySelector('.timeline-track-wrapper');
  if (!wrapper) return;

  let isDragging = false;
  let startX = 0;
  let startOffset = 0;
  let currentOffset = 0;

  function getOffsetFromTransform () {
    const style = window.getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    return -matrix.m41; // translateX value (positive = shifted left)
  }

  function onPointerDown (e) {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    startOffset = getOffsetFromTransform();
    wrapper.classList.add('is-dragging');
    // Disable transition during drag for responsiveness
    track.style.transition = 'none';
  }

  function onPointerMove (e) {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = startX - x;
    currentOffset = startOffset + delta;

    // Clamp so you can't drag past first or last card
    const maxOffset = cardStepWidth() * (PROJECTS.length - 1);
    currentOffset = Math.max(0, Math.min(currentOffset, maxOffset));

    track.style.transform = `translateX(-${currentOffset}px)`;
  }

  function onPointerUp (e) {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('is-dragging');

    // Restore transition
    track.style.transition = '';

    // Snap to nearest card
    const stepW = cardStepWidth();
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = startX - endX;

    let snapped = currentIndex;
    if (Math.abs(delta) > stepW * 0.25) {
      snapped = delta > 0 ? currentIndex + 1 : currentIndex - 1;
    }

    scrollToCard(snapped);
  }

  // Mouse events
  wrapper.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  // Touch events
  wrapper.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Prevent link/card clicks from firing after a real drag
  wrapper.addEventListener('click', e => {
    if (Math.abs(startX - (e.clientX || 0)) > 8) e.stopPropagation();
  }, true);
})();


/* ============================================================
   5. MODAL — OPEN / CLOSE / KEYBOARD
   ============================================================ */
const MODAL_SECTIONS = [
  { key: 'overview',          label: 'Overview' },
  { key: 'motivation',        label: 'Motivation' },
  { key: 'problemStatement',  label: 'Problem Statement' },
  { key: 'technicalDetails',  label: 'Technical Details' },
  { key: 'lessonsLearned',    label: 'Lessons Learned' },
  { key: 'futureWork',        label: 'Future Work' },
  // Add more section keys here as needed:
  // { key: 'gallery',        label: 'Gallery' },
  // { key: 'downloads',      label: 'Downloads' },
];

function openModal (project) {
  // Build tags HTML
  const tagsHtml = project.tags
    .map(t => `<span class="modal-tag">${t}</span>`)
    .join('');

  // Build sections HTML — only render sections that have content
  const sectionsHtml = MODAL_SECTIONS
    .filter(s => project.sections && project.sections[s.key])
    .map(s => `
      <div class="modal-section">
        <h3 class="modal-section-title">${s.label}</h3>
        <p>${project.sections[s.key]}</p>
      </div>
    `).join('');

  // Hero image or placeholder
  const heroImgHtml = project.image
    ? `<img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;" />`
    : `<div class="placeholder-image" style="width:100%;height:100%;border-radius:0;border:none;"><span class="placeholder-label">Image coming</span></div>`;

  modalContent.innerHTML = `
    <p class="modal-year">${project.year}</p>
    <h2 class="modal-title">${project.title}</h2>
    <div class="modal-hero-image">${heroImgHtml}</div>
    <div class="modal-tags">${tagsHtml}</div>
    ${sectionsHtml}
    <div class="modal-cta-row">
      <!-- Replace '#' with a real link to a full write-up page when available -->
      <a href="project.html?id=${project.id}" class="btn-outline">Full write-up →</a>
    </div>
  `;

  modalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;

  // Focus the close button for accessibility
  requestAnimationFrame(() => {
    // Small delay lets the CSS transition play
    setTimeout(() => modalClose.focus(), 50);
  });
}

function closeModal () {
  modalOverlay.hidden = true;
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

// Close on overlay click (outside modal box)
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});


/* ============================================================
   6. SCROLL-TRIGGERED REVEAL ANIMATIONS
   Uses IntersectionObserver for performance.
   Add class="reveal" to any element you want to animate in.
   ============================================================ */
function initRevealAnimations () {
  const elements = document.querySelectorAll(
    '.timeline-header, .spotlight-inner, .about-inner, .contact-inner, .spotlight, .about, .contact'
  );

  // Add the reveal class programmatically
  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, no need to keep observing
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}


/* ============================================================
   7. STICKY HEADER ON SCROLL
   ============================================================ */
function initStickyHeader () {
  const onScroll = () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load in case page is already scrolled
}


/* ============================================================
   8. FOOTER — DYNAMIC YEAR
   ============================================================ */
function updateFooterYear () {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const updatedEl = document.getElementById('lastUpdated');
  if (updatedEl) {
    // Replace with a fixed date string if you prefer
    updatedEl.textContent = new Date().toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
  }
}


/* ============================================================
   9. KEYBOARD NAVIGATION FOR TIMELINE
   Left / Right arrow keys move through cards when the timeline
   section is in view.
   ============================================================ */
function initKeyboardNav () {
  document.addEventListener('keydown', e => {
    // Don't intercept if modal is open or focus is in an input
    if (!modalOverlay.hidden) return;
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'ArrowRight') scrollToCard(currentIndex + 1);
    if (e.key === 'ArrowLeft')  scrollToCard(currentIndex - 1);
  });
}


/* ============================================================
   10. INITIALISE EVERYTHING
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  initRevealAnimations();
  initStickyHeader();
  updateFooterYear();
  initKeyboardNav();
});