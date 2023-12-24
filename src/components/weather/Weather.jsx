import moment from 'moment';
import { useState } from 'react';
import WeatherSummary from './WeatherSummary';
import WeatherForecast from './WeatherForecast';
import { getCompassDirection, getWeatherDescription, getWeatherIcon  } from '../../utils/weatherInfo';
import './weather.css';

export default function Weather (props) {
    const [locationInput, setLocationInput] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [searchLocation, setSearchLocation] = useState(undefined);
    const [weatherData, setWeatherData] = useState(undefined); 

    const handleGetWeather = () => {
        getLocation(locationInput)
            .then(async (location) => {

                if(location.error) {
                    console.log(location.error);
                    setErrorMessage('An error occured fetching location data.');
                    return setWeatherData(undefined);
                }

                const fetchedWeather = await getWeather(location.longitude, location.latitude)
                const locationData = {
                    longitude: location.longitude,
                    latitude: location.latitude,
                    name: location.location
                };
                setSearchLocation(locationData);  
                setWeatherData(formatForecastData(fetchedWeather.forecastData));
            })
            .catch(error => console.log(error));
    }

    const getLocation = (locationQuery) => {
        const searchUrl = `/api/location?address=${locationQuery}`;

        return fetch(searchUrl)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .catch(error => {
                console.log(error);
                setErrorMessage('An error occured fetching location data.');
                setWeatherData(undefined);
            });
    }

    const getWeather = async (longitude, latitude) => {
        const weatherUrl = `/api/weather?longitude=${longitude}&latitude=${latitude}`;

            return fetch(weatherUrl)
                .then((response) => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .catch(error => {
                    console.log(error);
                    setErrorMessage('An error occured fetching weather data.');
                    setWeatherData(undefined);
                });
    }  

    const formatForecastData = (weatherData) => {
        const formattedForecast = {...weatherData};

        if(formattedForecast.current && formattedForecast.current.time !== undefined) {
            formattedForecast.current.time = moment(formattedForecast.current.time).format('h:mm a');
        }

        if(formattedForecast.forecast && formattedForecast.forecast.hours !== undefined) {
            formattedForecast.forecast.hours = formattedForecast.forecast.hours.map((time) => {
                return moment(time).format('h:mm a');
            });
        }
        if(formattedForecast.current && formattedForecast.current.weatherCode !== undefined){
            formattedForecast.current.description = getWeatherDescription(formattedForecast.current.weatherCode);
            formattedForecast.current.icon = getWeatherIcon(formattedForecast.current.weatherCode, formattedForecast.current.isDay);
            formattedForecast.current.compassWindDirection = getCompassDirection(formattedForecast.current.windDirection);
        }

        if(formattedForecast.forecast && formattedForecast.forecast.weatherCode !== undefined){
            formattedForecast.forecast.description = formattedForecast.forecast.weatherCode.map((weatherCode) => {
                return getWeatherDescription(weatherCode);
            });
            formattedForecast.forecast.icon = formattedForecast.forecast.weatherCode.map((weatherCode, index) => {
                return getWeatherIcon(weatherCode, formattedForecast.forecast.isDay[index]);
            });
        }
        return formattedForecast
    }


    return (
        <>
            <p>Enter a city name, address or post/zip code below to get the weather.</p>
            <div className='weather-search'>
                <input className='input-location'  type='text' name='location' id='location' placeholder='Enter Search Location' value={locationInput} onChange={ (e) => setLocationInput(e.target.value)} onKeyDown={(event) => {if(event.key === "Enter") handleGetWeather()}}/>
                <button className='btn-search bg-secondary text-light' onClick={() => handleGetWeather()}>Get Weather</button>
                {errorMessage && <p className='error-msg'>{errorMessage}</p>}
            </div>
            <div className='weather-results'>
                {searchLocation && <WeatherSummary location={searchLocation.name} weatherData={weatherData.current} />}
                {/* {searchLocation && <WeatherForecast weatherData={weatherData.forecast} />} */}
            </div>


        </>
    )
}