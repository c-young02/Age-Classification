import React from 'react';
import Title from '../Title/Title';
import StepsLogic from '../StepsLogic/StepsLogic';

function Home() {
	const title = 'Facial Age Classification';
	return (
		<>
			<Title pageTitle={title} />
			<StepsLogic />
		</>
	);
}

export default Home;
