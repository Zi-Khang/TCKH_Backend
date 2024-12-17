import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cấu hình Multer và CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    
    const extension = file.originalname.split('.').pop()?.toLowerCase() || 'unknown';
    
    return {
      folder: 'Article',
      resource_type: 'raw', 
      format: extension,
      allowedFormats: ['jpeg', 'png', 'jpg', 'mp3', 'docx', 'pdf'],
      public_id: `${file.fieldname}-${Date.now()}`,
    };
  },
});

const upload = multer({ storage });

export default upload;