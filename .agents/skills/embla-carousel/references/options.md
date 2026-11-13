# Options — Embla Carousel v8

Pass options as the second argument to the carousel constructor or hook:

```javascript
EmblaCarousel(viewportNode, { loop: true, align: 'start' })
// React:
useEmblaCarousel({ loop: true, align: 'start' })
```

Use `reInit` to apply new options at runtime:

```javascript
emblaApi.reInit({ loop: false })
```

---

## All Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `active` | `boolean` | `true` | Setting to `false` disables the carousel entirely (no init, no teardown). Useful with `breakpoints` to disable on certain screen sizes. |
| `align` | `'start' \| 'center' \| 'end' \| function` | `'center'` | Aligns slides relative to the viewport. Pass a function `(viewSize, snapSize) => number` for custom alignment. |
| `axis` | `'x' \| 'y'` | `'x'` | Scroll axis. Use `'y'` for vertical carousels; also set `touch-action: pan-x` in CSS for vertical. |
| `breakpoints` | `object` | `{}` | Media-query-keyed option overrides. Keys are CSS media query strings; values are partial option objects. |
| `container` | `string \| HTMLElement \| null` | `null` | Custom container element. By default Embla uses the first child of the viewport. |
| `containScroll` | `false \| 'trimSnaps' \| 'keepSnaps'` | `'trimSnaps'` | Controls empty space at edges. `'trimSnaps'` removes excess snaps; `'keepSnaps'` keeps them; `false` disables containment. |
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | Content direction. Set to `'rtl'` for right-to-left languages. |
| `dragFree` | `boolean` | `false` | Enables momentum/free-scroll dragging — slides don't snap, momentum from gesture determines stopping point. |
| `dragThreshold` | `number` | `10` | Pixel distance a pointer must travel before drag is recognized (vs. a click). |
| `duration` | `number` | `25` | Animation duration for programmatic scrolls (`scrollTo`, `scrollNext`, etc.). Range 20–60 recommended; higher = slower. |
| `inViewThreshold` | `number` | `0` | `IntersectionObserver` threshold applied to all slides. `0` = any pixel visible; `1` = fully visible. |
| `loop` | `boolean` | `false` | Infinite looping. Falls back gracefully if there are too few slides to loop. |
| `skipSnaps` | `boolean` | `false` | When `true`, vigorous drags can skip snap points. |
| `slides` | `string \| HTMLElement[] \| null` | `null` | Override which elements are treated as slides. Accepts a CSS selector string or array of elements. |
| `slidesToScroll` | `number \| 'auto'` | `1` | How many slides advance per scroll. `'auto'` groups slides to fill the viewport. |
| `startIndex` | `number` | `0` | Index of the initial scroll snap (zero-based). |
| `watchDrag` | `boolean \| function` | `true` | Enable/disable drag, or pass a function `(emblaApi, event) => boolean` for conditional control. |
| `watchFocus` | `boolean \| function` | `true` | Enable/disable focus-based scrolling, or pass a custom handler. |
| `watchResize` | `boolean \| function` | `true` | Enable/disable ResizeObserver on container and slides, or pass a custom handler. |
| `watchSlides` | `boolean \| function` | `true` | Enable/disable MutationObserver watching for slide additions/removals, or pass a custom handler. |

---

## Breakpoints Example

```javascript
EmblaCarousel(viewportNode, {
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 768px)': { slidesToScroll: 2 },
    '(min-width: 1024px)': { slidesToScroll: 3 },
  }
})
```

Multiple matching breakpoints merge; the last match wins for conflicting keys.
