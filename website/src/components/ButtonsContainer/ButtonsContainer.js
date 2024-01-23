import React from 'react';
import GithubButton from '../GithubButton/GithubButton';
import GetStarted from '../GetStarted/GetStarted';
import RunButton from '../RunButton/RunButton';
import ImageModalLogic from '../ImageModalLogic/ImageModalLogic';

// ButtonContainer component dynamically renders different buttons based on props
function ButtonContainer({
	button1,
	button2,
	onImageSelect,
	selectedImage,
	onLabelReceived,
}) {
	// Map button names to their corresponding components
	const components = {
		GithubButton,
		GetStarted,
		// RunButton and ImageModalLogic are wrapped in a function to pass props
		RunButton: () => (
			<RunButton
				selectedImage={selectedImage}
				onLabelReceived={onLabelReceived}
			/>
		),
		ImageModalLogic: () => <ImageModalLogic onImageSelect={onImageSelect} />,
	};

	// Get the components to render based on the button names passed in props
	const Button1 = components[button1];
	const Button2 = components[button2];

	return (
		<div className="d-flex justify-content-center flex-wrap">
			{/* Render the buttons if their names were passed in props */}
			<div className="m-2">{Button1 && <Button1 />}</div>
			<div className="m-2">{Button2 && <Button2 />}</div>
		</div>
	);
}

export default ButtonContainer;
