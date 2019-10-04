'use strict';

(function () {
  var ADVERTS_QUANTITY = 8;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var mapFilter = document.querySelector('.map__filters-container');
  var adverts = [];

  var advertParams = {
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    DESCRIPTIONS: [
      'Отличное месторасположение',
      'Панорамный вид',
      'Теплый пол',
      'Красивые обои',
      'Есть мини бар',
      'Есть большой бар и мини бар',
      'Королевский размер кровати и подушки',
      'Иделально для отдыха с животными и без'
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    TIMES: ['12:00', '13:00', '14:00']
  };

  function generateAdverts(amount) {
    for (var i = 0; i < amount; i++) {

      var address = {
        x: getRandomInt(0, map.offsetWidth),
        y: getRandomInt(130, 630)
      };

      var advert = {
        author: {
          avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
        },

        location: address,

        offer: {
          title: 'Отель № ' + (i + 1),
          address: address.x + ', ' + address.y,
          price: roundToTen(1000, 3000),
          type: getRandomElement(advertParams.TYPES),
          rooms: getRandomInt(1, 4),
          guests: getRandomInt(1, 6),
          checkin: getRandomElement(advertParams.TIMES),
          checkout: getRandomElement(advertParams.TIMES),
          features: getRandomElements(advertParams.FEATURES),
          description: getRandomElement(advertParams.DESCRIPTIONS),
          photos: getRandomElements(advertParams.PHOTOS)
        }
      };

      adverts.push(advert);
    }
  }

  generateAdverts(ADVERTS_QUANTITY);
})();
