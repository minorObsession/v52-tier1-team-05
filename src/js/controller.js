import 'core-js/stable';
import * as model from './model';
import JustValidate from 'just-validate';

// model.addRandomItemToCart();
// model.increaseQT();

const form = document.getElementById('newAppointmentForm');

function handleFromSubmit(e) {
  e.preventDefault();

  // Get the latest values from the form fields
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const streetAddress = document.getElementById('streetAddress').value;
  const city = document.getElementById('city').value;
  const zipCode = document.getElementById('zipCode').value;
  const aptDate = document.getElementById('aptDate').value;
  const aptTimeslot = document.getElementById('aptTimeslot').value;

  // Clear previous error messages
  document
    .querySelectorAll('.error-message')
    .forEach(el => (el.textContent = ''));

  // Validation
  const validation = new JustValidate('#newAppointmentForm', {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-invalid-label',
  });

  validation
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Full Name is required',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Full Name must be at least 3 characters',
      },
      {
        validator: value => value.trim().split(' ').length >= 2,
        errorMessage: 'Full Name must contain at least two words',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Email is required',
      },
      {
        rule: 'email',
        errorMessage: 'Email format is incorrect',
      },
    ])
    .addField('#streetAddress', [
      {
        rule: 'required',
        errorMessage: 'Street Address is required',
      },
    ])
    .addField('#zipCode', [
      {
        rule: 'required',
        errorMessage: 'Zip Code is required',
      },
      {
        rule: 'number',
        errorMessage: 'Zip Code must be a number',
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Zip Code must be exactly 5 digits',
      },
      {
        rule: 'maxLength',
        value: 5,
        errorMessage: 'Zip Code must be exactly 5 digits',
      },
    ])
    .addField('#aptDate', [
      {
        rule: 'required',
        errorMessage: 'Appointment Date is required',
      },
      {
        validator: value => {
          const today = new Date();
          const selectedDate = new Date(value);

          // Remove time portion for comparison
          today.setHours(0, 0, 0, 0);
          return selectedDate > today;
        },
        errorMessage: 'Appointment Date must be after today',
      },
    ])
    .onSuccess(() => {
      console.log('Form is valid!');
      const newAppointment = {
        fullName,
        email,
        streetAddress,
        city,
        zipCode,
        aptDate,
        aptTimeslot,
      };
      console.log(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(newAppointment));
    })
    .onFail(fields => {
      // Clear all existing error messages
      document
        .querySelectorAll('.error-message')
        .forEach(el => (el.textContent = ''));

      // Populate error messages under the specific fields
      for (const field of fields) {
        const fieldId = field.field;
        const errors = field.errors;

        if (errors && errors.length > 0) {
          const errorContainer = document.getElementById(`${fieldId}-error`);
          if (errorContainer) {
            errorContainer.textContent = errors[0]; // Show the first error message
          }
        }
      }
    });
}

form.addEventListener('submit', handleFromSubmit);

form.addEventListener('submit', handleFromSubmit);

// const validation = new JustValidate('#newAppointmentForm');
// console.log(validation);
