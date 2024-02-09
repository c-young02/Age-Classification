// StepCardContainer.js
import React from 'react';
import StepCard from './StepCard';
import steps from './StepsData';

// StepCardContainer component handles the logic for displaying the steps
function StepCardContainer() {
	return (
		<div className="d-flex justify-content-center flex-wrap">
			{steps.map((step) => (
				<StepCard
					key={step.title}
					icon={step.icon}
					title={step.title}
					text={step.text}
				/>
			))}
		</div>
	);
}

export default StepCardContainer;
