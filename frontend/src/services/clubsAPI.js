import sendRequest from './sendRequest';

const BASE_URL = '/api/clubs';

export function add(clubData) {
  return sendRequest(`${BASE_URL}/create`, 'POST', clubData);
}

export function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
  }

export function getAll() {
  return sendRequest(BASE_URL);
}  