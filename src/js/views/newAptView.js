import JustValidate from 'just-validate';
import {
  addAppointmentToLocalStorage,
  isAddressValid,
  notyf,
} from '../helpers';
import { dbName, storeName } from '../config';
import { searchAddress } from '../model';

class newAptView {
  _form = document.querySelector('.newAppointmentForm');
  _formOverlay = document.querySelector('.form-overlay');
  _toggleFormButton = document.querySelector('.cta-btn');
  _modalBackdrop = document.querySelector('.modal-backdrop');
  _errorMessages = document.querySelectorAll('.error-message');

  constructor() {
    // Bind and store methods for consistent references
    this._detectOutsideClickOrESCKeypress =
      this._detectOutsideClickOrESCKeypress.bind(this);
    this._preventCloseOnInsideClick =
      this._preventCloseOnInsideClick.bind(this);
    this._handleToggleForm = this._handleToggleForm.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  // * Handle form opening/closing

  _handleToggleForm(e) {
    // Prevent event bubbling only on form content click
    e.stopPropagation();

    // Check if the form is hidden or visible
    const isFormHidden = this._form.classList.contains('hidden');
    const isOverlayHidden = this._formOverlay.classList.contains('hidden');

    // If the form is hidden, show it along with the overlay
    if (isFormHidden) {
      this._form.classList.remove('hidden');
      this._form.classList.add('visible');
      this._formOverlay.classList.remove('hidden');
      this._formOverlay.classList.add('visible');
    }

    // If the form is visible, hide it and the overlay
    if (!isFormHidden) {
      this._form.classList.remove('visible');
      this._form.classList.add('hidden');
      this._formOverlay.classList.remove('visible');
      this._formOverlay.classList.add('hidden');
    }

    // Update button text based on the form's current visibility
    this._toggleFormButton.textContent = isFormHidden
      ? 'Close Form'
      : 'Get Your Free Solar Evaluation!';
  }

  // * Handle form submit

  _handleFormSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior.

    this._validateForm()
      .onSuccess(() => {
        console.log('running success');

        // Retrieve form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const streetAddress = document.getElementById('streetAddress').value;
        const zipCode = document.getElementById('zipCode').value;
        const secondLineAddress =
          document.getElementById('secondLineAddress').value;
        const aptDate = document.getElementById('aptDate').value;
        const aptTimeslot = document.getElementById('aptTimeslot').value;

        // Call success handler
        this._handleSuccess(
          fullName,
          email,
          streetAddress,
          zipCode,
          secondLineAddress,
          aptDate,
          aptTimeslot
        );
      })
      .onFail(fields => {
        console.log('running fail');
        this._handleFailure(fields);
      });
  }

  // * Detect outside clicks or ESC keypress to close the modal
  _detectOutsideClickOrESCKeypress(e) {
    const isOutsideClick = e.type === 'click' && e.target === this._formOverlay;
    const isESCKeyPress = e.type === 'keydown' && e.key === 'Escape';

    if (isOutsideClick || isESCKeyPress) {
      this._closeModal();
    }
  }

  // * Close the modal by hiding form and overlay
  _closeModal() {
    if (!this._form.classList.contains('hidden')) {
      this._form.classList.remove('visible');
      this._form.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }

    if (!this._formOverlay.classList.contains('hidden')) {
      this._formOverlay.classList.remove('visible');
      this._formOverlay.classList.add('hidden');
    }

    // Reset button text
    this._toggleFormButton.textContent = 'Get Your Free Solar Evaluation!';
  }

  // * Cleanup event listeners to avoid memory leaks
  _cleanupListeners() {
    this._formOverlay.removeEventListener(
      'click',
      this._detectOutsideClickOrESCKeypress
    );
    document.removeEventListener(
      'keydown',
      this._detectOutsideClickOrESCKeypress
    );
  }

  // * Prevent clicks inside the form from toggling it
  _preventCloseOnInsideClick(e) {
    e.stopPropagation();
  }

  // * Add event listeners for outside click or ESC keypress
  addHandlerCloseOnOutsideClickOrESCKeypress() {
    // ? Close on outside click
    this._formOverlay.addEventListener(
      'click',
      this._detectOutsideClickOrESCKeypress
    );

    // ? Close on ESC key press
    document.addEventListener('keydown', this._detectOutsideClickOrESCKeypress);
  }

  addHandlerPreventCloseOnForm() {
    this._form.addEventListener('click', this._preventCloseOnInsideClick);
  }

  addHandlerToggleForm() {
    this._toggleFormButton.addEventListener(
      'click',
      this._handleToggleForm.bind(this)
    );
  }

  addHandlerSubmitForm() {
    this._form.addEventListener('submit', this._handleFormSubmit.bind(this));
  }
  // * Initialize form validation
  _validateForm() {
    const validator = new JustValidate(this._form, {
      errorFieldCssClass: 'is-invalid',
      focusInvalidField: true,
      errorLabelCssClass: 'error-message',

      errorFieldStyle: {
        border: '1px solid red',
      },
      // errorLabelCssClass: 'is-label-invalid',
      errorLabelStyle: {
        color: 'red',
        textDecoration: 'underline',
      },
      focusInvalidField: true,
      lockForm: true,
      tooltip: {
        position: 'top', // Keep the tooltip position
        // Remove the style property from JustValidate and handle the styling with CSS
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
          validator: value => {
            const aptDate = new Date(value);
            const today = new Date();
            aptDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return aptDate >= today;
          },
          errorMessage: 'Please choose a future date',
        },
      ])
      .addField('#aptTimeslot', [
        { rule: 'required', errorMessage: '2h timeslot must be selected' },
      ]);
    console.log(validator);
    return validator;
  }

  // * Handle successful form submission
  async _handleSuccess(
    fullName,
    email,
    streetAddress,
    zipCode,
    secondLineAddress,
    aptDate,
    aptTimeslot
  ) {
    try {
      console.log('handleSuccess running');
      // Parse the streetAddress into streetNumber and streetName
      const [streetNumber, ...streetNameParts] = streetAddress.split(' ');
      const streetName = streetNameParts.join(' ').trim();
      console.log(streetAddress, streetNameParts, zipCode);
      // Validate the address in IndexedDB

      const isValidAddress = await searchAddress(zipCode, streetAddress);
      console.log(isValidAddress);

      if (isValidAddress.length === 0) {
        return new Error(
          "🛑 Your address wasn't found in our records.. please try again with a correct address (select from the dropdown list if possible)"
        );
      }

      const newAppointment = {
        fullName,
        email,
        streetAddress,
        secondLineAddress,
        zipCode,
        aptDate,
        aptTimeslot,
      };

      // Save appointment to localStorage
      addAppointmentToLocalStorage(newAppointment);

      // Show success message and confirmation
      notyf.open({
        type: 'confirmation',
        message:
          'Hooray! Your appointment has been scheduled for (INSERT DATE AND TIME AND FORMAT THEM) !',
      });

      // Close the form
      this._closeModal();

      // Log the appointments
      console.log(JSON.parse(localStorage.getItem('appointments')));
    } catch (error) {
      notyf.error(error.message);
    }
  }
  z;
  // * Handle form validation failure

  _handleFailure(fields) {
    // Clear all existing error messages in the DOM
    this._errorMessages.forEach(el => (el.textContent = ''));

    // Collect and display errors
    if (fields && typeof fields === 'object') {
      for (const [fieldName, errorData] of Object.entries(fields)) {
        if (errorData.isValid === false) {
          // Find the error message container for the specific field
          const errorElement = document.querySelector(
            `.error-message[data-for="${fieldName}"]`
          );

          if (errorElement) {
            // Display the first error message for the field
            errorElement.textContent =
              errorData.errors[0].message || 'Invalid field';
            // Ensure the error message is visible by adding the 'is-invalid' class to the input
            document.querySelector(`#${fieldName}`).classList.add('is-invalid');
          }
        }
      }
    } else {
      console.error('Unexpected format of fields:', fields);
    }

    // Optionally: Focus on the first invalid field
    const firstInvalidField = document.querySelector('.is-invalid');
    if (firstInvalidField) firstInvalidField.focus();
  }
}

// * create the class instance and export it
export default new newAptView();
