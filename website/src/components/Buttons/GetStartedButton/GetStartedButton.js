import React from 'react';
import { Link } from 'react-router-dom';

function GetStartedButton() {
	return (
		<Link
			to="/start"
			className="btn btn-primary"
			aria-label="Get started with the application"
		>
			Get Started
		</Link>
	);
}

export default GetStartedButton;
