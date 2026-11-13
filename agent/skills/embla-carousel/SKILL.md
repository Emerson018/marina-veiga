---
name: embla-carousel
description: "Use when implementing, configuring, or debugging a carousel with
  Embla Carousel v8. Triggers for: setting up carousels in vanilla JS, React
  (useEmblaCarousel), Vue, Svelte, or Solid; configuring options (loop, align,
  slidesToScroll, dragFree, breakpoints, containScroll); slide sizing, spacing,
  and alignment; adding prev/next buttons or dot pagination; grouping slides;
  using plugins (Autoplay, Auto Scroll, Fade, Auto Height, Class Names, Wheel
  Gestures); listening to carousel events; or fixing carousel layout, sizing,
  and scroll behavior issues."
---
# Embla Carousel v8

Embla Carousel is a lightweight, dependency-free, framework-agnostic carousel library.
Official docs: https://www.embla-carousel.com/docs/v8/

Load only the references needed for the task.

## Reference Files

- [references/getting-started.md](references/getting-started.md) — Installation, required HTML/CSS, and init code for Vanilla JS, React, Vue, Svelte, Solid, and CDN
- [references/guides.md](references/guides.md) — How Embla works, required setup, slide sizes, slide gaps, alignments, grouping, prev/next buttons, dot buttons
- [references/options.md](references/options.md) — All 20 options with types, defaults, and descriptions
- [references/methods-events.md](references/methods-events.md) — All API methods and all 11 events
- [references/plugins.md](references/plugins.md) — Autoplay, Auto Scroll, Auto Height, Class Names, Fade, Wheel Gestures

## Examples

24 predefined examples at https://www.embla-carousel.com/docs/v8/examples/predefined — covering: Default, Loop, RTL, Slides To Scroll, Drag Free, Align, Variable Widths, Y-axis, Slides Per View, Thumbnails, Autoplay, Auto Scroll, Auto Height, Fade, Class Names, Parallax, Scale, Opacity, Progress, Lazy Load, Scroll Bar, Infinite Scroll, iOS Style Picker.

## Key Rules

- Attach `ref={emblaRef}` (React) or the equivalent ref to the **viewport** element — the `overflow: hidden` wrapper — not the container or root.
- Required CSS: `overflow: hidden` on viewport; `display: flex; touch-action: pan-y pinch-zoom` on container; `flex: 0 0 <size>; min-width: 0` on each slide.
- Embla does **not** set slide sizes — control them entirely via CSS.
- Plugin packages are separate npm installs (e.g. `embla-carousel-autoplay`).
- Access plugin APIs with `emblaApi.plugins().pluginName?.method()` (optional chaining guards against plugin not being active).
- Clean up with `emblaApi.destroy()` on component unmount.

## Sources

All content sourced from the official Embla Carousel v8 docs (30 pages):

**Get Started** (7 pages)
- https://www.embla-carousel.com/docs/v8/get-started — Intro
- https://www.embla-carousel.com/docs/v8/get-started/module — Vanilla JS
- https://www.embla-carousel.com/docs/v8/get-started/react — React
- https://www.embla-carousel.com/docs/v8/get-started/vue — Vue
- https://www.embla-carousel.com/docs/v8/get-started/svelte — Svelte
- https://www.embla-carousel.com/docs/v8/get-started/solid — Solid
- https://www.embla-carousel.com/docs/v8/get-started/cdn — CDN

**Guides** (9 pages)
- https://www.embla-carousel.com/docs/v8/guides — Intro
- https://www.embla-carousel.com/docs/v8/guides/how-embla-carousel-works — How it works
- https://www.embla-carousel.com/docs/v8/guides/required-setup — Required setup
- https://www.embla-carousel.com/docs/v8/guides/slide-sizes — Slide sizes
- https://www.embla-carousel.com/docs/v8/guides/slide-gaps — Slide gaps
- https://www.embla-carousel.com/docs/v8/guides/alignments — Alignments
- https://www.embla-carousel.com/docs/v8/guides/grouping-slides — Grouping slides
- https://www.embla-carousel.com/docs/v8/guides/previous-and-next-buttons — Prev & next buttons
- https://www.embla-carousel.com/docs/v8/guides/dot-buttons — Dot buttons

**API** (5 pages)
- https://www.embla-carousel.com/docs/v8/api — Intro
- https://www.embla-carousel.com/docs/v8/api/options — Options
- https://www.embla-carousel.com/docs/v8/api/methods — Methods
- https://www.embla-carousel.com/docs/v8/api/events — Events
- https://www.embla-carousel.com/docs/v8/api/plugins — Plugin API usage

**Plugins** (7 pages)
- https://www.embla-carousel.com/docs/v8/plugins — Intro
- https://www.embla-carousel.com/docs/v8/plugins/autoplay — Autoplay
- https://www.embla-carousel.com/docs/v8/plugins/auto-scroll — Auto Scroll
- https://www.embla-carousel.com/docs/v8/plugins/auto-height — Auto Height
- https://www.embla-carousel.com/docs/v8/plugins/class-names — Class Names
- https://www.embla-carousel.com/docs/v8/plugins/fade — Fade
- https://www.embla-carousel.com/docs/v8/plugins/wheel-gestures — Wheel Gestures

**Examples** (2 pages)
- https://www.embla-carousel.com/docs/v8/examples — Intro
- https://www.embla-carousel.com/docs/v8/examples/predefined — 24 predefined examples
