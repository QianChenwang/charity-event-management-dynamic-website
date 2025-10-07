// Backend API base URL (modify for production deployment)
const API_BASE_URL = 'http://localhost:3000/api';

// Get upcoming events
export async function getUpcomingEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events/upcoming`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
  } catch (err) {
    console.error('getUpcomingEvents error:', err);
    return [];
  }
}

// Get event details
export async function getEventDetails(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    if (!response.ok) throw new Error('Event not found');
    return await response.json();
  } catch (err) {
    console.error('getEventDetails error:', err);
    return null;
  }
}

// Search events
export async function searchEvents(filters) {
  // filters format: { category, date, keyword }
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  try {
    const response = await fetch(`${API_BASE_URL}/events/search?${params}`);
    if (!response.ok) throw new Error('Search failed');
    return await response.json();
  } catch (err) {
    console.error('searchEvents error:', err);
    return [];
  }
}
