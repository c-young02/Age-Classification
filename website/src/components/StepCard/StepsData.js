// stepsData.js
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

export default steps;
