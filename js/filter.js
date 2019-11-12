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

  function filterByFeatures() {
    if (!filtersState['features'].length) {
      return filterAdverts;
    }
    return filterAdverts.filter(function (advert) {

      // идем по массиву filtersState['features']
      for (var i = 0; i < filtersState['features'].length; i++) {
        // если advert.offer.features содержит значение из filtersState['features']
        // ничего не делаем, если не содержит возвращаем false и убираем из фильтра
        if (advert.offer.features.indexOf(filtersState['features'][i]) === -1) {
          return false;
        }
      }
      return true;
    });
  }


  function onFilterChange(evt) {
    filterAdverts = adverts;
    window.pins.remove();

    filtersState[evt.target.id] = evt.target.value;

    if (evt.target.checked) {
      filtersState['features'].push(evt.target.value);
    } else {
      var i = filtersState['features'].indexOf(evt.target.value);
      if (i !== -1) {
        filtersState['features'].splice(i, 1);
      }
    }

    filterAdverts = filterByRoomQuantity();
    filterAdverts = filterByType();
    filterAdverts = filterByPrice();
    filterAdverts = filterByGuests();
    filterAdverts = filterByFeatures();
    window.pins.render(filterAdverts);

  }

  window.filter = {
    init: initFilters
  };

})();

