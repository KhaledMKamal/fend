/* Global Variables */
// rest of the WeatherUrl lat={lat}&lon={lon}&appid={API key}
// rest of the GeoUrl q={city name},{state code},{country code}&appid={API key}
const geoUrl = "https://api.openweathermap.org/geo/1.0/direct?";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "a6f2fa12c347834e63852c0f2f1f8d77";

// Create a new date instance dynamically with JS
const today = new Date();

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const newDate = today.toLocaleDateString(undefined, options);
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
    const res = await fetch(`${baseUrl}lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
// create a post function for the page
const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};
// function to update the UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `${allData.date}`;
        document.getElementById('temp').innerHTML = `${allData.temp}°`;
        document.getElementById('weather').innerHTML = `🌦 ${allData.weather}`;
        document.getElementById('wind-speed').innerHTML = `💨Wind: ${allData.windSpeed} km/h`;
        document.getElementById('feeling').innerHTML = `${allData.feelings}`;
    }catch(error) {
        console.log("error", error);
    }
};
// create a generate function for the page
const generate = async () => {
  if(document.getElementById('city').value === '' || document.getElementById('feelings').value === '') {
    alert('Please enter a city name and feelings.');
    return;
  } else { const city = document.getElementById('city').value;
    const data = await getGeo(geoUrl, apiKey, city) .then( async (data) => {
      if (data.length === 0) {
        alert('Please enter a valid city name.');
        return;
      } else {
        const lon = data[0].lon;
        const lat = data[0].lat;
        const weatherData = await getWeather(weatherUrl, apiKey, lon, lat) .then((data) => {
          postData('/add', {date: newDate, temp: Math.round(data.main.temp),weather: data.weather[0].description,windSpeed: data.wind.speed, feelings: document.getElementById('feelings').value});
        }) .then (() => {
            // get the data from the server
            updateUI();
        })
      }

    })} 
};


