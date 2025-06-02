'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Loader2, LogOut } from 'lucide-react'
import { useState } from 'react'

interface LoginLogoutButtonProps {
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    className?: string
}

export default function LoginLogoutButton({
                                              variant = 'default',
                                              size = 'default',
                                              className = ''
                                          }: LoginLogoutButtonProps) {
    const { user, isAuthenticated, isLoading, login, logout } = useAuth()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            await logout()
        } catch (error) {
            console.error('로그아웃 실패:', error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    // 로딩 상태
    if (isLoading) {
        return (
            <Button variant={variant} size={size} disabled className={className}>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                로딩 중
            </Button>
        )
    }

    // 로그인된 상태 - 로그아웃 버튼
    if (isAuthenticated) {
        return (
            <Button
                variant="outline"
                size={size}
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`text-gray-700 hover:text-red-600 hover:border-red-300 hover:bg-red-50 ${className}`}
            >
                {isLoggingOut ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        로그아웃 중...
                    </>
                ) : (
                    <>
                        <LogOut className="h-4 w-4 mr-2" />
                        로그아웃
                    </>
                )}
            </Button>
        )
    }

    // 로그인 필요한 상태 - 카카오 로그인 버튼
    return (
        <Button
            variant={variant}
            size={size}
            onClick={login}
            className={`bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-400 hover:border-yellow-500 ${className}`}
        >
            <svg
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            카카오 로그인
        </Button>
    )
}
