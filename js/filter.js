'use strict';

(function () {
  var advertType = document.querySelector('#housing-type');
  var adverts = [];

  function initFilters(data) {
    adverts = data;
    window.pins.render(adverts);

    advertType.addEventListener('change', onTypeFilterSelectClick);
  }


  function filterByType(evt) {
    if (evt.target.value === 'any') {
      return adverts;
    }
    return adverts.filter(function (advert) {
      return advert.offer.type === evt.target.value;
    });
  }

  function onTypeFilterSelectClick(evt) {
    window.pins.remove();
    window.pins.render(filterByType(evt));
  }

  window.filter = {
    init: initFilters
  };

})();

