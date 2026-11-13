# Guides — Embla Carousel v8

## Table of Contents
- [How Embla Carousel Works](#how-embla-carousel-works)
- [Required Setup](#required-setup)
- [Slide Sizes](#slide-sizes)
- [Slide Gaps](#slide-gaps)
- [Alignments](#alignments)
- [Grouping Slides](#grouping-slides)
- [Prev & Next Buttons](#prev--next-buttons)
- [Dot Buttons](#dot-buttons)

---

## How Embla Carousel Works

Embla only touches the DOM in two ways:
1. Applies `translate3d` to the **container** for scrolling
2. Applies `translate3d` to **slides** for loop position adjustments

It does not wrap or encapsulate any elements — your markup stays exactly as written.

**Critical:** Do NOT apply custom `transform` or `transition` styles directly to the container or slides. Embla uses inline styles + spring animations via `requestAnimationFrame`; custom transforms will conflict.

Instead:
- Wrap the container in an outer element and transform that
- Add inner elements inside slides for custom animations

---

## Required Setup

Three essential elements in a specific hierarchy:

```html
<div class="embla">
  <div class="embla__viewport">      <!-- overflow wrapper — attach ref here -->
    <div class="embla__container">   <!-- flex row of slides -->
      <div class="embla__slide">…</div>
      <div class="embla__slide">…</div>
    </div>
  </div>
</div>
```

```css
.embla__viewport {
  overflow: hidden;          /* required — clips slides outside the view */
}
.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
}
.embla__slide {
  flex: 0 0 100%;            /* one slide per view; adjust for multi-slide */
  min-width: 0;
}
```

- `overflow: hidden` on the viewport is **mandatory**.
- Class names are arbitrary — the structure and CSS rules are what matter.
- Semantic HTML (`<section>`, `<ul>/<li>`, etc.) is supported.

---

## Slide Sizes

Embla does **not** assign slide sizes — it measures computed CSS dimensions and uses those values for scroll calculations.

```css
/* Full-width (default) */
.embla__slide { flex: 0 0 100%; min-width: 0; }

/* Fixed pixel width */
.embla__slide { flex: 0 0 200px; min-width: 0; }

/* Percentage-based (show 3 per view) */
.embla__slide { flex: 0 0 33.333%; min-width: 0; }

/* CSS variable for easy responsive control */
:root { --slide-size: 100%; }
@media (min-width: 768px) { :root { --slide-size: 50%; } }
.embla__slide { flex: 0 0 var(--slide-size); min-width: 0; }

/* Variable widths per slide */
.embla__slide:nth-child(1) { flex: 0 0 60%; }
.embla__slide:nth-child(2) { flex: 0 0 40%; }
```

Embla uses a ResizeObserver to automatically recalculate when dimensions change. Slides larger than 100% of the viewport may work but are not officially supported.

---

## Slide Gaps

Use **padding on slides + negative margin on the container** (most robust approach):

```css
.embla__container {
  margin-left: calc(var(--slide-spacing) * -1);
}
.embla__slide {
  padding-left: var(--slide-spacing);
}
```

Set the variable wherever needed:

```css
:root { --slide-spacing: 1rem; }
@media (min-width: 768px) { :root { --slide-spacing: 2rem; } }
```

**Why this approach:**
- Works with variable-width slides
- Survives slide size changes (ResizeObserver picks it up automatically)
- Compatible with RTL and SSR
- Predictable with `box-sizing: border-box`

**Avoid** `gap` or `margin` on slides — these add to total slide width and require precise calculations. Changes via media queries won't auto-detect without calling `emblaApi.reInit()`.

---

## Alignments

The `align` option controls how slides position relative to the viewport. Only affects carousels where slides are narrower than the viewport.

| Value | Behavior |
|-------|---------|
| `'start'` | Slide's leading edge aligns with viewport start |
| `'center'` | Slide center aligns with viewport center (default) |
| `'end'` | Slide's trailing edge aligns with viewport end |
| `function` | Custom: `(viewSize, snapSize) => offset` |

```javascript
EmblaCarousel(viewportNode, { align: 'start' })
```

**Do not** use `justify-content` or `align-items` on the container — these alter the computed offsets Embla measures and break snap points.

Use `breakpoints` for responsive alignment:

```javascript
EmblaCarousel(viewportNode, {
  align: 'center',
  breakpoints: {
    '(min-width: 768px)': { align: 'start' }
  }
})
```

The `containScroll` option manages edge whitespace:
- `'trimSnaps'` (default) — removes excess snaps at edges
- `'keepSnaps'` — keeps all snaps, may show empty space
- `false` — no containment

---

## Grouping Slides

Use `slidesToScroll` to advance multiple slides at once:

```javascript
EmblaCarousel(viewportNode, { slidesToScroll: 3 })
```

| Value | Behavior |
|-------|---------|
| `1` (default) | One slide per scroll |
| `number` | Exact count per scroll regardless of visibility |
| `'auto'` | Groups slides to fill viewport — one "page" per scroll |

**Responsive grouping:**

```javascript
EmblaCarousel(viewportNode, {
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 768px)': { slidesToScroll: 2 },
    '(min-width: 1024px)': { slidesToScroll: 'auto' }
  }
})
```

Snap points recalculate automatically when breakpoints change.

---

## Prev & Next Buttons

Place buttons **outside the root element** (the viewport node passed to the initializer) — the root handles pointer events and buttons inside it can accidentally trigger drag behavior.

```html
<div class="embla">
  <div class="embla__viewport">
    <div class="embla__container">…</div>
  </div>
  <button class="embla__prev">Prev</button>
  <button class="embla__next">Next</button>
</div>
```

**Vanilla JS — basic:**

```javascript
const emblaApi = EmblaCarousel(viewportNode, { loop: false })
const prevBtn = document.querySelector('.embla__prev')
const nextBtn = document.querySelector('.embla__next')

prevBtn.addEventListener('click', () => emblaApi.scrollPrev())
nextBtn.addEventListener('click', () => emblaApi.scrollNext())
```

**Vanilla JS — with disabled states:**

```javascript
const toggleButtonsDisabled = (emblaApi) => {
  prevBtn.toggleAttribute('disabled', !emblaApi.canScrollPrev())
  nextBtn.toggleAttribute('disabled', !emblaApi.canScrollNext())
}

toggleButtonsDisabled(emblaApi)
emblaApi.on('select', toggleButtonsDisabled)
emblaApi.on('reInit', toggleButtonsDisabled)
```

```css
.embla__prev:disabled,
.embla__next:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
```

**React — with disabled states:**

```jsx
import { useEffect, useState } from 'react'

const [prevDisabled, setPrevDisabled] = useState(true)
const [nextDisabled, setNextDisabled] = useState(true)

const toggleButtonsDisabled = (emblaApi) => {
  setPrevDisabled(!emblaApi.canScrollPrev())
  setNextDisabled(!emblaApi.canScrollNext())
}

useEffect(() => {
  if (!emblaApi) return
  toggleButtonsDisabled(emblaApi)
  emblaApi.on('reInit', toggleButtonsDisabled)
  emblaApi.on('select', toggleButtonsDisabled)
}, [emblaApi])
```

- With `loop: true`, buttons never disable (scrolling always possible).
- With `loop: false`, calling `scrollPrev()`/`scrollNext()` at boundaries is a no-op.

---

## Dot Buttons

Place dot buttons **outside** the viewport element.

**Vanilla JS:**

```javascript
const emblaApi = EmblaCarousel(viewportNode)
const dotsNode = document.querySelector('.embla__dots')

function createDots() {
  dotsNode.innerHTML = emblaApi
    .scrollSnapList()
    .map((_, i) => `<button class="embla__dot" type="button"></button>`)
    .join('')

  dotsNode.querySelectorAll('.embla__dot').forEach((dot, i) => {
    dot.addEventListener('click', () => emblaApi.scrollTo(i))
  })
}

function updateDots() {
  const selected = emblaApi.selectedScrollSnap()
  dotsNode.querySelectorAll('.embla__dot').forEach((dot, i) => {
    dot.classList.toggle('embla__dot--selected', i === selected)
  })
}

emblaApi.on('init', createDots)
emblaApi.on('init', updateDots)
emblaApi.on('reInit', createDots)
emblaApi.on('reInit', updateDots)
emblaApi.on('select', updateDots)
```

```css
.embla__dot { opacity: 0.3; }
.embla__dot--selected { opacity: 1; }
```

**React pattern:**

```jsx
import { useCallback, useEffect, useState } from 'react'

function useDotButton(emblaApi) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onDotClick = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('reInit', () => setScrollSnaps(emblaApi.scrollSnapList()))
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return { selectedIndex, scrollSnaps, onDotClick }
}

// In component:
const { selectedIndex, scrollSnaps, onDotClick } = useDotButton(emblaApi)

return (
  <div className="embla__dots">
    {scrollSnaps.map((_, i) => (
      <button
        key={i}
        className={`embla__dot${i === selectedIndex ? ' embla__dot--selected' : ''}`}
        onClick={() => onDotClick(i)}
      />
    ))}
  </div>
)
```

Key notes:
- Use `scrollSnapList()` to get the count — one dot per snap point, not per slide.
- `scrollTo()` takes the shortest path when `loop` is enabled.
- Calling `scrollTo()` on the already-selected snap is a no-op.
