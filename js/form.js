'use strict';

(function () {
  var PinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var MainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = mapBlock.querySelector('.map__pins');
  var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var advertForm = document.querySelector('.ad-form');

  var fieldAddress = document.querySelector('#address');
  var fieldset = document.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var select = filterForm.querySelectorAll('select');

  fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) - MainPinParams.WIDTH / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) - MainPinParams.START_HEIGHT / 2);

  function calculatePinCoords() {
    fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) - MainPinParams.WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) - MainPinParams.HEIGHT);
  }

  function renderPins(array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (element) {
      var pinElement = advertPinTemplate.cloneNode(true);
      var pinElementImg = pinElement.querySelector('img');
      pinElementImg.src = element.author.avatar;
      pinElementImg.alt = element.offer.title;
      pinElement.style.left = (element.location.x - (PinParams.WIDTH / 2)) + 'px';
      pinElement.style.top = (element.location.y - PinParams.HEIGHT) + 'px';
      pinElement.addEventListener('click', function () {
        var advertCard = document.querySelector('.map__card');
        if (advertCard) {
          window.advert.closePopup(advertCard);
        }
        window.advert.createAdvertCard(element);
      });
      fragment.appendChild(pinElement);
    });
    mapPinsBlock.appendChild(fragment);
  }

  mapPinMain.addEventListener('mousedown', activatePage);
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KeyCodes.ENTER) {
      activatePage();
    }
  });

  function activatePage() {
    mapBlock.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    calculatePinCoords();
    enableForm();
    renderPins(window.data.adverts);
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
