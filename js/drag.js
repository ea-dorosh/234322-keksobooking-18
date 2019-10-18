'use strict';

(function () {

  var map = document.querySelector('.map__overlay');

  var MapCoords = {
    MIN_LEFT: 0 - window.form.mainPinParams.WIDTH / 2,
    MAX_LEFT: map.offsetWidth - window.form.mainPinParams.WIDTH / 2,
    MIN_TOP: 130 - window.form.mainPinParams.HEIGHT,
    MAX_TOP: 630 - window.form.mainPinParams.HEIGHT
  };

  function drag(evt, element) {
    evt.preventDefault();

    // начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // координаты смещения (начальные - новые)
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // начальные координаты становятся новыми координатами
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var dragElementTop = element.offsetTop - shift.y;
      var dragElementLeft = element.offsetLeft - shift.x;

      if (dragElementTop >= MapCoords.MIN_TOP && dragElementTop <= MapCoords.MAX_TOP) {
        element.style.top = dragElementTop + 'px';
      }

      if (dragElementLeft >= MapCoords.MIN_LEFT && dragElementLeft <= MapCoords.MAX_LEFT) {
        element.style.left = dragElementLeft + 'px';
      }

      // в стилях элемента меняются действующие координаты
      // из текущих вычитается смещение
      // element.style.top = (element.offsetTop - shift.y) + 'px';
      // element.style.left = (element.offsetLeft - shift.x) + 'px';

      window.form.calculatePinCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.drag = {
    drag: drag
  };

})();

