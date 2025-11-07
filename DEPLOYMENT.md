# 🚀 Guide de Déploiement - IngrédiCheck 2.0

Ce guide vous accompagne étape par étape pour déployer IngrédiCheck 2.0 en production.

---

## 📋 Prérequis

- Un compte [Supabase](https://supabase.com) (gratuit)
- Un compte [Vercel](https://vercel.com) (gratuit)
- Un compte GitHub
- Le projet IngrédiCheck cloné localement

---

## 🗄️ Étape 1 : Configuration Supabase

### 1.1 Créer un Projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com)
2. Cliquez sur **"Start your project"**
3. Créez une nouvelle organisation (si nécessaire)
4. Cliquez sur **"New project"**
5. Remplissez les informations :
   - **Name** : `ingredicheck` (ou votre choix)
   - **Database Password** : Générer un mot de passe fort (NOTEZ-LE !)
   - **Region** : Choisissez la région la plus proche
   - **Pricing Plan** : Free (suffisant pour commencer)
6. Cliquez sur **"Create new project"**

⏱️ *Attendez 2-3 minutes que le projet soit initialisé*

### 1.2 Récupérer les Clés API

Une fois le projet créé :

1. Dans le menu latéral, cliquez sur **"Project Settings"** (⚙️)
2. Allez dans **"API"**
3. Notez les informations suivantes :

```
Project URL: https://xxxxxxxxxxxx.supabase.co
anon public: eyJhbGc...
service_role: eyJhbGc... (⚠️ À garder secret !)
```

### 1.3 Configurer la Base de Données

1. Dans le menu latéral, cliquez sur **"SQL Editor"**
2. Cliquez sur **"+ New query"**
3. Collez le script suivant et exécutez-le :

```sql
-- Enable Row Level Security
ALTER TABLE IF EXISTS "SearchLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Favorite" ENABLE ROW LEVEL SECURITY;

-- SearchLog policies
CREATE POLICY "Anyone can create search logs"
ON "SearchLog" FOR INSERT
TO authenticated, anon
WITH CHECK (true);

CREATE POLICY "Users can view their own search logs"
ON "SearchLog" FOR SELECT
TO authenticated
USING (auth.uid()::text = "userId");

-- Favorite policies
CREATE POLICY "Users can view their own favorites"
ON "Favorite" FOR SELECT
TO authenticated
USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own favorites"
ON "Favorite" FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can delete their own favorites"
ON "Favorite" FOR DELETE
TO authenticated
USING (auth.uid()::text = "userId");
```

### 1.4 Récupérer les URLs de Connexion Database

1. Dans **"Project Settings"** → **"Database"**
2. Scrollez jusqu'à **"Connection string"**
3. Sélectionnez **"Session pooler"** (mode Transaction)
4. Copiez l'URL et remplacez `[YOUR-PASSWORD]` par votre mot de passe :

```
postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-xx-xxxx.pooler.supabase.com:6543/postgres
```

5. Répétez pour **"Direct connection"** :

```
postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-xx-xxxx.pooler.supabase.com:5432/postgres
```

### 1.5 Activer l'Authentification Email

1. Dans le menu latéral, cliquez sur **"Authentication"**
2. Allez dans **"Providers"**
3. Activez **"Email"** si ce n'est pas déjà fait
4. (Optionnel) Configurez d'autres providers (Google, GitHub, etc.)

---

## 🔧 Étape 2 : Configuration Locale

### 2.1 Créer le fichier .env.local

À la racine du projet, créez un fichier `.env.local` :

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...votre_service_role_key

# Database
DATABASE_URL=postgresql://postgres.xxxx:[PASSWORD]@aws-0-xx-xxxx.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.xxxx:[PASSWORD]@aws-0-xx-xxxx.pooler.supabase.com:5432/postgres

# OpenFoodFacts API
OPENFOODFACTS_API_URL=https://world.openfoodfacts.org

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **Remplacez les valeurs par celles de votre projet Supabase**

### 2.2 Installer les Dépendances

```bash
pnpm install
```

### 2.3 Générer le Client Prisma

```bash
pnpm prisma generate
```

### 2.4 Créer les Tables avec Prisma

```bash
pnpm prisma db push
```

Vous devriez voir :

```
✔ Generated Prisma Client
✔ Database sync completed
```

### 2.5 Tester Localement

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) et testez :
- ✅ Recherche de produits
- ✅ Filtres
- ✅ Page détail produit
- ✅ Connexion (optionnelle)
- ✅ Favoris (si connecté)

---

## ☁️ Étape 3 : Déploiement sur Vercel

### 3.1 Connecter le Repo GitHub

1. Rendez-vous sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New..."** → **"Project"**
3. Importez votre repository GitHub `ingredicheck`
4. Sélectionnez la branche à déployer (ex: `main` ou votre branche claude)

### 3.2 Configurer les Variables d'Environnement

Dans la section **"Environment Variables"**, ajoutez :

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` |
| `DATABASE_URL` | `postgresql://postgres.xxxx:...` (Session pooler) |
| `DIRECT_URL` | `postgresql://postgres.xxxx:...` (Direct) |
| `OPENFOODFACTS_API_URL` | `https://world.openfoodfacts.org` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` (sera fourni après déploiement) |

⚠️ **Utilisez les mêmes valeurs que dans votre `.env.local`**

### 3.3 Configurer les Build Settings

Vercel devrait auto-détecter Next.js. Vérifiez :

- **Framework Preset** : Next.js
- **Build Command** : `pnpm build`
- **Output Directory** : `.next`
- **Install Command** : `pnpm install`

### 3.4 Déployer

1. Cliquez sur **"Deploy"**
2. ⏱️ Attendez 2-3 minutes que le build se termine
3. 🎉 Votre application est en ligne !

### 3.5 Mettre à Jour NEXT_PUBLIC_APP_URL

1. Une fois déployé, Vercel vous donne une URL (ex: `https://ingredicheck-xxx.vercel.app`)
2. Retournez dans **"Settings"** → **"Environment Variables"**
3. Mettez à jour `NEXT_PUBLIC_APP_URL` avec votre URL Vercel
4. Cliquez sur **"Redeploy"** pour appliquer le changement

---

## 🎯 Étape 4 : Configuration Post-Déploiement

### 4.1 Configurer les Redirects Supabase

Dans Supabase :
1. Allez dans **"Authentication"** → **"URL Configuration"**
2. Ajoutez votre URL Vercel dans **"Site URL"** :
   ```
   https://your-app.vercel.app
   ```
3. Ajoutez dans **"Redirect URLs"** :
   ```
   https://your-app.vercel.app/**
   http://localhost:3000/** (pour le dev)
   ```

### 4.2 Vérifier les Migrations Prisma

Sur Vercel, les migrations se font automatiquement lors du build.

Si vous voulez les exécuter manuellement :

```bash
pnpm prisma migrate deploy
```

### 4.3 Tester l'Application Déployée

Visitez votre URL Vercel et testez :

- ✅ Recherche de produits (doit fonctionner)
- ✅ Filtres et tri
- ✅ Page détail produit
- ✅ Authentification (créer un compte)
- ✅ Favoris (ajouter/retirer)
- ✅ Mode sombre/clair

---

## 🔍 Étape 5 : Debugging

### Problèmes Courants

#### 1. Erreur "Failed to fetch"
- ✅ Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` est correct
- ✅ Vérifiez que les variables d'environnement sont bien définies sur Vercel

#### 2. Erreur de connexion Database
- ✅ Vérifiez le mot de passe dans `DATABASE_URL`
- ✅ Utilisez bien la "Session pooler" URL, pas la "Direct"

#### 3. Erreur Prisma "Table does not exist"
```bash
# En local
pnpm prisma db push

# Ou créer une migration
pnpm prisma migrate dev --name init
```

#### 4. Erreur d'authentification
- ✅ Vérifiez les Redirect URLs dans Supabase
- ✅ Activez l'email auth dans Supabase

### Voir les Logs

**Sur Vercel** :
1. Allez dans votre projet
2. Cliquez sur **"Deployments"**
3. Sélectionnez un déploiement
4. Cliquez sur **"Functions"** pour voir les logs API

**Sur Supabase** :
1. Allez dans **"Logs"**
2. Sélectionnez **"API"** ou **"Database"**

---

## 📊 Étape 6 : Monitoring

### Vercel Analytics

1. Dans votre projet Vercel, allez dans **"Analytics"**
2. Activez **Analytics** (gratuit pour 10k événements/mois)
3. Vous verrez :
   - Nombre de visiteurs
   - Pages vues
   - Performance (Core Web Vitals)

### Supabase Dashboard

Consultez régulièrement :
- **Database** → Voir les tables SearchLog et Favorite
- **Auth** → Nombre d'utilisateurs inscrits
- **API** → Logs des requêtes

---

## 🔐 Étape 7 : Sécurité

### Row Level Security (RLS)

Les politiques RLS sont déjà configurées (voir Étape 1.3).

Vérifiez qu'elles sont actives :
```sql
-- Vérifier RLS
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

### Variables d'Environnement

⚠️ **NE JAMAIS** commit :
- `SUPABASE_SERVICE_ROLE_KEY`
- Mots de passe
- Clés privées

✅ Utilisez `.env.local` (ignoré par git)

---

## 🚦 Étape 8 : Domaine Personnalisé (Optionnel)

### Ajouter un Domaine

1. Sur Vercel, allez dans **"Settings"** → **"Domains"**
2. Cliquez sur **"Add"**
3. Entrez votre domaine (ex: `ingredicheck.com`)
4. Suivez les instructions pour configurer les DNS

### Configurer Supabase avec le Nouveau Domaine

Mettez à jour les Redirect URLs dans Supabase :
```
https://ingredicheck.com/**
```

Et mettez à jour `NEXT_PUBLIC_APP_URL` sur Vercel.

---

## ✅ Checklist Finale

- [ ] ✅ Projet Supabase créé
- [ ] ✅ Tables créées avec Prisma
- [ ] ✅ RLS configuré
- [ ] ✅ Variables d'environnement définies sur Vercel
- [ ] ✅ Application déployée sur Vercel
- [ ] ✅ Tests effectués sur l'app déployée
- [ ] ✅ Redirect URLs configurées dans Supabase
- [ ] ✅ Monitoring activé

---

## 🆘 Support

En cas de problème :

1. Consultez les logs Vercel et Supabase
2. Vérifiez que toutes les variables d'environnement sont correctes
3. Testez localement d'abord avec `pnpm dev`
4. Ouvrez une issue sur GitHub

---

## 🎉 Félicitations !

Votre application IngrédiCheck 2.0 est maintenant en production ! 🚀

**URL de l'application** : `https://your-app.vercel.app`

Partagez-la et récoltez les retours de vos utilisateurs ! 💪
