import { apiClient, authenticatedApiClient } from './axios'
import { useAuthStore } from '@/lib/store/authStore'

/** 카카오 로그인 성공 응답 */
export interface LoginResponse {
    /** 사용자 이메일 */
    email: string
    /** 사용자 닉네임 */
    nickname: string
}

/** 카카오 콜백 요청 */
export interface KakaoCallbackRequest {
    /** 카카오에서 전달받은 인가 코드 */
    code: string
}

/**
 * 카카오 로그인 페이지로 리다이렉트
 * - 카카오 OAuth 인증 플로우 시작
 * - 사용자를 카카오 로그인 페이지로 이동
 */
export const startKakaoLogin = (): void => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/authorize`
}

/**
 * 카카오 OAuth 콜백 처리
 * - 인가 코드로 JWT 토큰 교환
 * - 사용자 정보 조회 및 스토어 저장
 * - 회원가입/로그인 처리
 *
 * @param code - 카카오에서 전달받은 인가 코드
 * @returns 사용자 정보 (이메일, 닉네임)
 * @throws 토큰 교환 실패 시 에러
 */
export const handleKakaoCallback = async (code: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/kakao', { code })

    // Authorization 헤더에서 JWT 토큰 추출
    const authHeader = response.headers.authorization
    const accessToken = authHeader?.replace('Bearer ', '')

    if (!accessToken) {
        throw new Error('액세스 토큰을 받지 못했습니다')
    }

    // Zustand 스토어에 인증 정보 저장
    const { setAuth } = useAuthStore.getState()
    setAuth(accessToken, response.data)

    return response.data
}

/**
 * JWT 액세스 토큰 갱신
 * - HttpOnly 쿠키의 리프레시 토큰으로 새 액세스 토큰 발급
 * - 자동 토큰 갱신 시스템에서 사용
 *
 * @returns 새로운 JWT 액세스 토큰
 * @throws 토큰 갱신 실패 시 에러 (로그아웃 처리됨)
 */
export const refreshAccessToken = async (): Promise<string> => {
    const response = await apiClient.post('/refresh')

    // 새로운 액세스 토큰이 응답 헤더에 포함되어야 함
    const authHeader = response.headers.authorization
    const newToken = authHeader?.replace('Bearer ', '')

    if (!newToken) {
        throw new Error('새로운 액세스 토큰을 받지 못했습니다')
    }

    return newToken
}

/**
 * 사용자 로그아웃 처리
 * - 서버에 로그아웃 요청 (카카오 토큰 무효화)
 * - 로컬 인증 상태 초기화
 * - API 실패해도 로컬 상태는 초기화
 */
export const logout = async (): Promise<void> => {
    try {
        await authenticatedApiClient.post('/logout')
    } catch (error) {
        console.error('로그아웃 API 호출 실패:', error)
        // 서버 로그아웃 실패해도 로컬은 초기화
    } finally {
        // 로컬 상태 초기화 (항상 실행)
        const { clearAuth } = useAuthStore.getState()
        clearAuth()
    }
}

/**
 * 인증이 필요한 API 테스트
 * - JWT 토큰 검증 및 인증 상태 확인용
 * - 토큰 만료 시 자동 갱신 테스트
 *
 * @returns 성공 메시지
 * @throws 인증 실패 시 에러
 */
export const testProtectedApi = async (): Promise<string> => {
    const response = await authenticatedApiClient.get<string>('/test')
    return response.data
}
