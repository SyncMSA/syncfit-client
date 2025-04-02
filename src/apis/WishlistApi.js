import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_SERVER_IP;
const REST_API_PORT = import.meta.env.VITE_SERVER_PORT
const BASE_URL = `https://${REST_API_KEY}`;  //:${REST_API_PORT}`;

export const createWishlist = async (title, imageFile, accessToken) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", imageFile);

  const response = await axios.post(
    `${BASE_URL}/wishlist-service`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const getWishlists = async (accessToken) => {
  const response = await axios.get(`${BASE_URL}/wishlist-service`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteWishlist = async (wishlistId, accessToken) => {
  const response = await axios.delete(`${BASE_URL}/wishlist-service/${wishlistId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateWishlist = async (wishlistId, title, imageFile, accessToken) => {
  const patchFormData = new FormData();
  if (title) patchFormData.append("title", title);
  if (imageFile) patchFormData.append("image", imageFile);

  return axios.patch(
    `${BASE_URL}/wishlist-service/${wishlistId}`,
    patchFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  .then((patchRes) => {
    console.log("PATCH update successful:", patchRes.data);
    // 이미지 POST 요청 -> Firebase 이미지 저장
    const postFormData = new FormData();
    postFormData.append("wishlistId", wishlistId);
    if (imageFile) {
      postFormData.append("files", imageFile);
    }
    return axios.post(
      `${BASE_URL}/image-service`,
      postFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  })
  .then((postRes) => {
    console.log("POST files successful:", postRes.data);
    return postRes.data;
  });
};

export const downloadImage = async (wishlistId, accessToken) => {
  const response = await axios.get(`${BASE_URL}/image-service`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: { wishlistId },
    responseType: 'blob'
  });
  return response;
};