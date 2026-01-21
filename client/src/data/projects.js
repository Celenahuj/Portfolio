// Données des projets avec contenu variable
export const projectsData = [
  {
    id: 'olive-oil',
    titre: 'Olive Oil',
    description: 'Refonte de l\'identité visuelle et création du prototype du site vitrine.',
    thumbnail: '/oliveoil.png',
    images: [
      { url: '/pj-oliveoil.png', caption: 'Interface principale' },
    ],
    detailsTechniques: [
      { label: 'Outils', value: 'Figma' },
      { label: 'Type', value: 'Design & Prototypage' }
    ],
  },
  {
    id: 'projet-2',
    titre: 'Motion Design',
    description: 'Conception d’un teaser avec réalisation de storyboards, animatiques, maquettes graphiques',
    thumbnail: '/status.png',
    images: [
      { url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/69esvs_54AA?si=IiL7L4WfJrteWxoG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', caption: 'Animatique', isIframe: true },
      { url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/T59FNIojP9E?si=rUM8Ac6J3IXxguBf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', caption: 'Motion Design', isIframe: true },
    ],
    detailsTechniques: [
      { label: 'Outils', value: 'After Effects, Figma' },
    ]
  },
  {
    id: 'projet-3',
    titre: 'MyCrew — App de mise en relation sportive',
    description: 'Conception UX/UI d’une application de sport communautaire, de l’analyse des parcours à la création d’un Design System modulaire sous Auto-layout.',
    thumbnail: '/mycrew.png',
    images: [
      { url: '/mockup-tel.png', caption: 'Version mobile' },
      { url: '/pj-mycrew.png', caption: 'Prototype' },
    ],
    detailsTechniques: [
      { label: 'Outils', value: 'Figma' },
    ],
  },
  {
    id: 'projet-4',
    titre: 'MMI Tracker',
    description: 'Conception d’une application web interactive de visualisation de données pour suivre et illustrer la progression des compétences MMI de manière ludique et animée.',
    thumbnail: '/mycrew.png',
    images: [
      { url: '/monde.svg', caption: 'Illustrations compétences' },
      { url: '/svgsae.svg', caption: 'map' },
      { url: 'https://celenahuj.github.io/SAE303/', caption: 'Voir le site', isLink: true },
    ],
    detailsTechniques: [
      { label: 'Outils', value: 'Illustrator, HTML, CSS, JavaScript, GSAP' },
    ],
  },
  {
    id: 'projet-5',
    titre: 'Site Streaming',
    description: 'Conception d’une application web de streaming permettant de trier et filtrer des films, d’ajouter des favoris et de gérer des profils utilisateurs.',
    thumbnail: '/mycrew.png',
    images: [
      { url: '/accueil-site.png', caption: 'Page d\'accueil' },
      { url: '/detail-site.png', caption: 'Page détail' },
    ],
    detailsTechniques: [
      { label: 'Outils', value: 'Javascript, HTML, CSS, PHP, MySQL' },
    ],
  },
];
