import sendRequest from './sendRequest';

const BASE_URL = '/api/auth';

export async function signUp(userData) {
  const token = await sendRequest(`${BASE_URL}/signup`, 'POST', userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getUser() {
  const token = getToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check if the token is expired
      if (payload.exp * 1000 < Date.now()) {
        // Token has expired
        localStorage.removeItem('token');
        return null;
      }
      console.log('User retrieved from token:', payload.user);
      return payload.user;
    } catch (e) {
      console.error('Error decoding token:', e);
      localStorage.removeItem('token');
      return null;
    }
  } else {
    console.log('No token found, user is null.');
    return null;
  }
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      console.log('Token expired, removing token.');
      return null;
    }
    return token;
  } catch (e) {
    console.error('Error decoding token:', e);
    localStorage.removeItem('token');
    return null;
  }
}
