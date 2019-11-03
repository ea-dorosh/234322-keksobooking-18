'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function showError(message) {
    var error = errorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    errorMessage.textContent = message;
    window.data.map.append(error);

    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscEvent(evt)) {
        closeError(error);
      }
    });

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
    modal.remove();
  }

  window.modal = {
    error: showError
  };

})();
