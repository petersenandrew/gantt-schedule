import { addTMtoGantt, deleteTMfromGantt } from "./gantt.js";
import { addTMtoDB, onStart, clearAll, removeTM, getTeam } from "./team.js";
import { validInput } from "./forms.js";

let selected = null;
let isDragging = false;
let moveTarget = null;
let dragOffset = 0;
let disableClick = false;

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
  deleteTMfromGantt(selected);
  removeTM(tmId);
  selected = null;
});

document.getElementById('ganttChart').addEventListener('click', (event) => {
  if(!event.target.classList.contains('shift-block')) {
    return;
  }
  if(disableClick) {
    event.preventDefault();
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

document.getElementById('ganttChart').addEventListener('mousedown', (event) => {
  if(event.target.classList.contains('shift-block')) {
    isDragging = true;
    moveTarget = event.target;
    dragOffset = event.clientX - moveTarget.getBoundingClientRect().left;
  }
});

let chartWidth = 0;
let hourWidth = 0;


document.addEventListener('mousemove', (event) => {
  if(!isDragging) {
    return;
  }
  if(window.innerWidth > 1416) {
    //(Total Hours * width + Name width) / 100 * vw + margin
    chartWidth = (24 * 3.5) / 100 * window.innerWidth;
    hourWidth = 0.035 * window.innerWidth;
  } else {
    chartWidth = 24 * 50;
    hourWidth = 50;
  }
  let newLeft = event.clientX - dragOffset - 220;
  if(newLeft < 0) {
    moveTarget.style.left = 0;
  } else if(newLeft + moveTarget.getBoundingClientRect().width > chartWidth) {
    moveTarget.style.left = chartWidth - moveTarget.getBoundingClientRect().width;
  } else {
    moveTarget.style.left = `${newLeft}px`;
  }
  disableClick = true;
});

document.addEventListener('mouseup', (event) => {
  const lastX = event.clientX;
  moveTarget = null;
  isDragging = false
  setTimeout(() => {
    disableClick = false;
  }, 1);

});