# Système de Réservation - Application Moderne de Gestion de Services

## Table des Matières

- [À Propos](#à-propos)
- [Fonctionnalités Clés](#fonctionnalités-clés)
- [Choix Techniques](#choix-techniques)
- [Architecture](#architecture)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [Qualité du Code](#qualité-du-code)
- [Structure du Projet](#structure-du-projet)
- [Règles Métier](#règles-métier)

## À Propos

Il s'agit d'un système moderne de gestion de réservations qui permet aux utilisateurs de parcourir les services disponibles, réserver des créneaux horaires et gérer leurs réservations. L'application inclut un panneau d'administration pour gérer les services et les créneaux horaires.

**Domaine :** Réservation de services et gestion de rendez-vous

**Objectif :** Ce projet démontre les bonnes pratiques en architecture logicielle, qualité de code et maintenabilité en implémentant une architecture en couches propre avec une séparation appropriée des responsabilités.

## Fonctionnalités Clés

### Pour les Utilisateurs
- **Inscription et Authentification par Email** : Inscription complète avec validation des données (email, nom, prénom, téléphone optionnel) et système de connexion simple utilisant uniquement l'email (pas de mot de passe requis)
- **Catalogue de Services** : Parcourir les services disponibles avec descriptions et durée
- **Réservation de Créneaux** : Consulter les créneaux disponibles et effectuer des réservations
- **Gestion des Réservations** : Voir toutes ses réservations et annuler les réservations à venir
- **Prévention des Doublons** : Le système empêche la réservation deux fois du même créneau

### Pour les Administrateurs
- **Gestion des Services** : Ajouter, modifier et supprimer des services
- **Gestion des Créneaux** : Créer et gérer les créneaux horaires pour chaque service
- **Contrôle de la Capacité** : Définir et gérer la capacité de chaque créneau horaire

## Design Moderne & Professionnel

L'application bénéficie d'un **design system moderne** (système de conception unifié définissant tous les éléments visuels) développé selon les meilleures pratiques UX/UI (User Experience / User Interface - expérience et interface utilisateur), offrant une expérience utilisateur professionnelle et élégante.

### 🎨 Identité Visuelle

**Palette de Couleurs Minimaliste**
- **Noir (#0A0A0A)** : Élégance et professionnalisme
- **Blanc (#FFFFFF)** : Clarté et lisibilité maximale
- **Échelle de Gris (100-900)** : Subtilité et hiérarchie visuelle
- **Couleurs Sémantiques** : Rouge (danger), Vert (succès), Jaune (warning)

Ce choix de palette noir/blanc à fort contraste garantit :
- ✅ Accessibilité maximale (WCAG AAA - Web Content Accessibility Guidelines niveau le plus élevé, garantit la lisibilité pour tous y compris les personnes malvoyantes)
- ✅ Lisibilité optimale sur tous les écrans
- ✅ Apparence professionnelle et moderne
- ✅ Cohérence visuelle dans toute l'application

### 🎯 Design System Complet

L'application utilise **127+ variables CSS** pour assurer une cohérence parfaite :

```css
/* Exemple de variables du design system */
--color-black: #0A0A0A
--color-white: #FFFFFF
--font-size-xs → 5xl (8 tailles)
--space-1 → space-20 (échelle d'espacement)
--shadow-sm → 2xl (système d'ombres)
--radius-sm → full (bordures arrondies)
```

**Avantages du Design System :**
- 🎨 **Cohérence** : Tous les composants partagent les mêmes tokens visuels (valeurs de design réutilisables comme les couleurs et espacements)
- 🔧 **Maintenabilité** : Modification globale du thème en un seul endroit
- 📱 **Responsive** (adaptatif aux différentes tailles d'écran) : Breakpoints cohérents (points de rupture - seuils où le design s'adapte : 480px mobile, 768px tablette, 1024px desktop)
- ⚡ **Performance** : CSS optimisé avec variables natives (variables CSS intégrées au navigateur, plus rapides que les préprocesseurs)

### ✨ Expérience Utilisateur Premium

**Animations & Transitions**
- Loading spinners animés élégants (roues de chargement rotatives)
- Transitions fluides entre les états (fade - fondu, slide - glissement)
- Effets hover sophistiqués (au survol de la souris : transform - transformation, shadow - ombre)
- Toast messages (notifications temporaires en bas d'écran) avec animations d'entrée/sortie

**États Interactifs**
- États de chargement avec spinners personnalisés (indicateurs de chargement animés)
- États vides avec illustrations et call-to-action (bouton d'action incitant l'utilisateur à agir)
- Messages d'erreur/succès contextuels (adaptés à la situation)
- Boutons désactivés avec feedback visuel (retour visuel immédiat à l'utilisateur)

**Composants Modernes**
- Cards (cartes - blocs de contenu encadrés) avec hover effects (effets au survol) et ombres progressives
- Formulaires avec validation visuelle en temps réel (vérification instantanée des données saisies)
- Badges de statut colorés (petites étiquettes visuelles : À venir, Passée, Complet)
- Indicateurs de capacité avec code couleur (visualisation des places disponibles par couleur)
- Navigation sticky (barre de navigation fixe qui reste visible au scroll - défilement de la page)

### 📐 Architecture Visuelle

**Layout Responsive** (mise en page adaptative)
- **Mobile First** (approche mobile d'abord) : Optimisé d'abord pour mobile puis amélioré pour desktop
- **Grid System** (système de grille) : CSS Grid pour layouts complexes (mises en page multi-colonnes et multi-lignes)
- **Flexbox** (boîte flexible) : Alignements flexibles et adaptatifs (disposition d'éléments en ligne ou colonne)
- **Container** (conteneur) : Largeur maximale cohérente (1200px - limite la largeur du contenu sur grands écrans)

**Typographie Hiérarchisée** (organisation des textes par importance)
- Police système optimisée pour la performance (utilise les polices natives du système d'exploitation)
- Échelle typographique de 8 niveaux (tailles de texte : xs = extra small → 5xl = extra extra large)
- Line-heights optimisés pour la lisibilité (hauteur de ligne - espacement vertical entre les lignes de texte)
- Letter-spacing pour titres impactants (espacement entre les lettres pour un effet visuel fort)

### 🎭 Pages & Vues Modernisées

Toutes les vues ont été refondues avec le nouveau design :

1. **HomeView** : Page d'accueil avec hero section (section d'en-tête principale avec grand titre) et gradient text (texte avec dégradé de couleurs)
2. **LoginView** : Formulaire de connexion épuré avec info box (boîte d'information)
3. **RegisterView** : Inscription en deux colonnes responsive (adaptatif mobile/desktop)
4. **ServicesView** : Grille de services avec cards interactives (cartes cliquables)
5. **ServiceDetailView** : Interface de réservation avec slots cards (cartes de créneaux horaires)
6. **MyReservationsView** : Gestion des réservations avec timeline (ligne temporelle)
7. **AdminView** : Panel d'administration (panneau de contrôle) complet et moderne
8. **AppHeader** : Navigation sticky (barre de navigation fixe) avec logo personnalisé

### 🚀 Performance & Qualité

**Optimisations Techniques**
- CSS scopé pour éviter les conflits (styles isolés par composant, ne s'appliquent qu'au composant concerné)
- Variables CSS natives (pas de préprocesseur - pas besoin de SASS/LESS, utilise les fonctionnalités natives du navigateur)
- Animations GPU-accelerated (accélérées par la carte graphique : transform - transformation, opacity - opacité)
- Lazy loading des composants (chargement différé - les composants se chargent uniquement quand nécessaire)
- Bundle CSS optimisé (fichier CSS final regroupé) : **15.35 kB** (3.42 kB gzippé - compressé pour un téléchargement plus rapide)

**Accessibilité** (utilisable par tous, y compris les personnes en situation de handicap)
- Contraste WCAG AAA respecté (niveau de contraste maximal entre texte et fond)
- Focus states visibles sur tous les éléments interactifs (bordure visible lors de la navigation au clavier)
- Aria labels pour les actions importantes (étiquettes pour lecteurs d'écran utilisés par les malvoyants)
- Navigation au clavier complète (toutes les actions accessibles sans souris, avec Tab et Entrée)

**Cross-Browser** (compatible tous navigateurs)
- Support navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Fallbacks pour anciennes versions (solutions de secours pour navigateurs obsolètes)
- Mobile Safari optimisé (spécifiquement testé sur iPhone/iPad)
- Responsive sur tablettes et desktop (adaptatif du smartphone au grand écran)

### 💎 Détails de Finition

- **Micro-interactions** (petites animations interactives) : Boutons avec effets ripple subtils (effet d'onde au clic)
- **Loading States** (états de chargement) : Spinners avec rotations fluides (roues animées)
- **Empty States** (états vides) : Messages encourageants avec émojis (quand aucune donnée à afficher)
- **Toast Notifications** (notifications temporaires) : Messages contextuels non-intrusifs (apparaissent brièvement en bas d'écran)
- **Form Validation** (validation de formulaire) : Feedback visuel immédiat (retour instantané sur les erreurs de saisie)
- **Hover Effects** (effets au survol) : Transformations subtiles et élégantes (changements visuels au passage de la souris)

Ce design moderne positionne l'application comme une **solution professionnelle de qualité entreprise**, tout en restant accessible et agréable à utiliser.

## Choix Techniques

### Stack : Vue.js + TypeScript + Vite

**Pourquoi Vue.js ?**
- **Framework Progressif** : Facile à apprendre tout en étant puissant pour les applications complexes
- **Système de Données Réactif** : Mises à jour automatiques de l'interface avec un minimum de code répétitif
- **Basé sur les Composants** : Encourage la réutilisabilité et la maintenabilité
- **Excellent Outillage** : Support TypeScript de première classe et excellente expérience développeur

**Pourquoi TypeScript ?**
- **Sécurité des Types** : Détecter les erreurs à la compilation, pas à l'exécution
- **Meilleur Support IDE** : Autocomplétion, refactoring et documentation inline
- **Auto-documentant** : Les types servent de documentation inline
- **Confiance au Refactoring** : Refactoring sécurisé avec vérifications du compilateur

**Pourquoi Vite ?**
- **Ultra Rapide** : Démarrage instantané du serveur et Remplacement de Module à Chaud (HMR)
- **Outil de Build Moderne** : Builds de production optimisés avec rollup
- **Configuration Zéro** : Fonctionne directement avec des paramètres par défaut sensés

### Technologies Additionnelles

- **Pinia** : Gestion d'état moderne pour Vue 3 (plus léger et intuitif que Vuex)
- **Vue Router** : Solution de routage officielle avec gardes de navigation pour l'authentification
- **Vitest** : Framework de tests unitaires rapide avec support natif ESM
- **ESLint + Prettier** : Qualité du code et formatage cohérent
- **LocalStorage** : Solution de persistance simple (peut être facilement remplacée par une API backend)

## Architecture

Ce projet suit une **architecture en couches** avec une séparation claire des responsabilités :

```
┌─────────────────────────────────────────┐
│         Couche Présentation             │
│   (Composants Vue, Vues, Router)        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Couche Gestion d'État              │
│            (Stores Pinia)               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Couche Logique Métier              │
│           (Services)                    │
│  - AuthService                          │
│  - BookingService                       │
│  - ServiceManagementService             │
│  - SlotManagementService                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       Couche Accès aux Données          │
│         (Repositories)                  │
│  - BaseRepository                       │
│  - UserRepository                       │
│  - ServiceRepository                    │
│  - SlotRepository                       │
│  - ReservationRepository                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       Couche Persistance                │
│         (localStorage)                  │
└─────────────────────────────────────────┘
```

### Responsabilités des Couches

1. **Couche Présentation** (Vues/Composants)
   - Interface utilisateur et interactions utilisateur
   - Pas de logique métier
   - Communique uniquement avec les stores

2. **Gestion d'État** (Stores Pinia)
   - État de l'application
   - Orchestre les appels aux services
   - Fournit des données réactives aux composants

3. **Logique Métier** (Services)
   - Contient toutes les règles métier
   - Valide les données
   - Coordonne entre les repositories
   - Aucune préoccupation d'interface

4. **Accès aux Données** (Repositories)
   - Opérations CRUD
   - Persistance des données
   - Pas de logique métier

5. **Modèles**
   - Définitions de types
   - Structures de données
   - Partagés entre toutes les couches

### Avantages de Cette Architecture

- **Testabilité** : Chaque couche peut être testée indépendamment
- **Maintenabilité** : Les changements dans une couche n'affectent pas les autres
- **Évolutivité** : Facile de remplacer localStorage par un vrai backend
- **Réutilisabilité** : La logique métier peut être réutilisée dans différentes interfaces
- **Responsabilités Claires** : Chaque classe/fichier a un objectif unique et bien défini

## Installation

### Prérequis

- Node.js >= 18.x
- npm >= 9.x

### Étapes

1. Cloner le dépôt :
```bash
git clone <url-du-depot>
cd project_legacy
```

2. Installer les dépendances :
```bash
npm install
```

## Utilisation

### Serveur de Développement

Démarrer le serveur de développement avec rechargement à chaud :

```bash
npm run dev
```

L'application sera disponible à l'adresse `http://localhost:5173`

### Build de Production

Construire l'application pour la production :

```bash
npm run build
```

Prévisualiser le build de production :

```bash
npm run preview
```

### Accès Administrateur par Défaut

Pour tester les fonctionnalités d'administration, utilisez l'un de ces emails :
- `admin@example.com`
- `admin@booking.com`

Tout autre email aura un accès utilisateur régulier.

## Tests

### Exécuter les Tests Unitaires

```bash
npm run test
```

### Exécuter les Tests en Mode Interface

```bash
npm run test:ui
```

### Couverture de Test

```bash
npm run test:coverage
```

### Fichiers de Test

Les tests sont situés dans `src/__tests__/` et couvrent :
- Logique d'authentification et d'inscription
- Règles de réservation (prévention double réservation, vérifications capacité)
- Gestion des services (opérations CRUD, validation)
- Application des règles métier

## Qualité du Code

### Linting

Vérifier et corriger les problèmes de code :

```bash
npm run lint
```

### Formatage

Formater le code avec Prettier :

```bash
npm run format
```

### Outils de Qualité en Place

- **ESLint** : Analyse statique du code avec règles Vue et TypeScript
- **Prettier** : Formatage cohérent du code
- **TypeScript** : Vérification stricte des types activée
- **Vitest** : Framework de tests unitaires

## Structure du Projet

```
project_legacy/
├── src/
│   ├── models/              # Modèles de données et types
│   │   ├── User.ts
│   │   ├── Service.ts
│   │   ├── Slot.ts
│   │   └── Reservation.ts
│   │
│   ├── repositories/        # Couche d'accès aux données
│   │   ├── BaseRepository.ts
│   │   ├── UserRepository.ts
│   │   ├── ServiceRepository.ts
│   │   ├── SlotRepository.ts
│   │   └── ReservationRepository.ts
│   │
│   ├── services/            # Couche logique métier
│   │   ├── AuthService.ts
│   │   ├── BookingService.ts
│   │   ├── ServiceManagementService.ts
│   │   └── SlotManagementService.ts
│   │
│   ├── stores/              # Gestion d'état (Pinia)
│   │   ├── auth.ts
│   │   ├── services.ts
│   │   ├── slots.ts
│   │   └── bookings.ts
│   │
│   ├── views/               # Composants de page
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   ├── ServicesView.vue
│   │   ├── ServiceDetailView.vue
│   │   ├── MyReservationsView.vue
│   │   └── AdminView.vue
│   │
│   ├── components/          # Composants réutilisables
│   │   └── AppHeader.vue
│   │
│   ├── router/              # Configuration du routage
│   │   └── index.ts
│   │
│   ├── utils/               # Fonctions utilitaires
│   │   └── idGenerator.ts
│   │
│   ├── __tests__/           # Tests unitaires
│   │   ├── AuthService.test.ts
│   │   ├── BookingService.test.ts
│   │   ├── ServiceManagementService.test.ts
│   │   └── UserRepository.test.ts
│   │
│   ├── App.vue              # Composant racine
│   └── main.ts              # Point d'entrée de l'application
│
├── .eslintrc.cjs            # Configuration ESLint
├── .prettierrc.json         # Configuration Prettier
├── .gitignore               # Règles d'exclusion Git
├── vite.config.ts           # Configuration Vite
├── vitest.config.ts         # Configuration Vitest
├── tsconfig.json            # Configuration TypeScript
└── package.json             # Dépendances et scripts
```

## Règles Métier

### Règles de Réservation

1. **Prévention du Double Booking** : Un utilisateur ne peut pas réserver le même créneau deux fois
2. **Gestion de la Capacité** : Chaque créneau a une capacité maximale qui ne peut être dépassée
3. **Réservations Futures Uniquement** : Les utilisateurs ne peuvent réserver que des créneaux futurs
4. **Restriction d'Annulation** : Les utilisateurs ne peuvent annuler que leurs propres réservations futures

### Règles de Gestion des Services

1. **Noms Uniques** : Les noms de services doivent être uniques
2. **Champs Requis** : Le nom du service est obligatoire
3. **Suppression en Cascade** : Supprimer un service supprime tous ses créneaux et réservations associés

### Règles de Gestion des Créneaux

1. **Créneaux Futurs Uniquement** : Les créneaux doivent être créés pour des dates futures
2. **Capacité Positive** : La capacité d'un créneau doit être un entier positif
3. **Réduction de Capacité** : Impossible de réduire la capacité en dessous du nombre de réservations actuelles

### Règles d'Authentification

1. **Validation Email** : Doit être un format d'email valide
2. **Validation Téléphone** : Format optionnel mais validé si fourni (10-15 chiffres)
3. **Unicité Email** : Chaque email ne peut être enregistré qu'une seule fois
4. **Accès Administrateur** : Des emails spécifiques ont des privilèges d'administration
5. **Persistance de Session** : La session utilisateur persiste lors des rafraîchissements de page

## Modèles de Données

### Service
```typescript
{
  id: string
  name: string
  description?: string
  duration?: number  // en minutes
  createdAt: string  // ISO 8601
}
```

### Créneau (Slot)
```typescript
{
  id: string
  serviceId: string
  datetime: string   // ISO 8601
  capacity: number
  createdAt: string  // ISO 8601
}
```

### Réservation
```typescript
{
  id: string
  slotId: string
  userEmail: string
  createdAt: string  // ISO 8601
}
```

### Utilisateur
```typescript
{
  email: string
  firstName: string
  lastName: string
  phone?: string
  isAdmin: boolean
  createdAt: string  // ISO 8601
  lastLogin: string  // ISO 8601
}
```

## Améliorations Futures

Améliorations potentielles pour les itérations futures :

- [ ] Intégration API backend (remplacer localStorage)
- [ ] Authentification réelle avec mots de passe et JWT
- [ ] Notifications par email pour les réservations
- [ ] Vue calendrier pour les créneaux
- [ ] Catégories de services et filtrage
- [ ] Gestion du profil utilisateur
- [ ] Historique et statistiques des réservations
- [ ] Support multilingue
- [ ] Mode sombre
- [ ] Application mobile (React Native/Flutter)

## Licence

Ce projet fait partie d'un exercice éducatif.

## Auteur

Construit comme exercice de refactoring pour démontrer les bonnes pratiques en génie logiciel.
