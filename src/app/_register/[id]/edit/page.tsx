import { notFound } from 'next/navigation';
import EditForm from '@/app/_register/[id]/edit/_components/edit-form';
import UploadContextProvider from '@/app/_register/context/upload';
import UploadDialog from '@/app/_register/form/upload-dialog';

import { getProjectSubmission } from '../../form/service';

export default async function ProjectSubmissionEditPage({ params }: { params: { id: string } }) {
	const id = parseInt(params.id);
	const projectSubmission = await getProjectSubmission(id);
	if (!projectSubmission) {
		notFound();
	}
	return (
		<div className="flex min-h-screen w-full items-center justify-center self-center">
			<div className="z-30 m-5 mt-24 flex rounded-xl bg-black p-5">
				<UploadContextProvider>
					<UploadDialog />
					<EditForm projectSubmission={projectSubmission} />
				</UploadContextProvider>
			</div>
		</div>
	);
}
