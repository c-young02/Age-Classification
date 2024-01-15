import React from 'react';
import { FaGithub } from 'react-icons/fa';

function GithubButton({ url }) {
	return (
		<a href={url} target="_blank" rel="noopener noreferrer">
			<button className="btn btn-success">
				<FaGithub /> View the Code
			</button>
		</a>
	);
}

export default GithubButton;
