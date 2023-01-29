import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const images = importAll(require.context('../assets/icons', false, /\.(png)$/));

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

export default function CurrentForecast({ data, current, weathercode }) {
	const [loading, setLoading] = useState(true);
	const [hourlyData, setHourlyData] = useState([]);
	const [windDirection, setWindDirection] = useState();
	const [hourlyIndex, setHourlyIndex] = useState();
	const [dayIndex, setDayIndex] = useState();

	useEffect(() => {
		if (data) {
			setHourlyData((prevState) => []);
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
				let time;
				let weathercode;
				let temperature = data.hourly;
				console.log(temperature);
				data.hourly.time[hourly + i].slice(11, 13) >= 13
					? (time = `${data.hourly.time[hourly + i].slice(11, 13) - 12}pm`)
					: (time = `${data.hourly.time[hourly + i].slice(11, 13)}am`);

				if (time === '00am') {
					time = '12am';
				} else if (time === '00pm') {
					time = '12pm';
				}

				if (time.slice(0, 1) === '0') {
					time = time.slice(1, 4);
				}

				switch (data.hourly.weathercode[hourly + i]) {
					case 0:
						weathercode = {
							text: 'Clear',
							icon:
								time.slice(2, 4) === 'pm' ||
								time.slice(1, 3) === 'pm' ||
								(time.slice(1, 3) === 'am' &&
									parseInt(time.slice(0, 1)) <= 6) ||
								(time.slice(2, 4) === 'am' && parseInt(time.slice(0, 2)) === 12)
									? images['clearnight.png']
									: images['clearday.png'],
						};
						break;
					case 1:
						weathercode = {
							text: 'Clear',
							icon:
								time.slice(2, 4) === 'pm' ||
								time.slice(1, 3) === 'pm' ||
								(time.slice(1, 3) === 'am' &&
									parseInt(time.slice(0, 1)) <= 6) ||
								(time.slice(2, 4) === 'am' && parseInt(time.slice(0, 2)) === 12)
									? images['mostlyclearnight.png']
									: images['mostlyclearday.png'],
						};
						break;
					case 2:
					case 3:
						weathercode = {
							text: 'Cloudy',
							icon: images['overcast.png'],
						};
						break;
					case 45:
					case 48:
						weathercode = {
							text: 'Fog',
							icon: images['fog.png'],
						};
						break;
					case 51:
					case 53:
					case 55:
					case 56:
					case 57:
						weathercode = {
							text: 'Drizzle',
							icon:
								time.slice(2, 4) === 'pm' ||
								time.slice(1, 3) === 'pm' ||
								(time.slice(1, 3) === 'am' &&
									parseInt(time.slice(0, 1)) <= 6) ||
								(time.slice(2, 4) === 'am' && parseInt(time.slice(0, 2)) === 12)
									? images['drizzlenight.png']
									: images['drizzleday.png'],
						};
						break;
					case 61:
					case 63:
					case 65:
					case 66:
					case 67:
						weathercode = {
							text: `Rain`,
							icon: images['rain.png'],
						};
						break;
					case 71:
					case 73:
					case 75:
					case 77:
						weathercode = {
							text: 'Snow',
							icon: images['snow.png'],
						};
						break;
					case 80:
					case 81:
					case 82:
						weathercode = {
							text: 'Rain',
							icon:
								time.slice(2, 4) === 'pm' ||
								time.slice(1, 3) === 'pm' ||
								(time.slice(1, 3) === 'am' &&
									parseInt(time.slice(0, 1)) <= 6) ||
								(time.slice(2, 4) === 'am' && parseInt(time.slice(0, 2)) === 12)
									? images['rainshowersnight.png']
									: images['rainshowersday.png'],
						};
						break;
					case 85:
					case 86:
						weathercode = {
							text: 'Snow',
							icon:
								time.slice(2, 4) === 'pm' ||
								time.slice(1, 3) === 'pm' ||
								(time.slice(1, 3) === 'am' &&
									parseInt(time.slice(0, 1)) <= 6) ||
								(time.slice(2, 4) === 'am' && parseInt(time.slice(0, 2)) === 12)
									? images['snowshowersnight.png']
									: images['snowshowersday.png'],
						};
						break;
					case 95:
					case 96:
					case 99:
						weathercode = {
							text: 'Thunder',
							icon: images['thunderstorm'],
						};
						break;
					default:
						weathercode = {
							text: 'null',
							icon: 'null',
						};
						break;
				}

				console.log(data.hourly);
				setHourlyData((hourlyData) => [
					...hourlyData,
					{
						time,
						weathercode,
						temp: temperature,
					},
				]);
			}
			setLoading(false);
		}
	}, [data]);

	if (loading) {
		return <h1>Loading</h1>;
	}
	if (!current) {
		return (
			<section className='dashboard-header container'>
				<h1>No data - try searching</h1>
			</section>
		);
	}

	return (
		<section className='current'>
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
							src={weathercode.icon}
							alt='weather-icon'
							className='weather-icon'
						/>{' '}
						{weathercode.text}
					</h6>
					<p>
						It is currently <strong>{data.current_weather.temperature}°</strong>{' '}
						(F) with{' '}
						<strong>{data.hourly.relativehumidity_2m[hourlyIndex]}%</strong>{' '}
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
							Wind: <strong>{data.hourly.windspeed_80m[hourlyIndex]}</strong>
							/mph
						</span>
						<span>
							<MdChevronRight />
							Direction: <strong>{windDirection}</strong>
						</span>
						<span>
							<MdChevronRight />
							Precipitation total:{' '}
							<strong>{data.daily.precipitation_sum[dayIndex]}</strong> in.
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
							<h4 className='hour-time'>{hour.time}</h4>
							<div className='hour-icon'>
								<img
									src={hour.weathercode.icon}
									alt='weather-icon'
									className='weather-icon'
								/>
							</div>
							<h4 className='hour-forecast'>{hour.weathercode.text}</h4>
							<h3 className='hour-temperature'></h3>
						</div>
					))}
				</div>
			</section>
		</section>
	);
}
