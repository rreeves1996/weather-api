import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

export default function CurrentForecast({ data, current, weatherCode }) {
	const [loading, setLoading] = useState(true);
	const [hourlyData, setHourlyData] = useState([]);
	const [windDirection, setWindDirection] = useState();
	const [hourlyIndex, setHourlyIndex] = useState();
	const [dayIndex, setDayIndex] = useState();

	useEffect(() => {
		if (data) {
			const daily = data.daily.time.indexOf(current.time.slice(0, 10));
			const hourly = data.hourly.time.indexOf(current.time);
			setDayIndex(daily);
			setHourlyIndex(hourly);
			// Logic to set wind direction
			const direction = data.current_weather.winddirection;

			if (direction < 25) {
				setWindDirection('N');
			} else if (direction < 70) {
				setWindDirection('NE');
			} else if (direction < 115) {
				setWindDirection('E');
			} else if (direction < 160) {
				setWindDirection('SE');
			} else if (direction < 205) {
				setWindDirection('S');
			} else if (direction < 250) {
				setWindDirection('SW');
			} else if (direction < 295) {
				setWindDirection('W');
			} else if (direction < 340) {
				setWindDirection('NW');
			} else {
				setWindDirection('N');
			}

			for (let i = 1; i < 13; i++) {
				setHourlyData((hourlyData) => [
					...hourlyData,
					{
						time: data.hourly.time[hourly + i].slice(11, 13),
						weathercode: data.hourly.weathercode[hourly + i],
					},
				]);
			}
		}

		setLoading(false);
	}, [data]);

	if (loading) {
		return <h1>Loading</h1>;
	} else {
		return (
			<section className='current'>
				{!current ? (
					<section className='dashboard-header container'>
						<h1>No data - try searching</h1>
					</section>
				) : (
					<>
						<section className='dashboard-header container'>
							<header>
								<h1>
									<strong>{current.city}</strong>{' '}
								</h1>
								<h4 className='region'>{current.state}</h4>
							</header>
							<div className='sub-header'>
								<h6>
									<img
										src={weatherCode.icon}
										alt='weather-icon'
										className='weather-icon'
									/>{' '}
									{weatherCode.text}
								</h6>
								<p>
									It is currently{' '}
									<strong>{data.current_weather.temperature}°</strong> (F) with{' '}
									<strong>
										{data.hourly.relativehumidity_2m[hourlyIndex]}%
									</strong>{' '}
									humidity.
								</p>
								<div className='extra-stats'>
									<span>
										<MdChevronRight />
										Feels like:{' '}
										<strong>
											{data.hourly.apparent_temperature[hourlyIndex]}°
										</strong>{' '}
										(F)
									</span>
									<span>
										<MdChevronRight />
										Wind:{' '}
										<strong>{data.hourly.windspeed_80m[hourlyIndex]}</strong>
										/mph
									</span>
									<span>
										<MdChevronRight />
										Direction: <strong>{windDirection}</strong>
									</span>
									<span>
										<MdChevronRight />
										Precipitation total:{' '}
										<strong>
											{data.daily.precipitation_sum[dayIndex]}
										</strong>{' '}
										in.
									</span>
								</div>
							</div>
						</section>
						<section className='hourly'>
							<header>
								<h3>Hourly</h3>
								<h6 className='timezone'>Timezone:</h6>
							</header>
							<div className='hours-container'>
								{hourlyData.map((hour) => (
									<div className='hour-container' key={uuidv4()}>
										<h4 className='hour-time'></h4>
										<div className='hour-icon'></div>
										<h4 className='hour-forecast'></h4>
										<h3 className='hour-temperature'></h3>
									</div>
								))}
							</div>
						</section>
					</>
				)}
			</section>
		);
	}
}
