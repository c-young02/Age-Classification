import React from 'react';
import Title from '../Title/Title';
import StepsLogic from '../StepsLogic/StepsLogic';

const title = 'Facial Age Classification';

function Home() {
	return (
		<>
			<Title pageTitle={title} />
			<StepsLogic />
		</>
	);
}

export default Home;
