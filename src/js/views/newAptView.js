import JustValidate from 'just-validate';
import { addAppointmentToLocalStorage, isAddressValid } from '../helpers';

class newAptView {
  _form = document.querySelector('.newAppointmentForm');
  _formOverlay = document.querySelector('.form-overlay');
  _toggleFormButton = document.querySelector('.cta-button');
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
    }

    if (!this._formOverlay.classList.contains('hidden')) {
      this._formOverlay.classList.remove('visible');
      this._formOverlay.classList.add('hidden');
    }

    // Reset button text
    this._toggleFormButton.textContent = 'Get Your Free Solar Evaluation!';
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
    console.log('running _preventCloseOnInsideClick');
    e.stopPropagation();
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
          validator: value => {
            const aptDate = new Date(value);
            const today = new Date();
            // Set time to midnight for both dates to ignore time zone differences
            aptDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return aptDate >= today;
          },
        },
      ])
      .addField('#aptTimeslot', [
        { rule: 'required', errorMessage: '2h timeslot must be selected' },
      ]);
  }

  // * Handle successful form submission
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
      // real validation - needs to happens against the json data
      // const isValidAddress = isAddressValid(city, zipCode, cityData);
      const isValidAddress = true;

      if (!isValidAddress) {
        alert('The entered address is not serviceable.');
        return;
      }
      console.log('address passed thru... storing.. ');
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
      console.error(error);
    }
  }

  // * Handle form validation failure
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
}

// * create the class instance and export it
export default new newAptView();
