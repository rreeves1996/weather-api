import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { SlCalender } from 'react-icons/sl';
import ForecastDay from './cards/ForecastDay';

interface DailyForecastProps extends ResponseData {}

export default function DailyForecast({ data }: DailyForecastProps) {
	const [loading, setLoading] = useState<boolean>(true);
	const [days, setDays] = useState<object[]>([]);

	useEffect(() => {
		setDays((prevState) => []);

		// Create an array with objects for forecasting next 5 days
		for (let i = 2; i < 7; i++) {
			setDays((days) => [
				...days,
				{
					high: data.daily.temperature_2m_max[i],
					low: data.daily.temperature_2m_min[i],
					date: dayjs().day(i).format('MMM D YYYY'),
					day: dayjs().day(i).format('dddd'),
					weather: data.daily.weathercode[i],
				},
			]);
		}

		setLoading(false);
	}, [data]);

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
						{days.map((day: any) => (
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
