import React from 'react'
import './css/KakaoButton.css'

const KakaoButton = ({ onClick }) => {
  return (
    <button className='kakao-button' onClick={onClick}>로그아웃</button>
  )
}

export default KakaoButton