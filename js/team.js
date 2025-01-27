import { addTMtoGantt } from "./gantt.js";

let team = [];

export function onStart() {
  const storedTeam = JSON.parse(localStorage.getItem('team'));
  team = storedTeam || [];

  team.forEach(tm => addTMtoGantt(tm.id, tm.name, tm.startTime, tm.endTime));
}

export function addTMtoDB(name, startTime, endTime) {
  

  const newTM = {
    id: Date.now(),
    name,
    startTime,
    endTime
  };
  team.push(newTM);
  localStorage.setItem('team', JSON.stringify(team));
}

export function removeTM(id) {
  team = team.filter(tm => tm.id !== id);
  console.log(team);
  localStorage.setItem('team', JSON.stringify(team));
}

export function getTeam() {
  return team;
}

export function clearAll() {
  localStorage.removeItem('team');
  window.location.reload();
}