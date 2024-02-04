let objNumber = parseInt(localStorage.getItem('objCount'));
const object = JSON.parse(localStorage.getItem('object'+objNumber));
let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let flag = 0;
let username=null;



const convertSecondsToHHMMSS = (totalSeconds) => `${String(Math.floor(totalSeconds / 3600)).padStart(2, '0')}:${String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;

document.addEventListener('DOMContentLoaded', () => {
  displayObjectData();
  loadTimeFromLocalStorage();
  updateDisplay();
});

function startStopwatch() {
  if(flag == 0) {
    if (!timer) {
      timer = setInterval(updateStopwatch, 100);
      document.querySelector('.start').innerHTML = '<i class="fas fa-pause"></i>';
      flag = 1;
    }
  } else {
    clearInterval(timer);
    timer = null;
    document.querySelector('.start').innerHTML = '<i class="fa-solid fa-play"></i>';
    flag = 0;
  }
}

function displayObjectData() {
  const watchText = document.querySelector('.watchText');
  watchText.innerHTML = '';
  if (object) {
    const objHTML = `
      <div>
        <p>Activity Name: ${object.activityName}</p>
        <p>Total Time: ${convertSecondsToHHMMSS(object.totalHours)}</p>
        <p>Completed Time: ${convertSecondsToHHMMSS(object.completedHours)}</p>
        <p>Completed Percentage: ${parseInt(object.completedPercentage).toFixed(0)}%</p>
      </div>
    `;
    watchText.insertAdjacentHTML('beforeend', objHTML);
  }
}

function saveTimeToLocalStorage() {
  if (object) {
    object.completedHours = (hours * 3600) + (minutes * 60) + seconds;
    object.completedPercentage = ((parseInt(object.completedHours) / parseInt(object.totalHours)) * 100).toFixed(2);
    localStorage.setItem('object' + objNumber, JSON.stringify(object));
    displayObjectData();
  }
}

function loadTimeFromLocalStorage() {
  if (object) {
    totalSeconds = parseInt(object.completedHours);
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
  }
}

function updateStopwatch() {
  milliseconds += 10;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}
function updateDisplay() {
  const display = document.querySelector('.display');
  const stopWatch = document.querySelector('.stopWatch'); 

  if (hours > 0) {
    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
  } else {
    display.textContent = formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatTime(milliseconds);
  }

  if (parseInt(object.completedHours) >= parseInt(object.totalHours)) {
    clearInterval(timer); 
    timer = null;
    document.querySelector('.start').disabled = true; 
  }

  const completedPercentage = parseInt(object.completedPercentage);
  if (completedPercentage >= 90) {
    stopWatch.style.borderLeftColor = 'green';
    stopWatch.style.borderTopColor = 'green';
    stopWatch.style.borderRightColor = 'green';
  } else if (completedPercentage >= 65) {
    stopWatch.style.borderLeftColor = 'green';
    stopWatch.style.borderTopColor = 'green';
  } else if (completedPercentage >= 40) {
    stopWatch.style.borderLeftColor = 'yellow';
    stopWatch.style.borderTopColor = 'yellow';
  } else if (completedPercentage >= 20) {
    stopWatch.style.borderLeftColor = 'red';
  } else {
    stopWatch.style.borderLeftColor = ''; 
    stopWatch.style.borderTopColor = ''; 
  }
  stopWatch.style.transition = 'border-color 10s ease-in-out';
  saveTimeToLocalStorage();
}




function formatTime(time) {
  return time < 10 ? '0' + time : time;
}
  
