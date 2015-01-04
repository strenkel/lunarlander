(function () {

  "use strict";
  
  var startButtonTemplate = document.getElementById("start-template");
  var labelNode = document.getElementById("label");
  var contentNode = document.getElementById("content");
  var fuelInputNodeTemplate = document.getElementById("fuel-input-template");
  var fuelInputNode;
  var landerMath;
  
  var showStartPage = function() {
    showLabel("Lunar Lander");
    showStartButton();
  };
  
  var showHeight = function() {
    hideLabel();
    showValue(landerMath.getHeight(), "m");
  };
  
  var showSpeed = function() {
    hideLabel();
    showValue(landerMath.getSpeed(), "m/s");
  };
  
  var showFuel = function() {
    hideLabel();
    showValue(landerMath.getFuel(), "l");
  };
  
  var showFuelInput = function() {
    clearContentNode();
    createFuelInput();
    contentNode.appendChild(fuelInputNode);
    var unity = document.createTextNode(" l");
    contentNode.appendChild(unity);
    fuelInputNode.focus();
  };
  
  var showLabel = function(label) {
    labelNode.style.display = "block";
    labelNode.innerHTML = label;
  };
  
  var hideLabel = function() {
    labelNode.style.display = "none";
  };
  
  var showValue = function(value, unity) {
    var rounded = Math.round(value);
    contentNode.innerHTML = rounded.toLocaleString() + " " + unity;
  };
  
  var showStartButton = function() {
    clearContentNode();
    contentNode.appendChild(createStartButton());
  };
  
  var clearContentNode = function() {
    contentNode.innerHTML = "";
  };
  
  var createStartButton = function() {
    var startButton = startButtonTemplate.cloneNode();
    startButton.id = "start";
    startButton.onclick = startGame;
    return startButton;
  };
  
  var createFuelInput = function() {
    fuelInputNode = fuelInputNodeTemplate.cloneNode();
    fuelInputNode.id = "fuel-input";
  };
  
  var startGame = function() {
    landerMath = new LanderCalc();
    land();
  };
  
  var getFuelInput = function() {
    return parseFloat(fuelInputNode.value);
  };
 
  var brake = function() {
    landerMath.next(getFuelInput());
    land();
  };

  var land = function() {
    showHeight();
    var promise0 = waitAndDo(showSpeed);
    var promise1 = waitAndDo(showFuel, promise0);
    var promise2 = waitAndDo(showFuelInput, promise1);
    var promise3 = waitAndDo(brake, promise2, 3000);
  };
  
  var waitAndDo = function(callback, promise, time) {
    time = time || 1000;
    if (promise == null) {
      promise = new Promise(function(resolve) {
        resolve();
      });
    }
    var newPromise = new Promise(function(resolve) {
      promise.then(function() {
        setTimeout(function() {
          callback();
          resolve();
        }, time);
      });
    });
    return newPromise;
  };
  
  showStartPage();
  
})();
