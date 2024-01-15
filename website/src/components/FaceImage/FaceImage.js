import React from 'react';

function FaceImage({ image }) {
	return (
		<div className="d-flex justify-content-center mb-5">
			{image && (
				<img src={image} alt="Selected face" className="border border-dark" />
			)}
		</div>
	);
}

export default FaceImage;
