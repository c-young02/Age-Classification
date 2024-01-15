import React from 'react';
import Steps from '../Steps/Steps';
import { TbUser, TbUserScan } from 'react-icons/tb';
import { SiThealgorithms } from 'react-icons/si';

function StepsLogic() {
	const iconSize = 75;
	const steps = [
		{
			icon: <TbUser size={iconSize} />,
			title: 'Select a Face',
			text: 'Choose from a selection of faces that the machine learning model has not been exposed to.',
		},
		{
			icon: <SiThealgorithms size={iconSize} />,
			title: 'Analyse Image',
			text: 'The model will analyse the selected image and estimate the age of the person.',
		},
		{
			icon: <TbUserScan size={iconSize} />,
			title: 'View Results',
			text: 'The estimated age will be displayed along with the confidence level of the model.',
		},
	];

	return (
		<div className="d-flex justify-content-center flex-wrap">
			{steps.map((step) => (
				<Steps
					key={step.title}
					icon={step.icon}
					title={step.title}
					text={step.text}
				/>
			))}
		</div>
	);
}

export default StepsLogic;
