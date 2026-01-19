// Classe Router avec paramètres dynamiques, guards et layouts
class Router {
  constructor(id, options = {}) {
    let root = document.getElementById(id);

    if (!root) {
      root = document.createElement('div');
      console.warn(`Element with id "${id}" not found. Creating a new div as root.`);
      document.body.appendChild(root);
    }

    this.root = root;
    this.routes = [];
    this.layouts = {};
    this.currentRoute = null;
    this.isAuthenticated = false;
    this.loginPath = options.loginPath || '/login';
    this.base = import.meta.env.BASE_URL || '/';
    
    // Écouter les changements d'URL
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercepter les clics sur les liens
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(e.target.getAttribute('href'));
      }
    });
  }
  
  // Normaliser le chemin en enlevant le base path
  normalizePath(path) {
    if (this.base !== '/' && path.startsWith(this.base)) {
      path = path.slice(this.base.length - 1);
    }
    return path || '/';
  }
  
  // Définir l'état d'authentification
  setAuth(isAuth) {
    this.isAuthenticated = isAuth;
  }
  
  // Enregistrer un layout pour un segment de route
  addLayout(pathPrefix, layoutFn) {
    this.layouts[pathPrefix] = layoutFn;
    return this;
  }
  
  // Trouver le layout correspondant à un chemin
  findLayout(path) {
    // Chercher le segment le plus spécifique (le plus long qui match)
    let matchedLayout = null;
    let longestMatch = 0;
    
    for (const [prefix, layout] of Object.entries(this.layouts)) {
      if (path.startsWith(prefix) && prefix.length > longestMatch) {
        matchedLayout = layout;
        longestMatch = prefix.length;
      }
    }
    
    return matchedLayout;
  }
  
  // Ajouter une route
  addRoute(path, handler, options = {}) {
    const regex = this.pathToRegex(path);
    const keys = this.extractParams(path);
    this.routes.push({ 
      path, 
      regex, 
      keys, 
      handler,
      requireAuth: options.requireAuth || false,
      useLayout: options.useLayout !== false // true par défaut
    });
    return this;
  }
  
  // Convertir un chemin en regex
  pathToRegex(path) {
    if (path === '*') return /.*/;
    
    const pattern = path
      .replace(/\//g, '\\/')
      .replace(/:(\w+)/g, '([^\\/]+)')
      .replace(/\*/g, '.*');
    
    return new RegExp('^' + pattern + '$');
  }
  
  // Extraire les noms des paramètres
  extractParams(path) {
    const params = [];
    const matches = path.matchAll(/:(\w+)/g);
    for (const match of matches) {
      params.push(match[1]);
    }
    return params;
  }
  
  // Extraire les valeurs des paramètres
  getParams(route, path) {
    const matches = path.match(route.regex);
    if (!matches) return {};
    
    const params = {};
    route.keys.forEach((key, i) => {
      params[key] = matches[i + 1];
    });
    return params;
  }
  
  // Naviguer vers une route
  navigate(path) {
    console.log('🚀 Navigation vers:', path);
    window.history.pushState(null, null, path);
    this.handleRoute();
  }
  
  // Gérer la route actuelle
  handleRoute() {
    const rawPath = window.location.pathname;
    const path = this.normalizePath(rawPath);
    console.log('🔍 Traitement de la route:', path);
    console.log('📋 Routes disponibles:', this.routes.map(r => r.path));
    
    // Trouver la route correspondante
    for (const route of this.routes) {
      if (route.regex.test(path)) {
        console.log('✅ Route trouvée:', route.path);
        // Vérifier l'authentification si nécessaire
        if (route.requireAuth && !this.isAuthenticated) {
          sessionStorage.setItem('redirectAfterLogin', path);
          this.navigate(this.loginPath);
          return;
        }
        
        this.currentRoute = path;
        const params = this.getParams(route, path);
        
        // Générer le contenu de la page
        const content = route.handler(params, this);
        console.log('📄 Contenu généré:', content);
        
        if (content instanceof Promise) {
          // Le handler retourne une promesse
          content.then(res => {
            this.renderContent(res, route, path);
          });
        } else {
          // Le handler retourne directement le contenu
          this.renderContent(content, route, path);
        }
        return;
      }
    }
    
    console.warn('❌ Aucune route trouvée pour:', path);
    // Route 404 si aucune correspondance
    const notFound = this.routes.find(r => r.path === '*');
    if (notFound) {
      const content = notFound.handler({}, this);
      this.root.innerHTML = content;
    }
  }
  
  // Rendre le contenu dans le root ou via un layout
  renderContent(content, route, path) {
    const isFragment = content instanceof DocumentFragment;
    
    // Appliquer le layout seulement si useLayout est true
    if (route.useLayout) {
      const layoutFn = this.findLayout(path);
      if (layoutFn) {
        // Le layout retourne un DocumentFragment
        const layoutFragment = layoutFn();
        
        // Chercher l'élément <slot> dans le layout
        const contentSlot = layoutFragment.querySelector('slot');
        
        if (contentSlot) {
          // Insérer le contenu de la page dans le slot
          if (isFragment) {
            contentSlot.replaceWith(content);
          } else {
            // Créer un fragment temporaire pour le HTML string
            const tempFragment = document.createElement('template');
            tempFragment.innerHTML = content;
            contentSlot.replaceWith(tempFragment.content);
          }
        } else {
          console.warn('Layout does not contain a <slot> element. Content will not be inserted.');
        }
        
        // Insérer le layout complet dans this.root
        this.root.innerHTML = '';
        this.root.appendChild(layoutFragment);
      } else {
        // Pas de layout trouvé, afficher directement
        if (isFragment) {
          this.root.innerHTML = '';
          this.root.appendChild(content);
        } else {
          this.root.innerHTML = content;
        }
      }
    } else {
      // Pas de layout, afficher directement
      if (isFragment) {
        this.root.innerHTML = '';
        this.root.appendChild(content);
      } else {
        this.root.innerHTML = content;
      }
    }
    
    // Attacher les event listeners après le rendu
    this.attachEventListeners(path);
  }
  
  // Attacher les event listeners après le rendu
  attachEventListeners(path) {
    // Event listener pour le bouton de login
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        this.login();
      });
    }
    
    // Event listener pour le bouton de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.logout();
      });
    }
  }
  
  // Se connecter et rediriger vers la page demandée
  login() {
    this.setAuth(true);
    const redirect = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');
    this.navigate(redirect || '/dashboard');
  }
  
  // Se déconnecter
  logout() {
    this.setAuth(false);
    this.navigate(this.loginPath);
  }
  
  // Démarrer le routeur
  start() {
    this.handleRoute();
  }
}

export { Router };