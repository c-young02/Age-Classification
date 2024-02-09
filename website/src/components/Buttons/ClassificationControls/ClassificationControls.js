import React from 'react';
import RunButtonContainer from '../RunButton/RunButtonContainer';
import ImageModalLogic from '../../ImageModal/ImageModalLogic';
import UploadButtonContainer from '../UploadButton/UploadButtonContainer';

function ClassificationControls({
	onImageSelect,
	selectedImage,
	onLabelReceived,
	setClassifying,
	onConfidenceReceived,
}) {
	return (
		<div className="d-flex justify-content-center flex-wrap">
			<ImageModalLogic onImageSelect={onImageSelect} />
			<div className="mx-2"></div>
			<UploadButtonContainer onImageSelect={onImageSelect} />
			<div className="w-100 my-2"></div>
			<RunButtonContainer
				selectedImage={selectedImage}
				onLabelReceived={onLabelReceived}
				setClassifying={setClassifying}
				onConfidenceReceived={onConfidenceReceived}
			/>
		</div>
	);
}

export default ClassificationControls;
