import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_SERVER_IP;
const REST_API_PORT = import.meta.env.VITE_SERVER_PORT
const BASE_URL = `http://${REST_API_KEY}:${REST_API_PORT}`;

export const getYoutubeVideo = (accessToken, searchQuery) => {
  return axios.get(`${BASE_URL}/outer-service/youtube`, {
    params: { query: searchQuery },
    headers: { 'Authorization': `Bearer ${accessToken}` },
  })
  .then(response => {
    return response.data.data.videoId;
  });
}
