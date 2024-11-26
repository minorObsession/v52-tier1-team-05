import { notyf } from './helpers';
import { fetchAndStoreData, searchAddress } from './model';
import newAptView from './views/newAptView';

const init = function () {
  newAptView.addHandlerSubmitForm();
  newAptView.addHandlerToggleForm();
  newAptView.addHandlerPreventCloseOnForm();
  newAptView.addHandlerCloseOnOutsideClickOrESCKeypress();
};

init();
(async function () {
  try {
    console.log('Fetching and storing data...');
    await fetchAndStoreData(); // Ensure this function is running correctly
    console.log('Data fetched and stored.');

    // Example search
    console.log('Searching address...');
    const matches = await searchAddress('Bentley', '90025'); // Check if this executes
    console.log('Matches:', matches); // Should log the results
  } catch (error) {
    console.error('Error occurred:', error); // Catch and log any errors
  }
})();
