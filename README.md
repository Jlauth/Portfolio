# Portfolio Développeur Web

Portfolio moderne créé avec Next.js 14, TypeScript, Tailwind CSS, Supabase et déployé sur Vercel.

## 🚀 Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Supabase** - Backend et base de données
- **Vercel** - Déploiement et hosting

## 📦 Installation

1. Clonez le repository :
```bash
git clone <votre-repo>
cd folio
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env.local
```

Remplissez les variables dans `.env.local` :
- `NEXT_PUBLIC_SUPABASE_URL` - URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé anonyme de votre projet Supabase
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Clé publique reCAPTCHA v3 (optionnel)
- `RECAPTCHA_SECRET_KEY` - Clé secrète reCAPTCHA v3 (optionnel)
- `RESEND_API_KEY` - Clé API Resend pour les notifications email (optionnel)
- `NOTIFICATION_EMAIL` - Email de destination pour les notifications (par défaut: lauth_jean@live.fr)

## 🗄️ Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com)

2. Créez la table `contacts` :
```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Créez la table `projects` (optionnel) :
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[],
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

4. Activez Row Level Security (RLS) si nécessaire :
```sql
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
```

## 🛡️ Configuration reCAPTCHA v3 (Optionnel)

Pour activer la protection anti-spam sur le formulaire de contact :

1. Créez un site reCAPTCHA v3 sur [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Ajoutez votre domaine (ex: `localhost` pour le développement, votre domaine pour la production)
3. Copiez la **Site Key** et la **Secret Key**
4. Ajoutez-les dans `.env.local` :
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - La clé publique (commence par `6L...`)
   - `RECAPTCHA_SECRET_KEY` - La clé secrète (commence par `6L...`)

**Note** : Si les clés ne sont pas configurées, le formulaire fonctionnera toujours mais sans protection reCAPTCHA.

## 📧 Configuration Email (Resend) - Optionnel

Pour recevoir des notifications par email lorsqu'un message est envoyé via le formulaire de contact :

1. Créez un compte sur [Resend](https://resend.com) (gratuit jusqu'à 3000 emails/mois)
2. Obtenez votre clé API dans le dashboard Resend
3. Ajoutez dans `.env.local` :
   - `RESEND_API_KEY` - Votre clé API Resend
   - `NOTIFICATION_EMAIL` - Votre email de destination (par défaut: lauth_jean@live.fr)

**Note** : Les messages sont toujours sauvegardés dans Supabase. L'email est une notification supplémentaire. Si Resend n'est pas configuré, les messages seront quand même sauvegardés dans Supabase.

## 🎨 Personnalisation

- Modifiez les informations dans `components/Hero.tsx`
- Ajoutez vos projets dans `components/Projects.tsx` ou connectez-vous à Supabase
- Personnalisez les couleurs dans `tailwind.config.ts`
- Mettez à jour les liens sociaux dans les composants

## 🚀 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Connectez votre repository à [Vercel](https://vercel.com)
3. Ajoutez les variables d'environnement dans les paramètres du projet Vercel
4. Déployez !

## 📝 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Lance le linter

## 📄 Licence

MIT

