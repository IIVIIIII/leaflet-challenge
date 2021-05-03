// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  data = data.features

  console.log(data)

  

  var sizeScale = d3.scalePow()
        .exponent(2)
        .domain([0, 9])
        .range([0, 900000])

console.log(sizeScale(0))
console.log(sizeScale(1))
console.log(sizeScale(2))
console.log(sizeScale(3))
console.log(sizeScale(4))
console.log(sizeScale(5))
console.log(sizeScale(6))
console.log(sizeScale(7))
console.log(sizeScale(8))
console.log(sizeScale(9))

// Define arrays to hold created city and state markers
  var quakes = [];
  
  // Loop through locations and create city and state markers
  data.forEach(q => {
    // Setting the marker radius for the state by passing population into the markerSize function
    quakes.push(
      L.circle([q.geometry.coordinates[1], q.geometry.coordinates[0]], {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "blue",
        radius: sizeScale(q.properties.mag)
      })
    );
    })
  
  // Streetmap Layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  // Create two separate layer groups: one for cities and one for states
  var earthquakes = L.layerGroup(quakes);

  
  // Define a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [darkmap, earthquakes]
  });
  

  






});