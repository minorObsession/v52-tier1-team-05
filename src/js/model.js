import { dbName, storeName } from './config';
import { calculateMatchScore, tokenizeAddress } from './helpers';
// Global state object for managing application-wide data
export const AppState = {
  // * global state
  adminAccounts: [],
  appointments: [],

  async initializeState() {
    const db = await openDatabase(); // Open the IndexedDB database

    // Transaction for reading appointments
    const appointmentTransaction = db.transaction('appointments', 'readonly');
    const appointmentStore = appointmentTransaction.objectStore('appointments');
    const appointmentRequest = appointmentStore.get('appointments');

    appointmentRequest.onsuccess = () => {
      this.appointments = appointmentRequest.result?.data || [];
    };

    // Transaction for reading adminAccounts
    const adminTransaction = db.transaction('adminAccounts', 'readonly');
    const adminStore = adminTransaction.objectStore('adminAccounts');
    const adminRequest = adminStore.get('adminAccounts');

    adminRequest.onsuccess = () => {
      this.adminAccounts = adminRequest.result?.data || [];
    };

    await Promise.all([
      appointmentTransaction.complete,
      adminTransaction.complete,
    ]);
  },

  // Saves the current in-memory state to IndexedDB.
  // * Ensures persistence of the global state across sessions
  // Saves the current in-memory state to IndexedDB.
  async saveStateToDB() {
    const db = await openDatabase();

    // Transaction for saving appointments
    const appointmentTransaction = db.transaction('appointments', 'readwrite');
    const appointmentStore = appointmentTransaction.objectStore('appointments');
    // Save appointments array to IndexedDB
    appointmentStore.put({ id: 'appointments', data: this.appointments });

    // Transaction for saving admin accounts
    const adminTransaction = db.transaction('adminAccounts', 'readwrite');
    const adminStore = adminTransaction.objectStore('adminAccounts');
    // Save admin accounts array to IndexedDB
    adminStore.put({ id: 'adminAccounts', data: this.adminAccounts });

    await Promise.all([
      appointmentTransaction.complete,
      adminTransaction.complete,
    ]);
  },

  async addAppointment(newAppointment) {
    this.appointments.push(newAppointment); // Add to in-memory state
    await this.saveStateToDB(); // Save updated state to IndexedDB
    console.log(this.appointments);
  },

  async deleteAppointment(appointmentId) {
    // Filter out the appointment with the given id
    this.appointments = this.appointments.filter(
      appointment => appointment.id !== appointmentId
    );
    await this.saveStateToDB(); // Save updated state to IndexedDB
    console.log(this.appointments);
  },

  async modifyAppointment(appointmentId, updatedData) {
    // Find and update the appointment in the in-memory state
    this.appointments = this.appointments.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, ...updatedData }
        : appointment
    );
    await this.saveStateToDB(); // Save updated state to IndexedDB
    console.log(this.appointments);
  },
};

// Utility function to open the IndexedDB database.
export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function () {
      const db = request.result;

      // Create object store for appointments if it doesn't exist
      if (!db.objectStoreNames.contains('appointments')) {
        const appointmentStore = db.createObjectStore('appointments', {
          keyPath: 'id',
        });
        appointmentStore.createIndex('zipCode', 'zipCode', { unique: false });
        appointmentStore.createIndex('searchableAddress', 'searchableAddress', {
          unique: false,
        });
        appointmentStore.createIndex(
          'searchableAddressTokens',
          'searchableAddressTokens',
          { unique: false, multiEntry: true }
        );
      }

      // Create object store for adminAccounts if it doesn't exist
      if (!db.objectStoreNames.contains('adminAccounts')) {
        const adminAccountStore = db.createObjectStore('adminAccounts', {
          keyPath: 'id',
        });
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

// Store data in IndexedDB in batches
async function storeDataBatch(db, batch) {
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
