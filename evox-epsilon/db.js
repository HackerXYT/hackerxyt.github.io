// Function to load images from IndexedDB
async function loadImages() {
    settings_reload();
    
    const values = await getIndexedDBValues();
    const jsonString = JSON.stringify(values);
    console.log('JSON String:', jsonString);
    
    const numberOfImages = values.length;
    
    if (!localStorage.getItem("auto-login")) {
        localStorage.removeItem("img-app-on");
    }
    
    if (numberOfImages === 0) {
        console.log("No images loaded");
        $("#container-img").html(`<p style="color: red;margin-left: 20px">No images uploaded yet</p>`);
    }
    
    $("#loaded-img").html(numberOfImages);
    localStorage.setItem("images", numberOfImages);
    
    createElements(values);
}

// Function to get images from IndexedDB
async function getIndexedDBValues() {
    const db = await openDB();
    const values = [];

    const tx = db.transaction('images', 'readonly');
    const store = tx.objectStore('images');

    await iterateCursor(store, (value) => {
        values.push(value);
    });

    return values;
}

// Function to create elements and append them to the container
function createElements(values) {
    const container = document.getElementById('container-img');
    
    values.forEach((value, index) => {
        const div = document.createElement('div');
        div.className = 'image-wrapper';

        // Create an <a> element
        const link = document.createElement('a');
        link.href = value;
        link.target = '_blank';

        // Create an <img> element
        const img = document.createElement('img');
        img.src = value;
        img.alt = 'Image ' + (index + 1);

        // Append the <img> element to the <a> element
        link.appendChild(img);

        // Append the <a> element to the <div> element
        div.appendChild(link);

        // Append the <div> element to the container
        container.appendChild(div);
    });
}

// Function to upload and save image to IndexedDB
async function encodeImageToBase64() {
    const input = document.getElementById('imageFileInput');
    const file = input.files[0];

    const reader = new FileReader();
    
    reader.onload = async () => {
        try {
            const base64Text = reader.result.split(',')[1];
            const final = `data:image/png;base64,${base64Text}`;
            const nextImageNumber = await getNextImageNumber();
    
            // Create the new image key with the format "image<number>"
            const newImageKey = `image${nextImageNumber}`;
    
            // Save the new value in IndexedDB
            await saveToIndexedDB(newImageKey, final);
    
            console.log("New image key:", newImageKey);
            $("#loading").fadeIn("slow");
            $("#gallery-set").fadeOut("slow");
            $("#popup").fadeOut("slow");
            document.body.style.overflow = 'hidden';
    
            $("#container-img").fadeOut("slow", async () => {
                $("#container-img").html("");
                await loadImages();
                setTimeout(() => {
                    $("#container-img").fadeIn("slow");
                    setTimeout(() => {
                        $("#loading").fadeOut("slow");
                        $("#gallery-set").fadeIn("slow");
                        $("#popup").fadeIn("slow");
                    }, 800);
                }, 700);
            });
        } catch (error) {
            console.error("Error in reader.onload:", error);
        }
    };
    

    reader.readAsDataURL(file);
}

// Function to get the next image number from IndexedDB
// Function to get the next image number from IndexedDB
function getNextImageNumber() {
    return new Promise(async (resolve, reject) => {
        const db = await openDB();
        const tx = db.transaction('images', 'readonly');
        const store = tx.objectStore('images');

        const keysCursor = await store.openKeyCursor();

        if (!keysCursor) {
            resolve(1);
            return;
        }

        const imageNumbers = [];

        keysCursor.onsuccess = function (event) {
            const cursor = event.target.result;

            if (cursor) {
                const key = cursor.key;
                if (key.startsWith("image")) {
                    imageNumbers.push(parseInt(key.match(/\d+/)[0]));
                }
                cursor.continue();
            } else {
                // Find the maximum number and add 1
                const nextImageNumber = imageNumbers.length === 0 ? 1 : Math.max(...imageNumbers) + 1;
                resolve(nextImageNumber);
            }
        };

        keysCursor.onerror = function (event) {
            reject(event.error);
        };
    });
}

// Trigger the loadImages function on page load
loadImages();


// Function to format and delete all images from IndexedDB
async function format() {
    const result = confirm("Delete All Images? This Cannot Be Reverted!");

    if (result) {
        await clearIndexedDB();
        await loadImages();
    } else {
        console.log("Cancelled");
    }
}

// Function to open IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ImageDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const store = db.createObjectStore('images', { keyPath: 'key' });
            store.createIndex('key', 'key', { unique: true });
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.error);
        };
    });
}

// Function to save image to IndexedDB
async function saveToIndexedDB(key, value) {
    const db = await openDB();
    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');

    await store.put({ key, value });

    await tx.complete;
}

// Function to clear all images from IndexedDB
async function clearIndexedDB() {
    const db = await openDB();
    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');

    await store.clear();

    await tx.complete;
}

// Function to iterate over cursor in IndexedDB
function iterateCursor(store, callback) {
    return new Promise((resolve, reject) => {
        const request = store.openCursor();

        request.onsuccess = (event) => {
            const cursor = event.target.result;

            if (cursor) {
                callback(cursor.value);
                cursor.continue();
            } else {
                resolve();
            }
        };

        request.onerror = (event) => {
            reject(event.error);
        };
    });
}

// Trigger the loadImages function on page load
