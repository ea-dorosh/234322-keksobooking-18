'use strict';

(function () {

  var KeyCodes = {
    ENTER: 13,
    ESC: 27
  }

  function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getRandomElement(arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  }

  function getRandomElements(arr) {
    arr = arr.slice();
    var elements = [];
    var amount = getRandomNumber(1, arr.length);

    for (var i = 0; i < amount; i++) {
      var number = getRandomNumber(0, arr.length - 1);
      elements.push(arr[number]);
      arr.splice(number, 1);
    }
    return elements;
  }

  function roundToTenths(min, max) {
    return Math.round(window.util.getRandomInt(min, max) / 10) * 10;
  }

  // eslint-disable-next-line consistent-return
  function isEscEvent(evt) {
    return evt.keyCode === KeyCodes.ESC;
  }

  // eslint-disable-next-line consistent-return
  function isEnterEvent(evt) {
    return evt.keyCode === KeyCodes.ENTER;
  }

  window.util = {
    getRandomInt: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    roundToTenths: roundToTenths,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };

})();
