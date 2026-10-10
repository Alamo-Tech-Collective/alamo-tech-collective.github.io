// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 150);
      const end = start + Math.floor(Math.random() * 150);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.15) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}


// ——————————————————————————————————————————————————
// Auto-initialize TextScramble on elements with data-scramble attribute
// ——————————————————————————————————————————————————

function initializeTextScramble() {
  // Find all elements with data-scramble attribute
  const scrambleElements = document.querySelectorAll('[data-scramble]');

  scrambleElements.forEach(el => {
    // Get configuration from data attributes
    const text = el.dataset.scramble || el.innerText;
    const delay = parseInt(el.dataset.scrambleDelay) || 0;
    const loop = el.dataset.scrambleLoop === 'true';
    const interval = parseInt(el.dataset.scrambleInterval) || 3000;

    // Initialize scramble effect
    const fx = new TextScramble(el);

    const scramble = () => {
      fx.setText(text);
    };

    // Start after delay
    setTimeout(() => {
      scramble();

      // If loop is enabled, repeat the effect
      if (loop) {
        setInterval(scramble, interval);
      }
    }, delay);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTextScramble);
} else {
  initializeTextScramble();
}

// ——————————————————————————————————————————————————
// Cycle TextScramble through phrases via data-scramble-cycle="a|b|c"
// ——————————————————————————————————————————————————

function initializeScrambleCycle() {
  const cycleElements = document.querySelectorAll('[data-scramble-cycle]');

  cycleElements.forEach(el => {
    const lines = el.dataset.scrambleCycle.split('|').filter(Boolean);
    if (!lines.length) return;

    const delay = parseInt(el.dataset.scrambleDelay) || 0;
    const interval = parseInt(el.dataset.scrambleInterval) || 3000;
    const fx = new TextScramble(el);
    let index = Math.floor(Math.random() * lines.length);

    // Wait for each scramble to finish before scheduling the next
    const next = () => {
      fx.setText(lines[index]).then(() => setTimeout(next, interval));
      index = (index + 1) % lines.length;
    };

    setTimeout(next, delay);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeScrambleCycle);
} else {
  initializeScrambleCycle();
}

// ——————————————————————————————————————————————————
// RSVP Bar Width Setter
// ——————————————————————————————————————————————————

function initializeRsvpBars() {
  const rsvpBars = document.querySelectorAll('.rsvp-bar[data-width]');
  rsvpBars.forEach(bar => {
    const width = bar.dataset.width;
    if (width) {
      bar.style.width = `${width}%`;
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRsvpBars);
} else {
  initializeRsvpBars();
}

// ——————————————————————————————————————————————————
// Header hide/show on scroll
// ——————————————————————————————————————————————————

let lastScrollTop = 0;
const header = document.querySelector('.main-header');
let isHeaderHidden = false;

window.addEventListener('scroll', () => {
  const isMobile = window.innerWidth <= 768;

  // Skip scroll behavior on mobile
  if (isMobile) {
    header.style.transform = 'translateY(0)';
    return;
  }

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Scrolling down more than 50px - hide header
  if (scrollTop > lastScrollTop && scrollTop > 50 && !isHeaderHidden) {
    header.style.transform = 'translateY(-100%)';
    isHeaderHidden = true;
  }

  // Scrolling up more than 100px - show header
  if (scrollTop < lastScrollTop && scrollTop > 100 && isHeaderHidden) {
    header.style.transform = 'translateY(0)';
    isHeaderHidden = false;
  }

  // At top of page - always show header
  if (scrollTop <= 0) {
    header.style.transform = 'translateY(0)';
    isHeaderHidden = false;
  }

  lastScrollTop = scrollTop;
});

// ——————————————————————————————————————————————————
// Presentation page: show the next upcoming event from _data/events.json.
// Picked in the browser so it stays current between daily site rebuilds.
// ——————————————————————————————————————————————————

function initializeNextEvent() {
  const el = document.querySelector('[data-next-event]');
  const data = document.getElementById('presentation-events');
  if (!el || !data) return;

  let events;
  try {
    events = JSON.parse(data.textContent);
  } catch (e) {
    return;
  }

  const label = el.querySelector('.next-event__label');
  const title = el.querySelector('.next-event__title');
  const when = el.querySelector('.next-event__when');
  const timeZone = 'America/Chicago';

  const update = () => {
    const now = Date.now();
    const event = events.find(ev => Date.parse(ev.date) > now);

    if (!event) {
      label.textContent = '// NEW EVENTS SOON';
      title.textContent = 'Alamo Tech Collective';
      when.textContent = '';
      return;
    }

    const start = new Date(event.date);
    const day = start.toLocaleDateString('en-US', { timeZone, weekday: 'short', month: 'short', day: 'numeric' });
    const time = start.toLocaleTimeString('en-US', { timeZone, hour: 'numeric', minute: '2-digit' });

    label.textContent = '// NEXT UP';
    title.textContent = event.title;
    when.textContent = `${day.replace(',', '')} · ${time}`.toUpperCase();
  };

  update();
  setInterval(update, 60 * 1000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNextEvent);
} else {
  initializeNextEvent();
}
