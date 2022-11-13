import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import './assets/style/style.css';

function App() {
	return (
		<div className='app'>
			<Navbar />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
