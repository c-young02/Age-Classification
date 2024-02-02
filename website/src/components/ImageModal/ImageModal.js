import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadImages from '../LoadImages/LoadImages';
import './ImageModal.css';

// ImageModal component displays a modal for image selection
function ImageModal({ show, handleClose, onImageSelect }) {
	// State for the selected image
	const [selectedImage, setSelectedImage] = useState(null);

	// Handler for image click
	const handleImageClick = (image) => {
		setSelectedImage(image);
	};

	// Handler for saving changes
	const handleSaveChanges = () => {
		// Pass the selected image to the parent component
		onImageSelect(selectedImage);
		// Close the modal
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Select an Image</Modal.Title>
			</Modal.Header>
			<Modal.Body className="modal-body">
				{/* Load and display images */}
				<LoadImages
					onImageClick={handleImageClick}
					selectedImage={selectedImage}
				/>
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
