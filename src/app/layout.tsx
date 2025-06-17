// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { FamilySpaceProvider } from "@/contexts/family-space-context"
import { PlantProvider } from "@/contexts/plant-context"
import { QueryProvider } from "@/components/providers/QueryProvider"
import AuthProvider from "@/components/providers/AuthProvider"
import { Toaster } from "sonner"

// Google Fonts 설정
const inter = Inter({
    subsets: ["latin"],
    display: 'swap', // 폰트 로딩 최적화
    variable: '--font-inter'
})

// 메타데이터 설정 - SEO 최적화
export const metadata: Metadata = {
    title: {
        default: "MODi - 스마트한 통신 생활의 시작",
        template: "%s | MODi"
    },
    description: "AI 기반 개인 맞춤형 요금제 추천 및 가족 통신 관리 서비스. 가족과 함께 성장하는 디지털 라이프를 경험하세요.",
    keywords: ["요금제", "통신", "가족", "AI", "추천", "MODi", "디지털라이프"],
    authors: [{ name: "참깨라면팀" }],
    creator: "참깨라면팀",
    publisher: "LG유플러스 유레카",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    // Open Graph 메타데이터 (소셜 미디어 공유용)
    openGraph: {
        title: "MODi - 모두의 디지털 생활",
        description: "가족과 함께하는 스마트한 통신 관리 플랫폼",
        url: "https://modi-app.vercel.app",
        siteName: "MODi",
        locale: "ko_KR",
        type: "website",
    },
    // Twitter 카드 설정
    twitter: {
        card: "summary_large_image",
        title: "MODi - 모두의 디지털 생활",
        description: "가족과 함께하는 스마트한 통신 관리 플랫폼",
        creator: "@modi_app",
    },
    // 추가 메타데이터
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

/**
 * 루트 레이아웃 컴포넌트
 *
 * 전체 애플리케이션의 최상위 레이아웃으로, 모든 페이지에 공통으로 적용되는 설정들을 포함
 * UI 요소는 포함하지 않고, 순수하게 전역 상태 관리와 설정만을 담당.
 *
 */
interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="ko" className={inter.variable}>
        <head>
            {/* 뷰포트 설정 - 모바일 최적화 */}
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            {/* 파비콘 및 아이콘 설정 */}
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />

            {/* 테마 색상 설정 */}
            <meta name="theme-color" content="#388E3C" />
            <meta name="msapplication-TileColor" content="#388E3C" />

            {/* 웹 매니페스트 (PWA 대응) */}
            <link rel="manifest" href="/manifest.json" />
        </head>

        <body className={`${inter.className} antialiased`}>
        {/* 
          Provider 계층 구조
          외부에서 내부로: Theme → Query → Auth → Family → Plant
          이 순서는 의존성에 따라 결정되었습니다.
        */}

        {/* 1. 테마 Provider - 모든 컴포넌트에서 테마 상태를 사용할 수 있도록 최상위에 위치 */}
        <ThemeProvider>

            {/* 2. React Query Provider - 서버 상태 관리 */}
            <QueryProvider>

                {/* 3. 인증 Provider - 사용자 인증 상태 관리 */}
                <AuthProvider>

                    {/* 4. 가족 스페이스 Provider - 가족 관련 상태 관리 */}
                    <FamilySpaceProvider>

                        {/* 5. 식물 키우기 Provider - 게임 관련 상태 관리 */}
                        <PlantProvider>

                            {/*
                    메인 콘텐츠 영역
                    각 페이지 그룹의 레이아웃이 여기에 렌더링됩니다.
                    - (public) 그룹: PublicLayout
                    - (dashboard) 그룹: DashboardLayout
                    - 기타 페이지: 기본 레이아웃 없음
                  */}
                            <div className="min-h-screen bg-background text-foreground">
                                {children}
                            </div>

                            {/*
                    전역 알림 시스템 (Toast)
                    모든 페이지에서 사용할 수 있는 알림 컴포넌트
                    성공, 오류, 정보 등의 메시지를 사용자에게 표시
                  */}
                            <Toaster
                                position="top-right"
                                expand={true}
                                richColors={true}
                                closeButton={true}
                                toastOptions={{
                                    duration: 4000,
                                    style: {
                                        background: 'hsl(var(--background))',
                                        color: 'hsl(var(--foreground))',
                                        border: '1px solid hsl(var(--border))',
                                    },
                                    classNames: {
                                        error: 'border-red-500',
                                        success: 'border-green-500',
                                        warning: 'border-yellow-500',
                                        info: 'border-blue-500',
                                    }
                                }}
                            />

                        </PlantProvider>
                    </FamilySpaceProvider>
                </AuthProvider>
            </QueryProvider>
        </ThemeProvider>

        {/* 
          개발 환경에서만 표시되는 개발자 도구
          프로덕션 빌드에서는 자동으로 제거됩니다.
        */}
        {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 right-4 z-50">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-50">
                    DEV MODE
                </div>
            </div>
        )}
        </body>
        </html>
    )
}

/**
 * 에러 바운더리 컴포넌트
 *
 * 전역 에러 처리를 위한 컴포넌트입니다.
 */
export function GlobalErrorBoundary({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

/**
 * 조건부 Provider 래퍼 (향후 최적화용)
 *
 * 특정 조건에서만 Provider를 로드하여 성능을 최적화할 수 있습니다.
 * 예: 로그인한 사용자에게만 FamilySpaceProvider를 제공
 */
interface ConditionalProviderProps {
    condition: boolean
    provider: React.ComponentType<{ children: React.ReactNode }>
    children: React.ReactNode
}

export function ConditionalProvider({
                                        condition,
                                        provider: Provider,
                                        children
                                    }: ConditionalProviderProps) {
    if (condition) {
        return <Provider>{children}</Provider>
    }
    return <>{children}</>
}
