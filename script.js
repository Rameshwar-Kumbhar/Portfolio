/* ============================================================
   SCRIPT.JS — Personal Scientific Journey Website
   Responsibilities:
     1. Project data store (edit PROJECTS to add/remove entries)
     2. Timeline bucket generation (6-month intervals, auto-derived)
     3. Timeline rendering (continuous spine with project entries)
     4. Timeline navigation (drag, arrows, keyboard, dots, progress)
     5. Project modal (open / close / focus trap / keyboard)
     6. Scroll-triggered reveal animations
     7. Sticky header
     8. Footer year
   ============================================================ */

'use strict';


/* ============================================================
   1. PROJECT DATA
   ============================================================
   Each project now carries a precise `year` (number) and
   `month` (1–12) so the timeline can place it correctly.
   All other fields are unchanged from the previous version.

   To add a project: append an object below the last entry.
   The timeline regenerates entirely from this array — no HTML edits needed.
   ============================================================ */
const PROJECTS = [
  {
    id: 'Basic Electronics',
    year: 2023,
    month: 10,          
    title: 'Voltage Regulator Circuit',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Predictive maintainance',
    year: 2024,
    month: 3,          
    title: 'Fault Detection in Power Lines',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Industrial Automation',
    year: 2024,
    month: 8,          
    title: 'Linear Actuator',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Industrial Automation',
    year: 2024,
    month: 8,          
    title: 'Solenoid Actuator',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Avionics',
    year: 2024,
    month: 10,          
    title: 'Silent Drone',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Satellite Launcher',
    year: 2025,
    month: 2,          
    title: 'Slingshot Satellite Launcher',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Astronomy Instrumentation',
    year: 2025,
    month: 5,          
    title: 'CALLISTO Setup at IISER Pune',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Motor Control',
    year: 2025,
    month: 4,          
    title: 'Stepper Motor Controller',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Astronomy Instrumentation',
    year: 2025,
    month: 5,          
    title: 'RadioJOVE Setup at IISER Pune',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'PLR Internship',
    year: 2025,
    month: 3,          
    title: 'Inverse Kinematics Calculator',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'PLR Internship',
    year: 2025,
    month: 4,          
    title: 'High Resolution Absolute Encoder',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'IOT',
    year: 2025,
    month: 9,          
    title: 'Cloud Plateform for IOT Devices',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Verilog',
    year: 2025,
    month: 10,          
    title: 'Ethernet MAC in Verilog',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Visiting Student',
    year: 2025,
    month: 12,          
    title: 'Gauribidanur Radio Observatory - Visiting Student',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'Power Electronics',
    year: 2026,
    month: 4,          
    title: 'Switch Mode Power Supply',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'CMOS Design',
    year: 2026,
    month: 5,          
    title: 'SRAM Array Design',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'PLR Internship',
    year: 2026,
    month: 3,          
    title: 'Industrial I/O Board',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'PLR Internship',
    year: 2026,
    month: 3,          
    title: 'Collision Detection System',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'PLR Internship',
    year: 2026,
    month: 4,          
    title: 'Robot Control Box',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  {
    id: 'PLR Internship',
    year: 2026,
    month: 5,          
    title: 'Field Oriented Controller',
    shortDesc: '',
    image: '',         
    tags: ['', '', ''],
    sections: {
      overview:        '',
      motivation:      '',
      problemStatement:'',
      technicalDetails:'',
      lessonsLearned:  '',
      futureWork:      '',
    },
  },
  // ── ADD FUTURE PROJECTS BELOW THIS LINE ──────────────────────
  // {
  //   id: 'unique-id',
  //   year: 2025,
  //   month: 6,
  //   title: 'Project Title',
  //   shortDesc: 'One or two sentences.',
  //   image: '',
  //   tags: ['Tag1', 'Tag2'],
  //   sections: {
  //     overview: '', motivation: '', problemStatement: '',
  //     technicalDetails: '', lessonsLearned: '', futureWork: '',
  //   },
  // },
];


/* ============================================================
   2. MODAL SECTION DEFINITIONS (unchanged from v1)
   ============================================================ */
const MODAL_SECTIONS = [
  { key: 'overview',          label: 'Overview' },
  { key: 'motivation',        label: 'Motivation' },
  { key: 'problemStatement',  label: 'Problem Statement' },
  { key: 'technicalDetails',  label: 'Technical Details' },
  { key: 'lessonsLearned',    label: 'Lessons Learned' },
  { key: 'futureWork',        label: 'Future Work' },
];


/* ============================================================
   3. DOM REFERENCES
   ============================================================ */
const track          = document.getElementById('timelineTrack');
const dotsContainer  = document.getElementById('timelineDots');
const btnPrev        = document.getElementById('tlPrev');
const btnNext        = document.getElementById('tlNext');
const periodLabel    = document.getElementById('tlPeriodLabel');
const progressFill   = document.getElementById('tlProgressFill');
const modalOverlay   = document.getElementById('modalOverlay');
const modal          = document.getElementById('modal');
const modalContent   = document.getElementById('modalContent');
const modalClose     = document.getElementById('modalClose');
const siteHeader     = document.getElementById('siteHeader');


/* ============================================================
   4. BUCKET GENERATION
   ============================================================
   A "bucket" is a 6-month interval, labelled e.g. "2024 H2".
   H1 = Jan–Jun (months 1–6), H2 = Jul–Dec (months 7–12).

   We derive the range from the project data, then fill in
   every intermediate half-year, even if it contains no projects.

   Buckets are ordered NEWEST FIRST (left to right = past).
   ============================================================ */

/**
 * Returns { year, half } for a project.
 * half = 1 (Jan–Jun) or 2 (Jul–Dec).
 */
function projectBucket (project) {
  return {
    year: project.year,
    half: project.month <= 6 ? 1 : 2,
  };
}

/** Unique stable key for a bucket, sortable as a string. */
function bucketKey ({ year, half }) {
  return `${year}-H${half}`;
}

/** Human label for a bucket. */
function bucketLabel ({ year, half }) {
  return `${year} H${half}`;
}

/** Numeric value for sorting (higher = newer). */
function bucketOrdinal ({ year, half }) {
  return year * 2 + half;
}

/**
 * Generate all buckets between (and including) the oldest
 * and newest project dates, ordered newest-first.
 */
function generateBuckets () {
  if (PROJECTS.length === 0) return [];

  // Find extremes
  let minOrdinal = Infinity;
  let maxOrdinal = -Infinity;

  PROJECTS.forEach(p => {
    const b = projectBucket(p);
    const o = bucketOrdinal(b);
    if (o < minOrdinal) minOrdinal = o;
    if (o > maxOrdinal) maxOrdinal = o;
  });

  // Walk from newest (highest ordinal) to oldest.
  // Reverse-map: ordinal = year*2 + half  (half ∈ {1,2})
  //   odd  ordinal → half = 1  → year = (ord - 1) / 2
  //   even ordinal → half = 2  → year = (ord - 2) / 2
  const buckets = [];
  for (let ord = maxOrdinal; ord >= minOrdinal; ord--) {
    const half = (ord % 2 === 0) ? 2 : 1;
    const year = (half === 1) ? (ord - 1) / 2 : (ord - 2) / 2;
    buckets.push({ year, half });
  }
  return buckets;
}

/**
 * Map each project to its bucket key.
 * Returns: { [bucketKey]: [project, ...] }
 */
function groupProjectsByBucket () {
  const map = {};
  PROJECTS.forEach(p => {
    const key = bucketKey(projectBucket(p));
    if (!map[key]) map[key] = [];
    map[key].push(p);
  });
  return map;
}


/* ============================================================
   5. TIMELINE RENDERING — Branching Trail Layout
   ============================================================
   Each semester bucket sits on the horizontal spine.
   Projects branch off as horizontal trails — odd projects go
   ABOVE the spine, even projects go BELOW — so they alternate
   like branches on a stem and never need vertical scrolling.

       O────────────[ Project A ]   (below)
       O──────[ Proj B ]            (above)
       O────────────────────[ C ]   (below)
       O──[ Project D ]             (above)

   Bucket width expands dynamically to fit all trails side-by-side.
   ============================================================ */
let BUCKETS = [];
let currentIndex = 0;

const CARD_W      = 175;   /* px — width of each project card */
const CARD_GAP    = -30;    /* px — horizontal gap between cards */
const BUCKET_PAD  = 28;    /* px — left padding before first trail */
const RIGHT_PAD   = 60;      /* px — right padding after last trail */

function renderTimeline () {
  track.innerHTML         = '';
  dotsContainer.innerHTML = '';

  BUCKETS = generateBuckets();
  const byBucket = groupProjectsByBucket();

  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun',
                       'Jul','Aug','Sep','Oct','Nov','Dec'];

  let prevYear = null;

  BUCKETS.forEach((bucket, bIndex) => {
    const key      = bucketKey(bucket);
    const label    = bucketLabel(bucket);
    const projects = (byBucket[key] || [])
     .sort((a, b) => b.month - a.month);
    const isEmpty  = projects.length === 0;
    const count    = projects.length;

    /* Dynamic bucket width grows to fit all trails side-by-side */
    const bucketW = isEmpty
     ? 220
     : BUCKET_PAD + count * (CARD_W + CARD_GAP) + RIGHT_PAD;

    /* ── Detect year change ───────────────────────────────── */
    const isNewYear = (prevYear !== null && bucket.year !== prevYear);
    prevYear = bucket.year;

    /* ── Bucket column ────────────────────────────────────── */
    const col = document.createElement('div');
    col.className     = 'tl-bucket';
    col.dataset.index = bIndex;
    col.style.width   = `${bucketW}px`;

    if (isNewYear) {
      col.classList.add('tl-bucket--new-year');
      col.dataset.year = String(bucket.year);
    }

    /* Tick on spine */
    const tick = document.createElement('div');
    tick.className = 'tl-bucket-tick';
    tick.setAttribute('aria-hidden', 'true');
    col.appendChild(tick);

    /* Period label — always above the spine */
    const lbl = document.createElement('div');
    lbl.className   = 'tl-bucket-label label-above';
    lbl.textContent = label;
    lbl.setAttribute('aria-hidden', 'true');
    col.appendChild(lbl);

    /* ── Trails wrapper ───────────────────────────────────── */
    const trailsWrap = document.createElement('div');
    trailsWrap.className = 'tl-trails';

    if (isEmpty) {
      const ghost = document.createElement('div');
      ghost.className   = 'tl-empty-note';
      ghost.textContent = '— quiet —';
      trailsWrap.appendChild(ghost);
    } else {
      projects.forEach((project, pIndex) => {
        const dateStamp = `${MONTH_NAMES[project.month - 1]} ${project.year}`;

        /*
          Even index  → trail branches BELOW the spine
          Odd index   → trail branches ABOVE the spine
          Each trail is offset horizontally by its index so cards
          fan out left-to-right inside the bucket.
        */
        const side = (pIndex % 2 === 0) ? 'below' : 'above';

        const trail = document.createElement('div');
        trail.className = `tl-trail tl-trail--${side}`;
        trail.style.setProperty('--ti', pIndex);         /* trail index for offset */
        trail.style.setProperty('--card-w',     `${CARD_W}px`);
        trail.style.setProperty('--card-gap',   `${CARD_GAP}px`);
        trail.style.setProperty('--bucket-pad', `${BUCKET_PAD}px`);

        /* The horizontal branch line */
        const line = document.createElement('div');
        line.className = 'tl-trail-line';
        line.setAttribute('aria-hidden', 'true');
        trail.appendChild(line);

        /* Project card at the tip of the trail */
        const entry = document.createElement('article');
        entry.className  = 'tl-entry';
        entry.setAttribute('role', 'button');
        entry.setAttribute('tabindex', '0');
        entry.setAttribute('aria-label', `Open project: ${project.title}`);
        entry.style.setProperty('--entry-delay', `${bIndex * 0.08 + pIndex * 0.07}s`);

        const tagsHtml = project.tags
          .filter(t => t)
          .map(t => `<span class="tl-entry-tag">${t}</span>`)
          .join('');

        const shortDescHtml = project.shortDesc
          ? `<p class="tl-entry-desc">${project.shortDesc}</p>`
          : '';
        const tagsWrapHtml = tagsHtml
          ? `<div class="tl-entry-tags">${tagsHtml}</div>`
          : '';

        entry.innerHTML = `
          <span class="tl-entry-date">${dateStamp}</span>
          <h3 class="tl-entry-title">${project.title}</h3>
          ${shortDescHtml}
          ${tagsWrapHtml}
          <span class="tl-entry-hint">Read →</span>
        `;

        entry.addEventListener('click',   ()  => openModal(project));
        entry.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(project);
          }
        });

        trail.appendChild(entry);
        trailsWrap.appendChild(trail);
      });
    }

    col.appendChild(trailsWrap);
    track.appendChild(col);

    /* ── Nav dot for this bucket ──────────────────────────── */
    const dot = document.createElement('button');
    dot.className     = 'tl-dot';
    dot.setAttribute('aria-label', `Go to ${label}`);
    dot.dataset.index = bIndex;
    dot.addEventListener('click', () => scrollToBucket(bIndex));
    dotsContainer.appendChild(dot);
  });

  /* Initialise UI */
  scrollToBucket(0, /* animate= */ false);
}


/* ============================================================
   6. TIMELINE NAVIGATION
   ============================================================ */

/** Width of the currently-active bucket column (dynamic in trail layout). */
function bucketWidth () {
  const col = track.querySelector('.tl-bucket');
  if (!col) return 280;
  return col.offsetWidth;
}

/** Scroll so bucket[index] is at the left edge of the viewport. */

function scrollToBucket(index, animate = true) {
  const total = BUCKETS.length;
  index = Math.max(0, Math.min(index, total - 1));
  currentIndex = index;

  const cols = track.querySelectorAll('.tl-bucket');

  /* Desired offset = start position of selected bucket */
  let offset = 0;
  for (let i = 0; i < index && i < cols.length; i++) {
    offset += cols[i].offsetWidth;
  }

  /* Prevent scrolling beyond the actual end of content */
  const wrapper = document.querySelector('.timeline-track-wrapper');

  const trackWidth =
    track.scrollWidth;

  const viewportWidth =
    wrapper.clientWidth;

  const maxOffset =
    Math.max(0, trackWidth - viewportWidth);

  offset = Math.min(offset, maxOffset);

  if (!animate) {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${offset}px)`;

    requestAnimationFrame(() => {
      track.style.transition = '';
    });
  } else {
    track.style.transform = `translateX(-${offset}px)`;
  }

  updateControls(index, total);
}

function updateControls (index, total) {
  // Arrow buttons
  btnPrev.disabled = (index <= 0);
  btnNext.disabled = (index >= total - 1);

  // Period label — show the label of the currently visible bucket
  if (BUCKETS[index]) {
    periodLabel.textContent = bucketLabel(BUCKETS[index]);
  }

  // Progress bar (0% = newest/leftmost, 100% = oldest/rightmost)
  const pct = total > 1 ? (index / (total - 1)) * 100 : 0;
  progressFill.style.width = `${pct}%`;

  // Dots
  dotsContainer.querySelectorAll('.tl-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  // Active bucket highlight
  track.querySelectorAll('.tl-bucket').forEach((col, i) => {
    col.classList.toggle('is-active', i === index);
  });
}

btnPrev.addEventListener('click', () => scrollToBucket(currentIndex - 1));
btnNext.addEventListener('click', () => scrollToBucket(currentIndex + 1));


/* ============================================================
   7. DRAG TO SCROLL (touch + mouse)
   ============================================================ */
(function initDrag () {
  const wrapper = document.querySelector('.timeline-track-wrapper');
  if (!wrapper) return;

  let isDragging  = false;
  let startX      = 0;
  let startOffset = 0;

  function getCurrentOffset () {
    const matrix = new DOMMatrix(window.getComputedStyle(track).transform);
    return -matrix.m41;
  }

  function onPointerDown (e) {
    isDragging  = true;
    startX      = e.touches ? e.touches[0].clientX : e.clientX;
    startOffset = getCurrentOffset();
    wrapper.classList.add('is-dragging');
    track.style.transition = 'none';
  }

  function onPointerMove (e) {
    if (!isDragging) return;
    const x      = e.touches ? e.touches[0].clientX : e.clientX;
    const delta  = startX - x;
    /* Max offset = sum of all bucket widths minus the last one */
    const cols   = track.querySelectorAll('.tl-bucket');
    let maxOff   = 0;
    cols.forEach((c, i) => { if (i < cols.length - 1) maxOff += c.offsetWidth; });
    const newOff = Math.max(0, Math.min(startOffset + delta, maxOff));
    track.style.transform = `translateX(-${newOff}px)`;
  }

  function onPointerUp (e) {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('is-dragging');
    track.style.transition = '';

    const endX    = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta   = startX - endX;
    /* Use the active bucket's width as threshold for snap */
    const cols    = track.querySelectorAll('.tl-bucket');
    const bw      = cols[currentIndex] ? cols[currentIndex].offsetWidth : 280;
    const stepped = delta > bw * 0.2  ? currentIndex + 1
                  : delta < -bw * 0.2 ? currentIndex - 1
                  : currentIndex;
    scrollToBucket(stepped);
  }

  // Mouse
  wrapper.addEventListener('mousedown',  onPointerDown);
  window.addEventListener('mousemove',   onPointerMove);
  window.addEventListener('mouseup',     onPointerUp);

  // Touch
  wrapper.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove',   onPointerMove, { passive: true });
  window.addEventListener('touchend',    onPointerUp);

  // Prevent click events from firing after a real drag
  wrapper.addEventListener('click', e => {
    if (Math.abs(startX - (e.clientX || 0)) > 8) e.stopPropagation();
  }, true);
})();


/* ============================================================
   8. KEYBOARD NAVIGATION
   Arrow keys move between buckets when modal is closed.
   ============================================================ */
function initKeyboardNav () {
  document.addEventListener('keydown', e => {
    if (!modalOverlay.hidden) return;
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    // Note: timeline is newest-left, so ArrowLeft → newer (lower index)
    //       ArrowRight → older (higher index) — matches spatial layout.
    if (e.key === 'ArrowRight') scrollToBucket(currentIndex + 1);
    if (e.key === 'ArrowLeft')  scrollToBucket(currentIndex - 1);
  });
}


/* ============================================================
   9. MODAL — OPEN / CLOSE / FOCUS TRAP
   ============================================================ */
function openModal (project) {
  const tagsHtml = project.tags
    .map(t => `<span class="modal-tag">${t}</span>`)
    .join('');

  const sectionsHtml = MODAL_SECTIONS
    .filter(s => project.sections && project.sections[s.key])
    .map(s => `
      <div class="modal-section">
        <h3 class="modal-section-title">${s.label}</h3>
        <p>${project.sections[s.key]}</p>
      </div>
    `).join('');

  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
  const dateStr = `${monthNames[project.month - 1]} ${project.year}`;

  const heroImgHtml = project.image
    ? `<img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;" />`
    : `<div class="placeholder-image" style="width:100%;height:100%;border-radius:0;border:none;"><span class="placeholder-label">Image coming</span></div>`;

  modalContent.innerHTML = `
    <p class="modal-year">${dateStr}</p>
    <h2 class="modal-title">${project.title}</h2>
    <div class="modal-hero-image">${heroImgHtml}</div>
    <div class="modal-tags">${tagsHtml}</div>
    ${sectionsHtml}
    <div class="modal-cta-row">
      <a href="project.html?id=${project.id}" class="btn-outline">Full write-up →</a>
    </div>
  `;

  modalOverlay.hidden          = false;
  document.body.style.overflow = 'hidden';
  modal.scrollTop              = 0;

  requestAnimationFrame(() => {
    setTimeout(() => modalClose.focus(), 50);
  });
}

function closeModal () {
  modalOverlay.hidden          = true;
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});


/* ============================================================
   10. SCROLL-TRIGGERED REVEAL ANIMATIONS
   ============================================================ */
function initRevealAnimations () {
  const targets = document.querySelectorAll(
    '.timeline-header, .spotlight-inner, .about-inner, .contact-inner'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach(el => obs.observe(el));
}


/* ============================================================
   11. STICKY HEADER
   ============================================================ */
function initStickyHeader () {
  const onScroll = () =>
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* ============================================================
   12. FOOTER YEAR
   ============================================================ */
function updateFooterYear () {
  const yr = document.getElementById('footerYear');
  if (yr) yr.textContent = new Date().getFullYear();

  const up = document.getElementById('lastUpdated');
  if (up) up.textContent = new Date().toLocaleDateString('en-IN', {
    month: 'long', year: 'numeric',
  });
}


/* ============================================================
   13. BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  initRevealAnimations();
  initStickyHeader();
  updateFooterYear();
  initKeyboardNav();
});