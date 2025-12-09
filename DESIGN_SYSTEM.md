# Charte Graphique - Design System Moderne Noir & Blanc

## 📋 Table des matières

1. [Vision et Philosophie](#vision-et-philosophie)
2. [Palette de Couleurs](#palette-de-couleurs)
3. [Typographie](#typographie)
4. [Espacements](#espacements)
5. [Bordures et Arrondis](#bordures-et-arrondis)
6. [Ombres et Élévations](#ombres-et-élévations)
7. [Animations et Transitions](#animations-et-transitions)
8. [Composants de Base](#composants-de-base)
9. [Grille et Responsive](#grille-et-responsive)
10. [États Interactifs](#états-interactifs)
11. [Bonnes Pratiques](#bonnes-pratiques)

---

## Vision et Philosophie

### Principes de Design

**Minimalisme Moderne**
- Design épuré et élégant, basé sur une palette noir et blanc
- Focus sur le contenu et la clarté de l'information
- Utilisation subtile des ombres pour créer de la profondeur

**Hiérarchie Visuelle Claire**
- Contrastes marqués pour guider l'œil de l'utilisateur
- Typographie expressive avec des poids variés
- Espacement généreux pour améliorer la lisibilité

**Cohérence et Systématique**
- Variables CSS pour tous les tokens de design
- Échelles mathématiques pour les espacements et tailles
- Réutilisabilité maximale des composants

---

## Palette de Couleurs

### Couleurs Principales

#### Noirs
```css
--color-black: #0A0A0A          /* Noir principal, ultra profond */
--color-black-soft: #1A1A1A     /* Noir doux pour backgrounds */
--color-black-muted: #2A2A2A    /* Noir atténué pour hover states */
```

**Usage :**
- `--color-black` : Textes principaux, boutons primaires, éléments d'accentuation
- `--color-black-soft` : Fonds de cartes, sections alternatives
- `--color-black-muted` : États de survol sur éléments noirs

#### Blancs
```css
--color-white: #FFFFFF          /* Blanc pur */
--color-white-soft: #FAFAFA     /* Blanc légèrement teinté */
```

**Usage :**
- `--color-white` : Fond principal, texte sur fond noir
- `--color-white-soft` : Fonds de sections alternatives, cartes

### Échelle de Gris

```css
--color-gray-100: #F5F5F5       /* Très clair - backgrounds subtils */
--color-gray-200: #E5E5E5       /* Clair - bordures par défaut */
--color-gray-300: #D4D4D4       /* Moyen clair - bordures hover */
--color-gray-400: #A3A3A3       /* Moyen - icons, texte désactivé */
--color-gray-500: #737373       /* Moyen foncé - texte secondaire muted */
--color-gray-600: #525252       /* Foncé - texte secondaire */
--color-gray-700: #404040       /* Très foncé - texte important */
--color-gray-800: #262626       /* Ultra foncé - backgrounds sombres */
--color-gray-900: #171717       /* Presque noir - backgrounds très sombres */
```

**Hiérarchie de texte :**
- Texte principal : `--color-black` (#0A0A0A)
- Texte secondaire : `--color-gray-600` (#525252)
- Texte atténué : `--color-gray-500` (#737373)
- Texte désactivé : `--color-gray-400` (#A3A3A3)

### Couleurs Sémantiques

#### Succès (Vert)
```css
--color-success: #16A34A
--color-success-bg: #F0FDF4
--color-success-border: #BBF7D0
```
**Usage :** Confirmations, validations, messages positifs

#### Danger (Rouge)
```css
--color-danger: #DC2626
--color-danger-bg: #FEF2F2
--color-danger-border: #FECACA
```
**Usage :** Erreurs, suppressions, alertes critiques

#### Avertissement (Orange)
```css
--color-warning: #EA580C
--color-warning-bg: #FFF7ED
--color-warning-border: #FED7AA
```
**Usage :** Avertissements, actions nécessitant attention

#### Information (Cyan)
```css
--color-info: #0891B2
--color-info-bg: #F0FDFA
--color-info-border: #CCFBF1
```
**Usage :** Messages informatifs, conseils, astuces

### Couleurs Appliquées

```css
--color-primary: var(--color-black)
--color-background: var(--color-white)
--color-surface: var(--color-white)
--color-border: var(--color-gray-200)
--color-text: var(--color-black)
--color-text-secondary: var(--color-gray-600)
--color-text-inverse: var(--color-white)
```

---

## Typographie

### Police de Caractères

**Famille Principale**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Police Monospace** (pour code, données techniques)
```css
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
```

**Chargement de la police :**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
```

### Échelle de Tailles

| Variable | Taille | Pixels | Usage |
|----------|---------|---------|--------|
| `--font-size-xs` | 0.75rem | 12px | Labels, badges, annotations |
| `--font-size-sm` | 0.875rem | 14px | Texte secondaire, captions |
| `--font-size-base` | 1rem | 16px | Texte principal, body |
| `--font-size-lg` | 1.125rem | 18px | Texte accentué, lead |
| `--font-size-xl` | 1.25rem | 20px | Sous-titres, H5 |
| `--font-size-2xl` | 1.5rem | 24px | Titres H4 |
| `--font-size-3xl` | 1.875rem | 30px | Titres H3 |
| `--font-size-4xl` | 2.25rem | 36px | Titres H2 |
| `--font-size-5xl` | 3rem | 48px | Titres H1, héros |

### Poids de Police

```css
--font-weight-light: 300        /* Textes légers, emphase subtile */
--font-weight-normal: 400       /* Texte par défaut */
--font-weight-medium: 500       /* Liens, labels, accentuation légère */
--font-weight-semibold: 600     /* Sous-titres, texte important */
--font-weight-bold: 700         /* Titres, emphase forte */
--font-weight-black: 900        /* H1, éléments très accentués */
```

### Hauteurs de Ligne

```css
--line-height-tight: 1.25       /* Titres, headings */
--line-height-normal: 1.5       /* Texte standard */
--line-height-relaxed: 1.75     /* Paragraphes, contenu long */
```

### Hiérarchie Typographique

#### H1 - Titre Principal
```css
font-size: 3rem (48px)
font-weight: 900
line-height: 1.25
letter-spacing: -0.02em
color: var(--color-black)
```

#### H2 - Titre de Section
```css
font-size: 2.25rem (36px)
font-weight: 700
line-height: 1.25
letter-spacing: -0.01em
color: var(--color-black)
```

#### H3 - Sous-titre Important
```css
font-size: 1.875rem (30px)
font-weight: 700
line-height: 1.25
color: var(--color-black)
```

#### H4 - Sous-titre
```css
font-size: 1.5rem (24px)
font-weight: 600
line-height: 1.25
color: var(--color-black)
```

#### H5 - Titre Mineur
```css
font-size: 1.25rem (20px)
font-weight: 600
line-height: 1.25
color: var(--color-black)
```

#### H6 - Titre Minimal
```css
font-size: 1.125rem (18px)
font-weight: 600
line-height: 1.25
color: var(--color-black)
```

#### Body - Texte Principal
```css
font-size: 1rem (16px)
font-weight: 400
line-height: 1.75
color: var(--color-black)
```

#### Small - Texte Secondaire
```css
font-size: 0.875rem (14px)
font-weight: 400
color: var(--color-gray-600)
```

---

## Espacements

### Échelle d'Espacements

Le système utilise une échelle multiplicative cohérente :

| Variable | Valeur | Pixels | Usage Typique |
|----------|---------|---------|----------------|
| `--space-1` | 0.25rem | 4px | Espacements très fins, ajustements |
| `--space-2` | 0.5rem | 8px | Gaps entre icônes et texte |
| `--space-3` | 0.75rem | 12px | Padding de petits boutons |
| `--space-4` | 1rem | 16px | Padding standard, gaps de base |
| `--space-5` | 1.25rem | 20px | Espacements moyens |
| `--space-6` | 1.5rem | 24px | Padding de conteneurs |
| `--space-8` | 2rem | 32px | Marges entre sections |
| `--space-10` | 2.5rem | 40px | Espacements larges |
| `--space-12` | 3rem | 48px | Séparations de sections |
| `--space-16` | 4rem | 64px | Marges de page |
| `--space-20` | 5rem | 80px | Espacements très larges |

### Principes d'Application

**Cohérence Verticale**
- Utiliser `--space-4` (16px) comme unité de base
- Multiplier par 2, 3, 4 pour les espacements plus larges
- Les espacements verticaux doivent suivre l'échelle

**Densité d'Information**
- Zones denses (formulaires, tableaux) : `--space-2` à `--space-4`
- Zones standard : `--space-4` à `--space-8`
- Zones spacieuses (landing pages) : `--space-12` à `--space-20`

---

## Bordures et Arrondis

### Rayons de Bordure

```css
--radius-sm: 0.25rem (4px)      /* Petits éléments, badges */
--radius-md: 0.5rem (8px)       /* Standard : boutons, inputs */
--radius-lg: 0.75rem (12px)     /* Cartes, modales */
--radius-xl: 1rem (16px)        /* Grands conteneurs */
--radius-2xl: 1.5rem (24px)     /* Éléments très arrondis */
--radius-full: 9999px           /* Cercles, pills */
```

### Bordures

**Épaisseur Standard**
```css
border: 2px solid var(--color-border);
```

**États**
- Par défaut : `--color-border` (#E5E5E5)
- Hover : `--color-border-hover` (#A3A3A3)
- Focus : `--color-black` (#0A0A0A)

---

## Ombres et Élévations

Le système utilise des ombres subtiles pour créer de la profondeur :

### Échelle d'Ombres

```css
/* Très légère - hover subtil */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)

/* Légère - éléments flottants */
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
             0 1px 2px -1px rgba(0, 0, 0, 0.1)

/* Moyenne - cartes, dropdowns */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -2px rgba(0, 0, 0, 0.1)

/* Large - modales, popovers */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -4px rgba(0, 0, 0, 0.1)

/* Très large - dialogues */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 8px 10px -6px rgba(0, 0, 0, 0.1)

/* Dramatique - overlays */
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Hiérarchie d'Élévation

1. **Niveau 0** (Plat) : Pas d'ombre, contenu de base
2. **Niveau 1** (`shadow-sm`) : Cartes simples, éléments regroupés
3. **Niveau 2** (`shadow-md`) : Éléments interactifs, dropdowns
4. **Niveau 3** (`shadow-lg`) : Modales, panels flottants
5. **Niveau 4** (`shadow-xl`) : Dialogues importants
6. **Niveau 5** (`shadow-2xl`) : Overlays plein écran

---

## Animations et Transitions

### Durées de Transition

```css
--transition-fast: 150ms        /* Hover, petits changements */
--transition-base: 250ms        /* Transitions standard */
--transition-slow: 350ms        /* Animations complexes */
```

### Courbe de Bezier

```css
cubic-bezier(0.4, 0, 0.2, 1)    /* Courbe standard, naturelle */
```

### Propriétés Animables

**À animer en priorité** (performant) :
- `transform`
- `opacity`
- `filter`

**À animer avec modération** :
- `color`
- `background-color`
- `border-color`
- `box-shadow`

### Exemples d'Application

```css
/* Hover sur bouton */
transition: all var(--transition-base);

/* Fade in/out */
transition: opacity var(--transition-fast);

/* Slide et fade */
transition: transform var(--transition-base),
            opacity var(--transition-base);
```

---

## Composants de Base

### Boutons

#### Structure HTML
```html
<button class="btn btn-primary">
  Texte du bouton
</button>
```

#### Styles de Base
```css
/* Base */
font-size: 1rem (16px)
font-weight: 500
line-height: 1
border: 2px solid transparent
border-radius: 0.5rem (8px)
padding: 0.75rem 1.5rem (12px 24px)
display: inline-flex
align-items: center
gap: 0.5rem (8px)
transition: all 250ms
```

#### Variantes

**Bouton Primaire**
```css
background: var(--color-black)
color: var(--color-white)
border: 2px solid var(--color-black)

/* Hover */
background: var(--color-black-muted)
border-color: var(--color-black-muted)
transform: translateY(-1px)
```

**Bouton Secondaire**
```css
background: transparent
color: var(--color-black)
border: 2px solid var(--color-black)

/* Hover */
background: var(--color-black)
color: var(--color-white)
```

**Bouton Ghost (Tertiaire)**
```css
background: transparent
color: var(--color-black)
border: 2px solid transparent

/* Hover */
background: var(--color-gray-100)
```

**Bouton Danger**
```css
background: var(--color-danger)
color: var(--color-white)
border: 2px solid var(--color-danger)

/* Hover */
background: #B91C1C (version plus foncée)
```

#### Tailles de Boutons

```css
/* Small */
font-size: 0.875rem (14px)
padding: 0.5rem 1rem (8px 16px)

/* Medium (default) */
font-size: 1rem (16px)
padding: 0.75rem 1.5rem (12px 24px)

/* Large */
font-size: 1.125rem (18px)
padding: 1rem 2rem (16px 32px)
```

#### États

```css
/* Focus */
outline: 2px solid var(--color-black)
outline-offset: 2px

/* Disabled */
opacity: 0.5
cursor: not-allowed
pointer-events: none
```

### Champs de Formulaire

#### Input Text / Textarea

**Structure**
```html
<div class="form-group">
  <label for="email">Email</label>
  <input type="email" id="email" placeholder="exemple@email.com">
</div>
```

**Styles**
```css
/* Input */
font-size: 1rem (16px)
color: var(--color-black)
background: var(--color-white)
border: 2px solid var(--color-border)
border-radius: 0.5rem (8px)
padding: 0.75rem 1rem (12px 16px)
width: 100%
transition: all 150ms

/* Label */
font-size: 0.875rem (14px)
font-weight: 500
color: var(--color-black)
margin-bottom: 0.5rem (8px)

/* Placeholder */
color: var(--color-gray-500)
```

**États**
```css
/* Hover */
border-color: var(--color-border-hover)

/* Focus */
border-color: var(--color-black)
box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1)
outline: none

/* Error */
border-color: var(--color-danger)
box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1)

/* Success */
border-color: var(--color-success)
box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1)

/* Disabled */
background: var(--color-gray-100)
cursor: not-allowed
opacity: 0.6
```

### Cartes

```css
background: var(--color-white)
border: 2px solid var(--color-border)
border-radius: var(--radius-lg) (12px)
padding: var(--space-6) (24px)
box-shadow: var(--shadow-sm)
transition: all var(--transition-base)

/* Hover (si interactive) */
box-shadow: var(--shadow-md)
border-color: var(--color-border-hover)
transform: translateY(-2px)
```

### Badges / Tags

```css
display: inline-flex
align-items: center
font-size: var(--font-size-xs) (12px)
font-weight: 500
padding: var(--space-1) var(--space-3) (4px 12px)
border-radius: var(--radius-full)
background: var(--color-gray-100)
color: var(--color-text)
```

### Dividers (Séparateurs)

```css
/* Horizontal */
height: 1px
background: var(--color-border)
border: none
margin: var(--space-8) 0

/* Vertical */
width: 1px
background: var(--color-border)
margin: 0 var(--space-4)
```

---

## Grille et Responsive

### Conteneurs

```css
/* Container principal */
.container {
  width: 100%
  max-width: 1280px (--container-xl)
  margin: 0 auto
  padding: 0 24px (--space-6)
}
```

### Points de Rupture

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Desktop small */
@media (max-width: 1024px) { ... }

/* Desktop large */
@media (min-width: 1280px) { ... }
```

### Largeurs de Conteneurs

```css
--container-sm: 640px       /* Mobile large */
--container-md: 768px       /* Tablet */
--container-lg: 1024px      /* Desktop small */
--container-xl: 1280px      /* Desktop standard */
--container-2xl: 1536px     /* Desktop large */
```

### Ajustements Responsive

#### Mobile (≤ 768px)
```css
/* Typographie réduite */
--font-size-5xl: 2.25rem (36px au lieu de 48px)
--font-size-4xl: 1.875rem (30px au lieu de 36px)
--font-size-3xl: 1.5rem (24px au lieu de 30px)

/* Padding réduit */
.container {
  padding: 0 16px (--space-4)
}
```

#### Mobile Small (≤ 480px)
```css
/* Base font-size réduite */
html {
  font-size: 14px
}
```

---

## États Interactifs

### Ordre d'États

1. **Default** : État de repos
2. **Hover** : Survol de la souris
3. **Focus** : Focus clavier
4. **Active** : Clic/appui
5. **Disabled** : Désactivé

### Focus Visible (Accessibilité)

```css
:focus-visible {
  outline: 2px solid var(--color-black)
  outline-offset: 2px
}
```

**Important** : Ne jamais supprimer les outlines de focus sans alternative visuelle !

### Patterns d'Interaction

#### Hover Subtil
```css
transition: all 150ms
/* hover */
transform: translateY(-1px)
box-shadow: var(--shadow-md)
```

#### Hover Appuyé
```css
/* hover */
background: var(--color-black)
color: var(--color-white)
transform: scale(1.02)
```

#### Effet de Pression (Active)
```css
/* active */
transform: scale(0.98)
```

---

## Bonnes Pratiques

### Accessibilité

1. **Contraste**
   - Ratio minimum 4.5:1 pour le texte normal
   - Ratio minimum 3:1 pour le texte large (≥18px)
   - Utiliser les couleurs sémantiques avec leur signification appropriée

2. **Focus**
   - Toujours fournir un indicateur de focus visible
   - Ne jamais utiliser `outline: none` sans alternative

3. **Textes Alternatifs**
   - Fournir des labels pour les icônes seules
   - Utiliser `.sr-only` pour le texte accessible aux lecteurs d'écran

4. **Navigation Clavier**
   - Assurer que tous les éléments interactifs sont accessibles au clavier
   - Ordre de tabulation logique

### Performance

1. **Animations**
   - Préférer `transform` et `opacity`
   - Éviter d'animer `width`, `height`, `top`, `left`
   - Utiliser `will-change` avec parcimonie

2. **Images**
   - Toujours spécifier `width` et `height`
   - Utiliser des formats modernes (WebP, AVIF)
   - Lazy loading pour images hors viewport

### Cohérence

1. **Variables CSS**
   - Toujours utiliser les variables CSS définies
   - Ne jamais utiliser de valeurs en dur
   - Créer de nouvelles variables si besoin récurrent

2. **Espacements**
   - Suivre l'échelle d'espacements
   - Préférer les espacements cohérents (4, 8, 16, 24, 32...)

3. **Nommage**
   - Classes BEM si nécessaire
   - Noms sémantiques et descriptifs
   - Éviter les noms liés au style (`red-button` → `danger-button`)

### Maintenabilité

1. **Commentaires**
   - Documenter les composants complexes
   - Expliquer les "pourquoi" plus que les "comment"

2. **Modularité**
   - Composants réutilisables
   - Une responsabilité par composant
   - Éviter la duplication de code

3. **Mobile First**
   - Concevoir d'abord pour mobile
   - Enrichir progressivement pour desktop
   - Media queries en `min-width` plutôt que `max-width`

---

## Index Z (Superposition)

```css
--z-dropdown: 1000
--z-sticky: 1020
--z-fixed: 1030
--z-modal-backdrop: 1040
--z-modal: 1050
--z-popover: 1060
--z-tooltip: 1070
```

**Règle** : Plus l'élément doit être "au-dessus", plus son z-index est élevé.

---

## Exemples de Composition

### Page Hero

```html
<section style="
  padding: var(--space-20) var(--space-6);
  text-align: center;
  background: var(--color-white);
">
  <h1 style="
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-black);
    color: var(--color-black);
    margin-bottom: var(--space-6);
    letter-spacing: -0.02em;
  ">
    Titre Principal
  </h1>
  <p style="
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto var(--space-8);
    line-height: var(--line-height-relaxed);
  ">
    Description claire et concise du service ou produit.
  </p>
  <button style="
    background: var(--color-black);
    color: var(--color-white);
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
    border: none;
  ">
    Call to Action
  </button>
</section>
```

### Carte de Contenu

```html
<article style="
  background: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
">
  <h3 style="
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-4);
  ">
    Titre de la Carte
  </h3>
  <p style="
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-6);
  ">
    Description du contenu de la carte.
  </p>
  <a href="#" style="
    color: var(--color-black);
    font-weight: var(--font-weight-medium);
    text-decoration: underline;
  ">
    En savoir plus →
  </a>
</article>
```

### Formulaire

```html
<form style="max-width: 400px;">
  <div style="margin-bottom: var(--space-6);">
    <label style="
      display: block;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      margin-bottom: var(--space-2);
    ">
      Email
    </label>
    <input type="email" style="
      width: 100%;
      padding: var(--space-3) var(--space-4);
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      transition: all var(--transition-fast);
    " placeholder="exemple@email.com">
  </div>

  <button type="submit" style="
    width: 100%;
    background: var(--color-black);
    color: var(--color-white);
    padding: var(--space-4);
    border: none;
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
  ">
    Envoyer
  </button>
</form>
```

---

## Checklist de Design

Avant de valider une interface, vérifier :

- [ ] Tous les espacements utilisent les variables d'espacement
- [ ] Tous les textes ont une hiérarchie claire
- [ ] Le contraste des couleurs respecte les normes WCAG AA
- [ ] Les états interactifs (hover, focus, active) sont définis
- [ ] Le design est responsive sur mobile, tablette et desktop
- [ ] Les boutons et liens ont des zones de clic suffisantes (≥44x44px)
- [ ] Les messages d'erreur sont clairs et visibles
- [ ] Le focus clavier est visible sur tous les éléments interactifs
- [ ] Les animations sont fluides et ne gênent pas l'expérience
- [ ] La palette de couleurs est cohérente dans toute l'interface

---

## Support et Ressources

### Fichiers de Référence
- `src/style.css` : Fichier source du design system

### Documentation Externe
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inter Font](https://rsms.me/inter/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

**Version du document** : 1.0
**Dernière mise à jour** : 2025-12-09
**Auteur** : Design System Team
