(function () {

  "use strict";
  
  var planets = [{
    id: "moon",
    g: 1.62,
    fuel: 3000,
    label: "Moon (g=1.62)"
  },{
    id: "mars",
    g: 3.69,
    fuel: 5000,
    label: "Mars (g=3.69)"
  },{
    id: "venus",
    g: 8.87,
    fuel: 15000,
    label: "Venus (g=8.87)"
  },{
    id: "kepler10b",
    g: 15,
    fuel: 50000,
    label: "Kepler-10b (g=15)"
  },{
    id: "kepler30c",
    g: 30,
    fuel: 100000,
    label: "Kepler-30c (g=30)"
  }];
  
  var cycles = [{
    id: "c4",
    time: 4,
    label: "Cycle = 4 sec"
  },{
    id: "c6",
    time: 6,
    label: "Cycle = 6 sec"
  },{
    id: "c8",
    time: 8,
    label: "Cycle = 8 sec"
  },{
    id: "c10",
    time: 10,
    label: "Cycle = 10 sec",
    isDefault: true
  }];

  var fillPlanetSelection = function() {
    planets.forEach(function(planet) {
      addPlanetOption(planet);
    });
  };

  var fillCycleSelection = function() {
    cycles.forEach(function(cycle) {
      addCycleOption(cycle);
    });
  };

  var addPlanetOption = function(planet) {
    planetSelection.appendChild(createPlanetOption(planet));
  };

  var addCycleOption = function(planet) {
    cycleSelection.appendChild(createCyleOption(planet));
  };

  var createPlanetOption = function(planet) {
    var option = createOption(planet);
    if (isSelectedPlanet(planet)) {
      option.selected = true;
    }
    return option;
  };

  var createCyleOption = function(cycle) {
    var option = createOption(cycle);
    if (isSelectedCyle(cycle) || isDefaultCycle(cycle)) {
      option.selected = true;
    }
    return option;
  };

  var createOption = function(model) {
    var option = document.createElement("option");
    option.text = model.label;
    option.model = model;
    return option;
  };

  var isSelectedPlanet = function(model) {
    return model.id === localStorage.getItem("planetId");
  };

  var isSelectedCyle = function(model) {
    return model.id === localStorage.getItem("cycleId");
  };

  var isDefaultCycle = function(model) {
    return localStorage.getItem("cycleId") == null && "isDefault" in model;
  };

  var onPlanetChange = function() {
    var planet = getSelectedPlanet();
    localStorage.setItem("g", planet.g);
    localStorage.setItem("fuel", planet.fuel);
    localStorage.setItem("planetId", planet.id);
  }

  var onCycleChange = function() {
    var cycle = getSelectedCycle();
    localStorage.setItem("cycle", cycle.time);
    localStorage.setItem("cycleId", cycle.id);
  }
  
  var getSelectedPlanet = function() {
    return getSelectedModel(planetSelection);
  };

  var getSelectedCycle = function() {
    return getSelectedModel(cycleSelection);
  };

  var getSelectedModel = function(selection) {
    return selection.options[selection.selectedIndex].model;
  };

  // --- execution block ---

  var planetSelection = document.getElementById("planet-selection");
  var cycleSelection = document.getElementById("cycle-selection");
  planetSelection.onchange = onPlanetChange;
  cycleSelection.onchange = onCycleChange;
  fillPlanetSelection();
  fillCycleSelection();

})();
