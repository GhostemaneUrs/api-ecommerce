import 'dotenv/config';
import 'reflect-metadata';
import { v2 as cloudinary } from 'cloudinary';

class Cloudinary {
  private static instance: Cloudinary;

  private constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  public static getInstance(): Cloudinary {
    if (!Cloudinary.instance) {
      Cloudinary.instance = new Cloudinary();
    }
    return Cloudinary.instance;
  }

  public getUploader() {
    return cloudinary.uploader;
  }
}

module.exports = Cloudinary;
