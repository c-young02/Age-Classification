// This function handles the click event of the Run button
export function handleRunButtonClick(selectedImage) {
	// Prepare the data to be sent to the server
	let data = {
		image: selectedImage,
	};

	// Define the labels for the age groups
	const labels = ['0-2', '3-10', '11-17', '18-24', '25-39', '40-59', '60+'];

	// Send a POST request to the server with the selected image
	return fetch(`${process.env.REACT_APP_API_URL}/predict`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			// Get the label for the predicted age group
			const label = labels[data.prediction];
			return label;
		})
		.catch((error) => {
			// Log any errors
			console.error('Error:', error);
		});
}
