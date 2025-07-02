import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const now = new Date();
  const expiration = new Date(localStorage.getItem('expiration'));
  const duration = expiration.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  
  const expiryduration = getTokenDuration();

  if (expiryduration < 0) {
    removeAuthToken();
    return null;
  }

  return token;
}

export function setAuthToken(token, expiration) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expiration);
}

export function removeAuthToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    removeAuthToken();
    return redirect('/auth');
  }
  return null;
}