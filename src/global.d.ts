type ResponseData = {
	data: {
		hourly: {
			time: string[];
			temperature_2m: number[];
			weathercode: number[];
			relativehumidity_2m: number[];
			apparent_temperature: number[];
			windspeed_80m: number[];
		};
		daily: {
			time: string[];
			temperature_2m_min: number[];
			temperature_2m_max: number[];
			weathercode: number[];
			precipitation_sum: number[];
		};
		current_weather: {
			winddirection: number;
			temperature: number;
		};
	};
};

type WeatherData = ResponseData & {
	current: {
		time: string;
		city: string;
		state: string;
	};
	weathercode?: {
		icon?: any;
		text?: string;
	};
};

type Day = {
	high: number;
	low: number;
	date: string;
	day: string;
	weathercode: number;
};
