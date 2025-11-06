# Contributing to IngrédiCheck

Merci de votre intérêt pour contribuer à IngrédiCheck ! 🎉

## Code of Conduct

En participant à ce projet, vous vous engagez à maintenir un environnement respectueux et accueillant pour tous.

## Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/hassanhaddane/ingredicheck/issues)
2. Créez une nouvelle issue avec un titre clair
3. Décrivez le comportement attendu vs le comportement actuel
4. Incluez des captures d'écran si pertinent
5. Mentionnez votre environnement (OS, navigateur, version)

### Proposer une fonctionnalité

1. Créez une issue avec le tag `enhancement`
2. Décrivez clairement la fonctionnalité proposée
3. Expliquez pourquoi elle serait utile
4. Proposez une implémentation si possible

### Soumettre une Pull Request

1. **Fork le projet**
   ```bash
   git clone https://github.com/votre-username/ingredicheck.git
   cd ingredicheck
   ```

2. **Créer une branche**
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```

3. **Faire vos modifications**
   - Suivre les conventions de code
   - Ajouter des tests si nécessaire
   - Mettre à jour la documentation

4. **Tester localement**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   pnpm build
   ```

5. **Commit et Push**
   ```bash
   git add .
   git commit -m "feat: ajouter ma fonctionnalité"
   git push origin feature/ma-fonctionnalite
   ```

6. **Ouvrir une Pull Request**
   - Décrire les changements apportés
   - Référencer les issues liées
   - Attendre la review

## Standards de code

### TypeScript

- Utiliser TypeScript strict mode
- Typer toutes les variables et fonctions
- Éviter les `any` sauf si absolument nécessaire

### Naming

- **Components**: PascalCase (`ProductCard.tsx`)
- **Functions/Hooks**: camelCase (`useSearch.ts`)
- **Constants**: UPPER_SNAKE_CASE (`HEALTH_SCORE_WEIGHTS`)
- **Files**: kebab-case ou PascalCase selon le type

### Structure des commits

Suivre la convention [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage, sans changement de code
- `refactor:` refactoring
- `test:` ajout/modification de tests
- `chore:` tâches de maintenance

Exemples:
```
feat: add product comparison feature
fix: resolve infinite scroll issue
docs: update installation guide
```

## Développement

### Setup

```bash
pnpm install
cp .env.example .env.local
# Configurer les variables d'environnement
pnpm dev
```

### Tests

```bash
# Tests unitaires
pnpm test

# Tests E2E
pnpm test:e2e

# Coverage
pnpm test --coverage
```

### Build

```bash
pnpm build
pnpm start
```

## Questions

Si vous avez des questions, n'hésitez pas à :
- Ouvrir une issue
- Contacter les mainteneurs

Merci pour votre contribution ! 🙏
