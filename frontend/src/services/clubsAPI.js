import sendRequest from "./sendRequest";

const BASE_URL = "/api/clubs";

// Create a new club
export function add(clubData) {
  return sendRequest(`${BASE_URL}/create`, "POST", clubData);
}

// Get a club by its ID
export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

// Get all clubs
export function getAll() {
  return sendRequest(BASE_URL);
}

// Join a club
export function joinClub(clubId, userId) {
  return sendRequest(`${BASE_URL}/${clubId}/join`, "POST", { userId });
}

// Manager delete club
export function deleteClub(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}

// Get books for a specific club
export function getBooks(clubId) {
  return sendRequest(`${BASE_URL}/${clubId}/books`);
}

// Suggest a book for a specific club
export function suggestBook(clubId, bookData) {
  return sendRequest(`${BASE_URL}/${clubId}/suggest`, "POST", bookData);
}

// Leave a club
export function leaveClub(clubId, userId) {
  return sendRequest(`${BASE_URL}/${clubId}/leave`, "POST", { userId });
}
