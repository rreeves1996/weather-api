import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';

export default function CurrentForecast(props) {
	const [uvColor, setUvColor] = useState('');
	const currentWeather = props.current;
	const currentLocation = props.location;
	const currentCondition = currentWeather.condition;

	useEffect(() => {
		if (currentWeather.uv > 1) {
			setUvColor('orange');
		} else if (currentWeather.uv > 3) {
			setUvColor('red');
		} else if (currentWeather.uv === 1) {
			setUvColor('green');
		}
	}, []);
	return (
		<section className='current'>
			{!currentWeather || !currentLocation ? (
				<section className='dashboard-header container'>
					<h1>No data - try searching</h1>
				</section>
			) : (
				<>
					<section className='dashboard-header container'>
						<header>
							<h1>
								<strong>{props.location.name}</strong>{' '}
							</h1>
							<h4 className='region'>{props.location.region}</h4>
						</header>
						<div className='sub-header'>
							<h6>
								<img src={currentCondition.icon} alt='weather-icon' />{' '}
								{currentCondition.text}
							</h6>
							<p>
								It is currently{' '}
								{currentLocation.country === 'United States of America' ? (
									<>
										<strong>{currentWeather.temp_f}°</strong> (F)
									</>
								) : (
									<>
										<strong>{currentWeather.temp_c}°</strong> (C)
									</>
								)}{' '}
								and <strong>{currentCondition.text}</strong> with{' '}
								<strong>{currentWeather.humidity}%</strong> humidity.
							</p>
							<div className='extra-stats'>
								<span>
									<MdChevronRight />
									Feels like:{' '}
									{currentLocation.country === 'United States of America' ? (
										<>
											<strong>{currentWeather.feelslike_f}°</strong> (F)
										</>
									) : (
										<>
											<strong>{currentWeather.feelslike_c}°</strong> (C)
										</>
									)}
								</span>
								<span>
									<MdChevronRight />
									Wind:{' '}
									{currentLocation.country === 'United States of America' ? (
										<>
											<strong>{currentWeather.wind_mph}/mph</strong>
										</>
									) : (
										<>
											<strong>{currentWeather.wind_kph}/kph</strong>
										</>
									)}
								</span>
								<span>
									<MdChevronRight />
									Direction: <strong>{currentWeather.wind_dir}</strong>
								</span>
								<span>
									<MdChevronRight />
									UV Index:{' '}
									<strong
										style={{
											backgroundColor: uvColor,
											padding: '0 4px',
										}}>
										{currentWeather.uv}
									</strong>
								</span>
							</div>
						</div>
					</section>
				</>
			)}
		</section>
	);
}
