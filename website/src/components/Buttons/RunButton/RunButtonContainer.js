import React from 'react';
import { predictImageAgeGroup } from './predictImageAgeGroup';
import RunButton from './RunButton';

function RunButtonContainer({
	selectedImage,
	onLabelReceived,
	setClassifying,
	onConfidenceReceived,
}) {
	// Handler for button click
	const handleClick = async () => {
		setClassifying(true);
		try {
			// Run the age classification and pass the label and confidence to the parent component
			const { label, confidence } = await predictImageAgeGroup(selectedImage);
			onLabelReceived(label);
			onConfidenceReceived(confidence);
		} catch (error) {
			console.error(error);
		} finally {
			setClassifying(false);
		}
	};

	return <RunButton selectedImage={selectedImage} handleClick={handleClick} />;
}

export default RunButtonContainer;
