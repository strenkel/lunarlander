(function() {

  "use strict";

  var planets = [{
    id: "moon",
    g: 1.62,
    fuel: 3000,
    label: "Moon (g=1.62)"
  }, {
    id: "mars",
    g: 3.69,
    fuel: 5000,
    label: "Mars (g=3.69)"
  }, {
    id: "venus",
    g: 8.87,
    fuel: 15000,
    label: "Venus (g=8.87)"
  }, {
    id: "kepler10b",
    g: 15,
    fuel: 50000,
    label: "Kepler-10b (g=15)"
  }, {
    id: "kepler30c",
    g: 30,
    fuel: 100000,
    label: "Kepler-30c (g=30)"
  }];

  var fillPlanetSelection = function() {
    planets.forEach(function(planet) {
      addPlanetOption(planet);
    });
  };

  var addPlanetOption = function(planet) {
    planetSelection.appendChild(createPlanetOption(planet));
  };

  var createPlanetOption = function(planet) {
    var option = createOption(planet);
    if (isSelectedPlanet(planet)) {
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

  var onPlanetChange = function() {
    var planet = getSelectedPlanet();
    localStorage.setItem("g", planet.g);
    localStorage.setItem("fuel", planet.fuel);
    localStorage.setItem("planetId", planet.id);
  }

  var getSelectedPlanet = function() {
    return getSelectedModel(planetSelection);
  };

  var getSelectedModel = function(selection) {
    return selection.options[selection.selectedIndex].model;
  };

  // --- execution block ---

  var planetSelection = document.getElementById("planet-selection");
  planetSelection.onchange = onPlanetChange;
  fillPlanetSelection();

})();
