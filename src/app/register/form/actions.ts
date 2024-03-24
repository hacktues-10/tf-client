'use server';
import {
	S3Client,
	ListBucketsCommand,
	ListObjectsV2Command,
	GetObjectCommand,
	PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from '../../../../env.mjs';

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: `${env.S3_UPLOAD_KEY}`,
		secretAccessKey: `${env.S3_UPLOAD_SECRET}`,
	},
});

export const createPresignedUrl = async (key: string) => {
	return await getSignedUrl(S3, new PutObjectCommand({ Bucket: `${env.S3_UPLOAD_BUCKET}`, Key: key }), {
		expiresIn: 3600,
	});
};
