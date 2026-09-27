# Portfolio Ariel

Portfolio personnel immersif pour Ariel, étudiant en informatique orienté développement, cybersécurité et hacking éthique.

## Lancer en local

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Vérifications

```bash
npm run typecheck
npm run lint
npm run build
```

## Avis et commentaires

Les notes envoyées depuis le portfolio sont enregistrées côté serveur dans
`data/ratings.jsonl` par défaut. Ce fichier est ignoré par Git pour éviter de
publier les avis des visiteurs.

Définir un token admin avant de lancer le site :

```bash
RATINGS_ADMIN_TOKEN=un-token-long-et-secret
```

Ariel peut ensuite consulter les avis sur `/admin/ratings` avec ce token et les
télécharger en CSV.

## Déploiement

Le projet est prêt pour Vercel. Définir éventuellement `NEXT_PUBLIC_SITE_URL` avec l'URL finale du portfolio pour générer les métadonnées, `robots.txt` et `sitemap.xml` avec le bon domaine.

Attention : le stockage fichier local n'est pas persistant sur les plateformes
serverless comme Vercel. Pour un déploiement Vercel, brancher ensuite une base
de données ou définir `RATINGS_WEBHOOK_URL` vers un service externe.
