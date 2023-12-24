import './aboutPage.css';

export default function AboutPage() {

  return (
    <>
      <div className='aboutpage page bg-light text-dark'>
        <h1>About</h1>
        <p>This is a non-commercial project which is currently still under development.</p>
        
        <p>Designed to be a user-friendly web app that provides location-based weather forecasting by searching for a full/partial address - the app will return weather for the closest match.</p>
        <p>This app has a backend API server built in node.js which fetches geocoding data from <a href="https://www.mapbox.com/">mapbox.com</a> and subsequently the weather data for this location from <a href="https://open-meteo.com/">open-meteo.com</a>.</p>
      </div>
    </>
  )
}