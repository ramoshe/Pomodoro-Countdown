const secondsInaMinute = 60;
const minutes_25 = secondsInaMinute * 25;
const minutes_5 = secondsInaMinute * 5;
const seconds_10 = 10; //for testing

let interval;
let isPaused = true;
let countdownWasStarted = false;
let pomodoroDuration = minutes_25; //by default
let timeLeftInSeconds = 0;

// Button Handlers
function updateDuration() {
  //The pomodoro duration is by default 50, but we can change to 25!
  if(pomodoroDuration == minutes_25 ) {
    pomodoroDuration = minutes_5;
  } else {
    pomodoroDuration = minutes_25;
  }

  timeLeftInSeconds = pomodoroDuration
  updateTimeString()
}

function playPauseCountdown() {
  isPaused = !isPaused

  updatePlayPauseButton();

  if(!countdownWasStarted) {
    //This function could be called after initiating the timer,
    //so we need to differentiate when its start vs pause vs resume
    resetCountdown()
    updateTimeString()
  }

  countdownWasStarted = true

  if(isPaused) {
    stopCountdown()
  } else {
    // Update the count down every 1 second
    interval = setInterval(updateCountdown, 1000);
  }
}

function restartCountdown() {
  //When we reset the countdown, stop the interval and reset things back to normal
  stopCountdown()
  resetCountdown()

  isPaused = true
  updatePlayPauseButton()
  updateTimeString()
}

// Biz Logic
function updateCountdown() {
  if(isPaused) {
    return
  }

  timeLeftInSeconds--;

  updateTimeString();

  if(timeLeftInSeconds == 0) {
    playYoScott()
    stopCountdown()
    isPaused = true
    updatePlayPauseButton()
  }
}

function pauseCountdown() {
  isPaused = !isPaused;
}

function stopCountdown() {
  clearInterval(interval)
}

function resetCountdown() {
  isPaused = false
  timeLeftInSeconds = pomodoroDuration
}

// View Updates
function updatePlayPauseButton() {
  let playPauseSVG;
  if(isPaused) {
    playPauseSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" height="70" width="70" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
      </svg>`;
  } else {
    playPauseSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" height="70" width="70" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>`;
  }
  document.getElementById("playPause").innerHTML = playPauseSVG;
}

function updateTimeString() {
  let minutes = Math.floor(timeLeftInSeconds / secondsInaMinute);
  let seconds = timeLeftInSeconds % secondsInaMinute;

  if(seconds < 10) {
    secondsString = "0" + seconds
  } else {
    secondsString = seconds
  }

  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = minutes + ":" + secondsString;
}

function playYoScott() {
  var yoScottAudio = document.getElementById("yoScottAudio");
  yoScottAudio.play();

  document.getElementById("countdown").innerHTML = "YOO";
}
