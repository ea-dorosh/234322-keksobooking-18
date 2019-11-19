'use strict';

(function () {
  var advertFilter = document.querySelector('.map__filters');
  var adverts = [];
  var filteredAdverts;

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


  function filterBySelect(value) {
    if (filtersState[value] === 'any') {
      return filteredAdverts;
    }
    // eslint-disable-next-line consistent-return
    return filteredAdverts.filter(function (advert) {
      if (value === 'housing-type') {
        return advert.offer.type === filtersState[value];
      } else if (value === 'housing-rooms') {
        return String(advert.offer.rooms) === filtersState[value];
      } else if (value === 'housing-guests') {
        return String(advert.offer.guests) === filtersState[value];
      }
    });
  }

  function filterByPrice() {
    if (filtersState['housing-price'] === 'any') {
      return filteredAdverts;
    }
    return filteredAdverts.filter(function (advert) {
      switch (filtersState['housing-price']) {
        case 'middle':
          return advert.offer.price > 10000 && advert.offer.price < 50000;
        case 'low':
          return advert.offer.price < 10000;
        case 'high':
          return advert.offer.price > 50000;
      }
    });
  }

  function filterByFeatures() {
    if (!filtersState['features'].length) {
      return filteredAdverts;
    }
    return filteredAdverts.filter(function (advert) {

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
    filteredAdverts = adverts;
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

    filteredAdverts = filterBySelect('housing-type');
    filteredAdverts = filterBySelect('housing-rooms');
    filteredAdverts = filterBySelect('housing-guests');
    filteredAdverts = filterByPrice();
    filteredAdverts = filterByFeatures();
    window.pins.render(filteredAdverts);
  }

  window.filter = {
    init: initFilters
  };

})();

