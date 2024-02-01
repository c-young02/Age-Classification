import React from 'react';
import './Loading.css';

// Loading component displays a loading message
function Loading({ message }) {
	return (
		<div className="loading">
			{/* Display "Loading" text followed by three dots */}
			{message}
			<span className="dot">.</span>
			<span className="dot">.</span>
			<span className="dot">.</span>
		</div>
	);
}

export default Loading;
