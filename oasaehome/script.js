mapboxgl.accessToken = 'pk.eyJ1IjoicGFwb3N0b2wiLCJhIjoiY2xsZXg0c240MHphNzNrbjE3Z2hteGNwNSJ9.K1O6D38nMeeIzDKqa4Fynw';


let map;
let myloc;
// Create a custom element for the marker

let markers_global = []
let locationMarker = []
function a(b, what) {
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

let stations = []

function setup(location) {
    map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/dark-v11', // Mapbox dark theme
        center: location, // starting position [lng, lat] for Athens, Greece
        zoom: 10, // starting zoom
        pitch: 0, // optional: adjust if you want the map to be more tilted initially
        bearing: 0 // optional: adjust the initial bearing if needed
    });


    const s = location; // Coordinates for the first marker
    a(s, 'me');

    const n = [23.6447856, 37.9443765]; // Coordinates for the second marker
    //a(n);

    let isReady = false
    function ready() {
        if (isReady === false) {
            isReady = true
            let goZoom;
            let speed;
            const currentTime = new Date();
            const hours = currentTime.getHours();
            if (hours >= 0 && hours < 5) {
                // Do if time is between 12 AM and 5 AM
                goZoom = 9
                speed = 1
                markers_global.forEach(marker => marker.remove());
                a(myloc, 'me');
                setTimeout(function () {
                    markers_global.forEach(marker => marker.remove());
                    a(myloc, 'me');
                }, 1000)
            } else {
                goZoom = 14
                speed = 3
            }
            map.flyTo({
                center: location, // keep the same center
                zoom: goZoom, // zoom out by 2 levelsmap.getZoom() + 2
                speed: speed, // slow speed for smooth animation
                curve: 1, // smooth curve of the animation
                easing(t) {
                    // ease-in-out function
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                } // ease-in-out easing for smooth transition
            });

        }

    }
    function pushToMain(code, color, hex, busId) {
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=https%3A%2F%2Ftelematics.oasa.gr%2Fapi%2F%3Fact%3DwebGetRoutesDetailsAndStops%26p1%3D${code}%26keyOrigin%3DevoxEpsilon`)
            .then(response => response.json())
            .then(data => {
                let count = 0;
                data.stops.forEach(cord => {
                    count++;
                    const toPush = {
                        "lng": cord.StopLng,
                        "lat": cord.StopLat,
                        "name": cord.StopDescrEng, // StopDescr
                        "code": cord.StopCode,
                        "color": color,
                        "hex": hex,
                        "busId": busId
                    };
                    stations.push(toPush);

                    if (count === data.stops.length) {
                        const radius = 2.5;
                        const nearbyLocations = filterNearbyLocations(myloc, stations, radius);
                        const stationsLines = filterNearestByColor(myloc, stations, radius)
                        spawnLines(stationsLines)
                        console.log("myloc to nearest stations (lines)", stationsLines);
                        //console.log("Nearby Stations", nearbyLocations);
                        let du = 0;
                        nearbyLocations.forEach(corda => {
                            du++;
                            // Pass 'a' for 'me' and 'colorb' for colorb to a()
                            a([corda.lng, corda.lat], corda.color)
                            if (du === nearbyLocations.length) {
                                console.log("Everything Should Be Ready To Use For Bus", busId)
                                ready();
                            }
                        });
                    }
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    const code831 = '2805'
    const code16 = '2079'
    const code703 = '5229'

    const toFind = 3
    getNextTime("16")
    getNextTime("831")
    getNextTime("703")
    pushToMain(code831, "green", "#5ac876", "831")
    pushToMain(code16, "yellow", '#965d00', "16")
    pushToMain(code703, "red", '#ff4a4a', "703")
    let isReadyToShow = setInterval(function () {
        if (findBest.length === toFind) {
            console.log("BEST", findBest)
            clearInterval(isReadyToShow)
            let count = 1



            findBest.sort((a, b) => a.timeUntilNext - b.timeUntilNext);

            // Shortest time
            const fast = findBest[0];

            // Longest time
            const slow = findBest[findBest.length - 1];

            // Medium time (middle between shortest and longest)
            const medium = findBest[Math.floor(findBest.length / 2)];

            findBest.forEach(toFix => {
                if (toFix.timeUntilNext > 60) {
                    const hours = Math.floor(toFix.timeUntilNext / 60); // Get the hours
                    const minutes = toFix.timeUntilNext % 60; // Get the remaining minutes
                    console.log(`${hours} hours and ${minutes} minutes`);
                    toFix.timeUntilNext = `${hours}Ω`
                } else {
                    toFix.timeUntilNext += "'"
                }
            });
            //console.log("FASTER", fast, fast_B);
            //console.log("SLOWER", slow, slow_B);
            //console.log("MEDIUM", medium);

            document.getElementById("fastTime").innerText = `${fast.timeUntilNext}`;
            document.getElementById("fornextFast").innerText = fast.busId;
            document.getElementById("fortypeFast").innerHTML = (fast.busId.length === 2 && fast.busId.trim().length === 2) ? 'ΤΡΟΛΕΪ' : 'ΛΕΩΦΟΡΕΙΟ';

            document.getElementById("slowTime").innerText = `${slow.timeUntilNext}`;
            document.getElementById("fornextSlow").innerText = slow.busId;
            document.getElementById("fortypeSlow").innerHTML = (slow.busId.length === 2 && slow.busId.trim().length === 2) ? 'ΤΡΟΛΕΪ' : 'ΛΕΩΦΟΡΕΙΟ';
            document.getElementById("mediumTime").innerText = `${medium.timeUntilNext}`;
            document.getElementById("fornextMedium").innerText = medium.busId;
            document.getElementById("fortypeMedium").innerHTML = (medium.busId.length === 2 && medium.busId.trim().length === 2) ? 'ΤΡΟΛΕΪ' : 'ΛΕΩΦΟΡΕΙΟ';
            markers_global.forEach(marker => marker.remove());
            a(myloc, 'me');

            function updateBusStatus(busId, code) {
                if (slow.busId === busId) {
                    pushToMain(code, "red", "#ff4a4a", busId);
                } else if (fast.busId === busId) {
                    pushToMain(code, "green", "#5ac876", busId);
                } else {
                    pushToMain(code, "yellow", "#965d00", busId);
                }
            }

            updateBusStatus("16", code16);
            updateBusStatus("831", code831);
            updateBusStatus("703", code703);


            showdemo()
            //pushToMain(code831, "green", "#5ac876", "831")
            //pushToMain(code16, "yellow", '#965d00', "16")
            //pushToMain(code703, "red", '#ff4a4a', "703")
        }
    }, 100)
}



let locationReady = false;
function request() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            document.getElementById("main").style.opacity = '1'
            document.getElementById("geoloc").style.opacity = '0'
            setTimeout(function () {
                document.getElementById("geoloc").style.display = 'none'
            }, 450)
            locationReady = true
            const loc = [longitude, latitude]
            myloc = loc
            setup(loc)
            setTimeout(function () {
                //showdemo()
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=${mapboxgl.accessToken}`)
                    .then(response => response.json())
                    .then(data => {
                        const placeName = data.features[0].place_name;
                        console.log('Location name:', placeName); // Logs the location name
                        document.getElementById("nearYouSkel").style.display = 'none'
                        document.getElementById("nearYou").style.display = null
                        let street = placeName.split(',')[0].trim();
                        document.getElementById("locationName").innerHTML = street
                        if (street.length > 12) {
                            document.getElementById("locationName").style.fontSize = '0.9rem'
                        } else {
                            document.getElementById("locationName").style.fontSize = null
                        }

                    })
                    .catch(error => console.error('Error:', error));
            }, 400)
            setInterval(function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const loc = [longitude, latitude];

                        // Function to calculate distance between two coordinates using Haversine formula
                        function calculateDistance(lat1, lon1, lat2, lon2) {
                            const R = 6371; // Earth radius in km
                            const dLat = (lat2 - lat1) * (Math.PI / 180);
                            const dLon = (lon2 - lon1) * (Math.PI / 180);
                            const a =
                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            const distance = R * c; // Distance in km
                            return distance;
                        }

                        const distanceThreshold = 0.3; // Define the distance threshold for "a lot" of movement (in km)

                        if (myloc) {
                            const distance = calculateDistance(myloc[1], myloc[0], latitude, longitude);
                            if (distance > distanceThreshold) {
                                console.log("Moved significantly!");
                                document.getElementById("isMoving").classList.add("active")
                                locationMarker.forEach(marker => marker.remove());
                                myloc = loc; // Update the current location
                                a(myloc, 'me');
                            } else if (distance === 0) {
                                document.getElementById("isMoving").classList.remove("active")
                                //console.log("No movement")
                            } else {
                                document.getElementById("isMoving").classList.add("active")
                                console.log("Moved slightly");
                                locationMarker.forEach(marker => marker.remove());
                                myloc = loc
                                a(myloc, 'me');
                            }
                        } else {
                            console.log("Initial location set");
                            myloc = loc; // Set initial location if not set
                        }
                    }, function (error) {
                        alert(error.message);
                        console.log("Error code: " + error.code + " - " + error.message);
                    });
                } else {
                    alert("Geolocation is not supported by this browser.");
                }

            }, 200)
        }, function (error) {
            alert(error.message)
            console.log("Error code: " + error.code + " - " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
// Function to calculate distance between two coordinates in kilometers
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
    return locations.filter(location => {
        const distance = haversineDistance(myloc[1], myloc[0], location.lat, location.lng);
        return distance <= radius;
    });
}

function filterNearestByColor(myloc, locations, radius) {
    // Filter locations within the radius
    const nearbyLocations = locations.filter(location => {
        const distance = haversineDistance(myloc[1], myloc[0], location.lat, location.lng);
        return distance <= radius;
    });

    // Create an object to store the nearest location for each color
    const nearestByColor = {};

    nearbyLocations.forEach(location => {
        const distance = haversineDistance(myloc[1], myloc[0], location.lat, location.lng);

        // If no location of this color has been added or if this one is closer, update it
        if (!nearestByColor[location.color] || nearestByColor[location.color].distance > distance) {
            nearestByColor[location.color] = { location, distance };
        }
    });

    // Return only the nearest location for each color
    return Object.values(nearestByColor).map(entry => entry.location);
}


document.addEventListener("DOMContentLoaded", (event) => {
    request()
});


function showdemo() {
    const high = document.getElementById("high")
    const medium = document.getElementById("medium")
    const low = document.getElementById("low")
    const skel1 = document.getElementById("skel1")
    const skel2 = document.getElementById("skel2")
    const skel3 = document.getElementById("skel3")
    skel1.style.display = 'none'
    skel2.style.display = 'none'
    skel3.style.display = 'none'

    high.style.display = null
    medium.style.display = null
    low.style.display = null
}



let useForReloc;
document.getElementById('map').addEventListener('click', function () {
    document.getElementById('map').style.transform = 'scale(0.93)'
    setTimeout(function () {
        document.getElementById('map').style.transform = ''
    }, 100)
    const original = this;
    const rect = original.getBoundingClientRect();

    // Step 1: Collect all markers from the original map
    const markers = [];
    map._markers.forEach(marker => markers.push(marker));

    // Create a new container for the fullscreen map
    const clone = document.createElement('div');
    clone.className = 'fullscreen-clone';
    clone.style.borderRadius = '20px'
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.transition = 'all 0.5s ease-in-out'; // Smooth transition
    clone.style.zIndex = '1000';

    // Append clone to the body
    document.body.appendChild(clone);

    // Force reflow for smooth transition
    window.getComputedStyle(clone).transform;
    let fullscreenMap;
    // Animate to fullscreen
    setTimeout(() => {
        clone.style.width = '100vw';
        clone.style.height = '100vh';
        clone.style.top = '0';
        clone.style.left = '0';

        // Continuously resize the map during the transition
        let startTime = null;
        function smoothResize(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / 500, 1); // 500ms duration

            if (fullscreenMap) {
                fullscreenMap.resize(); // Continuously resize the map
            }

            if (progress < 1) {
                requestAnimationFrame(smoothResize);
            }
        }
        requestAnimationFrame(smoothResize);

        // Initialize a new Mapbox instance on the clone after the transition
        setTimeout(() => {
            document.getElementById("reloc").style.display = 'block'
            let zoom;
            if (map.getZoom() !== 14) {
                zoom = map.getZoom() + 1
            } else {
                zoom = map.getZoom()
            }
            fullscreenMap = new mapboxgl.Map({
                container: clone,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: map.getCenter(), // Use the same center
                zoom: map.getZoom(), // Use the same zoom level
                bearing: map.getBearing(), // Use the same bearing
                pitch: map.getPitch(), // Use the same pitch
            });
            useForReloc = fullscreenMap





            fullscreenMap.on('load', () => {
                console.log('Clone Map is fully loaded!');
                clone.style.borderRadius = '0'
                // Step 2: Clone markers to the new map
                if (map.getZoom() !== 14) {
                    fullscreenMap.flyTo({
                        center: fullscreenMap.getCenter(), // keep the same center
                        zoom: 14, // zoom out by 2 levelsmap.getZoom() + 2
                        speed: 3, // slow speed for smooth animation
                        curve: 1, // smooth curve of the animation
                        easing(t) {
                            // ease-in-out function
                            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                        } // ease-in-out easing for smooth transition
                    });
                }
                markers.forEach(marker => {
                    const lngLat = marker.getLngLat();
                    const clonedElement = marker.getElement().cloneNode(true); // Clone the marker element

                    // Add cloned marker to the fullscreen map
                    new mapboxgl.Marker(clonedElement)
                        .setLngLat(lngLat)
                        .addTo(fullscreenMap);
                });

                // Add lines to the fullscreen map
                const layers = map.getStyle().layers; // Get all layers from the original map's style

                layers.forEach(layer => {
                    // Check if the layer type is 'line'
                    if (layer.type === 'line') {
                        const sourceId = layer.source;

                        // Check if the source already exists on the fullscreenMap
                        if (!fullscreenMap.getSource(sourceId)) {
                            const sourceData = map.getSource(sourceId).serialize();  // Get the source data from the original map

                            // Add the source to the fullscreenMap
                            fullscreenMap.addSource(sourceId, sourceData);

                            // Add the corresponding layer to the fullscreenMap
                            fullscreenMap.addLayer({
                                id: layer.id,
                                type: 'line',
                                source: sourceId,
                                layout: layer.layout,
                                paint: layer.paint
                            });
                        }
                    }
                });
            });
        }, 10);

        // Close fullscreen on click
        clone.addEventListener('click', function () {
            document.getElementById("reloc").style.display = 'none'

            clone.style.transition = 'all 0.5s ease, opacity 1s ease'; // Transition back to original
            clone.style.borderRadius = '20px'
            clone.style.width = `${rect.width}px`;
            clone.style.height = `${rect.height}px`;
            clone.style.top = `${rect.top}px`;
            clone.style.left = `${rect.left}px`;
            fullscreenMap.jumpTo({
                center: fullscreenMap.getCenter(), // Keep the same center
                zoom: fullscreenMap.getZoom(), // Use the same zoom level
                bearing: fullscreenMap.getBearing(), // Keep the same bearing
                pitch: fullscreenMap.getPitch() // Keep the same pitch
            });
            map.flyTo({
                center: fullscreenMap.getCenter(), // Keep the same center
                zoom: fullscreenMap.getZoom(), // Use the same zoom level
                bearing: fullscreenMap.getBearing(), // Keep the same bearing
                pitch: fullscreenMap.getPitch() // Keep the same pitch
            });

            setTimeout(function () {
                useForReloc = null

                fullscreenMap.remove();
                clone.addEventListener('transitionend', () => {
                    clone.remove();
                });
            }, 500)


        });
    }, 10);
});

let countd = 0;
let nearestStations = null;
let createdLines = [];
function spawnLines(data) {
    nearestStations = data;
    return;
    data.forEach((coord, index) => {
        countd++;

        let cord = [
            myloc,
            [coord.lng, coord.lat],
        ];

        const lineData = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: cord
            }
        };

        const sourceId = `line-${index}`;
        const layerId = `line-layer-${countd}`; // Layer ID corresponding to the source

        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
                type: 'geojson',
                data: lineData
            });
        }

        map.addLayer({
            id: layerId,
            type: 'line',
            source: sourceId,
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': coord.hex,
                'line-width': 2,
                'line-opacity': 0.7
            }
        });

        // Store the source and layer IDs
        createdLines.push({ sourceId, layerId });
    });
}

function reloc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            document.getElementById("main").style.opacity = '1'
            document.getElementById("geoloc").style.opacity = '0'
            setTimeout(function () {
                document.getElementById("geoloc").style.display = 'none'
            }, 450)
            const loc = [longitude, latitude]
            myloc = loc
            locationMarker.forEach(marker => marker.remove());
            a(myloc, 'me');
            useForReloc.flyTo({
                center: myloc, // keep the same center
                zoom: 14, // zoom out by 2 levelsmap.getZoom() + 2
                speed: 3, // slow speed for smooth animation
                curve: 1, // smooth curve of the animation
                easing(t) {
                    // ease-in-out function
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                } // ease-in-out easing for smooth transition
            });

        }, function (error) {
            alert(error.message)
            console.log("Error code: " + error.code + " - " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

let fullLine = null;
let activeBusNamePage;
async function findBusInfo(id, getJustLineCode, getJustRouteCode) {
    async function routeOasa(lineCode) {
        const getStops = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getRoutesForLine&p1=${lineCode}&keyOrigin=evoxEpsilon`);
        try {
            const response = await fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${getStops}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const routeCode = data[0].route_code;
                console.log("Found Route Code:", routeCode);
                if (getJustRouteCode) {
                    return routeCode; // Return the route code if requested
                }
                const randomHexColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                pushToMainOuter(routeCode, randomHexColor, randomHexColor, id);
            }
        } catch (error) {
            console.log("Find Route Code[1] error:", error);
            alert("Operation [1] Broke. Retry");
        }
    }

    async function nextUp() {
        const lineIdToFind = id;
        const matchingLines = fullLine.filter(line => line.LineID === lineIdToFind);

        if (matchingLines.length > 0) {
            const selectedLine = matchingLines.length > 1 && matchingLines[0].LineDescr.length < matchingLines[1].LineDescr.length
                ? matchingLines[0]
                : matchingLines[1] || matchingLines[0];

            if (getJustLineCode) {
                return selectedLine.LineCode; // Return the LineCode if requested
            }

            const routeCode = await routeOasa(selectedLine.LineCode); // Await the routeOasa function to get the routeCode
            activeBusNamePage = selectedLine.LineDescr;

            // If routeCode is returned, you can return it here as well
            return routeCode;
        } else {
            console.log("No matching lines found.");
            alert("Δεν βρέθηκαν αντίστοιχες λεωφορειακές γραμμές.");
        }
    }

    if (!fullLine) {
        const allLines = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetLines&keyOrigin=evoxEpsilon`);
        try {
            const response = await fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${allLines}`);
            const data = await response.json();
            fullLine = data;
            return await nextUp(); // Return the route code from nextUp
        } catch (error) {
            console.log("Find All Buses Code[0] error:", error);
            alert("Operation [0] Broke. Retry");
        }
    } else {
        return await nextUp(); // Return the route code from nextUp
    }
}


let isReady = false
function readyOuter() {
    if (isReady === false) {
        isReady = true
        let goZoom;
        let speed;
        const currentTime = new Date();
        const hours = currentTime.getHours();
        if (hours >= 0 && hours < 5) {
            // Do if time is between 12 AM and 5 AM
            goZoom = 9
            speed = 1
            markers_global.forEach(marker => marker.remove());
            a(myloc, 'me');
            setTimeout(function () {
                markers_global.forEach(marker => marker.remove());
                a(myloc, 'me');
            }, 1000)
        } else {
            goZoom = 14
            speed = 3
        }
        map.flyTo({
            center: myloc, // keep the same center
            zoom: goZoom, // zoom out by 2 levelsmap.getZoom() + 2
            speed: speed, // slow speed for smooth animation
            curve: 1, // smooth curve of the animation
            easing(t) {
                // ease-in-out function
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            } // ease-in-out easing for smooth transition
        });

    }

}
function pushToMainOuter(code, color, hex, busId) {
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=https%3A%2F%2Ftelematics.oasa.gr%2Fapi%2F%3Fact%3DwebGetRoutesDetailsAndStops%26p1%3D${code}%26keyOrigin%3DevoxEpsilon`)
        .then(response => response.json())
        .then(data => {
            let count = 0;
            data.stops.forEach(cord => {
                count++;
                const toPush = {
                    "lng": cord.StopLng,
                    "lat": cord.StopLat,
                    "name": cord.StopDescrEng, // StopDescr
                    "code": cord.StopCode,
                    "color": color,
                    "hex": hex,
                    "busId": busId
                };
                stations.push(toPush);

                if (count === data.stops.length) {
                    const radius = 2.5;
                    const nearbyLocations = filterNearbyLocations(myloc, stations, radius);
                    const stationsLines = filterNearestByColor(myloc, stations, radius)
                    spawnLines(stationsLines)
                    console.log("myloc to nearest stations (lines)", stationsLines);
                    //console.log("Nearby Stations", nearbyLocations);
                    let du = 0;
                    nearbyLocations.forEach(corda => {
                        du++;
                        // Pass 'a' for 'me' and 'colorb' for colorb to a()
                        a([corda.lng, corda.lat], corda.color)
                        if (du === nearbyLocations.length) {
                            console.log("Everything Should Be Ready To Use For Bus", busId)
                            readyOuter();
                        }
                    });
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
}


let findBest = [

]

//{
//    "busId": "16",
//    "timeUntilNext": "10",
//    "nearStationActive": "2",
//    "previousBus": "23"
//}
function getNextTime(lineId) {
    findBusInfo(lineId, true).then(lineCode => {
        console.log("Fetching next bus time for line:", lineCode);

        const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${lineCode}&keyOrigin=evoxEpsilon`);

        function displayRemainingTimeLIVE(nextBusTime, previousBusTime, busId) {
            const currentTime = new Date();

            // Calculate next bus time
            const nextBusDate = new Date();
            nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0);

            // Adjust for the next day if time has already passed today
            if (nextBusDate < currentTime) {
                nextBusDate.setDate(nextBusDate.getDate() + 1);
            }

            const remainingTimeMs = nextBusDate - currentTime;
            const remainingMinutes = Math.floor(remainingTimeMs / (1000 * 60));
            const remainingHours = Math.floor(remainingMinutes / 60);
            const displayMinutes = remainingMinutes % 60;

            const remainingTimeText = `${remainingHours > 0 ? `${remainingHours}h ` : ''}${displayMinutes}m`;
            const totalMinutes = (remainingHours * 60 || 0) + displayMinutes;

            console.log(`Time until next ${lineId} bus: ${remainingTimeText}`);

            // Calculate previous bus time
            const previousBusDate = new Date();
            previousBusDate.setHours(previousBusTime.hour, previousBusTime.minutes, 0);

            // Adjust for the previous day if time hasn't passed yet today
            if (previousBusDate > currentTime) {
                previousBusDate.setDate(previousBusDate.getDate() - 1);
            }

            const elapsedTimeMs = currentTime - previousBusDate;
            const elapsedMinutes = Math.floor(elapsedTimeMs / (1000 * 60));
            const elapsedHours = Math.floor(elapsedMinutes / 60);
            const displayElapsedMinutes = elapsedMinutes % 60;

            const elapsedTimeText = `${elapsedHours > 0 ? `${elapsedHours}h ` : ''}${displayElapsedMinutes}m ago`;
            const totalElapsedMinutes = (elapsedHours * 60 || 0) + displayElapsedMinutes;

            console.log(`Time since previous ${lineId} bus: ${elapsedTimeText}`);

            let jsonToAdd = {
                "busId": busId, // Make sure busId is passed correctly
                "lineCode": lineCode,
                "timeUntilNext": totalMinutes,
                "nearStationActive": null,
                "previousBus": totalElapsedMinutes
            };

            console.log(JSON.stringify(nearestStations).includes(busId))

            if (JSON.stringify(nearestStations).includes(busId)) {
                let found = false;
                nearestStations.forEach(station => {
                    //if (found) { return; }
                    if (station.busId === busId) {
                        found = station.code;
                        const stopCode = found;  // Bus stop code
                        const stopName = "Unknown";  // Bus stop name


                        let data = {
                            LineID: busId,// Bus line ID
                            LineDescr: "Null",// Line description
                            RouteCode: null// Route code
                        };
                        console.log("DATAF:", data)
                        findBusInfo(lineId, null, true).then(routeCode => {
                            console.log("RouteCode", routeCode)
                            data.RouteCode = routeCode;
                            almostReady(stopCode, stopName, data).then(remaining => {
                                console.log(remaining)
                                jsonToAdd.nearStationActive = remaining
                                findBest.push(jsonToAdd)
                                console.log("Final:", jsonToAdd)
                            });
                        });
                    }
                });
            }
        }

        function getNextBusTimeLIVE(times) {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();

            for (let time of times) {
                const [hour, minutes] = time.split(':').map(Number);
                if (hour > currentHour || (hour === currentHour && minutes > currentMinutes)) {
                    return { hour, minutes }; // Ensure this returns an object with 'hour' and 'minutes'
                }
            }

            console.warn("No upcoming bus found today. Showing next day's first bus.");
            const [firstHour, firstMinutes] = times[0].split(':').map(Number);
            return { hour: firstHour, minutes: firstMinutes }; // Ensure this returns an object with 'hour' and 'minutes'
        }

        function getPreviousBusTimeLIVE(times) {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();

            // Loop through the times in reverse order to find the last bus before the current time
            for (let i = times.length - 1; i >= 0; i--) {
                const [hour, minutes] = times[i].split(':').map(Number);
                if (hour < currentHour || (hour === currentHour && minutes < currentMinutes)) {
                    return { hour, minutes }; // Return the previous bus time
                }
            }

            console.warn("No previous bus found today. Showing last bus time.");
            const [lastHour, lastMinutes] = times[times.length - 1].split(':').map(Number);
            return { hour: lastHour, minutes: lastMinutes }; // Return the last bus time of the day
        }


        function formatTime(dateTimeString) {
            if (!dateTimeString) {
                console.error("Invalid dateTimeString:", dateTimeString);
                return null;
            }

            const timePart = dateTimeString.split(' ')[1]; // "HH:MM:SS"
            const [hours, minutes] = timePart.split(':');

            if (hours.length === 2 && minutes.length === 2) {
                return `${hours}:${minutes}`;
            } else {
                console.error("Invalid time format:", timePart);
                return null;
            }
        }

        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrl}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (!data.go) {
                    console.warn("No schedule data available.");
                    return;
                }

                const times = data.go.map(item => formatTime(item.sde_start1)).filter(Boolean);

                if (times.length > 0) {
                    const previous = getPreviousBusTimeLIVE(times)
                    const nextBusTime = getNextBusTimeLIVE(times);
                    if (nextBusTime) {
                        localStorage.setItem(`${lineCode}_Timetable_shtepi`, JSON.stringify(data));
                        localStorage.setItem(`${lineCode}_Times_shtepi`, JSON.stringify(times));

                        // Ensure you have busId available here
                        displayRemainingTimeLIVE(nextBusTime, previous, lineId); // Pass busId to the function
                    } else {
                        console.error("Operation Halted. Info:", nextBusTime, times);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching bus schedule:', error);
            });
    });
}



async function almostReady(stopCode, stopName, data) {
    const stop_url = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=${stopCode}&keyOrigin=evoxEpsilon`);

    try {
        const response = await fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stop_url}`);
        const arrivals = await response.json();

        if (!arrivals) {
            return null; // No arrivals data
        }

        console.log("Arrivals:", arrivals);
        console.log("Arrivals data:", data);

        // Find the matching arrival based on route_code
        for (const arrive of arrivals) {
            console.log("Arrive value:", arrive);
            if (arrive.route_code === data.RouteCode) {
                console.log("Arrive:", arrive.btime2);
                return arrive.btime2; // Return bus arrival time
            }
        }

        // If no match found
        return null;

    } catch (error) {
        console.error("getStop [65] error:", error);
        return 'Error fetching data'; // Return error message
    }
}


function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

const currentHour = new Date().getHours();
if (currentHour >= 0 && currentHour < 6) {
    showdemo();
}