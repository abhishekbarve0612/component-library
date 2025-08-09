import gsap from "gsap"

export const overLimitAnimation = (
  element: HTMLSpanElement | null) => {
  if (!element) return

  const options = {
    color: '#dc2626',
    scale: 1.1,
    duration: 0.2,
    ease: 'power2.out'
  }
  return gsap.to(element, options)
}

export const nearLimitAnimation = (
  element: HTMLSpanElement | null) => {
  if (!element) return

  const options = {
    color: '#ea580c',
    scale: 1.05,
    duration: 0.2,
    ease: 'power2.out'
  }
  return gsap.to(element, options)
}

export const countAnimation = (
  element: HTMLSpanElement | null) => {
  if (!element) return

  const options = {
    color: '#6b7280',
    scale: 1,
    duration: 0.2,
    ease: 'power2.out'
  }
  return gsap.to(element, options)
}

export const errorAnimation = (
  element: HTMLDivElement | null) => {
  if (!element) return

  const fromOptions = {
    opacity: 0,
    y: -10,
    height: 0,
  }
  const toOptions = {
    opacity: 1,
    y: 0,
    height: 'auto',
    duration: 0.2,
    ease: 'power2.out'
  }

  return gsap.fromTo(element, fromOptions, toOptions)
}

export const focusAnimation = (
  element: HTMLElement | null) => {
  if (!element) return

  const fromOptions = {
    scale: 1,
  }
  const toOptions = {
    scale: 1.01,
    duration: 0.15,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1
  }
  return gsap.fromTo(element, fromOptions, toOptions)
}