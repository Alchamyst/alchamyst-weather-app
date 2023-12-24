import './weatherSummary.css';

export default function WeatherSummary(props) {

    return (
        <>
            <div className='weather-summary bg-secondary text-light'>
                <h3 className='current-location'>{props.location}</h3>
                {/* <p className='current-time'>{props.weatherData.time}</p>  */}
                <p className='current-temp'>{props.weatherData.temperature} &#176;C</p>
                <img className='weather-icon' src={new URL(`../../assets/weather-icons/animated/${props.weatherData.icon}.svg`, import.meta.url).href} alt={props.weatherData.description} />
                <p className='current-description'>{props.weatherData.description}</p>
                {/* <p className='current-description'>{getWeatherDescription(props.weatherData.weatherCode)}</p> */}
                <p className='current-feelslike'>Feels like {props.weatherData.feelslike}&#176;C</p>
                <p className='current-humidity'>Humidity: {props.weatherData.humidity}%</p>
                <p className='current-windspeed'>Wind Speed: {props.weatherData.windSpeed}mph</p>
                {/* Would need to calculate degrees to approximate direction. */}
                <p className='current-winddirection'>Wind Direction: {props.weatherData.windDirection}&#176; ({props.weatherData.compassWindDirection})</p> 
            </div>
        </>
    )
}