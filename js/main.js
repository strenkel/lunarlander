(function () {

  "use strict";
  
  var startNode = document.getElementById("start");
  
  var hElm = document.getElementById("h");
  var vElm = document.getElementById("v");
  var fuelElm = document.getElementById("fuel");
  var fuelUsedElm = document.getElementById("fuelUsed");
  
  var button = document.getElementById("button");

  var printData = function() {
    var data = landerCalc.getData();
    hElm.innerHTML = Math.round(data.h);
    vElm.innerHTML = Math.round(data.v);
    fuelElm.innerHTML = Math.round(data.fuel);
  };

  var readFuelUsed = function() {
    var fuel = parseFloat(fuelUsedElm.value);
    if (!isFinite(fuel)) {
      fuel = 0;
    }
    return fuel;
  };

  var landerCalc = new LanderCalc();
  printData();
  
  button.onclick = function() {
    var fuelUsed = readFuelUsed();
    var isLanded = landerCalc.next(fuelUsed);
    printData();
  };

  var showStart = function() {
    startNode.style.display = "block";
  };

  showStart();
  
})();
