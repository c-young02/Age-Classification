import React from 'react';
import { FaGithub } from 'react-icons/fa';

function GithubButton() {
	return (
		<a
			href="https://github.com/c-young02/Age-Classification"
			target="_blank"
			rel="noopener noreferrer"
		>
			<button className="btn btn-success">
				<FaGithub /> View the Code
			</button>
		</a>
	);
}

export default GithubButton;
