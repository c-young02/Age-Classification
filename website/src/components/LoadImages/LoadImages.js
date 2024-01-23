import React from 'react';
import ModalImage from '../ModalImage/ModalImage';
import useImages from '../useImages/useImages';

// LoadImages component loads and displays images for selection
function LoadImages({ onImageClick, selectedImage }) {
	// Use the useImages hook to get the images and any loading or error content
	const { images, content } = useImages();

	// If loading or error content, display it
	if (content) {
		return content;
	}

	// Otherwise, display the images
	return (
		<div className="container">
			<div className="row">
				{/* Map over the images and display each one in a ModalImage component */}
				{images.map((base64String, index) => (
					<div
						className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
						key={index}
					>
						<ModalImage
							// Convert the base64 string to an image URL
							image={`data:image/png;base64,${base64String}`}
							// When the image is clicked, pass its base64 string to the parent component
							onClick={() => onImageClick(base64String)}
							// If this image is the selected image, pass true for the isSelected prop
							isSelected={base64String === selectedImage}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default LoadImages;
