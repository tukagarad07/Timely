let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let flag = 0;
let username=null;


document.addEventListener('DOMContentLoaded', () => {
  loadTimeFromLocalStorage();
  updateDisplay();
});

function startStopwatch() {
  if(flag==0) {
    if (!timer) {
      timer = setInterval(updateStopwatch, 100);
      //document.querySelector('.start').disabled = true;
      document.querySelector('.start').innerHTML = '<i class="fas fa-pause"></i>';
      flag=1;
    }
  }
  else {
    clearInterval(timer);
    timer = null;
    document.querySelector('.start').innerHTML = '<i class="fa-solid fa-play"></i>';
    flag=0;
  }
  
}

function saveTimeToLocalStorage() {
  localStorage.setItem('stopwatchHours', hours);
  localStorage.setItem('stopwatchMinutes', minutes);
  localStorage.setItem('stopwatchSeconds', seconds);
}

function loadTimeFromLocalStorage() {
  username = localStorage.getItem('stopwatchHours');
  hours = parseInt(localStorage.getItem('stopwatchHours')) || 0;
  minutes = parseInt(localStorage.getItem('stopwatchMinutes')) || 0;
  seconds = parseInt(localStorage.getItem('stopwatchSeconds')) || 0;
}

function clearTimeFromLocalStorage() {
  localStorage.removeItem('stopwatchHours');
  localStorage.removeItem('stopwatchMinutes');
  localStorage.removeItem('stopwatchSeconds');
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
  if(hours>0)
  {
    display.textContent =
    formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
  }
  else{
    display.textContent =
    formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatTime(milliseconds);
  }
  saveTimeToLocalStorage();
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}




