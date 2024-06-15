let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapCount = 0;
const lapList = document.getElementById('lap-list');

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  display.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    intervalId = setInterval(updateTimer, 10);
    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
    stopButton.disabled = true;
    splitButton.disabled = false; 
    startButton.disabled = false;
  }
}

function splitTime() {
  if (isRunning) {
    const splitDisplay = document.createElement('div');
    splitDisplay.textContent = `Split: ${display.textContent}`;
  }
}

function resetTimer() {
  isRunning = false;
  clearInterval(intervalId);
  elapsedTime = 0;
  display.innerHTML = '00:00:00';
  stopButton.disabled = true;
  splitButton.disabled = true;
  lapButton.disabled = true;
  lapCount = 0;
  lapList.innerHTML = ''; 
}

function addLap() {
  if (isRunning) {
    lapCount++;
    const newLap = document.createElement('li');
    newLap.innerText = `Lap ${lapCount}: ${display.textContent}`;
    lapList.appendChild(newLap);
  }
}

const startButton = document.getElementById('start');
startButton.addEventListener('click', startTimer);

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', stopTimer);

const splitButton = document.getElementById('split');
splitButton.addEventListener('click', splitTime);

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetTimer);

const lapButton = document.getElementById('lap');
lapButton.addEventListener('click', addLap);

const themeSelector = document.getElementById('theme-selector');
const themeLink = document.getElementById('theme-link');

themeSelector.addEventListener('change', () => {
  const selectedTheme = themeSelector.value;
  themeLink.href = selectedTheme;
});
