import React, { useState } from 'react';
import ImageModal from './ImageModal';

// This is a container component for the ImageModal component.
// It handles the state and logic for image selection and saving changes.
function ImageModalContainer({ show, handleClose, onImageSelect }) {
	// State for the currently selected image
	const [selectedImage, setSelectedImage] = useState(null);

	// Function to handle image selection
	// It updates the selectedImage state
	const handleImageSelection = (image) => {
		setSelectedImage(image);
	};

	// Function to handle saving changes
	// It calls the onImageSelect prop with the selected image and then closes the modal
	const handleSaveChanges = () => {
		onImageSelect(selectedImage);
		handleClose();
	};

	// Render the ImageModal component with the necessary props
	return (
		<ImageModal
			selectedImage={selectedImage}
			show={show}
			handleClose={handleClose}
			handleSaveChanges={handleSaveChanges}
			onImageSelect={handleImageSelection}
		/>
	);
}

export default ImageModalContainer;
