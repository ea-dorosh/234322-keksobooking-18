'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';

  var MainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');

  var fieldAddress = document.querySelector('#address');
  var fieldset = document.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var select = filterForm.querySelectorAll('select');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onError = function (message) {
    var error = errorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    errorMessage.textContent = message;
    window.data.map.append(error);
  };

  var onSuccess = function (data) {
    window.pins.render(data);
  };

  fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) + MainPinParams.WIDTH / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MainPinParams.START_HEIGHT / 2);

  function calculatePinCoords() {
    fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) + MainPinParams.WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MainPinParams.HEIGHT);
  }

  mapPinMain.addEventListener('mousedown', function (evt) {

    if (window.data.map.classList.contains('map--faded')) {
      activatePage();
    } else {
      window.drag.drag(evt, mapPinMain);
    }

  });
  mapPinMain.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      activatePage();
    }
  });

  function activatePage() {
    window.data.map.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    calculatePinCoords();
    enableForm();
    window.load.download(URL, onSuccess, onError);
  }

  function disableForm() {
    fieldset.forEach(function (value) {
      value.disabled = true;
    });

    select.forEach(function (value) {
      value.disabled = true;
    });
  }

  function enableForm() {
    fieldset.forEach(function (value) {
      value.disabled = false;
    });

    select.forEach(function (value) {
      value.disabled = false;
    });
  }

  disableForm();

  window.form = {
    mainPinParams: MainPinParams,
    calculatePinCoords: calculatePinCoords
  };

})();
