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
      let left = document.createElement('div');
      left.className = 'left';
      let right = document.createElement('div');
      right.className = 'right';
      let image = document.createElement('img');
      let name = document.createElement('h3');
      let address = document.createElement('p');
      /*let birthplace = document.createElement('p');
      */

      image.setAttribute('src', "images/" + temples[i].image);
      image.setAttribute('alt', temples[i].imgdescription);
      name.textContent = temples[i].name;
      
      /*birthdate.textContent = 'Date of Birth: ' + temples[i].birthdate;
      birthplace.textContent = 'Place of Birth: ' + temples[i].birthplace;
       */

      left.appendChild(image);
      right.appendChild(name);
      
      /*card.appendChild(birthdate);
      card.appendChild(birthplace);
      */

      card.appendChild(left);
      card.appendChild(right);

      document.querySelector('div.cards').appendChild(card);
    }
  });