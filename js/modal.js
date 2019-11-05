'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function showError(message) {
    var error = errorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    errorMessage.textContent = message;
    window.data.map.append(error);

    document.addEventListener('keydown', onEscPress);

    errorButton.addEventListener('click', function () {
      closeModal(error);
    });

    error.addEventListener('click', function (evt) {
      if (evt.target !== errorMessage) {
        closeModal(error);
      }
    });
  }

  function showSuccess() {
    var success = successTemplate.cloneNode(true);
    var successMessage = document.querySelector('.success__message');
    window.data.map.append(success);

    document.addEventListener('keydown', onEscPress);

    success.addEventListener('click', function (evt) {
      if (evt.target !== successMessage) {
        closeModal(success);
      }
    });
  }

  function closeModal(modal) {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    document.removeEventListener('keydown', onEscPress);
    modal.remove();
    window.form.resetForm();
    window.form.resetAddress();

    window.form.mapPinMain.style.left = window.form.mapPinMain.defaultLeft;
    window.form.mapPinMain.style.top = window.form.mapPinMain.defaultTop;

    var advertCard = document.querySelector('.map__card');
    if (advertCard) {
      window.card.hide(advertCard);
    }

    window.data.map.classList.add('map--faded');

    mapPin.forEach(function (pin) {
      pin.remove();
    });
  }

  function onEscPress(evt) {
    var modal = document.querySelector('.modal');

    if (window.util.isEscEvent(evt)) {
      closeModal(modal);
    }
  }

  window.modal = {
    showError: showError,
    showSuccess: showSuccess
  };

})();
