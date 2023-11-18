export const getCurrentWeather = (locationQuery) => {

    const url = `/api/weather?address=${locationQuery}`;
    const weatherData = fetchWeather(url);

    console.log(weatherData);
    // if (weatherData.error) return { error: weatherData.error };

    return weatherData;
      
}

const fetchWeather = (searchUrl) => {

    var apiData;

    fetch(searchUrl).then((response) => {
        response.json().then((data) => {
            console.log(data);
        })
    })
}