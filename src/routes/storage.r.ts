import express from 'express';
import { uploadFile } from '../controllers/storage';
import { uploadMiddleware } from '../middleware/storage';

const router = express.Router();

router.post('/', uploadMiddleware.single('file'), uploadFile);

module.exports = router;
