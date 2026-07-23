# 🌍 AfriConnect Summit 2026 - Site Vitrine

Bienvenue sur le dépôt du projet web **AfriConnect Summit 2026**, le site vitrine fictif d'une conférence tech panafricaine réunissant développeurs, entrepreneurs et investisseurs du continent.

📍 **Lien du site (GitHub Pages) :** 
---

## 👤 Informations Candidat
* **Nom & Prénom : Thierry Reine priscille
*  Groupe : Groupe ISI
* **Niveau : Licence 1 (L1) - cybersecurite
* **Année Académique : 2025-2026

---

## 🛠️ Technologies Utilisées
* **HTML5 Sémantique : Balisage propre (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), accessibilité (attributs `alt`, `aria-label`).
* **CSS3 Pure :
  * Variables CSS (`:root` & `[data-theme="dark"]`).
  * Layouts modernes avec **Flexbox** et **CSS Grid**.
  * Animations, transitions fluides et responsive design (Mobile 375px, Tablette 768px, Desktop 1200px+).
  * Accordéon FAQ en CSS pur (`:checked`).
* **JavaScript Vanilla (ES6) :** Aucun framework ni bibliothèque tiers.
* **Icons & Fonts :** Bootstrap Icons, Google Fonts (Syne & Plus Jakarta Sans).
* **Versioning & Hosting :** Git, GitHub & GitHub Pages.

---

## 🚀 Fonctionnalités JavaScript Implémentées

1. **Dark / Light Mode Persistant :** Bascule du thème visuel enregistrée dans le `localStorage` pour conserver le choix de l'utilisateur lors de la navigation entre les pages.
2. **Navbar Dynamique & Menu Hamburger :** Ombre/fond au défilement (après 80px) et navigation interactive sur mobile.
3. **Compte à Rebours en Temps Réel :** Décompte dynamique jusqu'à la date fictive de l'événement dans la bannière Hero.
4. **Statistiques Animées (IntersectionObserver) :** Animation des chiffres clés qui s'incrémentent au défilement de la page.
5. **Onglets de Programme Interactifs :** Affichage du planning (Jour 1, Jour 2, Jour 3) sans rechargement de page.
6. **Filtrage Dynamique des Intervenants :** Filtrage instantané des cartes de speakers selon la thématique sélectionnée.
7. **Validation Complète du Formulaire :**
   * Contrôle à la soumission (champs requis, nom min. 3 car., email via RegExp, téléphone min. 8 chiffres, motivation min. 20 car.).
   * Retours visuels en temps réel (messages d'erreur explicites + stylisation des bordures).
   * Notification de succès et réinitialisation automatique.
8. **Bouton « Retour en Haut » :** Apparition fluide après 300px de défilement avec défilement doux (`smooth scroll`).
9. **Année Dynamique :** Injection automatique de l'année en cours dans le footer de toutes les pages.

---

## 🗂️ Structure du Projet

```text
THIERRY_REINE_PRISCILLE-AfriConnectSummit/
│
├── index.html          # Page d'accueil (Hero, Compteur, Intervenants, Sponsors)
├── programme.html      # Planning interactif sur 3 jours
├── intervenants.html   # Grille de speakers avec système de filtre
├── contact.html        # Formulaire d'inscription + FAQ Accordéon + Carte
│
├── css/
│   └── style.css       # Feuille de style unique avec variables CSS
│
├── js/
│   └── main.js         # Script JS Vanilla réagissant sur l'ensemble des pages
│
├── images/             # Images des speakers, sponsors et ressources graphiques
│   └── sponsors/
│
└── README.md           # Documentation du projet