import sendRequest from './sendRequest';

const BASE_URL = '/api/clubs';

// Create a new club
export function add(clubData) {
  return sendRequest(`${BASE_URL}/create`, 'POST', clubData);
}

// Get a club by its ID
export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

// Get all clubs
export function getAll() {
  return sendRequest(BASE_URL);
}
