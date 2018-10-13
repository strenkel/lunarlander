(function() {

  "use strict";

  var startButtonTemplate = document.getElementById("start-template");
  var labelNode = document.getElementById("text");
  var contentNode = document.getElementById("control");
  var keyboardNode = document.getElementById("keyboard");
  var fuelInputNodeTemplate = document.getElementById("fuel-input-template");

  var fuelInputNode;
  var landerMath;

  var isTouch = 'ontouchstart' in window;

  var cycle = 10;
  var delay = (cycle / 4) * 1000;

  var initKeyboard = function() {
    for (var i = 0; i < 10; i++) {
      document.getElementById("nr" + i).ontouchstart = (function(nr) {
        return function() {
          fuelInputNode.value = fuelInputNode.value + nr;
        }
      })(i);
    }
  }

  var showStartPage = function() {
    showStartButton();
  };

  var showHeight = function() {
    hideLabel();
    showValue(landerMath.getHeight(), "m");
  };

  var showSpeed = function() {
    showValue(landerMath.getSpeed(), "m/s");
  };

  var showFuel = function() {
    showValue(landerMath.getFuel(), "kg");
  };

  var showFuelInput = function() {
    clearContentNode();
    createFuelInput();
    contentNode.appendChild(fuelInputNode);
    var unity = document.createTextNode(" kg");
    contentNode.appendChild(unity);
    fuelInputNode.focus();
  };

  var showResult = function() {
    hideLabel();
    var v = landerMath.getSpeed();
    var speedLabel;
    if (v <= 3) {
      speedLabel = "Landed";
    } else {
      speedLabel = "Crashed";
    }
    speedLabel = speedLabel + " with " + toLocaleString(v) + " m/s!";
    var fuelLabel = toLocaleString(landerMath.getFuel()) + " kg of fuel left.";
    showLabel(speedLabel + "<br>" + fuelLabel);
    showStartButton("Restart");
  };

  var showLabel = function(label) {
    labelNode.style.display = "block";
    labelNode.innerHTML = label;
  };

  var hideLabel = function() {
    labelNode.style.display = "none";
    keyboardNode.style.display = "none";
  };

  var showValue = function(value, unity) {
    contentNode.innerHTML = toLocaleString(value) + " " + unity;
  };

  var toLocaleString = function(value) {
    var roundedValue;
    if (value < 10 && value > -10) {
      roundedValue = Math.round(value * 10) / 10;
    } else {
      roundedValue = Math.round(value);
    }
    return roundedValue.toLocaleString();
  };

  var showStartButton = function(value) {
    clearContentNode();
    contentNode.appendChild(createStartButton(value));
  };

  var clearContentNode = function() {
    contentNode.innerHTML = "";
  };

  var createStartButton = function(value) {
    var startButton = startButtonTemplate.cloneNode();
    startButton.id = "start";
    startButton.onclick = startGame;
    if (value) {
      startButton.value = value;
    }
    return startButton;
  };

  var createFuelInput = function() {
    fuelInputNode = fuelInputNodeTemplate.cloneNode();
    fuelInputNode.id = "fuel-input";
    if (isTouch) {
      fuelInputNode.readOnly = true;
      keyboardNode.style.display = "block";
    }
  };

  var startGame = function() {
    landerMath = new LanderMath();
    land();
  };

  var getFuelInput = function() {
    // accept dot or comma as decimal separator
    return parseFloat(fuelInputNode.value.replace(",", "."));
  };

  var brake = function() {
    landerMath.next(getFuelInput());
    if (landerMath.isLanded()) {
      showResult();
    } else {
      land();
    }
  };

  var land = function() {
    showHeight();
    var promise0 = waitAndDo(showSpeed);
    var promise1 = waitAndDo(showFuel, promise0);
    var promise2 = waitAndDo(showFuelInput, promise1);
    waitAndDo(brake, promise2);
  };

  var waitAndDo = function(callback, promise) {
    if (promise == null) {
      promise = new Promise(function(resolve) {
        resolve();
      });
    }
    return new Promise(function(resolve) {
      promise.then(function() {
        setTimeout(function() {
          callback();
          resolve();
        }, delay);
      });
    });
  };

  if (isTouch) {
    initKeyboard();
  }

  showStartPage();

})();
