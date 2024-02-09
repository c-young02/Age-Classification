import React from 'react';
import './SelectableImage.css';

function SelectableImage({ image, onClick, isSelected }) {
	return (
		<img
			src={image}
			alt="Face"
			onClick={onClick}
			className={`modal-image ${isSelected ? 'selected' : ''}`}
		/>
	);
}

export default SelectableImage;
