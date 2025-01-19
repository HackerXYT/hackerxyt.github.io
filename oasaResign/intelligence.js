const scrollThreshold = 15; // Adjust this value to your needs
const bottomSearchParent = document.getElementById('bottomSearchParent');
const iconInC = document.getElementById('iconInC');
const triggerSearch = document.getElementById('triggerSearch');
const searchIntelli = document.getElementById('searchIntelli');
const currentVersion = '2.0.10'
document.getElementById("showUpV").innerText = currentVersion
localStorage.setItem("currentVersion", currentVersion)
mapboxgl.accessToken = 'pk.eyJ1IjoicGFwb3N0b2wiLCJhIjoiY2xsZXg0c240MHphNzNrbjE3Z2hteGNwNSJ9.K1O6D38nMeeIzDKqa4Fynw';
const randomString = () => Math.random().toString(36).substring(2, 10);

// Listen for the scroll event
document.getElementById('main-wrapper').addEventListener('scroll', () => {
  // Check if scroll position exceeds the threshold
  if (document.getElementById('main-wrapper').scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
    // Add class to shrink and hide icons
    document.getElementById("returnTopDefines").classList.add('scrolled')
    bottomSearchParent.classList.add('scrolled');
  } else {
    // Remove class to reset to original state
    document.getElementById("returnTopDefines").classList.remove('scrolled')
    bottomSearchParent.classList.remove('scrolled');
  }
});

// Listen for any uncaught errors in the application
window.addEventListener('error', (event) => {
  // Alert the user with the error message
  //alert(`[BETA] An error occurred: ${event.message}\nAt: ${event.filename}:${event.lineno}:${event.colno}`);

  // Optionally, log the error to the console for debugging
  console.error('Error details:', event);
});

window.addEventListener('unhandledrejection', (event) => {
  //alert(`[BETA] An unhandled promise rejection occurred: ${event.reason}`);
  console.error('Unhandled rejection:', event.reason);
});

function countUpWithParallax(element) {
  const text = element.innerText;
  const chars = text.split(''); // Split the text into individual characters
  const container = document.createElement('vox');
  container.style.display = 'flex';
  container.style.position = 'relative';

  chars.forEach((char, index) => {
    const charSpan = document.createElement('vo');
    charSpan.innerText = char;
    charSpan.style.position = 'relative';
    charSpan.style.transform = 'translateY(0)';
    charSpan.style.transition = 'transform 0.1s ease-in-out';
    container.appendChild(charSpan);
  });

  element.innerText = '';
  element.appendChild(container);

  let startTime;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const scrollY = window.scrollY || window.pageYOffset; // Current scroll position

    chars.forEach((char, index) => {
      const speed = (index + 1) * 0.5; // Modify speed based on index
      const position = Math.sin(elapsed * 0.002 + index) * 5; // Simple oscillation effect
      container.children[index].style.transform = `translateY(${scrollY * 0.05 + position}px)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

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

  spawnMyLocation()
  $("#searchIn").fadeOut("fast", function () {
    document.getElementById("insideSearch").style.display = 'flex';
    iconInC.style.display = 'none';
    triggerSearch.style.display = 'none';
    zoomOnMe()
    map.resize()
  })
  document.getElementById("recommendSpawn").innerHTML = ''
  document.getElementById("recommendSpawn").innerHTML += `<div class="Block"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.5">
<path d="M3 8.70938V16.8377C3 17.8813 3 18.4031 3.28314 18.7959C3.56627 19.1888 4.06129 19.3538 5.05132 19.6838L6.21609 20.072C7.58318 20.5277 8.26674 20.7556 8.95493 20.6634C8.96999 20.6614 8.98501 20.6593 9 20.6569V6.65705C8.88712 6.67391 8.77331 6.68433 8.6591 6.68823C8.11989 6.70664 7.58626 6.52877 6.51901 6.17302C5.12109 5.70705 4.42213 5.47406 3.89029 5.71066C3.70147 5.79466 3.53204 5.91678 3.39264 6.06935C3 6.49907 3 7.23584 3 8.70938Z" fill="#fff"/>
<path d="M21 15.2907V7.16229C21 6.11872 21 5.59692 20.7169 5.20409C20.4337 4.81126 19.9387 4.64625 18.9487 4.31624L17.7839 3.92799C16.4168 3.47229 15.7333 3.24444 15.0451 3.3366C15.03 3.33861 15.015 3.34078 15 3.34309V17.343C15.1129 17.3261 15.2267 17.3157 15.3409 17.3118C15.8801 17.2934 16.4137 17.4713 17.481 17.827C18.8789 18.293 19.5779 18.526 20.1097 18.2894C20.2985 18.2054 20.468 18.0833 20.6074 17.9307C21 17.501 21 16.7642 21 15.2907Z" fill="#fff"/>
</g>
<path d="M9.24685 6.60921C9.16522 6.6285 9.08286 6.64435 9 6.65673V20.6566C9.66964 20.5533 10.2689 20.1538 11.4416 19.3719L12.824 18.4503C13.7601 17.8263 14.2281 17.5143 14.7532 17.3902C14.8348 17.3709 14.9171 17.355 15 17.3427V3.34277C14.3304 3.44613 13.7311 3.84561 12.5583 4.62747L11.176 5.54905C10.2399 6.17308 9.77191 6.48509 9.24685 6.60921Z" fill="#fff"/>
<path d="M17.481 17.8267C17.5684 17.8558 17.653 17.884 17.735 17.9113Z" fill="#fff"/>
</svg>Σπίτι
                    </div>`
  favoriteBuses.forEach(bus => {
    document.getElementById("recommendSpawn").innerHTML += `<div onclick="spawnAndShowInfo('${bus}')" class="Block favorite"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#FFF"/>
                  <path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#FFF"/>
                  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#FFF"/>
                  <path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#FFF"/>
                  <path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#FFF"/>
                  <path opacity="0.5" d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#FFF"/>
                  <path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#FFF"/>
                  <path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#FFF"/>
                  </svg>${bus}
                                      </div>`
  })
  frequentBuses.forEach(bus => {
    document.getElementById("recommendSpawn").innerHTML += `<div onclick="spawnAndShowInfo('${bus}')" class="Block"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#FFF"/>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#FFF"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#FFF"/>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#FFF"/>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#FFF"/>
<path opacity="0.5" d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#FFF"/>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#FFF"/>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#FFF"/>
</svg>${bus}
                    </div>`
  })

  //andMore
}

function closeSearch() {
  if (document.getElementById("searchContainer").classList.contains("active")) {
    $("#recommendSpawn").fadeIn("fast")
    document.getElementById("searchContainer").classList.remove("active")
    document.getElementById('toSpawnFinds').classList.add('hidden');
  } else {
    searchIntelli.style.backgroundColor = null;
    bottomSearchParent.style.width = null;
    bottomSearchParent.style.height = '86px';
    bottomSearchParent.style.bottom = '30px'
    searchIntelli.style.width = '256px'
    searchIntelli.style.height = 'auto'
    searchIntelli.style.padding = '18px 20px'
    searchIntelli.style.borderRadius = '50px'

    document.getElementById("insideSearch").style.display = 'none';
    iconInC.style.display = null;
    triggerSearch.style.display = null;
    bottomSearchParent.classList.remove('scrolled');
    $("#searchIn").fadeIn("fast", function () {


    })
  }





}

let myLoc;

function getReady() {
  document.getElementById("greeting").textContent = `${greeting()},`;
  document.getElementById("userUsername").textContent = getName();
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
        if (isPreviousNearby(myLoc)) {
          console.log("Working On Previous")
          const previousLocation = localStorage.getItem('previousLocation');
          const data = JSON.parse(previousLocation);
          const placeFeature = data.features.find(feature =>
            feature.place_type.includes('place') || feature.place_type.includes('locality')
          );
          const cityOrAreaName = placeFeature.text; // This gives the area or city name
          console.log('City/Area name:', cityOrAreaName);

          // Update the UI
          //document.getElementById("nearYouSkel").style.display = 'none';
          //document.getElementById("nearYou").style.display = null;
          document.getElementById("locationName").innerHTML = toAccusative(cityOrAreaName) || 'Unknown location';
          updateLocation(cityOrAreaName);
        } else {
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=${mapboxgl.accessToken}&language=el&vevox=${randomString()}`)
            .then(response => response.json())
            .then(data => {
              localStorage.setItem('previousLocation', JSON.stringify(data))
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
                document.getElementById("locationName").innerHTML = toAccusative(cityOrAreaName) || 'Unknown location';
                updateLocation(cityOrAreaName);

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
        }


      }, 400)

    }, function (error) {
      //alert(error.message)
      //spawnBlocks(myLoc)
      bypassAny()

      console.log("Error code: " + error.code + " - " + error.message);
    });
  } else {
    //spawnBlocks(myLoc)
    //alert("Geolocation is not supported by this browser.");
  }
}

function tempMake() {
  return;
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  locationReady = true
  const loc = [longitude, latitude]
  myLoc = loc
  spawnBlocks(myLoc)
  setTimeout(function () {
    //showdemo()
    spawnNearby()
    if (isPreviousNearby(myLoc)) {
      console.log("Working On Previous")
      const previousLocation = localStorage.getItem('previousLocation');
      const data = JSON.parse(previousLocation);
      const placeFeature = data.features.find(feature =>
        feature.place_type.includes('place') || feature.place_type.includes('locality')
      );
      const cityOrAreaName = placeFeature.text; // This gives the area or city name
      console.log('City/Area name:', cityOrAreaName);

      // Update the UI
      //document.getElementById("nearYouSkel").style.display = 'none';
      //document.getElementById("nearYou").style.display = null;
      document.getElementById("locationName").innerHTML = toAccusative(cityOrAreaName) || 'Unknown location';
      updateLocation(cityOrAreaName);
    } else {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=${mapboxgl.accessToken}&language=el&vevox=${randomString()}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('previousLocation', JSON.stringify(data))
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
            document.getElementById("locationName").innerHTML = toAccusative(cityOrAreaName) || 'Unknown location';
            updateLocation(cityOrAreaName);

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
    }


  }, 400)
}

function bypassAny() {
  locationReady = true
  const loc = myLoc
  myLoc = loc
  spawnBlocks(myLoc)
  setTimeout(function () {
    //showdemo()
    if (isPreviousNearby(myLoc)) {
      console.log("Working On Previous")
      const previousLocation = localStorage.getItem('previousLocation');
      const data = JSON.parse(previousLocation);
      const placeFeature = data.features.find(feature =>
        feature.place_type.includes('place') || feature.place_type.includes('locality')
      );
      const cityOrAreaName = placeFeature.text; // This gives the area or city name
      console.log('City/Area name:', cityOrAreaName);

      // Update the UI
      //document.getElementById("nearYouSkel").style.display = 'none';
      //document.getElementById("nearYou").style.display = null;
      document.getElementById("locationName").innerHTML = toAccusative(cityOrAreaName) || 'Unknown location';
      updateLocation(cityOrAreaName);
    } else {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=${mapboxgl.accessToken}&language=el&vevox=${randomString()}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('previousLocation', JSON.stringify(data))
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
            document.getElementById("locationName").innerHTML = toAccusative(cityOrAreaName) || 'Unknown location';
            updateLocation(cityOrAreaName);

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
    }


  }, 400)
}
let map;

function spawnBlocks(currentLocation) {
  if (!currentLocation || currentLocation.length !== 2 || isNaN(currentLocation[0]) || isNaN(currentLocation[1])) {
    console.warn('Invalid location data for spawning blocks:', currentLocation);
    return;
  }

  console.log('Initializing map with location:', currentLocation);

  map = new mapboxgl.Map({
    container: 'map-io', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // Mapbox dark theme
    center: currentLocation, // Use passed location [lng, lat]
    zoom: 10, // starting zoom
    pitch: 0, // optional: adjust if you want the map to be more tilted initially
    bearing: 0 // optional: adjust the initial bearing if needed
  });

  // Resize map after initialization to ensure it fits the container

  //markers(currentLocation, 'me');
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


function oldgetPrefix(locationName) {
  // Normalize the name (lowercase and remove accents)
  const accentsMap = {
    'Ά': 'Α', 'Έ': 'Ε', 'Ή': 'Η', 'Ί': 'Ι', 'Ό': 'Ο', 'Ύ': 'Υ', 'Ώ': 'Ω',
    'ά': 'α', 'έ': 'ε', 'ή': 'η', 'ί': 'ι', 'ό': 'ο', 'ύ': 'υ', 'ώ': 'ω'
  };

  const normalize = (str) =>
    str.replace(/[ΆΈΉΊΌΎΏάέήίόύώ]/g, (match) => accentsMap[match] || match).toLowerCase();

  const name = normalize(locationName);

  // Define rules for feminine and masculine
  const feminineEndings = ["α", "η", "ια"];
  const masculineEndings = ["ος", "ας", "ης"];

  // Check for specific endings (e.g., -ος, -α, etc.)
  if (feminineEndings.some((ending) => name.endsWith(ending))) {
    return "στην";
  } else if (masculineEndings.some((ending) => name.endsWith(ending))) {
    return "στον";
  } else {
    // Default fallback (neutral)
    return "στη";
  }
}

const removeAccents = (value) => {
  if (typeof value !== "string") return value;

  const accentsMap = {
    'ά': 'α', 'έ': 'ε', 'ή': 'η', 'ί': 'ι', 'ό': 'ο', 'ύ': 'υ', 'ώ': 'ω',
    'Ά': 'Α', 'Έ': 'Ε', 'Ή': 'Η', 'Ί': 'Ι', 'Ό': 'Ο', 'Ύ': 'Υ', 'Ώ': 'Ω',
    'ΐ': 'ϊ', 'ΰ': 'ϋ', 'ϊ': 'ι', 'ϋ': 'υ'
  };

  return value.replace(/[άέήίόύώΆΈΉΊΌΎΏΐΰϊϋ]/g, match => accentsMap[match]);
};

function spawnFallback(bus, descr, section) {
  if (localStorage.getItem(`${bus}_Timetable_go`)) {
    //alert(`Found ${bus} in local storage`)
    try {
      const data = JSON.parse(localStorage.getItem(`${bus}_Timetable_go`));
      const times = JSON.parse(localStorage.getItem(`${bus}_Times_go`));
      const nextBusTime = getNextBusTimeLIVE(times);

      if (nextBusTime) {
        spawnInFeed(bus, descr, nextBusTime, displayRemainingTimeLIVE(nextBusTime), section, 'preload')
      } else {
        const [hour, minutes] = times[0].split(":").map(Number);
        const workingTime = { hour, minutes };
        //alert(`Fallback: ${JSON.stringify(workingTime)}\n${bus}`)
        console.warn(`SPAWNFALLBACK\nFailed to find next bus time for ${bus}.\nWorking on the first value in schedule\nTimes:`, times);
        spawnInFeed(bus, descr, workingTime, displayRemainingTimeLIVE(workingTime), section, 'preload')
      }
    } catch (error) {
      console.log(`preOffline: ${error}`)
      alert(`preOffline: ${error}`)
    }

  }
}

function getPrefix(preloc) {

  const location = removeAccents(preloc);
  console.log("Getting prefix for location:", preloc, location);
  // Analyze the ending of the location to decide the preposition
  const endings = [
    { regex: /ος$/, result: "στον" }, // Masculine singular (e.g., Πειραιάς)
    { regex: /ας$/, result: "στον" }, // Masculine singular (e.g., Νίκος)
    { regex: /ης$/, result: "στον" }, // Masculine singular (e.g., Σωκράτης)
    { regex: /ατα$/, result: "στα" },  // Neuter plural (e.g., Χωριάτικα)
    { regex: /η$/, result: "στην" }, // Feminine singular (e.g., Κρήτη)
    { regex: /οι$/, result: "στους" }, // Masculine plural (e.g., Άγιοι Ανάργυροι)
    { regex: /α$/, result: "στην" }, // Feminine singular (e.g., Γλυφάδα)
    { regex: /ο$/, result: "στο" },  // Neuter singular (e.g., Μοσχάτο)
    { regex: /ι$/, result: "στο" },  // Neuter singular (e.g., Χαϊδάρι)
    { regex: /υ$/, result: "στο" },  // Neuter singular (e.g., Ζεφύρι)
    { regex: /ω$/, result: "στο" },  // Neuter singular (rare case, e.g., Μητροπολιτικό)
    { regex: /α$/, result: "στα" },  // Neuter plural (e.g., Σπάτα)
    { regex: /ες$/, result: "στις" },  // Feminine plural (e.g., Θήβες)
  ];

  // Loop through the rules to find a match
  for (const rule of endings) {
    if (rule.regex.test(location)) {
      return rule.result;
    }
  }

  // Default fallback if no rule matches
  return "στο";
}

function toAccusative_noWork(locationName) {
  // Normalize text (lowercase only for easier matching, keep accents intact)
  const normalize = (str) => str.toLowerCase();

  const name = normalize(locationName);

  // Handle masculine place names ending in -ς
  if (name.endsWith("ας") || name.endsWith("άς")) {
    return locationName.slice(0, -2) + "α";
  }
  if (name.endsWith("ης") || name.endsWith("ής")) {
    return locationName.slice(0, -2) + "η";
  }
  if (name.endsWith("ος") || name.endsWith("ός")) {
    return locationName.slice(0, -1);
  }

  // Handle feminine place names (no changes typically needed)
  if (name.endsWith("α") || name.endsWith("η") || name.endsWith("ά") || name.endsWith("ή")) {
    return locationName;
  }

  // Handle neutral place names
  if (name.endsWith("ο") || name.endsWith("ό") || name.endsWith("ι") || name.endsWith("ί") || name.endsWith("μα") || name.endsWith("μά")) {
    return locationName;
  }

  // Default fallback: return unchanged
  return locationName;
}


function toAccusative(locationName) {
  // Normalize text (lowercase and remove accents for easier matching)
  const accentsMap = {
    'Ά': 'Α', 'Έ': 'Ε', 'Ή': 'Η', 'Ί': 'Ι', 'Ό': 'Ο', 'Ύ': 'Υ', 'Ώ': 'Ω',
    'ά': 'α', 'έ': 'ε', 'ή': 'η', 'ί': 'ι', 'ό': 'ο', 'ύ': 'υ', 'ώ': 'ω'
  };

  const normalize = (str) =>
    str.replace(/[ΆΈΉΊΌΎΏάέήίόύώ]/g, (match) => accentsMap[match] || match).toLowerCase();

  const name = normalize(locationName);

  // Handle masculine place names ending in -ς
  if (name.endsWith("ας")) {
    return locationName.slice(0, -2) + "α";
  }
  if (name.endsWith("ης")) {
    return locationName.slice(0, -2) + "η";
  }
  if (name.endsWith("ος")) {
    return locationName.slice(0, -1);
  }

  // Handle feminine place names (no changes typically needed)
  if (name.endsWith("α") || name.endsWith("η")) {
    return locationName;
  }

  // Handle neutral place names
  if (name.endsWith("ο") || name.endsWith("ι") || name.endsWith("μα")) {
    return locationName;
  }

  // Default fallback: return unchanged
  return locationName;
}

// Function to update the UI with the correct location
function updateLocation(locationName) {
  const prefix = getPrefix(locationName);
  document.getElementById("vocals").textContent = prefix;
  document.getElementById("searchIntelli").classList.remove('notLoaded')
  document.getElementById("searchInSearch").placeholder = `Αναζητήστε ${prefix} ${toAccusative(locationName)}`
}


function spawnMyLocation() {
  const markerElement = document.createElement('div');
  markerElement.style.width = '10px'; // smaller size
  markerElement.style.height = '10px';
  markerElement.style.backgroundColor = '#2e77ff';
  markerElement.style.borderRadius = '50%'; // circle shape
  markerElement.style.border = '1px solid #fff'; // minimal border for better contrast

  // Add the custom marker to the map
  const marker = new mapboxgl.Marker({ element: markerElement })
    .setLngLat(myLoc) // coordinates for the marker
    .addTo(map);
  markers_global.push(marker)
}

function zoomOnMe() {
  map.resize();
  map.flyTo({
    center: [parseFloat(myLoc[0]), parseFloat(myLoc[1])],
    zoom: 16,
    curve: 1,
    easing(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  });
}


function greeting() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 4 && hours < 12) {
    return "Καλημέρα";
  } else {
    return "Καλησπέρα";
  }
}

function getName() {
  if (localStorage.getItem("t50-username")) {
    return localStorage.getItem("t50-username");
  } else {
    return "Επισκέπτη";
  }

  //check for first and second name
}

function convertTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours === 1 ? "1 ώρα" : `${hours} ώρες`;
  const minutesText = remainingMinutes === 1 ? "1 λεπτό" : `${remainingMinutes} λεπτά`;

  if (hours === 0) {
    return minutesText;
  } else if (remainingMinutes === 0) {
    return hoursText;
  } else {
    return `${hoursText} και ${minutesText}`;
  }
}

function convertTimeApprox(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours === 1 ? "1 ώρα" : `${Math.floor(hours + 0.5)} ώρες`;
  const minutesText = remainingMinutes === 1 ? "1 λεπτό" : `${remainingMinutes} λεπτά`;

  if (hours === 0) {
    return minutesText;
  } else if (remainingMinutes === 0) {
    return hoursText;
  } else {
    return `${hoursText}`;
  }
}

// Example usage:
console.log(convertTime(65)); // "1 hour and 5 minutes"
console.log(convertTime(120)); // "2 hours"
console.log(convertTime(59)); // "59 minutes"
console.log(convertTime(1));  // "1 minute"


function displayRemainingTimeLIVE(nextBusTime, elid) {
  console.log("Running", JSON.stringify(nextBusTime), "for", elid);
  const currentTime = new Date();
  const nextBusDate = new Date();

  // Explicitly set the hours, minutes, and seconds for the next bus time
  nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0, 0);

  // If the next bus time is earlier than the current time, assume it's the next day
  if (nextBusDate <= currentTime) {
    nextBusDate.setDate(nextBusDate.getDate() + 1);
  }

  const remainingTimeMs = nextBusDate - currentTime;
  const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);

  console.log("Result", JSON.stringify(nextBusTime), "for", `${remainingMinutes} minutes`);
  return remainingMinutes;
}

function getNextBusTimeLIVE(times) {
  ////console.log("getting times", times);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  for (let time of times) {
    const [hour, minutes] = time.split(':').map(Number);
    if (hour > currentHour || (hour === currentHour && minutes > currentMinutes)) {
      return { hour, minutes };
    }
  }
  return null;
}
function formatTime(dateTimeString) {
  if (!dateTimeString) {
    console.error("Invalid dateTimeString:", dateTimeString);
    return "Invalid";
  }

  const parts = dateTimeString.split(' ');
  if (parts.length !== 2) {
    console.error("Invalid dateTimeString format:", dateTimeString);
    return "Invalid";
  }

  const timePart = parts[1]; // "HH:MM:SS"
  const timeParts = timePart.split(':');
  if (timeParts.length !== 3) {
    console.error("Invalid time format:", timePart);
    return "Invalid";
  }

  const hours = timeParts[0];
  const minutes = timeParts[1];

  if (hours.length !== 2 || minutes.length !== 2) {
    console.error("Invalid time components:", hours, minutes);
    return "Invalid";
  }

  return `${hours}:${minutes}`;
}




//fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getRoutesForLine&p1=${lineCode}&keyOrigin=evoxEpsilon`)}`)
//  .then(response => response.json())
//  .then(data => {
//    if (data) {
//      const routeCode = data[0].route_code
//      currentRouteCode = routeCode
//      console.log(routeCode)
//      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutesDetailsAndStops&p1=${routeCode}&keyOrigin=evoxEpsilon`)}`)
//        .then(response => response.json())
//        .then(bata => {
//          currentLineInfo = bata
//          let stopPromises = bata.stops.map(stop => {
//            return new Promise((resolve, reject) => {
//              console.log(stop.StopDescr);
//
//              // Resolve the promise after the stop is processed
//              resolve();
//            });
//          });
//
//          // Wait for all promises to resolve (i.e., all stops are spawned)
//          Promise.all(stopPromises)
//            .then(() => {
//              // Code to run after all elements are spawned
//              console.log('All stops have been spawned!');
//              // Add additional functionality here
//            })
//            .catch(err => {
//              console.error('An error occurred while spawning stops:', err);
//            });
//        })
//        .catch(error => {
//          console.log("FindStops [2] error:", error)
//          if (error.toString().includes('Unexpected token')) {
//            //alert("OASA SQL error. Δοκιμάστε ξανά.")
//            console.warn("Attempting to fix")
//            findStops(lineCode, sentElementByfindBus)
//          }
//        })
//    }
//
//  })
//  .catch(error => {
//    console.log("FindStops [1] error:", error)
//    if (error.toString().includes('Unexpected token')) {
//      //alert("OASA SQL error. Δοκιμάστε ξανά.")
//      console.warn("Attempting to fix")
//      findStops(lineCode, sentElementByfindBus)
//    }
//  })

let frequentBuses = ['16', '831', '828', '049']
let favoriteBuses = []
let famousBuses = []



if (localStorage.getItem("oasa_favorites")) {
  console.log("Found favorites")
  console.log(localStorage.getItem("oasa_favorites"))
  favoriteBuses = JSON.parse(localStorage.getItem("oasa_favorites"))//.reverse();
  console.log(favoriteBuses)
}

fetch(`famousBuses.json?vevox=${randomString()}`)
  .then(response => response.json())
  .then(data => {
    console.log("famous")
    let uniqueBuses = data.list.filter(bus =>
      !frequentBuses.includes(bus) && !favoriteBuses.includes(bus)
    );
    console.log("Unique famous:", uniqueBuses)
    famousBuses = uniqueBuses


  })
  .catch(error => {
    $("#famousFeed").fadeOut("fast")
    console.warn("Cannot load famous")
  });

function loadOasa() {
  //let spawnInFreq = {}; // This is unused but retained for future reference
  function loadSection(section, bus) {
    let matchingLines = fullLine.filter(line => line.LineID === bus);
    if (!matchingLines.length) {
      console.warn(`No matching lines found for bus: ${bus}`);
      return;
    }

    //alert(`loadOasa: ${bus}`)
    const { LineDescr: descr, LineCode: lineCode } = matchingLines[0];

    try {
      function theSchedule(data) {
        if (!data || (!data.come && !data.go)) {
          console.warn(`No schedule data found for bus: ${bus}`);
          return;
        }

        console.log(`Schedule data for ${bus}:`, data);

        // Extract times
        const times = data.go.map(item => formatTime(item.sde_start1));
        console.log(`Formatted times for ${bus}:`, times);

        // Determine the next bus time
        const nextBusTime = getNextBusTimeLIVE(times);

        if (nextBusTime) {
          // Store data locally
          localStorage.setItem(`${bus}_Timetable_go`, JSON.stringify(data));
          localStorage.setItem(`${bus}_Times_go`, JSON.stringify(times));

          // Display in feed
          //alert(`Default work ${JSON.stringify(nextBusTime)}`)
          spawnInFeed(bus, descr, nextBusTime, displayRemainingTimeLIVE(nextBusTime), section); //section is 'frequent', 'favorite', or 'famous'
        } else {
          //use times[0] as a fallback
          try {
            const [hour, minutes] = times[0].split(":").map(Number);
            const workingTime = { hour, minutes };
            //alert(`Fallback: ${JSON.stringify(workingTime)}\n${bus}`)
            //alert(`loadOasa Failed\nfailed why?:\nnextBusTime returned: ${JSON.stringify(nextBusTime)}\nTimes: ${JSON.stringify(times)}\nBus on work: ${bus}`);
            console.warn(`Failed to find next bus time for ${bus}.\nWorking on the first value in schedule\nTimes:`, times);
            spawnInFeed(bus, descr, workingTime, displayRemainingTimeLIVE(workingTime), section); //section is 'frequent', 'favorite', or 'famous'
          } catch (error) {
            //work on localStorage
            if (localStorage.getItem(`${bus}_Times`)) {
              const times = JSON.parse(localStorage.getItem(`${bus}_Times`));
              const nextBusTime = getNextBusTimeLIVE(times);
              if (nextBusTime) {
                spawnInFeed(bus, descr, nextBusTime, displayRemainingTimeLIVE(nextBusTime), section); //section is 'frequent', 'favorite', or 'famous'
              } else {
                spawnFallback(bus, descr, section)
              }
            } else {
              console.log(`loadOasa fallback error: ${error}`)
              spawnInFeed(bus, descr, nextBusTime, 'Άγνωστη', section)//section is 'frequent', 'favorite', or 'famous'
            }

          }

        }
      }
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${lineCode}&keyOrigin=evoxEpsilon`)}&vevox=${randomString()}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem(`dailySchedule_${lineCode}_go`, JSON.stringify(data))
          theSchedule(data)

        })
        .catch(error => {
          //const lc_Temp = localStorage.getItem(`dailySchedule_${lineCode}`)
          //if (lc_Temp) {
          //  theSchedule(JSON.parse(lc_Temp))
          //} else {
          //  console.error(`Error fetching schedule for ${bus}:`, error);
          //}
          spawnFallback(bus, descr, section);


        });
    } catch {
      spawnFallback(bus, descr, section);
    }
  }
  frequentBuses.forEach(bus => {
    loadSection('frequent', bus)
  });
  console.log(favoriteBuses)
  favoriteBuses.forEach(bus => {
    loadSection('favorite', bus)
  })
  famousBuses.forEach(bus => {
    loadSection('famous', bus)
  });
  if (favoriteBuses.length === 0) {
    document.getElementById('favorite').innerHTML = `<div class="failed">
                                    <img style="width: 40px;" src="discover.svg" class="failed-icon">
                                    <vox class="failed-message nonImportant">Κανένα αγαπημένο λεωφορείο.</vox>
                                    <span class="failed-subtext">Προσθέστε τα αγαπημένα σας λεωφορεία από την Εξερεύνηση.</span>
                                </div>`
  }
}

function hasInternetConnection() {
  return navigator.onLine; // Returns true if online, false if offline
}

function formatTimeToMin(input) {
  if (input === "Άγνωστη") {
    return "Άγνωστη";
  }

  if (typeof input === "number") {
    if (input === 0) {
      return "τώρα";
    } else if (input === 1) {
      return "1 λεπτό";
    } else {
      return `${input} λεπτά`;
    }
  }

  return input; // Fallback for unexpected input
}

function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let evoxIds = {}

let personalizedAutoBus = {
  "831": "874"
} // This will contain bus Ids and which lineCode they have eg. { "831": "1228" } for bus "ΠΕΙΡΑΙΑΣ-ΑΙΓΑΛΕΩ (ΕΝΑΛΛΑΚΤΙΚΗ ΛΟΓΩ ΛΑΪΚΗΣ ΚΑΘΕ ΔΕΥΤΕΡΑ)"

if (localStorage.getItem("personalizedAutoBus")) {
  const temp = JSON.parse(localStorage.getItem("personalizedAutoBus"))
  personalizedAutoBus = temp
  console.log("set local personalized")
}
let frequentBuses_Sort = []; // Array to store bus data for sorting
let favoriteBuses_Sort = [];
let famousBuses_Sort = [];
const busesMap = {
  frequent: frequentBuses_Sort,
  favorite: favoriteBuses_Sort,
  famous: famousBuses_Sort,
};

function findBusBlocksByLineId(lineId) {
  // Filter the data to include only blocks with the specified LineID
  const filteredBlocks = fullLine.filter(block => block.LineID === lineId);

  // If multiple blocks are found, return them as an array
  if (filteredBlocks.length > 1) {
    return filteredBlocks;
  }

  // Return null if no duplicates are found
  return null;
}

function spawnInFeed(bus, descr, nextBusTime, timeInM, type, isPreload) {
  function general(section) { //section is the id of the div eg. frequent, favorite, famous
    // Clear skeleton placeholder if present
    const Div = document.getElementById(section);
    if (Div.innerHTML.includes('skeleton')) {
      Div.innerHTML = '';
    }
    const selectedSection = busesMap[section];

    // Push bus data to the array
    selectedSection.push({
      bus,
      descr,
      nextBusTime,
      timeInM: timeInM === 'Άγνωστη' ? Infinity : parseInt(timeInM, 10), // Treat 'Άγνωστη' as Infinity
    });

    // Sort buses based on timeInM
    selectedSection.sort((a, b) => a.timeInM - b.timeInM);

    // Render sorted buses
    Div.innerHTML = ''; // Clear current content
    selectedSection.forEach((busData, index) => {
      let highlight = '';
      if (busData === selectedSection[0] && section === 'frequent') {
        highlight = 'favorite'; // Highlight the first bus as the shortest time remaining
      }

      // Generate unique ID for this bus data
      const evoxId = generateRandomId(10);
      const busDataComplete = {
        bus: busData.bus, // Use the correct bus data from the sorted array
        descr: busData.descr,
        nextBusTime: busData.nextBusTime,
        timeInM: busData.timeInM === Infinity ? 'Άγνωστη' : busData.timeInM, // Show 'Άγνωστη' if time is Infinity
        type: type,
        multiple: findBusBlocksByLineId(busData.bus)
      };

      // Store the bus data with the generated ID
      evoxIds[evoxId] = busDataComplete;

      let spawnIn = formatTimeToMin(convertTimeApprox(busData.timeInM))
      if (busData.timeInM === Infinity) {
        spawnIn = 'Άγνωστη'
      }
      // Create the HTML for the bus item
      const tmp = `parallax-${randomString()}`
      const toSpawn = `
        <div class="item ${highlight} ${isPreload ? 'isPreloaded' : ''}">
          <div class="busName glowUpGlobaltxt_title">${busData.bus}</div>
          <div class="info">
            <div class="text">
              <span>Επόμενη άφιξη</span>
              <span id="${tmp}">${spawnIn}</span>
            </div>
          </div>
          <div class="fav-actions">
            <div onclick="processInfo('${evoxId}', 'getTimes')" class="button-action important">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.8321 14.5547C15.5257 15.0142 14.9048 15.1384 14.4453 14.8321L11.8451 13.0986C11.3171 12.7466 11 12.1541 11 11.5196L11 11.5L11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7L13 11.4648L15.5547 13.1679C16.0142 13.4743 16.1384 14.0952 15.8321 14.5547Z" fill="${busData === selectedSection[0] && section !== 'frequent' ? "#3557fd" : "#fff"}" />
              </svg>
            </div>
            <div onclick="processInfo('${evoxId}', 'showBusInfo')" class="button-action">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      `;


      Div.innerHTML += toSpawn;
      //const counterDiv = document.getElementById(tmp);
      //countUpWithParallax(counterDiv);
    });
  }
  if (type === 'frequent' || type === 'favorite' || type === 'famous') {
    general(type)
  }
}

const helloText = "oasa";
const helloElement = document.getElementById('hello-text');

// Function to display each character of "Hello" with a drawing effect
function displayHello() {
  helloText.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.4}s`;  // Add delay based on index
    helloElement.appendChild(span);
  });
}

function hasInternetConnection() {
  return navigator.onLine; // Returns true if online, false if offline
}

function goBackToSplash() {
  $("#runalpha1").fadeOut("fast")
  $("#runalpha2").fadeOut("fast")
  $("#runalpha3").fadeOut("fast")
  $("#runalpha4").fadeOut("fast")
  document.getElementById("loginForming").querySelector(".infoWelcome").style.display = null

  document.getElementById("loginContentFlex").classList.remove("noSplash")
  document.getElementById("hello-text").classList.remove("noSplash")

  $("#phone").fadeOut("fast", function () {
    $("#loginStep1").fadeOut("fast")
    document.getElementById("phone").classList.add("login")
    $("#phone").fadeIn("fast", function () {
      $("#loginForming").fadeIn("fast", function () { })
    })
  })
  $("#hello-text").fadeIn("slow", function () {

    //displayHello()
  })
}

function isNearEvery3Hours(proximityInMinutes = 5) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // Find the closest multiple of 3 to the current hour
  const closest3HourMark = Math.round(currentHour / 3) * 3;

  // Create a Date object for that time (using today's date)
  const closest3HourTime = new Date(now);
  closest3HourTime.setHours(closest3HourMark, 0, 0, 0); // Set to nearest 3-hour mark, with minutes and seconds as 0

  // Calculate the difference in minutes
  const diffInMilliseconds = Math.abs(now - closest3HourTime);
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // 60000 ms = 1 minute

  // Return true if the time is within the proximity
  return diffInMinutes <= proximityInMinutes;
}

function runTest() {
  document.getElementById("searchIntelli").classList.add("notLoaded")
  document.getElementById("update-center").classList.add("active")
}
// Utility functions for UI updates
const setLoadingState = (isLoading) => {
  const searchIntelli = document.getElementById("searchIntelli");
  const updateCenter = document.getElementById("update-center");
  if (isLoading) {
    searchIntelli?.classList.add("notLoaded");
    updateCenter?.classList.add("active");
  } else {
    searchIntelli?.classList.remove("notLoaded");
    updateCenter?.classList.remove("active");
  }
};

function registerPWA() {
  if (!hasInternetConnection()) {
    console.log("No internet connection. PWA registration skipped.");
    return;
  }

  if (!('serviceWorker' in navigator && 'PushManager' in window)) {
    console.log("Service Worker or Push Manager not supported.");
    return;
  }



  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./resign-sw.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);


        // Listen for updates to the service worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("New update available.");
                  setLoadingState(false);
                  // Notify the user about the update
                  //showUpdateNotification();
                } else {
                  console.log("Content cached for offline use.");
                  setLoadingState(false);
                }
              }
            };
          }
        };

        setupServiceWorkerMessaging();
        fetch(`z-oasa-current-version.evox`)
          .then(response => response.json())
          .then(data => {
            if (data.current !== currentVersion) {
              updateServiceWorkerCache()
            }
          })
          .catch(error => {
            alert("Failed to check for updates..")
          })
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

function clearAllCaches() {
  if ('caches' in self) {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => caches.delete(cache))
      );
    }).then(() => {
      alert('All caches cleared successfully!');
    }).catch(error => {
      console.error('Failed to clear caches:', error);
      alert('Failed to clear caches. Check the console for details.');
    });
  } else {
    alert('Caching is not supported in this browser.');
  }
}


// Show update notification to the user
function showUpdateNotification() {
  // Customize this to fit your app's UI
  alert("A new update is available! Refresh the page to apply the update.");
}

function updateServiceWorkerCache() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      action: 'UPDATE_CACHE'
    });
  } else {
    console.log('No active service worker found.');
  }
}

// Set up messaging between the page and the service worker
function setupServiceWorkerMessaging() {
  navigator.serviceWorker.ready
    .then((registration) => {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data) {
          switch (event.data.action) {
            case "CACHE_UPDATE_STARTED":
              console.log("Cache update started.");
              setLoadingState(true);
              break;
            case "CACHE_UPDATE_COMPLETED":
              console.log("Cache update completed.");
              setLoadingState(false);
              break;
          }
        }
      });
    })
    .catch((error) => {
      console.error("Failed to set up service worker messaging:", error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
  function getCookie(name) {
    // Find the cookie in document.cookie string
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      // Return the decoded cookie value
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;  // If the cookie doesn't exist
  }

  const cookieValue = getCookie('userData');

  let blockMoves = false
  if (cookieValue && !localStorage.getItem("hasRetrievedCookie") && !localStorage.getItem("t50pswd") && !localStorage.getItem("hasRetrievedCookie")) {
    // Parse the JSON string back into a JavaScript object
    const userData = JSON.parse(cookieValue);
    console.log(userData); // Access the JSON data
    //alert(userData)
    if (userData) {
      blockMoves = true
      let userConfirmed = window.confirm(`Βρέθηκε ο χρήστης ${userData.username} στην συσκευή.\nΘέλετε να συνδεθείτε αυτόματα;`);
      if (userConfirmed) {
        localStorage.setItem("t50-username", userData.username)
        localStorage.setItem("t50-email", userData.email)
        localStorage.setItem("t50pswd", userData.password)
        localStorage.setItem("hasRetrievedCookie", "true")
        setTimeout(() => {
          window.location.reload()
        }, 300);
      } else {
        // User clicked "Cancel"
        localStorage.setItem("hasBlockedCookie", "true")
        console.log("User canceled.");
      }

    }
    //console.log(`Username: ${userData.username}`);
    //console.log(`Email: ${userData.email}`);
  }

  if (localStorage.getItem("t50-username") && localStorage.getItem("t50-email") && localStorage.getItem("t50pswd") || localStorage.getItem("t50-username") && localStorage.getItem("t50-email") && localStorage.getItem("t50-pswd")) {
    getReady()
    registerPWA()
    //document.getElementById("profilePic").src = "https://www.gravatar.com/avatar/" + md5(localStorage.getItem("t50-email")) + "?d=identicon";

    if (hasInternetConnection()) {
      document.getElementById("oasaPfp").src = `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${localStorage.getItem("t50-username")}&v=${randomString()}`
    } else {
      document.getElementById("oasaPfp").src = 'apple.png'
    }



  } else {

    document.getElementById("oasaPfp").src = 'cbimage.png'
    if (localStorage.getItem("hasDismissedSetup") !== 'true') {
      document.getElementById("main").classList.add("setupNeeded")
      $("#phone").fadeOut("fast", function () {
        document.getElementById("phone").classList.add("login")
        $("#content").fadeOut("fast", function () {
          $("#phone").fadeIn("fast")
          $("#loginContent").fadeIn("fast")
          document.getElementById("loginForming").querySelectorAll("p")[0].classList.add("show")
          displayHello();
          let isTouching = false;
          document.addEventListener('touchstart', (e) => {
            isTouching = true;
          });

          document.addEventListener('touchmove', (e) => {
            if (!isTouching) return;

            const touch = e.touches[0];
            createTrail(touch.clientX, touch.clientY);
          });

          document.addEventListener('touchend', () => {
            isTouching = false;
          });

          function createTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'trail';
            trail.style.left = `${x - 7.5}px`;
            trail.style.top = `${y - 7.5}px`;

            document.body.appendChild(trail);

            // Remove the trail after the animation ends
            trail.addEventListener('animationend', () => {
              trail.remove();
            });
          }

          let startY;

          document.addEventListener('touchstart', (e) => {
            // Get the starting Y position of the touch
            startY = e.touches[0].clientY;
          });

          document.addEventListener('touchend', (e) => {
            // Get the ending Y position of the touch
            const endY = e.changedTouches[0].clientY;

            // Detect swipe direction and distance
            if (startY - endY > 50) { // 50px threshold for swipe up
              runFunction();  // Your function to run on swipe up
            }
          });

          function runFunction() {

            document.getElementById("loginContentFlex").classList.add("noSplash")
            document.getElementById("hello-text").classList.add("noSplash")
            document.getElementById("loginForming").querySelector(".infoWelcome").style.display = 'none'
            setTimeout(function () {

              $("#loginForming").fadeOut("fast", function () {
                $("#phone").fadeOut("fast", function () {
                  document.getElementById("phone").classList.remove("login")
                  $("#phone").fadeIn("fast", function () {
                    $("#loginStep1").fadeIn("fast")
                  })
                })

              })
              //$("#runalpha1").fadeIn("fast")
              //$("#runalpha2").fadeIn("fast")
              //$("#runalpha3").fadeIn("fast")
              //$("#runalpha4").fadeIn("fast")

            }, 800)
            console.log('Swipe up detected! Running the function...');
            // Add your custom function logic here
          }
          //setTimeout(function() {
          //  //document.getElementById("loginForming").classList.add("start")
          //  setTimeout(function() {
          //    document.getElementById("loginForming").querySelectorAll("p")[0].classList.add("show")
          //    setTimeout(function() {
          //      document.getElementById("loginForming").querySelectorAll("p")[1].classList.add("show")
          //    }, 1000)
          //  }, 400)
          //}, 500)
        })


      })
    } else {
      getReady()
    }
  }


  const allLines = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetLines&keyOrigin=evoxEpsilon`);

  function runOASABridge(data) {
    fullLine = data
    loadOasa() //BETA
    if (data) {
      let lc = localStorage.getItem("oasa_favorites");
      if (lc) {
        lc = JSON.parse(lc);
      }
      // Map each line to a promise for asynchronous handling
      let linesPromises = data.map(eachLine => {
        return new Promise((resolve, reject) => {
          document.getElementById("spawnHere").querySelectorAll("button").forEach(editBus => {
            if (lc && lc.includes(editBus.getAttribute("data-bus"))) {
              editBus.classList.add("favoriteBus")
            }
          })
          resolve(); // Mark the promise as resolved after DOM update
        });
      });

      // Wait for all promises to resolve (i.e., all buttons are added to the DOM)
      Promise.all(linesPromises)
        .then(() => {
          console.log('All lines have been spawned!');
          const element_b = document.getElementById('indexLoading');
          if (element_b) {
            element_b.remove(); // Remove the loading element
          }

          // Add additional functionality here
        })
        .catch(err => {
          console.error('An error occurred while spawning stops:', err);
        });
    }
  }
  fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${allLines}`)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("allLines", JSON.stringify(data))
      runOASABridge(data)


    })
    .catch(error => {
      console.log("All Lines Get Error:", error)
      if (localStorage.getItem("allLines")) {
        const tmp = localStorage.getItem("allLines")
        runOASABridge(JSON.parse(tmp))
      }
      return;
      if (isNearEvery3Hours()) {
        //alert(`Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.`)
        document.getElementById("performance").style.display = 'flex'
        document.getElementById("messagePerformance").innerHTML = 'Μερική Διακοπή'
        document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentVersion}`

        document.getElementById("spawnHere").innerHTML = 'Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.'
        document.getElementById("logErrors").innerHTML = `Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.`
      } else {
        //alert(`Δεν ηταν δυνατη η συνδεση στον διακομιστη.\nΑγνωστο σφαλμα`)
        document.getElementById("performance").style.display = 'flex'
        document.getElementById("messagePerformance").innerHTML = 'Σοβαρό περιστατικό'
        document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentVersion}`

        document.getElementById("spawnHere").innerHTML = 'Δεν ηταν δυνατη η συνδεση στον διακομιστη.<br>Αγνωστο σφαλμα'
        document.getElementById("logErrors").innerHTML = `Δεν ηταν δυνατη η συνδεση στον διακομιστη.<br>Αγνωστο σφαλμα<br>${error}`
      }
      if (error.toString().includes('Unexpected token')) {
        //alert("OASA SQL error. Δοκιμάστε ξανά.")
        document.getElementById("performance").style.display = 'flex'
        document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentVersion}`
        document.getElementById("messagePerformance").innerHTML = 'Σφάλμα OASA'
        document.getElementById("spawnHere").innerHTML = "OASA SQL error. Δοκιμάστε ξανά."
        document.getElementById("logErrors").innerHTML = `Σφάλμα από την πλευρά του OASA [SQL].<br>Επανεκκινήστε την εφαρμογή.<br>${error}`

      }
      const pers = localStorage.getItem("personalization")
      if (pers) {
        const personalize = JSON.parse(pers);
        const savedDate = new Date(personalize.date); // Convert to Date object
        const currentDate = new Date();

        // Calculate the difference in days
        const differenceInDays = (currentDate - savedDate) / (1000 * 60 * 60 * 24);

        if (differenceInDays <= 3 && type === "muteOfflineAlerts") {
          return;
          console.log("Date is within 2 days. Do something.");
        }
        // else {
        //    console.log("Date is older than 2 days. Do something else.");
        //}
      } else if (!hasInternetConnection()) {
        return;
      }
      //showErrors()
      //updateCountdown();


    })
})

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Filter function to find locations within a certain radius
function filterNearbyLocations(myloc, locations, radius) {
  if (!locations || !Array.isArray(locations) || locations.length < 2) {
    console.error('Invalid locations data:', locations);
    return false;
  }

  try {
    const distance = haversineDistance(myloc[1], myloc[0], locations[1], locations[0]);
    console.log("NEARBY", distance, radius);
    return distance <= radius;
  } catch (error) {
    console.warn(error)
    return true;
  }


}
function isPreviousNearby(currentLocation) {
  const previousLocation = localStorage.getItem('previousLocation');
  if (previousLocation) {
    const handle = JSON.parse(previousLocation); // Assuming handle is an array of locations

    const isNear = filterNearbyLocations(currentLocation, handle.query, 0.5);
    console.log("IsNear", isNear); // This will print an array of locations that are nearby
    if (isNear === true) {
      return true;
    }
  } else {
    return false; // No previous location stored
  }

}

function capitalizeWords(str) {
  if (typeof str !== 'string') {
    return ''; // Return an empty string if the input is not a valid string
  }

  return str
    .toLowerCase() // Ensure the rest of the letters are lowercase
    .replace(/h/g, 'η') // Replace all lowercase "h" with "η"
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string
}

function splitValue(value) {
  return {
    // Method to get the first part (before the first '-')
    getFirstPart: function () {
      const match = value.match(/^([^\-]*)/);
      return match ? match[1].trim() : '';
    },

    // Method to get the second part (after the last '-')
    getSecondPart: function () {
      const match = value.match(/[^-]+$/);  // Match after the last '-'
      return match ? match[0].trim().replace(/\(.*\)$/, '').trim() : '';
    }
  };
}

let activeBusInfo = {
  'go': [],
  'come': []
}

let activeEvoxId = null
let shownTimeTable = 0
let keepForVerticalStations;
function processInfo(evoxId, type, addMore, comego) {
  if (!comego) {
    comego = 'go'
  }
  if (evoxId) {
    activeEvoxId = evoxId
    console.log("gotInfo", evoxIds[evoxId])
    document.getElementById("top-navigate").classList.add('hidden')
    //$("#userFeed").fadeOut("fast")
    document.getElementById("userFeed").classList.add('focused')
    document.getElementById("busTimetable").style.display = 'block'
    setTimeout(function () { document.getElementById("busTimetable").classList.add('shown') }, 200)

    setTimeout(function () {
      document.getElementById("userFeed").style.display = 'none'

    }, 400)

    document.getElementById("searchIntelli").classList.add('notLoaded')
    if (type === 'getTimes') {
      document.getElementById("showMoreBusStart").style.display = 'none'
      document.getElementById("busGOCOME").innerHTML = ''
      const days = document.getElementById("busInfoDaySelector")
      days.innerHTML = ''
      const busInfo = evoxIds[evoxId]
      let matchingLines = fullLine.filter(line => line.LineID === busInfo.bus);
      console.log("Found Matches:", matchingLines)
      if (personalizedAutoBus[busInfo.bus]) {
        matchingLines = fullLine.filter(line => line.LineCode === personalizedAutoBus[busInfo.bus]);
        console.log("personalizedAutoBus", matchingLines)
      }
      const working = matchingLines[0]
      const descr = working.LineDescr
      const lineCode = working.LineCode
      document.getElementById("busInfoID").innerHTML = `${busInfo.bus}`//${busInfo.multiple ? "<svg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' style='transform: rotate(-90deg)'><path d='M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z' fill='#fff'></path></svg>" : ''}`

      let formattedText = descr.replace(/\((.*)\)/, "<br>($1)");
      document.getElementById("busInfoDesc").innerHTML = capitalizeWords(formattedText)
      document.getElementById("multiple-routes").innerHTML = ''
      if (busInfo.multiple) {
        try {
          busInfo.multiple.forEach(aroute => {
            const text = capitalizeWords(aroute.LineDescr.match(/\((.*?)\)/)?.[1])
            document.getElementById("multiple-routes").innerHTML += `<div onclick="switchRouteTo(this)" class="Block${descr === aroute.LineDescr ? ' active' : ""}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
    <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C10.2843 2 8.90356 3.38071 6.14214 6.14214C3.38071 8.90356 2 10.2843 2 12C2 13.7157 3.38071 15.0964 6.14214 17.8579C8.90356 20.6193 10.2843 22 12 22C13.7157 22 15.0964 20.6193 17.8579 17.8579C20.6193 15.0964 22 13.7157 22 12C22 10.2843 20.6193 8.90356 17.8579 6.14214C15.0964 3.38071 13.7157 2 12 2Z" fill="#fff"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7862 8.48705C13.0695 8.18486 13.5441 8.16955 13.8463 8.45285L16.513 10.9528C16.6642 11.0946 16.75 11.2927 16.75 11.5C16.75 11.7073 16.6642 11.9054 16.513 12.0472L13.8463 14.5472C13.5441 14.8305 13.0695 14.8151 12.7862 14.513C12.5029 14.2108 12.5182 13.7361 12.8204 13.4528L14.1034 12.25H10.6667C10.3329 12.25 9.8225 12.3497 9.4196 12.6216C9.05681 12.8665 8.75 13.2655 8.75 14C8.75 14.4142 8.41421 14.75 8 14.75C7.58579 14.75 7.25 14.4142 7.25 14C7.25 12.7345 7.83208 11.8835 8.5804 11.3784C9.28861 10.9003 10.1116 10.75 10.6667 10.75L14.1034 10.75L12.8204 9.54716C12.5182 9.26386 12.5029 8.78923 12.7862 8.48705Z" fill="#fff"/>
    </svg>${text === '' ? capitalizeWords(aroute.LineDescr) : text}
        </div>`
          })
        } catch (err) {
          console.error("Failed to load routes")
        }

      }

      function workOnSchedules(data) {
        days.innerHTML += `<div class="Block active">
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z" fill="#fff"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z" fill="#fff"/>
</svg>Καθημερινή
                                    </div>`
        data.forEach(day => {
          let icon = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3V4.34708C4.35095 4.54034 3.77636 4.8406 3.30848 5.30848C2.74209 5.87488 2.42133 6.59764 2.23866 7.41959C2.05852 8.23018 2 9.19557 2 10.312V15.688C2 16.8044 2.05852 17.7698 2.23866 18.5804C2.42133 19.4024 2.74209 20.1251 3.30848 20.6915C3.87488 21.2579 4.59764 21.5787 5.41959 21.7613C6.23018 21.9415 7.19557 22 8.312 22H15.688C16.8044 22 17.7698 21.9415 18.5804 21.7613C19.4024 21.5787 20.1251 21.2579 20.6915 20.6915C21.2579 20.1251 21.5787 19.4024 21.7613 18.5804C21.9415 17.7698 22 16.8044 22 15.688V10.312C22 9.19557 21.9415 8.23018 21.7613 7.41959C21.5787 6.59764 21.2579 5.87488 20.6915 5.30848C20.2236 4.8406 19.6491 4.54034 19 4.34708V3C19 2.44772 18.5523 2 18 2C17.4477 2 17 2.44772 17 3V4.03477C16.5889 4.01008 16.1515 4 15.688 4H8.312C7.84855 4 7.41113 4.01008 7 4.03477V3C7 2.44772 6.55228 2 6 2C5.44772 2 5 2.44772 5 3ZM6 9C6 8.44772 6.44772 8 7 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H7C6.44772 10 6 9.55228 6 9Z" fill="#fff"/></svg>`;
          // Default icon
          console.log(day)
          if (day.sdc_descr_eng.includes("WINTER")) {
            icon = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="12" x2="21" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="21" x2="12" y2="3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 17L7 7.00001" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 6.99998L7.00001 17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.58333 11.8999L6 9.99995" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.58333 11.9001L6 13.8001" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 11.9001L17.5833 13.8001" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 11.9L17.5833 10" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9001 7.58334L13.8001 6.00001" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9 7.58334L10 6.00001" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9001 17L13.8001 18.5834" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9 17L10 18.5834" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
          }
          console.log("Day is", day.sdc_descr)
          days.innerHTML += `<div class="Block">
                                        ${icon}${capitalizeWords(day.sdc_descr)}
                                    </div>`
        })
      }
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getScheduleDaysMasterline&p1=${lineCode}&keyOrigin=evoxEpsilon`)}&vevox=${randomString()}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem(`scheduleDays_${lineCode}_${comego}`, JSON.stringify(data))
          workOnSchedules(data)
        })
        .catch(error => {
          if (localStorage.getItem(`scheduleDays_${lineCode}_${comego}`)) {
            const workOn = localStorage.getItem(`scheduleDays_${lineCode}_${comego}`)
            const data = JSON.parse(workOn)
            workOnSchedules(data)
          } else {
            console.log('Load Bus Times List Error:', error)
          }

        });
      document.getElementById("timetableSpawn").innerHTML = `<div class="timeItem skeleton-button2"></div><div class="timeItem skeleton-button2"></div><div class="timeItem skeleton-button2"></div>`;  // Clear existing content
      function dailySchedule(data) {
        activeBusInfo = data
        const splitter = splitValue(busInfo.descr);
        console.log("The data:", data)
        if (data.go) {

          console.log('result', busInfo.descr);
          const result = splitter.getSecondPart() // Trim any leading or trailing spaces
          console.log('result', result);
          document.getElementById("busGOCOME").innerHTML += `<div class="Block${comego === 'go' ? ' active' : ""}" onclick="switchTo('go', this)">
                                        <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36 7L43 13.4615L36 21" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40 14H17.0062C10.1232 14 4.27787 19.6204 4.00964 26.5C3.72612 33.7696 9.73291 40 17.0062 40H34.0016" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Προς ${capitalizeWords(result)}
                                    </div>`

        }

        if (data.come) {
          const result = splitter.getFirstPart();
          document.getElementById("busGOCOME").innerHTML += `<div class="Block${comego === 'come' ? ' active' : ""}" onclick="switchTo('come', this)">
                                        <svg fill="#fff" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M0 21.984q0.032-0.8 0.608-1.376l4-4q0.448-0.48 1.056-0.576t1.12 0.128 0.864 0.736 0.352 1.12v1.984h18.016q0.8 0 1.408-0.576t0.576-1.408v-8q0-0.832-0.576-1.408t-1.408-0.608h-16q-0.736 0-1.248-0.416t-0.64-0.992 0-1.152 0.64-1.024 1.248-0.416h16q2.464 0 4.224 1.76t1.76 4.256v8q0 2.496-1.76 4.224t-4.224 1.76h-18.016v2.016q0 0.64-0.352 1.152t-0.896 0.704-1.12 0.096-1.024-0.544l-4-4q-0.64-0.608-0.608-1.44z"></path>
</svg>Προς ${capitalizeWords(result)}
                                    </div>`

        }
        if (data.come.length === 0 && data.go.length === 0 && !localStorage.getItem(`${busInfo.bus}_Times_${comego}`)) {
          console.log(data)
          console.log("Spawning For", lineCode, "Stopped.")
          document.getElementById("timetableSpawn").innerHTML = `<div class="failed">
    <img src="snap.png" class="failed-icon">
    <vox class="failed-message">Δεν βρέθηκαν δεδομένα</vox>
    <span class="failed-subtext">Δοκιμάστε αργότερα ή επανεκκινήστε την εφαρμογή</span>
</div>
`;
          return;
        } else {
          console.log("Come and go for ", busInfo, "\n", data)
        }

        console.log("Success", lineCode);
        console.log("Selected:", comego, 'with:', data[comego])
        let times = data[comego].map(item => {
          return formatTime(item.sde_start1);
        });
        console.log("Current times:", times)
        if (times.length === 0) {
          document.getElementById("timetableSpawn").innerHTML = `<div class="failed">
    <img src="snap.png" class="failed-icon">
    <vox class="failed-message">Δεν βρέθηκαν δεδομένα</vox>
    <span class="failed-subtext">${capitalizeWords(formattedText).includes("κυκλικη") ? "Η διαδρομή του λεωφορείου είναι κυκλική.<br>Δεν υπάρχουν δρομολόγια για επιστροφή." : "Δεν υπάρχει διαθέσιμη διαδρομή επιστροφής για αυτό το λεωφορείο."}</span>
</div>
`;
        }

        // Find the next bus time
        const nextBusTime = getNextBusTimeLIVE(times);
        let isLocal = false
        if (nextBusTime) {
          localStorage.setItem(`${busInfo.bus}_Timetable_${comego}`, JSON.stringify(data));
          localStorage.setItem(`${busInfo.bus}_Times_${comego}`, JSON.stringify(times));

          // Create the HTML content dynamically for each time

        } else {
          try {
            const timesNew = localStorage.getItem(`${busInfo.bus}_Times_${comego}`);
            times = JSON.parse(timesNew);
            isLocal = true
          } catch {
            console.error("Failed to find times for", busInfo.bus)
          }
          //try {
          //  if(times[0]) {
          //    const [hour, minutes] = times[0].split(":").map(Number);
          //    const workingTime = { hour, minutes };
          //    //alert(`Fallback: ${JSON.stringify(workingTime)}\n${bus}`)
          //    console.warn(`processInfo\nFailed to find next bus time for ${busInfo.bus}.\nWorking on the first value in schedule\nTimes:`, times);
          //    spawnInFeed(busInfo.bus, descr, workingTime, displayRemainingTimeLIVE(workingTime), 'frequent')
          //    //alert(`failed why?:\n${JSON.stringify(nextBusTime)}\n${JSON.stringify(times)}\nBus on work: ${busInfo.bus}`);
          //    //
          //  } else {
          //    spawnInFeed(busInfo.bus, descr, nextBusTime, 'Άγνωστη', 'frequent')
          //    console.log("No times found", times[0])
          //  }
          //  
          //} catch (error) {
          //  console.error('Fallback Error:', error);
          //  spawnInFeed(busInfo.bus, descr, nextBusTime, 'Άγνωστη', 'frequent')
          //}

        }

        let timetableContent = '';
        const remains = getNextBuses(times, addMore ? addMore : 7)
        shownTimeTable = shownTimeTable + addMore ? addMore : 7
        const previous = getPreviousBuses(times)
        if (previous[0]) {
          const value = previous[0].time;
          const currentTime = new Date();
          const [hours, minutes] = value.split(':').map(Number);
          const targetTime = new Date();
          targetTime.setHours(hours, minutes, 0, 0);
          const diffInMinutes = (currentTime - targetTime) / (1000 * 60);
          const result = diffInMinutes < 90 ? 'Ενεργό' : 'Χαμένο';
          //var textNode = document.createTextNode(result);
          //previousTimeBox.appendChild(textNode);
          //var span = document.createElement('span');
          //span.innerHTML = ``;
          //previousTimeBox.appendChild(span);
          //document.getElementById("evoxBased").appendChild(previousTimeBox);
          currentInfoForSchedo = {
            bus: busInfo.bus,
            match: working,
            isLocal: isLocal
          }
          timetableContent += `<div class="previous fade-in-slide-up timeItem ${isLocal ? "isLocal" : ""}" onclick="showDetailedTime('${previous[0].time.replace(/<\/?vox>/g, "").replace(/ .*$/, "")}','previous' , '${result}')">
        <p>${result}</p>
        <div class="actions" style="display:flex;flex-direction: column;justify-content: center;align-items: flex-end;">
          <vox style="text-decoration: line-through;">${previous[0].time}</vox><span style='font-size: 0.9rem;margin-top:4px;'>${previous[0].formatted}</span>
        </div>
      </div>`
        }
        remains.forEach((time, index) => {
          document.getElementById("showMoreBusStart").style.display = null
          timetableContent += `
      <div class="timeItem fade-in-slide-up${previous[0] && index === 0 ? " isNext" : ""} ${isLocal ? "isLocal" : ""}" onclick="showDetailedTime('${time.replace(/<\/?vox>/g, "").replace(/<\/?vox>/g, "").replace(/ .*$/, "")}','next')">
      <p>${time}</p>
        <div class="actions">
          <svg style="transform: rotate(180deg)" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#fff"/>
</svg>
        </div>
      </div>
    `;
        });

        // Insert the content into the element

        document.getElementById("timetableSpawn").innerHTML = timetableContent;
      }
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${lineCode}&keyOrigin=evoxEpsilon`)}&vevox=${randomString()}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem(`dailySchedule_${lineCode}_${comego}`, JSON.stringify(data))
          dailySchedule(data)
        })
        .catch(error => {
          const lc_Temp = localStorage.getItem(`dailySchedule_${lineCode}_${comego}`)
          if (lc_Temp) {
            dailySchedule(JSON.parse(lc_Temp))
          } else {
            console.log('Load Favorite Times Error:', error)
          }

          //document.getElementById("netStats").innerHTML = offlineSvg
          //spawnFallback(bus)
        });

      //Start finding stations info
      if (!addMore) {
        const container = document.getElementById("stationsSpawnInner")
        container.innerHTML = `<div class="item skeleton">
                                    <div class="busName skeleton-text"></div>
                                    <div class="info">
                                        <div class="text">
                                            <span class="skeleton-text"></span>
                                            <span class="skeleton-text"></span>
                                        </div>
                                    </div>
                                    <div class="fav-actions">
                                        <div class="button-action skeleton-button important"></div>
                                        <div class="button-action skeleton-button"></div>
                                    </div>
                                </div><div class="item skeleton">
                                    <div class="busName skeleton-text"></div>
                                    <div class="info">
                                        <div class="text">
                                            <span class="skeleton-text"></span>
                                            <span class="skeleton-text"></span>
                                        </div>
                                    </div>
                                    <div class="fav-actions">
                                        <div class="button-action skeleton-button important"></div>
                                        <div class="button-action skeleton-button"></div>
                                    </div>
                                </div><div class="item skeleton">
                                    <div class="busName skeleton-text"></div>
                                    <div class="info">
                                        <div class="text">
                                            <span class="skeleton-text"></span>
                                            <span class="skeleton-text"></span>
                                        </div>
                                    </div>
                                    <div class="fav-actions">
                                        <div class="button-action skeleton-button important"></div>
                                        <div class="button-action skeleton-button"></div>
                                    </div>
                                </div>`
        findBusInfo2(busInfo.bus).then((routeCode) => {

          getRouteStops(routeCode).then((stations) => {

            console.log("Found stations", stations);
            container.innerHTML = ''

            stations.forEach((station, index) => {
              container.innerHTML += `<div class="item" id="global-station-${station.StopCode}">
                                            <div class="stationName">${capitalizeWords(station.StopDescr)}</div>
                                            <div class="info">
                                                <div class="text">
                                                    <span>Επόμενη άφιξη</span>
                                                    <span id="station-${station.StopCode}"><!--<div class="loaderTimes"></div>--><svg class="compassAnim" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
        <path opacity="0.5"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#8fceff" />
        <path
            d="M13.024 14.5601C13.5166 14.363 13.763 14.2645 13.9562 14.095C14.0055 14.0518 14.0518 14.0055 14.095 13.9562C14.2645 13.763 14.363 13.5166 14.5601 13.024C15.484 10.7142 15.946 9.5593 15.4977 8.89964C15.3914 8.74324 15.2565 8.60834 15.1001 8.50206C14.4405 8.0538 13.2856 8.51575 10.9758 9.43966C10.4831 9.63673 10.2368 9.73527 10.0435 9.90474C9.99429 9.94792 9.94792 9.99429 9.90474 10.0435C9.73527 10.2368 9.63673 10.4831 9.43966 10.9758C8.51575 13.2856 8.0538 14.4405 8.50206 15.1001C8.60834 15.2565 8.74324 15.3914 8.89964 15.4977C9.5593 15.946 10.7142 15.484 13.024 14.5601Z"
            fill="#fff" />
    </svg></span>
                                                </div>
                                            </div>
                                            <div class="fav-actions">
                                            <div id="start-schedo-station-${station.StopCode}" onclick="addInfinity('${busInfo.bus}', '${station.StopCode}', 'showUp')" style="display:none" class="button-action glowUpGBSM">
                                                    <svg class="glowUpGlobaltxt_title" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5023 14.3674L20.5319 9.35289C21.2563 8.63072 21.6185 8.26963 21.8092 7.81046C22 7.3513 22 6.84065 22 5.81937V5.33146C22 3.76099 22 2.97576 21.5106 2.48788C21.0213 2 20.2337 2 18.6585 2H18.1691C17.1447 2 16.6325 2 16.172 2.19019C15.7114 2.38039 15.3493 2.74147 14.6249 3.46364L9.59522 8.47817C8.74882 9.32202 8.224 9.84526 8.02078 10.3506C7.95657 10.5103 7.92446 10.6682 7.92446 10.8339C7.92446 11.5238 8.48138 12.0791 9.59522 13.1896L9.74492 13.3388L11.4985 11.5591C11.7486 11.3053 12.1571 11.3022 12.4109 11.5523C12.6647 11.8024 12.6678 12.2109 12.4177 12.4647L10.6587 14.2499L10.7766 14.3674C11.8905 15.4779 12.4474 16.0331 13.1394 16.0331C13.2924 16.0331 13.4387 16.006 13.5858 15.9518C14.1048 15.7607 14.6345 15.2325 15.5023 14.3674ZM17.8652 8.47854C17.2127 9.12904 16.1548 9.12904 15.5024 8.47854C14.8499 7.82803 14.8499 6.77335 15.5024 6.12284C16.1548 5.47233 17.2127 5.47233 17.8652 6.12284C18.5177 6.77335 18.5177 7.82803 17.8652 8.47854Z" fill="#FFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.77409 12.4814C3.07033 12.778 3.07004 13.2586 2.77343 13.5548L2.61779 13.7103C2.48483 13.8431 2.48483 14.058 2.61779 14.1908C2.75125 14.3241 2.96801 14.3241 3.10147 14.1908L4.8136 12.4807C5.1102 12.1845 5.59079 12.1848 5.88704 12.4814C6.18328 12.778 6.18298 13.2586 5.88638 13.5548L4.17426 15.2648C3.4481 15.9901 2.27116 15.9901 1.545 15.2648C0.818334 14.5391 0.818333 13.362 1.545 12.6362L1.70065 12.4807C1.99725 12.1845 2.47784 12.1848 2.77409 12.4814ZM7.29719 16.696C7.5903 16.9957 7.58495 17.4762 7.28525 17.7693L5.55508 19.4614C5.25538 19.7545 4.77481 19.7491 4.48171 19.4494C4.1886 19.1497 4.19395 18.6692 4.49365 18.3761L6.22382 16.684C6.52352 16.3909 7.00409 16.3963 7.29719 16.696ZM11.4811 18.118C11.7774 18.4146 11.7771 18.8952 11.4805 19.1915L9.76834 20.9015C9.63539 21.0343 9.63539 21.2492 9.76834 21.382C9.9018 21.5153 10.1186 21.5153 10.252 21.382L10.4077 21.2265C10.7043 20.9303 11.1849 20.9306 11.4811 21.2272C11.7774 21.5238 11.7771 22.0044 11.4805 22.3006L11.3248 22.4561C10.5987 23.1813 9.42171 23.1813 8.69556 22.4561C7.96889 21.7303 7.96889 20.5532 8.69556 19.8274L10.4077 18.1174C10.7043 17.8211 11.1849 17.8214 11.4811 18.118Z" fill="#FFF"/>
<g opacity="0.5">
<path d="M10.8461 5.40925L8.65837 7.59037C8.25624 7.99126 7.88737 8.35901 7.59606 8.69145C7.40899 8.90494 7.22204 9.13861 7.06368 9.39679L7.04237 9.37554C7.00191 9.3352 6.98165 9.31501 6.96133 9.29529C6.58108 8.92635 6.1338 8.63301 5.64342 8.43097C5.61722 8.42018 5.59062 8.40964 5.53743 8.38856L5.2117 8.25949C4.77043 8.08464 4.65283 7.51659 4.9886 7.18184C5.95224 6.22112 7.10923 5.06765 7.6676 4.83597C8.16004 4.63166 8.692 4.56368 9.20505 4.6395C9.67514 4.70897 10.1198 4.95043 10.8461 5.40925Z" fill="#FFF"/>
<path d="M14.5816 16.8934C14.7579 17.0723 14.8749 17.1987 14.9808 17.3337C15.1204 17.5119 15.2453 17.7012 15.3542 17.8996C15.4767 18.123 15.5718 18.3616 15.7621 18.8389C15.9169 19.2274 16.4315 19.3301 16.7303 19.0322L16.8026 18.9601C17.7662 17.9993 18.9232 16.8458 19.1556 16.2891C19.3605 15.7982 19.4287 15.2678 19.3526 14.7563C19.283 14.2877 19.0408 13.8444 18.5807 13.1205L16.3857 15.3089C15.9745 15.7189 15.5974 16.0949 15.2564 16.3894C15.052 16.5659 14.8284 16.7423 14.5816 16.8934Z" fill="#FFF"/>
</g>
<g opacity="0.5">
<path d="M7.68621 14.5633C7.98263 14.2669 7.98263 13.7863 7.68621 13.4899C7.38979 13.1935 6.90919 13.1935 6.61277 13.4899L4.47036 15.6323C4.17394 15.9287 4.17394 16.4093 4.47036 16.7057C4.76679 17.0021 5.24738 17.0021 5.5438 16.7057L7.68621 14.5633Z" fill="#FFF"/>
<path d="M10.4954 17.369C10.7918 17.0726 10.7918 16.592 10.4954 16.2956C10.1989 15.9992 9.71835 15.9992 9.42193 16.2956L7.29417 18.4233C6.99774 18.7198 6.99774 19.2003 7.29417 19.4968C7.59059 19.7932 8.07118 19.7932 8.36761 19.4968L10.4954 17.369Z" fill="#FFF"/>
</g>
</svg>
                                                </div>
                                                <div id="2min-schedo-station-${station.StopCode}" onclick="addInfinity('${busInfo.bus}', '${station.StopCode}', '2min')" class="button-action">
                                                    <svg class="glowUpGlobaltxt_title" xmlns="http://www.w3.org/2000/svg" fill="#fff" width="20px"
                                                        height="20px" viewBox="-1 0 19 19" class="cf-icon-svg">
                                                        <path
                                                            d="M16.417 9.6A7.917 7.917 0 1 1 8.5 1.683 7.917 7.917 0 0 1 16.417 9.6zm-5.431 2.113H8.309l1.519-1.353q.223-.203.43-.412a2.974 2.974 0 0 0 .371-.449 2.105 2.105 0 0 0 .255-.523 2.037 2.037 0 0 0 .093-.635 1.89 1.89 0 0 0-.2-.889 1.853 1.853 0 0 0-.532-.63 2.295 2.295 0 0 0-.76-.37 3.226 3.226 0 0 0-.88-.12 2.854 2.854 0 0 0-.912.144 2.373 2.373 0 0 0-.764.42 2.31 2.31 0 0 0-.55.666 2.34 2.34 0 0 0-.274.89l1.491.204a1.234 1.234 0 0 1 .292-.717.893.893 0 0 1 1.227-.056.76.76 0 0 1 .222.568 1.002 1.002 0 0 1-.148.536 2.42 2.42 0 0 1-.389.472L6.244 11.77v1.295h4.742z">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="button-action">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.5" d="M21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.3529 4.10856 18.175 4.01211 16 4H8C5.82497 4.01211 4.64706 4.10856 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983Z" fill="#fff"/>
                                                        <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" fill="#fff"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 10.5C6.25 10.0858 6.58579 9.75 7 9.75H7.5C7.91421 9.75 8.25 10.0858 8.25 10.5C8.25 10.9142 7.91421 11.25 7.5 11.25H7C6.58579 11.25 6.25 10.9142 6.25 10.5ZM9.75 10.5C9.75 10.0858 10.0858 9.75 10.5 9.75H17C17.4142 9.75 17.75 10.0858 17.75 10.5C17.75 10.9142 17.4142 11.25 17 11.25H10.5C10.0858 11.25 9.75 10.9142 9.75 10.5ZM6.25 14C6.25 13.5858 6.58579 13.25 7 13.25H7.5C7.91421 13.25 8.25 13.5858 8.25 14C8.25 14.4142 7.91421 14.75 7.5 14.75H7C6.58579 14.75 6.25 14.4142 6.25 14ZM9.75 14C9.75 13.5858 10.0858 13.25 10.5 13.25H17C17.4142 13.25 17.75 13.5858 17.75 14C17.75 14.4142 17.4142 14.75 17 14.75H10.5C10.0858 14.75 9.75 14.4142 9.75 14ZM6.25 17.5C6.25 17.0858 6.58579 16.75 7 16.75H7.5C7.91421 16.75 8.25 17.0858 8.25 17.5C8.25 17.9142 7.91421 18.25 7.5 18.25H7C6.58579 18.25 6.25 17.9142 6.25 17.5ZM9.75 17.5C9.75 17.0858 10.0858 16.75 10.5 16.75H17C17.4142 16.75 17.75 17.0858 17.75 17.5C17.75 17.9142 17.4142 18.25 17 18.25H10.5C10.0858 18.25 9.75 17.9142 9.75 17.5Z" fill="#fff"/>
                                                        </svg>
                                                </div>
                                            </div>
                                        </div>`
            })

            let controller;
            controller = new AbortController();
            const signal = controller.signal;
            console.warn("Intelligence Triggered!")
            if (routeCode) {
              const intelligenceInfo = {
                "type": "browseStops",
                "route_code": routeCode,
                "stops": stations.map(stop => ({
                  StopCode: stop.StopCode,
                  StopDescr: stop.StopDescr,
                  RouteStopOrder: stop.RouteStopOrder,
                }))
              }
              keepForVerticalStations = intelligenceInfo

              fetch(`https://data.evoxs.xyz/oasa?intelligence=${JSON.stringify(intelligenceInfo)}&vevox=${randomString()}`, { signal })
                .then(response => response.json())
                .then(arrivals => {
                  console.log("Intelligence Results:", arrivals)



                  arrivals.sort((a, b) => a.RouteStopOrder - b.RouteStopOrder)
                  const leastTime = arrivals.filter(item => item.time !== false && item.time !== null).sort((a, b) => a.time - b.time);

                  if (leastTime[0]) {
                    const targets = document.querySelectorAll(`[id="global-station-${leastTime[0].StopCode}"]`);
                    targets.forEach((stopa) => {
                      stopa.classList.add("minimum")
                    })
                    //document.getElementById("stationsSpawnInner").innerHTML = `<div class="item minimum">
                    //                        <div class="stationName">Ζωντανή τοποθεσία</div>
                    //                        <div class="info">
                    //                            <div class="text">
                    //                                <span>${capitalizeWords(leastTime[0].StopDescr)}</span>
                    //                                <span id="station-minimum">σε ${leastTime[0].time} λεπτά</span>
                    //                            </div>
                    //                        </div>
                    //                        <div class="fav-actions">
                    //                            <div class="button-action">
                    //                                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="20px"
                    //                                    height="20px" viewBox="-1 0 19 19" class="cf-icon-svg">
                    //                                    <path
                    //                                        d="M16.417 9.6A7.917 7.917 0 1 1 8.5 1.683 7.917 7.917 0 0 1 16.417 9.6zm-5.431 2.113H8.309l1.519-1.353q.223-.203.43-.412a2.974 2.974 0 0 0 .371-.449 2.105 2.105 0 0 0 .255-.523 2.037 2.037 0 0 0 .093-.635 1.89 1.89 0 0 0-.2-.889 1.853 1.853 0 0 0-.532-.63 2.295 2.295 0 0 0-.76-.37 3.226 3.226 0 0 0-.88-.12 2.854 2.854 0 0 0-.912.144 2.373 2.373 0 0 0-.764.42 2.31 2.31 0 0 0-.55.666 2.34 2.34 0 0 0-.274.89l1.491.204a1.234 1.234 0 0 1 .292-.717.893.893 0 0 1 1.227-.056.76.76 0 0 1 .222.568 1.002 1.002 0 0 1-.148.536 2.42 2.42 0 0 1-.389.472L6.244 11.77v1.295h4.742z">
                    //                                    </path>
                    //                                </svg>
                    //                            </div>
                    //                        </div>
                    //                    </div>
                    //                    ${document.getElementById("stationsSpawnInner").innerHTML}
                    //`;
                  }
                  const promise = new Promise((resolve) => {
                    arrivals.forEach((stop, index) => {
                      const targets = document.querySelectorAll(`[id="station-${stop.StopCode}"]`);

                      const twomins = document.querySelectorAll(`[id="2min-schedo-station-${stop.StopCode}"]`);
                      const starts = document.querySelectorAll(`[id="start-schedo-station-${stop.StopCode}"]`);

                      let toSpawn = stop.time;
                      if (toSpawn === null) {
                        toSpawn = `<img src="busNotFound.png" width="25px" height="25px">`;
                        starts.forEach(target_single => {
                          target_single.style.display = ''
                        })
                        twomins.forEach(target_single => {
                          target_single.style.display = 'none'
                        })
                      } else if (toSpawn === false) {
                        toSpawn = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#fff"/>
<path d="M12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.58584 14.3415 10.232 13.883 10.704C13.7907 10.7989 13.7027 10.8869 13.6187 10.9708C13.4029 11.1864 13.2138 11.3753 13.0479 11.5885C12.8289 11.8699 12.75 12.0768 12.75 12.25V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V12.25C11.25 11.5948 11.555 11.0644 11.8642 10.6672C12.0929 10.3733 12.3804 10.0863 12.6138 9.85346C12.6842 9.78321 12.7496 9.71789 12.807 9.65877C13.0046 9.45543 13.125 9.18004 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75Z" fill="#fff"/>
<path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#fff"/>
</svg>`;
                        starts.forEach(target_single => {
                          target_single.style.display = ''
                        })
                        twomins.forEach(target_single => {
                          target_single.style.display = 'none'
                        })
                      } else if (toSpawn === "OASAERR") {
                        toSpawn = `Σφάλμα`;
                        twomins.forEach(target_single => {
                          target_single.style.display = 'none'
                        })
                      } else {

                        if (Number(stop.time) <= 2) {
                          twomins.forEach(target_single => {
                            target_single.style.display = 'none'
                          })
                        }

                        toSpawn += " λεπτά";
                      }

                      targets.forEach(target_single => {
                        target_single.innerHTML = toSpawn;
                      });

                      if (index === arrivals.length - 1) {
                        resolve(); // Resolve when the last iteration is done
                      }
                    });
                  });

                  promise.then(() => {
                    console.log("All updates are complete.");

                  });

                })
                .catch(error => {
                  const targets = document.querySelectorAll(`[id="station-${stop.StopCode}"]`);
                  targets.forEach(target_single => {
                    target_single.innerHTML = '<img src="snap.png" width="25px" height="25px">';
                  });
                  console.log("intelligence [1] error:", error);
                });

            } else {
              console.warn("Data not ready")
            }


          }).catch((error) => {
            console.error(error);
          });
        }).catch((error) => {
          console.error(error);
        });
      }
    } else if (type === 'showBusInfo') {
      console.log("Show Bus Info")
    }
  } else {
    console.log("No evoxId given")
  }
}


function returnFromBusTimetable() {
  keepForVerticalStations = null;
  shownTimeTable = 0
  currentInfoForSchedo = {}
  activeBusInfo = {}
  if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
    const element = document.getElementById('main-wrapper');
    element.scrollTop = 0;
  }
  document.getElementById("top-navigate").classList.remove('hidden')
  document.getElementById("userFeed").classList.remove('focused')
  document.getElementById("busTimetable").style.display = 'none'
  setTimeout(function () { document.getElementById("busTimetable").classList.remove('shown') }, 200)

  document.getElementById("userFeed").style.display = 'block'


  document.getElementById("searchIntelli").classList.remove('notLoaded')
}


function getPreviousBuses(times, more) {
  const countToLoad = more || 7; // Default to 7 if `more` is not provided

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

  const busTimes = times.map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    const busTime = hours * 60 + minutes; // Bus time in minutes since midnight
    const diff = currentTime - busTime; // Difference in minutes (negative for future buses, positive for past buses)

    return {
      time,
      isPast: busTime < currentTime, // Mark as past if bus time is earlier than current time
      remainingTime: diff // Positive for past buses
    };
  });

  // Filter only past buses
  const pastBuses = busTimes.filter(bus => bus.isPast);

  // Sort past buses in descending order (most recent past buses first)
  pastBuses.sort((a, b) => a.remainingTime - b.remainingTime);

  // Take the last `countToLoad` past buses
  const previousBuses = pastBuses.slice(0, countToLoad).map(bus => {
    const diff = bus.remainingTime; // Use positive remaining time for formatting
    let formattedRemainingTime;

    if (diff >= 60) {
      let hours = Math.floor(diff / 60);
      let remainingMinutes = diff % 60;

      if (remainingMinutes === 0) {
        formattedRemainingTime = hours === 1
          ? `πριν ${hours} ώρα`
          : `πριν ${hours} ώρες`;
      } else {
        formattedRemainingTime = hours === 1
          ? `πριν ${hours} ώρα ${remainingMinutes} λεπτά`
          : `πριν ${hours} ώρες ${remainingMinutes} λεπτά`;
      }
    } else {
      formattedRemainingTime = `πριν ${diff} λεπτά`;
    }

    return { time: bus.time, formatted: formattedRemainingTime }
    //`${bus.time}`;// - ${formattedRemainingTime}
  });

  return previousBuses;
}

function getNextBuses(times, more) {

  let countToLoad = null
  if (more) {
    countToLoad = more
  } else {
    countToLoad = 7
  }
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

  const busTimes = times.map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    const busTime = hours * 60 + minutes; // Bus time in minutes since midnight
    const diff = busTime - currentTime;
    return {
      time,
      remainingTime: diff >= 0 ? diff : diff + 24 * 60 // Adjust for next day if time is negative
    };
  });

  // Separate future and past bus times
  const futureBuses = busTimes.filter(bus => bus.remainingTime >= 0);
  const pastBuses = busTimes.filter(bus => bus.remainingTime < 0);

  // Sort future buses by remaining time
  futureBuses.sort((a, b) => a.remainingTime - b.remainingTime);

  // Find the nearest previous bus time
  let nearestPreviousBus = null;
  if (pastBuses.length > 0) {
    pastBuses.sort((a, b) => b.remainingTime - a.remainingTime); // Sort past buses in descending order
    nearestPreviousBus = pastBuses[0]; // Nearest previous bus (largest negative remaining time)
  }

  // Convert remaining times to the desired format for future buses


  const nextBuses = futureBuses.slice(0, countToLoad).map((bus) => {
    const diff = bus.remainingTime;
    let formattedRemainingTime;

    if (diff > 60) {
      let hours = Math.floor(diff / 60);
      let remainingMinutes = diff % 60;
      if (hours >= 1) {
        formattedRemainingTime = hours === 1
          ? `${hours} ώρα`
          : `${hours} ώρες`;
        return `<vox>${bus.time}</vox> <span style="font-size: 15px;margin-left: 2px;">${formattedRemainingTime}</span>`;
      } else {
        formattedRemainingTime = hours === 1
          ? `${hours} ώρα, ${remainingMinutes} λεπτά`
          : `${hours} ώρες, ${remainingMinutes} λεπτά`;
        return `<vox>${bus.time}</vox> <span style="font-size: 15px;margin-left: 2px;">${formattedRemainingTime}</span>`;
      }


    } else {
      formattedRemainingTime = `${diff} λεπτά`;
      return `<vox>${bus.time}</vox> <span style="font-size: 15px;margin-left: 2px;">${formattedRemainingTime}</span>`;
    }


  });

  // If there's a nearest previous bus, format it and prepend to nextBuses
  if (nearestPreviousBus) {
    const previousDiff = Math.abs(nearestPreviousBus.remainingTime); // Use absolute value for formatting
    const previousFormattedTime = `${nearestPreviousBus.time} - πρίν ${previousDiff} λεπτά`;
    nextBuses.unshift(previousFormattedTime);
  }

  // Log the original bus times
  busTimes.slice(0, 5).forEach(bus => {
    console.log(`Scheduled time: ${bus.time}`);
  });

  return nextBuses; // Return the next buses including the previous one
}


function manualLogout() {
  if (localStorage.getItem("t50-username")) {
    let userConfirmed = window.confirm(`Θέλετε να αποσυνδεθείτε από τον λογαριασμό σας [${localStorage.getItem("t50-username")}];`);
    if (userConfirmed) {
      localStorage.clear()
      sessionStorage.clear()
      setInterval(() => {
        window.location.reload()
      }, 500);
    }
  } else {
    let userConfirmed = window.confirm(`Δεν είστε συνδεδεμένοι. Θέλετε ακόμα να διαγράψετε τα δεδομένα σας;`);
    if (userConfirmed) {
      localStorage.clear()
      sessionStorage.clear()
      setInterval(() => {
        window.location.reload()
      }, 500);
    }
  }


}

let option = 'main'


//Connection With Shtepi Project

async function spawnBusOnMap(lineId) {
  try {
    //map.addSource('mapbox-dem', {
    //    'type': 'raster-dem',
    //    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    //    'tileSize': 512,
    //    'maxzoom': 14
    //});
    //// add the DEM source as a terrain layer with exaggerated height
    //map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    const routeCode = await findBusInfo2(lineId);
    const busLocation = await findCurrentBusLocation(routeCode);

    return;

    new mapboxgl.Marker({
      element: createRedDot()
    })
      .setLngLat([parseFloat(busLocation.lng), parseFloat(busLocation.lat)])
      .setPopup(new mapboxgl.Popup().setText(`${lineId} arriving at ${busLocation.stopName} in ${busLocation.time} minutes`))
      .addTo(map);


    map.flyTo({
      center: [parseFloat(busLocation.lng), parseFloat(busLocation.lat)], zoom: option === 'main' ? 14 : 16, curve: 1,
      easing(t) {
        // ease-in-out function
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }
    });
    activeMarker.forEach(marker => marker.remove());
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error fetching bus location.");
  }

}

async function findBusInfo2(id, getJustLineCode = false, getJustRouteCode = true) {
  async function routeOasa(lineCode) {
    const getStops = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getRoutesForLine&p1=${lineCode}&keyOrigin=evoxEpsilon`);
    const response = await fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${getStops}&vevox=${randomString()}`);
    const data = await response.json();
    console.log('Route:', data)
    if (data && data.length > 0) {
      return data[0].route_code;
    } else {
      throw new Error("Route Code not found.");
    }
  }

  async function nextUp() {
    const allLinesUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetLines&keyOrigin=evoxEpsilon`);
    const response = await fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${allLinesUrl}&vevox=${randomString()}`);
    const fullLine = await response.json();
    const matchingLines = fullLine.filter(line => line.LineID === id);

    if (matchingLines.length > 0) {
      const selectedLine = matchingLines[0];
      return await routeOasa(selectedLine.LineCode);
    } else {
      throw new Error("No matching lines found.");
    }
  }

  return await nextUp();
}

async function findCurrentBusLocation(routeCode, retries = 5, delay = 10) {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      fetchAndDisplayBusRoute(routeCode);
      return;
      const stops = await getRouteStops(routeCode);
      let nearestStop = null;
      let minTime = Infinity;

      for (const stop of stops) {
        const json = [stop.StopLat, stop.StopLng]
        const arrivals = await getStopArrivalTime(stop.StopCode, stop.StopDescr, json);

        arrivals.forEach(bus => {
          if (bus.route_code === routeCode && bus.btime2 < minTime) {
            minTime = bus.btime2;
            nearestStop = stop;
          }
        });
      }

      if (nearestStop) {
        return {
          lat: nearestStop.StopLat,
          lng: nearestStop.StopLng,
          time: minTime,
          stopName: nearestStop.StopDescr
        };
      } else {
        console.warn(`No bus currently found on route ${routeCode}. Showing the first stop.`);
        return {
          lat: stops[0].StopLat,
          lng: stops[0].StopLng,
          time: "Not started",
          stopName: stops[0].StopDescr
        };
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
      if (attempt < retries - 1) {
        await sleep(delay);
      } else {
        console.error(`All attempts failed. Returning fallback location.`);
        return {
          lat: null,
          lng: null,
          time: "Failed to fetch bus location",
          stopName: "Unknown"
        };
      }
    }
  }
}

async function fetchAndDisplayBusRoute(routeCode) {
  try {
    const stops = await getRouteStops(routeCode);  // Fetch stops for the given route code
    console.log(stops)
    if (stops.length > 0) {
      showBusRouteWithStops(stops, map);  // Display the route on the map
    } else {
      console.error('No stops found for this route');
    }
  } catch (error) {
    console.error('Error fetching stops for route:', error);
  }
}


// Function to display bus route on the map
async function showBusRouteWithStops(stops, map) {
  const orderedStops = stops.sort((a, b) => a.RouteStopOrder - b.RouteStopOrder);
  const coordinates = orderedStops.map(stop => [parseFloat(stop.StopLng), parseFloat(stop.StopLat)]);

  // Add the stops to the map as markers
  orderedStops.forEach(stop => {
    new mapboxgl.Marker({
      element: createBlueDot()
    })
      .setLngLat([parseFloat(stop.StopLng), parseFloat(stop.StopLat)])
      .setPopup(new mapboxgl.Popup().setText(stop.StopDescr)) // Popup with stop name
      .addTo(map);
  });

  // Create a line connecting the bus stops
  //map.addSource('busRoute', {
  //    type: 'geojson',
  //    data: {
  //        type: 'Feature',
  //        geometry: {
  //            type: 'LineString',
  //            coordinates: coordinates
  //        }
  //    }
  //});

  map.addLayer({
    id: 'busRouteLayer',
    type: 'line',
    //source: 'busRoute',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#fff',
      'line-width': 2
    }
  });

  console.log('Bus route displayed on the map');
}

function createBlueDot() {
  const dot = document.createElement('div');
  dot.style.width = '10px';
  dot.style.height = '10px';
  dot.style.backgroundColor = '#fff';
  dot.style.borderRadius = '50%';
  dot.style.transform = 'translate(-50%, -50%)'; // Center the dot on the marker position
  return dot;
}

function createBlinkingDot() {
  const dot = document.createElement('div');
  dot.style.width = '10px';
  dot.style.height = '10px';
  dot.style.backgroundColor = '#fff'; // Set the color to white
  dot.style.borderRadius = '50%';
  dot.style.transform = 'translate(-50%, -50%)'; // Center the dot on the marker position
  dot.style.animation = 'blink 1s infinite'; // Add blinking animation

  // Define the keyframes for the blinking animation
  const style = document.createElement('style');
  style.innerHTML = `
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
`;
  document.head.appendChild(style);

  return dot;
}


function createRedDot() {
  const dot = document.createElement('div');
  dot.style.width = '15px';
  dot.style.height = '15px';
  dot.style.backgroundColor = '#ff0000';
  dot.style.borderRadius = '50%';
  dot.style.transform = 'translate(-50%, -50%)'; // Center the dot on the marker position
  return dot;
}

async function getRouteStops(routeCode) {
  const url = `https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutesDetailsAndStops&p1=${routeCode}&keyOrigin=evoxEpsilon`)}&vevox=${randomString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const stops = data.stops || [];
    localStorage.setItem(`stations_${routeCode}`, JSON.stringify(stops));
    return stops;
  } catch (error) {
    console.warn('Fetch failed, falling back to localStorage:', error);
    const cachedStops = localStorage.getItem(`stations_${routeCode}`);
    return cachedStops ? JSON.parse(cachedStops) : [];
  }
}


let activeMarker = []

async function getStopArrivalTime(stopCode, stopName, cords, maxRetries = 5) {
  const url = `https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=${stopCode}&keyOrigin=evoxEpsilon`)}&vevox=${randomString()}`;

  const main = new mapboxgl.Marker({
    element: createBlinkingDot()
  })
    .setLngLat([parseFloat(cords[1]), parseFloat(cords[0])])
    .setPopup(new mapboxgl.Popup().setText(`Working..`))
    .addTo(map);
  activeMarker.push(main)
  map.flyTo(
    {
      center: [parseFloat(cords[1]),
      parseFloat(cords[0])], zoom: option === 'main' ? 14 : 16, pitch: 45, curve: 1,
      easing(t) {
        // ease-in-out function
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }
    }
  );
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      //verifying.play()
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        //verifying.stop()
        //foundActiveStation.play()
        return data; // Return arrivals if found
      } else {
        //verifying.stop()
        //inactiveStation.play()
        activeMarker.forEach(marker => marker.remove());
        console.warn(`No arrivals found for stopCode: ${stopName}/${stopCode}`);

        return []; // Return empty if no arrivals
      }
    } catch (error) {
      // Retry only if the error message contains 'SQL'
      if (error.message.includes("SQL")) {
        console.warn(`SQL-related error fetching stop arrivals for ${stopName}/${stopCode}. Retrying... (${attempt}/${maxRetries})`);
      } else {
        console.error(`Error fetching stop arrivals for ${stopName}/${stopCode}:`, error);
        break; // Do not retry for non-SQL errors
      }

      if (attempt === maxRetries) {
        console.error(`Failed to fetch arrivals for stop ${stopName}/${stopCode} after ${maxRetries} retries.`);
      }
    }
  }
  return []; // Return empty array if all retries fail
}


let previouslines;
let markers_intel = []

function spawnNearby() {
  //get the bus stops
  if (previouslines) {
    // Remove markers
    markers_intel.forEach((marker) => marker.remove());
    markers_intel = []; // Clear marker references

    // Remove layer and source
    if (map.getLayer(`route-${previouslines}`)) {
      map.removeLayer(`route-${previouslines}`);
    }
    if (map.getSource(`route-${previouslines}`)) {
      map.removeSource(`route-${previouslines}`);
    }
  }
  const temp = {
    'ev1': myLoc[1],
    'ev2': myLoc[0]
  }
  fetch(`https://data.evoxs.xyz/proxy?key=21&vevox=${randomString()}&targetUrl=${JSON.stringify(temp)}`)
    .then(response => response.json())
    .then(data => {
      console.log('Nearby!:', data)
      data.forEach(cord => {
        //eg
        //{
        //  "StopCode": "400254",
        //  "StopID": "400254",
        //  "StopDescr": "ΠΑΝΑΓΙΤΣΑ",
        //  "StopDescrEng": "PANAGITSA",
        //  "StopStreet": "ΑΓ.ΕΛΕΥΘΕΡΙΟΥ",
        //  "StopStreetEng": null,
        //  "StopHeading": "216",
        //  "StopLat": "37.9560577",
        //  "StopLng": "23.6615127",
        //  "distance": "0.00191520367585055"
        //},
        const toWorkOn = [{
          'lng': cord.StopLng,
          'lat': cord.StopLat,
          'StopDescr': cord.StopDescr,
          'StopCode': cord.StopCode,
          'StopID': cord.StopID
        }]
        addIt(toWorkOn, 'asNearStops');
      })

    })
    .catch(error => console.error('Error:', error));

  const colors = [
    "#007f00", "#ff66b3", "#007cbf", "#ff3300",
    "#ffff33", "#fff", "#ffffff", "#808080", "#ff9900", "#660066"
  ];

  function addIt(coordinates, asNearStops) {
    console.log(coordinates);

    // Fly to the first coordinate
    map.flyTo({
      center: [parseFloat(coordinates[0].lng), parseFloat(coordinates[0].lat)],
      zoom: 16,
      curve: 1,
      easing(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }
    });

    const id = randomString();
    previouslines = id; // Track current line ID

    // Add markers
    coordinates.forEach((coord, index) => {
      const dot = document.createElement('div');
      let offset = [0, 0];

      if (index === coordinates.length - 1 && !asNearStops) {
        dot.className = "custom-marker";
      } else if (index === 0 && !asNearStops) {
        dot.className = "transition";
        dot.onclick = function () {
          this.innerHTML = `<p>${capitalizeWords(coord.StopDescr)}</p>`
        }
        dot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#000"/>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#000"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#000"/>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#000"/>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#000"/>
<path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#000"/>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#000"/>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#000"/>
</svg>`; //
      } else {
        dot.className = "station";
        dot.onclick = function () {
          if (dot.getAttribute("data-status") === 'hidden') {
            this.innerHTML = `<p>${capitalizeWords(coord.StopDescr)}</p><svg onclick="openStation('${coord.StopCode}', '${capitalizeWords(coord.StopDescr)}');" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
            dot.setAttribute("data-status", 'visible')
          } else {
            this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#fff"/>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#fff"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#fff"/>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#fff"/>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#fff"/>
<path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#fff"/>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#fff"/>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#fff"/>
</svg>`
            dot.setAttribute("data-status", 'hidden')
          }

        }
        dot.setAttribute("data-status", 'hidden')
        dot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#fff"/>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#fff"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#fff"/>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#fff"/>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#fff"/>
<path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#fff"/>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#fff"/>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#fff"/>
</svg>`;
      }

      const marker = new mapboxgl.Marker({ element: dot, offset: offset })
        .setLngLat([coord.lng, coord.lat])
        .addTo(map);
      markers_intel.push(marker);
    });

    // Add a line connecting the points
    map.addSource(`route-${id}`, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates.map((coord) => [coord.lng, coord.lat]),
        },
      },
    });

    map.addLayer({
      id: `route-${id}`,
      type: "line",
      source: `route-${id}`,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": colors[Math.floor(Math.random() * colors.length)],
        "line-width": 4,
      },
    });
  }
}
function spawnAndShowInfo(bus, remain) {
  //get the bus stops
  if (remain === 'deleteAfter' && previouslines) {
    // Remove markers
    markers_intel.forEach((marker) => marker.remove());
    markers_intel = []; // Clear marker references

    // Remove layer and source
    if (map.getLayer(`route-${previouslines}`)) {
      map.removeLayer(`route-${previouslines}`);
    }
    if (map.getSource(`route-${previouslines}`)) {
      map.removeSource(`route-${previouslines}`);
    }
  }
  findBusInfo2(bus).then((returned) => {
    console.log(returned);

    const colors = [
      "#007f00", "#ff66b3", "#007cbf", "#ff3300",
      "#ffff33", "#fff", "#ffffff", "#808080", "#ff9900", "#660066"
    ];

    function addIt(coordinates) {
      console.log(coordinates);

      // Fly to the first coordinate
      map.flyTo({
        center: [parseFloat(coordinates[0].lng), parseFloat(coordinates[0].lat)],
        zoom: 16,
        curve: 1,
        easing(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
      });

      const id = randomString();
      previouslines = id; // Track current line ID

      // Add markers
      coordinates.forEach((coord, index) => {
        const dot = document.createElement('div');
        let offset = [0, 0];

        if (index === coordinates.length - 1) {
          dot.className = "custom-marker";
        } else if (index === 0) {
          dot.className = "transition";
          dot.onclick = function () {
            this.innerHTML = `<p>${capitalizeWords(coord.StopDescr)}</p>`
          }
          dot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#000"/>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#000"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#000"/>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#000"/>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#000"/>
<path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#000"/>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#000"/>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#000"/>
</svg>`; //
        } else {
          dot.className = "station";
          dot.onclick = function () {
            if (dot.getAttribute("data-status") === 'hidden') {
              this.innerHTML = `<p>${capitalizeWords(coord.StopDescr)}</p><svg onclick="openStation('${coord.StopCode}', '${capitalizeWords(coord.StopDescr)}');" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
              dot.setAttribute("data-status", 'visible')
            } else {
              this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#fff"/>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#fff"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#fff"/>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#fff"/>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#fff"/>
<path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#fff"/>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#fff"/>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#fff"/>
</svg>`
              dot.setAttribute("data-status", 'hidden')
            }

          }
          dot.setAttribute("data-status", 'hidden')
          dot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#fff"/>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#fff"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#fff"/>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#fff"/>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#fff"/>
<path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#fff"/>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#fff"/>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#fff"/>
</svg>`;
        }

        const marker = new mapboxgl.Marker({ element: dot, offset: offset })
          .setLngLat([coord.lng, coord.lat])
          .addTo(map);
        markers_intel.push(marker);
      });

      // Add a line connecting the points
      map.addSource(`route-${id}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinates.map((coord) => [coord.lng, coord.lat]),
          },
        },
      });

      map.addLayer({
        id: `route-${id}`,
        type: "line",
        source: `route-${id}`,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": colors[Math.floor(Math.random() * colors.length)],
          "line-width": 4,
        },
      });
    }

    console.log("REACHED LIVE")
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${returned}&type=currentLocation&vevox=${randomString()}`)
      .then(response => response.json())
      .then(data => {
        console.log("LIVE OK")
        try {
          data.forEach(location => {
            const dot = document.createElement('div');
            let offset = [0, 0];

            dot.className = "busLocation";
            dot.onclick = function () {
              if (dot.getAttribute("data-status") === 'hidden') {
                this.innerHTML = `<p>${bus}</p><svg onclick="alert('δεν είναι ακόμα έτοιμο αυτό...');" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
                dot.setAttribute("data-status", 'visible')
              } else {
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
    <path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#000"></path>
    <path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#000"></path>
    <path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#FFF"></path>
    <path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#000"></path>
    <path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#000"></path>
    <path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#000"></path>
    <path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#000"></path>
    <path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#000"></path>
    </svg>`
                dot.setAttribute("data-status", 'hidden')
              }

            }
            dot.setAttribute("data-status", 'hidden')
            dot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
    <path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#000"></path>
    <path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#000"></path>
    <path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#FFF"></path>
    <path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#000"></path>
    <path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#000"></path>
    <path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#000"></path>
    <path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#000"></path>
    <path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#000"></path>
    </svg>`;

            const marker = new mapboxgl.Marker({ element: dot, offset: offset })
              .setLngLat([location.CS_LNG, location.CS_LAT])
              .addTo(map);
            markers_intel.push(marker);
          })
        } catch (error) {
          console.log("live failed")
        }


      })
      .catch(error => console.error('Error:', error));

    const learning = localStorage.getItem("oasa-intelligence");
    if (learning) {
      const workOn = JSON.parse(learning);
      if (workOn[bus]) {
        if (workOn[bus][0].StopCode) {
          addIt(workOn[bus]);
          return;
        } else {
          localStorage.removeItem('oasa-intelligence')
        }


      }
    }

    // Fetch new bus data
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=https%3A%2F%2Ftelematics.oasa.gr%2Fapi%2F%3Fact%3DwebGetRoutesDetailsAndStops%26p1%3D${returned}%26keyOrigin%3DevoxEpsilon&vevox=${randomString()}`)
      .then(response => response.json())
      .then(data => {
        const coordinates = data.stops
          .map((stop) => ({
            lat: parseFloat(stop.StopLat),
            lng: parseFloat(stop.StopLng),
            StopDescr: stop.StopDescr,
            StopCode: stop.StopCode
          }))
          .sort((a, b) => a.RouteStopOrder - b.RouteStopOrder);

        if (localStorage.getItem("oasa-intelligence")) {
          const current = JSON.parse(localStorage.getItem("oasa-intelligence"));
          current[bus] = coordinates;
          localStorage.setItem("oasa-intelligence", JSON.stringify(current));
        } else {
          const json = { [bus]: coordinates };
          localStorage.setItem("oasa-intelligence", JSON.stringify(json));
        }

        addIt(coordinates);
      })
      .catch(error => console.error('Error:', error));

  })
}

function timeUntil(targetTime) {
  // Split the target time into hours and minutes
  const [targetHours, targetMinutes] = targetTime.split(':').map(Number);

  // Get the current date and time
  const now = new Date();

  // Create a new Date object for the target time on the current day
  const target = new Date(now);
  target.setHours(targetHours, targetMinutes, 0, 0);

  // If the target time has already passed today, set it to the next day
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  // Calculate the difference in minutes
  const remainingMinutes = Math.round((target - now) / 60000);

  // Convert and return the remaining minutes
  return convertTime(remainingMinutes);
}

let currentInfoForSchedo = {}

function showDetailedTime(time, type, text) {
  if (type) {
    currentInfoForSchedo.time = time
    document.getElementById("at-start-gen").classList.add("disabled")
    document.getElementById("befo-gen").classList.add("disabled")
    const checkbox_atStart = document.getElementById('at-start');
    checkbox_atStart.checked = false;
    fetch(`https://florida.evoxs.xyz/activeSchedo?username=${localStorage.getItem("t50-username")}&vevox=${randomString()}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.schedo.forEach(schedo => {
          if (schedo.bus === document.getElementById("busInfoID").innerText && schedo.time === time && schedo.id === localStorage.getItem("extVOASA")) {
            // To uncheck the checkbox
            checkbox_atStart.checked = true;
          } else {
            console.log(`None: ${schedo.bus} ${schedo.time} ${schedo.id},\nLocal: ${document.getElementById("busInfoID").innerText} ${time} ${localStorage.getItem("extVOASA")}`)
          }
          document.getElementById("at-start-gen").classList.remove("disabled")
          document.getElementById("befo-gen").classList.remove("disabled")
        })
      })
      .catch(error => {
        console.error("Failed to check for updates")
      })


    document.getElementById("timeInfo").innerHTML = time
    document.getElementById("busLineInfoForDetails").innerText = document.getElementById("busInfoDesc").innerText
    document.getElementById("timeInfoInText").innerText = 'σε ' + timeUntil(time)
    if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
      const element = document.getElementById('main-wrapper');
      element.scrollTop = 0;
    }
    document.getElementById("busTimetable").classList.add('fade-out-slide-down')

    setTimeout(function () { document.getElementById("busTimetable").style.display = 'none'; document.getElementById("busTimetable").classList.remove('fade-out-slide-down'); document.getElementById("busTimetable").classList.remove('shown'); }, 200)
    document.getElementById("timetableItemView").style.display = 'block'
    setTimeout(function () { document.getElementById("timetableItemView").classList.add('shown') }, 200)
    if (type === 'previous') {

    } else if (type === "next") {

    }
  }

}

function returnFromDetailedItemView() {
  currentInfoForSchedo.time = null
  if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
    const element = document.getElementById('main-wrapper');
    element.scrollTop = 0;
  }
  document.getElementById("timetableItemView").classList.add('fade-out-slide-down')
  setTimeout(function () { document.getElementById("timetableItemView").style.display = 'none'; }, 200)
  setTimeout(function () { document.getElementById("timetableItemView").classList.remove("fade-out-slide-down"); document.getElementById("timetableItemView").classList.remove("shown") }, 500)

  setTimeout(function () { document.getElementById("busTimetable").style.display = 'block'; document.getElementById("busTimetable").classList.add('shown'); document.getElementById("busTimetable").classList.add('fade-in-slide-up') }, 200)
  setTimeout(function () { document.getElementById("busTimetable").classList.remove('fade-in-slide-up') }, 500)

}

const checkboxa = document.getElementById('at-start');

checkboxa.addEventListener('change', function () {
  if (checkboxa.checked) {
    //The checkbox is now checked meaning a schedo should be created now
    if (localStorage.getItem("extVOASA")) {
      if (currentInfoForSchedo.bus && currentInfoForSchedo.time) {
        console.log("Evox json passed")

        const evoxJson = {
          'username': localStorage.getItem("t50-username"),
          'extv': localStorage.getItem("extVOASA"),
          'type': "transition",
          'bus': currentInfoForSchedo.bus,
          "transition": currentInfoForSchedo.time
        }

        console.log(evoxJson)
        fetch('https://florida.evoxs.xyz/oasaSchedo', {
          method: 'POST',
          body: JSON.stringify(evoxJson),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
          .then(data => {
            console.log("Florida Response", data)


          }).catch(error => {
            console.error('Fetch error:', error);
          });
        console.log('The checkbox is checked');
      } else {
        alert("Σφάλμα!")
        checkboxa.checked = false
      }
    } else {
      alert("Florida not enabled!")
      checkboxa.checked = false
    }
  } else {
    console.log('The checkbox is unchecked');


    //will proceed to remove the schedo

    fetch(`https://florida.evoxs.xyz/activeSchedo?username=${localStorage.getItem("t50-username")}&vevox=${randomString()}`)
      .then(response => response.json())
      .then(data => {
        if (data.schedo.length !== 0 && data.infinite.length !== 0) {
          const filteredData = data.schedo.filter(item => item.id === localStorage.getItem("extVOASA"));
          filteredData.forEach(schedoNotification => {
            if (schedoNotification.bus === currentInfoForSchedo.bus && schedoNotification.time === currentInfoForSchedo.time) {
              const valueToDelete = schedoNotification
              console.log("Will delete", valueToDelete)
              const timeNode = `${valueToDelete.date}/${valueToDelete.time}`
              const bus = valueToDelete.bus
              const id = valueToDelete.id
              const evoxJson2 = {
                'username': localStorage.getItem("t50-username"),
                'timenode': timeNode,
                'bus': bus,
                'deviceId': id
              }
              console.log("now pinging")
              fetch('https://florida.evoxs.xyz/deleteByNode', {
                method: 'POST',
                body: JSON.stringify(evoxJson2),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.text();
              })
                .then(data => {
                  console.log(data)
                }).catch(error => {
                  checkboxa.checked = true
                  console.error('Fetch error:', error);
                });
            }

          })
        }

      })
      .catch(error => {
        checkboxa.checked = true
        console.error("Failed to check for updates")
      })
  }
});
function switchTo(what, el) {
  if (!el.classList.contains('active')) {
    processInfo(activeEvoxId, 'getTimes', null, what)
  }
}

function showMoreBusStart() {
  processInfo(activeEvoxId, 'getTimes', shownTimeTable + 5)
}

function showVerticalStations() {
  document.getElementById("stationsBusName").innerHTML = document.getElementById("busInfoID").innerText
  document.getElementById("busGOCOMEForStations").innerHTML = document.getElementById("busGOCOME").innerHTML
  document.getElementById("busLineInfoForStations").innerText = document.getElementById("busInfoDesc").innerText
  if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
    const element = document.getElementById('main-wrapper');
    element.scrollTop = 0;
  }
  document.getElementById("busTimetable").classList.add('fade-out-slide-down')

  setTimeout(function () { document.getElementById("busTimetable").style.display = 'none'; document.getElementById("busTimetable").classList.remove('fade-out-slide-down'); document.getElementById("busTimetable").classList.remove('shown'); }, 200)
  document.getElementById("stationsVertical").style.display = 'block'
  setTimeout(function () { document.getElementById("stationsVertical").classList.add('shown') }, 200)

  document.getElementById("stationsSpawnVertical").innerHTML = ''
  if (keepForVerticalStations) {
    keepForVerticalStations.stops.forEach(station => {
      document.getElementById("stationsSpawnVertical").innerHTML += `<div id="global-vertical-station-${station.StopCode}" class="timeItem fade-in-slide-up" onclick="showStopDetails('${station.StopCode}', '${capitalizeWords(station.StopDescr)}')">
                                        <p>${capitalizeWords(station.StopDescr)}</p>
                                        <div class="actions">
                                            <span id="timeFor-${station.StopCode}"><svg class="compassAnim" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
        <path opacity="0.5"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#8fceff" />
        <path
            d="M13.024 14.5601C13.5166 14.363 13.763 14.2645 13.9562 14.095C14.0055 14.0518 14.0518 14.0055 14.095 13.9562C14.2645 13.763 14.363 13.5166 14.5601 13.024C15.484 10.7142 15.946 9.5593 15.4977 8.89964C15.3914 8.74324 15.2565 8.60834 15.1001 8.50206C14.4405 8.0538 13.2856 8.51575 10.9758 9.43966C10.4831 9.63673 10.2368 9.73527 10.0435 9.90474C9.99429 9.94792 9.94792 9.99429 9.90474 10.0435C9.73527 10.2368 9.63673 10.4831 9.43966 10.9758C8.51575 13.2856 8.0538 14.4405 8.50206 15.1001C8.60834 15.2565 8.74324 15.3914 8.89964 15.4977C9.5593 15.946 10.7142 15.484 13.024 14.5601Z"
            fill="#fff" />
    </svg></span><svg style="transform: rotate(180deg);margin-left:5px;" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#fff"></path>
</svg>
                                        </div>
                                    </div>`
    })

    fetch(`https://data.evoxs.xyz/oasa?intelligence=${JSON.stringify(keepForVerticalStations)}&vevox=${randomString()}`)
      .then(response => response.json())
      .then(arrivals => {
        console.log("Intelligence Results:", arrivals)



        arrivals.sort((a, b) => a.RouteStopOrder - b.RouteStopOrder)
        const leastTime = arrivals.filter(item => item.time !== false && item.time !== null).sort((a, b) => a.time - b.time);

        if (leastTime[0]) {
          document.getElementById(`global-vertical-station-${leastTime[0].StopCode}`).classList.add("currentLocation")
        }
        const promise = new Promise((resolve) => {
          arrivals.forEach((stop, index) => {
            const targets = document.querySelectorAll(`[id="timeFor-${stop.StopCode}"]`);

            let toSpawn = stop.time;
            if (toSpawn === null) {
              toSpawn = `<img src="busNotFound.png" width="25px" height="25px">`;
            } else if (toSpawn === false) {
              toSpawn = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#fff"/>
<path d="M12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.58584 14.3415 10.232 13.883 10.704C13.7907 10.7989 13.7027 10.8869 13.6187 10.9708C13.4029 11.1864 13.2138 11.3753 13.0479 11.5885C12.8289 11.8699 12.75 12.0768 12.75 12.25V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V12.25C11.25 11.5948 11.555 11.0644 11.8642 10.6672C12.0929 10.3733 12.3804 10.0863 12.6138 9.85346C12.6842 9.78321 12.7496 9.71789 12.807 9.65877C13.0046 9.45543 13.125 9.18004 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75Z" fill="#fff"/>
<path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#fff"/>
</svg>`;
            } else if (toSpawn === "OASAERR") {
              toSpawn = `Σφάλμα`;
            } else {
              toSpawn += "'";
            }

            targets.forEach(target_single => {
              target_single.innerHTML = toSpawn;
            });

            if (index === arrivals.length - 1) {
              resolve(); // Resolve when the last iteration is done
            }
          });
        });

        promise.then(() => {
          console.log("All updates are complete.");

        });

      })
      .catch(error => {
        console.log("intelligence [1] error:", error);
      });
  }

}

function returnFromStationsVertical() {
  if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
    const element = document.getElementById('main-wrapper');
    element.scrollTop = 0;
  }
  document.getElementById("stationsVertical").classList.add('fade-out-slide-down')
  setTimeout(function () { document.getElementById("stationsVertical").style.display = 'none'; }, 200)
  setTimeout(function () { document.getElementById("stationsVertical").classList.remove("fade-out-slide-down"); document.getElementById("stationsVertical").classList.remove("shown") }, 500)

  setTimeout(function () { document.getElementById("busTimetable").style.display = 'block'; document.getElementById("busTimetable").classList.add('shown'); document.getElementById("busTimetable").classList.add('fade-in-slide-up') }, 200)
  setTimeout(function () { document.getElementById("busTimetable").classList.remove('fade-in-slide-up') }, 500)
}

function displayLocalStorage() {
  const itemsContainer = document.getElementById('localStorageItems');
  itemsContainer.innerHTML = ''; // Clear existing items

  const keys = Object.keys(localStorage);
  if (keys.length === 0) {
    itemsContainer.textContent = 'No items in localStorage.';
    return;
  }

  keys.forEach(key => {
    const value = localStorage.getItem(key);
    // Create item div
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    // Key display
    const keyDisplay = document.createElement('span');
    keyDisplay.textContent = `${key}: `;
    itemDiv.appendChild(keyDisplay);

    // Editable value input
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.value = value;
    itemDiv.appendChild(valueInput);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      localStorage.setItem(key, valueInput.value);
      displayLocalStorage(); // Refresh display
      alert('Item edited successfully!');
    });
    itemDiv.appendChild(editBtn);

    // Append item to container
    itemsContainer.appendChild(itemDiv);
  });
}

// Call display function on page load
displayLocalStorage();

// Add new item to localStorage
document.getElementById('addItem').addEventListener('click', function () {
  const newKey = document.getElementById('newKey').value.trim();
  const newValue = document.getElementById('newValue').value.trim();

  if (newKey && newValue) {
    localStorage.setItem(newKey, newValue);
    document.getElementById('newKey').value = '';
    document.getElementById('newValue').value = '';
    displayLocalStorage();
    alert('Item added successfully!');
  } else {
    alert('Please enter both key and value.');
  }
});

function convert2Txt() {
  const value = document.getElementById("gotobaseNone").value;

  try {
    if (!value) {
      throw new Error("Input is empty. Please enter a Base64 encoded string.");
    }

    const new1 = atob(value);
    alert(`Decoded: ${new1}`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

function convert2Base() {
  const value = document.getElementById("gotobase64").value
  try {
    const new1 = btoa(value)
    alert(`Encoded: ${new1}`)
  } catch (error) {
    alert(error)
  }
}

function showStopDetails(stopCode, stopName) {
  document.getElementById("stationInfoName").innerText = stopName


  if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
    const element = document.getElementById('main-wrapper');
    element.scrollTop = 0;
  }
  document.getElementById("stationsVertical").classList.add('fade-out-slide-down')

  setTimeout(function () { document.getElementById("stationsVertical").style.display = 'none'; document.getElementById("stationsVertical").classList.remove('fade-out-slide-down'); document.getElementById("stationsVertical").classList.remove('shown'); }, 200)
  document.getElementById("stationInfo").style.display = 'block'
  setTimeout(function () { document.getElementById("stationInfo").classList.add('shown') }, 200)

  fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=${stopCode}&keyOrigin=evoxEpsilon`)}&vevox=${randomString()}`)
    .then(response => response.json())
    .then(buses => {
      if (buses === null) {
        console.log("None coming to station")
      } else {

      }
    })
    .catch(error => {
      console.log("intelligence [1] error:", error);
    });


  document.getElementById("busesComingtoStation").innerHTML = `<div class="timeItem skeleton-button2"></div><div class="timeItem skeleton-button2"></div><div class="timeItem skeleton-button2"></div><div class="timeItem skeleton-button2"></div>`
  const stop_url_1 = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webRoutesForStop&p1=${stopCode}&keyOrigin=evoxEpsilon`);
  fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stop_url_1}&vevox=${randomString()}`)
    .then(response => response.json())
    .then(stop => {
      let start = {};
      let isReady = false;
      let count = 0;
      let finale = '';
      const stop_url = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=${stopCode}&keyOrigin=evoxEpsilon`);
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stop_url}&vevox=${randomString()}`)
        .then(response => response.json())
        .then(arrivals => {
          document.getElementById("busesComingtoStation").innerHTML = '';
          let matchFound = false;
          let busesArrivals = {}; // Object to keep track of buses and their arrival times

          stop.forEach(data => {
            count++;
            start[data.LineID] = {
              "desc": data.LineDescr,
              "lineCode": data.LineCode,
              "routeCode": data.RouteCode,
              "id": data.LineID
            };
            if (count === stop.length) {
              isReady = true;
            }

            arrivals.forEach(arrive => {
              if (arrive.route_code === data.RouteCode) {
                if (!busesArrivals[data.LineID]) {
                  busesArrivals[data.LineID] = new Set(); // Initialize a Set for this bus to store unique times
                }

                busesArrivals[data.LineID].add(arrive.btime2); // Add the new arrival time to the Set (automatically handles duplicates)

                matchFound = true; // Set flag to true if a match is found
              }
            });
          });

          // After collecting all arrival times, create HTML
          Object.keys(busesArrivals).forEach(lineID => {
            const arrivalTimes = Array.from(busesArrivals[lineID]).join("', "); // Convert Set to array and join times with a comma
            const busDesc = start[lineID].desc;
            document.getElementById("busesComingtoStation").innerHTML += `
                        <div class="timeItem">
                            <p>${lineID}</p>
                            <div class="actions">
                                <span>${arrivalTimes}'</span>
                                <svg style="transform: rotate(180deg);margin-left:5px;" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                    <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#fff"></path>
                                </svg>
                            </div>
                        </div>
                    `;
          });
        })
        .catch(error => {
          document.getElementById("busesComingtoStation").innerHTML = `
                    <div class="failed">
                        <img src="snap.png" class="failed-icon">
                        <vox class="failed-message">Δεν βρέθηκαν λεωφορεία</vox>
                        <span class="failed-subtext">Κανένα λεωφορείο δεν κατευθύνεται προς την στάση ${stopName}</span>
                    </div>
                `;
          console.log("getStop [65] error:", error);
        });
    })
    .catch(error => {
      document.getElementById("busesComingtoStation").innerHTML = `<div class="failed">
    <img src="snap.png" class="failed-icon">
    <vox class="failed-message">Δεν βρέθηκαν λεωφορεία</vox>
    <span class="failed-subtext">Κανένα λεωφορείο δεν κατευθύνεται προς την στάση ${stopName}</span>
</div>`
      //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]");
      console.log("getStop [63] error:", error);
    });
}

directBack = false

function returnFromStationInfo() {
  if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
    const element = document.getElementById('main-wrapper');
    element.scrollTop = 0;
  }

  document.getElementById("stationInfo").classList.add('fade-out-slide-down')
  setTimeout(function () { document.getElementById("stationInfo").style.display = 'none'; }, 200)
  setTimeout(function () { document.getElementById("stationInfo").classList.remove("fade-out-slide-down"); document.getElementById("stationInfo").classList.remove("shown") }, 500)

  if (directBack === true) {
    directBack = false
    keepForVerticalStations = null;
    shownTimeTable = 0
    currentInfoForSchedo = {}
    activeBusInfo = {}
    if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
      const element = document.getElementById('main-wrapper');
      element.scrollTop = 0;
    }
    document.getElementById("top-navigate").classList.remove('hidden')
    document.getElementById("userFeed").classList.remove('focused')
    document.getElementById("busTimetable").style.display = 'none'
    setTimeout(function () { document.getElementById("busTimetable").classList.remove('shown') }, 200)

    document.getElementById("userFeed").style.display = 'block'


    document.getElementById("searchIntelli").classList.remove('notLoaded')
    return;
  } else {
    setTimeout(function () { document.getElementById("stationsVertical").style.display = 'block'; document.getElementById("stationsVertical").classList.add('shown'); document.getElementById("stationsVertical").classList.add('fade-in-slide-up') }, 200)
    setTimeout(function () { document.getElementById("stationsVertical").classList.remove('fade-in-slide-up') }, 500)
  }

}

document.getElementById('searchInSearch').addEventListener('focus', function () {
  $("#recommendSpawn").fadeOut("fast")
  document.getElementById("searchContainer").classList.add("active")
  searchInInput()
})

document.getElementById('searchInSearch').addEventListener('blur', function () {
  //$("#recommendSpawn").fadeIn("fast")
  //document.getElementById("searchContainer").classList.remove("active")
  //document.getElementById('toSpawnFinds').classList.add('hidden');
})

document.getElementById('searchInSearch').addEventListener('input', function () {
  searchInInput()

})

function searchInInput() {
  const lineIdToFind = document.getElementById("searchInSearch").value
  if (lineIdToFind.length < 2) {
    if (previouslines) {
      // Remove markers
      markers_intel.forEach((marker) => marker.remove());
      markers_intel = []; // Clear marker references

      // Remove layer and source
      if (map.getLayer(`route-${previouslines}`)) {
        map.removeLayer(`route-${previouslines}`);
      }
      if (map.getSource(`route-${previouslines}`)) {
        map.removeSource(`route-${previouslines}`);
      }
      map.flyTo({
        center: [parseFloat(myLoc[0]), parseFloat(myLoc[1])],
        zoom: 16,
        curve: 1,
        easing(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
      });
    }

    document.getElementById("toSpawnFinds").querySelectorAll("*").forEach((elem) => {
      elem.classList.add("simple-fadeOut");
    });
    return;
  }
  let matchingLines = fullLine.filter(line => line.LineID.includes(lineIdToFind));  // Check for partial matches 
  let shortMatches = fullLine.filter(line => line.LineID === lineIdToFind)
  $("#linesContainer").fadeIn("fast")
  //console.log(matchingLines)
  document.getElementById("toSpawnFinds").innerHTML = ""
  matchingLines.forEach((bus, index) => {
    const delay = index * 0.1;
    if (shortMatches[0] === bus) {
      spawnAndShowInfo(shortMatches[0].LineID, 'deleteAfter')
      document.getElementById("toSpawnFinds").innerHTML = `<div onclick="spawnAndShowInfo('${bus.LineID}', 'remain')" class="Block simple-fadeIn match" style="opacity:0;">
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#FFF"></path>
<path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#FFF"></path>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#FFF"></path>
<path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#FFF"></path>
<path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#FFF"></path>
<path opacity="0.5" d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#FFF"></path>
<path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#FFF"></path>
<path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#FFF"></path>
</svg>${bus.LineID}<svg style="transform: rotate(-35deg)" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
  </div>${document.getElementById("toSpawnFinds").innerHTML}`
    } else {
      document.getElementById("toSpawnFinds").innerHTML += `<div onclick="spawnAndShowInfo('${bus.LineID}', 'remain')" class="Block simple-fadeIn" style="animation-delay: ${delay}s;opacity:0;">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" fill="#FFF"></path>
                  <path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" fill="#FFF"></path>
                  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" fill="#FFF"></path>
                  <path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" fill="#FFF"></path>
                  <path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" fill="#FFF"></path>
                  <path opacity="0.5" d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" fill="#FFF"></path>
                  <path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#FFF"></path>
                  <path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#FFF"></path>
                  </svg>${bus.LineID}<svg style="transform: rotate(-35deg)" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
                        </div>`
    }

  })
  document.getElementById('toSpawnFinds').classList.remove('hidden');
}

function getNearestMatch(descr, routeDescrs) {
  let closestMatch = null;
  let closestDistance = Infinity;

  routeDescrs.forEach(description => {
    const distance = levenshteinDistance(descr, description);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestMatch = description;
    }
  });

  return closestMatch;
}

// Simple Levenshtein Distance function
function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,     // deletion
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

function addInfinity(busLineId, stationCode, type) {
  const toFindRouteCode = evoxIds[activeEvoxId]
  const linesSearch = fullLine.filter(item => item.LineID === busLineId);
  let routeCode = null
  linesSearch.forEach(line => {
    const lineCode = line.LineCode;
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutes&p1=${lineCode}&keyOrigin=evoxEpsilon`)}&vevox=${randomString()}`)
      .then(response => response.json())
      .then(routes => {
        console.log(routes);
        if (routes) {
          let matched = false;
          const toFindRouteDescr = toFindRouteCode.descr;
          const routeDescrs = routes.map(route => route.RouteDescr);

          routes.forEach(route => {
            const nearestMatchDescr = getNearestMatch(toFindRouteDescr, routeDescrs);
            if (route.RouteDescr === nearestMatchDescr) {
              console.log(route.RouteCode, route.RouteDescr);
              routeCode = route.RouteCode
              matched = true;
              // You can uncomment this if you want to stop after finding the match
              // return;
            }
          });

          if (!matched) {
            alert("Σφάλμα εύρεσης της γραμμής.")
            //console.log("No matching route found.");
            return;
          } else {
            console.log("OKAY")
            if (type === 'showUp' || type === '2min') {
              if (localStorage.getItem("extVOASA")) {
                fetch(`https://florida.evoxs.xyz/liveNotif?username=${localStorage.getItem("t50-username")}&deviceId=${localStorage.getItem("extVOASA")}&busId=${busLineId}&stationCode=${stationCode}&routeCode=${routeCode}&origin=resign${type === '2min' ? "&method=2minutes" : ''}&vevox=${randomString()}`) //&method=2minutes
                  .then(response => response.text())
                  .then(data => {
                    console.log("SchedoInfi:", data)
                    //set
                  })
                  .catch(error => {
                    console.error("Failed to check for updates")
                  })
              }

            }
          }
        }
      })
      .catch(error => {
        console.error("Failed to check for updates");
      });
  });



}

function switchRouteTo(el) {
  const text = el?.textContent.trim();
  const workOn = evoxIds[activeEvoxId]
  const multiple = workOn.multiple
  multiple.forEach(aroute => {
    if (capitalizeWords(aroute.LineDescr) === text) {
      //redirect the page to the default route
      personalizedAutoBus[workOn.bus] = aroute.LineCode
      workOn.descr = aroute.LineDescr
      processInfo(activeEvoxId, 'getTimes', null)
      console.log('Redirecting to default route', aroute.LineCode)

    } else if (capitalizeWords(aroute.LineDescr.match(/\((.*?)\)/)?.[1]) === text) {
      //redirect the page to some other route
      personalizedAutoBus[workOn.bus] = aroute.LineCode
      workOn.descr = aroute.LineDescr
      processInfo(activeEvoxId, 'getTimes', null)
      console.log('Redirecting to some other route', aroute.LineCode)
    } else {
      return;
    }

    localStorage.setItem("personalizedAutoBus", JSON.stringify(personalizedAutoBus))

  })
}

function openStation(code, descr) {
  document.getElementById("top-navigate").classList.add('hidden')
  //$("#userFeed").fadeOut("fast")
  document.getElementById("userFeed").classList.add('focused')
  document.getElementById("busTimetable").style.display = 'block'
  setTimeout(function () { document.getElementById("busTimetable").classList.add('shown') }, 200)

  setTimeout(function () {
    document.getElementById("userFeed").style.display = 'none'

    if (document.getElementById("returnTopDefines").classList.contains("scrolled")) {
      const element = document.getElementById('main-wrapper');
      element.scrollTop = 0;
    }
    document.getElementById("busTimetable").classList.add('fade-out-slide-down')

    setTimeout(function () { document.getElementById("busTimetable").style.display = 'none'; document.getElementById("busTimetable").classList.remove('fade-out-slide-down'); document.getElementById("busTimetable").classList.remove('shown'); }, 200)
    document.getElementById("stationsVertical").style.display = 'block'
    setTimeout(function () { document.getElementById("stationsVertical").classList.add('shown') }, 200)
    document.getElementById("stationsVertical").classList.add('fade-out-slide-down')
    setTimeout(function () { document.getElementById("stationsVertical").style.display = 'none'; }, 200)
    setTimeout(function () { document.getElementById("stationsVertical").classList.remove("fade-out-slide-down"); document.getElementById("stationsVertical").classList.remove("shown") }, 500)

    closeSearch()
    document.getElementById("searchIntelli").classList.add('notLoaded')
  }, 400)
  directBack = true
  showStopDetails(code, descr)

}

function showMenu() {
  $("#account-home").fadeOut("fast");
  $("#notifications-home").fadeOut("fast", function () {
    const navigate = document.getElementById("top-navigate");
    navigate.classList.add("expand"); // Add the class to expand the element
    setTimeout(function () {
      // Add options dynamically or make them visible
      const options = document.createElement("div");
      options.classList.add("menu-options");
      options.innerHTML = `
        <button onclick="optionAction('Option 1')">Option 1</button>
        <button onclick="optionAction('Option 2')">Option 2</button>
        <button onclick="optionAction('Option 3')">Option 3</button>
      `;
      navigate.appendChild(options);
    }, 300); // Wait for the animation to complete
  });
}

function optionAction(option) {
  alert(`You selected: ${option}`);
}

function resetMenu() {
  const navigate = document.getElementById("top-navigate");

  // Reset styles applied in showMenu
  navigate.style.justifyContent = "center"; // Assuming "center" is the default
  navigate.style.transition = ""; // Clear any transition styles

  // Remove the shrink class
  navigate.classList.remove("shrink");

  // Reset visibility for icons
  const accountHome = document.getElementById("account-home");
  const notificationsHome = document.getElementById("notifications-home");

  accountHome.style.display = "block"; // Show the element
  notificationsHome.style.display = "block";

  // Optional: Reset anything else you modified in showMenu
}


function showLocalPanel() {
  if(document.getElementById("storage-editor").getAttribute("data-e") === 'hidden') {
    $("#storage-editor").fadeIn("fast")
    document.getElementById("storage-editor").setAttribute("data-e", '')
  } else {
    $("#storage-editor").fadeOut("fast")
    document.getElementById("storage-editor").setAttribute("data-e", 'hidden')
  }
}