export default class ModalView {
  _modal;
  _modalOverlay;
  _modalToggleButton;
  _modalBackdrop;

  constructor(modalSelector, overlaySelector, toggleButtonSelector) {
    this._modal = document.querySelector(modalSelector);
    this._modalOverlay = document.querySelector(overlaySelector);
    this._modalToggleButton = document.querySelector(toggleButtonSelector);

    // Bind methods
    this._detectOutsideClickOrESCKeypress =
      this._detectOutsideClickOrESCKeypress.bind(this);
    this._preventCloseOnInsideClick =
      this._preventCloseOnInsideClick.bind(this);
    this._handleToggleModal = this._handleToggleModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  // Handle toggling modal visibility
  _handleToggleModal(e) {
    e?.stopPropagation();

    // Toggle modal and overlay visibility
    this._toggleVisibility(this._modal, this._modalOverlay);

    // Optionally, update button text
    if (this._modalToggleButton) {
      const isModalVisible = this._modal.classList.contains('visible');
      this._modalToggleButton.textContent = isModalVisible
        ? 'Close'
        : 'Open Modal';
    }
  }

  // Toggle visibility utility
  _toggleVisibility(...elements) {
    elements.forEach(el => {
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
        el.classList.add('hidden');
      }
    });
  }

  // Handle closing modal on outside click or ESC key press
  _detectOutsideClickOrESCKeypress(e) {
    const isOutsideClick =
      e.type === 'click' && e.target === this._modalOverlay;
    const isESCKeyPress = e.type === 'keydown' && e.key === 'Escape';

    if (isOutsideClick || isESCKeyPress) {
      this._closeModal();
    }
  }

  _closeModal() {
    this._modal.classList.remove('visible');
    this._modal.classList.add('hidden');
    this._modalOverlay.classList.remove('visible');
    this._modalOverlay.classList.add('hidden');

    // Optional: reset button text
    if (this._modalToggleButton) {
      this._modalToggleButton.textContent = 'Open Modal';
    }
  }

  // Prevent clicks inside the modal from toggling or closing it
  _preventCloseOnInsideClick(e) {
    e.stopPropagation();
  }

  addHandlerToggleModal() {
    if (this._modalToggleButton) {
      this._modalToggleButton.addEventListener(
        'click',
        this._handleToggleModal
      );
    }
  }

  addHandlerCloseOnOutsideClickOrESCKeypress() {
    this._modalOverlay.addEventListener(
      'click',
      this._detectOutsideClickOrESCKeypress
    );
    document.addEventListener('keydown', this._detectOutsideClickOrESCKeypress);
  }

  addHandlerPreventCloseOnModal() {
    this._modal.addEventListener('click', this._preventCloseOnInsideClick);
  }

  cleanupHandlers() {
    this._modalOverlay.removeEventListener(
      'click',
      this._detectOutsideClickOrESCKeypress
    );
    document.removeEventListener(
      'keydown',
      this._detectOutsideClickOrESCKeypress
    );
    this._modal.removeEventListener('click', this._preventCloseOnInsideClick);
  }
}
