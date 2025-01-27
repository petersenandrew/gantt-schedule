let shiftBlockId = 0;

export function deleteTMfromGantt(selected) {
  selected.parentElement.remove();
}

export function addTMtoGantt(id, name, startTime, endTime) {
  const startHour = parseInt(startTime.split(':')[0], 10);
  const startMinute = parseInt(startTime.split(':')[1], 10);
  const endHour = parseInt(endTime.split(':')[0], 10);
  const endMinute = parseInt(endTime.split(':')[1], 10);

  const startPos = startHour + startMinute / 60;
  const endPos = endHour + endMinute / 60;

  // Create a new shift block for the team member on the Gantt chart
  const ganttChart = document.getElementById('ganttChart');

  const tm = document.createElement('div');
  tm.classList.add('row', 'flex-nowrap', 'team-member');
  tm.setAttribute('tmId', id);

  const nameBlock = document.createElement('div');
  nameBlock.classList.add('name-block');

  const shiftBlock = document.createElement('div');
  shiftBlock.classList.add('shift-block', 'rounded-2');
  shiftBlock.style.left = `${startPos * 3.5}vw`; // Each hour block takes up ~4% of the chart
  shiftBlock.style.width = `${(endPos - startPos) * 3.5}vw`;

  const style = document.createElement('style');
  /* Max width based on min-width time-box + min-width name-box + margin */
  const mediaQuery = `
    @media (max-width: 1416px) {
      .shift-block-${shiftBlockId} {
        left: ${startPos * 50}px !important;
        width: ${(endPos - startPos) * 50}px !important;
      }
    }
  `
  style.innerHTML = mediaQuery;
  document.head.appendChild(style);

  shiftBlock.classList.add(`shift-block-${id}`);
  shiftBlockId++;

  // Add the team member's name to the shift block
  nameBlock.textContent = name;
  shiftBlock.textContent = name;

  // Append the shift block to the Gantt chart
  ganttChart.appendChild(tm);
  tm.appendChild(nameBlock);
  tm.appendChild(shiftBlock);
}