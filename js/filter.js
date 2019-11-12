'use strict';

(function () {
  var advertFilter = document.querySelector('.map__filters');
  var adverts = [];
  var filterAdverts;

  var filtersState = {
    'housing-type': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'housing-price': 'any',
    'features': []
  };

  function initFilters(data) {
    adverts = data;
    window.pins.render(adverts);
    advertFilter.addEventListener('change', onFilterChange);
  }


  function filterByType() {
    if (filtersState['housing-type'] === 'any') {
      return filterAdverts;
    }
    return filterAdverts.filter(function (advert) {
      return advert.offer.type === filtersState['housing-type'];
    });
  }

  function filterByRoomQuantity() {
    if (filtersState['housing-rooms'] === 'any') {
      return filterAdverts;
    }
    return filterAdverts.filter(function (advert) {
      return advert.offer.rooms === parseInt(filtersState['housing-rooms'], 10);
    });
  }

  function filterByGuests() {
    if (filtersState['housing-guests'] === 'any') {
      return filterAdverts;
    }
    return filterAdverts.filter(function (advert) {
      return advert.offer.guests === parseInt(filtersState['housing-guests'], 10);
    });
  }

  function filterByPrice() {
    if (filtersState['housing-price'] === 'any') {
      return filterAdverts;
    }
    return filterAdverts.filter(function (advert) {
      switch (filtersState['housing-price']) {
        case 'middle':
          return advert.offer.price > 10000 && advert.offer.price < 50000;
        case 'low':
          return advert.offer.price < 10000;
        case 'high':
          return advert.offer.price > 50000;
      }
      return advert.offer.price === filtersState['housing-price'];
    });
  }


  function onFilterChange(evt) {
    filterAdverts = adverts;
    window.pins.remove();

    filtersState[evt.target.id] = evt.target.value;
    filterAdverts = filterByRoomQuantity();
    filterAdverts = filterByType();
    filterAdverts = filterByPrice();
    filterAdverts = filterByGuests();
    window.pins.render(filterAdverts);

  }

  window.filter = {
    init: initFilters
  };

})();

