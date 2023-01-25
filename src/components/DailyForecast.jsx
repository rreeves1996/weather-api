import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { SlCalender } from 'react-icons/sl';
import ForecastDay from './cards/ForecastDay';

export default function DailyForecast({ forecast }) {
	const [loading, setLoading] = useState(true);
	const [days, setDays] = useState([]);

	console.log(forecast);
	useEffect(() => {
		setDays((prevState) => []);
		// Create an array with objects for forecasting next 5 days
		for (let i = 2; i < 7; i++) {
			setDays((days) => [
				...days,
				{
					high: forecast.daily.temperature_2m_max[i],
					low: forecast.daily.temperature_2m_min[i],
					date: dayjs().day(i).format('MMM D YYYY'),
					day: dayjs().day(i).format('dddd'),
					weather: forecast.daily.weathercode[i],
				},
			]);
		}

		setLoading(false);
	}, [forecast]);

	return (
		<section className='daily container'>
			<h3>
				<SlCalender className='calender' /> Next 5 Days
			</h3>
			<div className='forecast-container'>
				{loading ? (
					<></>
				) : (
					<>
						{days.map((day) => (
							<ForecastDay
								key={uuidv4()}
								high={day.high}
								low={day.low}
								date={day.date}
								day={day.day}
								weathercode={day.weather}
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
}
