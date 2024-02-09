import React from 'react';
import ClassificationControls from '../Buttons/ClassificationControls/ClassificationControls';
import SelectedImage from '../SelectedImage/SelectedImage';
import AgeClassificationContainer from '../AgeClassification/AgeClassificationContainer';
import StartAgainButton from '../Buttons/StartAgainButton/StartAgainButton';
import Loading from '../Common/Loading/Loading';

function ImageClassification({
	selectedImage,
	label,
	confidence,
	classifying,
	onImageSelect,
	onLabelReceived,
	reset,
	setClassifying,
	onConfidenceReceived,
}) {
	return (
		<>
			{selectedImage && (
				<div className="d-flex justify-content-center align-items-center mb-5">
					<SelectedImage image={`data:image/png;base64,${selectedImage}`} />
				</div>
			)}
			{classifying ? (
				<div className="text-center h2">
					<Loading message="Classifying" />
				</div>
			) : (
				<>
					{!label && (
						<ClassificationControls
							onImageSelect={onImageSelect}
							selectedImage={selectedImage}
							onLabelReceived={onLabelReceived}
							onConfidenceReceived={onConfidenceReceived}
							setClassifying={setClassifying}
						/>
					)}
					{label && (
						<>
							<AgeClassificationContainer
								label={label}
								confidence={confidence}
							/>
							<StartAgainButton reset={reset} />
						</>
					)}
				</>
			)}
		</>
	);
}

export default ImageClassification;
