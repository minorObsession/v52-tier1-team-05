export default class ModalView {
  _modal;
  _modalOverlay;
  _modalToggleButton;

  constructor(modalElement, overlayElement, toggleButtonEl) {
    this._modal = document.querySelector(modalElement);
    this._modalOverlay = document.querySelector(overlayElement);
    this._modalToggleButton = document.querySelector(toggleButtonEl);

    // ! Bind methods
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.detectOutsideClickOrESCKeypress =
      this.detectOutsideClickOrESCKeypress.bind(this);
    this.preventCloseOnInsideClick = this.preventCloseOnInsideClick.bind(this);

    this._addEventListeners();
  }

  // Add event listeners for toggle, close on outside click, and ESC keypress
  _addEventListeners() {
    this.addHandlerToggleModal();
    this.addHandlerCloseOnOutsideClickOrESCKeypress();
    this.addHandlerPreventCloseOnModal();
  }

  // Handle toggling modal visibility
  handleToggleModal(e) {
    const isVisible = !this._modal.classList.contains('hidden');

    // Call toggleVisibility only once with the correct state
    if (isVisible) {
      this.toggleVisibility(this._modal, this._modalOverlay); // Close modal
    } else {
      this.toggleVisibility(this._modal, this._modalOverlay); // Open modal
    }
  }

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

  // Toggle visibility and add class to body
  toggleVisibility(...elements) {
    elements.forEach(el => {
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        el.classList.add('visible');
        document.body.classList.add('modal-open');
      } else {
        el.classList.remove('visible');
        el.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    });
  }

  // Handle closing modal on outside click or ESC key press
  detectOutsideClickOrESCKeypress(e) {
    const isOutsideClick =
      e.type === 'click' && e.target === this._modalOverlay;
    const isESCKeyPress = e.type === 'keydown' && e.key === 'Escape';

    if (isESCKeyPress && !this._modal.classList.contains('hidden')) {
      this.toggleVisibility(this._modal, this._modalOverlay);
    } else if (isOutsideClick) {
      this.toggleVisibility(this._modal, this._modalOverlay);
    }
  }

  // Prevent clicks inside the modal from toggling or closing it
  preventCloseOnInsideClick(e) {
    e.stopPropagation();
  }

  // Add handler for opening/closing modal
  addHandlerToggleModal() {
    if (this._modalToggleButton) {
      this._modalToggleButton.addEventListener('click', this.handleToggleModal);
    }
  }

  // Add handler for closing modal on outside click or ESC key press
  addHandlerCloseOnOutsideClickOrESCKeypress() {
    if (this._modalOverlay) {
      this._modalOverlay.addEventListener(
        'click',
        this.detectOutsideClickOrESCKeypress
      );
    }
    document.addEventListener('keydown', this.detectOutsideClickOrESCKeypress);
  }

  // Prevent closing modal when clicking inside it
  addHandlerPreventCloseOnModal() {
    if (this._modal) {
      this._modal.addEventListener('click', this.preventCloseOnInsideClick);
    }
  }

  // Cleanup event listeners when modal is closed
  cleanupHandlers() {
    if (this._modalOverlay) {
      this._modalOverlay.removeEventListener(
        'click',
        this.detectOutsideClickOrESCKeypress
      );
    }
    document.removeEventListener(
      'keydown',
      this.detectOutsideClickOrESCKeypress
    );
    if (this._modal) {
      this._modal.removeEventListener('click', this.preventCloseOnInsideClick);
    }
  }
}
