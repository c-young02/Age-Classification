import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Common/Navbar/Navbar';
import Home from './components/Pages/Home/Home';
import About from './components/Pages/About/About';
import Start from './components/Pages/Start/Start';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/start" element={<Start />} />
					</Routes>
				</header>
			</div>
		</Router>
	);
}

export default App;
