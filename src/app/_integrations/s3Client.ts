import { S3Client } from '@aws-sdk/client-s3';
import { env } from '../../../env.mjs';

export const s3Client = new S3Client({
	region: 'auto',
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: `${env.S3_UPLOAD_KEY}`,
		secretAccessKey: `${env.S3_UPLOAD_SECRET}`,
	},
});

