import React from 'react';
import ModalImage from '../ModalImage/ModalImage';

function importAll(r) {
	return r.keys().map(r);
}

function LoadImages({ onImageClick, selectedImage }) {
	const images = importAll(
		require.context('../../../public/images/faces', false, /\.jpg$/)
	);

	return (
		<div className="container">
			<div className="row">
				{images.map((image, index) => {
					return (
						<div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
							<ModalImage
								image={image}
								onClick={() => onImageClick(image)}
								isSelected={image === selectedImage}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default LoadImages;
