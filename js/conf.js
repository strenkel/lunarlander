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
    fuel: 6000,
    label: "Mars (g=3.69)"
  },{
    id: "venus",
    g: 8.87,
    fuel: 18000,
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
  
   var fillSelect = function() {
    planets.forEach(function(planet) {
      addOption(planet);
    });
  };
  
  var addOption = function(planet) {
    select.appendChild(createOption(planet));
  };
  
  var createOption = function(planet) {
    var option = document.createElement("option");
    option.text = planet.label;
    option.planet = planet;
    if (planet.id === localStorage.getItem("planetId")) {
      option.selected = true;
    }
    return option;
  };
  
  var onchange = function() {
    var planet = getSelectedPlanet();
    localStorage.setItem("g", planet.g);
    localStorage.setItem("fuel", planet.fuel);
    localStorage.setItem("planetId", planet.id);
  }
  
  var getSelectedPlanet = function() {
    return select.options[select.selectedIndex].planet;
  };
  
  var select = document.getElementById("planet-selection");
  select.onchange = onchange;
  fillSelect();
  
})();
