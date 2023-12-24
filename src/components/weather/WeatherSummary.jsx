import './weatherSummary.css';

export default function WeatherSummary(props) {

    return (
        <>
            {/* <div className='weather-summary bg-secondary text-light'>
                <h3 className='current-location'>{props.location}</h3>
                <p className='current-time'>Currently</p> 
                                   

                
                

                <div className='current-detail-stats'>
                    
                    
                    
                </div>
            </div> */}
            <div className='weather-summary bg-secondary text-light'>
                <h3 className='current-location'>{props.location}</h3>
                {/* <p className='current-time'>Currently</p>  */}
                <p className='current-temp'>{props.weatherData.temperature} &#176;C</p>
                <img className='weather-icon' src={new URL(`../../assets/weather-icons/animated/cloudy-1-day.svg`, import.meta.url).href} alt={props.weatherData.description} />
                <p className='current-description'>{props.weatherData.description}</p>
                {/* <p className='current-description'>{getWeatherDescription(props.weatherData.weatherCode)}</p> */}
                <p className='current-feelslike'>Feels like {props.weatherData.feelslike}&#176;C</p>
                <p className='current-humidity'>Humidity: {props.weatherData.humidity}%</p>
                <p className='current-windspeed'>Wind Speed: {props.weatherData.windSpeed}mph</p>
                {/* Would need to calculate degrees to approximate direction. */}
                <p className='current-winddirection'>Wind Direction: 95&#176; (East)</p> 
            </div>
        </>
    )
}