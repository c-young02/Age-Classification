import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';

// BootstrapNavbar component renders a navigation bar
function BootstrapNavbar() {
	return (
		<Navbar bg="light" expand="lg" className="py-3">
			{/* Navbar brand with logo */}
			<Navbar.Brand href="/" className="mx-5 logo">
				<img src="/images/logo.png" alt="Logo" className="logo-image" />
			</Navbar.Brand>
			{/* Navbar toggle button for smaller screens */}
			<Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3" />
			{/* Navbar collapse contains the navigation links */}
			<Navbar.Collapse id="basic-navbar-nav" className="mx-5">
				<Nav>
					{/* Navigation links */}
					<Nav.Link href="/" className="nav-link">
						Home
					</Nav.Link>
					<Nav.Link href="/about" className="nav-link">
						About
					</Nav.Link>
					<Nav.Link href="/start" className="nav-link">
						Get Started
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default BootstrapNavbar;
