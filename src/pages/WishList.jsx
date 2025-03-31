import React, { useContext, useEffect } from 'react';
import WithoutFooterLayout from '../components/Layout/WithoutFooterLayout';
import UserWishlist from '../components/UserWishlist';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const WishList = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/mypage", { replace: true });
    }
  }, [accessToken, navigate]);

  return (
    <WithoutFooterLayout>
      <UserWishlist />
    </WithoutFooterLayout>
  );
};

export default WishList;
