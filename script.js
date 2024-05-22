let countdownTime = 3600; // Default countdown time in seconds (1 hour)
let countdownElement = document.getElementById('countdown');
let previousSubscribers = 0;

// Fetch initial subscriber count and set the countdown timer
fetch('api/getSubscribers') // You'll need to implement this API
    .then(response => response.json())
    .then(data => {
        previousSubscribers = data.subscribers;
        startCountdown();
        setInterval(checkSubscribers, 60000); // Check for new subscribers every minute
    });

function startCountdown() {
    setInterval(() => {
        if (countdownTime > 0) {
            countdownTime--;
            displayTime(countdownTime);
        }
    }, 1000);
}

function displayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function checkSubscribers() {
    fetch('api/getSubscribers') // You'll need to implement this API
        .then(response => response.json())
        .then(data => {
            const newSubscribers = data.subscribers - previousSubscribers;
            if (newSubscribers > 0) {
                countdownTime += newSubscribers * 20 * 60; // Add 20 minutes per new subscriber
                previousSubscribers = data.subscribers;
            }
        });
}
