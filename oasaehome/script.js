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
        zoom: 4, // starting zoom
        pitch: 0, // optional: adjust if you want the map to be more tilted initially
        bearing: 0 // optional: adjust the initial bearing if needed
    });


    const s = location; // Coordinates for the first marker
    a(s, 'me');

    const n = [23.6447856, 37.9443765]; // Coordinates for the second marker
    a(n);

    let isReady = false
    function ready() {
        if (isReady === false) {
            isReady = true
            map.flyTo({
                center: location, // keep the same center
                zoom: 14, // zoom out by 2 levelsmap.getZoom() + 2
                speed: 3, // slow speed for smooth animation
                curve: 1, // smooth curve of the animation
                easing(t) {
                    // ease-in-out function
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                } // ease-in-out easing for smooth transition
            });
        }

    }



    function pushToMain(code, color) {
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
                        "color": color
                    };
                    stations.push(toPush);

                    if (count === data.stops.length) {
                        const radius = 0.8;
                        const nearbyLocations = filterNearbyLocations(myloc, stations, radius);
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
    pushToMain(code831, "green")
    pushToMain(code16, "yellow")
    pushToMain(code703, "red")
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