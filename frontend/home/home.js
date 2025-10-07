import { getUpcomingEvents } from '../common/js/api.js';

// Render upcoming events list
async function renderUpcomingEvents() {
  const eventsContainer = document.getElementById('upcoming-events');
  const events = await getUpcomingEvents();

  if (events.length === 0) {
    eventsContainer.innerHTML = '<p>No events scheduled in the next 7 days</p>';
    return;
  }

  // Generate event card HTML
  const eventsHTML = events.map(event => `
    <div class="event-card">
      <h3>${event.title}</h3>
      <p class="date">Date: ${event.date}</p>
      <p>${event.description.substring(0, 100)}...</p>
      <p>Location: ${event.location}</p>
      <a href="../event-details/details.html?eventId=${event.id}" class="btn">View Details</a>
    </div>
  `).join('');

  eventsContainer.innerHTML = eventsHTML;
}

// Render on page load
window.addEventListener('DOMContentLoaded', renderUpcomingEvents);
