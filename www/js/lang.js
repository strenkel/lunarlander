(function() {

  "use strict";

  // --- variables and methods ---

  var defaultLanguage = "en";
  var actualLanguage = defaultLanguage;
  var textEn = document.getElementById("text-en");
  var textDe = document.getElementById("text-de");
  var langEn = document.getElementById("lang-en");
  var langDe = document.getElementById("lang-de");

  var getBrowserLocale = function() {
    if (navigator != null) {
      return navigator.language || navigator.userLanguage;
    }
    return defaultLanguage;
  };

  var isDe = function(locale) {
    if (locale != null) {
      return locale.slice(0,2) === "de";
    }
    return false;
  };

  var showDe = function() {
    textEn.style.display = "none";
    textDe.style.display = "block";
    actualLanguage = "de";
  };

  var showEn = function() {
    textEn.style.display = "block";
    textDe.style.display = "none";
    actualLanguage = "en";
  };

  var chooseLanguage = function(locale) {
    if (isDe(locale)) {
      showDe();
    } else {
      showEn();
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

  langDe.onclick = showDe;
  langEn.onclick = showEn;

})();
