import React from 'react';
import UploadButton from './UploadButton';

// UploadButtonContainer is a functional component that receives props and returns JSX.
// It handles the logic for uploading an image, including sanitizing the file name and checking the file type and size.
function UploadButtonContainer({ onImageSelect }) {
	// sanitizeFileName is a helper function that sanitizes the file name by replacing any character
	// that is not a letter, number, hyphen, underscore, or period with an underscore.
	const sanitizeFileName = (name) => {
		return name.replace(/[^a-z0-9\-_.]/gi, '_');
	};

	// handleImageUpload is a function that is called when a file is selected for upload.
	const handleImageUpload = (event) => {
		// Get the selected file.
		const file = event.target.files[0];

		// Check if a file was selected.
		if (!file) {
			alert('No file selected for upload.');
			return;
		}

		// Sanitize the file name.
		file.name = sanitizeFileName(file.name);

		// Check the file type.
		if (!file.type.startsWith('image/')) {
			alert('Selected file is not an image.');
			return;
		}

		// Check the file size (max 5MB).
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			alert('Selected file is too large.');
			return;
		}

		// Create a new FileReader object.
		const reader = new FileReader();

		// This event listener is called when the file read operation is complete.
		reader.onloadend = () => {
			// Get the base64 string of the uploaded image.
			let base64Result = reader.result.split(',')[1];
			// Call the onImageSelect function passed as a prop with the base64 string.
			onImageSelect(base64Result);
		};

		// Read the file as a data URL.
		reader.readAsDataURL(file);
	};

	// Render the UploadButton component and pass the handleImageUpload function as a prop.
	return <UploadButton onUpload={handleImageUpload} />;
}

export default UploadButtonContainer;
