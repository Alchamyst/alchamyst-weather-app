import './weatherSummary.css';

export default function WeatherSummary(props) {

    return (
        <>
            <div className='weather-summary bg-secondary text-light'>
                <h3 className='current-location'>{props.currentWeather.location}</h3>
                <div className=''>
                    <p className='current-time'>Currently</p>
                    <p>{props.currentWeather.description}</p>
                    <p>A weather icon.</p>
                    <p className='current-temp'>{props.currentWeather.temperature} &#176;C</p>
                    <p className='current-feelslike'>Feels like {props.currentWeather.feelsLike}&#176;C</p>
                    <p className='current-humidity'>Humidity: x%</p>
                </div>
            </div>
        </>
    )
}