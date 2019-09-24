'use strict';

var ADVERTS_QUANTITY = 8;
var map = document.querySelector('.map');
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


function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

function getRandomElements(arr) {
  arr = arr.slice();
  var elements = [];
  var amount = getRandomInt(1, arr.length);

  for (var i = 0; i < amount; i++) {
    var number = getRandomInt(0, arr.length - 1);
    elements.push(arr[number]);
    arr.splice(number, 1);
  }
  return elements;
}

function roundToTen(min, max) {
  return Math.round(getRandomInt(min, max) / 10) * 10;
}

function generateAdverts(amount) {
  for (var i = 0; i < amount; i++) {

    var addresses = {
      x: getRandomInt(0, map.offsetWidth),
      y: getRandomInt(130, 630)
    };

    var advert = {
      author: {
        avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
      },

      location: {
        x: getRandomInt(0, map.offsetWidth),
        y: getRandomInt(130, 630)
      },

      offer: {
        title: 'Отель № ' + (i + 1),
        address: addresses.x + ', ' + addresses.y,
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

var mapBlock = document.querySelector('.map');
var mapPinsBlock = mapBlock.querySelector('.map__pins');
var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

mapBlock.classList.remove('map--faded');

function renderAdverts(array) {

  array.forEach(function (element) {
    var pinElement = advertPinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = element.author.avatar;
    pinElementImg.alt = element.offer.title;
    fragment.appendChild(pinElement);
    pinElement.style = 'left: ' + (element.location.x - (pinElement.offsetHeight / 2)) + 'px; top: ' + (element.location.y - pinElement.offsetHeight) + 'px;';
  });
  mapPinsBlock.appendChild(fragment);
}

renderAdverts(adverts);


