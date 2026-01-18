import { htmlToFragment } from "../../lib/utils.js";
import { MainView } from "../main/index.js";
import template from "./template.html?raw";

let HeaderView = {
  html() {
    // Récupérer le HTML de la navigation principale et remplacer
    // les emplacements desktop et mobile dans la template string.
    const mainHtml = MainView.html();
    return template
      .replace('<slot name="categories-nav"></slot>', mainHtml)
      .replace('<slot name="categories-nav-mobile"></slot>', mainHtml);
  },

  dom() {
    let fragment = htmlToFragment(template);
    
    // Préparer le HTML de la navigation principale
    const mainHtml = MainView.html();

    // Créer fragments pour desktop et mobile à partir du même HTML
    const desktopFragment = htmlToFragment(mainHtml);
    const mobileFragment = htmlToFragment(mainHtml);

    // Ajuster le <nav> du fragment desktop : le cacher sur mobile
    const desktopNav = desktopFragment.querySelector('nav');
    if (desktopNav) {
      desktopNav.classList.add('hidden', 'lg:flex');
      desktopNav.classList.remove('flex');
    }

    // Ajuster le <nav> du fragment mobile : afficher en colonne sur mobile, cacher sur lg
    const mobileNav = mobileFragment.querySelector('nav');
    if (mobileNav) {
      mobileNav.classList.add('flex', 'flex-col', 'space-y-4', 'lg:hidden');
      mobileNav.classList.remove('lg:flex');
    }

    // Insérer les fragments modifiés dans les slots
    let slot = fragment.querySelector('slot[name="categories-nav"]');
    if (slot) slot.replaceWith(desktopFragment);

    let slotMobile = fragment.querySelector('slot[name="categories-nav-mobile"]');
    if (slotMobile) slotMobile.replaceWith(mobileFragment);
    
    // Gérer le menu burger de façon plus robuste :
    // - chercher d'abord dans le fragment (si présent), sinon dans le document
    // - vérifier la présence des éléments avant d'agir
    const burgerBtn = fragment.querySelector('#burger-menu-btn');
    const mobileMenu = fragment.querySelector('#mobile-menu');

    console.log('Burger button found:', burgerBtn);
    console.log('Mobile menu found:', mobileMenu);

    if (burgerBtn && mobileMenu) {
      burgerBtn.onclick = () => {
        mobileMenu.classList.toggle('hidden');

        // Animer les barres du burger en vérifiant qu'elles existent
        const spans = burgerBtn.querySelectorAll('span');
        const isOpen = !mobileMenu.classList.contains('hidden');

        if (spans[0]) spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 7px)' : 'none';
        if (spans[1]) spans[1].style.opacity = isOpen ? '0' : '1';
        if (spans[2]) spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -7px)' : 'none';
      };
    } else {
      console.warn('Menu burger non trouvé - burgerBtn:', burgerBtn, 'mobileMenu:', mobileMenu);
    }
    
    // Ajouter le scroll fluide aux liens de navigation
    setTimeout(function() {
      const allLinks = document.querySelectorAll('nav a[href^="#"]');
      console.log('Liens trouvés pour le scroll:', allLinks.length);
      
      // Parcourir tous les liens
      for (let i = 0; i < allLinks.length; i++) {
        const link = allLinks[i];
        
        // Quand on clique sur un lien
        link.addEventListener('click', function(e) {
          // Empêcher le comportement par défaut
          e.preventDefault();
          
          // Récupérer l'ID de la section (enlever le #)
          const href = link.getAttribute('href');
          const targetId = href.replace('#', '');
          
          // Trouver la section avec cet ID
          const targetSection = document.getElementById(targetId);
          
          console.log('Clic sur:', href, 'Section:', targetSection);
          
          // Si la section existe, scroller vers elle
          if (targetSection) {
            targetSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            
            // Fermer le menu mobile si ouvert
            const menu = document.getElementById('mobile-menu');
            if (menu && !menu.classList.contains('hidden')) {
              menu.classList.add('hidden');
            }
          }
        });
      }
    }, 500);
    
    return fragment;
  }
};

export { HeaderView };