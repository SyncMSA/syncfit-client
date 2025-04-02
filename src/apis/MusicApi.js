import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_SERVER_IP;
const REST_API_PORT = import.meta.env.VITE_SERVER_PORT
const BASE_URL = `https://${REST_API_KEY}:${REST_API_PORT}`;

export const musicRecommendation = (JSONData, accessToken) => {
  console.log(JSONData, accessToken)
  return axios
    .post(
      `${BASE_URL}/outer-service/recommendation`,
      JSONData,
      {  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    )
    .then(res => {
      const genre = res.data.data.genre;
      console.log('추천 장르:', genre);

      return axios.get(`${BASE_URL}/outer-service/search`, {
        params: { genres: genre },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
    })
    .then(getRes => {
      console.log('검색 결과:', getRes.data.data);
      return getRes.data.data;
    })
    .catch(err => {
      console.error('음악 추천 요청 실패:', err.response ? err.response.data : err.message);
      throw err;
    });
};
