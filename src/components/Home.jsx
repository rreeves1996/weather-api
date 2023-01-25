import React, { useState } from 'react';
import { BsFillCloudMoonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Home() {
	const { fetchCoordinates, fetchLocation } = useFetch();
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
			await fetchCoordinates(search).then((res) => {
				console.log(res.data);
				const current = {
					city: res.data.results[0].name,
					state: res.data.results[0].admin1,
				};
				fetchLocation(res).then((res) => {
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
