let Util = {};

Util.ajax = function(url, successCallback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  
  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        successCallback(this.responseText);
      }
    }
  };

  request.send();
  request = null;
};

module.exports = Util;