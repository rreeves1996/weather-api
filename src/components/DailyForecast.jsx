import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SlCalender } from 'react-icons/sl';
import ForecastDay from './cards/ForecastDay';

export default function DailyForecast({ forecast }) {
	const [loading, setLoading] = useState(true);
	const [days, setDays] = useState([]);

	useEffect(() => {
		// Create an array with objects for forecasting next 5 days
		for (let i = 1; i < 6; i++) {
			setDays((days) => [
				...days,
				{
					high: forecast.temperature_2m_max[i],
					low: forecast.temperature_2m_min[i],
					date: forecast.time[i],
					weather: forecast.weathercode[i],
				},
			]);
		}
		setLoading(false);
	}, []);

	return (
		<section className='daily container'>
			<h3>
				<SlCalender className='calender' /> Next 5 Days
			</h3>
			<div className='forecast-container'>
				{loading ? (
					<>
						<h1>Loading</h1>
					</>
				) : (
					<>
						{days.map((day) => (
							<ForecastDay
								key={uuidv4()}
								high={day.high}
								low={day.low}
								date={day.date}
								weathercode={day.weather}
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
}
