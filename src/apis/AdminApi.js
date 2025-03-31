import axios from 'axios';

const BASE_URL = 'http://35.163.219.80:8000';

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
