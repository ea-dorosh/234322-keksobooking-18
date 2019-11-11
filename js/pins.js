'use strict';

(function () {

  var MAX_PINS = 5;

  var PinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var mapPinsBlock = document.querySelector('.map__pins');
  var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPins(array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (element, index) {
      if (index < MAX_PINS) {
        var pinElement = advertPinTemplate.cloneNode(true);
        var pinElementImg = pinElement.querySelector('img');
        pinElementImg.src = element.author.avatar;
        pinElementImg.alt = element.offer.title;
        pinElement.style.left = (element.location.x - (PinParams.WIDTH / 2)) + 'px';
        pinElement.style.top = (element.location.y - PinParams.HEIGHT) + 'px';
        pinElement.addEventListener('click', function () {
          window.card.hide();
          window.card.show(element);
        });
        fragment.appendChild(pinElement);
      }
    });
    mapPinsBlock.appendChild(fragment);
  }

  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  window.pins = {
    render: renderPins,
    remove: removePins
  };

})();


