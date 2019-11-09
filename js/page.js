'use strict';

(function () {

  var isActive = false;

  function activatePage() {
    if (!isActive) {
      isActive = true;
      window.map.activate();
      window.form.init();
    }
  }

  function deactivatePage() {
    isActive = false;
    window.form.reset();
    window.map.deactivate();
  }

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };

})();
