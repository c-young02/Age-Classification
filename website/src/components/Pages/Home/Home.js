import React from 'react';
import Title from '../../Common/Title/Title';
import StepCardContainer from '../../StepCard/StepCardContainer';

const title = 'Facial Age Classification';

function Home() {
	return (
		<>
			<Title pageTitle={title} />
			<StepCardContainer />
		</>
	);
}

export default Home;
