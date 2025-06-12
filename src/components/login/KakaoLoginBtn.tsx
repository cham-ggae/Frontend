'use client'
import React from 'react';

const KakaoLoginBtn = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}` +
      `&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}` +
      `&response_type=code`;
    window.location.href = kakaoAuthUrl;
    // window.location.href = 'http://localhost:8090/authorize';
  };
  return (
    <div>
      <button onClick={handleKakaoLogin}>카카오 로그인</button>

    </div>
  );
};

export default KakaoLoginBtn;