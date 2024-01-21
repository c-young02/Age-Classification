import React from 'react';
import ModalImage from '../ModalImage/ModalImage';
import useImages from '../useImages/useImages';

function LoadImages({ onImageClick, selectedImage }) {
	const images = useImages();

	return (
		<div className="container">
			<div className="row">
				{images.map((base64String, index) => (
					<div
						className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
						key={index}
					>
						<ModalImage
							image={`data:image/png;base64,${base64String}`}
							onClick={() => onImageClick(base64String)}
							isSelected={base64String === selectedImage}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default LoadImages;
