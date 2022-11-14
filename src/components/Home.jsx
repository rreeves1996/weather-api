import React, { useState } from 'react';
import { BsFillCloudMoonFill } from 'react-icons/bs';
import '../assets/style/home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Home() {
	const [searchState, setSearchState] = useState('');
	const navigate = useNavigate();

	const handleChange = (event) => {
		const value = event.target.value;

		setSearchState(value);
	};

	const handleSearchSubmit = async (event) => {
		event.preventDefault();

		const search = searchState.trim();

		if (search) {
			axios
				.get(
					`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${search}&days=5&aqi=yes&alerts=no`
				)
				.then((res) => navigate('/dashboard', { state: { data: res.data } }));
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
