import React from 'react';
import UploadButton from './UploadButton';

// This is a container component for the UploadButton component.
// It handles the logic for uploading an image.
function UploadButtonContainer({ onImageSelect }) {
	// This function is called when a file is selected for upload.
	const handleImageUpload = (event) => {
		// Get the selected file.
		const file = event.target.files[0];
		// Create a new FileReader object.
		const reader = new FileReader();

		// This event listener is called when the file read operation is complete.
		reader.onloadend = () => {
			// Get the base64 string of the uploaded image.
			let base64Result = reader.result.split(',')[1];
			// Call the onImageSelect function passed as a prop with the base64 string.
			onImageSelect(base64Result);
		};

		// If a file was selected, read it as a data URL.
		if (file) {
			reader.readAsDataURL(file);
		} else {
			console.log('No file selected for upload.');
		}
	};

	// Render the UploadButton component and pass the handleImageUpload function as a prop.
	return <UploadButton onUpload={handleImageUpload} />;
}

export default UploadButtonContainer;
