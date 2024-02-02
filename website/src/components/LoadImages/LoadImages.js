import React from 'react';
import ModalImage from '../ModalImage/ModalImage';
import useImages from '../useImages/useImages';

// LoadImages component is responsible for fetching and displaying images for selection
function LoadImages({ onImageClick, selectedImage }) {
	// useImages is a custom hook that fetches images and returns them along with any loading or error content
	const { images, content } = useImages();

	// If there's loading or error content, render it
	if (content) {
		return content;
	}

	// Function to handle when an image is clicked. It passes the base64 string of the image to the parent component
	const handleImageClick = (base64String) => {
		onImageClick(base64String);
	};

	return (
		<div className="container">
			<div className="row">
				{/* Iterate over the images array and render each image in a ModalImage component */}
				{images.map((base64String) => (
					<div
						className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
						key={base64String}
					>
						<ModalImage
							// Convert the base64 string to an image URL and pass it as a prop to ModalImage
							image={`data:image/png;base64,${base64String}`}
							// When the image is clicked, call handleImageClick with the base64 string of the image
							onClick={() => handleImageClick(base64String)}
							// If this image is the selected image, pass true for the isSelected prop, otherwise pass false
							isSelected={base64String === selectedImage}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default LoadImages;
