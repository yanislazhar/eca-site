# Backlog — ECA Site

Fichier partagé pour suivre les idées et travaux à venir (produit / technique).

---

## À faire

### 1. Backoffice (sous-domaine)

- Mettre en place un **backoffice accessible via un sous-domaine** (ex. `admin.energy-cities-algeria.org` ou `cms.votredomaine.com`) pour que la com’ puisse **ajouter / modifier du contenu** sans toucher au code.
- **Pistes à trancher** : CMS headless (Sanity, Strapi, Payload, Directus), Notion + sync, ou pages protégées Next/Astro côté déploiement.
- Prévoir rôles (rédacteur / admin), médias (images PDF), et preview avant publication.

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
