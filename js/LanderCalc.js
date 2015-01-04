var LanderCalc = (function() {

  "use strict";

  // gravitation moon (m/s**2)
  var gMoon = 1.622;
  var iterations = 1000;
  
  var LanderCalc = function(p) {
  
    p = p || {};
  
    // const
    var g = p.g || gMoon; // gravitation (m/s**2)
    var m = p.m || 1000; // mass (kg; without fuel)
    var ve = p.ve || 3000; // exit velocity (m/s)
    var t = p.t || 1; // burning period (s)
    
    // var
    var h = p.h || 25000; // height (m)
    var v = p.v || 1000; // velocity (m/s)
    var fuel = p.fuel || 1000; // l
    
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
        var mTotal = m + fuel;
        var vNext = v - 3000 * Math.log(mTotal / (mTotal - fuelDelta)) + g * tDelta;
        var vMean = (v + vNext) / 2;
        h = h - vMean * tDelta;
        v = vNext;
        fuel = fuel - fuelDelta;
        if (h <= 0) {
          return true;
        }
      };
      return false;
    };
    
    this.getData = function() {
      return {
        h: h,
        v: v,
        fuel: fuel
      } 
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
  }

  return LanderCalc;

})();
