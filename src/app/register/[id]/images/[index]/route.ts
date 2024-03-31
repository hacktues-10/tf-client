import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getFileUrl } from '@/app/register/[id]/get-file';
import { getProjectSubmission } from '@/app/register/form/service';

export async function GET(_req: NextRequest, { params }: { params: { id: string; index: string } }) {
	const id = parseInt(params.id);
	const index = parseInt(params.index);
	const projectSubmission = await getProjectSubmission(id);
	if (!projectSubmission) {
		notFound();
	}
	const image = projectSubmission.files.images[index];
	if (!image) {
		return notFound();
	}
	const imageUrl = await getFileUrl(image);
	return fetch(imageUrl);
}
