"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'
import { ThemeToggle } from '@/components/theme-toggle'
import KakaoLoginButton from '@/components/login/kakaoLoginButton'
import { Menu, X, MessageCircle, Users, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * 퍼블릭 헤더 컴포넌트
 *
 * 로그인 전 사용자가 보는 헤더로, 브랜드 소개와 주요 기능 안내에 집중합니다.
 * 모바일과 데스크톱에서 모두 최적화된 네비게이션을 제공합니다.
 *
 * 주요 기능:
 * - 브랜드 로고와 이름 표시
 * - 주요 기능 소개 네비게이션
 * - 테마 토글 (다크/라이트 모드)
 * - 카카오 로그인 버튼
 * - 반응형 모바일 메뉴
 */
export function PublicHeader() {
    const { isDarkMode } = useTheme()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // 모바일 메뉴 토글 함수
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    // 네비게이션 메뉴 아이템들
    const navigationItems = [
        {
            href: '#features',
            label: '주요 기능',
            icon: <MessageCircle className="w-4 h-4" />,
            description: '요금제 추천 챗봇'
        },
        {
            href: '#family',
            label: '가족 스페이스',
            icon: <Users className="w-4 h-4" />,
            description: '가족과 함께하는 통신 관리'
        },
        {
            href: '#plant',
            label: '새싹 키우기',
            icon: <Sprout className="w-4 h-4" />,
            description: '성장형 UX 경험'
        }
    ]

    return (
        <motion.header
            className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
                isDarkMode
                    ? 'bg-gray-900/95 border-gray-800 backdrop-blur-sm'
                    : 'bg-white/95 border-gray-200 backdrop-blur-sm'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* 브랜드 로고 및 이름 */}
                    <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <Link href="/" className="flex items-center space-x-2 group">
                            {/* 로고 아이콘 - 브랜드의 새싹 컨셉을 반영 */}
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <Sprout className="w-5 h-5 text-white" />
                            </div>
                            {/* 브랜드 이름 */}
                            <span className={`text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent ${
                                isDarkMode ? 'from-green-400 to-green-500' : 'from-green-600 to-green-700'
                            }`}>
                MODi
              </span>
                        </Link>
                    </motion.div>

                    {/* 데스크톱 네비게이션 */}
                    <motion.nav
                        className="hidden md:flex items-center space-x-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {navigationItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`group flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                                        isDarkMode
                                            ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                                            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.nav>

                    {/* 우측 액션 버튼들 */}
                    <motion.div
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* 테마 토글 버튼 */}
                        <ThemeToggle className="hidden sm:flex" />

                        {/* 카카오 로그인 버튼 - 데스크톱용 */}
                        <div className="hidden md:block">
                            <KakaoLoginButton />
                        </div>

                        {/* 모바일 메뉴 버튼 */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            className="md:hidden"
                            aria-label="메뉴 열기"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* 모바일 메뉴 - 애니메이션과 함께 표시/숨김 */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={`md:hidden border-t ${
                            isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
                        }`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-4 py-6 space-y-4">
                            {/* 모바일 네비게이션 아이템들 */}
                            {navigationItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                            isDarkMode
                                                ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                                                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                        }`}
                                    >
                                        {item.icon}
                                        <div>
                                            <div className="font-medium">{item.label}</div>
                                            <div className={`text-sm ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                {item.description}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* 모바일용 액션 버튼들 */}
                            <motion.div
                                className="pt-4 border-t space-y-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: 0.2 }}
                            >
                                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    테마 설정
                  </span>
                                    <ThemeToggle />
                                </div>

                                <div className="pt-2">
                                    <KakaoLoginButton />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
