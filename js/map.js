'use strict';

(function () {

  var map = document.querySelector('.map');

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function deactivateMap() {
    map.classList.add('map--faded');
    window.pins.remove();
    window.card.hide();
  }

  window.map = {
    map: map,
    activate: activateMap,
    deactivate: deactivateMap
  };

})();
