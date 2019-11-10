'use strict';

(function () {
  var advertType = document.querySelector('#housing-type');
  var adverts = [];

  function addFilter() {
    window.pins.remove();
    window.pins.render(filterQuantity(window.filter.adverts));

    advertType.addEventListener('change', filterType);
  }

  function filterQuantity(array) {
    // eslint-disable-next-line consistent-return
    var shortAdverts = array.filter(function (advert, index) {
      if (index < 5) {
        return advert;
      }
    });
    return shortAdverts;
  }

  function filterType() {
    var typeAdverts = window.filter.adverts;
    if (advertType.value === 'house') {
      typeAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'house';
      });
    } else if (advertType.value === 'bungalo') {
      typeAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'bungalo';
      });
    } else if (advertType.value === 'flat') {
      typeAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'flat';
      });
    } else if (advertType.value === 'palace') {
      typeAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'palace';
      });
    }
    window.pins.remove();
    window.pins.render(filterQuantity(typeAdverts));
  }

  window.filter = {
    adverts: adverts,
    addFilter: addFilter
  };

})();

