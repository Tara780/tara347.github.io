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

      // Quadrant 2: Services
      let quad2 = document.createElement('div');
      quad2.className = 'quad quad2';
      let quad2Title = document.createElement('h4');
      quad2Title.textContent = "Services";
      let servicesUl = document.createElement('ul');      
      for (let j = 0; j < temples[i].services.length; j++ ) {
        let servicesLi = document.createElement('li');
        servicesLi.textContent = temples[i].services[j];
        servicesUl.appendChild(servicesLi);
      }
      quad2.appendChild(quad2Title);
      quad2.appendChild(servicesUl);
      right.appendChild(quad2);

      // Quadrant 3: Temple Closures
      let quad3 = document.createElement('div');
      quad3.className = 'quad quad3';
      let quad3Title = document.createElement('h4');
      quad3Title.textContent = "Temple Closures";
      quad3.appendChild(quad3Title);

      



      for (let j = 0; j < temples[i].closures.length; j++ ) {
        let year = 2019 + j;
        console.log(year);  // Testing
        let yearHeading = document.createElement('h5');
        yearHeading.textContent = year;
        quad3.appendChild(yearHeading);
        let closuresUl = document.createElement('ul');
        quad3.appendChild(closuresUl);
        //closuresLi.textContent = temples[i].closures[j];
        //closuresUl.appendChild(closuresLi);
        //console.log(temples[i].closures[j]);  // Testing
        //console.log(temples[i].closures[j]);  // Testing
        for (let k = 0; k < temples[i].closures[j].length; k++ ) {

          // Testing
          console.log(temples[i].closures[j][k]);

          //console.log("  " + temples[i].closures[j].length);  // Testing
          let closuresLi = document.createElement('li');
          closuresLi.textContent = temples[i].closures[j][k];
          //console.log(closuresLi);  // Testing
          closuresUl.appendChild(closuresLi);
        }
      }
      
      right.appendChild(quad3);

      // Quadrant 4: Current Weather
      let quad4 = document.createElement('div');
      quad4.className = 'quad quad4';
      let quad4Title = document.createElement('h4');
      quad4Title.textContent = "Current Weather";
      quad4.appendChild(quad4Title);
      right.appendChild(quad4);

      
      
      
      /*birthdate.textContent = 'Date of Birth: ' + temples[i].birthdate;
      birthplace.textContent = 'Place of Birth: ' + temples[i].birthplace;
       */

      
      
      
      /*card.appendChild(birthdate);
      card.appendChild(birthplace);
      */

      card.appendChild(left);
      card.appendChild(right);

      document.querySelector('div.cards').appendChild(card);
    }
  });