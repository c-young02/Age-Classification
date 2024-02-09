import React from 'react';
import Card from 'react-bootstrap/Card';
import './StepCard.css';

function StepCard({ title, text, icon }) {
	return (
		<Card className="my-card text-center mx-5 my-5 p-3 card-border bg-light">
			<Card.Body>
				{React.cloneElement(icon, { 'aria-label': title })}
				<Card.Title className="card-title">{title}</Card.Title>
				<Card.Text className="lead">{text}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default StepCard;
