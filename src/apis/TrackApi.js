import axios from 'axios';

const BASE_URL = 'http://35.163.219.80:8000';

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