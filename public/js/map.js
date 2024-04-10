let mapElement = document.getElementById('map');


// Get the latitude and longitude from the data attributes
let lat = mapElement.getAttribute('data-lat');
let lng = mapElement.getAttribute('data-lng');
let nombre = mapElement.getAttribute('data-name');

let map = L.map('map').setView([lat, lng], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([lat, lng]).addTo(map);
marker.bindPopup("<b>" + nombre + "</b>").openPopup();