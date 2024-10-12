'use server'
import OpenWeatherAPI from 'openweather-api-node';

export const getCurrent = async() => {
	const weather = new OpenWeatherAPI({
		key: process.env.OPENWEATHER_API_KEY as string,
		coordinates: {
			lat: 43.649349,
			lon: -79.420790
		},
		units: "metric"
	})
	const curWeather = await weather.getCurrent()
	// curWeather.
	return curWeather
}
