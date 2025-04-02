import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_SERVER_IP;
const REST_API_PORT = import.meta.env.VITE_SERVER_PORT
const BASE_URL = `https://${REST_API_KEY}`;  //:${REST_API_PORT}`;

export const socialLogin = (code) => {

  return axios.post(
    `${BASE_URL}/auth-service/social-login`,
    { code },
    { headers: { 'Content-Type': 'application/json' } }
  );
};

export const socialLogout = (accessToken) => {
  return axios.post(
    `${BASE_URL}/members/logout`,
    {},
    { headers: { 'Authorization': `Bearer ${accessToken}`}}
  )
}

export const userInfo = (accessToken) => {
  return axios.get(
    `${BASE_URL}/member-service/me`,
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
}

export const refresh = (refreshToken) => {
  return axios.post(
      `${BASE_URL}/auth-service/refresh`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
  )
}