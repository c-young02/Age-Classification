import React, { useState } from 'react';
import Title from '../Title/Title';
import ButtonContainer from '../ButtonsContainer/ButtonsContainer';
import FaceImage from '../FaceImage/FaceImage';

function Start() {
	const title = 'Classify a Persons Age';
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageSelect = (image) => {
		console.log(image);
		setSelectedImage(image);
	};

	return (
		<>
			<Title pageTitle={title} />
			<FaceImage image={selectedImage} />

			<ButtonContainer
				button1="ImageModalLogic"
				button2="RunButton"
				onImageSelect={handleImageSelect}
			/>
		</>
	);
}

export default Start;
