// controller.js

import { notyf } from './helpers';
import { optimizedValidateAddress } from './databaseUtility.js';

import * as model from './model';

import adminLoginModal from './views/adminLoginModal';
import newAptView from './views/newAptView';

// import '../styles/cssConfig.css';
// import '../styles/global.css';
// import '../styles/header.css';
// import '../styles/company.css';
// import '../styles/cta.css';
// import '../styles/company.css';
// import '../styles/modals.css';
// import '../styles/suggestions.css';
// import '../styles/zigZag.css';
// import '../styles/utilities.css';
// import '../styles/responsive.css';

async function controlAppointmentFormSubmit(formData) {
  console.log('controlAppointmentFormSubmit running');
  try {
    // Save form data to localStorage for persistence
    localStorage.setItem('pendingAppointment', JSON.stringify(formData));

    // Show loading spinner or feedback to the user
    newAptView.renderSpinner(
      'Processing your appointment... Feel free to check out the rest of the page in the meantime!'
    );

    // 1) Fetch and validate the address
    const { streetAddress, zipCode } = formData;
    const isValidAddress = await optimizedValidateAddress(
      zipCode,
      streetAddress
    );

    if (!isValidAddress)
      throw new Error(
        'Your address could not be found in our database. Please try again and select a valid address from the suggestions pop-up!'
      );

    // 4) Process form submission (e.g., update database or state)
    model.AppState.addAppointment(formData);

    // 5) Render success message
    notyf.open({
      type: 'success',
      message: `Your appointment is confirmed for ${formData.aptTimeslot} on ${formData.aptDate} !`,
    });
  } catch (err) {
    notyf.error(`Could not create your appointment. ${err.message}.`);
  } finally {
    newAptView.cancelSpinner(); // Ensure the spinner is stopped in the finally block
    localStorage.removeItem('pendingAppointment');
    newAptView.handleToggleModal(); // Close modal window
  }
}

async function controlAdminLogin() {
  // ! activate form handler
}

async function init() {
  model.AppState.initializeState();
  // * check for pending requests and finish them
  if (model.AppState.pendingAppointmentObject)
    controlAppointmentFormSubmit(model.AppState.pendingAppointmentObject);
  // * initialize form submit handler
  newAptView.addHandlerSubmitForm(controlAppointmentFormSubmit);
  console.log('init done');
}

init();

// ! testing sela's table
function loadAppointments() {
  console.log('running loadAppointments');
  const tbody = document.getElementById('appointments-tbody');

  const appointments = model.AppState.appointments;

  console.log(appointments);
  // .then(appointments => {
  //   const tbody = document.getElementById('appointments-tbody');
  //   tbody.innerHTML = ''; // Clear any existing content

  appointments.forEach((appointment, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${appointment.fullName}</td>
          <td>${appointment.streetAddress}</td>
          <td>${appointment.aptDate}</td>
          <td>${appointment.aptTimeslot}</td>
          <td>${appointment.status}</td>
          <td>
            <button class="confirm" onclick="confirmAppointment(${index})">Confirm</button>
            <button class="cancel" onclick="cancelAppointment(${index})">Cancel</button>
          </td>
        `;
    tbody.appendChild(row);
  });
}

// Load appointments when the page is loaded
window.onload = loadAppointments;
