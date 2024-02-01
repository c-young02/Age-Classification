import React, { useState } from 'react';
import ButtonContainer from '../ButtonsContainer/ButtonsContainer';
import FaceImage from '../FaceImage/FaceImage';
import AgeClassification from '../AgeClassification/AgeClassification';
import StartAgainButton from '../StartAgainButton/StartAgainButton';
import Loading from '../Loading/Loading';

// ImageClassification component handles the image selection and age classification process
function ImageClassification() {
	// State for the selected image and the classification label
	const [selectedImage, setSelectedImage] = useState(null);
	const [label, setLabel] = useState(null);
	const [classifying, setClassifying] = useState(false);

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
			{selectedImage && (
				<FaceImage image={`data:image/png;base64,${selectedImage}`} />
			)}
			{classifying ? (
				<div className="text-center h2">
					<Loading message="Classifying" />
				</div>
			) : (
				<>
					{!label && (
						<ButtonContainer
							button1="ImageModalLogic"
							button2="RunButton"
							onImageSelect={handleImageSelect}
							selectedImage={selectedImage}
							onLabelReceived={handleLabelReceived}
							setClassifying={setClassifying}
						/>
					)}
					{label && <AgeClassification label={label} />}
					{label && (
						<StartAgainButton resetLabel={resetLabel} resetImage={resetImage} />
					)}
				</>
			)}
		</>
	);
}

export default ImageClassification;
