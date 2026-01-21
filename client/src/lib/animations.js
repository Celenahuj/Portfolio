import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialise les animations au scroll avec GSAP
 * Applique automatiquement des animations aux éléments avec data-animate
 */
export function initScrollAnimations() {
  // Rafraîchir ScrollTrigger après le chargement du DOM
  ScrollTrigger.refresh();

  // Animation fade-up (depuis le bas)
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%', // Démarre quand le haut de l'élément atteint 85% de la fenêtre
        toggleActions: 'play none none reset', // reset quand on scrolle en arrière
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // Animation fade-left (depuis la gauche)
  gsap.utils.toArray('[data-animate="fade-left"]').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // Animation fade-right (depuis la droite)
  gsap.utils.toArray('[data-animate="fade-right"]').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // Animation fade-in simple
  gsap.utils.toArray('[data-animate="fade"]').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // Animation avec délai (pour effet en cascade)
  gsap.utils.toArray('[data-animate="stagger"]').forEach((container) => {
    const children = container.children;
    gsap.from(children, {
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15, // Délai entre chaque enfant
      ease: 'power2.out',
    });
  });

  // Animation scale (zoom)
  gsap.utils.toArray('[data-animate="scale"]').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.2)',
    });
  });
}

/**
 * Réinitialise et relance les animations (à appeler après changement de page)
 */
export function refreshScrollAnimations() {
  ScrollTrigger.refresh();
  initScrollAnimations();
}
