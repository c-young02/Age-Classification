import React, { useState } from 'react';
import Title from '../Title/Title';
import ButtonContainer from '../ButtonsContainer/ButtonsContainer';
import FaceImage from '../FaceImage/FaceImage';

function Start() {
	const title = 'Classify a Persons Age';
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageSelect = (image) => {
		setSelectedImage(image);
	};

	return (
		<>
			<Title pageTitle={title} />
			{selectedImage && (
				<FaceImage image={`data:image/png;base64,${selectedImage}`} />
			)}
			<ButtonContainer
				button1="ImageModalLogic"
				button2="RunButton"
				onImageSelect={handleImageSelect}
				selectedImage={selectedImage}
			/>
		</>
	);
}

export default Start;
