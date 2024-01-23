import React, { useState } from 'react';
import ButtonContainer from '../ButtonsContainer/ButtonsContainer';
import FaceImage from '../FaceImage/FaceImage';
import AgeClassification from '../AgeClassification/AgeClassification';
import StartAgainButton from '../StartAgainButton/StartAgainButton';

// ImageClassification component handles the image selection and age classification process
function ImageClassification() {
	// State for the selected image and the classification label
	const [selectedImage, setSelectedImage] = useState(null);
	const [label, setLabel] = useState(null);

	// Handler for image selection
	const handleImageSelect = (image) => {
		setSelectedImage(image);
	};

	// Handler for receiving the classification label
	const handleLabelReceived = (newLabel) => {
		setLabel(newLabel);
	};

	// Reset the classification label
	const resetLabel = () => {
		setLabel(null);
	};

	// Reset the selected image
	const resetImage = () => {
		setSelectedImage(null);
	};

	return (
		<>
			{/* Display the selected image if it exists */}
			{selectedImage && (
				<FaceImage image={`data:image/png;base64,${selectedImage}`} />
			)}
			{/* Display the image selection and run buttons if no label has been received */}
			{!label && (
				<ButtonContainer
					button1="ImageModalLogic"
					button2="RunButton"
					onImageSelect={handleImageSelect}
					selectedImage={selectedImage}
					onLabelReceived={handleLabelReceived}
				/>
			)}
			{/* Display the age classification if a label has been received */}
			{label && <AgeClassification label={label} />}
			{label && (
				<StartAgainButton resetLabel={resetLabel} resetImage={resetImage} />
			)}
		</>
	);
}

export default ImageClassification;
