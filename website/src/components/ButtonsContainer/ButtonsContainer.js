import React from 'react';
import GithubButton from '../GithubButton/GithubButton';
import GetStarted from '../GetStarted/GetStarted';

function ButtonContainer() {
	return (
		<div className="d-flex justify-content-center flex-wrap">
			<div className="m-2">
				<GithubButton url="https://github.com/c-young02/Age-Classification" />
			</div>
			<div className="m-2">
				<GetStarted />
			</div>
		</div>
	);
}

export default ButtonContainer;
