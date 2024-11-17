export function addAppointmentToLocalStorage(newAppointment) {
  // Step 1: Retrieve the current appointments from localStorage (if any)
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Step 2: Make sure it isn't a duplicate (criteria: fullName and streetAddress are the same)
  const isDuplicate = appointments.some(
    apt =>
      apt.fullName === newAppointment.fullName &&
      apt.streetAddress === newAppointment.streetAddress
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
