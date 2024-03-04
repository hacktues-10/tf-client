'use server';
import { S3Client } from '@aws-sdk/client-s3';
import { env } from '../../../../env.mjs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.S3_UPLOAD_KEY as string,
		secretAccessKey: env.S3_UPLOAD_SECRET as string,
	},
});

export async function getPreSignedUrl({ name }: { name: string }) {
	const signedUrl = await getSignedUrl(
		S3,
		new PutObjectCommand({
			Bucket: env.S3_UPLOAD_BUCKET,
			Key: name,
		}),
		{ expiresIn: 60 }
	);

	return signedUrl;
}
