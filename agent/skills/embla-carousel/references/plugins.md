# Plugins — Embla Carousel v8

Plugins are passed as the third argument (vanilla JS) or second hook argument (React):

```javascript
// Vanilla JS
EmblaCarousel(viewportNode, options, [Autoplay(), Fade()])

// React
useEmblaCarousel(options, [Autoplay(), Fade()])
```

Access plugin APIs via `emblaApi.plugins()`:

```javascript
emblaApi.plugins().autoplay?.play()
```

Plugin events use the pattern `pluginName:eventName`:

```javascript
emblaApi.on('autoplay:stop', (api) => console.log('stopped'))
```

**Global options** — set defaults before init:

```javascript
Autoplay.globalOptions = { delay: 4000 }
```

**TypeScript** — import the plugin type from core:

```typescript
import { EmblaPluginType } from 'embla-carousel'
const plugins: EmblaPluginType[] = [Autoplay()]
```

**Dynamic reconfiguration** — pass new plugins to `reInit()`:

```javascript
emblaApi.reInit(options, [Autoplay({ delay: 2000 })])
```

All plugins support these two universal options:
- `active` (`boolean`, default `true`) — enable/disable the plugin
- `breakpoints` (`object`, default `{}`) — override options per media query

---

## Table of Contents
- [Autoplay](#autoplay)
- [Auto Scroll](#auto-scroll)
- [Auto Height](#auto-height)
- [Class Names](#class-names)
- [Fade](#fade)
- [Wheel Gestures](#wheel-gestures)

---

## Autoplay

Timer-based automatic slide advancement.

```bash
npm install embla-carousel-autoplay --save
```

```javascript
import Autoplay from 'embla-carousel-autoplay'
EmblaCarousel(viewportNode, { loop: true }, [Autoplay({ delay: 3000 })])
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `delay` | `number \| function` | `4000` | Milliseconds between transitions. Pass a function `(index) => number` for per-slide delays. |
| `jump` | `boolean` | `false` | Instant transitions (no animation). |
| `playOnInit` | `boolean` | `true` | Start automatically on init. |
| `stopOnInteraction` | `boolean` | `true` | Stop when user drags. |
| `stopOnMouseEnter` | `boolean` | `false` | Pause when cursor is over carousel. |
| `stopOnFocusIn` | `boolean` | `true` | Pause when a focused element is inside the carousel. |
| `stopOnLastSnap` | `boolean` | `false` | Stop after reaching the last slide. |

### Methods

```javascript
const { autoplay } = emblaApi.plugins()
autoplay.play()           // start
autoplay.stop()           // stop
autoplay.reset()          // restart timer
autoplay.isPlaying()      // → boolean
autoplay.timeUntilNext()  // → number (ms remaining) or null
```

### Events

`autoplay:play`, `autoplay:stop`, `autoplay:select`, `autoplay:timerset`, `autoplay:timerstopped`

---

## Auto Scroll

Continuous pixel-by-pixel scrolling (ticker-style).

```bash
npm install embla-carousel-auto-scroll --save
```

```javascript
import AutoScroll from 'embla-carousel-auto-scroll'
EmblaCarousel(viewportNode, { loop: true }, [AutoScroll({ speed: 2 })])
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `speed` | `number` | `2` | Pixels scrolled per animation frame. |
| `startDelay` | `number` | `1000` | Milliseconds before scroll begins on init. |
| `direction` | `'forward' \| 'backward'` | `'forward'` | Scroll direction. |
| `playOnInit` | `boolean` | `true` | Start automatically. |
| `stopOnInteraction` | `boolean` | `true` | Stop on user drag. |
| `stopOnMouseEnter` | `boolean` | `false` | Pause on hover. |
| `stopOnFocusIn` | `boolean` | `true` | Pause when focused element is inside carousel. |

### Methods

```javascript
const { autoScroll } = emblaApi.plugins()
autoScroll.play(delay?)   // start with optional delay override
autoScroll.stop()
autoScroll.reset()
autoScroll.isPlaying()    // → boolean
```

### Events

`autoScroll:play`, `autoScroll:stop`

---

## Auto Height

Animates the carousel viewport height to match the tallest visible slide. Useful for slides with variable content height.

```bash
npm install embla-carousel-auto-height --save
```

```javascript
import AutoHeight from 'embla-carousel-auto-height'
EmblaCarousel(viewportNode, {}, [AutoHeight()])
```

Add CSS for smooth height transitions and correct slide stacking:

```css
.embla__container {
  transition: height 0.2s;   /* smooth height animation */
  align-items: flex-start;   /* let slide content determine height */
}
```

No plugin-specific options, methods, or events beyond the universal `active` and `breakpoints`.

---

## Class Names

Adds CSS class names to slides based on their state (in-view, selected, snapped-to).

```bash
npm install embla-carousel-class-names --save
```

```javascript
import ClassNames from 'embla-carousel-class-names'
EmblaCarousel(viewportNode, {}, [ClassNames()])
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `snapped` | `string` | `'is-snapped'` | Class added to the currently snapped slide(s). |
| `inView` | `string` | `'is-in-view'` | Class added to slides in the viewport. |
| `draggable` | `string \| string[]` | `'is-draggable'` | Class added to the carousel root when draggable. |
| `dragging` | `string \| string[]` | `'is-dragging'` | Class added to the carousel root while dragging. |
| `loop` | `string \| string[]` | `'is-loop'` | Class added when loop mode is enabled. |

Example CSS using the defaults:

```css
.embla__slide { opacity: 0.4; transition: opacity 0.3s; }
.embla__slide.is-snapped { opacity: 1; }
```

No plugin-specific methods or events beyond universal options.

---

## Fade

Replaces scroll-based transitions with opacity crossfades.

```bash
npm install embla-carousel-fade --save
```

```javascript
import Fade from 'embla-carousel-fade'
EmblaCarousel(viewportNode, {}, [Fade()])
```

**Notes:**
- The `inViewThreshold` option has no effect when Fade is active.
- Slides with opacity > 0 stack on top of each other.
- For slides narrower than the viewport, set `containScroll: false` and `align: 'center'` (default):

```javascript
EmblaCarousel(viewportNode, { containScroll: false }, [Fade()])
```

No plugin-specific methods or events beyond the universal `active` and `breakpoints`.

---

## Wheel Gestures

Enables mouse wheel and trackpad scrolling.

```bash
npm install embla-carousel-wheel-gestures --save
```

```javascript
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
EmblaCarousel(viewportNode, {}, [WheelGesturesPlugin()])
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `wheelDraggingClass` | `string` | `'is-wheel-dragging'` | CSS class added to the root while wheel-dragging. Set to `''` to disable. |
| `forceWheelAxis` | `'x' \| 'y' \| undefined` | `undefined` | Force a specific wheel axis regardless of carousel axis. |
| `target` | `EventTarget` | viewport node | Element to attach wheel listeners to. |

No plugin-specific methods or events beyond universal options.
