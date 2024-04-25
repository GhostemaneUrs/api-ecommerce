import fs from 'fs';
import Cloudinary from '../config/cloudinary';
import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../utils/response';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      responseError(res, 'Failed to upload file', 'No file uploaded.', 400);
      return;
    }

    const uploader = Cloudinary.getInstance().getUploader();
    const { secure_url } = await uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);

    responseSuccess(
      res,
      'File uploaded successfully',
      {
        url: secure_url,
      },
      201
    );
  } catch (error) {
    console.error('Upload error:', error);
    responseError(res, 'Failed to upload file', `${error}`);
  }
};
