import React from 'react';
import './FaceImage.css';

function FaceImage({ image }) {
	return (
		<div className="image-container">
			<img src={image} alt="Selected face" className="face-image" />
		</div>
	);
}

export default FaceImage;
