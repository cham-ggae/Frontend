import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/lib/store/authStore'

const API_BASE_URL = process.env.NEXT_PUBLIC_ADDR || 'http://localhost:8090'

/**
 * 리프레시 토큰으로 새 액세스 토큰 발급
 * auth.ts의 refreshAccessToken 함수와 동일
 */
const refreshAccessToken = async (): Promise<string> => {
    const response = await apiClient.post(
        '/refresh',
        {},                              // 빈 바디
        { withCredentials: true }        // ★ 이 옵션이 있어야 기존 refreshToken 쿠키가 전송됩니다
    )
    // 헤더에서 꺼낼 수도 있고
    const authHeader = response.headers['authorization'] || response.headers['Authorization']
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7)
    }
    // 아니면 바디에서 꺼내고
    if (response.data?.accessToken) {
        return response.data.accessToken as string
    }
    throw new Error('새 토큰을 찾을 수 없습니다')
}

/**
 * 인증이 불필요한 기본 API 클라이언트
 */
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
})

/**
 * 인증이 필요한 API 클라이언트
 */
export const authenticatedApiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
})


/** 토큰 갱신 상태 관리 */
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: Error | AxiosError) => void
}> = []

/**
 * 대기 중인 요청들 처리
 */
const processQueue = (error: Error | AxiosError | null, token: string | null = null) => {
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
 */
authenticatedApiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { accessToken } = useAuthStore.getState()

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
            console.log('🔐 Authorization 헤더 추가:', accessToken.substring(0, 20) + '...')
        } else {
            console.warn('⚠️ 액세스 토큰이 없습니다. 인증이 필요한 요청을 시도했습니다.')
        }

        return config
    },
    (error) => {
        console.error('요청 인터셉터 에러:', error)
        return Promise.reject(error)
    }
)

/**
 * 응답 인터셉터: 토큰 만료 시 자동 갱신
 */
authenticatedApiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('API 응답 성공:', response.config.url, response.status)
        return response
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        console.log('API 응답 에러:', error.response?.status, error.config?.url)

        // 403 에러이고 재시도하지 않은 경우
        if (error.response?.status === 403 && !originalRequest._retry) {
            console.log('403 에러 감지 - 토큰 갱신 시작')

            if (isRefreshing) {
                console.log('이미 토큰 갱신 중 - 대기열에 추가')
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
                console.log('새 토큰 요청 중...')
                const newToken = await refreshAccessToken()

                console.log('새 토큰 발급 성공')
                const { updateToken } = useAuthStore.getState()
                updateToken(newToken)

                // 대기 중인 요청들에 새 토큰 전달
                processQueue(null, newToken)

                // 원래 요청을 새 토큰으로 재시도
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return authenticatedApiClient(originalRequest)

            } catch (refreshError) {
                console.error('토큰 갱신 실패:', refreshError)

                // 대기 중인 요청들에게 에러 전달
                processQueue(refreshError as Error | AxiosError, null)

                // 로그아웃 처리
                const { clearAuth } = useAuthStore.getState()
                clearAuth()

                // 로그인 페이지로 리다이렉트 (브라우저 환경에서만)
                if (typeof window !== 'undefined') {
                    console.log('로그인 페이지로 리다이렉트')
                    window.location.href = '/login'
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)
