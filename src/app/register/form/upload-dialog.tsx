'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUploadContext } from '@/app/register/context/upload';
import { useEffect, useState } from 'react';
import invariant from 'tiny-invariant';
import { Loader2 } from 'lucide-react';
import { TbCheck, TbExclamationCircle, TbLoader2 } from 'react-icons/tb';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function UploadDialog() {
	const { uploadingCount, completedCount, errorCount, ongoingUploads, showDialog, hideDialog } = useUploadContext();
	const [autoOpen, setAutoOpen] = useState(true);

	const heading = resolveHeading({
		uploadingCount,
		completedCount,
		errorCount,
		totalCount: ongoingUploads.files.length,
	});

	const shouldBeShown = uploadingCount || errorCount;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (shouldBeShown && !ongoingUploads.isDialogOpen && autoOpen) {
				showDialog();
			}
		}, 3000);
		return () => clearTimeout(timeout);
	}, [uploadingCount, errorCount, ongoingUploads.isDialogOpen, showDialog, autoOpen]);

	return (
		<Dialog
			open={ongoingUploads.isDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					showDialog();
					setAutoOpen(true);
				} else {
					hideDialog();
					setAutoOpen(false);
				}
			}}
		>
			{shouldBeShown && (
				<DialogTrigger className="absolute bottom-0 right-0 p-4 cursor-pointer bg-[#5142FC] rounded-tl-lg text-white flex items-center gap-2">
					{/*<Loader2 className="animate-spin shrink-0" />*/}
					<OverlayIcon uploadingCount={uploadingCount} errorCount={errorCount} />
					{resolveOverlayText({
						uploadingCount,
						completedCount,
						errorCount,
						totalCount: ongoingUploads.files.length,
					})}
				</DialogTrigger>
			)}
			<DialogContent className="bg-white overflow-clip">
				<DialogHeader>
					<DialogTitle>{heading}</DialogTitle>
				</DialogHeader>
				<div className="min-w-0 space-y-4">
					{ongoingUploads.files.map((file) => (
						<div key={file.id}>
							<div
								className={cn(
									'flex items-center space-x-2',
									// FIXME: make tailwind config work
									// file.status === 'error' && 'text-destructive-foreground'
									file.status === 'error' && 'text-[red]'
								)}
							>
								<ProgressIcon status={file.status} />
								<div className="flex-1 overflow-clip">
									<p>{file.name}</p>
								</div>
							</div>
							<div
								className={cn(
									'flex gap-2 text-sm min-w-0',
									// FIXME: use actual color here wtf
									file.status === 'error' && 'text-[red]'
								)}
							>
								{file.status !== 'error' && <Progress className="flex-1" value={file.progress * 100} />}
								<p>
									{file.status === 'uploading'
										? `${(file.progress * 100).toFixed(2)}%`
										: file.status === 'error'
										? 'Качването не бе успешно'
										: 'Качено'}
								</p>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function ProgressIcon({ status }: { status: 'uploading' | 'complete' | 'error' }) {
	if (status === 'uploading') {
		return <TbLoader2 className="animate-spin shrink-0" />;
	}
	if (status === 'complete') {
		return <TbCheck className="shrink-0" />;
	}
	if (status === 'error') {
		return <TbExclamationCircle className="shrink-0" />;
	}
	invariant(false, 'Invalid status');
}

function OverlayIcon({ uploadingCount, errorCount }: { uploadingCount: number; errorCount: number }) {
	if (errorCount) {
		return <TbExclamationCircle className="shrink-0" />;
	}
	if (uploadingCount) {
		return <TbLoader2 className="animate-spin shrink-0" />;
	}
	return <TbCheck className="shrink-0" />;
}

function resolveHeading({
	uploadingCount,
	errorCount,
	totalCount,
}: {
	uploadingCount: number;
	completedCount: number;
	errorCount: number;
	totalCount: number;
}) {
	if (!errorCount && !uploadingCount) {
		return 'Качването завърши успешно!';
	}
	if (errorCount) {
		return 'Грешка при качването на файловете...';
	}
	const verb = uploadingCount === 1 ? 'Качва' : 'Качват';
	const noun = totalCount === 1 ? 'файл' : 'файла';
	if (totalCount === 1) {
		return `${verb} се ${uploadingCount} ${noun}...`;
	}
	return `${verb} се ${uploadingCount} от ${totalCount} ${noun}...`;
}

function resolveOverlayText(counts: {
	uploadingCount: number;
	completedCount: number;
	errorCount: number;
	totalCount: number;
}) {
	const message = resolveHeading(counts);
	if (message.toLowerCase().includes('грешка')) {
		return 'Грешка при качването';
	}
	return message;
}
