import './global.css';
import { Router } from "./lib/router.js";
import { HomePage } from "./pages/home/page.js";
import { RootLayout } from "./layouts/root/layout.js";
import { The404Page } from "./pages/404/page.js";
import { initScrollAnimations } from "./lib/animations.js";

const router = new Router('app', { loginPath: '/login' });

window.router = router;

// Ajouter les layouts
router.addLayout("/", RootLayout);

// Routes principales
router.addRoute("/", HomePage);
router.addRoute("/home", HomePage);



// Route 404
router.addRoute("*", The404Page);

router.start();

// Initialiser les animations après le chargement du DOM
setTimeout(() => {
  initScrollAnimations();
}, 100);

