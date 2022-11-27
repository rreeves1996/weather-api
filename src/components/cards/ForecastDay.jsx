import React from 'react';
import '../../assets/style/card.css';

export default function ForecastDay({ day, date }) {
	const dateSplit = date.split('-');
	const formattedDate = `${dateSplit[1]}/${dateSplit[2]}`;

	console.log(day);
	return (
		<>
			<div className='forecast-card'>
				<h4>{formattedDate}</h4>
				<img
					src={day.condition.icon}
					alt='forecast-icon'
					className='forecast-icon'
				/>
				<h6>{day.condition.text}</h6>
				<div className='high-low'>
					<span>Hi</span>
				</div>
			</div>
		</>
	);
}
