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

function spawnFallback(bus, descr) {
  if (localStorage.getItem(`${bus}_Timetable`)) {
    //alert(`Found ${bus} in local storage`)
    try {
      const data = JSON.parse(localStorage.getItem(`${bus}_Timetable`));
      const times = JSON.parse(localStorage.getItem(`${bus}_Times`));
      const nextBusTime = getNextBusTimeLIVE(times);

      if (nextBusTime) {
        spawnInFeed(bus, descr, nextBusTime, displayRemainingTimeLIVE(nextBusTime), 'frequent', 'preload')
      } else {
        const [hour, minutes] = times[0].split(":").map(Number);
        const workingTime = { hour, minutes };
        //alert(`Fallback: ${JSON.stringify(workingTime)}\n${bus}`)
        console.warn(`SPAWNFALLBACK\nFailed to find next bus time for ${bus}.\nWorking on the first value in schedule\nTimes:`, times);
        spawnInFeed(bus, descr, workingTime, displayRemainingTimeLIVE(workingTime), 'frequent', 'preload')
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

const frequentBuses = ['16', '831', '828', '049']
const favoriteBuses = []
const famousBuses = []


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

function loadOasa() {
  let spawnInFreq = {}; // This appears unused but retained for context
  frequentBuses.forEach(bus => {
    let matchingLines = fullLine.filter(line => line.LineID === bus);
    if (!matchingLines.length) {
      console.warn(`No matching lines found for bus: ${bus}`);
      return;
    }

    //alert(`loadOasa: ${bus}`)
    const { LineDescr: descr, LineCode: lineCode } = matchingLines[0];

    try {
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${lineCode}&keyOrigin=evoxEpsilon`)}`)
        .then(response => response.json())
        .then(data => {
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
            localStorage.setItem(`${bus}_Timetable`, JSON.stringify(data));
            localStorage.setItem(`${bus}_Times`, JSON.stringify(times));

            // Display in feed
            //alert(`Default work ${JSON.stringify(nextBusTime)}`)
            spawnInFeed(bus, descr, nextBusTime, displayRemainingTimeLIVE(nextBusTime), 'frequent');
          } else {
            //use times[0] as a fallback
            try {
              const [hour, minutes] = times[0].split(":").map(Number);
              const workingTime = { hour, minutes };
              //alert(`Fallback: ${JSON.stringify(workingTime)}\n${bus}`)
              //alert(`loadOasa Failed\nfailed why?:\nnextBusTime returned: ${JSON.stringify(nextBusTime)}\nTimes: ${JSON.stringify(times)}\nBus on work: ${bus}`);
              console.warn(`Failed to find next bus time for ${bus}.\nWorking on the first value in schedule\nTimes:`, times);
              spawnInFeed(bus, descr, workingTime, displayRemainingTimeLIVE(workingTime), 'frequent');
            } catch (error) {
              console.log(`loadOasa fallback error: ${error}`)
              spawnInFeed(bus, descr, nextBusTime, 'Άγνωστη', 'frequent')
            }

          }
        })
        .catch(error => {
          console.error(`Error fetching schedule for ${bus}:`, error);
          spawnFallback(bus, descr);
        });
    } catch {
      spawnFallback(bus, descr);
    }

  });
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

      let spawnIn = formatTimeToMin(convertTimeApprox(busData.timeInM))
      if (busData.timeInM === Infinity) {
        spawnIn = 'Άγνωστη'
      }
      // Create the HTML for the bus item
      const toSpawn = `
        <div class="item ${highlight} ${isPreload ? 'isPreloaded' : ''}">
          <div class="busName">${busData.bus}</div>
          <div class="info">
            <div class="text">
              <span>Επόμενη άφιξη</span>
              <span>${spawnIn}</span>
            </div>
          </div>
          <div class="fav-actions">
            <div onclick="processInfo('${evoxId}', 'getTimes')" class="button-action important">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.8321 14.5547C15.5257 15.0142 14.9048 15.1384 14.4453 14.8321L11.8451 13.0986C11.3171 12.7466 11 12.1541 11 11.5196L11 11.5L11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7L13 11.4648L15.5547 13.1679C16.0142 13.4743 16.1384 14.0952 15.8321 14.5547Z" fill="#fff" />
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

  if (localStorage.getItem("t50-username") && localStorage.getItem("t50-email") && localStorage.getItem("t50pswd")) {
    getReady()
    //document.getElementById("profilePic").src = "https://www.gravatar.com/avatar/" + md5(localStorage.getItem("t50-email")) + "?d=identicon";

    document.getElementById("oasaPfp").src = `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${localStorage.getItem("t50-username")}`
  } else {
    document.getElementById("oasaPfp").src = 'cbimage.png'
    if (localStorage.getItem("hasDismissedSetup") !== 'true') {
      $("#phone").fadeOut("fast", function () {
        document.getElementById("phone").classList.add("login")
        $("#content").fadeOut("fast", function () {
          $("#phone").fadeIn("fast")
          $("#loginContent").fadeIn("fast")
          document.getElementById("loginForming").querySelectorAll("p")[0].classList.add("show")
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

          displayHello();  // Call the function to display the characters

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
            $("#hello-text").fadeOut("fast", function () {
              $("#runalpha1").fadeIn("fast")
              $("#runalpha2").fadeIn("fast")
              $("#runalpha3").fadeIn("fast")
              $("#runalpha4").fadeIn("fast")
              document.getElementById("loginForming").querySelector(".infoWelcome").style.display = 'none'
            })

            

            


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
      document.getElementById("busInfoID").innerText = busInfo.bus
      let formattedText = busInfo.descr.replace(/\((.*)\)/, "<br>($1)");
      document.getElementById("busInfoDesc").innerHTML = capitalizeWords(formattedText)
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getScheduleDaysMasterline&p1=${lineCode}&keyOrigin=evoxEpsilon`)}`)
        .then(response => response.json())
        .then(data => {

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
        })
        .catch(error => {
          console.log('Load Bus Times List Error:', error)
        });
      document.getElementById("timetableSpawn").innerHTML = '';  // Clear existing content
      fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${lineCode}&keyOrigin=evoxEpsilon`)}`)
        .then(response => response.json())
        .then(data => {
          activeBusInfo = data
          const splitter = splitValue(busInfo.descr);
          console.log("The data:", data)
          if (data.go) {

            console.log('result', busInfo.descr);
            const result = splitter.getSecondPart() // Trim any leading or trailing spaces
            console.log('result', result);
            document.getElementById("busGOCOME").innerHTML += `<div class="Block active">
                                        <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36 7L43 13.4615L36 21" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40 14H17.0062C10.1232 14 4.27787 19.6204 4.00964 26.5C3.72612 33.7696 9.73291 40 17.0062 40H34.0016" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Προς ${capitalizeWords(result)}
                                    </div>`

          }

          if (data.come) {
            const result = splitter.getFirstPart();
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

          } else {
            try {
              const [hour, minutes] = times[0].split(":").map(Number);
              const workingTime = { hour, minutes };
              //alert(`Fallback: ${JSON.stringify(workingTime)}\n${bus}`)
              console.warn(`processInfo\nFailed to find next bus time for ${busInfo.bus}.\nWorking on the first value in schedule\nTimes:`, times);
              spawnInFeed(busInfo.bus, descr, workingTime, displayRemainingTimeLIVE(workingTime), 'frequent')
              //alert(`failed why?:\n${JSON.stringify(nextBusTime)}\n${JSON.stringify(times)}\nBus on work: ${busInfo.bus}`);
              //
            } catch (error) {
              console.error('Fallback Error:', error);
              spawnInFeed(busInfo.bus, descr, nextBusTime, 'Άγνωστη', 'frequent')
            }

          }

          let timetableContent = '';
          const remains = getNextBuses(times, 7)
          const previous = getPreviousBuses(times)
          if (previous[0]) {
            const value = previous[0].time;
            const currentTime = new Date();
            const [hours, minutes] = value.split(':').map(Number);
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const diffInMinutes = (currentTime - targetTime) / (1000 * 60);
            const result = diffInMinutes < 90 ? 'Σε κίνηση' : 'Χαμένο';
            //var textNode = document.createTextNode(result);
            //previousTimeBox.appendChild(textNode);
            //var span = document.createElement('span');
            //span.innerHTML = ``;
            //previousTimeBox.appendChild(span);
            //document.getElementById("evoxBased").appendChild(previousTimeBox);
            timetableContent += `<div class="timeItem">
        <p>${result}</p>
        <div class="actions" style="display:flex;flex-direction: column;justify-content: center;align-items: flex-end;">
          <vox style="text-decoration: line-through;">${previous[0].time}</vox><span style='font-size: 0.9rem;margin-top:4px;'>${previous[0].formatted}</span>
        </div>
      </div>`
          }
          remains.forEach(time => {
            timetableContent += `
      <div class="timeItem">
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
  activeBusInfo = {}
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

