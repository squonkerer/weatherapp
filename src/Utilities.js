const opencage = require('opencage-api-client');

async function fetchWeatherData({ lat, long }) {
    const requestUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,wind_speed_10m&timezone=auto`;
    const response = await fetch(requestUrl);
    if(!response.ok){
        console.log('Bad request')
        throw new Error('Bad request')
    }
    const dataObj = await response.json();
    return dataObj;
}

async function getAdressLocation(cityName) {
    return opencage
        .geocode({ q: cityName, key: '04759534a0074398a15d837635c75ba0' })
        .then((data) => {
            return data.results[0].geometry;
        })
        .catch((error) => {
            console.log('error', error.message);
        });


}
export {
    fetchWeatherData,
    getAdressLocation
}