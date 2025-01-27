import { addTMtoGantt } from "./gantt.js";
import { addTMtoDB, onStart, clearAll } from "./team.js";
import { validInput } from "./forms.js";

onStart();

document.getElementById('addTM').addEventListener('submit', function(event) {
  event.preventDefault();

  if(!validInput()) {
    return;
  }
  const name = document.getElementById('name').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  addTMtoDB(name, startTime, endTime);
  addTMtoGantt(name, startTime, endTime);

  // document.getElementById('name').value = '';
  // document.getElementById('startTime').value = '';
  // document.getElementById('endTime').value = '';
});


document.getElementById('clearAllBtn').addEventListener('click', function(event) {
  clearAll();
});