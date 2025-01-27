import { addTMtoGantt, deleteTMfromGantt } from "./gantt.js";
import { addTMtoDB, onStart, clearAll, removeTM, getTeam } from "./team.js";
import { validInput } from "./forms.js";

let selected = null;

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
  const team = getTeam();
  const tmId = team[team.length - 1].id;
  addTMtoGantt(tmId, name, startTime, endTime);

  // document.getElementById('name').value = '';
  // document.getElementById('startTime').value = '';
  // document.getElementById('endTime').value = '';
});


document.getElementById('clearAllBtn').addEventListener('click', (event) => {
  clearAll();
});

document.getElementById('deleteBtn').addEventListener('click', (event) => {
  const tmId = parseInt(selected.parentElement.getAttribute('tmId'),10);
  console.log(tmId);
  deleteTMfromGantt(selected);
  removeTM(tmId);
  selected = null;
});

document.getElementById('ganttChart').addEventListener('click', (event) => {
  if(!event.target.classList.contains('shift-block')) {
    return;
  }
  if(event.target.classList.contains('selected')) {
    event.target.classList.remove('selected');
    selected = null;
    return;
  }
  const shiftBlocks = document.querySelectorAll('.shift-block');
  shiftBlocks.forEach(sb => sb.classList.remove('selected'));
  event.target.classList.add('selected');
  selected = event.target;
})