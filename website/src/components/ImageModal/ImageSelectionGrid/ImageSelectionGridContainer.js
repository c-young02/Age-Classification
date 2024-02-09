import React from 'react';
import useImages from '../../../Hooks/useImages';
import LoadImages from './ImageSelectionGrid ';

// LoadImagesContainer component is responsible for fetching and handling images
function LoadImagesContainer({ onImageClick, selectedImage }) {
	// useImages is a custom hook that fetches images and returns them along with any loading or error content
	const { images, content } = useImages();

	// Function to handle when an image is clicked. It passes the base64 string of the image to the parent component
	const handleImageClick = (base64String) => {
		onImageClick(base64String);
	};

	// If there's loading or error content, render it
	if (content) {
		return content;
	}

	return (
		<LoadImages
			images={images}
			onImageClick={handleImageClick}
			selectedImage={selectedImage}
		/>
	);
}

export default LoadImagesContainer;
