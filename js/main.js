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

var mapBlock = document.querySelector('.map');
var mapPinsBlock = mapBlock.querySelector('.map__pins');
var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

mapBlock.classList.remove('map--faded');

function renderAdverts(array) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (element) {
    var pinElement = advertPinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = element.author.avatar;
    pinElementImg.alt = element.offer.title;

    fragment.appendChild(pinElement);
    pinElement.style.left = (element.location.x - (pinElement.offsetHeight / 2)) + 'px';
    pinElement.style.top = (element.location.y - pinElement.offsetHeight) + 'px';
  });
  mapPinsBlock.appendChild(fragment);
}

renderAdverts(adverts);


var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

function createAdvertCard(element) {

  var cardAdvert = cardTemplate.cloneNode(true);

  var advertTitle = cardAdvert.querySelector('.popup__title');
  var advertAddress = cardAdvert.querySelector('.popup__text--address');
  var advertPrice = cardAdvert.querySelector('.popup__text--price');
  var advertType = cardAdvert.querySelector('.popup__type');
  var advertGuestSize = cardAdvert.querySelector('.popup__text--capacity');
  var advertTime = cardAdvert.querySelector('.popup__text--time');
  var advertFeatures = cardAdvert.querySelector('.popup__features');
  var advertDescription = cardAdvert.querySelector('.popup__description');
  var advertPhotos = cardAdvert.querySelector('.popup__photos');
  var advertAvatar = cardAdvert.querySelector('.popup__avatar');

  advertTitle.textContent = element.offer.title;
  advertAddress.textContent = element.offer.address;
  advertPrice.textContent = element.offer.price + '₽/ночь';

  if (element.offer.type === 'palace') {
    advertType.textContent = 'Дворец';
  } else if (element.offer.type === 'flat') {
    advertType.textContent = 'Квартира';
  } else if (element.offer.type === 'house') {
    advertType.textContent = 'Дом';
  } else if (element.offer.type === 'bungalo') {
    advertType.textContent = 'Бунгало';
  }

  advertGuestSize.textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  advertTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  advertDescription.textContent = element.offer.description;


  element.offer.features.forEach(function (value) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + value);
    advertFeatures.appendChild(li);
  });


  element.offer.photos.forEach(function (value) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.setAttribute('width', '45');
    img.setAttribute('height', '40');
    img.setAttribute('alt', 'Фотография жилья');
    img.src = value;
    advertPhotos.appendChild(img);
  });

  advertAvatar.src = element.author.avatar;

  map.appendChild(cardAdvert);
}

createAdvertCard(adverts[0]);
