// Toggle the hamburger menu class name upon click
function toggleMenu() {
  document
    .getElementsByClassName("drop-down")[0]
    .classList.toggle("responsive");
}

// Return current year in numeric form
const options = {year:'numeric'};
document.getElementById('currentyear').textContent = new Date().toLocaleDateString('en-US', options);

