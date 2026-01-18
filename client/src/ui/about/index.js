import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let AboutView = {
  html: function (data) {
    // Début du conteneur
    let htmlString = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center">';
    
    // Ajouter chaque élément un par un
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const itemHtml = genericRenderer(template, item);
      htmlString = htmlString + itemHtml;
    }
    
    // Fin du conteneur
    htmlString = htmlString + '</div>';
    
    return htmlString;
  },

  dom: function (data) {
    const html = AboutView.html(data);
    const fragment = htmlToFragment(html);
    return fragment;
  }

};

export { AboutView };