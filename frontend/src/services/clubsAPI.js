import sendRequest from './sendRequest';

const BASE_URL = '/api/clubs';

export function add(clubData) {
  return sendRequest(`${BASE_URL}/create`, 'POST', clubData);
}