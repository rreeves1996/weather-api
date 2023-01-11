import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../assets/style/dashboard.css';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';
import Search from './Search';
import useFetch from '../hooks/useFetch';
const images = importAll(require.context('../assets/icons', false, /\.(png)$/));

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

export default function Dashboard() {
	const { fetchCoordinates, fetchLocation } = useFetch();
	const [loading, setLoading] = useState(true);
	const [weatherData, setWeatherData] = useState();
	const [weatherCode, setWeatherCode] = useState({});
	const [history, setHistory] = useState(() => {
		return JSON.parse(localStorage.getItem('search-history')) || [];
	});

	const location = useLocation();

	const handleSearch = async (search) => {
		console.log(search);

		if (search) {
			try {
				const coordinates = await fetchCoordinates(search);
				const res = await fetchLocation(coordinates);

				console.log(res);

				setWeatherData((prevState) => res.data).then(() => {
					const newHistory = history.filter((item) => {
						return item.text !== search;
					});

					if (history.length > 5) {
						newHistory.pop();
						console.log(newHistory);
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
							...newHistory,
						]);
					}
				});
			} catch (err) {
				console.error(`Error: ${err}`);
			}
		}
	};

	const handleQueryReq = async (query) => {
		if (query) {
			await axios
				.get(
					// Geolocater gets the requested city's latitude and longitude
					`https://geocoding-api.open-meteo.com/v1/search?name=${query}`
				)
				.then((res) => {
					const lat = res.data.results[0].latitude;
					const lon = res.data.results[0].longitude;

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
							setWeatherData(res.data);

							console.log(res.data);
							const newHistory = history.filter((item) => {
								return item.text !== query;
							});

							if (history.length > 5) {
								newHistory.pop();
								console.log(newHistory);
								setHistory((history) => [
									{
										id: uuidv4(),
										text: query,
									},
									...newHistory,
								]);
							} else {
								setHistory((history) => [
									{
										id: uuidv4(),
										text: query,
									},
									...newHistory,
								]);
							}
						})
						.catch((err) => console.log(`Error: ${err}`));
				});
		}
	};

	useEffect(() => {
		console.log('render');
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
								icon: images['clearday.png'],
							});
						} else {
							setWeatherCode({
								text: 'Clear skies',
								icon: images['clearnight.png'],
							});
						}
						break;
					case 1:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Mostly clear',
								icon: images['mostlyclearday.png'],
							});
						} else {
							setWeatherCode({
								text: 'Mostly clear',
								icon: images['mostlyclearnight.png'],
							});
						}
						break;
					case 2:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Partly cloudy',
								icon: images['partycloudyday.png'],
							});
						} else {
							setWeatherCode({
								text: 'Partly cloudy',
								icon: images['partycloudynight.png'],
							});
						}
						break;
					case 3:
						setWeatherCode({
							text: 'Overcast',
							icon: images['overcast.png'],
						});
						break;
					case 45:
					case 48:
						setWeatherCode({
							text: 'Fog',
							icon: images['fog.png'],
						});
						break;
					case 51:
					case 53:
					case 55:
					case 56:
					case 57:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Drizzle',
								icon: images['drizzleday.png'],
							});
						} else {
							setWeatherCode({
								text: 'Drizzle',
								icon: images['drizzlenight.png'],
							});
						}
						break;
					case 61:
					case 63:
					case 65:
					case 66:
					case 67:
						setWeatherCode({
							text: 'Rain',
							icon: images['rain.png'],
						});
						break;
					case 71:
					case 73:
					case 75:
					case 77:
						setWeatherCode({
							text: 'Snow',
							icon: images['snow.png'],
						});
						break;
					case 80:
					case 81:
					case 82:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Rain showers',
								icon: images['rainshowersday.png'],
							});
						} else {
							setWeatherCode({
								text: 'Rain showers',
								icon: images['rainshowersnight.png'],
							});
						}
						break;
					case 85:
					case 86:
						if (currentTime < sunrise || currentTime > sunset) {
							setWeatherCode({
								text: 'Snow showers',
								icon: images['snowshowersday.png'],
							});
						} else {
							setWeatherCode({
								text: 'Snow showers',
								icon: images['snowshowersnight.png'],
							});
						}
						break;
					case 95:
					case 96:
					case 99:
						setWeatherCode({
							text: 'Thunderstorm',
							icon: images['thunderstorm'],
						});
						break;
					default:
						break;
				}
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className='dashboard'>
			<Search
				handleSearch={handleSearch}
				handleQueryReq={handleQueryReq}
				history={history}
			/>
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
						<DailyForecast forecast={weatherData.data} />
					</>
				)}
			</section>
		</div>
	);
}
