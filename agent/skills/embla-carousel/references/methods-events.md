# Methods & Events — Embla Carousel v8

## Table of Contents
- [Methods](#methods)
  - [Navigation](#navigation)
  - [State Queries](#state-queries)
  - [DOM Access](#dom-access)
  - [Lifecycle & Config](#lifecycle--config)
  - [Events API](#events-api)
  - [Plugins](#plugins)
- [Events](#events)

---

## Methods

### Navigation

**`scrollNext(jump?: boolean): void`**
Scroll to the next snap point. Pass `jump: true` for instant (no animation).

**`scrollPrev(jump?: boolean): void`**
Scroll to the previous snap point. Pass `jump: true` for instant.

**`scrollTo(index: number, jump?: boolean): void`**
Scroll to a specific snap point by index. With `loop` enabled, takes the shortest path.

---

### State Queries

**`selectedScrollSnap(): number`**
Returns the index of the currently selected snap.

**`previousScrollSnap(): number`**
Returns the index of the previously selected snap.

**`canScrollNext(): boolean`**
Returns `true` if scrolling forward is possible.

**`canScrollPrev(): boolean`**
Returns `true` if scrolling backward is possible.

**`scrollProgress(): number`**
Returns scroll progress as a decimal 0–1. Useful for progress bars.

**`scrollSnapList(): number[]`**
Returns an array of all snap point positions (as fractions of scroll range).

---

### DOM Access

**`slideNodes(): HTMLElement[]`**
Returns all slide elements.

**`rootNode(): HTMLElement`**
Returns the root wrapper element.

**`containerNode(): HTMLElement`**
Returns the slide container element.

**`slidesInView(): number[]`**
Returns indices of slides currently intersecting the viewport (respects `inViewThreshold`).

**`slidesNotInView(): number[]`**
Returns indices of slides not currently in view.

---

### Lifecycle & Config

**`reInit(options?: EmblaOptionsType, plugins?: EmblaPluginType[]): void`**
Reinitializes the carousel. New options are merged with current; plugins replace current.

**`destroy(): void`**
Destroys the carousel instance. Call on component unmount. Irreversible.

---

### Events API

**`on(event: EmblaEventType, callback: (emblaApi: EmblaCarouselType) => void): void`**
Subscribe to a carousel event.

```javascript
emblaApi.on('select', (api) => {
  console.log('new index:', api.selectedScrollSnap())
})
```

**`off(event: EmblaEventType, callback): void`**
Unsubscribe. Must pass the same function reference used in `on`.

**`emit(event: EmblaEventType): void`**
Programmatically trigger an event.

---

### Plugins

**`plugins(): EmblaPluginsType`**
Returns active plugin instances keyed by plugin name.

```javascript
emblaApi.plugins().autoplay?.stop()
```

**`internalEngine(): EmblaEngineType`**
Exposes internal engine state. For plugin development; use with caution.

---

## Events

Subscribe pattern:

```javascript
emblaApi.on('eventName', (emblaApi) => { /* handler */ })
// Unsubscribe:
emblaApi.off('eventName', handler)
```

| Event | Fires when… |
|-------|------------|
| `init` | Carousel mounts for the first time. Fires **once only** — does not fire on `reInit`. |
| `reInit` | `reInit()` is called (including automatic calls triggered by window resize). |
| `destroy` | Carousel is destroyed. Final event fired. |
| `select` | The selected scroll snap changes (drag or programmatic navigation). |
| `scroll` | Carousel is scrolling. Fires continuously — throttle expensive work. |
| `settle` | Scrolling animation completes and carousel settles. May lag with `dragFree` or slow `duration`. |
| `resize` | Container or slide dimensions change (via ResizeObserver). |
| `slidesInView` | Any slide enters or exits the viewport. |
| `slidesChanged` | Slides are added to or removed from the container (via MutationObserver). |
| `slideFocus` | A focusable element inside a slide (button, link, input) receives focus. |
| `pointerDown` | `touchstart` or `mousedown` on the carousel. |
| `pointerUp` | `touchend` or `mouseup` on the carousel. |

### React cleanup pattern

```javascript
useEffect(() => {
  if (!emblaApi) return
  const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
  emblaApi.on('select', onSelect)
  return () => { emblaApi.off('select', onSelect) }
}, [emblaApi])
```
