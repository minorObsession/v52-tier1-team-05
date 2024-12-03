// helpers.js

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

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

  console.log('isDuplicate:', isDuplicate);

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
      duration: 5000,
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
      background: 'green',
      duration: 7000, // Longer duration for confirmation
      dismissible: false,
      message:
        "Appointment Successfully booked! Confirmation email is on it's way!",
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'check_circle',
      },

      className: 'notyf-confirmation',
    },
  ],
});
