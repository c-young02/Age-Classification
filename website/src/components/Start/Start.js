import React from 'react';
import Title from '../Title/Title';
import ImageClassification from '../ImageClassification/ImageClassification';

function Start() {
	const title = 'Classify a Persons Age';

	return (
		<>
			<Title pageTitle={title} />
			<ImageClassification />
		</>
	);
}

export default Start;
