import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ImageSelectionGridContainer from './ImageSelectionGrid/ImageSelectionGridContainer';
import './ImageModal.css';

// ImageModal component displays a modal for image selection
function ImageModal({
	show,
	handleClose,
	handleSaveChanges,
	onImageSelect,
	selectedImage,
}) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Select an Image</Modal.Title>
			</Modal.Header>
			<Modal.Body className="modal-body">
				{/* Load and display images */}
				<ImageSelectionGridContainer
					onImageClick={onImageSelect}
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
