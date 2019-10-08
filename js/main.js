'use strict';

var ADVERTS_QUANTITY = 8;
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var advertForm = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters-container');
var adverts = [];

var KeyCodes = {
  ENTER: 13,
  ESC: 27
};

var PinParams = {
  WIDTH: 50,
  HEIGHT: 70
};

var MainPinParams = {
  WIDTH: 65,
  HEIGHT: 81,
  START_HEIGHT: 65
};

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

var AccommodationType = {
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  FLAT: 'Квартира'
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


function renderPins(array) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (element, index) {
    var pinElement = advertPinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = element.author.avatar;
    pinElementImg.alt = element.offer.title;
    pinElement.style.left = (element.location.x - (PinParams.WIDTH / 2)) + 'px';
    pinElement.style.top = (element.location.y - PinParams.HEIGHT) + 'px';
    pinElement.addEventListener('click', function () {
      var advertCard = document.querySelector('.map__card');
      if (advertCard) {
        closePopup(advertCard);
      }
      createAdvertCard(array[index]);
    });
    fragment.appendChild(pinElement);
  });
  mapPinsBlock.appendChild(fragment);
}

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

function getFeaturesFragment(features, block) {
  var fragment = document.createDocumentFragment();

  features.offer.features.forEach(function (value) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + value);
    fragment.appendChild(li);
  });

  block.appendChild(fragment);
}

function getPhotosFragment(photos, block) {
  var fragment = document.createDocumentFragment();

  photos.offer.photos.forEach(function (value) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.setAttribute('width', '45');
    img.setAttribute('height', '40');
    img.setAttribute('alt', 'Фотография жилья');
    img.src = value;
    fragment.appendChild(img);
  });
  block.appendChild(fragment);
}

function createAdvertCard(advert) {

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
  var cardCloseButton = cardAdvert.querySelector('.popup__close');
  onEscPress(cardAdvert);
  cardCloseButton.addEventListener('click', function () {
    closePopup(cardAdvert);
  });

  advertTitle.textContent = advert.offer.title;
  advertAddress.textContent = advert.offer.address;
  advertPrice.textContent = advert.offer.price + '₽/ночь';
  advertType.textContent = AccommodationType[advert.offer.type.toUpperCase()];
  advertGuestSize.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  advertTime.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  advertDescription.textContent = advert.offer.description;
  advertAvatar.src = advert.author.avatar;
  getFeaturesFragment(advert, advertFeatures);
  getPhotosFragment(advert, advertPhotos);

  map.insertBefore(cardAdvert, mapFilter);
}

var fieldAddress = document.querySelector('#address');
var fieldRoom = document.querySelector('#room_number');
var fieldGuest = document.querySelector('#capacity');
var fieldType = document.querySelector('#type');
var fieldPrice = document.querySelector('#price');
var fieldCheckIn = document.querySelector('#timein');
var fieldCheckOut = document.querySelector('#timeout');
var onFormSubmitButton = document.querySelector('.ad-form__submit');

mapPinMain.addEventListener('mousedown', activatePage);
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    activatePage();
  }
});

fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) - MainPinParams.WIDTH / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) - MainPinParams.START_HEIGHT / 2);

var fieldset = document.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var select = filterForm.querySelectorAll('select');

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

function calculatePinCoords() {
  fieldAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) - MainPinParams.WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) - MainPinParams.HEIGHT);
}

function activatePage() {
  mapBlock.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  calculatePinCoords();
  enableForm();
  renderPins(adverts);
  // showAdvertCard();
}


function closePopup(element) {
  element.remove();
}

function onEscPress(el) {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCodes.ESC) {
      closePopup(el);
    }
  });
}

onFormSubmitButton.addEventListener('click', function () {
  checkFormValidity();
});

var AdvertMinPrices = {
  BUNGALO: 1,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

function changeMinPrice() {
  if (fieldType.value === 'flat') {
    fieldPrice.placeholder = AdvertMinPrices.FLAT;
  } else if (fieldType.value === 'house') {
    fieldPrice.placeholder = AdvertMinPrices.HOUSE;
  } else if (fieldType.value === 'palace') {
    fieldPrice.placeholder = AdvertMinPrices.PALACE;
  } else if (fieldType.value === 'bungalo') {
    fieldPrice.placeholder = AdvertMinPrices.BUNGALO;
  }
}

fieldType.addEventListener('change', changeMinPrice);
fieldCheckIn.addEventListener('change', correctCheckOut);

function correctCheckOut() {
  fieldCheckOut.value = fieldCheckIn.value;
}

function checkFormValidity() {
  var errorText = '';
  if (fieldRoom.value > 3 && fieldGuest.value > 0) {
    errorText = 'Гостей размещать нельзя';
  } else if (fieldGuest.value > fieldRoom.value) {
    errorText = 'Гостей не должно быть больше чем комнат';
  } else {
    errorText = '';
  }
  fieldRoom.setCustomValidity(errorText);

  if (fieldType.value === 'flat' && fieldPrice.value < AdvertMinPrices.FLAT) {
    errorText = 'Минимальная цена за ночь в квартире 1 000руб.';
  } else if (fieldType.value === 'house' && fieldPrice.value < AdvertMinPrices.HOUSE) {
    errorText = 'Минимальная цена за ночь в доме 5 000руб.';
  } else if (fieldType.value === 'palace' && fieldPrice.value < AdvertMinPrices.PALACE) {
    errorText = 'Минимальная цена за ночь в дворце 10 000руб.';
  } else {
    errorText = '';
  }
  fieldType.setCustomValidity(errorText);

  if (fieldCheckIn.value !== fieldCheckOut.value) {
    fieldType = 'Время выезда должно совпадать с временем заезда';
  } else {
    fieldType = '';
  }
  fieldType.setCustomValidity(errorText);
}
