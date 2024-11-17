import JustValidate from 'just-validate';
import { addAppointmentToLocalStorage } from '../helpers';

class newAptView {
  _form = document.getElementById('newAppointmentForm');
  _errorMessages = document.querySelectorAll('.error-message');

  // Handle form submission
  handleFormSubmit(e) {
    e.preventDefault();

    // Get form field values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const streetAddress = document.getElementById('streetAddress').value;
    const city = document.getElementById('city').value;
    const zipCode = document.getElementById('zipCode').value;
    const aptDate = document.getElementById('aptDate').value;
    const aptTimeslot = document.getElementById('aptTimeslot').value;

    // ! Validation
    this._validateForm()
      .onSuccess(() => {
        this._handleSuccess(
          fullName,
          email,
          streetAddress,
          city,
          zipCode,
          aptDate,
          aptTimeslot
        );
      })
      .onFail(fields => {
        this._handleFailure(fields);
      });
  }

  // Initialize form validation
  _validateForm() {
    return new JustValidate(this._form, {
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
    })
      .addField('#fullName', [
        { rule: 'required', errorMessage: 'Full Name is required' },
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
        { rule: 'required', errorMessage: 'Email is required' },
        { rule: 'email', errorMessage: 'Email format is incorrect' },
      ])
      .addField('#streetAddress', [
        { rule: 'required', errorMessage: 'Street Address is required' },
      ])
      .addField('#city', [
        { rule: 'required', errorMessage: 'City is required' },
      ])
      .addField('#zipCode', [
        { rule: 'required', errorMessage: 'Zip Code is required' },
        { rule: 'number', errorMessage: 'Zip Code must be a number' },
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
        { rule: 'required', errorMessage: 'Appointment Date is required' },
        {
          validator: value => new Date(value) > new Date(),
          errorMessage: 'Appointment Date must be after today',
        },
      ])
      .addField('#aptTimeslot', [
        { rule: 'required', errorMessage: '2h timeslot must be selected' },
      ]);
  }

  // Handle successful form submission
  _handleSuccess(
    fullName,
    email,
    streetAddress,
    city,
    zipCode,
    aptDate,
    aptTimeslot
  ) {
    try {
      const newAppointment = {
        fullName,
        email,
        streetAddress,
        city,
        zipCode,
        aptDate,
        aptTimeslot,
      };

      addAppointmentToLocalStorage(newAppointment);
      // ! log appointments object
      console.log(JSON.parse(localStorage.getItem('appointments')));
    } catch (error) {
      alert(error);
    }
  }

  // Handle form validation failure
  _handleFailure(fields) {
    this._errorMessages.forEach(el => (el.textContent = ''));
    let errors = [];
    if (fields && typeof fields === 'object') {
      for (const [, errorData] of Object.entries(fields)) {
        if (errorData.isValid !== true) errors.push(errorData);
      }
    } else {
      console.error('Unexpected format of fields:', fields);
    }
  }

  // Initialize the view (e.g., adding event listeners)
  addHandlerSubmitForm() {
    this._form.addEventListener('submit', this.handleFormSubmit.bind(this));
  }
}

// ! create the class instance and export it
export default new newAptView();
