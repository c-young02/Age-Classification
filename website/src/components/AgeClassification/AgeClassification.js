import React from 'react';
import './AgeClassification.css';

function AgeClassification({ label, confidencePercentage, progressBarClass }) {
	return (
		<div className="text-center">
			<h2>Classified Age: {label}</h2>
			<div className="confidence-container">
				<div className="progress">
					<div
						className={`progress-bar ${progressBarClass}`}
						role="progressbar"
						style={{ width: `${confidencePercentage}%` }}
						aria-valuenow={confidencePercentage}
						aria-valuemin="0"
						aria-valuemax="100"
					>
						{confidencePercentage}%
					</div>
				</div>
			</div>
		</div>
	);
}

export default AgeClassification;
