# Vercel Blob Storage Setup Guide

## Problem
On Vercel, the filesystem is ephemeral. Images uploaded to `/tmp` get deleted when the serverless function restarts or redeploys. This causes uploaded images to disappear.

## Solution
Use Vercel Blob Storage for persistent image storage.

## Setup Steps

### 1. Create a Blob Store in Vercel
1. Go to your Vercel project dashboard
2. Navigate to the **Storage** tab
3. Click **Create Database** or **Add Storage**
4. Select **Blob** storage
5. Give it a name (e.g., "pfcfilms-images")
6. Vercel will automatically create a `BLOB_READ_WRITE_TOKEN` environment variable

### 2. Add Environment Variable
The `BLOB_READ_WRITE_TOKEN` should be automatically added to your Vercel project. Verify it's set:
- Go to **Settings** → **Environment Variables**
- Ensure `BLOB_READ_WRITE_TOKEN` is present

### 3. For Local Development (Optional)
If you want to test Blob Storage locally:
```bash
# Pull environment variables from Vercel
vercel env pull
```

Or manually add to your `.env` file:
```
BLOB_READ_WRITE_TOKEN=your_token_here
```

### 4. Deploy
After setting up Blob Storage:
1. Push your code to GitHub
2. Vercel will automatically redeploy
3. New image uploads will be stored in Blob Storage permanently

## How It Works

- **Development (no BLOB_READ_WRITE_TOKEN)**: Images are saved to local `uploads/` folder
- **Production (with BLOB_READ_WRITE_TOKEN)**: Images are uploaded to Vercel Blob Storage and return full URLs

## Important Notes

- **Existing images**: Images already uploaded to `/tmp` will be lost. You'll need to re-upload them after setting up Blob Storage.
- **Image URLs**: Blob Storage returns full URLs (e.g., `https://xxx.public.blob.vercel-storage.com/...`), which are automatically handled by the `imageUrl()` function.
- **File size limit**: 5MB per image (can be adjusted in `backend/middleware/upload.js`)

## Troubleshooting

If images still show as default:
1. Check that `BLOB_READ_WRITE_TOKEN` is set in Vercel environment variables
2. Verify the backend is deployed and running
3. Check browser console for image loading errors
4. Ensure `NEXT_PUBLIC_API_URL` points to your deployed backend URL
