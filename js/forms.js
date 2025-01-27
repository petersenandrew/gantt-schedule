export function validInput() {
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