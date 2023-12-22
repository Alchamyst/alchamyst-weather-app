import './weather.css';

export default function WeatherSummary(props) {

    return (
        <>
            <div className='weather-summary bg-secondary text-light'>
                <h3>{props.currentWeather.location}</h3>
                <div className=''>
                    <h4>Now</h4>
                    <p className='current-temp'>{props.currentWeather.temperature} &#176;C</p>
                    <p className='current-feelslike'>Feels like {props.currentWeather.feelsLike} &#176;C</p>
                </div>
                <p>{props.currentWeather.description}</p>
                {/* <p>Temperature: {props.currentWeather.temperature} &#176;C</p> */}
                <p>Feels Like:  &#176;C</p>
                <p>Wind Speed: {props.currentWeather.windSpeed} mph</p>
                <p>Precipitation: {props.currentWeather.precip} mm</p>
                <p>Observed at {props.currentWeather.observationTime}</p>
            </div>
        </>
    )
}