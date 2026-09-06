import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../config/env';
import { v4 as uuid } from 'uuid';

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: { accessKeyId: env.AWS_ACCESS_KEY, secretAccessKey: env.AWS_SECRET_KEY },
});

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadToS3 = async (file: Express.Multer.File, folder: string) => {
  const key = `${folder}/${uuid()}-${file.originalname}`;
  await s3.send(new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));
  return `https://${env.AWS_S3_BUCKET}.s3.ap-south-1.amazonaws.com/${key}`;
};
