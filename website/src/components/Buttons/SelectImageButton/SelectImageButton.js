import React from 'react';
import { Button } from 'react-bootstrap';

function SelectImageButton({ onClick }) {
	return (
		<Button variant="primary" onClick={onClick} aria-label="Select Image">
			Select Image
		</Button>
	);
}

export default SelectImageButton;
