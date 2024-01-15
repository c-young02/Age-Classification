import React from 'react';
import Card from 'react-bootstrap/Card';
import './Steps.css';

function Steps({ title, text, icon }) {
	return (
		<Card className="my-card text-center mx-5 my-5 p-3 card-border bg-light">
			<Card.Body>
				{icon}
				<Card.Title className="card-title">{title}</Card.Title>
				<Card.Text className="lead">{text}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Steps;