const createLLIterator = function() {

  // Initial values; state of the iterator
  var L = 0; // Time (seconds)
  var A = 120; // Altitude (miles)
  var V = 1; // Velocity (miles/second)
  var M = 32500; // Total weight (LBS)

  // Constants
  const N = 16500; // Capsule weight (LBS)
  const G = 0.001; // Gravity (miles/second**2)
  const Z = 1.8;

  // helper vars
  var S; // Time (seconds)
  var T; // Time (seconds)
  var I; // new altitude (miles)
  var J; // new velocity (miles/second)
  var K; // Fuel Rate (LBS/SEC)
  var fuelOutAt;
  var doIteration = false;
  var done = false;

  /**
   * 
   * @param {Number} myK Fuel Rate (LBS/SEC)
   */
  const next = function(myK) {

    K = myK;
    T = 10;

    while (doIteration && !done) {

      // Fuel out / on moon
      if (M - N - 0.001 < 0) {
        var fuelOutAt = L;
        calcFreeFall();
        done = true;
        break;
      }

      // Iteration ready
      if (T - 0.001 < 0) {
        break;
      }

      S = T;

      // too little fuel
      if (M - N - S * K < 0) {
        S = (M - N) / K;
      }

      // 3.50
      calcNewAltitudeAndVelocity();

      // New hight less than zero -> on the moon
      if (I <= 0) {
        calcOnTheMoon();
        done = true;
        break;
      }

      // 
      if (V > 0 && J < 0) {
        var result = calcDeepestPoint();
        if (result === "onTheMoon") {
          done = true;
          break;
        }
      } else {
        transferNewValues();
      }

    }

    doIteration = true;

    return {
      value: {
        time: L,
        altitude: A,
        velocity: V,
        fuel: M - N,
        fuelOutAt: fuelOutAt
      },
      done: done
    };

  };

  // -- private methods --

  /**
   * Line 04.40.
   */
  const calcFreeFall = function() {
    S = (Math.sqrt(V * V + 2 * A * G) - V) / G;
    V = V + G * S;
    L = L + S;
  };

  /**
   * Block 06.
   */
  const transferNewValues = function() {
    L = L + S;
    T = T - S;
    M = M - S * K;
    A = I;
    V = J;
  };

  /**
   * Block 07.
   */
  const calcOnTheMoon = function() {
    while (S >= 0.005) {
      S = 2 * A / (V + Math.sqrt(V * V + 2 * A * (G - Z * K / M)));
      calcNewAltitudeAndVelocity();
      transferNewValues();
    }
  };

  /**
   * Block 08.
   */
  const calcDeepestPoint = function() {
    while (true) {
      var W = (1 - M * G / (Z * K)) / 2;
      S = M * V / (Z * K * (W + Math.sqrt(W * W + V / Z))) + 0.05;
      calcNewAltitudeAndVelocity();
      if (I <= 0) {
        calcOnTheMoon();
        return "onTheMoon";
      }
      transferNewValues();
      // Always true. A joke? 
      if (J >= 0 || V <= 0) {
        return "continue";
      }
    }
  };

  /**
   * Block 09.
   */
  const calcNewAltitudeAndVelocity = function() {
    var Q = S * K / M;
    // new velocity
    J = V + G * S + Z * (-Q - Q ** 2 / 2 - Q ** 3 / 3 - Q ** 4 / 4 - Q ** 5 / 5);
    // new altitude
    I = A - G * S * S / 2 - V * S + Z * S * (Q / 2 + Q ** 2 / 6 + Q ** 3 / 12 + Q ** 4 / 20 + Q ** 5 / 30);
  };

  return {
    next: next
  }

};

if (!exports) {
  exports = {};
}

exports.createLLIterator = createLLIterator;
