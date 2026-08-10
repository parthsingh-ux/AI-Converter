import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const routeName = req.baseUrl.split("/").pop() || "uploads";
    const folderPath = path.join(__dirname, "../uploads", routeName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, fileExtension);
    const fileName = `${baseName}-${timestamp}${fileExtension}`;
    req.originalFileBaseName = baseName;

    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExt =
      /jpeg|jpg|png|webp|gif|bmp|tiff|svg|mp4|avi|mov|mkv|wmv|flv|pdf|doc|docx|xls|xlsx|csv|txt|rtf/;
    const extname = allowedExt.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (extname || allowDcm) {
      return cb(null, true);
    }

    cb(new Error("Only supported file types are allowed!"), false);
  },
});

export default upload;
