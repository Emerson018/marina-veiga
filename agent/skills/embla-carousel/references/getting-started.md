# Getting Started — Embla Carousel v8

## Table of Contents
- [Required HTML/CSS Structure](#required-htmlcss-structure)
- [Vanilla JavaScript](#vanilla-javascript)
- [React](#react)
- [Vue](#vue)
- [Svelte](#svelte)
- [Solid](#solid)
- [CDN](#cdn)

---

## Required HTML/CSS Structure

The three essential elements (same for all frameworks):

```html
<div class="embla">
  <div class="embla__viewport">        <!-- ← attach ref here -->
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</div>
```

```css
.embla__viewport {
  overflow: hidden;                    /* required — hides slides outside view */
}

.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
}

.embla__slide {
  flex: 0 0 100%;                      /* 100% = one slide at a time; adjust as needed */
  min-width: 0;
}
```

Class names are arbitrary — the structure and CSS rules are what matter.

---

## Vanilla JavaScript

```bash
npm install embla-carousel --save
```

```javascript
import EmblaCarousel from 'embla-carousel'

const viewportNode = document.querySelector('.embla__viewport')
const emblaApi = EmblaCarousel(viewportNode, { loop: false })

// Optional: wire up prev/next buttons
document.querySelector('.embla__prev')
  .addEventListener('click', () => emblaApi.scrollPrev())
document.querySelector('.embla__next')
  .addEventListener('click', () => emblaApi.scrollNext())
```

With a plugin:

```javascript
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const emblaApi = EmblaCarousel(viewportNode, { loop: true }, [Autoplay()])
```

---

## React

```bash
npm install embla-carousel-react --save
```

The `useEmblaCarousel` hook returns `[emblaRef, emblaApi]`. Attach `emblaRef` to the **viewport** element.

```jsx
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((src, i) => (
            <div className="embla__slide" key={i}>{src}</div>
          ))}
        </div>
      </div>
      <button onClick={() => emblaApi?.scrollPrev()}>Prev</button>
      <button onClick={() => emblaApi?.scrollNext()}>Next</button>
    </div>
  )
}
```

With a plugin and event listener:

```jsx
import { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    console.log('current index:', emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="embla__viewport" ref={emblaRef}>
      <div className="embla__container">
        {/* slides */}
      </div>
    </div>
  )
}
```

---

## Vue

Vue 3+ only. (`embla-carousel-vue` does not support Vue 2.)

```bash
npm install embla-carousel-vue --save
```

```vue
<script setup>
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()
</script>

<template>
  <div class="embla">
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container">
        <div class="embla__slide">Slide 1</div>
        <div class="embla__slide">Slide 2</div>
        <div class="embla__slide">Slide 3</div>
      </div>
    </div>
    <button @click="scrollPrev">Prev</button>
    <button @click="scrollNext">Next</button>
  </div>
</template>
```

Note: `emblaApi` is a `ref` — use `.value` to access methods.

With a plugin:

```vue
<script setup>
import { watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

watch(emblaApi, (api) => {
  if (!api) return
  api.plugins().autoplay?.play()
}, { immediate: true })
</script>
```

---

## Svelte

```bash
npm install embla-carousel-svelte --save
```

Uses a Svelte action (`use:`) on the viewport element:

```svelte
<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let options = { loop: false }
  let plugins = []

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const onInit = (event) => {
    emblaApi = event.detail
  }
</script>

<div class="embla">
  <div
    class="embla__viewport"
    use:useEmblaCarousel={{ options, plugins }}
    on:emblaInit={onInit}
  >
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
    </div>
  </div>
  <button on:click={scrollPrev}>Prev</button>
  <button on:click={scrollNext}>Next</button>
</div>
```

With a plugin:

```svelte
<script>
  import Autoplay from 'embla-carousel-autoplay'
  let plugins = [Autoplay()]
</script>
```

---

## Solid

```bash
npm install embla-carousel-solid --save
```

```jsx
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: false }))

  const scrollPrev = () => emblaApi()?.scrollPrev()
  const scrollNext = () => emblaApi()?.scrollNext()

  return (
    <div class="embla">
      <div class="embla__viewport" ref={emblaRef}>
        <div class="embla__container">
          <div class="embla__slide">Slide 1</div>
          <div class="embla__slide">Slide 2</div>
        </div>
      </div>
      <button onClick={scrollPrev}>Prev</button>
      <button onClick={scrollNext}>Next</button>
    </div>
  )
}
```

Note: `emblaApi` is a signal — call it as a function `emblaApi()` to access methods.

With a plugin:

```jsx
import { createEffect, on } from 'solid-js'
import Autoplay from 'embla-carousel-autoplay'

const [emblaRef, emblaApi] = useEmblaCarousel(
  () => ({ loop: false }),
  () => [Autoplay()]
)
```

---

## CDN

```html
<script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script>
<script>
  const emblaApi = EmblaCarousel(document.querySelector('.embla__viewport'), { loop: false })
</script>
```

Plugins via CDN:

```html
<script src="https://unpkg.com/embla-carousel-autoplay/embla-carousel-autoplay.umd.js"></script>
<script>
  const emblaApi = EmblaCarousel(
    document.querySelector('.embla__viewport'),
    { loop: true },
    [EmblaCarouselAutoplay()]
  )
</script>
```
