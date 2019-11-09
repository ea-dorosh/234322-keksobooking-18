'use strict';

(function () {
  var AccommodationType = {
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
    FLAT: 'Квартира'
  };

  var mapFilter = document.querySelector('.map__filters-container');
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

    window.map.map.insertBefore(cardAdvert, mapFilter);
  }

  function closePopup(element) {
    element.remove();
  }

  function onEscPress(el) {
    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscEvent(evt)) {
        closePopup(el);
      }
    });
  }

  function hidePopup() {
    var advertCard = document.querySelector('.map__card');
    if (advertCard) {
      closePopup(advertCard);
    }
  }

  window.card = {
    hide: hidePopup,
    show: createAdvertCard
  };

})();

