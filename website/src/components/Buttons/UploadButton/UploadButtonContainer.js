import React from 'react';
import UploadButton from './UploadButton';

// This component handles the image upload functionality.
function UploadButtonContainer({ onImageSelect }) {
	// This function is triggered when a file is selected for upload.
	const handleImageUpload = (event) => {
		// Get the first file from the list of selected files.
		const file = event.target.files[0];

		// If no file was selected, show an alert and stop execution.
		if (!file) {
			alert('No file selected for upload.');
			return;
		}

		// If the selected file is not an image, show an alert and stop execution.
		if (!file.type.startsWith('image/')) {
			alert('Selected file is not an image.');
			return;
		}

		// Define the maximum file size (5MB in this case).
		const maxSize = 5 * 1024 * 1024; // 5MB

		// If the selected file is larger than the maximum size, show an alert and stop execution.
		if (file.size > maxSize) {
			alert('Selected file is too large.');
			return;
		}

		// Create a new FileReader object to read the contents of the file.
		const reader = new FileReader();

		// This event listener is triggered when the file read operation is complete.
		reader.onloadend = () => {
			// Get the base64 string of the uploaded image.
			let base64Result = reader.result.split(',')[1];

			// Call the onImageSelect function passed as a prop with the base64 string.
			onImageSelect(base64Result);
		};

		// Start reading the file as a data URL.
		reader.readAsDataURL(file);
	};

	// Render the UploadButton component and pass the handleImageUpload function as a prop.
	return <UploadButton onUpload={handleImageUpload} />;
}

// Export the UploadButtonContainer component.
export default UploadButtonContainer;
