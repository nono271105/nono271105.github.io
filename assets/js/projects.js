/* ==========================================================================
   LISTE DES PROJETS
   C'est le seul fichier à modifier pour ajouter ou changer un projet.
   Les deux pages (EN et FR) se mettent à jour toutes seules.

   POUR AJOUTER UN PROJET
   1. Copiez un bloc { ... } existant dans la liste ci-dessous.
   2. Changez l'id (en minuscules, sans espaces, ex. "mon-projet").
   3. Remplissez le titre, le type, le texte en français (fr) et en anglais (en).
   4. Ajoutez les liens avec github("...") et demo("...").

   POUR AJOUTER DES IMAGES
   1. Créez le dossier  assets/projects/<id>/  (par exemple assets/projects/bigtime/).
   2. Déposez-y vos captures (PNG, JPG ou WebP, idéalement 1600 px de large).
   3. Listez les noms de fichiers dans  images: ["1.png", "2.png"].
   La première image sert de couverture. Les autres apparaissent en miniatures.
   Un fichier introuvable est simplement ignoré, rien ne casse.

   AUTRES OPTIONS
   featured: true   affiche le projet en grand, sur toute la largeur
   hidden: true     garde le projet dans le fichier sans l'afficher sur le site
   L'ordre de la liste est l'ordre d'affichage.
   ========================================================================== */

const github = (url, label) => ({
  url,
  label: label || { fr: "Code sur GitHub", en: "Code on GitHub" }
});
const demo = (url) => ({
  url,
  label: { fr: "Démo en ligne", en: "Live demo" }
});

const PROJECTS = [
  {
    id: "option-pricer",
    title: "Option Pricer",
    featured: true,
    type: { fr: "Valorisation de dérivés", en: "Derivatives pricing" },
    text: {
      fr: "Application de valorisation d'options européennes, américaines et exotiques. Elle utilise le modèle de Black-Scholes-Merton, les arbres binomiaux de Cox-Ross-Rubinstein et des simulations de Monte Carlo, calcule les Grecques du premier et du second ordre, et trace les profils de payoff ainsi que la surface de volatilité implicite en 3D. L'interface est en React et TypeScript, le moteur de calcul en Python avec FastAPI.",
      en: "A pricing application for European, American and exotic options. It uses the Black-Scholes-Merton model, Cox-Ross-Rubinstein binomial trees and Monte Carlo simulations, computes first and second order Greeks, and plots payoff profiles and a 3D implied volatility surface. The interface is written in React and TypeScript, the calculation engine in Python with FastAPI."
    },
    tags: ["React", "TypeScript", "FastAPI", "Python", "Plotly", "NumPy", "SciPy"],
    links: [
      github("https://github.com/nono271105/option-pricer/tree/react-migration",
        { fr: "Code sur GitHub (branche react-migration)", en: "Code on GitHub (react-migration branch)" })
    ],
    images: ["BSM.png", "3D.png", "CRR.png", "option_chain.png", "smile.png", "exotiques.png", "simulation.png", "strategies.png"]
  },
  {
    id: "bigtime",
    title: "BigTime",
    type: { fr: "Marchés et 3D", en: "Markets and 3D" },
    text: {
      fr: "Page web qui indique si six places boursières (NYSE, Nasdaq, LSE, Euronext, Tokyo, Hong Kong) sont ouvertes, en pré-marché ou fermées, avec le compte à rebours jusqu'à la prochaine ouverture ou fermeture. Un globe 3D interactif, réalisé avec Three.js, situe chaque place. Développé avec Next.js et déployé sur Vercel.",
      en: "A web page showing whether six exchanges (NYSE, Nasdaq, LSE, Euronext, Tokyo, Hong Kong) are open, in pre-market or closed, with a countdown to the next open or close. An interactive 3D globe built with Three.js locates each exchange. Made with Next.js and deployed on Vercel."
    },
    tags: ["TypeScript", "Next.js", "Three.js", "Tailwind CSS"],
    links: [demo("https://bigtime-zeta.vercel.app"), github("https://github.com/nono271105/bigtime")],
    images: ["bigtime.png", "globe.png"]
  },
  {
    id: "mathview",
    title: "MathView",
    type: { fr: "Application de bureau", en: "Desktop app" },
    text: {
      fr: "Application de bureau qui reconnaît des formules mathématiques manuscrites ou imprimées et les convertit en LaTeX, avec un aperçu en direct et une copie en un clic. Réalisée avec PySide6.",
      en: "A desktop application that recognizes handwritten or printed formulas and converts them to LaTeX, with a live preview and one-click copy. Built with PySide6."
    },
    tags: ["Python", "PySide6", "Computer Vision", "LaTeX"],
    links: [github("https://github.com/nono271105/Mathview")],
    images: ["1.png", "2.png"]
  },
  {
    id: "pc-dashboard",
    title: "PC Hardware Dashboard",
    type: { fr: "Supervision matérielle", en: "Hardware monitoring" },
    text: {
      fr: "Petit serveur Flask qui lit les capteurs de LibreHardwareMonitor et affiche sur une page web la charge, la fréquence et la température du processeur, de la carte graphique, de la mémoire et du stockage. Pratique sur un écran secondaire ou depuis un autre appareil du réseau local.",
      en: "A small Flask server that reads LibreHardwareMonitor sensors and shows load, frequency and temperature for the CPU, GPU, memory and storage on a web page. Handy on a secondary screen or from another device on the local network."
    },
    tags: ["Python", "Flask", "LibreHardwareMonitor", "JavaScript"],
    links: [github("https://github.com/nono271105/PC-Dashboard")],
    images: ["1.png"]
  },
  {
    id: "mark-it-down",
    title: "Mark-it-Down",
    type: { fr: "Application de bureau", en: "Desktop app" },
    text: {
      fr: "Convertit des fichiers PDF, Word, Excel, PowerPoint et HTML en Markdown, entièrement hors ligne : les documents ne quittent pas l'ordinateur. Glisser-déposer, PySide6 et MarkItDown de Microsoft.",
      en: "Converts PDF, Word, Excel, PowerPoint and HTML files to Markdown, entirely offline, so documents never leave the computer. Drag and drop, PySide6 and Microsoft's MarkItDown."
    },
    tags: ["Python", "PySide6", "MarkItDown"],
    links: [github("https://github.com/nono271105/Mark-it-Down")],
    images: ["1.png", "2.png"]
  },
  {
    id: "f1-data-board",
    title: "F1 Data Board",
    type: { fr: "Analyse de données", en: "Data analysis" },
    text: {
      fr: "Application de bureau basée sur FastF1 et PySide6 pour comparer deux pilotes tour par tour : accélérateur, freinage et cartes de vitesse tracées sur le circuit.",
      en: "A desktop app built on FastF1 and PySide6 to compare two drivers lap by lap: throttle, braking and speed maps drawn on the circuit."
    },
    tags: ["Python", "PySide6", "FastF1", "pandas"],
    links: [github("https://github.com/nono271105/f1_board")],
    images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"]
  },
  {
    id: "checkers",
    title: "Checkers",
    type: { fr: "Jeu web", en: "Web game" },
    text: {
      fr: "Jeu de dames dans le navigateur, avec validation des déplacements, alternance des tours et prises. React, Tailwind CSS et Vite, hébergé sur Vercel.",
      en: "A checkers game in the browser with move validation, turn order and captures. React, Tailwind CSS and Vite, hosted on Vercel."
    },
    tags: ["React", "Tailwind CSS", "Vite"],
    links: [demo("https://dames-nolhan.vercel.app/"), github("https://github.com/nono271105/Checkers")],
    images: ["1.png", "2.png"]
  },
  {
    id: "speech-roulette",
    title: "Speech Roulette",
    type: { fr: "Outil web", en: "Web tool" },
    text: {
      fr: "Outil pour s'entraîner à parler sans préparation : il tire un sujet au hasard et lance un compte à rebours. JavaScript seul, sans dépendance, hébergé sur Vercel.",
      en: "A tool for practicing impromptu speaking: it draws a random topic and starts a countdown. Plain JavaScript, no dependencies, hosted on Vercel."
    },
    tags: ["JavaScript", "HTML5", "CSS3"],
    links: [demo("https://roulette-sujet.vercel.app/"), github("https://github.com/nono271105/roulette")],
    images: ["1.png", "2.png", "3.png"]
  },
  {
    id: "youtube-downloader",
    title: "YouTube Downloader",
    type: { fr: "Application de bureau", en: "Desktop app" },
    text: {
      fr: "Application pour télécharger une vidéo ou une piste audio en local, avec choix de la qualité et barre de progression. Python et CustomTkinter.",
      en: "An app to download a video or audio track locally, with quality selection and a progress bar. Python and CustomTkinter."
    },
    tags: ["Python", "CustomTkinter"],
    links: [github("https://github.com/nono271105/youtube_download")],
    images: ["1.png"]
  }
];
