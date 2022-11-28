import React, { useEffect, useState } from 'react';
import '../../assets/style/card.css';

export default function ForecastDay({ high, low, date, weathercode }) {
	const [weatherCodeData, setWeatherCodeData] = useState({});
	const dateSplit = date.split('-');
	const formattedDate = `${dateSplit[1]}/${dateSplit[2]}`;

	// console.log(data);
	// useEffect(() => {
	// 	switch (weathercode) {
	// 		case 0:
	// 			setWeatherCodeData({
	// 				text: 'Clear skies',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/c01d.png',
	// 			});
	// 			break;

	// 		case 1:
	// 			setWeatherCodeData({
	// 				text: 'Mostly clear',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/c02d.png',
	// 			});
	// 			break;

	// 		case 2:
	// 			setWeatherCodeData({
	// 				text: 'Partly cloudy',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/c03d.png',
	// 			});
	// 			break;

	// 		case 3:
	// 			setWeatherCodeData({
	// 				text: 'Overcast',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/c04d.png',
	// 			});
	// 			break;
	// 		case (45, 48):
	// 			setWeatherCodeData({
	// 				text: 'Fog',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/a05d.png',
	// 			});
	// 			break;
	// 		case (51, 53, 55, 56, 57):
	// 			setWeatherCodeData({
	// 				text: 'Drizzle',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/a05d.png',
	// 			});
	// 			break;
	// 		case (61, 63, 65, 66, 67):
	// 			setWeatherCodeData({
	// 				text: 'Rain',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/r01d.png',
	// 			});
	// 			break;
	// 		case (71, 73, 75, 77):
	// 			setWeatherCodeData({
	// 				text: 'Snow',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/s02d.png',
	// 			});
	// 			break;
	// 		case (80, 81, 82):
	// 			setWeatherCodeData({
	// 				text: 'Rain showers',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/r05d.png',
	// 			});
	// 			break;
	// 		case (85, 86):
	// 			setWeatherCodeData({
	// 				text: 'Snow showers',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/s01d.png',
	// 			});
	// 			break;
	// 		case (95, 96, 99):
	// 			setWeatherCodeData({
	// 				text: 'Thunderstorm',
	// 				icon: 'https://www.weatherbit.io/static/img/icons/t04d.png',
	// 			});
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// }, []);

	return (
		<>
			<div className='forecast-card'>
				<h4>{formattedDate}</h4>
				{/* <img
					src={weatherCodeData.icon}
					alt='forecast-icon'
					className='forecast-icon'
				/>
				<h6>{weatherCodeData.text}</h6> */}
				<section className='high-low'>
					<div className='high'></div>
				</section>
			</div>
		</>
	);
}
