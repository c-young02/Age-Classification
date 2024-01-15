import React from 'react';
import { Link } from 'react-router-dom';

function GetStarted() {
	return (
		<Link to="/start" className="btn btn-primary">
			Get Started
		</Link>
	);
}

export default GetStarted;
