'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobookinga';
  var TIMEOUT = 10000;

  var Code = {
    SUCCESS: 200
  };

  function createRequest(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  }

  function load(onSuccess, onError) {

    var xhr = createRequest(onSuccess, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  function upload(data, onSuccess, onError) {

    var xhr = createRequest(onSuccess, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  window.network = {
    load: load,
    upload: upload
  };

})();
