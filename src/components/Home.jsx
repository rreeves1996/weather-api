import React, { useState } from 'react';
import { BsFillCloudMoonFill } from 'react-icons/bs';
import '../assets/style/home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const [searchState, setSearchState] = useState('');
	const navigate = useNavigate();

	const handleChange = (event) => {
		const value = event.target.value;

		setSearchState(value);
	};

	const handleSearchSubmit = async (event) => {
		event.preventDefault();

		const query = searchState.trim();

		if (query) {
			axios
				.get(
					// Geolocater gets the requested city's latitude and longitude
					`https://geocoding-api.open-meteo.com/v1/search?name=${query}`
				)
				.then((res) => {
					const lat = res.data.results[0].latitude;
					const lon = res.data.results[0].longitude;
					const current = {
						city: res.data.results[0].name,
						state: res.data.results[0].admin1,
					};
					// Format timezone into URL friendly format
					const unformattedTime = res.data.results[0].timezone.split('/');
					const timezone = `${
						unformattedTime[0] ? unformattedTime[0] : unformattedTime
					}${unformattedTime[0] && `%2F${unformattedTime[1]}`}`;

					axios
						.get(
							`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_80m,winddirection_80m,shortwave_radiation_instant&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=${timezone}`
						)
						.then((res) => {
							current.time = res.data.current_weather.time;

							navigate('/dashboard', {
								state: { current: current, data: res.data },
							});
						});
				});
		}

		setSearchState('');
	};
	return (
		<div className='home-container container'>
			<header>
				<BsFillCloudMoonFill className='cloud' />
				<h5>Search for a location:</h5>
			</header>
			<section className='search'>
				<form className='search-form' onSubmit={handleSearchSubmit}>
					<input
						className='search'
						type='text'
						onChange={handleChange}
						placeholder='City, state, or zip code...'
					/>
					<button type='submit'>Search</button>
				</form>
			</section>
		</div>
	);
}
