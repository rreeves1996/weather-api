import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import './assets/style/style.css';

function App() {
	const location = useLocation();

	return (
		<div className='app'>
			<Navbar />
			<main>
				<TransitionGroup>
					<CSSTransition timeout={7500} classNames='fade' key={location.key}>
						<Routes location={location}>
							<Route path='/' element={<Home />} />
							<Route path='/dashboard' element={<Dashboard />} />
							<Route path='/about' element={<About />} />
							<Route path='/contact' element={<Contact />} />
						</Routes>
					</CSSTransition>
				</TransitionGroup>
			</main>
			<Footer />
		</div>
	);
}

export default App;
