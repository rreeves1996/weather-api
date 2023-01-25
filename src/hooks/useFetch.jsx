import React from 'react';
import axios from 'axios';

export default function useFetch() {
	const fetchCoordinates = async (params) => {
		try {
			const res = await axios.get(
				// Geolocater gets the requested city's latitude and longitude
				`https://geocoding-api.open-meteo.com/v1/search?name=${params}`
			);
			console.log(res);

			return res;
		} catch (err) {
			console.log(err);
		}
	};

	const fetchLocation = async (params) => {
		try {
			console.log(params.data.results[0].latitude);
			const lat = params.data.results[0].latitude;
			const lon = params.data.results[0].longitude;

			// Format timezone into URL friendly format
			const unformattedTime = params.data.results[0].timezone.split('/');
			const timezone = `${
				unformattedTime[0] ? unformattedTime[0] : unformattedTime
			}${unformattedTime[0] && `%2F${unformattedTime[1]}`}`;

			const res = await axios.get(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_80m,winddirection_80m,shortwave_radiation_instant&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=${timezone}`
			);

			return res;
		} catch (err) {
			console.error(`Coordinate query failed:\n${err}`);
		}
	};

	return { fetchLocation, fetchCoordinates };
}
