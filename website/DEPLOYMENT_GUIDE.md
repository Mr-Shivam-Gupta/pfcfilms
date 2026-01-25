# Deploy PFC Films: Website, Admin Panel & Backend

This guide covers deploying all three parts of the PFC Films project:

| App | Tech | Where to deploy |
|-----|------|-----------------|
| **Website** | Next.js (root) | Vercel |
| **Admin Panel** | Next.js (`admin-panel/`) | Vercel |
| **Backend** | Express + MongoDB + Multer | Railway or Render |

---

## Deployment order

1. **Backend first** (website and admin need its API URL).
2. **MongoDB Atlas** (backend needs a cloud database).
3. **Website** on Vercel.
4. **Admin Panel** on Vercel (separate project).

---

# Part 1: Backend (Railway or Render)

The backend is an Express app with MongoDB and file uploads. Vercel is for serverless/static; use **Railway** or **Render** for a long‑running Node server.

## 1.1 MongoDB Atlas (required)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a **Cluster** (e.g. M0 free tier).
3. **Database Access** → Add user (username + password). Note the password.
4. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere) for Railway/Render.
5. **Connect** → **Drivers** → copy the connection string, e.g.:
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/pfcfilms?retryWrites=true&w=majority
   ```
   Replace `USER`, `PASSWORD`, and optionally the DB name `pfcfilms`. This is your **`MONGODB_URI`**.

---

## 1.2 Deploy backend on Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub.
2. **New Project** → **Deploy from GitHub** → select your `pfcfilms` repo.
3. Railway may detect the root. Click the service → **Settings** → **Root Directory** → set **`backend`**.
4. **Variables** (or **Settings → Variables**):
   - `MONGODB_URI` = your Atlas URI
   - `JWT_SECRET` = long random string (e.g. from `openssl rand -hex 32`)
   - `NODE_ENV` = `production`
5. **Settings** → **Deploy**:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (runs `node server.js`)
6. **Deploy**. After deploy, go to **Settings** → **Networking** → **Generate Domain**. You’ll get a URL like `https://pfcfilms-backend-production.up.railway.app`.
7. Your **API base URL** is: `https://your-railway-domain.up.railway.app` (no `/api`). The app serves `/api/...` and `/uploads/...` on that domain.

### File uploads on Railway

- **Default:** Files are stored in `backend/uploads/images`. On Railway, the filesystem is **ephemeral** (uploads can be lost on redeploy/restart).
- **Persistent uploads:** Use **Railway Volumes** (paid) or switch to **cloud storage** (e.g. AWS S3, Cloudinary) and change the upload middleware. For a first deploy, the default is fine; plan S3/Cloudinary later if you need durable images.

---

## 1.3 Deploy backend on Render (alternative)

1. Go to [render.com](https://render.com) and sign in with GitHub.
2. **New** → **Web Service** → connect `pfcfilms` repo.
3. **Root Directory:** `backend`.
4. **Environment:** Node.
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. **Environment Variables:**
   - `MONGODB_URI` = Atlas URI
   - `JWT_SECRET` = strong random string
   - `NODE_ENV` = `production`
8. **Create Web Service**. Render will assign a URL like `https://pfcfilms-backend.onrender.com`. That is your **API base URL**.

**Uploads on Render:** The disk is ephemeral; uploads are lost on restart. For production, use S3/Cloudinary (or Railway with a volume).

---

## 1.4 CORS (backend)

Your backend uses `app.use(cors())`, so it accepts any origin. For production you can restrict it. In `backend/server.js`, before other `app.use`:

```javascript
// Optional: restrict to your frontends (server.js)
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);
if (allowedOrigins.length) {
  app.use(cors({ origin: allowedOrigins, credentials: true }));
} else {
  app.use(cors());
}
```

Then set in Railway/Render:

```env
CORS_ORIGIN=https://your-website.vercel.app,https://your-admin.vercel.app
```

(Add your real Vercel URLs after you deploy the website and admin.)

---

## 1.5 Backend env summary

| Variable | Required | Example |
|----------|----------|---------|
| `MONGODB_URI` | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/pfcfilms?...` |
| `JWT_SECRET` | Yes | Long random string |
| `NODE_ENV` | Recommended | `production` |
| `CORS_ORIGIN` | Optional | `https://site.vercel.app,https://admin.vercel.app` |
| `PORT` | No | Set by Railway/Render |

**API base URL for frontends:**  
`https://your-backend.onrender.com` or `https://your-backend.up.railway.app`  
The website and admin will use: `https://your-backend.../api` as `NEXT_PUBLIC_API_URL`.

---

# Part 2: Website (Vercel)

The main site is in the **repo root** (Next.js).

## 2.1 Deploy on Vercel

1. [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import the `pfcfilms` repo.
3. **Root Directory:** leave **empty** (or `.`) so the root `package.json` and `app/` are used.
4. **Framework Preset:** Next.js (auto).
5. **Environment Variables:**

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_API_URL` | `https://your-backend-url/api` |

   Use the **exact** backend base URL + `/api` (e.g. `https://pfcfilms-backend.onrender.com/api`).

6. **Deploy**. You’ll get something like `https://pfcfilms.vercel.app`.

---

## 2.2 Custom domain (optional)

**Project → Settings → Domains** → add e.g. `www.pfcfilms.com` and follow DNS instructions.

---

# Part 3: Admin Panel (Vercel)

The admin app is in **`admin-panel/`**. Deploy it as a **second** Vercel project.

## 3.1 Deploy on Vercel

1. **Add New** → **Project**.
2. Import the **same** `pfcfilms` repo again (or use the same connected Git).
3. **Root Directory:** **`admin-panel`** (required).
4. **Framework Preset:** Next.js.
5. **Environment Variables:**

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_API_URL` | `https://your-backend-url/api` |

   Same as the website: your backend base + `/api`.

6. **Deploy**. You’ll get e.g. `https://pfcfilms-admin.vercel.app`.

---

## 3.2 Custom domain (optional)

**Project → Settings → Domains** → e.g. `admin.pfcfilms.com`.  
If you add `CORS_ORIGIN` on the backend, include this domain.

---

# Part 4: Connect everything

## URLs

After deployment you should have:

| Role | Example URL |
|------|-------------|
| Backend API | `https://pfcfilms-backend.onrender.com` |
| Website | `https://pfcfilms.vercel.app` |
| Admin | `https://pfcfilms-admin.vercel.app` |

## Env and CORS

1. **Backend (Railway/Render)**  
   - `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`  
   - Optional: `CORS_ORIGIN=https://pfcfilms.vercel.app,https://pfcfilms-admin.vercel.app` (and custom domains if you add them).

2. **Website (Vercel)**  
   - `NEXT_PUBLIC_API_URL=https://your-backend-url/api`

3. **Admin (Vercel)**  
   - `NEXT_PUBLIC_API_URL=https://your-backend-url/api`

---

# Checklist

## Backend

- [ ] MongoDB Atlas cluster, user, and `MONGODB_URI`
- [ ] Backend on Railway or Render with Root Directory `backend`
- [ ] `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV` set
- [ ] Public URL works: `https://your-backend/api/health` returns `{"status":"OK"...}`
- [ ] (Optional) `CORS_ORIGIN` with website + admin URLs

## Website

- [ ] Vercel project, Root Directory = repo root (empty)
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend/api`
- [ ] Homepage loads and fetches data from API

## Admin

- [ ] Second Vercel project, Root Directory = `admin-panel`
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend/api`
- [ ] Login works; can load and edit data
- [ ] (Optional) Upload works; if not, consider S3/Cloudinary for backend

---

# Quick reference

## Vercel (Website)

- **Root:** default (repo root)
- **Env:** `NEXT_PUBLIC_API_URL` = `https://<backend>/api`

## Vercel (Admin)

- **Root:** `admin-panel`
- **Env:** `NEXT_PUBLIC_API_URL` = `https://<backend>/api`

## Railway / Render (Backend)

- **Root:** `backend`
- **Start:** `npm start`
- **Env:** `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`; optional `CORS_ORIGIN`

---

# Troubleshooting

| Issue | Check |
|-------|--------|
| Website/Admin: "Network Error" or no data | `NEXT_PUBLIC_API_URL` correct; backend is up; `https://<backend>/api/health` returns OK. |
| CORS errors in browser | Backend `cors()` allows your Vercel (and custom) origins; if using `CORS_ORIGIN`, it includes all frontend URLs. |
| Admin login fails | Backend `/api/auth` reachable; `JWT_SECRET` set; admin user exists (run `node seed.js` once against production DB if needed, or create via a script). |
| Upload works then images disappear | Expected on Railway/Render without a volume or S3; plan S3/Cloudinary for persistent uploads. |
| Build fails (Website) | Root = default; `npm run build` works in repo root. |
| Build fails (Admin) | Root = `admin-panel`; `npm run build` works inside `admin-panel`. |
| Build fails (Backend) | Root = `backend`; `npm install` and `npm start` work in `backend`. |

---

# Optional: Vercel CLI for Website and Admin

```bash
# Website (from repo root)
cd d:\pfcfilms
vercel
# Set NEXT_PUBLIC_API_URL via vercel env add

# Admin (from admin-panel)
cd d:\pfcfilms\admin-panel
vercel
# Set NEXT_PUBLIC_API_URL via vercel env add
```

Backend is still deployed via Railway or Render, not Vercel.
