let timerElement = document.getElementById('timer');
let initialTime = 86400; // Initial timer in seconds (1 day = 24 hours * 60 minutes * 60 seconds)
let currentTime = initialTime;
let subscriberCount = 0;
let channelId = 'UC4TucIqWiRkUX8PHAXP9gXw'; // Replace with your YouTube channel ID
let apiKey = 'AIzaSyBZaWCiNakkMlf-jze4UUXZoc3fmH0XWio'; // Replace with your YouTube API key

function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days.toString().padStart(2, '0')}:${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    if (currentTime > 0) {
        currentTime--;
        timerElement.textContent = formatTime(currentTime);
    } else {
        clearInterval(timerInterval);
        clearInterval(subscriberInterval);
        alert("Time's up!");
    }
}

function getSubscriberCount() {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const newSubscriberCount = parseInt(data.items[0].statistics.subscriberCount, 10);
            if (newSubscriberCount > subscriberCount) {
                const newSubscribers = newSubscriberCount - subscriberCount;
                currentTime += newSubscribers * 3600; // Add 1 hour (3600 seconds) per new subscriber
                subscriberCount = newSubscriberCount;
            }
        })
        .catch(error => console.error('Error fetching subscriber count:', error));
}

function startFollowathon() {
    getSubscriberCount(); // Initial fetch
    subscriberInterval = setInterval(getSubscriberCount, 60000); // Check every minute
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}

document.addEventListener('DOMContentLoaded', startFollowathon);
