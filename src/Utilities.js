async function fetchWeatherData({lat, long}) {
    const requestUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,wind_speed_10m&timezone=auto`;
    const response = await fetch(requestUrl);
    const dataObj = await response.json();
    return dataObj;
}

export {
    fetchWeatherData
}