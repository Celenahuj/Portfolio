import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { projectsData } from "../../data/projects.js";

let ProjetView = {

  dom: function () {
    const fragment = htmlToFragment(template);
    
    // Attendre que le DOM soit monté pour attacher les événements
    setTimeout(() => {
      this.attachEventListeners();
    }, 0);
    
    return fragment;
  },

  fillPanelContent: function(project) {
    // Récupérer les éléments du panneau
    const panelTitre = document.getElementById('panel-titre');
    const panelDescription = document.getElementById('panel-description');
    const panelGallery = document.getElementById('panel-gallery');
    const panelSections = document.getElementById('panel-sections');
    const panelDetails = document.getElementById('panel-details');
    const panelDetailsContainer = document.getElementById('panel-details-container');

    // Afficher le titre et la description
    panelTitre.textContent = project.titre;
    panelDescription.textContent = project.description;

    // Vider la galerie avant d'ajouter les nouvelles images/vidéos
        // Vider la galerie avant d'ajouter les nouvelles images/vidéos
    panelGallery.innerHTML = '';
    
    // Ajouter les images/vidéos
    if (project.images && project.images.length > 0) {
      for (let i = 0; i < project.images.length; i++) {
        const img = project.images[i];
        
        // Créer un div pour l'image ou la vidéo
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'rounded-xl overflow-hidden shadow-lg mb-6';
        
        // Vérifier si c'est une iframe
        if (img.isIframe) {
          const iframeContainer = document.createElement('div');
          iframeContainer.className = 'w-full';
          iframeContainer.innerHTML = img.url;
          
          // Ajuster l'iframe pour être responsive
          setTimeout(() => {
            const iframe = iframeContainer.querySelector('iframe');
            if (iframe) {
              iframe.removeAttribute('width');
              iframe.removeAttribute('height');
              iframe.className = 'w-full';
              iframe.style.width = '100%';
              iframe.style.height = 'auto';
              iframe.style.aspectRatio = '16 / 9';
              iframe.style.border = 'none';
            }
          }, 0);
          
          mediaDiv.appendChild(iframeContainer);
          
          if (img.caption) {
            const caption = document.createElement('p');
            caption.className = 'text-sm text-gray-600 text-center mt-2 italic';
            caption.textContent = img.caption;
            mediaDiv.appendChild(caption);
          }
          
          panelGallery.appendChild(mediaDiv);
          continue;
        }
        
        // Vérifier si c'est un lien externe
        if (img.isLink) {
          const linkHTML = '<a href="' + img.url + '" target="_blank" rel="noopener noreferrer" class="block bg-gradient-to-r bg-accent hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105">' +
                          '<span class="flex items-center justify-center gap-2">' +
                          '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>' +
                          img.caption +
                          '</span>' +
                          '</a>';
          mediaDiv.innerHTML = linkHTML;
          panelGallery.appendChild(mediaDiv);
          continue;
        }
        
        // Vérifier si c'est une vidéo
        const url = img.url.toLowerCase();
        const isVideo = url.includes('.mp4') || url.includes('.mov') || url.includes('.webm');
        const isPDF = url.includes('.pdf');
        
        if (isPDF) {
          // Afficher le PDF avec un iframe
          const pdfHTML = '<iframe src="' + img.url + '" type="application/pdf" class="w-full rounded-lg" style="height: 600px; border: none;"></iframe>' +
                         '<div class="mt-4 text-center">' +
                         '<a href="' + img.url + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">' +
                         '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>' +
                         'Télécharger le PDF' +
                         '</a>' +
                         '</div>';
          
          mediaDiv.innerHTML = pdfHTML;
          
          if (img.caption) {
            const caption = document.createElement('p');
            caption.className = 'text-sm text-gray-600 text-center mt-2 italic';
            caption.textContent = img.caption;
            mediaDiv.appendChild(caption);
          }
        } else if (isVideo) {
          // Ajouter une vidéo
          const videoHTML = '<video controls class="w-full h-auto" style="max-height: 600px;">' +
                           '<source src="' + img.url + '" type="video/mp4">' +
                           '<source src="' + img.url + '" type="video/quicktime">' +
                           'Votre navigateur ne supporte pas les vidéos.' +
                           '</video>';
          mediaDiv.innerHTML = videoHTML;
          
          if (img.caption) {
            const captionHTML = '<p class="text-sm text-gray-600 text-center mt-2 italic">' + img.caption + '</p>';
            mediaDiv.innerHTML = mediaDiv.innerHTML + captionHTML;
          }
        } else {
          // Ajouter une image
          const imgHTML = '<img src="' + img.url + '" alt="' + project.titre + '" class="w-full h-auto object-cover">';
          mediaDiv.innerHTML = imgHTML;
          
          if (img.caption) {
            const captionHTML = '<p class="text-sm text-gray-600 text-center mt-2 italic">' + img.caption + '</p>';
            mediaDiv.innerHTML = mediaDiv.innerHTML + captionHTML;
          }
        }
        
        panelGallery.appendChild(mediaDiv);
      }
    }
    // Vider les sections avant d'ajouter les nouvelles
    panelSections.innerHTML = '';
    
    // Ajouter les sections personnalisées
    if (project.sections && project.sections.length > 0) {
      for (let i = 0; i < project.sections.length; i++) {
        const section = project.sections[i];
        
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'border-t border-gray-200 pt-6';
        
        const titre = document.createElement('h3');
        titre.className = 'text-xl font-semibold text-gray-800 mb-3';
        titre.textContent = section.titre;
        
        const contenu = document.createElement('p');
        contenu.className = 'text-gray-700 text-lg leading-relaxed';
        contenu.textContent = section.contenu;
        
        sectionDiv.appendChild(titre);
        sectionDiv.appendChild(contenu);
        panelSections.appendChild(sectionDiv);
      }
    }

    // Vider les détails techniques avant d'ajouter les nouveaux
    panelDetails.innerHTML = '';
    
    // Ajouter les détails techniques
    if (project.detailsTechniques && project.detailsTechniques.length > 0) {
      panelDetailsContainer.style.display = 'block';
      
      for (let i = 0; i < project.detailsTechniques.length; i++) {
        const detail = project.detailsTechniques[i];
        
        const detailDiv = document.createElement('div');
        detailDiv.className = 'flex justify-between';
        
        const label = document.createElement('span');
        label.className = 'font-medium';
        label.textContent = detail.label + ':';
        
        const value = document.createElement('span');
        value.textContent = detail.value;
        
        detailDiv.appendChild(label);
        detailDiv.appendChild(value);
        panelDetails.appendChild(detailDiv);
      }
    } else {
      panelDetailsContainer.style.display = 'none';
    }
  },

  attachEventListeners: function() {
    const projetCards = document.querySelectorAll('.projet-card');
    const panel = document.getElementById('projet-panel');
    const overlay = document.getElementById('projet-panel-overlay');
    const closePanel = document.getElementById('close-panel');

    if (!panel) return;

    // Fonction pour ouvrir le panneau
    const openPanel = () => {
      panel.classList.remove('translate-x-full');
      overlay.classList.remove('pointer-events-none', 'opacity-0');
      document.body.style.overflow = 'hidden';
    };

    // Fonction pour fermer le panneau
    const closeProjectPanel = () => {
      panel.classList.add('translate-x-full');
      overlay.classList.add('pointer-events-none', 'opacity-0');
      document.body.style.overflow = '';
    };

    // Ajouter un événement de clic à chaque carte de projet
    for (let i = 0; i < projetCards.length; i++) {
      const card = projetCards[i];
      
      card.addEventListener('click', () => {
        const projectId = card.dataset.projectId;
        
        // Chercher le projet correspondant
        let project = null;
        for (let j = 0; j < projectsData.length; j++) {
          if (projectsData[j].id === projectId) {
            project = projectsData[j];
            break;
          }
        }
        
        if (project) {
          // Remplir le panneau avec les données du projet
          this.fillPanelContent(project);
          // Ouvrir le panneau
          openPanel();
        }
      });
    }

    // Fermer le panneau au clic sur le bouton de fermeture
    if (closePanel) {
      closePanel.addEventListener('click', closeProjectPanel);
    }

    // Fermer le panneau au clic sur l'overlay
    if (overlay) {
      overlay.addEventListener('click', closeProjectPanel);
    }

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.classList.contains('translate-x-full')) {
        closeProjectPanel();
      }
    });
  }
};

export { ProjetView };
