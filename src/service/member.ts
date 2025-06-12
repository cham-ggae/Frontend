import { authenticatedApiClient } from '@/lib/api/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { logoutInfo, userInfo } from '@/types/member';
import api from '@/utils/http-commons'


export const login = async (code: string): Promise<userInfo> => {
  const res = await api.post('/kakao', { code });
  // 1) 헤더에서 액세스 토큰 읽어서 로컬에 저장
  const accessToken = res.headers["authorization"]?.split(" ")[1];
  if (!accessToken) throw new Error("토큰이 없습니다");
  const { email, nickname } = res.data;
  // Zustand store에 저장
  useAuthStore.getState().setUser({ email, nickname, accessToken });
  return res.data;
}

export const logout = async (): Promise<logoutInfo> => {
  const { data } = await api.post("/logout");
  return data;
}

export const test = async (): Promise<string> => {
  const { data } = await authenticatedApiClient.get("/test");
  return data;
}