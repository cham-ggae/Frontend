import { authenticatedApiClient, apiClient } from './axios'
import { useAuthStore } from '@/lib/store/authStore'
import { refreshAccessToken } from './auth'

/** 토큰 갱신 진행 상태 */
let isRefreshing = false

/** 토큰 갱신 대기 중인 요청들 */
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: any) => void
}> = []

/**
 * 대기 중인 요청들을 처리
 * @param error - 에러 발생 시 전달할 에러 객체
 * @param token - 성공 시 전달할 새 토큰
 */
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve(token!)
        }
    })

    failedQueue = []
}

/**
 * 요청 인터셉터: JWT 토큰 자동 첨부
 * - Zustand 스토어에서 토큰 조회
 * - Authorization 헤더에 Bearer 토큰 설정
 */
authenticatedApiClient.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState()

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

/**
 * 응답 인터셉터: 토큰 만료 시 자동 갱신
 * - 401 에러 감지 시 리프레시 토큰으로 갱신
 * - 동시 요청들을 큐에서 관리하여 중복 갱신 방지
 * - 갱신 실패 시 자동 로그아웃 처리
 */
authenticatedApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // 401 에러이고 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                /**
                 * 이미 토큰 갱신 중인 경우 큐에 대기
                 * - 동시에 여러 API 호출 시 토큰 갱신 중복 방지
                 * - 갱신 완료 후 대기 중인 요청들 일괄 처리
                 */
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return authenticatedApiClient(originalRequest)
                }).catch((err) => {
                    return Promise.reject(err)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                // 리프레시 토큰으로 새 액세스 토큰 요청
                const newToken = await refreshAccessToken()
                const { updateToken } = useAuthStore.getState()

                // 스토어에 새 토큰 저장
                updateToken(newToken)

                // 대기 중인 요청들에 새 토큰 전달
                processQueue(null, newToken)

                // 원래 요청을 새 토큰으로 재시도
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return authenticatedApiClient(originalRequest)

            } catch (refreshError) {
                // 토큰 갱신 실패 시 처리
                processQueue(refreshError, null)

                // 로그아웃 처리
                const { clearAuth } = useAuthStore.getState()
                clearAuth()

                // 로그인 페이지로 리다이렉트
                window.location.href = '/auth/login'

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)
