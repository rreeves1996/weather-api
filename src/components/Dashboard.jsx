import React, { useState, useEffect } from 'react';
import { BsFillCloudMoonFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../assets/style/dashboard.css';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [searchState, setSearchState] = useState('');
	const [weatherData, setWeatherData] = useState({});
	const [history, setHistory] = useState(() => {
		return JSON.parse(localStorage.getItem('search-history')) || [];
	});
	const location = useLocation();

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
				.then((res) => {
					setWeatherData(res.data);
					setHistory((history) => [
						{
							id: uuidv4(),
							text: search,
						},
						...history,
					]);
				})
				.catch((err) => console.log(`Error: ${err}`));
		}

		setSearchState('');
	};

	const handleQueryReq = (value) => {
		if (value) {
			axios
				.get(
					`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=5&aqi=yes&alerts=no`
				)
				.then((res) => {
					setWeatherData(res.data);
					const newHistory = history.filter((item) => {
						return item.text !== value;
					});
					if (history.length > 7) {
						newHistory.pop();
					}
					setHistory((history) => [
						{
							id: uuidv4(),
							text: value,
						},
						...newHistory,
					]);
				})
				.catch((err) => console.log(`Error: ${err}`));
		}
	};

	useEffect(() => {
		const fetchData = () => {
			history &&
				localStorage.setItem('search-history', JSON.stringify(history));

			if (!weatherData) {
				setWeatherData(location.state.data);
			}

			setLoading(!loading);
		};

		fetchData();
		console.log(weatherData);
	}, [weatherData]);

	return (
		<div className='dashboard'>
			<div className='dashboard-search container'>
				<header>
					<BsFillCloudMoonFill className='cloud' />
					<h5>Search for another location:</h5>
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
				{history ? (
					<section className='history'>
						<h5>History:</h5>
						<div className='history-item-container'>
							{history.map((item) => (
								<p
									className='history-item'
									onClick={() => handleQueryReq(item.text)}>
									{item.text}
								</p>
							))}
						</div>
					</section>
				) : (
					<></>
				)}
			</div>
			<section className='forecast'>
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<>
						<CurrentForecast />
						<DailyForecast />
					</>
				)}
			</section>
		</div>
	);
}
