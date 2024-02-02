import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CONTENT } from './content';

function Information() {
	return (
		<Container as="section">
			<Row className="justify-content-md-center">
				<Col md={6}>
					<article className="text-center">
						<p>{CONTENT.intro}</p>
						<h5>{CONTENT.progress}</h5>
					</article>
				</Col>
			</Row>
		</Container>
	);
}

export default Information;
