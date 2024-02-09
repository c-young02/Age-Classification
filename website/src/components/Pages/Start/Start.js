import React from 'react';
import Title from '../../Common/Title/Title';
import ImageClassificationContainer from '../../ImageClassification/ImageClassificationContainer';

const title = 'Classify a Persons Age';

function Start() {
	return (
		<>
			<Title pageTitle={title} />
			<ImageClassificationContainer />
		</>
	);
}

export default Start;
