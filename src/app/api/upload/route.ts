import { env } from '../../../../env.mjs';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req: NextRequest, res: NextResponse) {
	console.log('In req');

	const s3Client = new S3Client({
		region: 'auto',
		endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: env.S3_UPLOAD_KEY,
			secretAccessKey: env.S3_UPLOAD_SECRET,
		},
		forcePathStyle: true,
	});

	try {
		const formData = await req.formData();
		const files = formData.getAll('file') as File[];

		const response = await Promise.all(
			files.map(async (file) => {
				const Body = (await file.arrayBuffer()) as Buffer;
				s3Client.send(new PutObjectCommand({ Bucket: 'tuesfest-project-storage', Key: file.name, Body }));
			})
		);

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error uploading file', error);
		return new Response('Error uploading file', {
			status: 500,
		});
	}
}
