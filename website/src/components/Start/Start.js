import React from 'react';
import Title from '../Title/Title';
import ImageClassification from '../ImageClassification/ImageClassification';

const title = 'Classify a Persons Age';

function Start() {
	return (
		<>
			<Title pageTitle={title} />
			<ImageClassification />
		</>
	);
}

export default Start;
