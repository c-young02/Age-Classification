export function handleRunButtonClick(selectedImage) {
	let data = {
		image: selectedImage,
	};

	const labels = ['0-2', '3-10', '11-17', '18-24', '25-40', '40-60', '60+'];

	return fetch('http://localhost:8000/predict', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			const label = labels[data.prediction];
			return label;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}
