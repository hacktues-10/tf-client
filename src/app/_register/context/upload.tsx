'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPresignedUrl } from '@/app/_register/form/actions';

export interface OngoingUploads {
	files: {
		id: string;
		name: string;
		progress: number;
		fileSize: number;
		status: 'uploading' | 'complete' | 'error';
		startedAt: number;
	}[];
	isDialogOpen: boolean;
}

const UploadContext = createContext(
	{} as {
		ongoingUploads: OngoingUploads;
		addUpload: (file: File, originalName?: string) => Promise<void>;
		showDialog: () => void;
		hideDialog: () => void;
		isComplete: () => boolean;
		hasErrors: () => boolean;
		uploadingCount: number;
		completedCount: number;
		errorCount: number;
		clearCompleted: () => void;
	}
);

function UploadContextProvider({ children }: { children: React.ReactNode }) {
	const [subscribes, setSubscribes] = useState<(() => () => void)[]>([]);
	const [ongoingUploads, setOngoingUploads] = useState<OngoingUploads>({
		files: [],
		isDialogOpen: false,
	});

	function updateOngoingUpload(id: string, newUpload: Partial<OngoingUploads['files'][number]>) {
		setOngoingUploads((prev) => ({
			...prev,
			files: prev.files.map((f) => (f.id === id ? { ...f, ...newUpload } : f)),
		}));
	}

	const addUpload = useCallback((file: File, originalName?: string) => {
		const name = originalName ?? file.name;

		const id = crypto.randomUUID();

		setOngoingUploads((prev) => ({
			...prev,
			files: [
				...prev.files,
				{
					id,
					name,
					status: 'uploading',
					progress: 0,
					isError: false,
					startedAt: Date.now(),
					fileSize: file.size,
				},
			],
		}));

		const { subscribe, promise } = uploadFile(file, {
			onProgress: (progress) => updateOngoingUpload(id, { progress }),
			onComplete: () => updateOngoingUpload(id, { status: 'complete' }),
			onError: () => updateOngoingUpload(id, { status: 'error' }),
		});
		setSubscribes((prev) => [...prev, subscribe]);
		return promise;
	}, []);

	const showDialog = useCallback(() => setOngoingUploads((prev) => ({ ...prev, isDialogOpen: true })), []);

	const hideDialog = useCallback(() => setOngoingUploads((prev) => ({ ...prev, isDialogOpen: false })), []);
	const isComplete = useCallback(() => ongoingUploads.files.every((f) => f.status === 'complete'), [ongoingUploads]);
	const hasErrors = useCallback(() => ongoingUploads.files.some((f) => f.status === 'error'), [ongoingUploads]);
	const uploadingCount = ongoingUploads.files.filter((f) => f.status === 'uploading').length;
	const completedCount = ongoingUploads.files.filter((f) => f.status === 'complete').length;
	const errorCount = ongoingUploads.files.filter((f) => f.status === 'error').length;
	const clearCompleted = useCallback(() => {
		setOngoingUploads((prev) => ({
			...prev,
			files: prev.files.filter((f) => f.status !== 'complete'),
		}));
	}, []);

	useEffect(() => {
		const unsubscribes = subscribes.map((s) => s());
		return () => {
			unsubscribes.forEach((u) => u());
		};
	}, [subscribes]);

	return (
		<UploadContext.Provider
			value={{
				ongoingUploads,
				addUpload,
				showDialog,
				hideDialog,
				isComplete,
				hasErrors,
				uploadingCount,
				completedCount,
				errorCount,
				clearCompleted,
			}}
		>
			{children}
		</UploadContext.Provider>
	);
}

type UploadFileOptions = {
	onProgress: (progress: number) => void;
	onComplete: () => void;
	onError: () => void;
};

function uploadFile(file: File, options: UploadFileOptions) {
	const xhr = new XMLHttpRequest();
	const subscribe = () => {
		const handleProgress = (e: ProgressEvent) => {
			if (e.lengthComputable) {
				options.onProgress(e.loaded / e.total);
			}
		};
		xhr.upload.addEventListener('progress', handleProgress);

		const handleLoad = () => {
			if (xhr.status === 200) {
				options.onProgress(1);
				options.onComplete();
			} else {
				options.onProgress(0);
				options.onError();
			}
		};
		xhr.addEventListener('load', handleLoad);
		xhr.addEventListener('error', options.onError);

		return () => {
			xhr.upload.removeEventListener('progress', handleProgress);
			xhr.removeEventListener('load', handleLoad);
			xhr.removeEventListener('error', options.onError);
		};
	};

	const promise = new Promise<void>(async (resolve, reject) => {
		xhr.addEventListener('load', () => {
			if (xhr.status === 200) {
				resolve();
			}
			reject();
		});

		xhr.addEventListener('error', () => {
			reject();
		});

		const presignedUrl = await createPresignedUrl(file.name);
		xhr.open('PUT', presignedUrl);
		xhr.send(file);
	});

	return {
		subscribe,
		promise,
	};
}

export const useUploadContext = () => useContext(UploadContext);
export default UploadContextProvider;
