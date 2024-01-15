import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadImages from '../LoadImages/LoadImages';

function ImageModal({ show, handleClose, onImageSelect }) {
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageClick = (image) => {
		setSelectedImage(image);
		console.log(image);
	};

	const handleSaveChanges = () => {
		onImageSelect(selectedImage);
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Select an Image</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex justify-content-center flex-wrap">
				<LoadImages
					onImageClick={handleImageClick}
					selectedImage={selectedImage}
				/>{' '}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleSaveChanges}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ImageModal;
