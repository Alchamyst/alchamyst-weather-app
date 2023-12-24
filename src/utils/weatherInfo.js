import wmoCodes from './wmoCodes.json';

export const getWeatherDescription = (weatherCode) => {
    const description = wmoCodes.description[weatherCode];
    return description;
}

export const getWeatherIcon = (weatherCode, isNight) => {
    if(isNight == false) return wmoCodes.icon_day[weatherCode];
    
    return wmoCodes.icon_night[weatherCode];
}