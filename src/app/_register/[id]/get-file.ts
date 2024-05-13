import { env } from '@/../env.mjs';
import { s3Client } from '@/app/_integrations/s3Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export function getFileUrl(fileName: string) {
	return getSignedUrl(s3Client, new GetObjectCommand({ Bucket: `${env.S3_UPLOAD_BUCKET}`, Key: fileName }), {
		expiresIn: 3600,
	});
}
