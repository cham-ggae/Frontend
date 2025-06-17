// app/(public)/layout.tsx
import React from 'react'
import { PublicHeader } from '@/components/layout/public/PublicHeader'
import { PublicFooter } from '@/components/layout/public/PublicFooter'

interface PublicLayoutProps {
    children: React.ReactNode
}

/**
 * 퍼블릭 레이아웃 컴포넌트
 *
 * 로그인이 필요하지 않은 페이지들(메인, 로그인, 회원가입 등)을 위한 레이아웃입니다.
 *
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">

            <PublicHeader />
            <main className="flex-1">
                {children}
            </main>
            <PublicFooter />
        </div>
    )
}
