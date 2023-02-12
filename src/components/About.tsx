import React from 'react';

export default function About() {
	return (
		<>
			<section className='about-container container'>
				<header>
					<h1>Weather Dashboard</h1>
					<h6>
						created by <strong>Ryan Reeves</strong> with:
					</h6>
					<div className='badge-container'>
						<div className='badge react-badge'>
							<code>React.js</code>
						</div>
						<div className='badge typescript-badge'>
							<code>TypeScript</code>
						</div>
						<div className='badge sass-badge'>
							<code>SASS</code>
						</div>
						<div className='badge node-badge'>
							<code>Node.js</code>
						</div>
					</div>
					<div className='divider' />
					<div className='about-body'>
						<p>
							This app uses axios to query two different APIs from{' '}
							<a href='open-meteo.com'>Open-Meteo</a>. The first API is the
							geolocator, which grabs the latitude and longitude of the
							requested location. Then, it uses the actual weather data API to
							get the weather data via the latitude and longitude.
						</p>
						<p>
							The UI was built by myself and uses CSS transitions to animate the
							page changes. It also uses recharts to graph the temperature chart
							on the dashboard.
						</p>
						<p>
							To view my website and see more of my apps, head over to my
							website <a href='https://rreeves.dev'>https://rreeves.dev/</a>!
						</p>
					</div>
				</header>
			</section>
		</>
	);
}
