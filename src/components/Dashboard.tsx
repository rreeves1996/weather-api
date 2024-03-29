import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';
import Search from './Search';
import useFetch from '../hooks/useFetch';
const images = importAll(require.context('../assets/icons', false, /\.(png)$/));

function importAll(r: any) {
	let images: any = {};
	r.keys().map((item: any, index: number) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

export default function Dashboard() {
	const { fetchCoordinates, fetchLocation } = useFetch();
	const [loading, setLoading] = useState<boolean>(true);
	const [weatherData, setWeatherData] = useState<WeatherData>();
	const [weatherCode, setWeatherCode] = useState<{
		text: string;
		icon: object;
	}>();
	const [history, setHistory] = useState(() => {
		return JSON.parse(localStorage.getItem('search-history')!) || [];
	});

	const location = useLocation();

	const handleSearch = async (search: string) => {
		if (search) {
			await fetchCoordinates(search).then((res: any) => {
				const { data } = res;

				const current = {
					city: data.results[0].name,
					state: data.results[0].admin1,
					time: '',
				};

				fetchLocation(res).then((res: any) => {
					const { data } = res;

					current.time = data.current_weather.time;

					setWeatherData((prevState) => ({ current: current, data }));

					const newHistory: string[] = history.filter((item: any) => {
						return item.text !== search;
					});

					if (history.length > 5) {
						newHistory.pop();

						setHistory(() => [
							{
								id: uuidv4(),
								text: search,
							},
							...newHistory,
						]);
					} else {
						setHistory(() => [
							{
								id: uuidv4(),
								text: search,
							},
							...newHistory,
						]);
					}
				});
			});
		}
	};

	const handleQueryReq = async (query: string) => {
		if (query) {
			await fetchCoordinates(query).then((res: any) => {
				const { data } = res;

				const current = {
					city: data.results[0].name,
					state: data.results[0].admin1,
					time: '',
				};
				fetchLocation(res).then((res: any) => {
					const { data } = res;

					current.time = data.current_weather.time;

					setWeatherData(() => ({ current: current, data: res.data }));

					const newHistory = history.filter((item: any) => {
						return item.text !== query;
					});

					if (history.length > 5) {
						newHistory.pop();
						console.log(newHistory);
						setHistory(() => [
							{
								id: uuidv4(),
								text: query,
							},
							...newHistory,
						]);
					} else {
						setHistory(() => [
							{
								id: uuidv4(),
								text: query,
							},
							...newHistory,
						]);
					}
				});
			});
		}
	};

	useEffect(() => {
		const fetchData = () => {
			history &&
				localStorage.setItem('search-history', JSON.stringify(history));

			if (!weatherData) {
				setWeatherData(location.state);
				console.log(location.state);

				const newHistory = history.filter((item: any) => {
					return item.text !== location.state.current.city;
				});
				console.log(weatherData);

				if (history.length > 5) {
					newHistory.pop();
					console.log(newHistory);
					setHistory(() => [
						{
							id: uuidv4(),
							text: location.state.current.city,
						},
						...newHistory,
					]);
				} else {
					setHistory(() => [
						{
							id: uuidv4(),
							text: location.state.current.city,
						},
						...newHistory,
					]);
				}

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

				// Based on weathercode, set proper weather icon and text
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
	}, [weatherData]);

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
							data={weatherData!.data}
							current={weatherData!.current}
							weathercode={weatherCode}
						/>
						<DailyForecast data={weatherData!.data} />
					</>
				)}
			</section>
		</div>
	);
}
