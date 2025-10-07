import { searchEvents } from '../common/js/api.js';

const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('search-results');

// Handle search form submission
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get form data
  const filters = {
    category: document.getElementById('category').value,
    date: document.getElementById('date').value,
    keyword: document.getElementById('keyword').value
  };

  // Call search API
  const results = await searchEvents(filters);
  renderResults(results);
});

// Render search results
function renderResults(events) {
  if (events.length === 0) {
    resultsContainer.innerHTML = '<p>No events match your criteria</p>';
    return;
  }

  const resultsHTML = events.map(event => `
    <div class="event-card">
      <h3>${event.title}</h3>
      <p class="date">Date: ${event.date}</p>
      <p>Category: ${event.category}</p>
      <a href="../event-details/details.html?eventId=${event.id}" class="btn">View Details</a>
    </div>
  `).join('');

  resultsContainer.innerHTML = resultsHTML;
}
