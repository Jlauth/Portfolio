# ⚡ Déploiement Rapide - Checklist

Suivez ces étapes dans l'ordre pour déployer votre portfolio en 5 minutes.

## ✅ Checklist de déploiement

### 1. Configuration Git (si pas déjà fait)
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
git commit -m "Initial commit"
```

### 2. Créer le repository GitHub
- [ ] Aller sur [github.com](https://github.com)
- [ ] Créer un nouveau repository (sans README)
- [ ] Copier l'URL du repository

### 3. Connecter le repo local à GitHub
```bash
git remote add origin https://github.com/VOTRE-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 4. Configurer Supabase (optionnel)
- [ ] Créer un projet sur [supabase.com](https://supabase.com)
- [ ] Exécuter le script `supabase-setup.sql`
- [ ] Récupérer l'URL et la clé API

### 5. Déployer sur Vercel
- [ ] Aller sur [vercel.com](https://vercel.com)
- [ ] Importer le repository GitHub
- [ ] Ajouter les variables d'environnement :
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Cliquer sur "Deploy"

### 6. Vérifier
- [ ] Le site est accessible sur l'URL Vercel
- [ ] Tester le formulaire de contact
- [ ] Vérifier que les projets s'affichent

## 🎉 C'est fait !

Votre portfolio est maintenant en ligne. Chaque `git push` déclenchera automatiquement un nouveau déploiement.

---

📖 Pour plus de détails, consultez `DEPLOYMENT.md`

