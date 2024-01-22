import React from 'react';
import { Button } from 'react-bootstrap';

function StartAgainButton({ resetLabel, resetImage }) {
	const handleClick = () => {
		resetLabel();
		resetImage();
	};

	return (
		<div className="d-flex justify-content-center mt-5">
			<Button className="btn btn-primary" onClick={handleClick}>
				Start Again
			</Button>
		</div>
	);
}

export default StartAgainButton;
