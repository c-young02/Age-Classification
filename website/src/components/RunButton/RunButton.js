import React from 'react';
import { handleRunButtonClick } from '../RunButtonHandler/RunButtonHandler';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function RunButton({ selectedImage }) {
	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Please select an image first
		</Tooltip>
	);

	const ButtonContent = (
		<Button
			className="btn btn-success"
			onClick={() => handleRunButtonClick(selectedImage)}
			disabled={!selectedImage}
		>
			Run
		</Button>
	);

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
