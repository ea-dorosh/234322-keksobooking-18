'use strict';

(function () {

  var PinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var mapPinsBlock = document.querySelector('.map__pins');
  var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
          window.card.hide(advertCard);
        }
        window.card.show(element);
      });
      fragment.appendChild(pinElement);
    });
    mapPinsBlock.appendChild(fragment);
  }

  window.pins = {
    render: renderPins
  };

})();


