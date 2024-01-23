import React from 'react';
import { Button } from 'react-bootstrap';

// StartAgainButton component resets the label and image when clicked
function StartAgainButton({ resetLabel, resetImage }) {
	// Handler for button click
	const handleClick = () => {
		// Call the resetLabel and resetImage functions passed from the parent component
		resetLabel();
		resetImage();
	};

	return (
		<div className="d-flex justify-content-center mt-5">
			{/* Button that triggers the handleClick function when clicked */}
			<Button className="btn btn-primary" onClick={handleClick}>
				Start Again
			</Button>
		</div>
	);
}

export default StartAgainButton;
