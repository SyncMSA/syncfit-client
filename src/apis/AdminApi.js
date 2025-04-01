import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_SERVER_IP;
const REST_API_PORT = import.meta.env.VITE_SERVER_PORT
const BASE_URL = `http://${REST_API_KEY}:${REST_API_PORT}`;

export const getUsers = async (accessToken) => {
  const response = await axios.get(`${BASE_URL}/admin-service/members`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteUser = async (memberId, accessToken) => {
  console.log(memberId)
  const response = await axios.delete(`${BASE_URL}/admin-service/members/${memberId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
