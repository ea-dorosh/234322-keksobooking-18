'use strict';

(function () {
  var advertType = document.querySelector('#housing-type');
  var adverts = [];

  function addFilter() {
    filterQuantity();
    advertType.addEventListener('change', filterType);
  }

  function filterQuantity() {
    // eslint-disable-next-line consistent-return
    var newAdverts = window.filter.adverts.filter(function (advert, index) {
      if (index < 5) {
        return advert;
      }
    });

    window.pins.remove();
    window.pins.render(newAdverts);
  }

  function filterType() {
    var newAdverts = window.filter.adverts;
    if (advertType.value === 'house') {
      newAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'house';
      });
    } else if (advertType.value === 'bungalo') {
      newAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'bungalo';
      });
    } else if (advertType.value === 'flat') {
      newAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'flat';
      });
    } else if (advertType.value === 'palace') {
      newAdverts = window.filter.adverts.filter(function (advert) {
        return advert.offer.type === 'palace';
      });
    }
    window.pins.remove();
    window.pins.render(newAdverts);
  }

  window.filter = {
    adverts: adverts,
    addFilter: addFilter
  };

})();

