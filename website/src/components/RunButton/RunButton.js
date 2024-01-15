import React from 'react';

function RunButton({ onClick }) {
	return (
		<button className="btn btn-success" onClick={onClick}>
			Run
		</button>
	);
}

export default RunButton;
