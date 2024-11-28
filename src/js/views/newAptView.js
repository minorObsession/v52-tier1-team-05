import JustValidate from 'just-validate';
import { addAppointmentToLocalStorage, notyf } from '../helpers';
import ModalView from './ModalView';

class NewAptView extends ModalView {
  _form = document.querySelector('.newAppointmentForm');
  _formOverlay = document.querySelector('.form-overlay');
  _errorMessages = document.querySelectorAll('.error-message');
  _toggleFormButton = document.querySelector('.cta-btn');
  _submitButton = document.querySelector('.form-submit-btn');
  _validator;

  constructor() {
    super('.newAppointmentForm', '.form-overlay', '.cta-btn'); // Pass selectors to parent class

    // Bind methods
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);

    // Initialize validation
    this._initValidation();
  }

  // Initialize validation rules once
  _initValidation() {
    this._validator = new JustValidate(this._form, {
      errorLabelCssClass: 'error-message',
      tooltip: { position: 'top' },
      lockForm: true,
    });

    this._validator
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
      .addField('#zipCode', [
        { rule: 'required', errorMessage: 'Zip Code is required' },
        {
          rule: 'number',
          errorMessage: 'Must be a 5 digit LA county Zip Code',
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
        { rule: 'required', errorMessage: 'Appointment Date is required' },
        {
          validator: value => new Date(value) >= new Date(),
          errorMessage: 'Please choose a future date',
        },
      ])
      .addField('#aptTimeslot', [
        { rule: 'required', errorMessage: '2h timeslot must be selected' },
      ]);
  }

  // Handle form submission
  // Handle form submission
  async _handleFormSubmit(e) {
    e.preventDefault(); // Always prevent the default form submission

    // Disable the submit button to prevent multiple clicks
    this._submitButton.disabled = true;

    try {
      const isValid = await this._validator.isValid;

      if (isValid) {
        this._handleSuccess();
      } else {
        this._handleFailure();
      }
    } catch (error) {
      console.error('Validation Error:', error);
      notyf.error(error.message);
    } finally {
      // Re-enable the submit button after handling
      this._submitButton.disabled = false;
    }
  }

  // Handle successful form submission
  async _handleSuccess() {
    const formData = this._getFormData();
    try {
      // if ()
      // Add appointment to storage
      addAppointmentToLocalStorage(formData);

      // Show success notification
      notyf.open({
        type: 'confirmation',
        message: `Hooray! Your appointment has been scheduled for ${formData.aptDate} at ${formData.aptTimeslot}!`,
      });

      // Reset the form
      this._form.reset();

      // Re-enable the submit button
      this._submitButton.disabled = false;

      console.log(JSON.parse(localStorage.getItem('appointments')));
    } catch (error) {
      notyf.error(error.message);
      this._submitButton.disabled = false; // Re-enable on error
    }
  }

  // Handle validation failures
  _handleFailure() {
    // Show validation errors (handled by JustValidate automatically)
    const firstInvalidField = document.querySelector('.is-invalid');
    if (firstInvalidField) firstInvalidField.focus();

    // Re-enable the submit button
    this._submitButton.disabled = false;
  }

  // Get form data from the input fields
  _getFormData() {
    return {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      streetAddress: document.getElementById('streetAddress').value,
      zipCode: document.getElementById('zipCode').value,
      secondLineAddress: document.getElementById('secondLineAddress').value,
      aptDate: document.getElementById('aptDate').value,
      aptTimeslot: document.getElementById('aptTimeslot').value,
    };
  }

  // Add event listeners
  addHandlerSubmitForm() {
    this._form.addEventListener('submit', this._handleFormSubmit);
  }
}

export default new NewAptView();

// * POTENTIAL UPGRADE:
//! Address Validation on Submit
// Enhance JustValidate validation for #streetAddress to ensure only selected addresses are valid:

//
//
// .addField('#streetAddress', [
//   { rule: 'required', errorMessage: 'Street Address is required' },
//   {
//     validator: () => addressInput.dataset.selected === 'true',
//     errorMessage: 'Please select a valid address from the suggestions',
//   },
// ]);

// // Update dataset when an address is selected
// suggestionItem.addEventListener('click', () => {
//   addressInput.dataset.selected = 'true';
// });
