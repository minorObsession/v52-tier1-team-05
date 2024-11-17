import 'core-js/stable';
import * as model from './model';

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
  const errorMessages = document.querySelectorAll('.error-message');
  console.log(errorMessages);
  // Clear previous error messages

  // Validation
  const validation = new JustValidate(form, {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
      border: '1px solid red',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: 'red',
      textDecoration: 'underlined',
    },
    focusInvalidField: true,
    lockForm: true,
    tooltip: {
      position: 'top',
    },
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
    .addField('#city', [
      {
        rule: 'required',
        errorMessage: 'City is required',
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
    .addField('#aptTimeslot', [
      {
        rule: 'required',
        errorMessage: '2h timeslot must be selected',
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

      try {
        // Try adding the new appointment to localStorage
        addAppointmentToLocalStorage(newAppointment);

        // ? TO BE DELETED --> just logging in to console to see all appointments in LS without switching tabs
        // Optionally, you can log the updated appointments array to the console
        const updatedAppointments =
          JSON.parse(localStorage.getItem('appointments')) || [];
        console.log(updatedAppointments);
      } catch (error) {
        // Catch any errors thrown (e.g., duplicate appointment)
        // * need better error handling than alert! some toast notifications
        alert(error.message); // Display an alert to the user
      }
    })
    .onFail(fields => {
      // Clear all existing error messages
      errorMessages.forEach(el => (el.textContent = ''));
      // console.log(fields);
      // ! create errors object
      let errors = [];
      if (fields && typeof fields === 'object') {
        // ! loop over the object keys just to get values
        for (const [, errorData] of Object.entries(fields)) {
          if (errorData.isValid !== true) errors.push(errorData);
        }
        console.log(errors);

        // // ! attach error messages to corresponding "error-divs" in html
        // errors.forEach(err => {
        //   document.getElementById(`${err?.elem?.id}-error`).textContent =
        //     err.errorMessage;
        // });

        // for each error, add the
      } else {
        console.error('Unexpected format of fields:', fields);
      }
    });
}

form.addEventListener('submit', handleFromSubmit);
