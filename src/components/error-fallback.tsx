"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme-context"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { useRouter } from "next/navigation"

interface ErrorFallbackProps {
    error: Error | any
    resetError?: () => void
    title?: string
    description?: string
}

export function ErrorFallback({
                                  error,
                                  resetError,
                                  title = "문제가 발생했습니다",
                                  description = "예상치 못한 오류가 발생했습니다."
                              }: ErrorFallbackProps) {
    const { isDarkMode } = useTheme()
    const router = useRouter()

    const getErrorMessage = () => {
        if (error?.response?.status === 403) {
            return "접근 권한이 없습니다."
        }
        if (error?.response?.status === 404) {
            return "요청한 정보를 찾을 수 없습니다."
        }
        if (error?.response?.status >= 500) {
            return "서버에 일시적인 문제가 발생했습니다."
        }
        return error?.message || description
    }

    return (
        <Card className={`max-w-md w-full ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <CardTitle className="text-xl text-red-600 dark:text-red-400">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {getErrorMessage()}
                </p>

                <div className="flex gap-2 justify-center">
                    {resetError && (
                        <Button
                            onClick={resetError}
                            variant="outline"
                            size="sm"
                            className="border-[#81C784] text-[#388E3C] hover:bg-[#81C784]/10"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            다시 시도
                        </Button>
                    )}

                    <Button
                        onClick={() => router.push('/')}
                        size="sm"
                        className="bg-[#81C784] hover:bg-[#388E3C]"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        홈으로
                    </Button>
                </div>

                {process.env.NODE_ENV === 'development' && error?.stack && (
                    <details className="text-left">
                        <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                            개발자 정보 보기
                        </summary>
                        <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 overflow-auto max-h-32">
                            {error.stack}
                        </pre>
                    </details>
                )}
            </CardContent>
        </Card>
    )
}
