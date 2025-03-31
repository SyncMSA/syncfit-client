import axios from 'axios';

const BASE_URL = 'http://35.163.219.80:8000';

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