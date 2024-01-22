import React from 'react';
import './Loading.css';

function Loading() {
	return (
		<div className="loading">
			Loading<span className="dot">.</span>
			<span className="dot">.</span>
			<span className="dot">.</span>
		</div>
	);
}

export default Loading;
