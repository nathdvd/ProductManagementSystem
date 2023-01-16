import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "productImages"
    }
});

const upload = multer({ storage: storage }).single('product-img');

export { upload };