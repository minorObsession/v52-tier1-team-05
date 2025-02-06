// helpers.js

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { AppState } from './model';

// Example of saving generated appointments to localStorage
export function saveAppointmentsToLocalStorage(appointmentsArray = null) {
  if (appointmentsArray)
    localStorage.setItem('appointments', JSON.stringify(appointmentsArray));
  else {
    const appointments = generateMockAppointments();
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }
}

export function addAppointmentToLocalStorage(newAppointment) {
  // Step 1: Retrieve the current appointments from localStorage (if any)
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Normalize input: trim spaces, convert to lowercase for comparison
  const normalizeText = text => (text ? text.trim().toLowerCase() : '');

  // Step 2: Make sure it isn't a duplicate (criteria: fullName and streetAddress are the same)
  const isDuplicate = appointments?.some(
    apt =>
      normalizeText(apt.fullName) === normalizeText(newAppointment.fullName) &&
      normalizeText(apt.streetAddress) ===
        normalizeText(newAppointment.streetAddress) &&
      apt.zipCode === newAppointment.zipCode
  );

  // * improvement to implement: show the previous appointment screen (or a link to cancel it)!
  if (isDuplicate)
    throw new Error(
      "You've already made an appointment with us! Please cancel it before we can book a new one for you!"
    );

  console.log('adding to local storage (success)');
  // Step 3: Add the new appointment to the array
  appointments.push(newAppointment);

  // Step 3: Store the updated array back into localStorage
  localStorage.setItem('appointments', JSON.stringify(appointments));
}
export function currentPendingAppointmentRequest() {
  try {
    // Check for any pending appointment submission
    const pendingAppointment = localStorage.getItem('pendingAppointment');
    if (!pendingAppointment) return false;

    const formData = JSON.parse(pendingAppointment);

    // Show spinner and retry processing
    notyf.open({
      type: 'warning',
      message: 'Resuming your previous appointment request...',
    });

    return formData;
  } catch (err) {
    console.error('Error resuming pending appointment:', err);
  } finally {
    localStorage.removeItem('pendingAppointment'); // Clean up if there's an issue
  }
}

export function loginAdminHeaderSwitch(headerElement) {
  if (!AppState.currentAdminAccount)
    throw new Error("account couldn't be found in AppState");
  else {
    // Update button text
    headerElement.textContent = `${
      AppState.currentAdminAccount.username[0].toUpperCase() +
      AppState.currentAdminAccount.username.slice(1)
    } logged in`;

    // Update styles
    headerElement.style.color = 'var(--color-secondary)';
    headerElement.style.cursor = 'not-allowed';
    headerElement.style.pointerEvents = 'none';

    // Disable its parent container if needed
    const toggleLoginContainer = headerElement.closest('.toggle-login-btn');
    if (toggleLoginContainer) {
      toggleLoginContainer.style.pointerEvents = 'none';
    }
  }
}
export function reverseLoginAdminHeaderSwitch(headerElement) {
  // Check if the currentAdminAccount is present in AppState
  if (!AppState.currentAdminAccount) {
    throw new Error("Account couldn't be found in AppState");
  } else {
    // Reset header element text and styles
    headerElement.textContent = 'Admin Login'; // Or whatever default text should be

    headerElement.style.color = ''; // Reset color to default
    headerElement.style.cursor = ''; // Reset cursor style
    headerElement.style.pointerEvents = ''; // Reset pointer events

    // Re-enable the parent container of the toggle login button
    const toggleLoginContainer = headerElement.closest('.toggle-login-btn');
    if (toggleLoginContainer) {
      toggleLoginContainer.style.pointerEvents = '';
    }
  }
}
export function loginAdminUISwitch(sectionsToHide) {
  // first add hiddenSection class to all
  sectionsToHide.forEach(section => section.classList.add('hideSection'));
  const adminSectionElement = document.querySelector('.admin-section');
  // then remove it from the adminSection
  adminSectionElement.classList.remove('hideSection');
}
export function reverseLoginAdminUISwitch(sectionsToShow) {
  // First, remove the "hideSection" class from all sections that were hidden
  sectionsToShow.forEach(section => section.classList.remove('hideSection'));

  const adminSectionElement = document.querySelector('.admin-section');

  // Add the "hideSection" class back to the admin section to hide it again
  if (adminSectionElement) {
    adminSectionElement.classList.add('hideSection');
  }
}

export function formatDate(date, options = null) {
  if (options) {
    return new Intl.DateTimeFormat('en', options).format(new Date(date));
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));
}

// * notifications
export const notyf = new Notyf({
  duration: 5000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: 'orange',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning',
      },
    },
    {
      type: 'success',
      background: 'green',
      duration: 3000,
      dismissible: true,
    },
    {
      type: 'error',
      background: 'indianred',
      duration: 7000,
      dismissible: true,
    },
    {
      type: 'confirmation',
      background: '#5d5a88',
      duration: 10000, // Longer duration for confirmation
      dismissible: false,
      message:
        "Appointment Successfully booked! Confirmation email is on it's way! To modify/cancel please call us at +1 (800)-888-000.  ",
      icon: {
        className: 'material-icons',
        tagName: 'i',
        // text: 'check_circle',
      },

      className: 'notyf-confirmation',
    },
  ],
});

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
// Helper function to calculate match score
export function calculateMatchScore(record, tokens) {
  let score = 0;

  // Match on street name
  if (
    record?.streetName &&
    tokens?.some(token => record.streetName.toLowerCase().includes(token))
  ) {
    score += 3;
  }

  // Match on street direction (only if it exists)
  if (
    record.streetDirection &&
    tokens?.some(token => record.streetDirection.toLowerCase().includes(token))
  ) {
    score += 2;
  }

  // Match on street type (if present)
  if (
    record.streetType &&
    tokens?.some(token => record.streetType.toLowerCase().includes(token))
  ) {
    score += 1;
  }

  // Match on street number (if present)
  if (
    record.streetNumber &&
    tokens?.some(token => record.streetNumber.toLowerCase().includes(token))
  ) {
    score += 1;
  }

  return score;
}
// Tokenize address into words for flexible search
export function tokenizeAddress(address) {
  return address.toLowerCase().trim().split(/\s+/); // Split by spaces
}
