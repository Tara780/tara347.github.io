const requestURL = 'js/temples.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // Testing

    const temples = jsonObject['temples'];

    for (let i = 0; i < temples.length; i++ ) {
      let card = document.createElement('section');

      // Temple Name
      let nameDiv = document.createElement('div');
      nameDiv.className = 'temple-name';
      let name = document.createElement('h3');      
      name.textContent = temples[i].name;
      nameDiv.appendChild(name);
      card.appendChild(nameDiv);

      // Left Side: Temple Image
      let left = document.createElement('div');
      left.className = 'left';
      let image = document.createElement('img');
      image.setAttribute('src', "images/" + temples[i].image);
      image.setAttribute('alt', temples[i].imgdescription);
      left.appendChild(image);

      // Right Side: Temple Information
      let right = document.createElement('div');
      right.className = 'right';

      // Quadrant 1: Contact Info
      let quad1 = document.createElement('div');
      quad1.className = 'quad quad1';
      let quad1Title = document.createElement('h4');
      quad1Title.textContent = "Contact Information";
      let contact = document.createElement('p');
      contact.innerHTML = temples[i].straddress + "<br>" + 
                          temples[i].city + " " + temples[i].state + " " + temples[i].zip + "<br>" +
                          temples[i].country + "<br><br>" +
                          temples[i].phone + "<br>" +
                          temples[i].email;
      quad1.appendChild(quad1Title);
      quad1.appendChild(contact);
      right.appendChild(quad1);

      // Quadrant 2: Current Weather
      let quad2 = document.createElement('div');
      quad2.className = 'quad quad2';
      let quad2Title = document.createElement('h4');
      quad2Title.textContent = "Current Weather";
      const currentAPI = temples[i].weatherurl;
      let weather = document.createElement('ul');
      let conditionElem = document.createElement('li');
      weather.appendChild(conditionElem);
      let tempElem = document.createElement('li');
      weather.appendChild(tempElem);
      let windChillElem = document.createElement('li');
      weather.appendChild(windChillElem);
      let humidityElem = document.createElement('li');
      weather.appendChild(humidityElem);
      let windSpeedElem = document.createElement('li');
      weather.appendChild(windSpeedElem);
      fetch(currentAPI) // Pull current weather conditions from openweathermap.org
      .then((response) => response.json())
      .then((jsObject) => {
        let condition = jsObject.weather[0].main;
        conditionElem.textContent = "Conditions: " + condition; // Current condition
        let temp = Math.round(jsObject.main.temp);
        tempElem.innerHTML = "Temperature: " + temp + "&deg;F"; // Temperature
        let humidity = jsObject.main.humidity;
        humidityElem.innerHTML = "Humidity: " + humidity + "%"; // Humidity
        let windSpeed = Math.round(jsObject.wind.speed);
        windSpeedElem.innerHTML = "Wind Speed: " + windSpeed + " mph"; // Wind speed
        let speedFactor = Math.pow(windSpeed, 0.16);
        let windChill = Math.round(35.74 + (0.6215 * temp) - 
                        (35.75 * speedFactor) + 
                        (0.4275 * temp * speedFactor));;
        if (temp <= 50 && windSpeed >= 3) {
          windChillElem.innerHTML = "Wind Chill: " + windChill + "&deg;F"; // Wind chill
        }
        else {
          windChillElem.innerHTML = "Wind Chill: N/A";
        }      
      }); 
      quad2.appendChild(quad2Title);
      quad2.appendChild(weather);
      right.appendChild(quad2);

      // Quadrant 3: Services
      let quad3 = document.createElement('div');
      quad3.className = 'quad quad3';
      let quad3Title = document.createElement('h4');
      quad3Title.textContent = "Services";
      let servicesUl = document.createElement('ul');      
      for (let j = 0; j < temples[i].services.length; j++ ) {
        let servicesLi = document.createElement('li');
        servicesLi.textContent = temples[i].services[j];
        servicesUl.appendChild(servicesLi);
      }
      quad3.appendChild(quad3Title);
      quad3.appendChild(servicesUl);
      right.appendChild(quad3);

      // Quadrant 4: Schedule
      let quad4 = document.createElement('div');
      quad4.className = 'quad quad4';
      let quad4Title = document.createElement('h4');
      quad4Title.textContent = "Schedule";
      let schedule = document.createElement('p'); 
      schedule.className = 'schedule-link';
      let scheduleLink = document.createElement('a'); 
      scheduleLink.textContent = "Check ordinance schedule" 
      scheduleLink.href = temples[i].schedule;
      scheduleLink.target = "_blank";
      schedule.appendChild(scheduleLink);
      quad4.appendChild(quad4Title);
      quad4.appendChild(schedule);
      right.appendChild(quad4);

      // Quadrant 5: Temple Closures
      let quad5 = document.createElement('div');
      quad5.className = 'quad quad5';
      let quad5Title = document.createElement('h4');
      quad5Title.textContent = "Temple Closures";
      quad5.appendChild(quad5Title);
      for (let j = 0; j < temples[i].closures.length; j++ ) {
        let year = 2019 + j;
        let yearHeading = document.createElement('h5');
        yearHeading.textContent = year;
        quad5.appendChild(yearHeading);
        let closuresUl = document.createElement('ul');
        quad5.appendChild(closuresUl);
        for (let k = 0; k < temples[i].closures[j].length; k++ ) {
          let closuresLi = document.createElement('li');
          closuresLi.textContent = temples[i].closures[j][k];
          closuresUl.appendChild(closuresLi);
        }
      }
      right.appendChild(quad5);

      card.appendChild(left);
      card.appendChild(right);

      document.querySelector('div.cards').appendChild(card);
    }
  });