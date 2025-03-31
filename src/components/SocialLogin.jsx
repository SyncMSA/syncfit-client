// src/components/SocialLogin.jsx
import React, { useContext } from 'react';
import kakaoImg from '../assets/images/kakao_login.png';
import './css/SocialLogin.css';
import { useNavigate } from 'react-router-dom';
import KakaoButton from './KakaoButton';
import { AuthContext } from '../contexts/AuthContext';

const SocialLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const { accessToken, logout, role } = useContext(AuthContext);
  const nav = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleLogout = () => {
    logout();
    nav("/", { replace: true });
  };

  const handleAdmin = () => {
    nav("/admin");
  };

  return (
    <div className="social-login">
      <h1>SyncFit</h1>
      {accessToken ? (
        <>
          <KakaoButton onClick={handleLogout} />
          {/* Admin 버튼은 role이 "admin" 또는 "ADMIN"일 때만 표시 */}
          {role && role.toLowerCase() === "admin" && (
            <button className="admin-button" onClick={handleAdmin}>
              Admin
            </button>
          )}
        </>
      ) : (
        <img src={kakaoImg} alt="카카오 로그인" onClick={handleKakaoLogin} />
      )}
    </div>
  );
};

export default SocialLogin;
