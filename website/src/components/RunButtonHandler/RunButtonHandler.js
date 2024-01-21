// RunButtonHandler.js

export function handleRunButtonClick(selectedImage) {
	let data = {
		image: selectedImage,
	};

	fetch('http://localhost:8000/predict', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Prediction:', data.prediction);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}
