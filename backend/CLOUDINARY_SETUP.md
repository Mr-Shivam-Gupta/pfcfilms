# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image storage in the PFC Films backend.

## Why Cloudinary?

Cloudinary provides:
- **CDN delivery** - Fast image delivery worldwide
- **Image transformations** - Resize, crop, optimize on-the-fly
- **Automatic optimization** - Reduces file sizes automatically
- **Free tier** - 25GB storage and 25GB bandwidth per month
- **Reliable storage** - No ephemeral storage issues

## Setup Steps

### 1. Create a Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click "Sign Up" (free account available)
3. Complete the registration process

### 2. Get Your Credentials

1. After logging in, go to your [Dashboard](https://cloudinary.com/console)
2. You'll see your account details including:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### 3. Configure Environment Variables

Add these to your `.env` file in the backend directory:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** Never commit your `.env` file to version control!

### 4. Restart Your Server

After adding the credentials, restart your backend server:

```bash
npm run dev
```

## How It Works

### Upload Priority

The system uses the following priority order:

1. **Cloudinary** (if configured) - Recommended for production
2. **Vercel Blob Storage** (if `BLOB_READ_WRITE_TOKEN` is set)
3. **Local Storage** (fallback for development)

### Image URLs

When images are uploaded to Cloudinary, you'll receive a full URL like:
```
https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/pfcfilms/images/filename.jpg
```

These URLs are:
- **CDN-optimized** - Fast delivery worldwide
- **Secure** - HTTPS by default
- **Transformable** - Can add transformations to the URL

### Image Transformations

You can add transformations to Cloudinary URLs for optimization:

```javascript
// Original URL
https://res.cloudinary.com/cloud/image/upload/pfcfilms/images/photo.jpg

// With transformations (add before /upload/)
https://res.cloudinary.com/cloud/image/upload/w_500,h_500,c_fill,q_auto/pfcfilms/images/photo.jpg
```

Common transformations:
- `w_500` - Width 500px
- `h_500` - Height 500px
- `c_fill` - Crop to fill
- `q_auto` - Auto quality optimization
- `f_auto` - Auto format (WebP when supported)

## Testing

After setup, test the upload:

1. Go to your admin panel
2. Try uploading an image (e.g., in Productions)
3. Check the response - it should contain a Cloudinary URL
4. Verify the image loads correctly

## Troubleshooting

### Images not uploading to Cloudinary

1. Check your `.env` file has all three credentials
2. Verify credentials are correct (no extra spaces)
3. Check server logs for error messages
4. Ensure you have internet connectivity

### Images not displaying

1. Verify the URL is a valid Cloudinary URL
2. Check if the image exists in your Cloudinary dashboard
3. Verify CORS settings if accessing from different domains

### Free Tier Limits

- **Storage:** 25GB
- **Bandwidth:** 25GB/month
- **Transformations:** 25,000/month

If you exceed limits, consider upgrading or optimizing image sizes.

## Migration from Local Storage

If you have existing images in local storage:

1. Images will continue to work (local URLs are still supported)
2. New uploads will go to Cloudinary
3. You can manually migrate old images if needed

## Security Best Practices

1. **Never expose API Secret** - Keep it in `.env` only
2. **Use signed URLs** - For private images (if needed)
3. **Set up upload presets** - Control allowed formats/sizes
4. **Monitor usage** - Check dashboard regularly

## Support

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Support](https://support.cloudinary.com)
- [Node.js SDK Docs](https://cloudinary.com/documentation/node_integration)
