import { notyf } from './helpers';
import { fetchAndStoreData, openDatabase, searchAddress } from './model';
import newAptView from './views/newAptView';

const init = function () {
  newAptView.addHandlerSubmitForm();
  newAptView.addHandlerToggleForm();
  newAptView.addHandlerPreventCloseOnForm();
  newAptView.addHandlerCloseOnOutsideClickOrESCKeypress();
  fetchAndStoreData();
};

init();

document.addEventListener('DOMContentLoaded', () => {
  const addressInput = document.getElementById('addressInput');
  const suggestionsContainer = document.getElementById('suggestions');
  const zipCodeEL = document.getElementById('zipCodeInput');

  let currentQuery = ''; // Store the current query to avoid race conditions

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function displaySuggestions(matches) {
    // Clear previous suggestions
    suggestionsContainer.innerHTML = ''; // This will clear all previous suggestions

    if (!matches.length) {
      const noMatch = document.createElement('div');
      noMatch.className = 'suggestion-item';
      noMatch.textContent = 'No matches found';
      suggestionsContainer.appendChild(noMatch);
      return;
    }

    // Append new matches
    matches.forEach(match => {
      const suggestionItem = document.createElement('div');
      suggestionItem.className = 'suggestion-item';
      suggestionItem.textContent = `${match.streetNumber || ''} ${
        match.streetDirection || ''
      } ${match.streetName} ${match.streetType || ''}, ${
        match.zipCode || ''
      }`.trim();

      suggestionItem.dataset.address = JSON.stringify(match);
      suggestionItem.addEventListener('click', () => {
        addressInput.value = suggestionItem.textContent; // Update the addressInput value
        suggestionsContainer.innerHTML = ''; // Clear suggestions after selecting an address
      });

      suggestionsContainer.appendChild(suggestionItem);
    });
  }

  //*  Input Event Listeners

  addressInput.addEventListener(
    'input',
    debounce(async function () {
      const query = addressInput.value.trim();
      if (query.length < 2) {
        suggestionsContainer.innerHTML = ''; // Clear suggestions if query is too short
        return;
      }

      // Avoid unnecessary searches when query is the same as the last query
      if (query === currentQuery) return;

      currentQuery = query; // Update the current query

      try {
        const matches = await searchAddress(query);
        displaySuggestions(matches); // Refresh and display new suggestions
      } catch (err) {
        console.error('Error fetching address suggestions:', err);
      }
    }, 300)
  );

  // * Close suggestions when clicking outside
  document.addEventListener('click', event => {
    if (
      !suggestionsContainer.contains(event.target) &&
      event.target !== addressInput
    ) {
      suggestionsContainer.innerHTML = ''; // Clear suggestions when clicking outside
    }
  });

  // * Form submit by customer
  document
    .querySelector('.newAppointmentForm')
    .addEventListener('submit', async e => {
      e.preventDefault();

      const zipCode = zipCodeEL.value.trim();
      const addressQuery = document.getElementById('addressInput').value.trim();

      try {
        const results = await searchAddress(zipCode, addressQuery);

        if (results.length === 0) {
          console.log('No matches found.');
        } else {
          console.log('Search Results:', results);
        }
      } catch (err) {
        console.error('Error searching for address:', err);
      }
    });

  // *  Event Listener for Zip Code Input:
  zipCodeEL.addEventListener(
    'input',
    debounce(async function () {
      const zipCodeEL = document.getElementById('zipCodeInput');
      const zipCode = zipCodeEL.value.trim();
      console.log(zipCode);

      // Check if the zip code is 5 digits long
      if (zipCode.length === 5) {
        // Ensure it's exactly 5 digits
        console.log('pass');
        // Clear the address query and reset suggestions when zip code changes
        addressInput.value = '';
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        // Filter address suggestions based on the zip code
        const query = addressInput.value.trim(); // Get the query from the address input
        if (query.length < 2) {
          suggestionsContainer.innerHTML = ''; // Clear suggestions if query is too short
          return;
        }

        try {
          const matches = await searchAddress(zipCode, query); // Search within the zip code
          displaySuggestions(matches); // Refresh and display new suggestions
        } catch (err) {
          console.error('Error fetching address suggestions:', err);
        }
      } else {
        // Optionally clear suggestions or show a message if zip code is invalid
        suggestionsContainer.innerHTML =
          'Please enter a valid 5-digit zip code.';
      }
    }, 300)
  );

  document.getElementById('addressInput').addEventListener(
    'input',
    debounce(async function () {
      const zipCode = document.getElementById('zipCodeInput').value.trim();
      const query = addressInput.value.trim(); // Get the address input value

      if (zipCode.length === 5 && query.length >= 2) {
        try {
          const matches = await searchAddress(zipCode, query); // Filter by zip code and query
          displaySuggestions(matches); // Display filtered suggestions
        } catch (err) {
          console.error('Error fetching address suggestions:', err);
        }
      } else {
        suggestionsContainer.innerHTML = ''; // Clear suggestions if zip code is not valid or query is too short
      }
    }, 300)
  );
});
