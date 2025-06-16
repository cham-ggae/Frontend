import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeProvider } from "@/contexts/theme-context"
import { FamilySpaceProvider } from "@/contexts/family-space-context"
import { PlantProvider } from "@/contexts/plant-context"
import { QueryProvider } from "@/components/providers/QueryProvider"
import AuthProvider from "@/components/providers/AuthProvider"
import { Toaster } from "sonner" // 토스트 알림용

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "MODi - 스마트한 통신 생활의 시작",
    description: "개인 맞춤형 요금제 추천 및 가족 통신 관리 서비스",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko">
        <body className={inter.className}>
        <ThemeProvider>
            <QueryProvider>
                <AuthProvider>
                    <FamilySpaceProvider>
                        <PlantProvider>
                            {/* Mobile Navigation Header */}
                            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-[#81C784] p-4 flex items-center">
                                <MobileNav />
                                <div className="ml-2 text-xl font-bold text-[#388E3C]">MODi</div>
                            </div>

                            {/* Main Content */}
                            <div className="md:pt-0 pt-16">
                                {children}
                            </div>

                            {/* Toast Notifications */}
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    duration: 4000,
                                    style: {
                                        background: 'var(--background)',
                                        color: 'var(--foreground)',
                                        border: '1px solid var(--border)',
                                    },
                                }}
                            />
                        </PlantProvider>
                    </FamilySpaceProvider>
                </AuthProvider>
            </QueryProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
