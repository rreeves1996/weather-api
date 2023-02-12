import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
	const navigate = useNavigate();

	return (
		<nav>
			<div className='nav-links'>
				<Link to='/'>
					<h6 className='nav-link'>Home</h6>
				</Link>

				<Link to='/about'>
					<h6 className='nav-link'>About</h6>
				</Link>

				<div className='brand' onClick={() => navigate('/')}>
					<h1>Weather</h1>
					<h4>api</h4>
				</div>

				<a href='https://github.com/rreeves1996/weather-api'>
					<h6 className='nav-link'>Repo</h6>
				</a>

				<a href='https://rreeves.dev/'>
					<h6 className='nav-link'>Contact</h6>
				</a>
			</div>
		</nav>
	);
}
