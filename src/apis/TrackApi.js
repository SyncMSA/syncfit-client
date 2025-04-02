import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_SERVER_IP;
const REST_API_PORT = import.meta.env.VITE_SERVER_PORT
const BASE_URL = `https://${REST_API_KEY}`;  //:${REST_API_PORT}`;

export const addTrack = async (trackData, accessToken) => {
  const response = await axios.post(
    `${BASE_URL}/track-service`,
    trackData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const getTracks = async (wishlistId, accessToken) => {
  const response = await axios.get(`${BASE_URL}/track-service/${wishlistId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteTrack = async (trackId, accessToken) => {
  const response = await axios.delete(`${BASE_URL}/track-service/${trackId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};