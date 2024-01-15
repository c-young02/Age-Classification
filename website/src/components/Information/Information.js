import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Information() {
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={6}>
					<div className="text-center">
						<p>
							As part of my honours computing program, I embarked on an
							ambitious project to develop a sophisticated facial age
							classification model. This model leverages machine learning to
							predict age from facial features, using a diverse dataset to
							ensure robustness and inclusivity.
						</p>

						<h5>Further content will be added as the project progresses.</h5>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Information;
