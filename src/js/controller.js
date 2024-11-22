import newAptView from './views/newAptView';

const init = function () {
  newAptView.addHandlerSubmitForm();
  newAptView.addHandlerToggleForm();
  newAptView.addHandlerPreventCloseOnForm();
};

init();
