const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Logger = {
  log: console.log,
  prompt: rl.question.bind(rl)
};

/**
 * @param {Number} x 
 * @param {Integer} d digits, d > 0 
 * @returns {String}
 */
const round = function(x, d) {

  var trunc = Math.trunc(x);
  var decimals = Math.abs(x - trunc);

  var dDecimalString = decimals
    .toString()
    .substr(2, d)
    .padEnd(d, "0");

  return trunc.toString() + "." + dDecimalString;
};

const logIntro = function() {
  Logger.log();
  Logger.log();
  Logger.log();
  Logger.log("CONTROL CALLING LUNAR LANDER MODULE. MANUAL CONTROL IS NECESSARY");
  Logger.log("YOU MAY RESET FUEL RATE K EACH 10 SECS TO 0 OR ANY VALUE");
  Logger.log("BETWEEN 8 & 200 LBS/SEC. YOU'VE 16000 LBS FUEL. ESTIMATED");
  Logger.log("FREE FALL IMPACT TIME-120 SECS. CAPSULE WEIGHT-32500 LBS");
};

const logHeader = function() {
  Logger.log("FIRST RADAR CHECK COMING UP");
  Logger.log();
  Logger.log();
  Logger.log();
  Logger.log("COMMENCE LANDING PROCEDURE");
  Logger.log("TIME,SECS   ALTITUDE,MILES+FEET   VELOCITY,MPH   FUEL,LBS   FUEL RATE");
};

const doLanding = function() {

  logHeader();
  const llIterator = createLLIterator();

  const nextStep = function(K) {

    var next = llIterator.next(K);

    if (next.done) {
      printResult(next.value);
    }

    var L = next.value.time;
    var A = next.value.altitude;
    var V = next.value.velocity;
    var MN = next.value.fuel;

    // 2.10 - 2.20
    var l = Math.round(L).toString().padStart(8, " ");
    var aMiles = Math.floor(A).toString().padStart(15, " ");
    var aFeet = Math.round((5280 * (A - Math.floor(A)))).toString().padStart(7, " ");
    var v = round(3600 * V, 2).padStart(15, " ");
    var fuel = round(MN, 1).padStart(12, " ");
    var output = `${l}${aMiles}${aFeet}${v}${fuel}      K=:`;

    Logger.prompt(output, function(input) {
      validateInput(input, nextStep);
    });
  };

  nextStep();
};

const validateInput = function(input, callback) {
  var  K = Number.parseInt(input);
  if (Number.isFinite(K) && (K === 0 || K >= 8 && K <= 200)) {
    callback(K);
  } else {
    Logger.prompt("NOT POSSIBLE" + ".".repeat(51) + "K=:", function(nextInput) {
      validateInput(nextInput, callback);
    });
  }
};

const printResult = function(value) {

  if (value.fuelOutAt) {
    var l = round(value.fuelOutAt, 2).padStart(8);
    Logger.log(`FUEL OUT AT ${l} SECS`);
  }

  var t = round(value.time, 2).padStart(8);
  Logger.log(`ON THE MOON AT ${t} SECS`);

  var W = 3600 * value.velocity;
  var w = round(W, 2).padStart(6);
  Logger.log(`IMPACT VELOCITY OF ${w} M.P.H.`);

  var mn = round(value.fuel, 2).padStart(6);
  Logger.log(`FUEL LEFT: ${mn} LBS`);

  if (W < 1) {
    Logger.log("PERFECT LANDING !-(LUCKY)");
  } else if (W < 10) {
    Logger.log("GOOD LANDING-(COULD BE BETTER)");
  } else if (W < 22) {
    Logger.log("CONGRATULATIONS ON A POOR LANDING");
  } else if (W < 40) {
    Logger.log("CRAFT DAMAGE. GOOD LUCK")
  } else if (W < 60) {
    Logger.log("CRASH LANDING-YOU'VE 5 HRS OXYGEN")
  } else {
    Logger.log("SORRY,BUT THERE WHERE NO SURVIVORS-YOU BLEW IT!");
    var deep = round(W * 0.277777, 2).padStart(9);
    Logger.log(`IN FACT YOU BLASTED A NEW LUNAR CRATER ${deep} FT. DEEP`);
  }
  Logger.log("");
  Logger.log("");
  Logger.log("");
  Logger.log("TRY AGAIN?");
  tryAgain();
};

const tryAgain = function() {
  Logger.prompt("(ANS. YES OR NO):", function(answer) {
    if (answer === "YES") {
      doLanding();
    } else if (answer === "NO") {
      Logger.log("CONTROL OUT");
      Logger.log("");
      Logger.log("");
      Logger.log("");
      rl.close();
    } else {
      tryAgain();
    }
  });
};

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

logIntro();
doLanding();