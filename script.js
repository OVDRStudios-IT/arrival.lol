const apiKey = 'YOUR_YOUTUBE_API_KEY';
const channelId = 'YOUR_CHANNEL_ID';
const subscriberCountElement = document.getElementById('subscriber-count');
const membershipCountElement = document.getElementById('membership-count');
const timerElement = document.getElementById('timer');

let initialSubscribers = 0;
let initialMembers = 0;
let currentSubscribers = 0;
let currentMembers = 0;
let countdown = 10 * 60 * 60; // 10 hours in seconds

// Convert seconds to HH:MM:SS
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timerElement.textContent = formatTime(countdown);
}

function updateSubscriberCount(newSubscribers) {
    if (initialSubscribers === 0) {
        initialSubscribers = newSubscribers;
    }
    const subscriberDiff = newSubscribers - currentSubscribers;
    currentSubscribers = newSubscribers;
    subscriberCountElement.textContent = currentSubscribers;
    countdown += subscriberDiff * 20 * 60; // 20 minutes per new subscriber
}

function updateMembershipCount(newMembers) {
    if (initialMembers === 0) {
        initialMembers = newMembers;
    }
    const memberDiff = newMembers - currentMembers;
    currentMembers = newMembers;
    membershipCountElement.textContent = currentMembers;
    countdown += memberDiff * 60 * 60; // 1 hour per new member
}

// Fetch subscriber and membership counts from YouTube API
async function fetchCounts() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
        const data = await response.json();
        const stats = data.items[0].statistics;
        updateSubscriberCount(parseInt(stats.subscriberCount));
        // Update membership count here if needed; currently, YouTube API does not provide member count directly
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
    }
}

function tick() {
    if (countdown > 0) {
        countdown--;
        updateTimer();
    }
}

// Initial setup
updateTimer();
fetchCounts();
setInterval(tick, 1000); // Update the timer every second
setInterval(fetchCounts, 60000); // Fetch subscriber counts every minute
