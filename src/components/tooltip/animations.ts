import { gsap } from 'gsap'

export function showTooltipAnimation(element: HTMLElement, placement: string) {
  const fromProps: any = {
    opacity: 0,
    scale: 0.9
  }

  // Add directional animation based on placement
  switch (placement) {
    case 'top':
      fromProps.y = 10
      break
    case 'bottom':
      fromProps.y = -10
      break
    case 'left':
      fromProps.x = 10
      break
    case 'right':
      fromProps.x = -10
      break
  }

  gsap.fromTo(element, fromProps, {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.2,
    ease: 'power2.out'
  })
}

export function hideTooltipAnimation(element: HTMLElement, placement: string) {
  const toProps: any = {
    opacity: 0,
    scale: 0.9
  }

  // Add directional animation based on placement
  switch (placement) {
    case 'top':
      toProps.y = 10
      break
    case 'bottom':
      toProps.y = -10
      break
    case 'left':
      toProps.x = 10
      break
    case 'right':
      toProps.x = -10
      break
  }

  return gsap.to(element, {
    ...toProps,
    duration: 0.15,
    ease: 'power2.in'
  })
}

export function arrowAnimation(element: HTMLElement, show: boolean) {
  gsap.to(element, {
    opacity: show ? 1 : 0,
    duration: show ? 0.2 : 0.15,
    ease: show ? 'power2.out' : 'power2.in'
  })
}