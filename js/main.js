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
  ]
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

for (var i = 0; i < ADVERTS_QUANTITY; i++) {

  var addresses = {
    x: getRandomInt(0, map.offsetWidth),
    y: getRandomInt(130, 630)
  };

  var obj = {
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
      price: Math.round(getRandomInt(1000, 3000) / 10) * 10,
      type: getRandomElement(advertParams.TYPES),
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 6),
      checkin: '1' + getRandomInt(2, 4) + ':00',
      checkout: '1' + getRandomInt(2, 4) + ':00',
      features: getRandomElements(advertParams.FEATURES),
      description: getRandomElement(advertParams.DESCRIPTIONS),
      photos: getRandomElements(advertParams.PHOTOS)
    }
  };

  adverts.push(obj);
}

console.log(adverts)

console.log(obj.author.avatar);
console.log(obj.offer.title);
console.log(obj.offer.address);
console.log(obj.offer.price);
console.log(obj.offer.type);
console.log(obj.offer.rooms);
console.log(obj.offer.guests);
console.log(obj.offer.checkin);
console.log(obj.offer.checkout);
console.log(obj.offer.features);
console.log(obj.offer.description);
console.log(obj.offer.photos);
console.log(obj.location);
