'use strict';

(function () {
  var AdvertMinPrices = {
    BUNGALO: 1,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var fieldRoom = document.querySelector('#room_number');
  var fieldGuest = document.querySelector('#capacity');
  var fieldType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');
  var fieldCheckIn = document.querySelector('#timein');
  var fieldCheckOut = document.querySelector('#timeout');
  var onFormSubmitButton = document.querySelector('.ad-form__submit');

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
      errorText = 'Минимальная цена за ночь в квартире ' + AdvertMinPrices.FLAT + ' руб.';
    } else if (fieldType.value === 'house' && fieldPrice.value < AdvertMinPrices.HOUSE) {
      errorText = 'Минимальная цена за ночь в доме ' + AdvertMinPrices.HOUSE + ' руб.';
    } else if (fieldType.value === 'palace' && fieldPrice.value < AdvertMinPrices.PALACE) {
      errorText = 'Минимальная цена за ночь в дворце ' + AdvertMinPrices.PALACE + 'руб.';
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

  onFormSubmitButton.addEventListener('click', function () {
    checkFormValidity();
  });

  function correctCheckOut() {
    fieldCheckOut.value = fieldCheckIn.value;
  }
  correctCheckOut();
  changeMinPrice();

  fieldType.addEventListener('change', changeMinPrice);
  fieldCheckIn.addEventListener('change', correctCheckOut);

})();

