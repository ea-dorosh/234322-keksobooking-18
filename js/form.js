'use strict';

(function () {

  var MainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65,
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');

  var fieldAddress = document.querySelector('#address');
  var fieldset = document.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var select = filterForm.querySelectorAll('select');

  var onError = function (message) {
    window.modal.showError(message);
  };

  var onSuccess = function (data) {
    window.pins.render(data);
  };

  mapPinMain.defaultLeft = mapPinMain.style.left;
  mapPinMain.defaultTop = mapPinMain.style.top;

  fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) + MainPinParams.WIDTH / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MainPinParams.START_HEIGHT / 2);

  fieldAddress.default = Math.round(parseInt(mapPinMain.style.left, 10) + MainPinParams.WIDTH / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MainPinParams.START_HEIGHT / 2);

  function resetAddress() {
    fieldAddress.value = fieldAddress.default;
  }

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
    window.network.load(onSuccess, onError);
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

  function resetForm() {
    advertForm.reset();
  }

  disableForm();

  advertForm.addEventListener('submit', function (evt) {
    window.network.upload(new FormData(advertForm), function () {
      window.modal.showSuccess();
    }, onError);
    evt.preventDefault();
  });

  window.form = {
    mainPinParams: MainPinParams,
    mapPinMain: mapPinMain,
    calculatePinCoords: calculatePinCoords,
    resetForm: resetForm,
    resetAddress: resetAddress
  };

})();
