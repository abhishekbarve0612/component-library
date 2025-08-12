import { gsap } from 'gsap'

export function animateAccordionOpen(element: HTMLElement) {
  gsap.killTweensOf(element)

  const contentHeight = element.scrollHeight

  gsap.set(element, {
    height: 0,
    opacity: 0,
  })

  return gsap.to(element, {
    height: contentHeight,
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      gsap.set(element, { height: 'auto' })
    },
  })
}


export function animateChevronRotation(element: HTMLElement, isOpen: boolean) {
  gsap.killTweensOf(element)

  return gsap.to(element, {
    rotation: isOpen ? 180 : 0,
    duration: 0.3,
    ease: 'power2.out',
    transformOrigin: 'center center',
  })
}
