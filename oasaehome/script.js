mapboxgl.accessToken = 'pk.eyJ1IjoicGFwb3N0b2wiLCJhIjoiY2xsZXg0c240MHphNzNrbjE3Z2hteGNwNSJ9.K1O6D38nMeeIzDKqa4Fynw';


let map;
let myloc;
// Create a custom element for the marker
function a(b, what) {
    const markerElement = document.createElement('div');
    markerElement.style.width = '10px'; // smaller size
    markerElement.style.height = '10px';

    if (what === 'me') {
        markerElement.style.backgroundColor = '#2e77ff';
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
    new mapboxgl.Marker({ element: markerElement })
        .setLngLat(b) // coordinates for the marker
        .addTo(map);
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



    function pushToMain(code, color, hex) {
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
                        "hex": hex
                    };
                    stations.push(toPush);

                    if (count === data.stops.length) {
                        const radius = 0.8;
                        const nearbyLocations = filterNearbyLocations(myloc, stations, radius);
                        const stationsLines = filterNearestByColor(myloc, stations, radius)
                        spawnLines(stationsLines)
                        console.log(nearbyLocations);
                        let du = 0;
                        nearbyLocations.forEach(corda => {
                            du++;
                            // Pass 'a' for 'me' and 'colorb' for colorb to a()
                            a([corda.lng, corda.lat], corda.color)
                            if (du === nearbyLocations.length) {
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
    pushToMain(code831, "green", "#5ac876")
    pushToMain(code16, "yellow", '#965d00')
    pushToMain(code703, "red", '#ff4a4a')
}



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
            const loc = [longitude, latitude]
            myloc = loc
            setup(loc)
            setTimeout(function () {
                showdemo()
            }, 800)
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
    clone.style.transition = 'all 0.5s ease'; // Smooth transition
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
function spawnLines(data) {
    console.log("DATATA:", data);

    data.forEach((coord, index) => {  // Use 'index' to generate a unique source ID
        countd++;
        console.log(countd);

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

        // Use a unique ID for each source by including the index
        const sourceId = `line-${index}`;

        // Add the source with the unique ID
        if (!map.getSource(sourceId)) {  // Check if the source already exists
            map.addSource(sourceId, {
                type: 'geojson',
                data: lineData
            });
        }

        // Add the layer using the same unique source ID
        map.addLayer({
            id: `line-layer-${countd}`,
            type: 'line',
            source: sourceId,  // Use the unique source ID here
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': coord.hex, // Line color
                'line-width': 2,// Line width
                'line-opacity': 0.7
            }
        });
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
            a(loc, 'me');
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