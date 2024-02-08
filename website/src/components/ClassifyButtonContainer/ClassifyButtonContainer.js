import React from 'react';
import RunButton from '../RunButton/RunButton';
import ImageModalLogic from '../ImageModalLogic/ImageModalLogic';
import UploadButtonContainer from '../UploadButton/UploadButtonContainer';

function ClassifyButtonContainer({
	onImageSelect,
	selectedImage,
	onLabelReceived,
	setClassifying,
}) {
	return (
		<div className="d-flex justify-content-center flex-wrap">
			<ImageModalLogic onImageSelect={onImageSelect} />
			<div className="mx-2"></div>
			<UploadButtonContainer onImageSelect={onImageSelect} />
			<div className="w-100 my-2"></div>
			<RunButton
				selectedImage={selectedImage}
				onLabelReceived={onLabelReceived}
				setClassifying={setClassifying}
			/>
		</div>
	);
}

export default ClassifyButtonContainer;
