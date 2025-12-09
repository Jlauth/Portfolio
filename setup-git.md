# ⚙️ Configuration Git (à faire une seule fois)

Avant de pouvoir faire des commits, vous devez configurer votre identité Git.

## Configuration globale (recommandé)

Exécutez ces commandes en remplaçant par vos informations :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

**Exemple :**
```bash
git config --global user.name "Jean Dupont"
git config --global user.email "jean.dupont@example.com"
```

## Configuration locale (uniquement pour ce projet)

Si vous préférez une configuration différente pour ce projet uniquement :

```bash
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"
```

## Vérifier la configuration

```bash
git config --list
```

## Ensuite, créer le commit initial

```bash
git commit -m "Initial commit: Portfolio développeur web avec Next.js, TypeScript, Supabase et Vercel"
```

---

💡 **Astuce** : Utilisez l'email associé à votre compte GitHub pour une meilleure intégration.

