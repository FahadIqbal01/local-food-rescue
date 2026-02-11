import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => {
    return {
      folder: "profile-pictures",
      allowed_formats: ["png", "jpg", "jpeg"],
      transformation: [{ width: 300, height: 300, crop: "fill" }],
    };
  },
});

const upload = multer({ storage: storage });

export default upload;
