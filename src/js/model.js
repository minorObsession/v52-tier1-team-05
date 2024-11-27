import { dbName, storeName } from './config';
import { calculateMatchScore } from './helpers';

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function () {
      console.log('Upgrading database...');
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id' });
        store.createIndex('zipCode', 'zipCode', { unique: false });
        store.createIndex('searchableAddress', 'searchableAddress', {
          unique: false,
        });
        store.createIndex(
          'searchableAddressTokens',
          'searchableAddressTokens',
          {
            unique: false,
            multiEntry: true,
          }
        );
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Fetch and store data in batches with zipCode and tokenized fields
export async function fetchAndStoreData() {
  try {
    console.log('Starting fetchAndStoreData...');

    const response = await fetch(
      'https://data.lacity.org/api/views/4ca8-mxuh/rows.json?accessType=DOWNLOAD'
    );
    const data = await response.json();
    console.log('Fetched data:', data);

    const addresses = data.data
      .filter(item => item[18])
      .map((item, index) => {
        const addressString =
          `${item[11]} ${item[13]} ${item[14]} ${item[15]}`.trim();

        return {
          id: index + 1,
          streetNumber: item[11],
          streetDirection: item[13],
          streetName: item[14],
          streetType: item[15],
          zipCode: item[18],
          lat: item[19],
          lng: item[20],
          searchableAddress: addressString.toLowerCase(), // Store the full address
          searchableAddressTokens: tokenizeAddress(addressString), // Tokenized address for flexible search
        };
      });

    const db = await openDatabase();

    // Store data in batches to avoid blocking
    const batchSize = 1000;
    for (let i = 0; i < addresses.length; i += batchSize) {
      const batch = addresses.slice(i, i + batchSize);
      await storeDataBatch(db, batch);
    }
    console.log('All data stored successfully.');
  } catch (err) {
    console.error('Error in fetchAndStoreData:', err);
  }
}

// Tokenize address into words for flexible search
function tokenizeAddress(address) {
  return address.toLowerCase().trim().split(/\s+/); // Split by spaces
}

// Store data in IndexedDB in batches
function storeDataBatch(db, batch) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    batch.forEach(item => store.put(item));

    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

// Search by zip code first, then refine by the rest of the address
export async function searchAddress(zipCode, query) {
  const db = await openDatabase();

  const formattedZipCode = zipCode.trim(); // Ensure no extra spaces in zipCode
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const zipCodeIndex = store.index('zipCode');

    // Fetch all records matching the zip code
    const zipRequest = zipCodeIndex.getAll(formattedZipCode);

    zipRequest.onsuccess = function () {
      const zipFilteredResults = zipRequest.result;

      if (!query?.trim()) {
        resolve(zipFilteredResults.slice(0, 10)); // Return top 10 if no query
        return;
      }

      const tokens = query.toLowerCase().trim().split(/\s+/); // Tokenize query

      // Refined results based on tokens
      const refinedResults = zipFilteredResults.filter(record =>
        tokens.every(
          token =>
            record.searchableAddress.includes(token) ||
            (record.searchableAddressTokens &&
              record.searchableAddressTokens.includes(token))
        )
      );

      // Calculate relevance score for refined results
      refinedResults.forEach(result => {
        result.matchScore = calculateMatchScore(result, tokens);
      });

      refinedResults.sort((a, b) => b.matchScore - a.matchScore); // Sort by match score
      resolve(refinedResults.slice(0, 10)); // Limit to top 10 results
    };

    zipRequest.onerror = error => reject(error);
  });
}
