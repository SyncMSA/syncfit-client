import axios from 'axios';

const BASE_URL = 'http://35.163.219.80:8000';

export const getYoutubeVideo = (accessToken, searchQuery) => {
  return axios.get(`${BASE_URL}/outer-service/youtube`, {
    params: { query: searchQuery },
    headers: { 'Authorization': `Bearer ${accessToken}` },
  })
  .then(response => {
    return response.data.data.videoId;
  });
}
