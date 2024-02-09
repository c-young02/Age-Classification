import React, { useState } from 'react';
import ImageClassification from './ImageClassification';

function ImageClassificationContainer() {
	// Initialize state
	const [state, setState] = useState({
		selectedImage: null,
		label: null,
		classifying: false,
	});

	// Destructure state variables for easier access
	const { selectedImage, label, classifying } = state;

	// Function to handle image selection
	const handleImageSelect = (image) => {
		setState((prevState) => ({ ...prevState, selectedImage: image }));
	};

	// Function to handle receiving a label
	const handleLabelReceived = (newLabel) => {
		setState((prevState) => ({ ...prevState, label: newLabel }));
	};

	// Function to set classifying
	const setClassifying = (classifying) => {
		setState((prevState) => ({ ...prevState, classifying }));
	};

	// Function to reset the state
	const reset = () => {
		setState({ selectedImage: null, label: null, classifying: false });
	};

	return (
		<ImageClassification
			selectedImage={selectedImage}
			label={label}
			classifying={classifying}
			onImageSelect={handleImageSelect}
			onLabelReceived={handleLabelReceived}
			reset={reset}
			setClassifying={setClassifying}
		/>
	);
}

export default ImageClassificationContainer;
