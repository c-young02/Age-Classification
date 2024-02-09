import React from 'react';
import SelectableImage from './SelectableImage/SelectableImage';

// LoadImages component is responsible for displaying images for selection
function ImageSelectionGrid({ images, onImageClick, selectedImage }) {
	return (
		<div className="container">
			<div className="row">
				{/* Iterate over the images array and render each image in a ModalImage component */}
				{images.map((base64String) => (
					<div
						className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
						key={base64String}
					>
						<SelectableImage
							// Convert the base64 string to an image URL and pass it as a prop to ModalImage
							image={`data:image/png;base64,${base64String}`}
							// When the image is clicked, call onImageClick with the base64 string of the image
							onClick={() => onImageClick(base64String)}
							// If this image is the selected image, pass true for the isSelected prop, otherwise pass false
							isSelected={base64String === selectedImage}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ImageSelectionGrid;
