(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();class A{constructor(t,r={}){let o=document.getElementById(t);o||(o=document.createElement("div"),console.warn(`Element with id "${t}" not found. Creating a new div as root.`),document.body.appendChild(o)),this.root=o,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=r.loginPath||"/login",this.base="/Portfolio/",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",n=>{n.target.matches("[data-link]")&&(n.preventDefault(),this.navigate(n.target.getAttribute("href")))})}normalizePath(t){return this.base!=="/"&&t.startsWith(this.base)&&(t=t.slice(this.base.length-1)),t||"/"}setAuth(t){this.isAuthenticated=t}addLayout(t,r){return this.layouts[t]=r,this}findLayout(t){let r=null,o=0;for(const[n,i]of Object.entries(this.layouts))t.startsWith(n)&&n.length>o&&(r=i,o=n.length);return r}addRoute(t,r,o={}){const n=this.pathToRegex(t),i=this.extractParams(t);return this.routes.push({path:t,regex:n,keys:i,handler:r,requireAuth:o.requireAuth||!1,useLayout:o.useLayout!==!1}),this}pathToRegex(t){if(t==="*")return/.*/;const r=t.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+r+"$")}extractParams(t){const r=[],o=t.matchAll(/:(\w+)/g);for(const n of o)r.push(n[1]);return r}getParams(t,r){const o=r.match(t.regex);if(!o)return{};const n={};return t.keys.forEach((i,c)=>{n[i]=o[c+1]}),n}navigate(t){console.log("🚀 Navigation vers:",t),window.history.pushState(null,null,t),this.handleRoute()}handleRoute(){const t=window.location.pathname,r=this.normalizePath(t);console.log("🔍 Traitement de la route:",r),console.log("📋 Routes disponibles:",this.routes.map(n=>n.path));for(const n of this.routes)if(n.regex.test(r)){if(console.log("✅ Route trouvée:",n.path),n.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",r),this.navigate(this.loginPath);return}this.currentRoute=r;const i=this.getParams(n,r),c=n.handler(i,this);console.log("📄 Contenu généré:",c),c instanceof Promise?c.then(l=>{this.renderContent(l,n,r)}):this.renderContent(c,n,r);return}console.warn("❌ Aucune route trouvée pour:",r);const o=this.routes.find(n=>n.path==="*");if(o){const n=o.handler({},this);this.root.innerHTML=n}}renderContent(t,r,o){const n=t instanceof DocumentFragment;if(r.useLayout){const i=this.findLayout(o);if(i){const c=i(),l=c.querySelector("slot");if(l)if(n)l.replaceWith(t);else{const s=document.createElement("template");s.innerHTML=t,l.replaceWith(s.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(c)}else n?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t}else n?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t;this.attachEventListeners(o)}attachEventListeners(t){const r=document.getElementById("loginBtn");r&&r.addEventListener("click",()=>{this.login()});const o=document.getElementById("logoutBtn");o&&o.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const t=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(t||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}let C=function(e,t){let r=e;for(let o in t)r=r.replaceAll(new RegExp("{{"+o+"}}","g"),t[o]);return r};function g(e){const t=document.createElement("template");return t.innerHTML=e.trim(),t.content}function h(e){const t="/Portfolio/",r=e.startsWith("/")?e.slice(1):e;return`${t}${r}`}function x(e){e.querySelectorAll("img[src], img[data-src]").forEach(r=>{const o=r.getAttribute("data-src")||r.getAttribute("src");o&&!o.startsWith("http")&&!o.startsWith("data:")&&(r.src=h(o),r.removeAttribute("data-src"))})}const T=`<div class="relative w-full overflow-hidden ">
  <div class="scroll-container flex items-center" style="animation: scroll-infinite 30s linear infinite;">
    
    <!-- Première série d'images -->
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="GitHub.png" alt="Logo 1" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="JS.png" alt="Logo 2" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="css.png" alt="Logo 3" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="figma.png" alt="Logo 4" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="sass.png" alt="Logo 5" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="tailwind.png" alt="Logo 6" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>

    <!-- Deuxième série (DUPLIQUÉE pour l'effet infini) -->
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="illustrator.png" alt="Logo 1" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="photoshop.png" alt="Logo 2" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="css.png" alt="Logo 3" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="figma.png" alt="Logo 4" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="sass.png" alt="Logo 5" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>
    <div class="flex-shrink-0 px-4 sm:px-6 md:px-8">
      <img src="html.png" alt="Logo 6" class="h-16 sm:h-24 md:h-32 w-auto object-contain">
    </div>

  </div>
</div>

<style>
  
@keyframes scroll-infinite {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.scroll-container:hover {
  animation-play-state: paused;
}
</style>
`;let P={dom:function(){const e=g(T);return x(e),e}};const S=`<section id="projets" class="py-6 pb-20 max-w-7xl mx-auto">\r
    <div class="flex items-center py-20 gap-30">\r
        <h1 class="text-4xl sm:text-6xl uppercase accent-color font-light">\r
            MES PROJETS\r
        </h1>\r
    </div>\r
\r
    <!-- Carrousel Container -->\r
    <div class="relative px-12 md:px-16">\r
        <!-- Flèche gauche -->\r
        <button id="carousel-prev" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">\r
            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>\r
            </svg>\r
        </button>\r
\r
        <!-- Flèche droite -->\r
        <button id="carousel-next" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">\r
            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>\r
            </svg>\r
        </button>\r
\r
        <!-- Carrousel -->\r
        <div class="overflow-hidden px-4">\r
            <div id="carousel-track" class="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6">\r
\r
        <div class="relative w-full xs:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 group cursor-pointer projet-card flex-shrink-0"\r
            data-project-id="olive-oil">\r
            <img data-src="oliveoil.png" alt="Vignette 1 - Olive Oil"\r
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">\r
\r
            <!-- Overlay avec texte au hover -->\r
            <div\r
                class="absolute inset-0 bg-transparent group-hover:bg-black/80 transition-all duration-300 flex flex-col items-center justify-center p-4 pointer-events-none">\r
                <h3\r
                    class="text-white text-xl font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">\r
                    Olive Oil\r
                </h3>\r
                <p\r
                    class="text-white text-sm text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">\r
                    Refonte de l’identité visuelle et création du prototype du site vitrine.\r
                </p>\r
            </div>\r
        </div>\r
\r
        <div class="relative w-full xs:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 group cursor-pointer projet-card flex-shrink-0"\r
            data-project-id="projet-2">\r
            <img data-src="status.png" alt="Vignette 2 - Projet 2"\r
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">\r
\r
            <!-- Overlay avec texte au hover -->\r
            <div\r
                class="absolute inset-0 bg-transparent group-hover:bg-black/80 transition-all duration-300 flex flex-col items-center justify-center p-4 pointer-events-none">\r
                <h3\r
                    class="text-white text-xl font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">\r
                    Motion Design\r
                </h3>\r
                <p\r
                    class="text-white text-sm text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">\r
                    Conception d’un teaser avec réalisation de storyboards, animatiques, maquettes graphiques\r
                </p>\r
                \r
            </div>\r
        </div>\r
\r
        <div class="relative w-full xs:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 group cursor-pointer projet-card flex-shrink-0"\r
            data-project-id="projet-3">\r
            <img data-src="mycrew.png" alt="Vignette 3 - Projet 3"\r
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">\r
\r
            <!-- Overlay avec texte au hover -->\r
            <div\r
                class="absolute inset-0 bg-transparent group-hover:bg-black/80 transition-all duration-300 flex flex-col items-center justify-center p-4 pointer-events-none">\r
                <h3\r
                    class="text-white text-xl font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">\r
                    MyCrew\r
                </h3>\r
                <p\r
                    class="text-white text-sm text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">\r
                    UX/UI d’une application de sport communautaire, analyse utilisateurs et Design System.\r
                </p>\r
            </div>\r
        </div>\r
\r
        <div class="relative w-full xs:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 group cursor-pointer projet-card flex-shrink-0"\r
            data-project-id="projet-4">\r
            <img data-src="map.png" alt="Vignette 4 - Projet 4"\r
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">\r
\r
            <!-- Overlay avec texte au hover -->\r
            <div\r
                class="absolute inset-0 bg-transparent group-hover:bg-black/80 transition-all duration-300 flex flex-col items-center justify-center p-4 pointer-events-none">\r
                <h3\r
                    class="text-white text-xl font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">\r
                    MMI Tracker\r
                </h3>\r
                <p\r
                    class="text-white text-sm text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">\r
                    Application web interactive pour visualiser la progression des compétences MMI.\r
                </p>\r
                <a onclick="event.stopPropagation()" href="https://celenahuj.github.io/SAE303/" target="_blank" class="text-white text-sm underline mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150 pointer-events-auto">\r
                    Voir le site\r
                </a>\r
            </div>\r
            \r
        </div>\r
        <div class="relative w-full xs:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 group cursor-pointer projet-card flex-shrink-0"\r
            data-project-id="projet-5">\r
            <img data-src="logo-plex.png" alt="Vignette 5 - Projet 5"\r
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">\r
\r
            <!-- Overlay avec texte au hover -->\r
            <div\r
                class="absolute inset-0 bg-transparent group-hover:bg-black/80 transition-all duration-300 flex flex-col items-center justify-center p-4 pointer-events-none">\r
                <h3\r
                    class="text-white text-xl font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">\r
                    Site Streaming\r
                </h3>\r
                <p\r
                    class="text-white text-sm text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">\r
                    Application web interactive pour découvrir et regarder des contenus en streaming.\r
            </div>\r
            \r
        </div>\r
            </div>\r
        </div>\r
    </div>\r
\r
</section>\r
\r
<!-- Panneau latéral pour les détails du projet -->\r
<div id="projet-panel-overlay"\r
    class="fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none transition-opacity duration-300"></div>\r
\r
<div id="projet-panel"\r
    class="fixed top-0 right-0 h-full w-full bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">\r
    <div class="relative h-full">\r
        <!-- Bouton de fermeture fixe -->\r
        <button id="close-panel"\r
            class="fixed top-6 right-6 w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full text-gray-700 hover:text-gray-900 transition-colors shadow-lg z-[60] border-2 border-gray-200">\r
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"\r
                stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />\r
            </svg>\r
        </button>\r
\r
        <!-- Contenu du panneau -->\r
        <div class="p-8 pt-20">\r
            <!-- Titre du projet -->\r
            <h2 id="panel-titre" class=" flex justify-center text-4xl font-light accent-color mb-6">\r
            </h2>\r
\r
            <!-- Description -->\r
            <div class="mb-8 flex justify-center">\r
                <h3 class="text-xl font-light mb-3 font-cantata-one"></h3>\r
                <p id="panel-description" class="text-lg leading-relaxed"></p>\r
            </div>\r
\r
            <!-- Galerie d'images (nombre variable) -->\r
            <div id="panel-gallery" class="mb-8 space-y-6">\r
                <!-- Les images seront insérées ici dynamiquement -->\r
            </div>\r
\r
            <!-- Sections personnalisées (nombre variable) -->\r
            <div id="panel-sections" class="space-y-8 ">\r
                <!-- Les sections seront insérées ici dynamiquement -->\r
            </div>\r
\r
            <!-- Détails techniques -->\r
            <div id="panel-details-container" class="border-t border-gray-200 pt-6 mt-8">\r
                <h3 class="text-xl font-light mb-4 font-cantata-one">Détails techniques</h3>\r
                <div id="panel-details" class="space-y-2 ">\r
                    <!-- Les détails seront insérés ici dynamiquement -->\r
                </div>\r
            </div>\r
        </div>\r
    </div>\r
</div>`,k=[{id:"olive-oil",titre:"Olive Oil",description:"Refonte de l'identité visuelle et création du prototype du site vitrine.",thumbnail:h("oliveoil.png"),images:[{url:h("pj-oliveoil.png"),caption:"Interface principale"}],detailsTechniques:[{label:"Outils",value:"Figma"},{label:"Type",value:"Design & Prototypage"}]},{id:"projet-2",titre:"Motion Design",description:"Conception d’un teaser avec réalisation de storyboards, animatiques, maquettes graphiques",thumbnail:h("status.png"),images:[{url:'<iframe width="560" height="315" src="https://www.youtube.com/embed/69esvs_54AA?si=IiL7L4WfJrteWxoG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',caption:"Animatique",isIframe:!0},{url:'<iframe width="560" height="315" src="https://www.youtube.com/embed/T59FNIojP9E?si=rUM8Ac6J3IXxguBf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',caption:"Motion Design",isIframe:!0}],detailsTechniques:[{label:"Outils",value:"After Effects, Figma"}]},{id:"projet-3",titre:"MyCrew — App de mise en relation sportive",description:"Conception UX/UI d’une application de sport communautaire, de l’analyse des parcours à la création d’un Design System modulaire sous Auto-layout.",thumbnail:h("mycrew.png"),images:[{url:h("mockup-tel.png"),caption:"Version mobile"},{url:h("pj-mycrew.png"),caption:"Prototype"}],detailsTechniques:[{label:"Outils",value:"Figma"}]},{id:"projet-4",titre:"MMI Tracker",description:"Conception d’une application web interactive de visualisation de données pour suivre et illustrer la progression des compétences MMI de manière ludique et animée.",thumbnail:h("mycrew.png"),images:[{url:h("monde.svg"),caption:"Illustrations compétences"},{url:h("svgsae.svg"),caption:"map"},{url:"https://celenahuj.github.io/SAE303/",caption:"Voir le site",isLink:!0}],detailsTechniques:[{label:"Outils",value:"Illustrator, HTML, CSS, JavaScript, GSAP"}]},{id:"projet-5",titre:"Site Streaming",description:"Conception d’une application web de streaming permettant de trier et filtrer des films, d’ajouter des favoris et de gérer des profils utilisateurs.",thumbnail:h("mycrew.png"),images:[{url:h("accueil-site.png"),caption:"Page d'accueil"},{url:h("detail-site.png"),caption:"Page détail"}],detailsTechniques:[{label:"Outils",value:"Javascript, HTML, CSS, PHP, MySQL"}]}];let B={dom:function(){const e=g(S);return x(e),setTimeout(()=>{this.attachEventListeners(),this.initCarousel()},0),e},initCarousel:function(){const e=document.getElementById("carousel-track"),t=document.getElementById("carousel-prev"),r=document.getElementById("carousel-next");if(!e||!t||!r)return;const o=Array.from(e.querySelectorAll(".projet-card"));o.forEach(s=>{const a=s.cloneNode(!0);e.appendChild(a)});let n=0;const i=e.querySelectorAll(".projet-card"),c=o.length,l=(s=!0)=>{const a=i[0].offsetWidth,u=n*(a+16);s?e.style.transition="transform 0.5s ease-in-out":e.style.transition="none",e.style.transform=`translateX(-${u}px)`};t.addEventListener("click",()=>{n--,l(!0),n<0&&setTimeout(()=>{n=c-1,l(!1)},500)}),r.addEventListener("click",()=>{n++,l(!0),n>=c&&setTimeout(()=>{n=0,l(!1)},500)}),window.addEventListener("resize",()=>{l(!1)}),setTimeout(()=>{this.attachEventListeners()},100),l(!1)},fillPanelContent:function(e){const t=document.getElementById("panel-titre"),r=document.getElementById("panel-description"),o=document.getElementById("panel-gallery"),n=document.getElementById("panel-sections"),i=document.getElementById("panel-details"),c=document.getElementById("panel-details-container");if(t.textContent=e.titre,r.textContent=e.description,o.innerHTML="",e.images&&e.images.length>0)for(let l=0;l<e.images.length;l++){const s=e.images[l],a=document.createElement("div");if(a.className="rounded-xl overflow-hidden shadow-lg mb-6",s.isIframe){const m=document.createElement("div");if(m.className="w-full",m.innerHTML=s.url,setTimeout(()=>{const p=m.querySelector("iframe");p&&(p.removeAttribute("width"),p.removeAttribute("height"),p.className="w-full",p.style.width="100%",p.style.height="auto",p.style.aspectRatio="16 / 9",p.style.border="none")},0),a.appendChild(m),s.caption){const p=document.createElement("p");p.className="text-sm text-gray-600 text-center mt-2 italic",p.textContent=s.caption,a.appendChild(p)}o.appendChild(a);continue}if(s.isLink){const m='<a href="'+s.url+'" target="_blank" rel="noopener noreferrer" class="block bg-gradient-to-r bg-accent hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"><span class="flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>'+s.caption+"</span></a>";a.innerHTML=m,o.appendChild(a);continue}const d=s.url.toLowerCase(),u=d.includes(".mp4")||d.includes(".mov")||d.includes(".webm");if(d.includes(".pdf")){const m='<iframe src="'+s.url+'" type="application/pdf" class="w-full rounded-lg" style="height: 600px; border: none;"></iframe><div class="mt-4 text-center"><a href="'+s.url+'" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Télécharger le PDF</a></div>';if(a.innerHTML=m,s.caption){const p=document.createElement("p");p.className="text-sm text-gray-600 text-center mt-2 italic",p.textContent=s.caption,a.appendChild(p)}}else if(u){const m='<video controls class="w-full h-auto" style="max-height: 600px;"><source src="'+s.url+'" type="video/mp4"><source src="'+s.url+'" type="video/quicktime">Votre navigateur ne supporte pas les vidéos.</video>';if(a.innerHTML=m,s.caption){const p='<p class="text-sm text-gray-600 text-center mt-2 italic">'+s.caption+"</p>";a.innerHTML=a.innerHTML+p}}else{const m=s.maxHeight||"500px",p='<img src="'+s.url+'" alt="'+e.titre+'" class="w-full h-auto object-contain" style="max-height: '+m+';">';if(a.innerHTML=p,s.caption){const y='<p class="text-sm text-gray-600 text-center mt-2 italic">'+s.caption+"</p>";a.innerHTML=a.innerHTML+y}}o.appendChild(a)}if(n.innerHTML="",e.sections&&e.sections.length>0)for(let l=0;l<e.sections.length;l++){const s=e.sections[l],a=document.createElement("div");a.className="border-t border-gray-200 pt-6";const d=document.createElement("h3");d.className="text-xl font-semibold text-gray-800 mb-3",d.textContent=s.titre;const u=document.createElement("p");u.className="text-gray-700 text-lg leading-relaxed",u.textContent=s.contenu,a.appendChild(d),a.appendChild(u),n.appendChild(a)}if(i.innerHTML="",e.detailsTechniques&&e.detailsTechniques.length>0){c.style.display="block";for(let l=0;l<e.detailsTechniques.length;l++){const s=e.detailsTechniques[l],a=document.createElement("div");a.className="flex justify-between";const d=document.createElement("span");d.className="font-medium",d.textContent=s.label+":";const u=document.createElement("span");u.textContent=s.value,a.appendChild(d),a.appendChild(u),i.appendChild(a)}}else c.style.display="none"},attachEventListeners:function(){const e=document.querySelectorAll(".projet-card"),t=document.getElementById("projet-panel"),r=document.getElementById("projet-panel-overlay"),o=document.getElementById("close-panel");if(!t)return;const n=()=>{t.classList.remove("translate-x-full"),r.classList.remove("pointer-events-none","opacity-0"),document.body.style.overflow="hidden"},i=()=>{t.classList.add("translate-x-full"),r.classList.add("pointer-events-none","opacity-0"),document.body.style.overflow=""};for(let c=0;c<e.length;c++){const l=e[c];l.addEventListener("click",()=>{const s=l.dataset.projectId;let a=null;for(let d=0;d<k.length;d++)if(k[d].id===s){a=k[d];break}a&&(this.fillPanelContent(a),n())})}o&&o.addEventListener("click",i),r&&r.addEventListener("click",i),document.addEventListener("keydown",c=>{c.key==="Escape"&&!t.classList.contains("translate-x-full")&&i()})}};const q=`<div id="profil" class="min-h-screen flex items-center justify-center  bg-[#F2F0E9]">\r
  \r
  <div class="flex flex-col md:flex-row p-4 sm:p-6 md:p-12 lg:p-16 gap-8 md:gap-12 lg:gap-16 items-center">\r
\r
    <div class="w-full md:w-1/2 flex justify-center">\r
      <div class="relative w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-6 sm:p-8 pb-16 sm:pb-20 shadow-xl rounded-2xl">\r
        <div class="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 z-10">\r
          <img src="flower.png" alt="Flower decoration" class="w-full h-full object-contain" />\r
        </div>\r
        <img src="profil.png" alt="Céléna Hujol" class="w-full h-auto object-cover rounded-md" />\r
      </div>\r
    </div>\r
\r
    <div class="w-full md:w-1/2 flex flex-col font-cantarell" style="font-family: 'Cantarell', sans-serif;">\r
      \r
      <h1 class="leading-none mb-4 sm:mb-6" style="\r
        font-family: 'Caprasimo', serif; \r
        font-size: clamp(80px, 15vw, 180px);\r
        letter-spacing: 0.11em; \r
        color: transparent; \r
        -webkit-text-stroke: 3px #D73BAE;\r
        paint-order: stroke fill;\r
      ">\r
        Hello\r
      </h1>\r
\r
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Céléna Hujol</h2>\r
\r
      <div class="text-gray-700 text-base sm:text-lg space-y-4 sm:space-y-5 leading-relaxed">\r
        <p>Actuellement étudiante en MMI, parcours développement web.</p>\r
        <p>\r
          Passionnée par la création numérique, j’apprends à concevoir et développer des sites web modernes, tout\r
          en touchant à la fois au design, à l’ergonomie et aux technologies du web.\r
        </p>\r
        <p>\r
          Curieuse et motivée, j’aime comprendre comment fonctionnent les interfaces, tester de nouvelles solutions\r
          et améliorer mes projets au fil de mes apprentissages.\r
        </p>\r
        <p>\r
          Mon objectif est de progresser vers le développement web professionnel et de participer à des projets\r
          concrets pour renforcer mes compétences.\r
        </p>\r
      </div>\r
\r
      <div class="mt-8 sm:mt-12">\r
        <a href="/cv.pdf" download="CV_Celena_Hujol.pdf"\r
          class="inline-block border-2 border-[#D73BAE] text-[#D73BAE] px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl hover:bg-[#D73BAE] hover:text-white transition-all duration-300">\r
          Télécharger mon CV\r
        </a>\r
      </div>\r
\r
    </div>\r
  </div>\r
</div>`;let I={dom:function(){const e=g(q);return x(e),e}};const H=`<div id="profil" class="w-full flex items-center justify-center font-light">\r
 <div class="p-4 sm:p-6 md:p-10 pt-10 md:pt-20 w-full flex items-center justify-center">\r
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full px-4 sm:px-6 md:px-8">\r
    \r
    <div class="flex flex-col gap-4 sm:gap-6">\r
      <div class="border-2 border-[#D73BAE] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center bg-transparent min-h-[160px] sm:min-h-[200px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">\r
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D73BAE]">+ 2</h2>\r
        <p class="text-[#D73BAE] mt-2 text-base sm:text-lg lg:text-xl">années d'étude</p>\r
      </div>\r
      <div class="border-2 border-[#D73BAE] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center bg-transparent min-h-[160px] sm:min-h-[200px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">\r
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D73BAE]">100 %</h2>\r
        <p class="text-[#D73BAE] mt-2 text-base sm:text-lg lg:text-xl">de motivation</p>\r
      </div>\r
    </div>\r
\r
    <div class="border-2 border-[#D73BAE] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center bg-transparent h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">\r
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D73BAE]">+ 17</h2>\r
      <p class="text-[#D73BAE] mt-2 text-base sm:text-lg lg:text-xl text-center">logiciels maîtrisés</p>\r
    </div>\r
\r
    <div class="relative border-2 border-[#D73BAE] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center bg-transparent h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">\r
      <div class="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-20 h-20 sm:w-32 sm:h-32">\r
        <img src="smiley.png" alt="Smiley" class="w-full h-full object-contain" />\r
      </div>\r
      \r
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D73BAE]">+ 200</h2>\r
      <p class="text-[#D73BAE] mt-2 text-base sm:text-lg lg:text-xl text-center">cafés partagés</p>\r
    </div>\r
\r
  </div>\r
</div>\r
</div>`;let D={dom:function(){const e=g(H);return x(e),e}};const O=`<section class="relative w-full flex flex-col items-center pt-4 px-4 sm:px-8 md:px-16 gap-2" id="accueil">
  <img src="portfolio.png" alt="background image" class="w-full h-auto object-contain max-h-screen" />
</section>

<section>
  <div id="profil"></div>
</section>

<!-- Section carrousel -->
<section class=" flex flex-col gap-8 py-10">
  <div id="carousel-container"></div>
</section>

<section>
  <div id="info"></div>
</section>

<section>
  <div id="projets"></div>
</section>
`;function E(){console.log("🏠 HomePage - Chargement...");const e=g(O);x(e);const t=e.querySelector("#carousel-container"),r=e.querySelector("#projets"),o=e.querySelector("#profil"),n=e.querySelector("#info"),i=I.dom();o.replaceWith(i);const c=B.dom();r.replaceWith(c);const l=P.dom();t.replaceWith(l);const s=D.dom();return n.replaceWith(s),e}const R=`<div style="min-height: 100vh; display: flex; flex-direction: column;">
    <slot name="header"></slot>
    <main style="flex: 1;">
        <slot></slot>
    </main>
    <slot name="footer"></slot>
</div>
    `,F=`<nav class="flex flex-col items-end lg:flex-row lg:items-center lg:justify-end gap-4 lg:gap-12 w-full max-w-full px-6 lg:px-10 font-light">
  <a
    href="#accueil"
    data-link
    class="accent-color text-[22px] lg:text-[30px] hover:opacity-70 transition-opacity duration-300"
  >
    Accueil
  </a>
  <a
    href="#profil"
    class="accent-color text-[22px] lg:text-[30px] hover:opacity-70 transition-opacity duration-300"
  >
    À propos
  </a>
  <a
    href="#projets"
    data-link
    class="accent-color text-[22px] lg:text-[30px] hover:opacity-70 transition-opacity duration-300"
  >
    Projets
  </a>
  <a
    href="#contact"
    data-link
    class="accent-color text-[22px] lg:text-[30px] hover:opacity-70 transition-opacity duration-300"
  >
    Contacts
  </a>
</nav>`;let j={html:function(e){return C(F,e)},dom:function(e){return g(j.html(e))}};const L=`<header class="relative w-full py-4 px-8">

  <div class="w-full py-6 flex justify-end">
    <slot name="categories-nav"></slot>
  </div>

  <button id="burger-menu-btn"
    class="lg:hidden absolute top-8 right-8 z-30 flex flex-col gap-1.5 w-8 h-8 justify-center items-center font-caprasimo">
    <span class="block w-6 h-0.5 bg-black transition-all duration-300"></span>
    <span class="block w-6 h-0.5 bg-black transition-all duration-300"></span>
    <span class="block w-6 h-0.5 bg-black transition-all duration-300"></span>
  </button>

  <div id="mobile-menu" class="hidden lg:hidden absolute top-20 right-8 bg-white p-6 rounded-lg shadow-lg z-30">
    <slot name="categories-nav-mobile"></slot>
  </div>

</header>`;let V={html(){const e=j.html();return L.replace('<slot name="categories-nav"></slot>',e).replace('<slot name="categories-nav-mobile"></slot>',e)},dom(){let e=g(L);const t=j.html(),r=g(t),o=g(t),n=r.querySelector("nav");n&&(n.classList.add("hidden","lg:flex"),n.classList.remove("flex"));const i=o.querySelector("nav");i&&(i.classList.add("flex","flex-col","space-y-4","lg:hidden"),i.classList.remove("lg:flex"));let c=e.querySelector('slot[name="categories-nav"]');c&&c.replaceWith(r);let l=e.querySelector('slot[name="categories-nav-mobile"]');l&&l.replaceWith(o);const s=e.querySelector("#burger-menu-btn"),a=e.querySelector("#mobile-menu");return console.log("Burger button found:",s),console.log("Mobile menu found:",a),s&&a?s.onclick=()=>{a.classList.toggle("hidden");const d=s.querySelectorAll("span"),u=!a.classList.contains("hidden");d[0]&&(d[0].style.transform=u?"rotate(45deg) translate(5px, 7px)":"none"),d[1]&&(d[1].style.opacity=u?"0":"1"),d[2]&&(d[2].style.transform=u?"rotate(-45deg) translate(5px, -7px)":"none")}:console.warn("Menu burger non trouvé - burgerBtn:",s,"mobileMenu:",a),setTimeout(function(){const d=document.querySelectorAll('nav a[href^="#"]');console.log("Liens trouvés pour le scroll:",d.length);for(let u=0;u<d.length;u++){const v=d[u];v.addEventListener("click",function(m){m.preventDefault();const p=v.getAttribute("href"),y=p.replace("#",""),b=document.getElementById(y);if(console.log("Clic sur:",p,"Section:",b),b){b.scrollIntoView({behavior:"smooth",block:"start"});const w=document.getElementById("mobile-menu");w&&!w.classList.contains("hidden")&&w.classList.add("hidden")}})}},500),e}};const N=`<section id="contact" class=" text-white py-20 px-10">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        
        <div class="flex flex-col gap-2">
            <h1 class="text-4xl md:text-6xl font-light text-accent tracking-tighter mb-16">
                CONTACTS
            </h1>
            <h2 class="text-2xl md:text-4xl font-light tracking-tight text-black">
                hujolcelena@gmail.com
            </h2>
            <p class="text-xl md:text-2xl text-black">
                (+33) 7 54 32 74 56
            </p>
            <p class="text-[10px] text-black mt-4 uppercase tracking-widest">
                © 2025 céléna hujol
            </p>
        </div>

        <div class="flex flex-col items-end">
            <ul class="flex flex-col items-end gap-2 text-sm text-black">
                <li>
                    <a href="https://github.com/Celenahuj" target="_blank" class="hover:text-accent transition-colors flex items-center gap-1">
                        GitHub <span class="text-[10px]">↗</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com" target="_blank" class="hover:text-accent transition-colors flex items-center gap-1">
                        LinkedIn <span class="text-[10px]">↗</span>
                    </a>
                </li>
                <li>
                    <a href="mailto:hujolcelena@gmail.com" target="_blank" class="hover:text-accent transition-colors flex items-center gap-1">
                        Mail <span class="text-[10px]">↗</span>
                    </a>
                </li>
            </ul>
        </div>

    </div>
</section>`;let M={html:function(e){return C(N,e)},dom:function(e){return g(M.html(e))}};function W(){let e=g(R),t=V.dom(),r=M.dom();return e.querySelector('slot[name="header"]').replaceWith(t),e.querySelector('slot[name="footer"]').replaceWith(r),e}function z(){return g(`
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-6xl font-black text-portfolio-red mb-4">404</h1>
      <p class="text-2xl text-gray-700 mb-8">Page non trouvée</p>
      <a href="/" data-link class="px-6 py-3 bg-portfolio-red text-white rounded-lg hover:opacity-80 transition-opacity">
        Retour à l'accueil
      </a>
    </div>
  `)}const f=new A("app",{loginPath:"/login"});window.router=f;f.addLayout("/",W);f.addRoute("/",E);f.addRoute("/home",E);f.addRoute("*",z);f.start();
