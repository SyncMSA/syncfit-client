import React, { createContext, useState, useEffect } from 'react';
import { socialLogout, userInfo } from '../apis/AuthApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedNickname = localStorage.getItem("nickname");
    const storedProfileImg = localStorage.getItem("profileImg");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setAccessToken(token);
    }
    if (storedNickname) {
      setNickname(storedNickname);
    }
    if (storedProfileImg) {
      setProfileImg(storedProfileImg);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const login = (token) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    getUserInfo(token);
  };

  const logout = () => {
    setAccessToken(null);
    setNickname("");
    setProfileImg("");
    setRole("");
    // socialLogout(accessToken)
    //   .then(res => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken"); // edit by SYB
    localStorage.removeItem("nickname");
    localStorage.removeItem("profileImg");
    localStorage.removeItem("role");
    //  })
    //  .catch(err => console.log(err))
  };

  const getUserInfo = (token) => {
    userInfo(token)
      .then(res => {
        const nick = res.data.data.nickname;
        const img = res.data.data.profileImageUrl;
        const userRole = res.data.data.role; 
        setNickname(nick);
        setProfileImg(img);
        setRole(userRole);
        localStorage.setItem("nickname", nick);
        localStorage.setItem("profileImg", img);
        localStorage.setItem("role", userRole);
      })
      .catch(err => console.log(err));
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, nickname, profileImg, role }}>
      {children}
    </AuthContext.Provider>
  );
};
