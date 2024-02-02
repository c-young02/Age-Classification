import React, { useState } from 'react';
import ButtonContainer from '../ButtonsContainer/ButtonsContainer';
import FaceImage from '../FaceImage/FaceImage';
import AgeClassification from '../AgeClassification/AgeClassification';
import StartAgainButton from '../StartAgainButton/StartAgainButton';
import Loading from '../Loading/Loading';

function ImageClassification() {
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

	// Function to reset the state
	const reset = () => {
		setState({ selectedImage: null, label: null, classifying: false });
	};

	// Render the component
	return (
		<>
			{/* If an image is selected, display it */}
			{selectedImage && (
				<FaceImage image={`data:image/png;base64,${selectedImage}`} />
			)}
			{/* If classifying, display a loading message, otherwise display the buttons or the label */}
			{classifying ? (
				<div className="text-center h2">
					<Loading message="Classifying" />
				</div>
			) : (
				<>
					{/* If no label is received yet, display the buttons */}
					{!label && (
						<ButtonContainer
							button1="ImageModalLogic"
							button2="RunButton"
							onImageSelect={handleImageSelect}
							selectedImage={selectedImage}
							onLabelReceived={handleLabelReceived}
							setClassifying={(classifying) =>
								setState((prevState) => ({ ...prevState, classifying }))
							}
						/>
					)}
					{/* If a label is received, display the label and the start again button */}
					{label && (
						<>
							<AgeClassification label={label} />
							<StartAgainButton reset={reset} />
						</>
					)}
				</>
			)}
		</>
	);
}

export default ImageClassification;
