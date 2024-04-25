import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `${__dirname}/../storage`;
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const fileName = `file-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

export const uploadMiddleware = multer({ storage });
