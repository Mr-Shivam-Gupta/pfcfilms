# Deploy Admin Panel to Vercel

This guide explains how to deploy the PFC Films Admin Panel (Next.js) to Vercel.

> **Deploying website, admin panel, and backend?** See the main **[DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)** in the project root. It covers all three (Website + Admin on Vercel, Backend on Railway/Render) and the correct order.

---

## Prerequisites

- [Vercel account](https://vercel.com/signup) (free tier is enough)
- Your admin panel code in a **Git repository** (GitHub, GitLab, or Bitbucket)
- Your **backend API** already deployed and reachable (e.g. on Railway, Render, or your own server)
- `NEXT_PUBLIC_API_URL` set to your **production** API URL (e.g. `https://your-api.railway.app/api`)

---

## Step 1: Push Code to Git

If you haven’t already:

```bash
cd d:\pfcfilms
git add .
git commit -m "Admin panel ready for deployment"
git push origin main
```

---

## Step 2: Import Project in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New…** → **Project**.
3. **Import** your `pfcfilms` repository (connect GitHub/GitLab/Bitbucket if needed).
4. **Do not** change the project name unless you want to.

---

## Step 3: Configure Root Directory

The admin panel lives in the `admin-panel` folder, not the repo root.

1. In the import screen, find **Root Directory**.
2. Click **Edit**.
3. Set it to: **`admin-panel`**
4. Confirm.

Vercel will use `admin-panel` as the project root for build and output.

---

## Step 4: Build and Output Settings

Vercel usually detects Next.js automatically. You can leave:

- **Framework Preset:** Next.js
- **Build Command:** `next build` (or leave default)
- **Output Directory:** (leave default)
- **Install Command:** `npm install` (or leave default)

If you use a custom Node version, set **Node.js Version** (e.g. `20.x`).

---

## Step 5: Environment Variables

Add at least:

| Name                   | Value                          | Notes                                       |
|------------------------|--------------------------------|---------------------------------------------|
| `NEXT_PUBLIC_API_URL`  | `https://your-backend.com/api` | **Required.** Your production backend URL.  |

1. In the import screen, open **Environment Variables**.
2. Add:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://your-actual-backend.com/api` (no trailing slash)
   - **Environments:** Production, Preview, Development (or at least Production).

**Important:**  
- `NEXT_PUBLIC_*` is exposed to the browser; only put non-secret, public API base URLs here.  
- Use your **production** API base URL, not `http://localhost:5000`.

---

## Step 6: Deploy

1. Click **Deploy**.
2. Wait for the build to finish.
3. Vercel will give you a URL like:  
   `https://pfcfilms-admin-panel-xxx.vercel.app` or your custom domain.

---

## Step 7: Backend (CORS & URL)

Your backend must:

1. **Allow the Vercel admin URL in CORS**, e.g.:

   ```javascript
   // Example in Express (backend)
   const allowedOrigins = [
     'https://your-admin.vercel.app',
     'https://pfcfilms-admin-panel-xxx.vercel.app'
   ];
   app.use(cors({ origin: allowedOrigins, credentials: true }));
   ```

2. Be **publicly reachable** at the `NEXT_PUBLIC_API_URL` you set (HTTPS in production).

---

## Deploying via Vercel CLI (Alternative)

If you prefer the CLI:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **From the repo root, point to `admin-panel`:**
   ```bash
   cd d:\pfcfilms
   vercel
   ```

4. When asked:
   - **Set up and deploy?** Yes
   - **Which scope?** Your account
   - **Link to existing project?** No (first time) or Yes (later)
   - **Project name:** e.g. `pfcfilms-admin`
   - **In which directory is your code located?** `./admin-panel`

5. **Add env var:**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```
   Enter your production API URL when prompted (e.g. `https://your-api.com/api`).

6. **Deploy:**
   ```bash
   vercel --prod
   ```

For a project that’s already linked, you can also set the root in `vercel.json` in the repo root:

```json
{
  "buildCommand": "cd admin-panel && npm install && npm run build",
  "outputDirectory": "admin-panel/.next",
  "installCommand": "cd admin-panel && npm install"
}
```

A simpler approach is to run `vercel` from inside `admin-panel` so that the root is automatically correct:

```bash
cd d:\pfcfilms\admin-panel
vercel
```

Then add `NEXT_PUBLIC_API_URL` via `vercel env add` and run `vercel --prod`.

---

## Custom Domain (Optional)

1. In Vercel: **Project → Settings → Domains**.
2. Add a domain (e.g. `admin.pfcfilms.com`).
3. Follow Vercel’s DNS instructions (CNAME or A record).
4. Update your backend CORS to include this domain.

---

## Checklist Before Going Live

- [ ] Repo pushed to Git.
- [ ] Root Directory set to `admin-panel` in Vercel.
- [ ] `NEXT_PUBLIC_API_URL` set to production API URL (HTTPS).
- [ ] Backend CORS includes your Vercel admin URL (and custom domain if used).
- [ ] Backend is deployed and reachable at `NEXT_PUBLIC_API_URL`.
- [ ] You can log in and use the admin panel (e.g. uploads, fetching data).

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| Build fails | Root Directory = `admin-panel`; Node 18+; `npm install` and `npm run build` work locally in `admin-panel`. |
| "Network Error" / API calls fail | `NEXT_PUBLIC_API_URL` correct; backend is up; CORS allows your Vercel (and custom) domain. |
| 404 on routes | Next.js app router; no stray `basePath` in `next.config.ts` unless you intend it. |
| Upload or auth fails | Backend `/api/upload` and `/api/auth` routes accept requests from the admin origin; check `Authorization` and CORS. |

---

## Summary

1. Push code to Git.
2. Import the repo in Vercel.
3. Set **Root Directory** to `admin-panel`.
4. Add **`NEXT_PUBLIC_API_URL`** with your production API URL.
5. Deploy, then allow your Vercel (and custom) admin URL in backend CORS.

After that, your admin panel will be live on Vercel and will talk to your production backend.
