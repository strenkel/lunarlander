var LanderMath = (function() {

  "use strict";

  // gravitation moon (m/s**2)
  var gMoon = 1.62;
  var iterations = 1000;
  
  var LanderMath = function() {
  
    // const
    var g = localStorage.getItem("g") || gMoon; // gravitation (m/s**2)
    var m = 5000; // mass (kg; without fuel)
    var ve = 3000; // exit velocity (m/s)
    var t = 10; // burning period (s)
    
    // var
    var h = 30000; // height (m)
    var v = 1000; // velocity (m/s)
    var fuel = localStorage.getItem("fuel") || 3000; // kg
    
    // Calculate v by Tsiolkovsky rocket equation and gravitation.
    // To calculate h we need to integrate the rocket/gravitation equation.
    // We do this by approximation/iteration.
    this.next = function(fuelUsed) {
    
      fuelUsed = fuelUsed || 0;
      fuelUsed = Math.max(fuelUsed, 0);
      fuelUsed = Math.min(fuelUsed, fuel);
    
      var tDelta = t / iterations;
      var fuelDelta = fuelUsed / iterations;
      
      for (var i=0; i < iterations; i++) {
        if (h <= 0) {
          break;
        }
        var mTotal = m + fuel;
        var vNext = v - ve * Math.log(mTotal / (mTotal - fuelDelta)) + g * tDelta;
        var vMean = (v + vNext) / 2;
        h = h - vMean * tDelta;
        v = vNext;
        fuel = fuel - fuelDelta;
      };
    };
    
    this.getHeight = function() {
      return h;
    };

    this.getSpeed = function() {
      return v;
    };

    this.getFuel = function() {
      return fuel;
    };
    
    this.isLanded = function() {
      return h <=0;
    };
  }

  return LanderMath;

})();
