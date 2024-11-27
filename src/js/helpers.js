export function addAppointmentToLocalStorage(newAppointment) {
  // Step 1: Retrieve the current appointments from localStorage (if any)
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Normalize input: trim spaces, convert to lowercase for comparison
  const normalizeText = text => text.trim().toLowerCase();

  // Step 2: Make sure it isn't a duplicate (criteria: fullName and streetAddress are the same)
  const isDuplicate = appointments.some(
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

export function isAddressValid(city, zipCode, cityData) {
  const cityMatch = cityData.find(
    entry => entry.cityName.toLowerCase() === city.toLowerCase()
  );
  return cityMatch && cityMatch.zipCodes.includes(zipCode);
}

// * notifications

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf({
  duration: 3000,
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
      background: '#1a2e50',
      duration: 7000, // Longer duration for confirmation
      dismissible: false,
      message:
        "Appointment Successfully booked! Confirmation email is on it's way!",
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'check_circle',
      },

      position: {
        x: 'center', // Center horizontally
        y: 'center', // Center vertically
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
