const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {Buffer} buffer - Image buffer
 * @param {string} folder - Folder path in Cloudinary (optional)
 * @param {Object} options - Additional Cloudinary options
 * @returns {Promise<Object>} Upload result with secure_url
 */
async function uploadToCloudinary(buffer, folder = 'pfcfilms', options = {}) {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: folder,
      resource_type: 'auto',
      ...options,
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
      .end(buffer);
  });
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image (can be full URL or just public_id)
 * @returns {Promise<Object>} Deletion result
 */
async function deleteFromCloudinary(publicId) {
  try {
    // Extract public_id from URL if full URL is provided
    let actualPublicId = publicId;
    if (publicId.includes('cloudinary.com')) {
      // Extract public_id from Cloudinary URL
      const urlParts = publicId.split('/');
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        // Get the path after version number
        const pathAfterVersion = urlParts.slice(uploadIndex + 2).join('/');
        actualPublicId = pathAfterVersion.split('.')[0]; // Remove extension
      }
    }

    const result = await cloudinary.uploader.destroy(actualPublicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

/**
 * Get Cloudinary URL from public_id or existing URL
 * @param {string} identifier - Public ID or existing Cloudinary URL
 * @param {Object} options - Transformation options
 * @returns {string} Cloudinary URL
 */
function getCloudinaryUrl(identifier, options = {}) {
  // If it's already a Cloudinary URL, return it
  if (identifier && identifier.includes('cloudinary.com')) {
    return identifier;
  }

  // If it's a public_id, generate URL
  if (identifier) {
    return cloudinary.url(identifier, {
      secure: true,
      ...options,
    });
  }

  return null;
}

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
  getCloudinaryUrl,
};
