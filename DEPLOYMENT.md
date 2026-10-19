# Deployment

## GitHub Pages
1. Create a repo and push this folder's contents (the repo root should contain `index.html`):
   `git init && git add . && git commit -m "WishMagic" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch → main / root → Save**.
3. Your site appears at `https://<user>.github.io/<repo>/`. All paths are relative, so project sub-paths work. Share links are generated from the current address automatically.
4. Custom domain: add it under Settings → Pages, create the DNS records GitHub lists, then update the canonical URLs (see README).
5. `404.html` is used for missing pages. Its asset paths are relative, so on deep URLs its images may not load; the page text still works.

## Vercel
1. Push to GitHub (above), then **Add New → Project** in Vercel and import the repo.
2. Framework Preset: **Other**. Leave build command and output directory empty (root). Deploy.
3. Or with the CLI: `npx vercel --prod` inside this folder.
4. Add a custom domain under Project → Settings → Domains, then update canonical URLs.

## After deploying
Create a surprise, open the link in a private window and on a phone, and check WhatsApp sharing.
