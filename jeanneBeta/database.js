const DB_NAME = 'JeanneDarc';
const STORE_NAME = 'EvoxImages';
const DB_VERSION = 1;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveImage(id, imageData) {
    const existing = await getImage(id); // Separate transaction for reading

    if (existing && existing.imageData === imageData) {
        console.log('Image already exists and is the same, skipping update.');
        return;
    }

    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite'); // New transaction
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.put({ id, imageData });

        request.onsuccess = () => {
            console.log('Image saved/updated successfully.');
            resolve();
        };
        request.onerror = () => reject(request.error);
    });
}


async function getImage(id) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    return new Promise((resolve) => {
        const request = store.get(id);
        request.onsuccess = () => {
            console.log('Image fetched:', request.result);  // Log the result
            resolve(request.result);
        };
        request.onerror = () => {
            console.error('Error fetching image for ID:', id);  // Log error
            resolve(null);
        };
    });
}


async function clearDatabase() {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    await tx.complete;
    console.log('Database cleared successfully.');
}

async function fetchAndSaveImage(id, imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            saveImage(id, reader.result); // Store as base64
        };
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}