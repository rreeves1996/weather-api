import React from 'react';

export default function Navbar() {
	return (
		<nav>
			<div className='nav-links'>
				<a href='/home'>Home</a>
				<a href='/about'>About</a>
				<div className='brand'>
					<h1>Weather</h1>
					<h4>api</h4>
				</div>
				<a href='https://github.com/rreeves1996/weather-api'>Repo</a>
				<a href='/contact'>Contact</a>
			</div>
		</nav>
	);
}
