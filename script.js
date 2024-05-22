let timerElement = document.getElementById('timer');
let startTime = 3600; // Initial timer in seconds (e.g., 1 hour)
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
    startTime++;
    timerElement.textContent = formatTime(startTime);
}

function getSubscriberCount() {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const newSubscriberCount = parseInt(data.items[0].statistics.subscriberCount, 10);
            if (newSubscriberCount > subscriberCount) {
                const newSubscribers = newSubscriberCount - subscriberCount;
                startTime += newSubscribers * 120; // Add 2 minutes per new subscriber
                subscriberCount = newSubscriberCount;
            }
        })
        .catch(error => console.error('Error fetching subscriber count:', error));
}

function startFollowathon() {
    getSubscriberCount(); // Initial fetch
    setInterval(getSubscriberCount, 60000); // Check every minute
    setInterval(updateTimer, 1000); // Update timer every second
}

document.addEventListener('DOMContentLoaded', startFollowathon);
