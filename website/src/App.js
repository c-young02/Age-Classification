import Title from './components/Title/Title';
import Navbar from './components/Navbar/Navbar';
import StepsLogic from './components/StepsLogic/StepsLogic';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Navbar />
				<Title />
				<StepsLogic />
			</header>
		</div>
	);
}

export default App;
