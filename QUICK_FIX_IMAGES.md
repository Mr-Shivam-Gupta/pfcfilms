# Quick Fix for Missing Images on Vercel

## The Problem
Images uploaded to Vercel are stored in `/tmp` which is **ephemeral** (temporary). These files get deleted when:
- The server restarts
- You redeploy
- The function times out

This is why you're seeing green placeholders or missing images.

## The Solution: Vercel Blob Storage

### Step 1: Create Blob Storage (5 minutes)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your backend project** (pfcfilms-backend)
3. **Click "Storage" tab** (in the left sidebar)
4. **Click "Create Database"** or **"Add Storage"**
5. **Select "Blob"**
6. **Name it**: `pfcfilms-images` (or any name)
7. **Click "Create"**

Vercel will automatically create the `BLOB_READ_WRITE_TOKEN` environment variable.

### Step 2: Install Package & Deploy

```bash
cd backend
npm install
git add .
git commit -m "Add Vercel Blob Storage support"
git push
```

### Step 3: Re-upload Images

After deployment:

1. **Go to your admin panel**
2. **For each item with a missing image:**
   - Click "Edit"
   - Click "Upload Image" or "Change Image"
   - Select the same image file
   - Save

3. **New uploads will:**
   - Be stored in Blob Storage permanently
   - Get a full URL like: `https://xxx.public.blob.vercel-storage.com/...`
   - Never be deleted

### Step 4: Verify

After re-uploading, check your database. Image paths should look like:
```
https://xxx.public.blob.vercel-storage.com/images/1769518416008-WhatsApp-Image-2026-01-25-at-21.44.29.jpeg
```

Instead of:
```
/uploads/images/1769518416008-WhatsApp-Image-2026-01-25-at-21.44.29.jpeg
```

## Why This Happens

- **Local Development**: Images save to `backend/uploads/` folder (persistent)
- **Vercel Production**: Images save to `/tmp` folder (ephemeral - gets deleted)
- **With Blob Storage**: Images save to Vercel Blob (permanent cloud storage)

## Need Help?

If you're stuck:
1. Check that `BLOB_READ_WRITE_TOKEN` exists in Vercel → Settings → Environment Variables
2. Make sure you've run `npm install` in the backend folder
3. Check the backend logs in Vercel for any errors
