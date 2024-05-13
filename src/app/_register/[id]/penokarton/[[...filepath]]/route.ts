import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getFileUrl } from '@/app/_register/[id]/get-file';
import { getProjectSubmission } from '@/app/_register/form/service';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
	const id = parseInt(params.id);
	const projectSubmission = await getProjectSubmission(id);
	if (!projectSubmission) {
		notFound();
	}
	const penokarton = projectSubmission.files.penokarton;
	if (!penokarton) {
		return notFound();
	}
	const penokartonUrl = await getFileUrl(penokarton);
	return fetch(penokartonUrl);
}
