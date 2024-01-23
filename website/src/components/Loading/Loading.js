import React from 'react';
import './Loading.css';

// Loading component displays a loading message
function Loading() {
	return (
		<div className="loading">
			{/* Display "Loading" text followed by three dots */}
			Loading<span className="dot">.</span>
			<span className="dot">.</span>
			<span className="dot">.</span>
		</div>
	);
}

export default Loading;
