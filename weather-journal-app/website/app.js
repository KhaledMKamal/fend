/* Global Variables */
// rest of the WeatherUrl lat={lat}&lon={lon}&appid={API key}
// rest of the GeoUrl q={city name},{state code},{country code}&appid={API key}
const geoUrl = "https://api.openweathermap.org/geo/1.0/direct?";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "a6f2fa12c347834e63852c0f2f1f8d77";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//create a get function for the geolocation api
const getGeo = async (baseUrl, key, city) => {
    const res = await fetch(`${baseUrl}q=${city}&appid=${key}`);
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
// create a get function for the open weather map api
const getWeather = async (baseUrl, key, lon, lat) => {
    const res = await fetch(`${baseUrl}lat=${lat}&lon=${lon}&appid=${key}`);
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
// create a generate function for the page
const generate = async () => {
    const city = document.getElementById('city').value;
    const data = await getGeo(geoUrl, apiKey, city) .then((data) => {
        const lon = data[0].lon;
        const lat = data[0].lat;
        return getWeather(weatherUrl, apiKey, lon, lat);
    })
}    


