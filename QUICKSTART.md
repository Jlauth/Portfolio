# 🚀 Guide de Démarrage Rapide

## Installation en 3 étapes

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer Supabase (optionnel mais recommandé)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans **Settings > API** pour récupérer :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Créez un fichier `.env.local` à la racine du projet :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```
5. Exécutez le script SQL dans l'éditeur SQL de Supabase (voir `supabase-setup.sql`)

### 3. Lancer le projet
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🎨 Personnalisation

### Modifier les informations personnelles

1. **Hero Section** : `components/Hero.tsx`
   - Modifiez le nom, titre, description
   - Mettez à jour les liens sociaux

2. **About Section** : `components/About.tsx`
   - Personnalisez la description

3. **Skills** : `components/Skills.tsx`
   - Ajoutez/modifiez vos compétences et niveaux

4. **Projects** : 
   - Modifiez `components/Projects.tsx` pour les projets statiques
   - Ou ajoutez des projets dans Supabase (table `projects`)

5. **Contact** : `components/Contact.tsx`
   - Mettez à jour les informations de contact

### Changer les couleurs

Modifiez `tailwind.config.ts` pour personnaliser le thème de couleurs.

## 📦 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Allez sur [vercel.com](https://vercel.com)
3. Importez votre repository
4. Ajoutez les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Déployez !

## ✨ Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Animations fluides avec Framer Motion
- ✅ Intégration Supabase pour le backend
- ✅ Formulaire de contact fonctionnel
- ✅ Gestion des projets depuis Supabase
- ✅ Optimisé pour le SEO
- ✅ Prêt pour la production

## 🐛 Problèmes courants

**Le formulaire de contact ne fonctionne pas ?**
- Vérifiez que Supabase est configuré
- Vérifiez que la table `contacts` existe
- Vérifiez les variables d'environnement

**Les projets ne s'affichent pas ?**
- Vérifiez la table `projects` dans Supabase
- Les projets par défaut s'afficheront si Supabase n'est pas configuré

**Erreurs de build ?**
- Vérifiez que toutes les dépendances sont installées
- Vérifiez que TypeScript est correctement configuré

