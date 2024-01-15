import React from 'react';
import Card from 'react-bootstrap/Card';
import './Steps.css';

function Steps({ title, text, icon }) {
	return (
		<Card className="my-card text-center mx-5 my-5" style={{ width: '20rem' }}>
			<Card.Body>
				{icon}
				<Card.Title>{title}</Card.Title>
				<Card.Text>{text}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Steps;
