import React, { useState } from 'react';
import SelectImageButton from '../SelectImageButton/SelectImageButton';
import ImageModal from '../ImageModal/ImageModal';

// ImageModalLogic component handles the logic for showing and hiding the image selection modal
function ImageModalLogic({ onImageSelect }) {
	// State for whether the modal is shown
	const [show, setShow] = useState(false);

	// Handlers for showing and hiding the modal
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			{/* Button for showing the modal */}
			<SelectImageButton onClick={handleShow} />
			{/* Modal for image selection */}
			<ImageModal
				show={show}
				handleClose={handleClose}
				onImageSelect={onImageSelect}
			/>
		</>
	);
}

export default ImageModalLogic;
