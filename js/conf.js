(function () {

  "use strict";
  
  var planets = [{
    id: "moon",
    g: 1.622,
    fuel: 3000,
    text: "Moon (g=1.622)"
  },{
    id: "mars",
    g: 3.69,
    fuel: 7000,
    text: "Mars (g=3.69)"
  },{
    id: "venus",
    g: 8.87,
    fuel: 20000,
    text: "Venus (g=8.87)"
  },{
    id: "kepler10b",
    g: 15,
    fuel: 50000,
    text: "Kepler-10b (g=15)"
  },{
    id: "kepler30c",
    g: 30,
    fuel: 100000,
    text: "Kepler-30c (g=30)"
  }];
  
  var createOption = function(planet) {
    var option = document.createElement("option");
    option.text = planet.text;
    option.planet = planet;
    if (planet.id === localStorage.getItem("planet")) {
      option.selected = true;
    }
    return option;
  };
  
  var addOption = function(planet) {
    select.appendChild(createOption(planet));
  };
  
  var getSelectedPlanet = function() {
    return select.options[select.selectedIndex].planet;
  };
  
  var fillSelect = function() {
    planets.forEach(function(planet) {
      addOption(planet);
    });
  };
  
  var onchange = function() {
    var planet = getSelectedPlanet();
    localStorage.setItem("g", planet.g);
    localStorage.setItem("fuel", planet.fuel);
    localStorage.setItem("planet", planet.id);
  }
  
  var select = document.getElementById("select");
  select.onchange = onchange;
  fillSelect();
  
  console.log("ls", localStorage.getItem("planet"));
  
})();
