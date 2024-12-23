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
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=${mapboxgl.accessToken}&language=el`)
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

function spawnFallback(bus) {
  if (localStorage.getItem(`${bus}_Timetable`)) {
    //alert(`Found ${bus} in local storage`)
    try {
      const data = JSON.parse(localStorage.getItem(`${bus}_Timetable`));
      const times = JSON.parse(localStorage.getItem(`${bus}_Times`));
      const nextBusTime = getNextBusTimeLIVE(times);

      if (nextBusTime) {
        spawnInFeed(bus, descr, nextBusTime, displayRemainingTimeLIVE(nextBusTime), 'frequent', 'preload')
      } else {
        alert(`failed why?:\n${JSON.stringify(nextBusTime)}\n${JSON.stringify(times)}\nBus on work: ${bus}`);
        spawnInFeed(bus, descr, nextBusTime, 'Άγνωστη', 'frequent', 'preload')
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
          alert(`failed why?:\n${JSON.stringify(nextBusTime)}\n${JSON.stringify(times)}\nBus on work: ${bus}`);
          spawnInFeed(bus, descr, nextBusTime, 'Άγνωστη', 'frequent')
        }
      })
      .catch(error => {
        console.log('Load Favorite Times Error:', error)
        //document.getElementById("netStats").innerHTML = offlineSvg
        spawnFallback(bus)
      });
  })
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

  return "Μη έγκυρη είσοδος"; // Fallback for unexpected input
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

let evoxIds = {

}
let frequentBuses_Sort = []; // Array to store bus data for sorting
function spawnInFeed(bus, descr, nextBusTime, timeInM, type, isPreload) {
  if (type === 'frequent') {
    // Clear skeleton placeholder if present
    const frequentDiv = document.getElementById("frequent");
    if (frequentDiv.innerHTML.includes('skeleton')) {
      frequentDiv.innerHTML = '';
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
    frequentDiv.innerHTML = ''; // Clear current content
    frequentBuses_Sort.forEach((busData, index) => {
      let highlight = '';
      if (busData === frequentBuses_Sort[0]) {
        highlight = 'favorite'; // Highlight the first bus
      }

      // Generate unique ID for this bus data
      const evoxId = generateRandomId(10);
      const busDataComplete = {
        bus: busData.bus, // Use the correct bus data from the sorted array
        descr: busData.descr,
        nextBusTime: busData.nextBusTime,
        timeInM: busData.timeInM === Infinity ? 'Άγνωστη' : busData.timeInM, // Show 'Άγνωστη' if time is Infinity
        type: type
      };

      // Store the bus data with the generated ID
      evoxIds[evoxId] = busDataComplete;

      // Create the HTML for the bus item
      const toSpawn = `
        <div class="item ${highlight} ${isPreload ? 'isPreloaded' : ''}">
          <div class="busName">${busData.bus}</div>
          <div class="info">
            <div class="text">
              <span>Επόμενη άφιξη</span>
              <span>${formatTimeToMin(busData.timeInM)}</span>
            </div>
          </div>
          <div class="fav-actions">
            <div onclick="processInfo('${evoxId}', 'getTimes')" class="button-action important">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.8321 14.5547C15.5257 15.0142 14.9048 15.1384 14.4453 14.8321L11.8451 13.0986C11.3171 12.7466 11 12.1541 11 11.5196L11 11.5L11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7L13 11.4648L15.5547 13.1679C16.0142 13.4743 16.1384 14.0952 15.8321 14.5547Z" fill="#3557fd" />
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

      frequentDiv.innerHTML += toSpawn;
    });
  }
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


const allLines = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetLines&keyOrigin=evoxEpsilon`);

fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${allLines}`)
  .then(response => response.json())
  .then(data => {
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


  })
  .catch(error => {
    console.log("All Lines Get Error:", error)
    if (isNearEvery3Hours()) {
      //alert(`Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.`)
      document.getElementById("performance").style.display = 'flex'
      document.getElementById("messagePerformance").innerHTML = 'Μερική Διακοπή'
      document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentBuild}`

      document.getElementById("spawnHere").innerHTML = 'Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.'
      document.getElementById("logErrors").innerHTML = `Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.`
    } else {
      //alert(`Δεν ηταν δυνατη η συνδεση στον διακομιστη.\nΑγνωστο σφαλμα`)
      document.getElementById("performance").style.display = 'flex'
      document.getElementById("messagePerformance").innerHTML = 'Σοβαρό περιστατικό'
      document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentBuild}`

      document.getElementById("spawnHere").innerHTML = 'Δεν ηταν δυνατη η συνδεση στον διακομιστη.<br>Αγνωστο σφαλμα'
      document.getElementById("logErrors").innerHTML = `Δεν ηταν δυνατη η συνδεση στον διακομιστη.<br>Αγνωστο σφαλμα<br>${error}`
    }
    if (error.toString().includes('Unexpected token')) {
      //alert("OASA SQL error. Δοκιμάστε ξανά.")
      document.getElementById("performance").style.display = 'flex'
      document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentBuild}`
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
  console.log('near1', locations)
  const distance = haversineDistance(myloc[1], myloc[0], locations[1], locations[0]);
  console.log("NEARBY", distance, radius)
  return distance <= radius;
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


function processInfo(evoxId, type) {
  if (evoxId) {
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
      const busInfo = evoxIds[evoxId]
      let matchingLines = fullLine.filter(line => line.LineID === busInfo.bus);
      const working = matchingLines[0]
      const descr = working.LineDescr
      const lineCode = working.LineCode
      document.getElementById("busInfoID").innerText = busInfo.bus
      document.getElementById("busInfoDesc").innerText = capitalizeWords(busInfo.descr)
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getScheduleDaysMasterline&p1=${lineCode}&keyOrigin=evoxEpsilon`)}`)
        .then(response => response.json())
        .then(data => {
          const days = document.getElementById("busInfoDaySelector")
          days.innerHTML = ''
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
        })
        .catch(error => {
          console.log('Load Bus Times List Error:', error)
        });
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${lineCode}&keyOrigin=evoxEpsilon`)}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById("busGOCOME").innerHTML = ''
          console.log("The data:", data)
          if (data.go) {
            console.log('result', busInfo.descr); // ΠΕΙΡΑΙΑΣ-ΑΙΓΑΛΕΩ (ΕΝΑΛΛΑΚΤΙΚΗ ΛΟΓΩ ΛΑΪΚΗΣ ΚΑΘΕ ΔΕΥΤΕΡΑ)

            const match = busInfo.descr.match(/- (.*?)(?=\s*\(|$)/); // Improved regex to handle spaces before '('
            console.log('match', match);

            const result = match ? match[1].trim() : null; // Trim any leading or trailing spaces
            console.log('result', result);
            document.getElementById("busGOCOME").innerHTML += `<div class="Block">
                                        <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36 7L43 13.4615L36 21" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40 14H17.0062C10.1232 14 4.27787 19.6204 4.00964 26.5C3.72612 33.7696 9.73291 40 17.0062 40H34.0016" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Προς ${capitalizeWords(result)}
                                    </div>`

          }

          if (data.come) {
            const match = busInfo.descr.match(/^(.*?) -/);
            const result = match ? match[1] : null;
            document.getElementById("busGOCOME").innerHTML += `<div class="Block">
                                        <svg fill="#fff" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M0 21.984q0.032-0.8 0.608-1.376l4-4q0.448-0.48 1.056-0.576t1.12 0.128 0.864 0.736 0.352 1.12v1.984h18.016q0.8 0 1.408-0.576t0.576-1.408v-8q0-0.832-0.576-1.408t-1.408-0.608h-16q-0.736 0-1.248-0.416t-0.64-0.992 0-1.152 0.64-1.024 1.248-0.416h16q2.464 0 4.224 1.76t1.76 4.256v8q0 2.496-1.76 4.224t-4.224 1.76h-18.016v2.016q0 0.64-0.352 1.152t-0.896 0.704-1.12 0.096-1.024-0.544l-4-4q-0.64-0.608-0.608-1.44z"></path>
</svg>Προς ${capitalizeWords(result)}
                                    </div>`

          }
          if (!data.come && !data.go) {
            console.log(data)
            return;
          } else {
            console.log("Come and go for ", busInfo, "\n", data)
          }
          document.getElementById("timetableSpawn").innerHTML = '';  // Clear existing content
          console.log("Success", lineCode);

          var times = data.go.map(item => {
            return formatTime(item.sde_start1);
          });

          // Find the next bus time
          const nextBusTime = getNextBusTimeLIVE(times);

          if (nextBusTime) {
            localStorage.setItem(`${busInfo.bus}_Timetable`, JSON.stringify(data));
            localStorage.setItem(`${busInfo.bus}_Times`, JSON.stringify(times));

            // Create the HTML content dynamically for each time
            let timetableContent = '';
            times.forEach(time => {
              timetableContent += `
      <div class="timeItem">
        <p>${time}</p>
        <div class="actions">
          1
        </div>
      </div>
    `;
            });

            // Insert the content into the element
            document.getElementById("timetableSpawn").innerHTML = timetableContent;
          } else {
            alert(`failed why?:\n${JSON.stringify(nextBusTime)}\n${JSON.stringify(times)}\nBus on work: ${bus}`);
            //spawnInFeed(bus, descr, nextBusTime, 'Άγνωστη', 'frequent')
          }
        })
        .catch(error => {
          console.log('Load Favorite Times Error:', error)
          //document.getElementById("netStats").innerHTML = offlineSvg
          //spawnFallback(bus)
        });
    } else if (type === 'showBusInfo') {
      console.log("Show Bus Info")
    }
  } else {
    console.log("No evoxId given")
  }
}

function returnFromBusTimetable() {
  document.getElementById("top-navigate").classList.remove('hidden')
  document.getElementById("userFeed").classList.remove('focused')
  document.getElementById("busTimetable").style.display = 'none'
  setTimeout(function () { document.getElementById("busTimetable").classList.remove('shown') }, 200)

  document.getElementById("userFeed").style.display = 'block'


  document.getElementById("searchIntelli").classList.remove('notLoaded')
}