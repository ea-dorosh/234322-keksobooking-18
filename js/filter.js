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


  function onFilterChange(evt) {
    filterAdverts = adverts;
    window.pins.remove();

    Object.keys(filtersState).forEach(function (value) {
      filtersState[value] = evt.target.value;
    });

    //filtersState[evt.target.id] = evt.target.value;
    filterAdverts = filterByType();

    //filtersState[evt.target.id] = evt.target.value;
    filterAdverts = filterByRoomQuantity();

    window.pins.render(filterAdverts);

  }

  window.filter = {
    init: initFilters
  };

})();

