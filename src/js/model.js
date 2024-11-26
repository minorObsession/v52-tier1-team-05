const dbName = 'CityDataDB';
const storeName = 'Addresses';

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function () {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id' });
        // Add indexes for faster searching
        store.createIndex('streetName', 'streetName', { unique: false });
        store.createIndex('zipCode', 'zipCode', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// * 2. Fetching and Storing Data in Batches

export async function fetchAndStoreData() {
  try {
    console.log('Starting fetchAndStoreData...');

    const response = await fetch(
      'https://data.lacity.org/api/views/4ca8-mxuh/rows.json?accessType=DOWNLOAD'
    );
    const data = await response.json();
    console.log(data);
    console.log(data.meta.view.columns);

    //!  14-> Street Name
    //!  15-> Street Type
    //!  18-> Zip Code
    //!  19-20 -> lat,lng

    const addresses = data.data.map((item, index) => ({
      id: index + 1, // ? Use index as the key
      streetNumber: item[11],
      streetDirection: item[13],
      streetName: item[14],
      streetType: item[15],
      zipCode: item[18],
      lat: item[19],
      lng: item[20],
    }));

    const db = await openDatabase();

    // Store data in batches to avoid blocking
    const batchSize = 1000;
    for (let i = 0; i < addresses.length; i += batchSize) {
      const batch = addresses.slice(i, i + batchSize);
      await storeDataBatch(db, batch);
    }
    console.log('Data stored successfully.');
  } catch (err) {
    console.error('Error in fetchAndStoreData:', err);
    throw err; // Re-throw to propagate the error to the caller
  }
}

function storeDataBatch(db, batch) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    batch.forEach(item => store.put(item));

    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}
// * 3. Searching Data
export async function searchAddress({
  streetName,
  zipCode,
  streetNumber,
  streetDirection,
  streetType,
}) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    // Use the index for streetName if provided, or fall back to scanning all records
    const index = streetName ? store.index('streetName') : store;
    const query = streetName || null; // Null queries the entire object store
    const results = [];

    const request = index.openCursor(query);

    request.onsuccess = function () {
      const cursor = request.result;
      if (cursor) {
        const record = cursor.value;

        // Apply filtering logic
        if (
          (!zipCode || +record.zipCode === +zipCode) &&
          (!streetNumber || record.streetNumber === streetNumber) &&
          (!streetDirection || record.streetDirection === streetDirection) &&
          (!streetType || record.streetType === streetType)
        ) {
          results.push(record);
        }

        cursor.continue();
      } else {
        resolve(results); // No more records, return results
      }
    };

    request.onerror = () =>
      reject(new Error(`Error searching address: ${request.error}`));
  });
}
