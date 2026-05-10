# Backlog — ECA Site

Fichier partagé pour suivre les idées et travaux à venir (produit / technique).

---

## À faire

### 1. Administration intégrée (`/admin/login`)

- Remplacer l’idée de sous-domaine par une **page protégée `/admin/login`**, qui mène après connexion à `/admin`.
- Limiter le périmètre éditorial aux besoins utiles pour ECA :
  - modifier les **photos principales du site** ;
  - ajouter / modifier / publier les **actualités** avec photo, titre, date, résumé et texte.
- Utiliser **Vercel Blob + API serverless** pour éviter une base de données :
  - authentification simple via `/api/admin/login`, cookie HttpOnly et `ADMIN_PASSWORD` ;
  - contenu éditorial stocké dans un petit JSON `cms/content.json` ;
  - images éditoriales stockées dans Vercel Blob.
- Prévoir une première version simple sans rôles complexes, puis ajouter rôles / preview si le besoin grandit.

### 2. Formulaire de contact

- Le formulaire est câblé côté code via `/api/contact`, mais **l’envoi email n’est pas encore opérationnel** tant que Resend n’est pas configuré.
- Renouveler le nom de domaine officiel `energy-cities-algeria.org` chez Icosnet avant toute mise en production sur le domaine.
- Une fois le domaine renouvelé, configurer la zone DNS Icosnet pour Vercel :
  - `A @ 76.76.21.21`
  - `A www 76.76.21.21`
- Configurer Resend avec le domaine d’envoi `mail.energy-cities-algeria.org`.
- Ajouter dans la zone DNS Icosnet les enregistrements SPF/DKIM fournis par Resend, puis le DMARC recommandé.
- Créer une clé API Resend et l’ajouter dans Vercel en variable d’environnement `RESEND_API_KEY`.
- Vérifier que les variables Vercel suivantes sont bien présentes en production :
  - `CONTACT_TO_EMAIL=energycitiesalgeria@gmail.com`
  - `CONTACT_FROM_EMAIL=Energy Cities Algeria <contact@mail.energy-cities-algeria.org>`
- Redéployer sur Vercel après ajout de `RESEND_API_KEY`, puis tester un envoi réel depuis le formulaire.

---

## Notes

- Prioriser la **sécurité** (pas de clés API exposées côté client pour l’envoi mail).
- Aligner le choix du backoffice avec l’**hébergeur** actuel (Vercel, Netlify, etc.) et le budget maintenance.
