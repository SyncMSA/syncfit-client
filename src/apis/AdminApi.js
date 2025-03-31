import axios from 'axios';

const BASE_URL = 'http://spring-server:8080';

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
