export default class ModalView {
  _modal;
  _modalOverlay;
  _modalToggleButton;

  constructor(modalSelector, overlaySelector, toggleButtonSelector) {
    this._modal = document.querySelector(modalSelector);
    this._modalOverlay = document.querySelector(overlaySelector);
    this._modalToggleButton = document.querySelector(toggleButtonSelector);
    document.body.classList.add('modal-open');

    // Bind methods
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.detectOutsideClickOrESCKeypress =
      this.detectOutsideClickOrESCKeypress.bind(this);
    this.preventCloseOnInsideClick = this.preventCloseOnInsideClick.bind(this);
  }

  // Handle toggling modal visibility
  handleToggleModal(e) {
    e?.stopPropagation();
    // Use toggleVisibility to show/hide modal and overlay
    this.toggleVisibility(this._modal, this._modalOverlay);
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

    if (isOutsideClick || isESCKeyPress) {
      // Simply use toggleVisibility to close the modal
      this.toggleVisibility(this._modal, this._modalOverlay);
    }
  }

  // Prevent clicks inside the modal from toggling or closing it
  preventCloseOnInsideClick(e) {
    e.stopPropagation();
  }

  addHandlerToggleModal() {
    if (this._modalToggleButton) {
      this._modalToggleButton.addEventListener('click', this.handleToggleModal);
    }
  }

  addHandlerCloseOnOutsideClickOrESCKeypress() {
    this._modalOverlay.addEventListener(
      'click',
      this.detectOutsideClickOrESCKeypress
    );
    document.addEventListener('keydown', this.detectOutsideClickOrESCKeypress);
  }

  addHandlerPreventCloseOnModal() {
    this._modal.addEventListener('click', this.preventCloseOnInsideClick);
  }

  cleanupHandlers() {
    this._modalOverlay.removeEventListener(
      'click',
      this.detectOutsideClickOrESCKeypress
    );

    document.removeEventListener(
      'keydown',
      this.detectOutsideClickOrESCKeypress
    );
    this._modal.removeEventListener('click', this.preventCloseOnInsideClick);
  }
}
