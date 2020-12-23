
var infowindow;

var colors = [
  "#145A32",
  "#196F3D",
  "#1E8449",
  "#229954",
  "#27AE60",
  "#52BE80",
  "#7DCEA0",
  "#A9DFBF",
  "#D4EFDF",
  "#E9F7EF",
]

function test(){

  // TODO
  // Buttons to turn on / off things on the map. Show the county boundary on and off
  // Change popup text on the county boundary
  // Add drop downs and text inputs for updating data
  
}

function loadGeoData(){

  // var map = new google.maps.Map(document.getElementById('locations-near-you-map'), mapOptions);
  // map.data.loadGeoJson("https://raw.githubusercontent.com/jefftanz/interactive-map/master/data/geo/63301.json");
  // map.data.loadGeoJson("https://raw.githubusercontent.com/jefftanz/interactive-map/master/data/geo/63303.json");
  // map.data.loadGeoJson("https://raw.githubusercontent.com/jefftanz/interactive-map/master/data/geo/63304.json");

}

function calculate(){



}

function isResidential(buildingObj){
  let style = buildingObj.ARCHITECTURAL_STYLE;

  if (style.includes("2STY") || 
    style.includes("25ST") || 
    style.includes("1STY") || 
    style.includes("15ST") || 
    style.includes("DPLX")) {
      return true
  } else {
    return false;
  }
}

function getTypeTotal(zipData, propType){
  var y = 0;
  var total = 0;
  for (y = 0; y < zipData.length; y++){
    if (propType === 'residence'){
      if (isResidential(zipData[y])){total+=1;}
    } else if (propType === 'commercial'){
      if (!isResidential(zipData[y])){total+=1;}
    } else if (propType === 'all'){
      total+=1;
    }
  }
  return total;
}

function getAgeTotal(zipData, ageValue){
  var y = 0;
  var total = 0;
  var cYear = 2021;
  for (y = 0; y < zipData.length; y++){
    let bYear = zipData[y].YEAR_BUILT;
    if (bYear){
      if (ageValue === 'l25'){
        if (cYear - bYear < 25){total+=1;}
      } else if (ageValue === 'g25'){
        if (cYear - bYear >= 25 && cYear - bYear < 50){total+=1;}
      } else if (ageValue === 'g50'){
        if (cYear - bYear >= 50 && cYear - bYear < 75){total+=1;}
      } else if (ageValue === 'g75'){
        if (cYear - bYear >= 75 && cYear - bYear < 100){total+=1;}
      } else if (ageValue === 'g100'){
        if (cYear - bYear > 100){total+=1;}
      }
    }
  }
  return total;
}

function getIndex(filterFeatures, strZip){
  for (let z = 0; z < filterFeatures.length; z++){
    if (filterFeatures[z].properties.name === strZip){
      return z;
    }
  }
  return 0;
}

function resetData(){
  for (x = 0; x < arrFeatures.length; x++){
    arrFeatures[x].properties.total = 0;
    arrFeatures[x].properties.color = "#E9F7EF";
  }
}

function initMap() {

  infowindow = new google.maps.InfoWindow();

  const map = new google.maps.Map(document.getElementById("locations-near-you-map"), {
    zoom: 10,
    center: { lat: 38.8106, lng: -90.6998 },
  });

  // Click the map
  google.maps.event.addListener(map, 'click', function () {
    console.log('map click');
    infowindow.close();
  });

  // Feature click
  map.data.addListener('click', function (event) {
    //console.log('feature click');
    //console.log(event.feature.getProperty('name'));

    var geo = event.feature.getProperty('geo');
    infowindow.setContent("Zip: " + event.feature.getProperty('name') +"<br>"+ "Total: " + event.feature.getProperty('total'));
    infowindow.setPosition({lat: geo.lat , lng: geo.lng});
    infowindow.open(map);
  });

  // Take featureData and go through and modify the results
  // Calculate totals
  // filter totals and apply color styles

  // arrFeatures

  // console.log('arrFeatures: ' + JSON.stringify(arrFeatures))

  // Update Totals based off of Input Search Values

  var propType = document.getElementById('property-type').value;
  var propAge = document.getElementById('property-age').value;
  // var propType = document.getElementById('property-type').value;
  // var propType = document.getElementById('property-type').value;
  // console.log('propertyType: ' + propType);
  // console.log('propertyAge: ' + propAge);

  //let filterFeatures = [...arrFeatures];

  var searchPropertyType = document.getElementById('radioOne').checked;

  resetData();

  if (searchPropertyType){
    console.log('Search Property Type: ' + propType);
    arrFeatures[getIndex(arrFeatures,"63301")].properties.total = getTypeTotal(zip63301, propType);
    arrFeatures[getIndex(arrFeatures,"63303")].properties.total = getTypeTotal(zip63303, propType);
    arrFeatures[getIndex(arrFeatures,"63304")].properties.total = getTypeTotal(zip63304, propType);
    arrFeatures[getIndex(arrFeatures,"63332")].properties.total = getTypeTotal(zip63332, propType);
    arrFeatures[getIndex(arrFeatures,"63341")].properties.total = getTypeTotal(zip63341, propType);
    arrFeatures[getIndex(arrFeatures,"63348")].properties.total = getTypeTotal(zip63348, propType);
    arrFeatures[getIndex(arrFeatures,"63357")].properties.total = getTypeTotal(zip63357, propType);
    arrFeatures[getIndex(arrFeatures,"63366")].properties.total = getTypeTotal(zip63366, propType);
    arrFeatures[getIndex(arrFeatures,"63367")].properties.total = getTypeTotal(zip63367, propType);
    arrFeatures[getIndex(arrFeatures,"63368")].properties.total = getTypeTotal(zip63368, propType);
    arrFeatures[getIndex(arrFeatures,"63373")].properties.total = getTypeTotal(zip63373, propType);
    arrFeatures[getIndex(arrFeatures,"63376")].properties.total = getTypeTotal(zip63376, propType);
    arrFeatures[getIndex(arrFeatures,"63385")].properties.total = getTypeTotal(zip63385, propType);
    arrFeatures[getIndex(arrFeatures,"63386")].properties.total = getTypeTotal(zip63386, propType);
  } else {
    console.log('Search Property Age: ' + propAge);
    arrFeatures[getIndex(arrFeatures,"63301")].properties.total = getAgeTotal(zip63301, propAge);
    arrFeatures[getIndex(arrFeatures,"63303")].properties.total = getAgeTotal(zip63303, propAge);
    arrFeatures[getIndex(arrFeatures,"63304")].properties.total = getAgeTotal(zip63304, propAge);
    arrFeatures[getIndex(arrFeatures,"63332")].properties.total = getAgeTotal(zip63332, propAge);
    arrFeatures[getIndex(arrFeatures,"63341")].properties.total = getAgeTotal(zip63341, propAge);
    arrFeatures[getIndex(arrFeatures,"63348")].properties.total = getAgeTotal(zip63348, propAge);
    arrFeatures[getIndex(arrFeatures,"63357")].properties.total = getAgeTotal(zip63357, propAge);
    arrFeatures[getIndex(arrFeatures,"63366")].properties.total = getAgeTotal(zip63366, propAge);
    arrFeatures[getIndex(arrFeatures,"63367")].properties.total = getAgeTotal(zip63367, propAge);
    arrFeatures[getIndex(arrFeatures,"63368")].properties.total = getAgeTotal(zip63368, propAge);
    arrFeatures[getIndex(arrFeatures,"63373")].properties.total = getAgeTotal(zip63373, propAge);
    arrFeatures[getIndex(arrFeatures,"63376")].properties.total = getAgeTotal(zip63376, propAge);
    arrFeatures[getIndex(arrFeatures,"63385")].properties.total = getAgeTotal(zip63385, propAge);
    arrFeatures[getIndex(arrFeatures,"63386")].properties.total = getAgeTotal(zip63386, propAge);
  }


  var displayFeature = 
  {
    "type": "FeatureCollection",
    "features": []
  }

  // Sort by Total
  arrFeatures.sort(function (a, b) {
      return a.properties.total < b.properties.total ? 1 : -1;
  });

  // Apply Colors to highest totals
  for (var i = 0 ; i < arrFeatures.length; i++){
    if (i < colors.length){
      arrFeatures[i].properties.color = colors[i];
    }
  }

  displayFeature.features = arrFeatures;

  // displayFeature.features.push(featureData[63301]);
  // displayFeature.features.push(featureData[63303]);
  // displayFeature.features.push(featureData[63304]);
  // displayFeature.features.push(featureData[63332]);
  // displayFeature.features.push(featureData[63341]);
  // displayFeature.features.push(featureData[63348]);
  // displayFeature.features.push(featureData[63357]);
  // displayFeature.features.push(featureData[63366]);
  // displayFeature.features.push(featureData[63367]);
  // displayFeature.features.push(featureData[63368]);
  // displayFeature.features.push(featureData[63373]);
  // displayFeature.features.push(featureData[63376]);
  // displayFeature.features.push(featureData[63385]);
  // displayFeature.features.push(featureData[63386]);

  map.data.addGeoJson(displayFeature);

  // Color Capital letters blue, and lower case letters red.
// Capital letters are represented in ascii by values less than 91
  map.data.setStyle(function(feature) {
    return {
      fillColor: feature.getProperty('color'),
      fillOpacity: 1.0
    };
  });

  // map.data.setStyle({
  //   fillColor: '#E9F7EF',
  //   fillOpacity: 1.0
  // });

}

function createSearchableMap(locations = allLocations) {

  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {mapTypeId: 'roadmap'};
  var markers = [];
  var infoWindowContent = [];
  // var map = new google.maps.Map(document.getElementById('locations-near-you-map'), mapOptions);
  var map = new google.maps.Map(document.getElementById('locations-near-you-map'), {
    zoom: 11,
    center: { lat: 38.6270, lng: -90.1994 },
  })
  
  map.setTilt(45);

  var displayFeature = 
  {
    "type": "FeatureCollection",
    "features": [

    ]
  }

  displayFeature.features.push(featureData[63301]);
  displayFeature.features.push(featureData[63303]);
  

  // map.data.loadGeoJson(features);
  map.data.addGeoJson(displayFeature);
  //map.data.loadGeoJson("https://raw.githubusercontent.com/jefftanz/interactive-map/master/data/geo/all.json");
  
  locations.forEach(function(location) {
    markers.push([location.name, location.lat, location.lng]);
    
    infoWindowContent.push(['<div class="infoWindow"><h3>' + location.name + 
                            '</h3><p>' + location.address + '<br />' + location.city + 
                            ', ' + location.state + ' ' + location.zip + '</p><p>Phone ' + 
                            location.phone + '</p></div>']);
  });	    

  var infoWindow = new google.maps.InfoWindow(), marker, i;
  
  // Place the markers on the map
  for (i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    });
    
    // Add an infoWindow to each marker, and create a closure so that the current
    // marker is always associated with the correct click event listener
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
      }
    })(marker, i));

    // Only use the bounds to zoom the map if there is more than 1 location shown
    if (locations.length > 1) {
      map.fitBounds(bounds);
    } else {
      var center = new google.maps.LatLng(locations[0].lat, locations[0].lng);
      map.setCenter(center);
      map.setZoom(15);
    }
  }

}

function filterLocations() {
  var userLatLng;
  var geocoder = new google.maps.Geocoder();
  var userAddress = document.getElementById('userAddress').value.replace(/[^a-z0-9\s]/gi, '');
  var maxRadius = parseInt(document.getElementById('maxRadius').value, 10);
  
  if (userAddress && maxRadius) {
    userLatLng = getLatLngViaHttpRequest(userAddress);
  } 

  function getLatLngViaHttpRequest(address) {
    // Set up a request to the Geocoding API
    // Supported address format is City, City + State, just a street address, or any combo
    var addressStripped = address.split(' ').join('+');
    var key = 'API_KEY';
    var request = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressStripped + '&key=' + key;
    
    // Call the Geocoding API using jQuery GET, passing in the request and a callback function 
    // which takes one argument "data" containing the response
    $.get( request, function( data ) {
      var searchResultsAlert = document.getElementById('location-search-alert');

      // Abort if there is no response for the address data
      if (data.status === "ZERO_RESULTS") {
        searchResultsAlert.innerHTML = "Sorry, '" + address + "' seems to be an invalid address.";
        return;
      }

      var userLatLng = new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
      var filteredLocations = allLocations.filter(isWithinRadius);
      
      if (filteredLocations.length > 0) {
        createSearchableMap(filteredLocations);
        createListOfLocations(filteredLocations);
        searchResultsAlert.innerHTML = 'Chipotle Locations within ' + maxRadius + ' miles of ' + userAddress + ':';
      } else {
        console.log("nothing found!");
        document.getElementById('locations-near-you').innerHTML = '';
        searchResultsAlert.innerHTML = 'Sorry, no Chipotle locations were found within '+ maxRadius + ' miles of ' + userAddress + '.';
      }

      function isWithinRadius(location) {
        var locationLatLng = new google.maps.LatLng(location.lat, location.lng);
        var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(locationLatLng, userLatLng);

        return convertMetersToMiles(distanceBetween) <= maxRadius;
      }
    });  
  }
}

function convertMetersToMiles(meters) {
  return (meters * 0.000621371);
}

function createListOfLocations(locations) {
  var locationsList = document.getElementById('locations-near-you');
  
  // Clear any existing locations from the previous search first
  locationsList.innerHTML = '';
  
  locations.forEach( function(location) {
    var specificLocation = document.createElement('div');
    var locationInfo = "<h4>" + location.name + "</h4><p>" + location.address + "</p>" +
                       "<p>"  + location.city + ", " + location.state + " " + location.zip + "</p><p>" + location.phone + "</p>";
    specificLocation.setAttribute("class", 'location-near-you-box');
    specificLocation.innerHTML = locationInfo;
    locationsList.appendChild(specificLocation);
  });
}

$('#submitLocationSearch').on('click', function(e) {
  e.preventDefault();
  //filterLocations();
  initMap();
});
