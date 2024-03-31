import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getFileUrl } from '@/app/register/[id]/get-file';
import { getProjectSubmission } from '@/app/register/form/service';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
	const id = parseInt(params.id);
	const projectSubmission = await getProjectSubmission(id);
	if (!projectSubmission) {
		notFound();
	}
	const video = projectSubmission.files.video;
	if (!video) {
		return notFound();
	}
	const videoUrl = await getFileUrl(video);
	return fetch(videoUrl);
}
