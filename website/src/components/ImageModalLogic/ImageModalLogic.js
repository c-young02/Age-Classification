import React, { useState } from 'react';
import SelectImageButton from '../SelectImageButton/SelectImageButton';
import ImageModal from '../ImageModal/ImageModal';

// ImageModalLogic component handles the logic for showing and hiding the image selection modal
function ImageModalLogic({ onImageSelect }) {
	// State for whether the modal is shown
	const [show, setShow] = useState(false);

	return (
		<>
			{/* Button for showing the modal */}
			<SelectImageButton onClick={() => setShow(true)} />
			{/* Modal for image selection */}
			<ImageModal
				show={show}
				handleClose={() => setShow(false)}
				onImageSelect={onImageSelect}
			/>
		</>
	);
}

export default ImageModalLogic;
