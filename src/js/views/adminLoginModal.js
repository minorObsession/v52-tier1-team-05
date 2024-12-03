import { notyf } from '../helpers';
import ModalView from './ModalView';
import JustValidate from 'just-validate';

class AdminLoginModal extends ModalView {
  _form = document.querySelector('.adminLoginModal'); // Form element for login
  _formOverlay = document.querySelector('.login-overlay'); // Modal overlay
  _submitButton = document.querySelector('.login-submit-btn'); // Submit button
  _toggleLoginButton = document.querySelector('.toggle-login-btn');
  _validator;

  constructor() {
    super(
      '.adminLoginModal',
      '.login-overlay',
      '.toggle-login-btn',
      'login-submit-btn'
    ); // Pass selectors to parent class

    // Initialize validation
    this._initValidation();
  }

  // Initialize validation rules
  _initValidation() {
    this._validator = new JustValidate(this._form, {
      errorLabelCssClass: 'error-message',
      tooltip: { position: 'top' },
      lockForm: true,
    });

    this._validator
      .addField('#username', [
        { rule: 'required', errorMessage: 'Username is required' },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Username must be at least 3 characters',
        },
      ])
      .addField('#password', [
        { rule: 'required', errorMessage: 'Password is required' },
        {
          rule: 'minLength',
          value: 6,
          errorMessage: 'Password must be at least 6 characters',
        },
      ]);
  }

  // // Handle form submission
  // async handleFormSubmit(e) {
  //   e.preventDefault();
  //   // Disable the submit button to prevent multiple submissions
  //   this._submitButton.disabled = true;

  //   try {
  //     const isValid = await this._validator.isValid;
  //     if (isValid) {
  //       this._handleSuccess();
  //     } else {
  //       this._handleFailure();
  //     }
  //   } catch (error) {
  //     console.error('Validation Error:', error);
  //   } finally {
  //     // Re-enable the submit button after handling
  //     this._submitButton.disabled = false;
  //   }
  // }

  // Handle successful form submission
  async _handleSuccess() {
    const formData = this._getFormData();

    try {
      // Mock login validation (replace with API call or backend logic)
      if (formData.username === 'admin' && formData.password === 'admin123') {
        notyf.success('Login successful!');
        this._form.reset(); // Reset the form
        this.handleToggleModal(); // Close the modal
      }
    } catch (error) {
      console.error('Login Error:', error);
      notyf.error('Invalid username or password. Please try again');
    } finally {
    }
  }

  // Handle validation failure
  _handleFailure() {
    // Focus on the first invalid field
    const firstInvalidField = document.querySelector('.is-invalid');
    if (firstInvalidField) firstInvalidField.focus();
  }

  // Get form data
  _getFormData() {
    return {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };
  }

  // // Add event listener for form submission
  // addHandlerSubmitForm() {
  //   this._form.addEventListener('submit', this.handleFormSubmit);
  // }
}

export default new AdminLoginModal();
