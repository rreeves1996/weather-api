import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SlCalender } from 'react-icons/sl';
import ForecastDay from './cards/ForecastDay';

export default function DailyForecast({ forecast }) {
	return (
		<section className='daily container'>
			<h3>
				<SlCalender className='calender' /> Next 5 Days
			</h3>
			<div className='forecast-container'>
				{forecast.map((day) => (
					<ForecastDay key={uuidv4()} day={day.day} date={day.date} />
				))}
			</div>
		</section>
	);
}
