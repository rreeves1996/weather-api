import React, { useState, useEffect } from 'react';
import { BsFillCloudMoonFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../assets/style/dashboard.css';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [searchState, setSearchState] = useState('');
	const [weatherData, setWeatherData] = useState();
	const [weatherCode, setWeatherCode] = useState({});
	const [windDirection, setWindDirection] = useState();
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

					if (history.length > 4) {
						const newHistory = history;
						newHistory.pop();
						setHistory((history) => [
							{
								id: uuidv4(),
								text: search,
							},
							...newHistory,
						]);
					} else {
						setHistory((history) => [
							{
								id: uuidv4(),
								text: search,
							},
							...history,
						]);
					}
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

					if (history.length > 5) {
						newHistory.pop();
						console.log(newHistory);
						setHistory((history) => [
							{
								id: uuidv4(),
								text: value,
							},
							...newHistory,
						]);
					} else {
						setHistory((history) => [
							{
								id: uuidv4(),
								text: value,
							},
							...newHistory,
						]);
					}
				})
				.catch((err) => console.log(`Error: ${err}`));
		}
	};

	useEffect(() => {
		const fetchData = () => {
			history &&
				localStorage.setItem('search-history', JSON.stringify(history));

			if (!weatherData) {
				setWeatherData(location.state);

				// Logic to set weather text/weather icon based on weathercode and sunrise/sunset times
				const currentTime = location.state.data.current_weather.time.slice(
					11,
					13
				);
				const dayIndex = location.state.data.daily.time.indexOf(
					location.state.data.current_weather.time.slice(0, 10)
				);
				const sunrise = location.state.data.daily.sunrise[dayIndex].slice(
					11,
					13
				);
				const sunset = location.state.data.daily.sunset[dayIndex].slice(11, 13);

				switch (location.state.data.current_weather.weathercode) {
					case 0:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Clear skies',
								icon: 'https://www.weatherbit.io/static/img/icons/c01d.png',
							});
							break;
						} else {
							setWeatherCode({
								text: 'Clear skies',
								icon: 'https://www.weatherbit.io/static/img/icons/c01n.png',
							});
							break;
						}
					case 1:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Mostly clear',
								icon: 'https://www.weatherbit.io/static/img/icons/c02d.png',
							});
							break;
						} else {
							setWeatherCode({
								text: 'Mostly clear',
								icon: 'https://www.weatherbit.io/static/img/icons/c02n.png',
							});
							break;
						}
					case 2:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Partly cloudy',
								icon: 'https://www.weatherbit.io/static/img/icons/c03d.png',
							});
							break;
						} else {
							setWeatherCode({
								text: 'Partly cloudy',
								icon: 'https://www.weatherbit.io/static/img/icons/c03n.png',
							});
							break;
						}
					case 3:
						setWeatherCode({
							text: 'Overcast',
							icon: 'https://www.weatherbit.io/static/img/icons/c04d.png',
						});
						break;
					case (45, 48):
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Fog',
								icon: 'https://www.weatherbit.io/static/img/icons/a05d.png',
							});
							break;
						} else {
							setWeatherCode({
								text: 'Fog',
								icon: 'https://www.weatherbit.io/static/img/icons/a05n.png',
							});
							break;
						}
					case (51, 53, 55, 56, 57):
						setWeatherCode({
							text: 'Drizzle',
							icon: 'https://www.weatherbit.io/static/img/icons/a05d.png',
						});
						break;
					case (61, 63, 65, 66, 67):
						setWeatherCode({
							text: 'Rain',
							icon: 'https://www.weatherbit.io/static/img/icons/r01d.png',
						});
						break;
					case (71, 73, 75, 77):
						setWeatherCode({
							text: 'Snow',
							icon: 'https://www.weatherbit.io/static/img/icons/s02d.png',
						});
						break;
					case (80, 81, 82):
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Rain showers',
								icon: 'https://www.weatherbit.io/static/img/icons/r05d.png',
							});
							break;
						} else {
							setWeatherCode({
								text: 'Rain showers',
								icon: 'https://www.weatherbit.io/static/img/icons/r05n.png',
							});
							break;
						}
					case (85, 86):
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Snow showers',
								icon: 'https://www.weatherbit.io/static/img/icons/s01d.png',
							});
							break;
						} else {
							setWeatherCode({
								text: 'Snow showers',
								icon: 'https://www.weatherbit.io/static/img/icons/s01n.png',
							});
							break;
						}
					case (95, 96, 99):
						setWeatherCode({
							text: 'Thunderstorm',
							icon: 'https://www.weatherbit.io/static/img/icons/t04d.png',
						});
						break;
					default:
						break;
				}
			}

			setLoading(false);
		};

		fetchData();
	}, [weatherData]);

	return (
		<div className='dashboard'>
			<div className='dashboard-search container'>
				<header>
					<BsFillCloudMoonFill className='cloud' />
				</header>
				<section className='search'>
					<form className='search-form' onSubmit={handleSearchSubmit}>
						<input
							className='search'
							type='text'
							onChange={handleChange}
							placeholder='Search for another location...'
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
						<CurrentForecast
							data={weatherData.data}
							current={weatherData.current}
							weatherCode={weatherCode}
						/>
						<DailyForecast forecast={weatherData.data.daily} />
					</>
				)}
			</section>
		</div>
	);
}
