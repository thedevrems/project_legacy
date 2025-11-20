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
