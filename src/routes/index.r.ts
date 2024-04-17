import fs from 'fs';
import express from 'express';
const PATH_ROUTES = __dirname;
const router = express.Router();
import { removeExtension } from '../utils/files';

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const nameRouter = removeExtension(file);
  nameRouter !== 'index' && router.use(`/${nameRouter}`, require(`./${file}`));
});

export default router;
