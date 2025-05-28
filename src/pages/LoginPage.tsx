import KakaoLoginBtn from '@/components/login/KakaoLoginBtn';
import KakaoLogoutBtn from '@/components/login/KakaoLogoutBtn';
import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <KakaoLoginBtn />
      <KakaoLogoutBtn />
    </div>
  );
};

export default LoginPage;