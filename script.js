const apiKey = 'AIzaSyBZaWCiNakkMlf-jze4UUXZoc3fmH0XWio';
const channelId = 'UC4TucIqWiRkUX8PHAXP9gXw';
const subscriberCountElement = document.getElementById('subscriber-count');
const membershipCountElement = document.getElementById('membership-count');
const timerElement = document.getElementById('timer');

let subscribers = 0;
let members = 0;
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
    subscribers = newSubscribers;
    subscriberCountElement.textContent = subscribers;
    countdown += newSubscribers * 20 * 60; // 20 minutes per subscriber
}

function updateMembershipCount(newMembers) {
    members = newMembers;
    membershipCountElement.textContent = members;
    countdown += newMembers * 60 * 60; // 1 hour per member
}

// Fetch subscriber and membership counts from YouTube API
async function fetchCounts() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
        const data = await response.json();
        const stats = data.items[0].statistics;
        updateSubscriberCount(parseInt(stats.subscriberCount));
        updateMembershipCount(parseInt(stats.memberCount)); // Adjust this if member count needs a different approach
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

updateTimer();
fetchCounts();
setInterval(tick, 1000);
setInterval(fetchCounts, 60000); // Fetch subscriber counts every minute
