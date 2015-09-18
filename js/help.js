(function() {

  "use strict";
  
  var isGerman = function() {
    if (navigator != null) {
      return "de" === (navigator.language || navigator.userLanguage);
    }
    return false;
  };
  
  var hideGerman = function() {
    document.getElementById("text-de").style.display = "none";
  };
  
  var hideEnglish = function() {
    document.getElementById("text-en").style.display = "none";
  };
  
  if (isGerman()) {
    hideEnglish();
  } else {
    hideGerman();
  }
  
})();
