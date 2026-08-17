import Lenis from 'lenis'

/**
 * Lenis-powered smooth scrolling.
 *
 * initSmoothScroll() is mounted once in Layout. It ALWAYS runs so the
 * scroll feel is identical in every browser — including machines that
 * report prefers-reduced-motion (brand requirement: the site renders
 * as designed everywhere; see main.tsx MotionConfig reducedMotion="never").
 * scrollToTop() / scrollToHash() are used by the manual router's `go()`
 * helpers so page changes and deep links scroll through Lenis (buttery)
 * instead of jumping.
 */

let lenis: Lenis | null = null

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}

  lenis = new Lenis({
    // WHEEL = NATIVE (smoothWheel: false). JS-eased wheel scrolling
    // (duration mode OR lerp mode) renders each wheel notch as visible
    // steps on machines that can't hold 60fps (user: "scrolls in little
    // jumps"). Native wheel is driven by the browser compositor — smooth
    // regardless of main-thread frame rate. Lenis still eases programmatic
    // scrolls below (anchors, scroll-to-top).
    lerp: 0.2,
    smoothWheel: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  })

  let raf = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  }
}

/** Jump (or smooth-scroll, if animating) to the very top. */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}

/** Smooth-scroll to an element id (used for /services#anchor deep links). */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  if (!id) return

  const doScroll = (el: HTMLElement) => {
    if (lenis) {
      lenis.scrollTo(el, { offset: -90 })
    } else {
      el.scrollIntoView()
    }
  }

  const el = document.getElementById(id)
  if (el) {
    scrollWhenStable(el, doScroll)
    return
  }

  // Element not mounted yet — pushState + popstate triggers a React render
  // that can lag a frame behind this call, so retry until it exists.
  let attempts = 0
  const retry = () => {
    attempts += 1
    const found = document.getElementById(id)
    if (found) {
      scrollWhenStable(found, doScroll)
    } else if (attempts < 50) {
      setTimeout(retry, 40)
    }
  }
  setTimeout(retry, 0)
}

/**
 * Lazy images below the target shift the layout while they load, moving the
 * section after the first scroll — the smooth-scroll then lands short. Wait
 * until the element's absolute position stops changing (max ~3s) before
 * scrolling, then re-check once after the scroll in case it shifted mid-way.
 */
function scrollWhenStable(el: HTMLElement, doScroll: (el: HTMLElement) => void) {
  let lastY = el.getBoundingClientRect().top + window.scrollY
  let stableCount = 0
  let scrollDone = false

  const verify = () => {
    const currentY = el.getBoundingClientRect().top + window.scrollY
    if (Math.abs(currentY - lastY) < 2) {
      stableCount += 1
    } else {
      stableCount = 0
      lastY = currentY
    }

    if (!scrollDone) {
      if (stableCount >= 2) {
        // Layout settled — do the real scroll now.
        scrollDone = true
        doScroll(el)
        setTimeout(verify, 700)
        return
      }
      if (stableCount === 0) {
        setTimeout(verify, 60)
      } else {
        setTimeout(verify, 120)
      }
      return
    }

    // Post-scroll check: if the target moved during the smooth scroll
    // (image loaded mid-scroll), nudge again so we still land on it.
    const top = el.getBoundingClientRect().top
    if (Math.abs(top - 90) > 60) {
      doScroll(el)
      setTimeout(verify, 600)
    }
  }

  setTimeout(verify, 30)
}
