import React from 'react';
import Steps from '../Steps/Steps';
import { TbUser, TbUserScan } from 'react-icons/tb';
import { SiThealgorithms } from 'react-icons/si';

// Define the size of the icons
const iconSize = 75;

// Define the steps with their icons, titles, and texts
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
		text: 'The classified age will be displayed.',
	},
];

// StepsLogic component handles the logic for displaying the steps
function StepsLogic() {
	return (
		// Render the steps in a flex container that wraps onto multiple lines and centers the items
		<div className="d-flex justify-content-center flex-wrap">
			{steps.map((step) => (
				// For each step, render a Steps component with the step's icon, title, and text
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
