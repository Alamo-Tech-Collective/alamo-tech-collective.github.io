# JOIN US Button — Complete Code Reference

This document contains all the code used to build the "JOIN US" button on the homepage of the Alamo Tech Collective Jekyll site, including the fade-in entrance animation and the hover glitch animation.

## Stack
- **Jekyll 3.9.3** (Liquid templating)
- **SCSS** (compiled by Jekyll)
- No JavaScript is required for this button — all animations are pure CSS.

---

## 1. HTML markup (Liquid template)

**File:** `_layouts/home.html` (lines 14–20)

```html
<button class="btn hero-cta">
  <a href="{{ page.hero_cta_link | default: '#' | relative_url }}" class="cyber-btn">
    JOIN US<span aria-hidden>_</span>
    <span aria-hidden class="cyber-btn__glitch">JOIN US</span>
  </a>
  <span aria-hidden class="btn__tag">B00</span>
</button>
```

### Notes
- The link text `JOIN US` is duplicated inside `.cyber-btn__glitch`. The duplicate sits on top of the original and is hidden until hover, when it becomes the animated glitch overlay.
- `B00` is the small tag in the bottom-right corner — purely decorative.
- The button uses the **default** `.btn` styling (no `.b-01` / `.b-02` modifier class), so it falls through to the base `.cyber-btn` rules.
- `.hero-cta` is the class that drives the fade-in entrance animation.

---

## 2. Front matter that supplies the link

**File:** `index.md` (lines 6–9)

```yaml
---
hero_title: San Antonio's Tech-Exclusive Hackerspace
hero_subtitle: Built for people who want to build, connect, and learn. No corporate noise. No gatekeeping. Just real community.
hero_cta_text: Join the Community
hero_cta_link: /get-involved
---
```

---

## 3. Hero fade-in (entrance animation)

**File:** `_sass/_home.scss` (lines 55–58)

```scss
.hero-cta {
  opacity: 0;
  animation: fadeInBtn 1s ease-in-out 2s forwards;
}
```

The button starts invisible. After a 2-second delay, it fades in over 1 second. `forwards` keeps it at `opacity: 1` after the animation finishes.

---

## 4. Fade-in keyframes

**File:** `_sass/_animations.scss` (lines 1–8)

```scss
@keyframes fadeInBtn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

## 5. Cyber font + base button styles

**File:** `_sass/_btn.scss` (lines 1–201)

```scss
@font-face {
  font-family: Cyber;
  src: url("https://assets.codepen.io/605876/Blender-Pro-Bold.otf");
  font-display: swap;
}

.btn {
  position: relative;
  background: transparent;
  border: 0;
  margin: 20px auto 30px;

  .cyber-btn {
    --shimmy-distance: 5;
    --clip-one:   polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%);
    --clip-two:   polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%);
    --clip-three: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%);
    --clip-four:  polygon(0 0,   100% 0,   100% 0,   95% 0,   95% 0,   85% 0,   85% 0,   8% 0,   0 0);
    --clip-five:  polygon(0 0,   100% 0,   100% 0,   95% 0,   95% 0,   85% 0,   85% 0,   8% 0,   0 0);
    --clip-six:   polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%);
    --clip-seven: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%);

    font-family: 'Cyber', sans-serif;
    position: relative;
    background: transparent;
    color: $cyan;                 // #70e1e8
    border: 2px solid $cyan;
    padding: 15px 50px;
    font-weight: bold;
    font-size: 25px;
    overflow: hidden;
    cursor: pointer;
    clip-path: polygon(           // chamfered cyberpunk outer shape
      0 0,
      100% 0,
      100% 100%,
      95% 100%,
      95% 90%,
      80% 90%,
      80% 100%,
      12% 100%,
      0 60%
    );
    transition: all 200ms linear;

    &:before {                    // small cyan triangle in bottom-left corner
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 0;
      border-bottom: 23px solid $cyan;
      border-right: 23px solid transparent;
    }

    &__glitch {                   // hover-only animated overlay
      position: absolute;
      top: calc(4px * -1);
      left: calc(4px * -1);
      right: calc(4px * -1);
      bottom: calc(4px * -1);
      background: $cyan;
      border: 2px solid $cyan;
      padding: 15px 50px;
      color: #000;
      clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        95% 100%,
        95% 90%,
        85% 90%,
        85% 100%,
        12% 100%,
        0 60%
      );
      animation: glitch 2s infinite;
      display: none;              // hidden until parent is hovered
    }
  }

  &__tag {                        // the "B00" tag in the corner
    font-family: 'Cyber', sans-serif;
    position: absolute;
    letter-spacing: 1px;
    bottom: -18px;
    right: 20px;
    color: $yellow;               // #f7d55e
    font-size: 10px;
    z-index: 10;
  }

  &:hover {
    .cyber-btn {
      border: 2px solid transparent;
      transition: all 200ms linear;

      &:before {
        border-bottom: 23px solid transparent;
        border-right: 23px solid transparent;
        transition: all 200ms linear;
      }
    }
    .cyber-btn__glitch { display: block; }  // reveals the glitch overlay
    .btn__tag          { color: $cyan; }
  }
}
```

### Notes on the variant classes (`.b-01`, `.b-01_5`, `.b-02`, `.b-03`)
The full `_btn.scss` file also contains these variant blocks. They override the `clip-path` of `.cyber-btn` to produce different chamfer widths in the bottom-left corner, and shift the position of `.btn__tag` accordingly. **The JOIN US button does not use any variant** — it uses the base `.btn` rules above.

---

## 6. Mobile button overrides

**File:** `_sass/_btn.scss` (lines 282–300)

```scss
@media (max-width: $breakpoint-mobile) {  // 768px
  .btn {
    .cyber-btn {
      padding: 15px 40px;
      font-size: 20px;
      clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        95% 100%,
        95% 90%,
        80% 90%,
        80% 100%,
        15% 100%,
        0 57.5%
      );
    }
    &__tag {
      bottom: -19px;
      right: 15px;
    }
  }
}
```

---

## 7. Glitch keyframes (hover animation)

**File:** `_sass/_animations.scss` (lines 10–69)

This is what runs on the `.cyber-btn__glitch` overlay when the user hovers. It cycles through the seven `--clip-*` polygons defined on `.cyber-btn` and shimmies the overlay horizontally by `--shimmy-distance` (5%) to fake a CRT glitch.

```scss
@keyframes glitch {
  0% {
    clip-path: var(--clip-one);
  }
  2%, 8% {
    clip-path: var(--clip-two);
    transform: translate(calc(var(--shimmy-distance) * -1%), 0);
  }
  6% {
    clip-path: var(--clip-two);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  9% {
    clip-path: var(--clip-two);
    transform: translate(0, 0);
  }
  10% {
    clip-path: var(--clip-three);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  13% {
    clip-path: var(--clip-three);
    transform: translate(0, 0);
  }
  14%, 21% {
    clip-path: var(--clip-four);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  25% {
    clip-path: var(--clip-five);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  30% {
    clip-path: var(--clip-five);
    transform: translate(calc(var(--shimmy-distance) * -1%), 0);
  }
  35%, 45% {
    clip-path: var(--clip-six);
    transform: translate(calc(var(--shimmy-distance) * -1%));
  }
  40% {
    clip-path: var(--clip-six);
    transform: translate(calc(var(--shimmy-distance) * 1%));
  }
  50% {
    clip-path: var(--clip-six);
    transform: translate(0, 0);
  }
  55% {
    clip-path: var(--clip-seven);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  60% {
    clip-path: var(--clip-seven);
    transform: translate(0, 0);
  }
  31%, 61%, 100% {
    clip-path: var(--clip-four);
  }
}
```

---

## 8. Color tokens used

**File:** `_sass/_variables.scss`

```scss
$black:  #1d1d1d;   // page background
$white:  #ffffff;
$red:    #d4675c;
$cyan:   #70e1e8;   // button border, text, glitch fill
$yellow: #f7d55e;   // B00 tag (default state)

$primary-font:   'Helvetica Neue', Helvetica, Arial, sans-serif;
$secondary-font: 'Orbitron', sans-serif;

$breakpoint-mobile: 768px;
```

---

## How it all fits together (timeline)

1. **Page load** — `.hero-cta` is invisible (`opacity: 0`).
2. **2s delay**, then `fadeInBtn` runs for 1s — button fades to fully visible.
3. **Idle state** — cyan-bordered, chamfered button reading `JOIN US_` with a yellow `B00` tag in the corner. A small cyan triangle sits in the bottom-left corner (`.cyber-btn:before`).
4. **Hover** —
   - The cyan border on `.cyber-btn` becomes transparent (200ms linear).
   - The bottom-left triangle becomes transparent.
   - `.cyber-btn__glitch` flips from `display: none` → `display: block`, revealing a cyan rectangle with black `JOIN US` text on top of the original.
   - The 2s infinite `glitch` keyframe animation runs on that overlay, swapping clip-paths and translating it horizontally to simulate a CRT/digital glitch effect.
   - `.btn__tag` color flips from yellow to cyan.
5. **Mouse leaves** — overlay returns to `display: none`, border + triangle fade back in.

---

## Minimum self-contained reproduction

If you want to drop this button into a non-Jekyll project, here is a minimal HTML + CSS version. Replace SCSS variables with their literal values.

```html
<button class="btn hero-cta">
  <a href="#" class="cyber-btn">
    JOIN US<span aria-hidden="true">_</span>
    <span aria-hidden="true" class="cyber-btn__glitch">JOIN US</span>
  </a>
  <span aria-hidden="true" class="btn__tag">B00</span>
</button>
```

```css
@font-face {
  font-family: Cyber;
  src: url("https://assets.codepen.io/605876/Blender-Pro-Bold.otf");
  font-display: swap;
}

@keyframes fadeInBtn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes glitch {
  0%        { clip-path: var(--clip-one); }
  2%, 8%    { clip-path: var(--clip-two);   transform: translate(calc(var(--shimmy-distance) * -1%), 0); }
  6%        { clip-path: var(--clip-two);   transform: translate(calc(var(--shimmy-distance) *  1%), 0); }
  9%        { clip-path: var(--clip-two);   transform: translate(0, 0); }
  10%       { clip-path: var(--clip-three); transform: translate(calc(var(--shimmy-distance) *  1%), 0); }
  13%       { clip-path: var(--clip-three); transform: translate(0, 0); }
  14%, 21%  { clip-path: var(--clip-four);  transform: translate(calc(var(--shimmy-distance) *  1%), 0); }
  25%       { clip-path: var(--clip-five);  transform: translate(calc(var(--shimmy-distance) *  1%), 0); }
  30%       { clip-path: var(--clip-five);  transform: translate(calc(var(--shimmy-distance) * -1%), 0); }
  35%, 45%  { clip-path: var(--clip-six);   transform: translate(calc(var(--shimmy-distance) * -1%)); }
  40%       { clip-path: var(--clip-six);   transform: translate(calc(var(--shimmy-distance) *  1%)); }
  50%       { clip-path: var(--clip-six);   transform: translate(0, 0); }
  55%       { clip-path: var(--clip-seven); transform: translate(calc(var(--shimmy-distance) *  1%), 0); }
  60%       { clip-path: var(--clip-seven); transform: translate(0, 0); }
  31%, 61%, 100% { clip-path: var(--clip-four); }
}

.btn {
  position: relative;
  background: transparent;
  border: 0;
  margin: 20px auto 30px;
}

.hero-cta {
  opacity: 0;
  animation: fadeInBtn 1s ease-in-out 2s forwards;
}

.cyber-btn {
  --shimmy-distance: 5;
  --clip-one:   polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%);
  --clip-two:   polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%);
  --clip-three: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%);
  --clip-four:  polygon(0 0,   100% 0,   100% 0,   95% 0,   95% 0,   85% 0,   85% 0,   8% 0,   0 0);
  --clip-five:  polygon(0 0,   100% 0,   100% 0,   95% 0,   95% 0,   85% 0,   85% 0,   8% 0,   0 0);
  --clip-six:   polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%);
  --clip-seven: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%);

  font-family: 'Cyber', sans-serif;
  position: relative;
  background: transparent;
  color: #70e1e8;
  border: 2px solid #70e1e8;
  padding: 15px 50px;
  font-weight: bold;
  font-size: 25px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 95% 100%, 95% 90%, 80% 90%, 80% 100%, 12% 100%, 0 60%);
  transition: all 200ms linear;
}

.cyber-btn:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 23px solid #70e1e8;
  border-right: 23px solid transparent;
}

.cyber-btn__glitch {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: #70e1e8;
  border: 2px solid #70e1e8;
  padding: 15px 50px;
  color: #000;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 12% 100%, 0 60%);
  animation: glitch 2s infinite;
  display: none;
}

.btn__tag {
  font-family: 'Cyber', sans-serif;
  position: absolute;
  letter-spacing: 1px;
  bottom: -18px;
  right: 20px;
  color: #f7d55e;
  font-size: 10px;
  z-index: 10;
}

.btn:hover .cyber-btn {
  border: 2px solid transparent;
  transition: all 200ms linear;
}

.btn:hover .cyber-btn:before {
  border-bottom: 23px solid transparent;
  border-right: 23px solid transparent;
  transition: all 200ms linear;
}

.btn:hover .cyber-btn__glitch { display: block; }
.btn:hover .btn__tag          { color: #70e1e8; }

@media (max-width: 768px) {
  .cyber-btn {
    padding: 15px 40px;
    font-size: 20px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 95% 100%, 95% 90%, 80% 90%, 80% 100%, 15% 100%, 0 57.5%);
  }
  .btn__tag { bottom: -19px; right: 15px; }
}
```
