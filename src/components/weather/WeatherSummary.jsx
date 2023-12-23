import './weatherSummary.css';
import { getWeatherDescription } from '../../utils/weather-info';

export default function WeatherSummary(props) {

    return (
        <>
            <div className='weather-summary bg-secondary text-light'>
                <h3 className='current-location'>{props.location}</h3>
                <div className=''>
                    <p className='current-time'>Currently</p>
                    <p className='current-description'>{getWeatherDescription(props.weatherData.weatherCode)}</p>
                    {/* <img src={} alt={getWeatherDescription(props.weatherData.weatherCode)} /> */}
                    <p className='current-temp'>{props.weatherData.temperature} &#176;C</p>
                    <p className='current-feelslike'>Feels like {props.weatherData.feelslike}&#176;C</p>
                    <p className='current-humidity'>Humidity: {props.weatherData.humidity}%</p>
                    <p>Wind Speed: {props.weatherData.windSpeed}mph</p>
                </div>
            </div>
        </>
    )
}