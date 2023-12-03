// Flag to track whether the timer is currently running
let isRunning = false;

// Timestamp when the timer was last started
let startTime;

// ID of the interval for updating the display
let intervalId;

// Function to start or stop the timer based on its current state
function startStop() {
    if (!isRunning) {
        start();
    } else {
        stop();
    }
}

// Function to start the timer
function start() {
    // Set the running flag to true
    isRunning = true;

    // Calculate the start time, considering elapsed time if the timer was stopped
    startTime = Date.now() - (intervalId ? 0 : elapsedTime());

    // Set up an interval to update the display every second
    intervalId = setInterval(updateDisplay, 1000);

    // Update the button text to 'Stop'
    document.getElementById('controls').children[0].innerText = 'Stop';
}

// Function to stop the timer
function stop() {
    // Set the running flag to false
    isRunning = false;

    // Clear the interval for updating the display
    clearInterval(intervalId);

    // Update the button text to 'Start'
    document.getElementById('controls').children[0].innerText = 'Start';
}

// Function to reset the timer
function reset() {
    // Stop the timer
    stop();

    // Reset the start time to null
    startTime = null;

    // Update the display
    updateDisplay();
}

// Function to update the display with the elapsed time
function updateDisplay() {
    // Calculate the elapsed time
    const elapsed = elapsedTime();

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    // Update the display with the formatted time
    document.getElementById('display').innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Function to format a time value with leading zero if needed
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

// Function to calculate the elapsed time
function elapsedTime() {
    // Return the time elapsed since the timer was started (or 0 if never started)
    return startTime ? Date.now() - startTime : 0;
}
