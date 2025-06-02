'use client'

import { useEffect, ReactNode } from 'react'
import { useAuthStore } from '@/lib/store/authStore'

interface AuthProviderProps {
    children: ReactNode
}

/**
 * 인증 상태 초기화 및 관리 Provider
 * - 앱 시작 시 토큰 확인 및 사용자 정보 복원
 * - 자동 로그아웃 처리
 */
export default function AuthProvider({ children }: AuthProviderProps) {
    const { setAuth, clearAuth, setLoading } = useAuthStore()

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // 로딩 시작
                setLoading(true)

                // 쿠키에서 토큰 확인
                const accessToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('accessToken='))
                    ?.split('=')[1]

                if (!accessToken) {
                    // 토큰이 없으면 비로그인 상태로 설정
                    clearAuth()
                    return
                }

                // 토큰이 있으면 사용자 정보 가져오기 시도
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })

                if (response.ok) {
                    const userData = await response.json()
                    // 로그인 상태로 설정
                    setAuth(accessToken, userData)
                } else {
                    // 토큰이 유효하지 않으면 쿠키 삭제 후 로그아웃
                    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                    clearAuth()
                }

            } catch (error) {
                console.error('Auth initialization failed:', error)
                // 에러 발생 시 안전하게 로그아웃 처리
                document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                clearAuth()
            }
        }

        // 클라이언트에서만 실행
        if (typeof window !== 'undefined') {
            initializeAuth()
        }
    }, [setAuth, clearAuth, setLoading])

    return <>{children}</>
}
