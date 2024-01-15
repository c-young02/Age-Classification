import React from 'react';
import GithubButton from '../GithubButton/GithubButton';
import GetStarted from '../GetStarted/GetStarted';
import RunButton from '../RunButton/RunButton';
import ImageModalLogic from '../ImageModalLogic/ImageModalLogic';

function ButtonContainer({ button1, button2, onImageSelect }) {
	const components = {
		GithubButton,
		GetStarted,
		RunButton,
		ImageModalLogic: () => <ImageModalLogic onImageSelect={onImageSelect} />,
	};

	const Button1 = components[button1];
	const Button2 = components[button2];

	return (
		<div className="d-flex justify-content-center flex-wrap">
			<div className="m-2">{Button1 && <Button1 />}</div>
			<div className="m-2">{Button2 && <Button2 />}</div>
		</div>
	);
}

export default ButtonContainer;
