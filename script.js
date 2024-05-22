let timerElement = document.getElementById('timer');
let initialTime = 3600; // Initial timer in seconds (e.g., 1 hour)
let currentTime = initialTime;
let subscriberCount = 0;
let channelId = 'UC4TucIqWiRkUX8PHAXP9gXw'; // Replace with your YouTube channel ID
let apiKey = 'AIzaSyBZaWCiNakkMlf-jze4UUXZoc3fmH0XWio'; // Replace with your YouTube API key

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
                currentTime += newSubscribers * 120; // Add 2 minutes per new subscriber
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