export async function onSubmitImages(files: FileList) {
	console.log('files', files);
	const formData = new FormData();
	for (let i = 0; i < files.length; i++) {
		formData.append('files', files[i]);
	}

	const response = await fetch('http://localhost:1337/api/upload', {
		method: 'POST',
		headers: {
			Authorization: `Bearer 09516513ce83a4d16c761207635e118c75f19ea89ce498d78902bc693f4f7050797586bd6f69b8a386c9282c5deef41ba00ee749ce77d448c6dd5acec3a70311133d55297f867355f879b2a0ec51f419e3041efc7db8be752819d93e8efcd833d94573b7781662f80ea18a2e5822bdb27ced6f99b2606aa5230c5209acb10e24`,
		},
		body: formData,
	});

	if (!response.ok) {
		console.error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	console.log(data);
}

export async function onSubmitVideo(file: File) {
	const formData = new FormData();
	formData.append('files', file);

	const response = await fetch('http://localhost:1337/api/upload', {
		method: 'POST',
		headers: {
			Authorization: `Bearer 09516513ce83a4d16c761207635e118c75f19ea89ce498d78902bc693f4f7050797586bd6f69b8a386c9282c5deef41ba00ee749ce77d448c6dd5acec3a70311133d55297f867355f879b2a0ec51f419e3041efc7db8be752819d93e8efcd833d94573b7781662f80ea18a2e5822bdb27ced6f99b2606aa5230c5209acb10e24`,
		},
		body: formData,
	});

	if (!response.ok) {
		console.error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	console.log(data);
}
