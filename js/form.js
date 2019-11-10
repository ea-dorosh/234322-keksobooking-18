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
    window.filter.adverts = data;
    window.pins.render(window.filter.adverts);
    window.filter.addFilter();
  };

  mapPinMain.defaultLeft = mapPinMain.style.left;
  mapPinMain.defaultTop = mapPinMain.style.top;

  fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) + MainPinParams.WIDTH / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MainPinParams.START_HEIGHT / 2);

  fieldAddress.default = fieldAddress.value;

  function resetAddress() {
    fieldAddress.value = fieldAddress.default;
  }

  function calculatePinCoords() {
    fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) + MainPinParams.WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MainPinParams.HEIGHT);
  }

  mapPinMain.addEventListener('mousedown', function (evt) {

    if (window.map.map.classList.contains('map--faded')) {
      window.page.activate();
    } else {
      window.drag.drag(evt, mapPinMain);
    }

  });
  mapPinMain.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      window.page.activate();
    }
  });

  function initForm() {
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
    resetAddress();
    disableForm();
    advertForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = mapPinMain.defaultLeft;
    mapPinMain.style.top = mapPinMain.defaultTop;
  }

  disableForm();

  advertForm.addEventListener('submit', function (evt) {
    window.network.upload(new FormData(advertForm), function () {
      window.modal.showSuccess();
      window.page.deactivate();
    }, onError);
    evt.preventDefault();
  });

  window.form = {
    mainPinParams: MainPinParams,
    calculatePinCoords: calculatePinCoords,
    reset: resetForm,
    init: initForm
  };

})();
