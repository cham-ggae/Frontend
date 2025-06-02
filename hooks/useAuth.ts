import { useAuthStore } from '@/lib/store/authStore'
import { startKakaoLogin, logout as apiLogout } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'

/**
 * 인증 관련 상태와 액션을 제공하는 커스텀 훅
 * - Zustand 스토어와 API 함수들을 연결
 * - 컴포넌트에서 사용하기 쉬운 인터페이스 제공
 * - 로그인/로그아웃 시 자동 라우팅 처리
 */
export const useAuth = () => {
    const router = useRouter()
    const {
        user,
        isAuthenticated,
        isLoading,
        clearAuth,
        setLoading
    } = useAuthStore()

    /**
     * 카카오 로그인 시작
     * - 카카오 OAuth 페이지로 리다이렉트
     * - 로그인 완료 후 콜백 처리는 별도 페이지에서 담당
     */
    const login = () => {
        startKakaoLogin()
    }

    /**
     * 사용자 로그아웃 처리
     * - 서버에 로그아웃 API 호출
     * - 로컬 상태 초기화
     * - 로그인 페이지로 자동 이동
     * - API 실패해도 로컬 상태는 초기화됨
     */
    const logout = async () => {
        setLoading(true)
        try {
            await apiLogout()
            router.push('/auth/login')
        } catch (error) {
            console.error('로그아웃 실패:', error)
            // 서버 로그아웃 실패해도 로컬 로그아웃은 진행
        } finally {
            setLoading(false)
        }
    }

    return {
        /** 현재 로그인한 사용자 정보 */
        user,
        /** 인증 상태 (로그인 여부) */
        isAuthenticated,
        /** 로딩 상태 (로그인/로그아웃 진행 중) */
        isLoading,
        /** 로그인 시작 함수 */
        login,
        /** 로그아웃 함수 */
        logout
    }
}
