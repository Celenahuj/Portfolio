import { htmlToFragment } from "../../lib/utils.js";

// Page 404 simple
export function The404Page() {
  const html = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-6xl font-black text-portfolio-red mb-4">404</h1>
      <p class="text-2xl text-gray-700 mb-8">Page non trouvée</p>
      <a href="/" data-link class="px-6 py-3 bg-portfolio-red text-white rounded-lg hover:opacity-80 transition-opacity">
        Retour à l'accueil
      </a>
    </div>
  `;
  
  return htmlToFragment(html);
}
