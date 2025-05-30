import KakaoLoginBtn from '@/components/login/KakaoLoginBtn';
import KakaoLogoutBtn from '@/components/login/KakaoLogoutBtn';
import TestBtn from '@/components/TestBtn';
import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <KakaoLoginBtn />
      <KakaoLogoutBtn />
      <TestBtn />
    </div>
  );
};

export default LoginPage;