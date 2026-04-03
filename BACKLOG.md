# Backlog — ECA Site

Fichier partagé pour suivre les idées et travaux à venir (produit / technique).

---

## À faire

### 1. Backoffice (sous-domaine)

- Mettre en place un **backoffice accessible via un sous-domaine** (ex. `admin.energy-cities-algeria.org` ou `cms.votredomaine.com`) pour que la com’ puisse **ajouter / modifier du contenu** sans toucher au code.
- **Pistes à trancher** : CMS headless (Sanity, Strapi, Payload, Directus), Notion + sync, ou pages protégées Next/Astro côté déploiement.
- Prévoir rôles (rédacteur / admin), médias (images PDF), et preview avant publication.

### 2. Formulaire de contact

- **Connecter le formulaire** « Contact » à un backend réel : envoi d’email (Resend, SendGrid, Brevo), webhook (Make, Zapier), ou endpoint serveur (serverless) avec validation anti-spam (honeypot, Turnstile / reCAPTCHA).
- États UI : chargement, succès, erreur ; ne pas perdre le message en cas d’échec.

### 3. *(À compléter)*

- …

---

## Fait / historique

*(Déplacer ici les items terminés avec une courte date ou référence PR.)*

---

## Notes

- Prioriser la **sécurité** (pas de clés API exposées côté client pour l’envoi mail).
- Aligner le choix du backoffice avec l’**hébergeur** actuel (Vercel, Netlify, etc.) et le budget maintenance.
