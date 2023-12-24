import wmoCodes from './wmoCodes.json';

export const getWeatherDescription = (weatherCode) => {
    const description = wmoCodes.description[weatherCode];
    return description;
}

export const getWeatherIcon = (weatherCode, isDayTime) => {

    // const hours = new Date("2023-12-24T03:30").getHours();
    // const isDayTime = hours > 6 && hours < 20;
    return isDayTime ?  wmoCodes.icon_day[weatherCode] : wmoCodes.icon_night[weatherCode];
}

export const getCompassDirection = (degrees) => {

    if (degrees < 0 || degrees >= 360) {
        throw new Error('Wind direction must be within the range 0 to 360 degrees.');
    }

    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];

    const index = Math.round(degrees / 22.5) % 16;

    return directions[index];
};