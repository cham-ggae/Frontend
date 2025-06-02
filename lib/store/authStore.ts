// lib/store/authStore.ts
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

/**
 * 사용자 정보 타입
 */
interface User {
    /** 사용자 이메일 */
    email: string
    /** 사용자 닉네임 */
    nickname: string
}

/**
 * 인증 상태 관리 스토어
 * - JWT 토큰을 메모리에만 저장하여 XSS 공격 방지
 * - 브라우저 종료 시 자동 로그아웃
 */
interface AuthState {
    /** JWT 액세스 토큰 (메모리 저장) */
    accessToken: string | null
    /** 사용자 정보 */
    user: User | null
    /** 인증 상태 */
    isAuthenticated: boolean
    /** 로딩 상태 */
    isLoading: boolean

    /** 로그인 시 인증 정보 설정 */
    setAuth: (token: string, user: User) => void
    /** 로그아웃 시 인증 정보 초기화 */
    clearAuth: () => void
    /** 로딩 상태 변경 */
    setLoading: (loading: boolean) => void
    /** 액세스 토큰만 업데이트 (토큰 갱신 시 사용) */
    updateToken: (token: string) => void
}

/**
 * 인증 상태 관리를 위한 Zustand 스토어
 *
 * @description
 * - 액세스 토큰: 메모리에만 저장하여 XSS 방지
 * - 리프레시 토큰: HttpOnly 쿠키로 백엔드에서 관리
 * - 브라우저 새로고침 시 토큰 검증 필요
 *
 * @example
 * ```typescript
 * const { isAuthenticated, user, setAuth } = useAuthStore()
 *
 * // 로그인 처리
 * setAuth(accessToken, userInfo)
 *
 * // 로그아웃 처리
 * clearAuth()
 * ```
 */
export const useAuthStore = create<AuthState>()(
    devtools(
        subscribeWithSelector((set, get) => ({
            accessToken: null,
            user: null,
            isAuthenticated: false,
            isLoading: true, // 초기에는 로딩 상태

            /**
             * 로그인 성공 시 인증 정보 설정
             *
             * @param token - JWT 액세스 토큰
             * @param user - 사용자 정보
             */
            setAuth: (token: string, user: User) => {
                set({
                    accessToken: token,
                    user,
                    isAuthenticated: true,
                    isLoading: false
                }, false, 'auth/setAuth')
            },

            /**
             * 로그아웃 또는 인증 실패 시 상태 초기화
             */
            clearAuth: () => {
                set({
                    accessToken: null,
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                }, false, 'auth/clearAuth')
            },

            /**
             * 로딩 상태 업데이트
             *
             * @param loading - 로딩 여부
             */
            setLoading: (loading: boolean) => {
                set({ isLoading: loading }, false, 'auth/setLoading')
            },

            /**
             * 토큰 갱신 시 액세스 토큰만 업데이트
             * 사용자 정보는 유지
             *
             * @param token - 새로운 JWT 액세스 토큰
             */
            updateToken: (token: string) => {
                set({ accessToken: token }, false, 'auth/updateToken')
            }
        })),
        {
            name: 'auth-store',
            // 개발 환경에서만 devtools 활성화
            enabled: process.env.NODE_ENV === 'development'
        }
    )
)


/**
 * 액세스 토큰 선택자
 * 토큰이 필요한 컴포넌트에서 사용
 *
 * @returns JWT 액세스 토큰 또는 null
 */
export const useAccessToken = () => useAuthStore(state => state.accessToken)

/**
 * 사용자 정보 선택자
 * 사용자 정보를 표시하는 컴포넌트에서 사용
 *
 * @returns 사용자 정보 또는 null
 */
export const useUser = () => useAuthStore(state => state.user)

/**
 * 인증 상태 선택자
 * 조건부 렌더링에 사용
 *
 * @returns 인증 여부
 */
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated)

/**
 * 로딩 상태 선택자
 * 로딩 스피너 표시에 사용
 *
 * @returns 로딩 여부
 */
export const useAuthLoading = () => useAuthStore(state => state.isLoading)

/**
 * 전체 인증 상태 선택자
 * 여러 상태가 필요한 컴포넌트에서 사용
 *
 * @returns 인증 관련 모든 상태
 */
export const useAuthState = () => useAuthStore(state => ({
    accessToken: state.accessToken,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading
}))

// ===== 타입 내보내기 =====
export type { User, AuthState }
