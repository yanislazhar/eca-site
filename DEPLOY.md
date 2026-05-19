# Mise en production — Energy Cities Algeria

Checklist dans l’ordre recommandé.

## 0. Nettoyage local avant push

```bash
# Ne jamais committer de secrets
rm -f .env .env.local .env.production
# Dossier build régénéré au deploy Vercel
rm -rf dist
# Dossier supabase vide (expérimentation non utilisée)
rm -rf supabase/.temp
```

Variables sensibles **uniquement** dans Vercel → Project → Settings → Environment Variables (Production).

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `RESEND_API_KEY` | Oui (contact) | Clé API Resend |
| `CONTACT_TO_EMAIL` | Oui | `energycitiesalgeria@gmail.com` |
| `CONTACT_FROM_EMAIL` | Oui | `Energy Cities Algeria <contact@mail.energy-cities-algeria.org>` |
| `ADMIN_PASSWORD` | Oui (admin) | Mot de passe fort pour `/admin/login` |
| `ADMIN_SESSION_SECRET` | Recommandé | Chaîne aléatoire longue (≠ mot de passe admin) |
| `BLOB_READ_WRITE_TOKEN` | Oui (CMS) | Token Vercel Blob |

Voir `.env.example` — ce fichier seul peut rester dans Git.

---

## 1. DNS Icosnet (cPanel)

**Objectif :** faire pointer `energy-cities-algeria.org` et `www` vers Vercel (nouveau site React), pas l’hébergement LiteSpeed actuel.

### A. Ajouter le domaine dans Vercel

1. [vercel.com](https://vercel.com) → projet **eca-site** → **Settings** → **Domains**
2. Ajouter `energy-cities-algeria.org` et `www.energy-cities-algeria.org`
3. Noter les enregistrements demandés par Vercel (souvent identiques à ci-dessous)

### B. cPanel Icosnet → **Zone Editor** (ou « Éditeur de zone DNS »)

Pour le domaine `energy-cities-algeria.org` :

| Type | Nom / Host | Valeur | TTL |
|------|------------|--------|-----|
| **A** | `@` (ou vide) | `76.76.21.21` | 3600 |
| **A** | `www` | `76.76.21.21` | 3600 |

**À supprimer ou désactiver** (si présents et liés à l’ancien hébergement) :

- Anciens enregistrements **A** pointant vers l’IP Icosnet / LiteSpeed
- **CNAME** `www` vers un sous-domaine hébergeur (`serverXX.icosnet.com`, etc.)

**Ne pas toucher** (pour l’email Resend, étape 3) : enregistrements **MX**, **TXT** SPF/DKIM que vous ajouterez pour `mail.energy-cities-algeria.org`.

### C. Propagation

- Attendre 15 min à 48 h (souvent < 2 h)
- Vérifier : `dig energy-cities-algeria.org +short` → doit afficher `76.76.21.21`
- Vercel → Domains : statut **Valid**

### D. HTTPS

Vercel émet le certificat SSL automatiquement une fois le DNS validé.

### E. Ancien site Icosnet

Dans cPanel, vous pouvez **désactiver** l’ancien site / dossier `public_html` pour ce domaine une fois Vercel actif, pour éviter toute confusion. Gardez une sauvegarde des fichiers anciens si besoin.

---

## 2. Email formulaire (Resend)

### A. Compte Resend

1. [resend.com](https://resend.com) → créer un compte
2. **Domains** → **Add domain** → `mail.energy-cities-algeria.org`

### B. DNS email dans cPanel (sous-domaine `mail`)

Resend affiche des enregistrements à copier. Typiquement :

| Type | Nom | Valeur (exemple — utiliser ceux de Resend) |
|------|-----|---------------------------------------------|
| **TXT** | `mail` | vérification domaine Resend |
| **TXT** | `mail` | SPF (`v=spf1 include:...`) |
| **CNAME** | `resend._domainkey.mail` | DKIM fourni par Resend |

Puis **DMARC** (recommandé) :

| Type | Nom | Valeur |
|------|-----|--------|
| **TXT** | `_dmarc.mail` | `v=DMARC1; p=none; rua=mailto:energycitiesalgeria@gmail.com` |

Attendre statut **Verified** dans Resend.

### C. Clé API & Vercel

1. Resend → **API Keys** → Create → copier la clé
2. Vercel → Environment Variables → `RESEND_API_KEY` (Production)
3. Vérifier `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL`
4. **Redeploy** le projet

### D. Test

```bash
curl -X POST https://energy-cities-algeria.org/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"votre@email.com","subject":"Test prod","message":"Message de test production avec plus de vingt caractères."}'
```

Réponse attendue : `{"message":"Message envoyé avec succès."}`  
Vérifier la boîte `energycitiesalgeria@gmail.com` (et les spams).

---

## 3. Google Search Console & sitemap

**À faire seulement quand le nouveau site est en ligne sur Vercel** (pas l’ancien LiteSpeed).

### A. Vérifier que le sitemap répond

- https://energy-cities-algeria.org/robots.txt
- https://energy-cities-algeria.org/sitemap.xml

### B. Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. **Ajouter une propriété** → **Préfixe d’URL** : `https://energy-cities-algeria.org/`
3. Vérification : **Enregistrement DNS TXT** (cPanel Zone Editor) ou balise HTML via Vercel si proposé
4. **Sitemaps** → envoyer : `https://energy-cities-algeria.org/sitemap.xml`
5. **Inspection d’URL** → URL d’accueil → **Demander une indexation**

### C. Bing (optionnel)

[bing.com/webmasters](https://www.bing.com/webmasters) — importer depuis Google ou soumettre la même sitemap.

---

## 4. Contrôles post-mise en prod

- [ ] Accueil charge le nouveau design (React)
- [ ] Image hero rapide (WebP)
- [ ] Formulaire contact → email reçu
- [ ] `/admin/login` accessible, mot de passe fort
- [ ] `/.env` et `/api/` non exposés inutilement
- [ ] Ancienne version LiteSpeed plus servie sur le domaine principal

---

## Dépannage rapide

| Problème | Cause probable |
|----------|----------------|
| Ancien site encore visible | DNS pas propagé ou A record encore vers Icosnet |
| `robots.txt` 404 | Domaine pas encore sur Vercel |
| Contact « pas configuré » | `RESEND_API_KEY` ou `CONTACT_FROM_EMAIL` manquant sur Vercel |
| Email en spam | DKIM/SPF/DMARC incomplets sur `mail.` |
| Admin inaccessible | `ADMIN_PASSWORD` non défini en Production |
