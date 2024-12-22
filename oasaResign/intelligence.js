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
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=${mapboxgl.accessToken}&language=el`)
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

      }, 400)

    }, function (error) {
      //alert(error.message)
      console.log("Error code: " + error.code + " - " + error.message);
    });
  } else {
    //spawnBlocks(myLoc)
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

  // Resize map after initialization to ensure it fits the container
  map.on('load', () => {
      map.resize();
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


function getPrefix(locationName) {
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
function displayRemainingTimeLIVE(nextBusTime, elid) {
  console.log("Running", JSON.stringify(nextBusTime), "for", elid);
  const currentTime = new Date();
  const nextBusDate = new Date();
  nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0);

  const remainingTimeMs = nextBusDate - currentTime;
  const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const displayMinutes = remainingMinutes % 60;

  const remainingTimeText = `${remainingHours > 0 ? `${remainingHours}h ` : ''}${displayMinutes}m`;
  return remainingTimeText;
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

const frequentBuses = ['16', '831', '828', '049']
const favoriteBuses = []
const famousBuses = []

function loadOasa() {
  let spawnInFreq = {}
  frequentBuses.forEach(bus => {
    let matchingLines = fullLine.filter(line => line.LineID === bus);
    const working = matchingLines[0]
    const descr = working.LineDescr
    const lineCode = working.LineCode

    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getRoutesForLine&p1=${lineCode}&keyOrigin=evoxEpsilon`)}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const routeCode = data[0].route_code
          currentRouteCode = routeCode
          console.log(routeCode)
          fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutesDetailsAndStops&p1=${routeCode}&keyOrigin=evoxEpsilon`)}`)
            .then(response => response.json())
            .then(bata => {
              currentLineInfo = bata
              let stopPromises = bata.stops.map(stop => {
                return new Promise((resolve, reject) => {
                  console.log(stop.StopDescr);

                  // Resolve the promise after the stop is processed
                  resolve();
                });
              });

              // Wait for all promises to resolve (i.e., all stops are spawned)
              Promise.all(stopPromises)
                .then(() => {
                  // Code to run after all elements are spawned
                  console.log('All stops have been spawned!');
                  // Add additional functionality here
                })
                .catch(err => {
                  console.error('An error occurred while spawning stops:', err);
                });
            })
            .catch(error => {
              console.log("FindStops [2] error:", error)
              if (error.toString().includes('Unexpected token')) {
                //alert("OASA SQL error. Δοκιμάστε ξανά.")
                console.warn("Attempting to fix")
                findStops(lineCode, sentElementByfindBus)
              }
            })
        }

      })
      .catch(error => {
        console.log("FindStops [1] error:", error)
        if (error.toString().includes('Unexpected token')) {
          //alert("OASA SQL error. Δοκιμάστε ξανά.")
          console.warn("Attempting to fix")
          findStops(lineCode, sentElementByfindBus)
        }
      })
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${lineCode}&keyOrigin=evoxEpsilon`)}`)
        .then(response => response.json())
        .then(data => {
            console.log("The data:", data)
            if (!data.come && !data.go) {
                console.log(data)
                return;
            } else {
                console.log("Come and go for ", bus, "\n", data)
            }
            console.log("Success", lineCode)

            var times = data.go.map(item => {
                //console.log("sde_start1:", item.sde_start1); // Debug log
                return formatTime(item.sde_start1);
            });

            //console.log("Formatted times:", times); // Debug log

            const nextBusTime = getNextBusTimeLIVE(times);

            if (nextBusTime) {
                localStorage.setItem(`${bus}_Timetable`, JSON.stringify(data));
                localStorage.setItem(`${bus}_Times`, JSON.stringify(times));
                spawnInFeed(bus, descr, nextBusTime, displayRemainingTimeLIVE(nextBusTime), 'frequent')
                //alert(displayRemainingTimeLIVE(nextBusTime))
            } else {
                //alert("failed");
                spawnInFeed(bus, descr, nextBusTime, 'Άγνωστη', 'frequent')
            }
        })
        .catch(error => {
            console.log('Load Favorite Times Error:', error)
            //document.getElementById("netStats").innerHTML = offlineSvg

        });
  })
}

function formatTime(input) {
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

  return "Μη έγκυρη είσοδος"; // Fallback for unexpected input
}

let frequentBuses_Sort = []; // Array to store bus data for sorting

function spawnInFeed(bus, descr, nextBusTime, timeInM, type) {
  if (type === 'frequent') {
    // Clear skeleton placeholder if present
    if (document.getElementById("frequent").innerHTML.includes('skeleton')) {
      document.getElementById("frequent").innerHTML = '';
    }

    // Push bus data to the array
    frequentBuses_Sort.push({
      bus,
      descr,
      nextBusTime,
      timeInM: timeInM === 'Άγνωστη' ? Infinity : parseInt(timeInM, 10), // Treat 'Άγνωστη' as Infinity
    });

    // Sort buses based on timeInM
    frequentBuses_Sort.sort((a, b) => a.timeInM - b.timeInM);

    // Render sorted buses
    const frequentDiv = document.getElementById("frequent");
    frequentDiv.innerHTML = ''; // Clear current content
    frequentBuses_Sort.forEach(busData => {
      let highlight = '';
      if(busData === frequentBuses_Sort[0]) {
        highlight = 'favorite';
      }
      const toSpawn = `<div class="item ${highlight}">
                          <div class="busName">${busData.bus}</div>
                          <div class="info">
                              <div class="text">
                                  <span>Επόμενη άφιξη</span>
                                  <span>${formatTime(busData.timeInM === Infinity ? 'Άγνωστη' : busData.timeInM)}</span>
                              </div>
                          </div>
                          <div class="fav-actions">
                              <div class="button-action important">
                                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.8321 14.5547C15.5257 15.0142 14.9048 15.1384 14.4453 14.8321L11.8451 13.0986C11.3171 12.7466 11 12.1541 11 11.5196L11 11.5L11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7L13 11.4648L15.5547 13.1679C16.0142 13.4743 16.1384 14.0952 15.8321 14.5547Z"
                                          fill="#3557fd" />
                                  </svg>
                              </div>
                              <div class="button-action">
                                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#fff" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                              </div>
                          </div>
                      </div>`;
      frequentDiv.innerHTML += toSpawn;
    });
  }
}