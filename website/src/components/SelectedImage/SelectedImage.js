import React from 'react';
import './SelectedImage.css';

function SelectedImage({ image }) {
	return (
		<div className="image-container">
			<img src={image} alt="Selected face" className="face-image" />
		</div>
	);
}

export default SelectedImage;
