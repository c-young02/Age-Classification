import React from 'react';
import Title from '../../Common/Title/Title';
import Information from '../../Information/Information';
import AboutPageButtons from '../../Buttons/AboutPageButtons/AboutPageButtons';

// About component displays information about the project
function About() {
	const title = 'About the Project';

	return (
		<>
			<Title pageTitle={title} />
			<Information />
			<AboutPageButtons />
		</>
	);
}

export default About;
