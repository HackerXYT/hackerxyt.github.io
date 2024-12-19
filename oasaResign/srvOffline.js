function tryDirect(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error("Fetch error:", error); // Log the error for debugging
            return false;
        });
}
