(function() {

  "use strict";

  // --- variables and methods ---

  var defaultLanguage = "en";
  var actualLanguage = defaultLanguage;
  var textEn = document.getElementById("text-en");
  var textDe = document.getElementById("text-de");
  var languageSwitch = document.getElementById("language-switch");

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
    textEn.style.display = "none";
    textDe.style.display = "block";
    actualLanguage = "de";
  };

  var showEnglish = function() {
    textEn.style.display = "block";
    textDe.style.display = "none";
    actualLanguage = "en";
  };

  var switchLanguage = function() {
    if (actualLanguage === "en") {
      showGerman();
    } else {
      showEnglish();
    }
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

  languageSwitch.onclick = switchLanguage;

})();
