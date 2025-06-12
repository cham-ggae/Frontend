'use client'
import { logout } from '@/service/member';
import { useAuthStore } from '@/store/useAuthStore';
import { handleApi } from '@/utils/handleApi';
import { useRouter } from 'next/navigation';
import React from 'react';

const KakaoLogoutBtn = () => {
  // 유저 정보 깔끔하게 지우는 커스텀 훅
  const clearUser = useAuthStore((s) => s.clearUser);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { data } = await handleApi(() => logout());
      alert(data?.message);
      localStorage.removeItem("accessToken");
      clearUser();
      router.replace("/login");
    } catch (e) {
      console.error("로그아웃 요청 오류:", e);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default KakaoLogoutBtn;