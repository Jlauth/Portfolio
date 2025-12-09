# 🚀 Guide de Déploiement Vercel avec Git

Ce guide vous explique comment déployer votre portfolio sur Vercel avec synchronisation automatique via Git.

## 📋 Prérequis

- Compte GitHub (gratuit)
- Compte Vercel (gratuit)
- Projet Supabase configuré (optionnel)

## ⚙️ Configuration Git (première fois uniquement)

Si c'est la première fois que vous utilisez Git sur cet ordinateur, configurez votre identité :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

Ensuite, créez le commit initial :

```bash
git commit -m "Initial commit: Portfolio développeur web avec Next.js, TypeScript, Supabase et Vercel"
```

Voir `setup-git.md` pour plus de détails.

## 🔄 Étape 1 : Créer un repository GitHub

### Option A : Via l'interface GitHub (recommandé)

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `portfolio` (ou le nom de votre choix)
   - **Description** : "Portfolio développeur web"
   - **Visibilité** : Public ou Private (au choix)
   - ⚠️ **NE COCHEZ PAS** "Initialize with README" (on a déjà un repo local)
4. Cliquez sur **"Create repository"**

### Option B : Via la ligne de commande

```bash
# Créer le repo sur GitHub (remplacez USERNAME par votre nom d'utilisateur)
gh repo create portfolio --public --source=. --remote=origin --push
```

## 🔗 Étape 2 : Connecter votre repo local à GitHub

Si vous avez créé le repo via l'interface GitHub, exécutez ces commandes :

```bash
# Remplacez USERNAME et REPO_NAME par vos valeurs
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

**Exemple :**
```bash
git remote add origin https://github.com/votre-username/portfolio.git
git branch -M main
git push -u origin main
```

## ☁️ Étape 3 : Déployer sur Vercel

### Méthode 1 : Via l'interface Vercel (recommandé)

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub
2. Cliquez sur **"Add New..."** → **"Project"**
3. Importez votre repository GitHub :
   - Sélectionnez votre repository `portfolio`
   - Cliquez sur **"Import"**
4. Configurez le projet :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)
5. **Ajoutez les variables d'environnement** :
   - Cliquez sur **"Environment Variables"**
   - Ajoutez :
     - `NEXT_PUBLIC_SUPABASE_URL` = votre URL Supabase
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = votre clé anonyme Supabase
6. Cliquez sur **"Deploy"**

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI globalement
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer (dans le dossier du projet)
vercel

# Pour la production
vercel --prod
```

## ✅ Étape 4 : Vérifier le déploiement

1. Vercel va automatiquement :
   - Détecter Next.js
   - Installer les dépendances
   - Builder le projet
   - Déployer sur une URL (ex: `portfolio-xyz.vercel.app`)

2. Votre site est maintenant en ligne ! 🎉

## 🔄 Synchronisation automatique

Une fois connecté, **chaque push sur GitHub déclenchera automatiquement un nouveau déploiement sur Vercel** :

```bash
# Faire des modifications
# ... éditez vos fichiers ...

# Commiter les changements
git add .
git commit -m "Description de vos modifications"

# Pousser vers GitHub (déclenche automatiquement le déploiement Vercel)
git push
```

## 🌐 Domaines personnalisés

Pour ajouter un domaine personnalisé :

1. Allez dans votre projet Vercel
2. **Settings** → **Domains**
3. Ajoutez votre domaine (ex: `votrenom.com`)
4. Suivez les instructions pour configurer les DNS

## 🔐 Variables d'environnement

Les variables d'environnement sont gérées dans Vercel :

1. **Settings** → **Environment Variables**
2. Ajoutez/modifiez les variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

⚠️ **Important** : Après modification des variables, redéployez le projet.

## 📊 Monitoring et Analytics

Vercel fournit automatiquement :
- **Analytics** : Statistiques de visite
- **Speed Insights** : Performance du site
- **Logs** : Logs de déploiement et runtime

## 🐛 Dépannage

### Le déploiement échoue ?

1. Vérifiez les **logs de build** dans Vercel
2. Testez localement : `npm run build`
3. Vérifiez que toutes les variables d'environnement sont définies

### Les changements ne se déploient pas ?

1. Vérifiez que vous avez bien fait `git push`
2. Vérifiez les **Deployments** dans Vercel
3. Vérifiez que GitHub est bien connecté à Vercel

### Erreurs Supabase en production ?

1. Vérifiez les variables d'environnement dans Vercel
2. Vérifiez que les politiques RLS sont correctes dans Supabase
3. Vérifiez que l'URL Supabase est accessible publiquement

## 📝 Commandes Git utiles

```bash
# Voir l'état des fichiers
git status

# Ajouter tous les fichiers modifiés
git add .

# Commiter avec un message
git commit -m "Votre message"

# Pousser vers GitHub (déclenche Vercel)
git push

# Voir l'historique
git log

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Revenir à la branche main
git checkout main
```

## 🎯 Workflow recommandé

1. **Développement local** : `npm run dev`
2. **Tester** : Vérifier que tout fonctionne
3. **Commit** : `git add . && git commit -m "message"`
4. **Push** : `git push` (déclenche Vercel automatiquement)
5. **Vérifier** : Attendre le déploiement sur Vercel

---

🎉 **Félicitations !** Votre portfolio est maintenant en ligne et synchronisé avec Git !

