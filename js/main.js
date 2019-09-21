'use strict';

var OBJECT_QUANTITY = 8;
var map = document.querySelector('.map');
var objectArray = [];

var titles = [
  'Отель №1',
  'Отель №2',
  'Отель №3',
  'Отель №4',
  'Отель №5',
  'Отель №6',
  'Отель №7',
  'Отель №8'
];

var addresses = [
  '500, 350',
  '400, 350',
  '600, 350',
  '300, 350',
  '200, 350',
  '100, 350',
  '600, 450',
  '600, 250'
];

var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var descriptions = [
  'Отличное месторасположение',
  'Панорамный вид',
  'Теплый пол',
  'Красивые обои',
  'Есть мини бар',
  'Есть большой бар и мини бар',
  'Королевский размер кровати и подушки',
  'Иделально для отдыха с животными и без'
];

var photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function createNewArray(arr) {
  var newArr = [];
  var arrLength = getRandomInt(1, arr.length);
  for (var i = 0; i < arrLength; i++) {
    var number = getRandomInt(0, arr.length - 1);
    newArr.push(arr[number]);
    arr.splice(number, 1);
  }
  return newArr;
}

for (var i = 0; i < OBJECT_QUANTITY; i++) {

  var obj = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
    },

    offer: {
      title: titles[getRandomInt(0, titles.length - 1)],
      address: addresses[getRandomInt(0, addresses.length - 1)],
      price: Math.round(getRandomInt(1000, 3000) / 10) * 10,
      type: types[getRandomInt(0, types.length - 1)],
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 6),
      checkin: '1' + getRandomInt(2, 4) + ':00',
      checkout: '1' + getRandomInt(2, 4) + ':00',
      features: createNewArray(features),
      description: descriptions[getRandomInt(0, descriptions.length - 1)],
      photos: createNewArray(photos)
    },

    location: {
      x: getRandomInt(0, map.offsetWidth),
      y: getRandomInt(130, 630)
    }
  };

  objectArray.push(obj)
}

console.log(objectArray)

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
