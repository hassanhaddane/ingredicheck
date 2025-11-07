# ⚡ Quick Start - IngrédiCheck 2.0

Guide rapide pour démarrer le projet en 5 minutes.

---

## 🚀 Installation Express

```bash
# 1. Cloner le projet
git clone https://github.com/hassanhaddane/ingredicheck.git
cd ingredicheck

# 2. Installer les dépendances
pnpm install

# 3. Copier le fichier d'environnement
cp .env.example .env.local

# 4. Éditer .env.local avec vos clés Supabase
# (Voir DEPLOYMENT.md pour obtenir vos clés)

# 5. Générer le client Prisma
pnpm prisma generate

# 6. Créer les tables en base de données
pnpm prisma db push

# 7. Lancer le serveur de développement
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Commandes Principales

### Développement

```bash
pnpm dev              # Démarrer le serveur de développement (port 3000)
pnpm build            # Build pour la production
pnpm start            # Démarrer le serveur de production
```

### Code Quality

```bash
pnpm lint             # Linter le code avec ESLint
pnpm type-check       # Vérifier les types TypeScript
pnpm format           # Formater le code avec Prettier
```

### Tests

```bash
pnpm test             # Lancer les tests unitaires
pnpm test:e2e         # Lancer les tests E2E (Playwright)
```

### Database (Prisma)

```bash
pnpm prisma generate  # Générer le client Prisma
pnpm prisma studio    # Ouvrir l'interface admin de la DB
pnpm prisma db push   # Synchroniser le schéma avec la DB
pnpm prisma migrate dev --name <name>  # Créer une nouvelle migration
```

---

## 🎯 Structure du Projet

```
ingredicheck/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   │   ├── api/          # API Routes
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── product/      # Page détail produit
│   │   └── favorites/    # Page favoris
│   ├── components/       # Composants React
│   │   ├── ui/           # Composants UI (Shadcn)
│   │   └── features/     # Composants métier
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilitaires et configuration
│   └── tests/            # Tests unitaires
├── e2e/                  # Tests E2E (Playwright)
├── prisma/               # Schéma Prisma
└── public/               # Assets statiques
```

---

## 🔑 Variables d'Environnement Requises

Dans `.env.local` :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

👉 Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour obtenir ces valeurs.

---

## 🏃 Quick Tests

### Test 1 : Recherche de Produits

1. Lancez `pnpm dev`
2. Allez sur [http://localhost:3000](http://localhost:3000)
3. Tapez "Nutella" dans la barre de recherche
4. Cliquez sur "Rechercher"
5. ✅ Vous devriez voir des résultats

### Test 2 : Filtres

1. Dans les résultats, cliquez sur "Filtres"
2. Sélectionnez "NutriScore A"
3. ✅ Les résultats sont filtrés

### Test 3 : Page Produit

1. Cliquez sur une carte produit
2. ✅ Vous êtes redirigé vers la page détail
3. ✅ Vous voyez le score santé, les infos nutritionnelles, etc.

---

## 🐛 Debugging

### Problème : "Cannot find module"

```bash
# Réinstaller les dépendances
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Problème : "Prisma Client not found"

```bash
pnpm prisma generate
```

### Problème : "Database connection error"

1. Vérifiez que `DATABASE_URL` est correcte dans `.env.local`
2. Vérifiez que votre projet Supabase est actif
3. Essayez de push le schéma : `pnpm prisma db push`

### Problème : "Port 3000 already in use"

```bash
# Tuer le processus sur le port 3000
kill -9 $(lsof -ti:3000)

# Ou utiliser un autre port
PORT=3001 pnpm dev
```

---

## 📚 Documentation Complète

- [README.md](./README.md) - Documentation principale
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guide de déploiement détaillé
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guide de contribution
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Résumé du projet

---

## 🆘 Aide

### Logs Utiles

```bash
# Voir les logs Next.js
pnpm dev

# Voir les logs Prisma
pnpm prisma studio

# Voir les logs de build
pnpm build
```

### Commandes de Debug

```bash
# Vérifier les variables d'environnement
cat .env.local

# Vérifier la connexion à la DB
pnpm prisma db pull

# Voir le schéma généré
cat prisma/schema.prisma
```

---

## ✨ Tips & Astuces

### 1. Hot Reload

Le serveur de développement supporte le hot reload. Modifiez un fichier et voyez les changements instantanément !

### 2. Prisma Studio

Pour visualiser vos données :

```bash
pnpm prisma studio
```

Ouvre [http://localhost:5555](http://localhost:5555)

### 3. VS Code Extensions Recommandées

- Prisma
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### 4. Format on Save

Dans VS Code, ajoutez dans `.vscode/settings.json` :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 🎓 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenFoodFacts API](https://world.openfoodfacts.org/data)

---

## 🚀 Prêt à Coder !

Vous êtes maintenant prêt à développer sur IngrédiCheck 2.0 !

Happy coding! 💪
