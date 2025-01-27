import { addTMtoGantt } from "./gantt.js";

let team = [];

export function onStart() {
  const storedTeam = JSON.parse(localStorage.getItem('team'));
  team = storedTeam || [];

  for(let tm of team) {
    addTMtoGantt(tm.name, tm.startTime, tm.endTime);
  }
}

export function addTMtoDB(name, startTime, endTime) {
  const newTM = {
    name,
    startTime,
    endTime
  };
  team.push(newTM);
  localStorage.setItem('team', JSON.stringify(team));
}

export function removeTM(name) {
  team = team.filter(tm => tm.name !== name);
  localStorage.setItem('team', JSON.stringify(team));
}

export function getTeam() {
  return team;
}

export function clearAll() {
  localStorage.removeItem('team');
  window.location.reload();
}