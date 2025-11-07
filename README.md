# 🍎 IngrédiCheck 2.0

<div align="center">

![IngrédiCheck Logo](https://img.shields.io/badge/IngrédiCheck-2.0-purple?style=for-the-badge&logo=react)

**Explorez, filtrez et analysez la qualité nutritionnelle de vos produits alimentaires**

[![CI](https://github.com/hassanhaddane/ingredicheck/actions/workflows/ci.yml/badge.svg)](https://github.com/hassanhaddane/ingredicheck/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Demo Live](#) • [Documentation](#) • [Rapport de bugs](https://github.com/hassanhaddane/ingredicheck/issues)

</div>

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [License](#-license)

## 📚 Documentation Complète

- **[⚡ QUICKSTART.md](./QUICKSTART.md)** - Démarrage rapide en 5 minutes
- **[🚀 DEPLOYMENT.md](./DEPLOYMENT.md)** - Guide de déploiement complet (Supabase + Vercel)
- **[📊 PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Résumé complet du projet
- **[🤝 CONTRIBUTING.md](./CONTRIBUTING.md)** - Guide de contribution

---

## 🎯 À propos

**IngrédiCheck 2.0** est une application web fullstack moderne qui permet d'explorer et d'analyser des produits alimentaires à partir de la base de données publique [OpenFoodFacts](https://world.openfoodfacts.org/).

### Objectifs

- 🔍 **Recherche intelligente** : Trouvez des produits par nom, marque ou code-barres
- 🎨 **Interface moderne** : Design futuriste avec mode sombre/clair
- 📊 **Analyse nutritionnelle** : Score santé calculé et visualisation des données
- ❤️ **Favoris persistants** : Sauvegardez vos produits préférés
- 🔬 **Filtrage avancé** : NutriScore, NOVA, bio, allergènes, etc.
- ♿ **Accessibilité** : Interface responsive et accessible

---

## ✨ Fonctionnalités

### Principales

- ✅ **Recherche de produits** avec pagination infinie
- ✅ **Filtres multi-critères** (NutriScore, NOVA, Bio, Huile de palme, etc.)
- ✅ **Tri personnalisé** (NutriScore, Calories, Nom, Popularité)
- ✅ **Fiche produit détaillée** avec :
  - Informations nutritionnelles complètes
  - Score santé calculé (0-100)
  - Surlignage des allergènes
  - Additifs et labels
- ✅ **Gestion des favoris** avec authentification Supabase
- ✅ **Mode sombre/clair** avec persistence
- ✅ **Journalisation des recherches** pour analytics

### Bonus

- 🎨 Design moderne avec animations fluides
- 📱 Responsive mobile-first
- ⚡ Performance optimisée (SSR, caching)
- 🧪 Tests unitaires et E2E
- 📈 CI/CD avec GitHub Actions

---

## 🛠 Stack Technique

### Frontend

| Technologie | Version | Utilisation |
|------------|---------|-------------|
| **Next.js** | 15.x | Framework React SSR/RSC |
| **React** | 19.x | UI Library |
| **TypeScript** | 5.6 | Typage statique |
| **TanStack Query** | 5.x | Data fetching & caching |
| **Tailwind CSS** | 3.x | Styling |
| **Shadcn/UI** | Latest | Composants UI |
| **Lucide React** | Latest | Icônes |
| **next-themes** | Latest | Gestion du thème |

### Backend

| Technologie | Version | Utilisation |
|------------|---------|-------------|
| **Next.js API Routes** | 15.x | API REST |
| **Prisma** | 5.x | ORM TypeScript |
| **Supabase** | Latest | Auth + PostgreSQL |
| **Zod** | 3.x | Validation runtime |

### Tests & Qualité

| Outil | Utilisation |
|-------|-------------|
| **Vitest** | Tests unitaires |
| **Playwright** | Tests E2E |
| **ESLint** | Linting |
| **Prettier** | Formatage |
| **Husky** | Pre-commit hooks |

### DevOps

| Service | Utilisation |
|---------|-------------|
| **GitHub Actions** | CI/CD |
| **Vercel** | Déploiement |
| **Supabase** | Database & Auth |

---

## 🏗 Architecture

### Diagramme de l'architecture

```mermaid
graph TB
    subgraph Client
        A[Next.js App] --> B[React Components]
        B --> C[TanStack Query]
        C --> D[API Routes]
    end

    subgraph Backend
        D --> E[OpenFoodFacts API]
        D --> F[Supabase Auth]
        D --> G[Prisma ORM]
        G --> H[(PostgreSQL)]
    end

    subgraph External
        E --> I[OpenFoodFacts DB]
    end

    style A fill:#667eea
    style H fill:#22c55e
    style I fill:#f59e0b
```

### Structure du projet

```
ingredicheck/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
├── e2e/                        # Tests E2E Playwright
│   ├── search.spec.ts
│   ├── product-detail.spec.ts
│   └── navigation.spec.ts
├── prisma/
│   └── schema.prisma           # Modèles de données
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes
│   │   │   ├── search/
│   │   │   ├── product/
│   │   │   └── favorites/
│   │   ├── product/[code]/     # Page détail produit
│   │   ├── favorites/          # Page favoris
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Page d'accueil
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Composants Shadcn/UI
│   │   ├── features/           # Composants métier
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── hooks/
│   │   ├── use-search.ts
│   │   ├── use-favorites.ts
│   │   ├── use-toast.ts
│   │   └── use-in-view.ts
│   ├── lib/
│   │   ├── cn.ts
│   │   ├── prisma.ts
│   │   ├── supabase/
│   │   ├── openfoodfacts.ts
│   │   ├── schemas.ts          # Zod schemas
│   │   ├── health-score.ts
│   │   └── filters.ts
│   └── tests/
│       ├── setup.ts
│       └── utils/              # Tests unitaires
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
└── README.md
```

### Flux de données

```mermaid
sequenceDiagram
    participant User
    participant App
    participant API
    participant OFF as OpenFoodFacts
    participant DB as Supabase/Prisma

    User->>App: Recherche "Nutella"
    App->>API: GET /api/search?query=nutella
    API->>OFF: Fetch products
    OFF-->>API: Products data
    API->>DB: Log search
    API-->>App: Enriched data
    App-->>User: Display results

    User->>App: Click product
    App->>API: GET /api/product/[code]
    API->>OFF: Fetch product details
    OFF-->>API: Product data
    API-->>App: Product details
    App-->>User: Display product page
```

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/hassanhaddane/ingredicheck.git
cd ingredicheck

# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer les variables d'environnement (voir Configuration)
# Éditer .env.local avec vos clés

# Générer le client Prisma
pnpm prisma generate

# (Optionnel) Lancer les migrations
pnpm prisma migrate dev

# Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database?pgbouncer=true
DIRECT_URL=postgresql://user:password@host:port/database

# OpenFoodFacts API (optionnel)
OPENFOODFACTS_API_URL=https://world.openfoodfacts.org

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Configuration Supabase

1. **Créer un projet Supabase**
   - Aller sur [supabase.com](https://supabase.com)
   - Créer un nouveau projet
   - Copier l'URL et les clés API

2. **Configurer l'authentification**
   - Activer Email/Password dans Authentication > Providers
   - (Optionnel) Configurer OAuth (Google, GitHub, etc.)

3. **Récupérer les connexions database**
   - Aller dans Settings > Database
   - Copier la "Connection string" (pooler)
   - Copier la "Direct connection string"

---

## 💻 Utilisation

### Commandes disponibles

```bash
# Développement
pnpm dev              # Démarrer le serveur dev
pnpm build            # Build pour production
pnpm start            # Démarrer en production
pnpm lint             # Linter le code
pnpm format           # Formater avec Prettier
pnpm type-check       # Vérifier les types TypeScript

# Tests
pnpm test             # Tests unitaires (Vitest)
pnpm test:e2e         # Tests E2E (Playwright)

# Prisma
pnpm prisma generate  # Générer le client
pnpm prisma studio    # Interface admin DB
pnpm prisma migrate dev # Créer/appliquer migrations
```

### Utilisation de l'application

1. **Rechercher un produit**
   - Entrer un nom, marque ou code-barres
   - Utiliser les suggestions rapides

2. **Filtrer les résultats**
   - Cliquer sur "Filtres"
   - Sélectionner NutriScore, NOVA, Bio, etc.
   - Les résultats se mettent à jour automatiquement

3. **Consulter un produit**
   - Cliquer sur une carte produit
   - Voir les détails nutritionnels
   - Ajouter aux favoris (authentification requise)

4. **Gérer les favoris**
   - Cliquer sur l'icône cœur en haut
   - Voir tous vos produits favoris
   - Retirer un favori en cliquant à nouveau

---

## 🧪 Tests

### Tests unitaires

```bash
# Lancer tous les tests
pnpm test

# Mode watch
pnpm test --watch

# Avec coverage
pnpm test --coverage
```

### Tests E2E

```bash
# Installer les navigateurs Playwright
pnpm exec playwright install

# Lancer les tests E2E
pnpm test:e2e

# Mode UI interactif
pnpm exec playwright test --ui

# Générer le rapport
pnpm exec playwright show-report
```

### Coverage

Les tests couvrent :
- ✅ Calcul du score santé
- ✅ Filtrage des produits
- ✅ Tri des produits
- ✅ Parcours utilisateur (recherche, détail, favoris)
- ✅ Navigation et thème

Objectif : > 80% de coverage

---

## 🚢 Déploiement

### Déploiement sur Vercel (Recommandé)

1. **Push sur GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Importer sur Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Importer le repository GitHub
   - Configurer les variables d'environnement
   - Déployer

3. **Variables d'environnement Vercel**
   - Ajouter toutes les variables du `.env.local`
   - Ne pas oublier `DATABASE_URL` et `DIRECT_URL`

### Build local

```bash
# Build de production
pnpm build

# Tester le build
pnpm start
```

### Docker (optionnel)

```dockerfile
# Dockerfile (exemple)
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 📊 Performances

### Core Web Vitals

- **LCP** (Largest Contentful Paint) : < 2.5s ⚡
- **FID** (First Input Delay) : < 100ms ⚡
- **CLS** (Cumulative Layout Shift) : < 0.1 ⚡

### Optimisations

- ✅ Server Components (RSC)
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting automatique
- ✅ Caching API (60s)
- ✅ Lazy loading & Infinite scroll
- ✅ Bundle size < 300 Ko

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines

- Suivre les conventions TypeScript
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire
- Respecter le code style (ESLint + Prettier)

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [OpenFoodFacts](https://world.openfoodfacts.org) pour l'API publique
- [Vercel](https://vercel.com) pour le hosting
- [Supabase](https://supabase.com) pour l'infrastructure backend
- [Shadcn/UI](https://ui.shadcn.com) pour les composants UI

---

## 📧 Contact

**Hassan Haddane**

- GitHub: [@hassanhaddane](https://github.com/hassanhaddane)
- Email: contact@exemple.com

---

<div align="center">

Made with ❤️ and ☕ by Hassan Haddane

⭐ N'oubliez pas de mettre une étoile si ce projet vous plaît !

</div>
