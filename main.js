var credits = 250;
var metal = 100;
var crystal = 100;
var screenUpdateTickCount = 0;
//Building Stats: [name, condition, level, slot, other variables...]
//Condition: 2: fine, 1: damaged, 0: nonfunctional, -1: damaged beyond repair, -2: no system
//Level 0 only used for nonexistant buildings.
//Template: ["", -2, 0, "#b$"]
var buildings = [["Resource Mine", 2, 1, "#b1", 0], ["", -2, 0, "#b2"], ["", -2, 0, "#b3"]] //general building db

var tick = function() { //tick = 1/20 seconds
  $("#credits").html(String(credits) + "C");
  $("#crystal").html(String(crystal));
  $("#metal").html(String(metal));
  for (i = 0, b = buildings[0], len = buildings.length, conditionString = ""; i < len; i++, b = buildings[i]) {
      //console.log(i, b);
      if (screenUpdateTickCount == 40) {
        switch(b[1]) { //changes building colour and status messages
          case 2: $(b[3]).removeClass().addClass("w3-container w3-blue"); break;
          case 1: conditionString = "<br />Damaged"; $(b[3]).removeClass().addClass("w3-container w3-orange"); break;
          case 0: conditionString = "<br />Nonfunctional! Repair ASAP!"; $(b[3]).removeClass().addClass("w3-container w3-red"); break;
          case -1: conditionString = "<br />Damaged beyond repair."; $(b[3]).removeClass().addClass("w3-container w3-black"); break;
          case -2: $(b[3]).removeClass().addClass("w3-container w3-grey"); break;
        }
        if (b[1] == -2) {
          $(b[3]).html("No system.")
        } else {
          $(b[3]).html(b[0] + "<br />" + "LV" + b[2] + conditionString + "  <button type='button' class='w3-button' onClick='upgrade("+ i +")'>Upgrade</button>")
        }
      }
      if (b[0] == "Resource Mine" && b[4] < 80/b[2]) {
        b[4]++
      } else if (b[0] == "Resource Mine" && b[4] == 80/b[2]) {
        metal = metal + b[2] * 5;
        crystal = crystal + b[2] * 2;
        b[4] = 0
      }
    }
  if (screenUpdateTickCount == 40) {
    screenUpdateTickCount = 0
  } else {
    screenUpdateTickCount++
  }
};

var alert = function(string, colour) {
  $("#alertbar").show(1000);
  $("#alertbar").html(string);
  $("#alertbar").removeClass().addClass("w3-container w3-" + colour)
  $("#alertbar").delay(2500).hide(1000); //IT JUST SORTA SCHLOOPS AWAY IT'S AWESOME
  return $("#alertbar")
}

var upgrade = function(building) {
  var b = buildings[building];
  var cost = (b[2] * 100) + (b[2] * 50);
  if (metal >= cost) {
    if (confirm("This will cost " + String(cost) + " metal. Are you sure you want to upgrade this building?")) {
      metal = metal - cost;
      b[2]++
      alert("Upgraded " + b[0] + ".", "green")
    }
  } else {
    alert("You don't have enough metal. This costs " + String(cost) + " metal.", "red")
  }
}

$( document ).ready(function() { //Non-definition-y code. Insert initialization things here.
  tick();
  alert("Ready!", "green")
  window.setInterval(tick, 50);
});
