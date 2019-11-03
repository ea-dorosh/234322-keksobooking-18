'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function showError(message) {
    var error = errorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    errorMessage.textContent = message;
    window.data.map.append(error);

    document.addEventListener('keydown', onEscPress);

    errorButton.addEventListener('click', function () {
      closeError(error);
    });

    error.addEventListener('click', function (evt) {
      if (evt.target !== errorMessage) {
        closeError(error);
      }
    });
  }

  function closeError(modal) {
    document.removeEventListener('keydown', onEscPress);
    modal.remove();
  }

  function onEscPress(evt) {
    var error = document.querySelector('.error');
    if (window.util.isEscEvent(evt)) {
      closeError(error);
    }
  }

  window.modal = {
    showError: showError
  };

})();
