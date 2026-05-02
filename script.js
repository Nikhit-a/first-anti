const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timeDisplay = document.getElementById('time-display');

const DEFAULT_TIME = 25 * 60; // 25 minutes in seconds
let timeLeft = DEFAULT_TIME;
let timerInterval = null;
let isRunning = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);
    const offset = circumference - (timeLeft / DEFAULT_TIME) * circumference;
    circle.style.strokeDashoffset = offset;
    
    // Change color based on time left
    if (timeLeft < 60) {
        circle.style.stroke = '#f87171'; // Red when under 1 minute
        circle.style.filter = 'drop-shadow(0 0 12px rgba(248, 113, 113, 0.8))';
    } else {
        circle.style.stroke = '#60a5fa'; // Blue default
        circle.style.filter = 'drop-shadow(0 0 12px rgba(96, 165, 250, 0.6))';
    }
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            
            circle.style.strokeDashoffset = 0;
            setTimeout(() => {
                alert('Pomodoro completed! Time for a break.');
                resetTimer();
            }, 100);
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = DEFAULT_TIME;
    updateDisplay();
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Initial setup
updateDisplay();

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
