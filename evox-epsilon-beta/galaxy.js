let full = null
function attachGalaxy() {
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log(`${src} loaded`);
            if (callback) callback();
        };
        script.onerror = () => console.error(`Error loading script: ${src}`);
        document.head.appendChild(script);
    }

    const scripts = [
        './galaxy/fish.js',
        // 'download.js', // Uncomment if you want to load this script
        './galaxy/pixi.min.js',
        './galaxy/ietabapi_wp.js',
        './galaxy/graph.js'
    ];

    // Load scripts in order
    function loadScriptsSequentially(scripts) {
        if (scripts.length === 0) return;
        loadScript(scripts[0], () => loadScriptsSequentially(scripts.slice(1)));
    }

    
    const self = localStorage.getItem("t50-username")
    fetch(`https://data.evoxs.xyz/social?username=${self}&todo=friends`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const favorites = localStorage.getItem('favorites');
            let friends = {
                all_friends: data,
                details: []
            };

            // Create an array of promises for fetching friends of each friend
            const friendPromises = data.map(friend => {
                return fetch(`https://data.evoxs.xyz/social?username=${friend}&todo=friends`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(friends_of_friend => {
                        const pushing = {
                            name: friend,
                            favorite: favorites.includes(friend),
                            friends: friends_of_friend
                        };
                        friends.details.push(pushing);
                    })
                    .catch(error => {
                        console.warn("Server connection failed for friend:", friend);
                    });
            });

            // Wait for all friend promises to complete
            return Promise.all(friendPromises).then(() => friends);
        })
        .then(friends => {
            // All friends data fetched successfully
            console.log('All friends data:', friends);
            const client_username = self
            const social_data = friends
            let e_friends = {};

            // Function to generate the JSON structure
            function generateJSON(client_username, social_data) {
                // Include the client user first
                e_friends[client_username] = {
                    color: "#22c55e", // self user color
                    links: social_data.all_friends // Links to all friends
                };

                social_data.details.forEach(user => {
                    const username = user.name;

                    // Skip the self user since it's already added
                    if (username !== client_username) {
                        e_friends[username] = {
                            color: user.favorite ? "#aac522" : undefined, // Assign color if favorite
                            links: user.friends
                        };
                    }
                });
            }

            // Generate the JSON structure
            generateJSON(client_username, social_data);
            console.log(e_friends)
            loadScriptsSequentially(scripts);
            full = e_friends
        })
        .catch(error => {
            console.warn("Server connection failed:", error);
        });
}