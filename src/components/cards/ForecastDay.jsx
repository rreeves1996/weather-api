import React, { useEffect, useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiWaterDrop } from 'react-icons/gi';
import { RiSunFill } from 'react-icons/ri';
import { BsCloudFill, BsCloudFogFill, BsSnow } from 'react-icons/bs';

const images = importAll(
	require.context('../../assets/icons', false, /\.(png)$/)
);

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

export default function ForecastDay({ high, low, date, day, weathercode }) {
	const [loading, setLoading] = useState(true);
	const [weatherCodeData, setWeatherCodeData] = useState({});
	const dateSplit = date.split(' ');
	const formattedDate = `${dateSplit[0]}. ${dateSplit[1]}, ${dateSplit[2]}`;
	const formattedHigh = JSON.stringify(high).split('.');
	const formattedLow = JSON.stringify(low).split('.');

	useEffect(() => {
		const getWeatherCodeData = () => {
			switch (weathercode) {
				case 0:
					setWeatherCodeData({
						text: 'Clear',
						icon: images['clearday.png'],
					});
					break;
				case 1:
					setWeatherCodeData({
						text: 'Clear',
						icon: images['mostlyclearday.png'],
					});
					break;
				case 2:
					setWeatherCodeData({
						text: 'Cloudy',
						icon: images['partycloudyday.png'],
					});
					break;
				case 3:
					setWeatherCodeData({
						text: 'Cloudy',
						icon: images['overcast.png'],
					});
					break;
				case 45:
				case 48:
					setWeatherCodeData({
						text: 'Fog',
						icon: images['fog.png'],
					});
					break;
				case 51:
				case 53:
				case 55:
				case 56:
				case 57:
					setWeatherCodeData({
						text: 'Drizzle',
						icon: images['drizzleday.png'],
					});
					break;
				case 61:
				case 63:
				case 65:
				case 66:
				case 67:
					setWeatherCodeData({
						text: `Rain`,
						icon: images['rain.png'],
					});
					break;
				case 71:
				case 73:
				case 75:
				case 77:
					setWeatherCodeData({
						text: 'Snow',
						icon: images['snow.png'],
					});
					break;
				case 80:
				case 81:
				case 82:
					setWeatherCodeData({
						text: 'Rain',
						icon: images['rainshowersday.png'],
					});
					break;
				case 85:
				case 86:
					setWeatherCodeData({
						text: 'Snow',
						icon: images['snowshowersday.png'],
					});
					break;
				case 95:
				case 96:
				case 99:
					setWeatherCodeData({
						text: 'Thunder',
						icon: images['thunderstorm'],
					});
					break;
				default:
					setWeatherCodeData({
						text: 'null',
						icon: 'null',
					});
					break;
			}
			setLoading(false);
		};

		getWeatherCodeData();
	}, []);

	const renderIcon = (text) => {
		if (text === 'Clear') {
			return <RiSunFill className='forecast-mini-icon' />;
		} else if (text === 'Cloudy') {
			return <BsCloudFill className='forecast-mini-icon' />;
		} else if (text === 'Fog') {
			return <BsCloudFogFill className='forecast-mini-icon' />;
		} else if (text === 'Thunder') {
			return <AiFillThunderbolt className='forecast-mini-icon' />;
		} else if (text === 'Snow') {
			return <BsSnow className='forecast-mini-icon' />;
		} else if (text === 'Rain' || text === 'Drizzle') {
			return <GiWaterDrop className='forecast-mini-icon' />;
		}
	};

	if (loading) {
		return <></>;
	} else {
		return (
			<>
				<div className='forecast-card'>
					<h4 className='forecast-card-header'>{formattedDate}</h4>
					<div className='forecast-card-body'>
						<div className='forecast-weekday'>
							<h4 className='weekday'>{day}</h4>
						</div>
						<div className='forecast-body-right'>
							<img
								src={weatherCodeData.icon}
								alt='forecast-icon'
								className='forecast-icon'
							/>
							<h6 className='forecast'>
								<span>{renderIcon(weatherCodeData.text)}</span>
								{weatherCodeData.text}
							</h6>
							<section className='high-low'>
								<div className='high'>
									<div className='left-col'>
										<p>High</p>
										<div className='low'>
											<p>Lo</p>
											<h6>
												<strong>{formattedLow[0]}</strong>°
											</h6>
										</div>
									</div>

									<h6>
										<strong>{formattedHigh[0]}</strong>°
									</h6>
								</div>
							</section>
						</div>
					</div>
				</div>
			</>
		);
	}
}
