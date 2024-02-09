import React from 'react';
import ClassificationControls from '../Buttons/ClassificationControls/ClassificationControls';
import SelectedImage from '../SelectedImage/SelectedImage';
import AgeClassification from '../AgeClassification/AgeClassification';
import StartAgainButton from '../Buttons/StartAgainButton/StartAgainButton';
import Loading from '../Common/Loading/Loading';

function ImageClassification({
	selectedImage,
	label,
	classifying,
	onImageSelect,
	onLabelReceived,
	reset,
	setClassifying,
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
							setClassifying={setClassifying}
						/>
					)}
					{label && (
						<>
							<AgeClassification label={label} />
							<StartAgainButton reset={reset} />
						</>
					)}
				</>
			)}
		</>
	);
}

export default ImageClassification;
