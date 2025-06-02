import axios from 'axios'
import { useAuthStore } from '@/lib/store/authStore'

const API_BASE_URL = process.env.NEXT_PUBLIC_ADDR || 'http://localhost:8090'

/**
 * 인증이 불필요한 기본 API 클라이언트
 * - 로그인, 회원가입 등 공개 API 호출용
 * - 쿠키 자동 전송으로 리프레시 토큰 관리
 */
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // HttpOnly 쿠키 자동 전송
    timeout: 10000,
})

/**
 * 인증이 필요한 API 클라이언트
 * - JWT 토큰 자동 첨부
 * - 토큰 만료 시 자동 갱신
 * - 보호된 리소스 접근용
 */
export const authenticatedApiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
})
