'use strict';

(function () {

  window.util = {
    getRandomInt: function getRandomInt(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getRandomElement: function getRandomElement(arr) {
      return arr[window.util.getRandomInt(0, arr.length - 1)];
    },

    getRandomElements: function getRandomElements(arr) {
      arr = arr.slice();
      var elements = [];
      var amount = window.util.getRandomInt(1, arr.length);

      for (var i = 0; i < amount; i++) {
        var number = window.util.getRandomInt(0, arr.length - 1);
        elements.push(arr[number]);
        arr.splice(number, 1);
      }
      return elements;
    },

    roundToTen: function roundToTen(min, max) {
      return Math.round(window.util.getRandomInt(min, max) / 10) * 10;
    }
  };

})();
