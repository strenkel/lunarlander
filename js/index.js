(function () {

  "use strict";
  
  var hElm = document.getElementById("h");
  var vElm = document.getElementById("v");
  var fuelElm = document.getElementById("fuel");
  var fuelUsedElm = document.getElementById("fuelUsed");

  var printData = function() {
    var data = landerCalc.getData();
    hElm.innerHTML = data.h;
    vElm.innerHTML = data.v;
    fuelElm.innerHTML = data.fuel;
  };

  var landerCalc = new LanderCalc();
  printData();
  landerCalc.next();
  printData();
  landerCalc.next();
  printData();

landerCalc.next();
  printData();

landerCalc.next();
  printData();

landerCalc.next();
  printData();



})();
