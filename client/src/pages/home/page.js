import { htmlToFragment, fixImagePaths } from "../../lib/utils.js";
import { CarouselView } from "../../ui/carousel/index.js";
import { ProjetView } from "../../ui/projet/index.js";
import { ProfilView } from "../../ui/profil/index.js";
import { InfoView } from "../../ui/info/index.js";  
import template from "./template.html?raw";

export function HomePage(){
    console.log('🏠 HomePage - Chargement...');
    
    // Créer le fragment de base
    const fragment = htmlToFragment(template);
    fixImagePaths(fragment);
    
    // Chercher un emplacement pour le bandeau
    const carouselContainer = fragment.querySelector('#carousel-container');
    const projetContainer = fragment.querySelector('#projets');
    const profilContainer = fragment.querySelector('#profil');
    const infoContainer = fragment.querySelector('#info');

    // Insérer le bandeau dans la page
    const profil = ProfilView.dom();
    profilContainer.replaceWith(profil);

    const projet = ProjetView.dom();
    projetContainer.replaceWith(projet);

    const carousel = CarouselView.dom();   
    carouselContainer.replaceWith(carousel);

    const info = InfoView.dom();
    infoContainer.replaceWith(info);
   
    
    return fragment;
}
