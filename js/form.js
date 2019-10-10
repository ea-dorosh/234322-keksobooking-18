'use strict';

(function () {

  var MainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');

  var fieldAddress = document.querySelector('#address');
  var fieldset = document.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var select = filterForm.querySelectorAll('select');

  fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) - MainPinParams.WIDTH / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) - MainPinParams.START_HEIGHT / 2);

  function calculatePinCoords() {
    fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) - MainPinParams.WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) - MainPinParams.HEIGHT);
  }

  mapPinMain.addEventListener('mousedown', activatePage);
  mapPinMain.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      activatePage();
    }
  });

  function activatePage() {
    mapBlock.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    calculatePinCoords();
    enableForm();
    window.pins.render(window.data.adverts);
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
})();
