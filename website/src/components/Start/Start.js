import React, { useState } from 'react';
import Title from '../Title/Title';
import ButtonContainer from '../ButtonsContainer/ButtonsContainer';
import FaceImage from '../FaceImage/FaceImage';
import AgeClassification from '../AgeClassification/AgeClassification';
import StartAgainButton from '../StartAgainButton/StartAgainButton';

function Start() {
	const title = 'Classify a Persons Age';
	const [selectedImage, setSelectedImage] = useState(null);
	const [label, setLabel] = useState(null);

	const handleImageSelect = (image) => {
		setSelectedImage(image);
	};

	const handleLabelReceived = (newLabel) => {
		setLabel(newLabel);
	};

	const resetLabel = () => {
		setLabel(null);
	};

	const resetImage = () => {
		setSelectedImage(null);
	};

	return (
		<>
			<Title pageTitle={title} />
			{selectedImage && (
				<FaceImage image={`data:image/png;base64,${selectedImage}`} />
			)}
			{!label && (
				<ButtonContainer
					button1="ImageModalLogic"
					button2="RunButton"
					onImageSelect={handleImageSelect}
					selectedImage={selectedImage}
					onLabelReceived={handleLabelReceived}
				/>
			)}
			{label && <AgeClassification label={label} />}
			{label && (
				<StartAgainButton resetLabel={resetLabel} resetImage={resetImage} />
			)}
		</>
	);
}

export default Start;
