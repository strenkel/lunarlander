// Simple Promise polyfill. Sufficient for our purposes. 
if (typeof Promise == "undefined") {

  Promise = function(executor) {
    
    "use strict";
    
    var isResolved = false;
    var callback;
    
    var resolve = function() {
      if (callback) {
        callback();
      } else {
        isResolved = true;
      }
    };
    
    executor(resolve);
    
    this.then = function(myCallback) {
      if (isResolved) {
        myCallback();
      } else {
        callback = myCallback;
      }
    };
    
  };
}
