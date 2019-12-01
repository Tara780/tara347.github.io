// Pull current weather data from OpenWeather API
const currentAPI = 'https://api.openweathermap.org/data/2.5/weather?id=5607916&APPID=c6debd9d9914f38a4a730ac064c0c641&units=imperial';

fetch(currentAPI)
  .then((response) => response.json())
  .then((jsObject) => {

    // Post current condition
    let condition = jsObject.weather[0].main;
    document.getElementById('currentcondition').textContent = condition;

    // Post current temperature
    let temp = Math.round(jsObject.main.temp);
    document.getElementById('currenttemp').textContent = temp;

    // Post current humidity
    let humidity = jsObject.main.humidity;
    document.getElementById('humidity').textContent = humidity;

    // Post current wind speed
    let windSpeed = Math.round(jsObject.wind.speed);
    document.getElementById('windspeed').textContent = windSpeed;

    // Calculate and display the Wind Chill Factor
    let speedFactor = Math.pow(windSpeed, 0.16);
    let windChill = Math.round(35.74 + (0.6215 * temp) - 
                    (35.75 * speedFactor) + 
                    (0.4275 * temp * speedFactor));;

    if (temp <= 50 && windSpeed >= 3) {
      document.getElementById("windchill").innerHTML = windChill;
    }
    else {
      document.getElementById("windchilllabel").innerHTML = "N/A";
    }
    
  
  });


// Pull forecast weather data from OpenWeather API
const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?id=5607916&APPID=c6debd9d9914f38a4a730ac064c0c641&units=imperial';

fetch(forecastAPI)
  .then((response) => response.json())
  .then((jsObject) => {

    var i = 0;
    var j = 0;

    // Loop through forecast data and only pull the first 5 records at 18:00:00
    while (i < 40 && j < 5)
    {
      var time = jsObject.list[i].dt_txt;
      if (time.includes('18:00:00')) {

        // Pull the date and post it in a short weekday format
        let date = new Date(time);
        let weekdayOption = { weekday: 'short' };
        let weekday = date.toLocaleDateString('en-US', weekdayOption);
        let labelId = 'label' + j;
        document.getElementById(labelId).textContent = weekday;

        // Post the weather icon
        let icon = 'https://openweathermap.org/img/w/' + jsObject.list[i].weather[0].icon + '.png';
        let description = jsObject.list[i].weather[0].description;
        let imageId = 'image' + j;
        document.getElementById(imageId).setAttribute('src', icon); 
        document.getElementById(imageId).setAttribute('alt', description); 

        // Post the temperature
        let temp = Math.round(jsObject.list[i].main.temp);
        let tempId = 'temp' + j;
        document.getElementById(tempId).textContent = temp;

        j++;
      }
    
      i++;
    }

  });

// Pull town events data from JSON file
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];

    for (let i = 0; i < towns.length; i++ ) {
      if (towns[i].name == "Soda Springs") {
        
        // Create an unordered list
        let list = document.createElement('ul'); 

        // Create a list item for each event
        for (let j = 0; j < towns[i].events.length; j++) {
          let item = document.createElement('li');
          item.textContent = towns[i].events[j];
          list.appendChild(item);
        } 

        document.querySelector('div.events').appendChild(list); 
      } 
    } 
  });