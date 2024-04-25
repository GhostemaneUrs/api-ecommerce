import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storageDirectory = path.join(__dirname, '../storage');

if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDirectory);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const fileName = `file-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

export const uploadMiddleware = multer({ storage });
