(function() {

  "use strict";

  // --- variables and methods ---

  var defaultLanguage = "en";

  var getBrowserLocale = function() {
    if (navigator != null) {
      return navigator.language || navigator.userLanguage;
    }
    return defaultLanguage;
  };

  var isGerman = function(locale) {
    if (locale != null) {
      return locale.slice(0,2) === "de";
    }
    return false;
  };

  var showGerman = function() {
    document.getElementById("text-en").style.display = "none";
    document.getElementById("text-de").style.display = "block";
  };

  var showEnglish = function() {
    document.getElementById("text-en").style.display = "block";
    document.getElementById("text-de").style.display = "none";
  };

  var chooseLanguage = function(locale) {
    if (isGerman(locale)) {
      showGerman();
    } else {
      showEnglish();
    }
  };

  // --- main ---

  chooseLanguage(defaultLanguage);

  if (navigator.globalization !== undefined) {
    // phonegap
    navigator.globalization.getLocaleName(
      function (locale) {
        if (locale !== undefined) {
          chooseLanguage(locale.value);
        }
      },
      function () {
        // nothing to do
      }
    );
  } else {
    // browser
    chooseLanguage(getBrowserLocale());
  }

})();
