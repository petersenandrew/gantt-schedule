function validInput() {
  // Regex for checking letters (A-Z, a-z), spaces, >1 char
  const nameRegex = /^[A-Za-z\s]+$/;
  // Regex for checking HH:MM, 0-23:0-59
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;

  const nameInput = document.getElementById('name');
  const startTimeInput = document.getElementById('startTime');
  const endTimeInput = document.getElementById('endTime');

  const nameErrormessage = document.getElementById('nameErrorMessage');
  const timeErrorMessage = document.getElementById('timeErrorMessage');
  const timeLengthErrorMessage = document.getElementById('timeLengthErrorMessage');

  nameInput.classList.remove('is-invalid');
  startTimeInput.classList.remove('is-invalid');
  endTimeInput.classList.remove('is-invalid');
  nameErrormessage.style.display = 'none';
  timeErrorMessage.style.display = 'none';
  timeLengthErrorMessage.style.display = 'none';
  
  if (!nameRegex.test(nameInput.value)) {
    nameInput.classList.add('is-invalid');
    nameErrormessage.style.display = 'block';
    return false;
  }
  if (!timeRegex.test(startTimeInput.value)) {
    startTimeInput.classList.add('is-invalid');
    timeErrorMessage.style.display = 'block';
    return false;
  }
  if (!timeRegex.test(endTimeInput.value)) {
    endTimeInput.classList.add('is-invalid');
    timeErrorMessage.style.display = 'block';
    return false;
  }
  if (parseInt(startTimeInput.value.replace(':',''), 10) >= parseInt(endTimeInput.value.replace(':',''), 10)) {
    endTimeInput.classList.add('is-invalid');
    timeLengthErrorMessage.style.display = 'block';
    return false;
  }
  return true;
}

let shiftBlockId = 0;

document.getElementById('addUser').addEventListener('submit', function(event) {
  event.preventDefault();

  if(!validInput()) {
    return;
  }

  const name = document.getElementById('name').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  const startHour = parseInt(startTime.split(':')[0], 10);
  const startMinute = parseInt(startTime.split(':')[1], 10);
  const endHour = parseInt(endTime.split(':')[0], 10);
  const endMinute = parseInt(endTime.split(':')[1], 10);

  const startPos = startHour + startMinute / 60;
  const endPos = endHour + endMinute / 60;

  // Create a new shift block for the user on the Gantt chart
  const ganttChart = document.getElementById('ganttChart');

  const user = document.createElement('div');
  user.classList.add('row');
  user.classList.add('flex-nowrap');

  const nameBlock = document.createElement('div');
  nameBlock.classList.add('name-block');


  const shiftBlock = document.createElement('div');
  shiftBlock.classList.add('shift-block');
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

  shiftBlock.classList.add(`shift-block-${shiftBlockId}`);
  shiftBlockId++;

  // Add the user's name to the shift block
  nameBlock.textContent = name;
  shiftBlock.textContent = name;

  // Append the shift block to the Gantt chart
  ganttChart.appendChild(user);
  user.appendChild(nameBlock);
  user.appendChild(shiftBlock);

  // document.getElementById('name').value = '';
  // document.getElementById('startTime').value = '';
  // document.getElementById('endTime').value = '';
});

document.getElementById('clearAllBtn').addEventListener('click'), function() {
  
}