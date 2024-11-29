import { debounce } from './helpers';
import { fetchAndStoreData, openDatabase, searchAddress } from './model';
import adminLoginModal from './views/adminLoginModal';
import newAptView from './views/newAptView';

import '../styles/global.css';
import '../styles/header.css';
import '../styles/company.css';
import '../styles/cta.css';
import '../styles/company.css';
import '../styles/modals.css';
import '../styles/suggestions.css';
import '../styles/utilities.css';

const init = function () {
  newAptView.addHandlerSubmitForm();
  adminLoginModal.addHandlerSubmitForm();

  fetchAndStoreData();
};

init();

document.addEventListener('DOMContentLoaded', () => {
  const addressInput = document.getElementById('streetAddress');
  const suggestionsContainer = document.getElementById('suggestions');
  const zipCodeEL = document.getElementById('zipCode');

  let currentQuery = ''; // Store the current query to avoid race conditions

  function displaySuggestions(matches) {
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

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

      // * Select suggestion event listener
      suggestionItem.addEventListener('click', () => {
        const addressText = suggestionItem.textContent.trim();
        const addressWithoutZip = addressText
          .replace(/\s*\d{5}(\s*\-\s*\d{4})?(\s*,\s*)?$/, '')
          .trim(); // Remove zip code (and optional extension) and trailing comma

        // Set the address input value
        addressInput.value = addressWithoutZip.replace(',', '');

        // Clear and hide suggestions
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none'; // Hide the suggestions container
      });

      suggestionsContainer.appendChild(suggestionItem);
    });
  }

  async function handleAddressInput() {
    const query = addressInput.value.trim();
    const zipCode = zipCodeEL.value.trim();

    if (query.length < 2) {
      suggestionsContainer.innerHTML = ''; // Clear suggestions if query is too short
      return;
    }

    // Avoid unnecessary searches when query is the same as the last query
    if (query === currentQuery) return;

    currentQuery = query; // Update the current query

    try {
      const matches =
        zipCode.length >= 5
          ? await searchAddress(zipCode, query)
          : await searchAddress(query);
      displaySuggestions(matches); // Refresh and display new suggestions
    } catch (err) {
      console.error('Error fetching address suggestions:', err);
    }
  }

  addressInput.addEventListener('input', debounce(handleAddressInput, 300));
  zipCodeEL.addEventListener('input', debounce(handleAddressInput, 300));

  // Close suggestions when clicking outside the input and suggestions container
  document.addEventListener('click', event => {
    if (
      !suggestionsContainer.contains(event.target) &&
      event.target !== addressInput
    ) {
      suggestionsContainer.innerHTML = ''; // Clear suggestions when clicking outside
      suggestionsContainer.style.display = 'none'; // Hide the suggestions container
    }
  });

  // Show suggestions when the address input is focused
  addressInput.addEventListener('focus', () => {
    if (suggestionsContainer.innerHTML.trim()) {
      suggestionsContainer.style.display = 'block'; // Show suggestions when input is focused
    }
  });

  // Prevent suggestions from being hidden too early when clicking inside the suggestions container
  suggestionsContainer.addEventListener('mousedown', event => {
    event.preventDefault(); // Prevent the blur event from firing immediately on click
  });

  // Hide suggestions when the address input loses focus (with a slight delay)
  addressInput.addEventListener('blur', () => {
    setTimeout(() => {
      suggestionsContainer.style.display = 'none'; // Hide suggestions when input is blurred
    }, 200); // Adding a slight delay to allow click events to be registered
  });
});
