import React from 'react';
import Title from '../Title/Title';
import Information from '../Information/Information';
import ButtonContainer from '../ButtonsContainer/ButtonsContainer';

function About() {
	const title = 'About the Project';
	return (
		<>
			<Title pageTitle={title} />
			<Information />
			<ButtonContainer button1="GithubButton" button2="GetStarted" />
		</>
	);
}

export default About;
