import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { socialLogin } from '../apis/AuthApi';

const OAuthCallback = () => {
  const location = useLocation();
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const { login } = useContext(AuthContext); 

  useEffect(() => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      socialLogin(code)
        .then(response => {
          console.log('로그인 성공:', response.data.data.accessToken);
          
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);  // add by SYB
          login(response.data.data.accessToken);
          setLoading(false)
          nav('/', { replace: true });
        })
        .catch(error => {
          console.error('토큰 요청 실패:', error.response ? error.response.data : error.message);
          setLoading(false)
          nav('/mypage', { replace: true });
        });
    } else {
      nav('/', { replace: true });
    }
  }, [location, nav]);

  return <></>;
};

export default OAuthCallback;
