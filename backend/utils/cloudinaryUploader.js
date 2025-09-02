const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'architecture_portfolio' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return;
        // Extract public ID from URL
        const publicIdMatch = imageUrl.match(/architecture_portfolio\/([^/.]+)/);
        if (!publicIdMatch || !publicIdMatch[1]) {
            console.warn(`Could not extract public ID from ${imageUrl}`);
            return;
        }
        const publicId = `architecture_portfolio/${publicIdMatch[1]}`;
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
    }
};

module.exports = { streamUpload, deleteFromCloudinary };
