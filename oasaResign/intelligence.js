const scrollThreshold = 15; // Adjust this value to your needs
const bottomSearchParent = document.getElementById('bottomSearchParent');
const iconInC = document.getElementById('iconInC');
const triggerSearch = document.getElementById('triggerSearch');
const searchIntelli = document.getElementById('searchIntelli');

mapboxgl.accessToken = 'pk.eyJ1IjoicGFwb3N0b2wiLCJhIjoiY2xsZXg0c240MHphNzNrbjE3Z2hteGNwNSJ9.K1O6D38nMeeIzDKqa4Fynw';


// Listen for the scroll event
document.getElementById('main-wrapper').addEventListener('scroll', () => {
  // Check if scroll position exceeds the threshold
  if (document.getElementById('main-wrapper').scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
    // Add class to shrink and hide icons
    bottomSearchParent.classList.add('scrolled');
  } else {
    // Remove class to reset to original state
    bottomSearchParent.classList.remove('scrolled');
  }
});

function openSearch() {
  // Change the background color of searchIntelli
  searchIntelli.style.backgroundColor = '#141416';

  // Expand bottomSearchParent to take the full screen
  bottomSearchParent.style.width = '100vw'; // Full viewport width
  bottomSearchParent.style.height = '100vh'; // Full viewport height

  setTimeout(() => {
    bottomSearchParent.style.bottom = '0'
    searchIntelli.style.width = '100%';
    searchIntelli.style.height = '100%';
    searchIntelli.style.padding = '0'; // Remove padding for fullscreen
    searchIntelli.style.borderRadius = '0';
  }, 100)
  bottomSearchParent.classList.add('scrolled');

  $("#searchIn").fadeOut("fast", function () {
    document.getElementById("insideSearch").style.display = 'flex';
    iconInC.style.display = 'none';
    triggerSearch.style.display = 'none';
  })
}

let myLoc = [
  21.6600239,
  21.9579831
];

function getReady() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Latitude: " + latitude + ", Longitude: " + longitude);
      locationReady = true
      const loc = [longitude, latitude]
      myLoc = loc
      spawnBlocks(myLoc)
      setTimeout(function () {
        //showdemo()
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=${mapboxgl.accessToken}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            // Find the feature with type 'place' or 'locality'
            const placeFeature = data.features.find(feature =>
              feature.place_type.includes('place') || feature.place_type.includes('locality')
            );

            if (placeFeature) {
              const cityOrAreaName = placeFeature.text; // This gives the area or city name
              console.log('City/Area name:', cityOrAreaName);

              // Update the UI
              //document.getElementById("nearYouSkel").style.display = 'none';
              //document.getElementById("nearYou").style.display = null;
              document.getElementById("locationName").innerHTML = cityOrAreaName || 'Unknown location';

              // Adjust styles dynamically (optional, based on your existing logic)
              if (cityOrAreaName.length > 12) {
                document.getElementById("locationName").classList.remove("glowUpGB");
                document.getElementById("locationName").classList.add("glowUpGBSM");
              } else {
                document.getElementById("locationName").classList.remove("glowUpGBSM");
                document.getElementById("locationName").classList.add("glowUpGB");
                document.getElementById("locationName").style.fontSize = null;
              }
            } else {
              console.error('City or area name not found in the response.');
            }
          })
          .catch(error => console.error('Error:', error));

      }, 400)

    }, function (error) {
      //alert(error.message)
      spawnBlocks(myLoc)
      setTimeout(function () {
        //showdemo()
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${myLoc[0]},${myLoc[1]}.json?access_token=${mapboxgl.accessToken}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            // Find the feature with type 'place' or 'locality'
            const placeFeature = data.features.find(feature =>
              feature.place_type.includes('place') || feature.place_type.includes('locality')
            );

            if (placeFeature) {
              const cityOrAreaName = placeFeature.text; // This gives the area or city name
              console.log('City/Area name:', cityOrAreaName);

              // Update the UI
              //document.getElementById("nearYouSkel").style.display = 'none';
              //document.getElementById("nearYou").style.display = null;
              document.getElementById("locationName").innerHTML = cityOrAreaName || 'Unknown location';

              // Adjust styles dynamically (optional, based on your existing logic)
              //if (cityOrAreaName.length > 12) {
              //  document.getElementById("locationName").classList.remove("glowUpGB");
              //  document.getElementById("locationName").classList.add("glowUpGBSM");
              //} else {
              //  document.getElementById("locationName").classList.remove("glowUpGBSM");
              //  document.getElementById("locationName").classList.add("glowUpGB");
              //  document.getElementById("locationName").style.fontSize = null;
              //}
            } else {
              console.error('City or area name not found in the response.');
            }
          })
          .catch(error => console.error('Error:', error));
      }, 400)
      console.log("Error code: " + error.code + " - " + error.message);
    });
  } else {
    spawnBlocks(myLoc)
    //alert("Geolocation is not supported by this browser.");
  }
}

function spawnBlocks(currentLocation) {
  if (!currentLocation || currentLocation.length !== 2 || isNaN(currentLocation[0]) || isNaN(currentLocation[1])) {
    console.error('Invalid location data for spawning blocks:', currentLocation);
    return;
  }

  console.log('Initializing map with location:', currentLocation);

  map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // Mapbox dark theme
    center: currentLocation, // Use passed location [lng, lat]
    zoom: 10, // starting zoom
    pitch: 0, // optional: adjust if you want the map to be more tilted initially
    bearing: 0 // optional: adjust the initial bearing if needed
  });

  markers(currentLocation, 'me');
}

let markers_global = []
let locationMarker = []
function markers(b, what) {
    const markerElement = document.createElement('div');
    markerElement.style.width = '10px'; // smaller size
    markerElement.style.height = '10px';

    if (what === 'me') {
        markerElement.style.backgroundColor = '#2e77ff';
        markerElement.style.borderRadius = '50%'; // circle shape
        markerElement.style.border = '1px solid #fff'; // minimal border for better contrast

        // Add the custom marker to the map
        const marker = new mapboxgl.Marker({ element: markerElement })
            .setLngLat(b) // coordinates for the marker
            .addTo(map);
        markers_global.push(marker)
        locationMarker.push(marker)
        return;
    } else if (what.includes("#")) {
        markerElement.style.backgroundColor = what
    } else if (what === 'red') {
        markerElement.style.backgroundColor = '#ff4a4a';
    } else if (what === 'green') {
        markerElement.style.backgroundColor = '#5ac876';
    } else if (what === 'yellow') {
        markerElement.style.backgroundColor = '#965d00';
    } else {
        markerElement.style.backgroundColor = '#333'; // dark color
    }




    markerElement.style.borderRadius = '50%'; // circle shape
    markerElement.style.border = '1px solid #fff'; // minimal border for better contrast

    // Add the custom marker to the map
    const marker = new mapboxgl.Marker({ element: markerElement })
        .setLngLat(b) // coordinates for the marker
        .addTo(map);
    markers_global.push(marker)
}

getReady()