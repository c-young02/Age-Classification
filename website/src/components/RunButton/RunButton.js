import React from 'react';
import { handleRunButtonClick } from '../RunButtonHandler/RunButtonHandler';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function RunButton({ selectedImage, onLabelReceived }) {
	// Tooltip to be displayed when no image is selected
	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Please select an image first
		</Tooltip>
	);

	// Handler for button click
	const handleClick = () => {
		// Run the age classification and pass the label to the parent component
		handleRunButtonClick(selectedImage).then((label) => {
			onLabelReceived(label);
		});
	};

	// Button content
	const ButtonContent = (
		<Button
			className="btn btn-success"
			onClick={handleClick}
			// Disable the button if no image is selected
			disabled={!selectedImage}
		>
			Run
		</Button>
	);

	// If no image is selected, wrap the button in an OverlayTrigger to display the tooltip
	// Otherwise, just display the button
	return !selectedImage ? (
		<OverlayTrigger
			placement="top"
			delay={{ show: 250, hide: 400 }}
			overlay={renderTooltip}
		>
			<span className="d-inline-block">{ButtonContent}</span>
		</OverlayTrigger>
	) : (
		ButtonContent
	);
}

export default RunButton;
