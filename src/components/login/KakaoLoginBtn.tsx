'use client'
import React from 'react';

const KakaoLoginBtn = () => {
  const handleKakaoLogin = () => {
    // Spring 서버에 인가 요청
    window.location.href = "http://localhost:8090/authorize";
  };
  return (
    <div>
      <button onClick={handleKakaoLogin}>카카오 로그인</button>

    </div>
  );
};

export default KakaoLoginBtn;