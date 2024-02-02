import React from 'react';
import './ModalImage.css';

function ModalImage({ image, onClick, isSelected }) {
	return (
		<img
			src={image}
			alt="Face"
			onClick={onClick}
			className={`modal-image ${isSelected ? 'selected' : ''}`}
		/>
	);
}

export default ModalImage;
