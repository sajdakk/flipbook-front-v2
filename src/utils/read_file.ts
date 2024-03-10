export const readFile = (file: Blob, format: 'data-url' | 'base64' = 'data-url') => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('load', (event) => {
			const result = event.target?.result;
			if (typeof result === 'string') {
				return resolve(result);
			}

			if (result instanceof ArrayBuffer) {
				const buffer = Buffer.from(result);
				const base64 = buffer.toString('base64');

				return resolve(base64);
			}

			reject(new Error('Unknown result type'));
		});
		reader.addEventListener('error', reject);

		switch (format) {
			case 'base64':
				reader.readAsArrayBuffer(file);
				break;

			case 'data-url':
				reader.readAsDataURL(file);
				break;
		}
	});
};
