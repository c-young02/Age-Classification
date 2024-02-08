// This function handles the click event of the Run button
export async function handleRunButtonClick(selectedImage) {
	// Prepare the data to be sent to the server
	let data = {
		image: selectedImage,
	};

	// Define the labels for the age groups
	const labels = ['0-2', '3-10', '11-17', '18-24', '25-39', '40-59', '60+'];

	// Send a POST request to the server with the selected image
	const response = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(responseData.error);
	}

	// Get the label for the predicted age group
	const label = labels[responseData.prediction];
	return label;
}
