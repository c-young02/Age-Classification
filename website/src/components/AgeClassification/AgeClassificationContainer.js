import React from 'react';
import AgeClassification from './AgeClassification';

// AgeClassificationContainer is a functional component that receives props and returns JSX.
// It calculates the confidence percentage and determines the progress bar class based on the confidence level.
function AgeClassificationContainer({ label, confidence }) {
	// The confidence prop value is converted to a percentage and rounded to 2 decimal places.
	const confidencePercentage = (confidence * 100).toFixed();

	// The color of the progress bar is determined based on the confidence level.
	// If the confidence level is 75% or higher, the progress bar is green (bg-success).
	// If the confidence level is 50% or higher but less than 75%, the progress bar is yellow (bg-warning).
	// If the confidence level is less than 50%, the progress bar is red (bg-danger).
	let progressBarClass = 'progress-bar ';
	if (confidencePercentage >= 75) {
		progressBarClass += 'bg-success';
	} else if (confidencePercentage >= 50) {
		progressBarClass += 'bg-warning';
	} else {
		progressBarClass += 'bg-danger';
	}

	// The AgeClassification component is rendered with the label, confidencePercentage, and progressBarClass props.
	return (
		<AgeClassification
			label={label}
			confidencePercentage={confidencePercentage}
			progressBarClass={progressBarClass}
		/>
	);
}

export default AgeClassificationContainer;
