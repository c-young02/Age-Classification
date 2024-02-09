import React from 'react';
import GithubButton from '../GithubButton/GithubButton';
import GetStartedButton from '../GetStartedButton/GetStartedButton';

function AboutPageButtons() {
	return (
		<div className="d-flex justify-content-center flex-wrap">
			<div className="m-2">
				<GithubButton />
			</div>
			<div className="m-2">
				<GetStartedButton />
			</div>
		</div>
	);
}

export default AboutPageButtons;
