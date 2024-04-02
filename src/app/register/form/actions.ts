'use server';

import { s3Client } from '@/app/_integrations/s3Client';
import {
	GetObjectCommand,
	ListBucketsCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from '../../../../env.mjs';

export const createPresignedUrl = async (key: string) => {
	return await getSignedUrl(s3Client, new PutObjectCommand({ Bucket: `${env.S3_UPLOAD_BUCKET}`, Key: key }), {
		expiresIn: 3600,
	});
};
