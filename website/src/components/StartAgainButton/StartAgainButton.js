import React from 'react';
import { Button } from 'react-bootstrap';

// StartAgainButton component resets the label and image when clicked
function StartAgainButton({ reset }) {
	return (
		<div className="d-flex justify-content-center mt-5">
			{/* Button that triggers the reset function when clicked */}
			<Button className="btn btn-primary" onClick={reset}>
				Start Again
			</Button>
		</div>
	);
}

export default StartAgainButton;
