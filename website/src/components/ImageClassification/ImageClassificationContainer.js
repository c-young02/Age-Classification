import React, { useState } from 'react';
import ImageClassification from './ImageClassification';

function ImageClassificationContainer() {
	// Initialize state
	const [state, setState] = useState({
		selectedImage: null,
		label: null,
		confidence: null,
		classifying: false,
		error: null,
	});

	// Destructure state variables for easier access
	const { selectedImage, label, confidence, classifying, error } = state;

	// Function to handle image selection
	const handleImageSelect = (image) => {
		setState((prevState) => ({ ...prevState, selectedImage: image }));
	};

	// Function to handle receiving a label
	const handleLabelReceived = (newLabel) => {
		setState((prevState) => ({ ...prevState, label: newLabel }));
	};

	// Function to handle receiving a confidence
	const handleConfidenceReceived = (newConfidence) => {
		setState((prevState) => ({ ...prevState, confidence: newConfidence }));
	};

	// Function to set classifying
	const setClassifying = (classifying) => {
		setState((prevState) => ({ ...prevState, classifying }));
	};

	// Function to set error
	const handleErrorReceived = (error) => {
		setState((prevState) => ({ ...prevState, error: error }));
	};

	// Function to reset the state
	const reset = () => {
		setState({
			selectedImage: null,
			label: null,
			confidence: null,
			classifying: false,
			error: null,
		});
	};

	return (
		<ImageClassification
			selectedImage={selectedImage}
			label={label}
			confidence={confidence}
			classifying={classifying}
			onImageSelect={handleImageSelect}
			onLabelReceived={handleLabelReceived}
			onConfidenceReceived={handleConfidenceReceived}
			reset={reset}
			setClassifying={setClassifying}
			onErrorReceived={handleErrorReceived}
			error={error}
		/>
	);
}

export default ImageClassificationContainer;
