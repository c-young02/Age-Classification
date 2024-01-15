import React, { useState } from 'react';
import SelectImageButton from '../SelectImageButton/SelectImageButton';
import ImageModal from '../ImageModal/ImageModal';

function ImageModalLogic({ onImageSelect }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<SelectImageButton onClick={handleShow} />
			<ImageModal
				show={show}
				handleClose={handleClose}
				onImageSelect={onImageSelect}
			/>
		</>
	);
}

export default ImageModalLogic;
