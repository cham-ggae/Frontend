// components/layout/public/PublicFooter.tsx
"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'
import { Sprout, MessageCircle, Users, Heart, ExternalLink } from 'lucide-react'

/**
 * 퍼블릭 푸터 컴포넌트
 *
 * 브랜드 정보, 링크, 연락처 등을 포함하는 마케팅 사이트의 푸터입니다.
 * 사용자에게 추가적인 정보를 제공하고 브랜드 신뢰도를 높이는 역할을 합니다.
 *
 * 주요 구성 요소:
 * - 브랜드 소개 및 미션
 * - 주요 기능 링크
 * - 법적 정보 및 정책
 * - 소셜 미디어 링크 (향후 확장 가능)
 * - 저작권 정보
 */
export function PublicFooter() {
    const { isDarkMode } = useTheme()

    // 애니메이션 설정
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    }

    // 푸터 링크 섹션들
    const footerSections = [
        {
            title: '주요 기능',
            links: [
                { name: '요금제 추천', href: '#features', icon: <MessageCircle className="w-4 h-4" /> },
                { name: '가족 스페이스', href: '#family', icon: <Users className="w-4 h-4" /> },
                { name: '새싹 키우기', href: '#plant', icon: <Sprout className="w-4 h-4" /> }
            ]
        },
        {
            title: '서비스 정보',
            links: [
                { name: '서비스 소개', href: '/about' },
                { name: '요금제 가이드', href: '/guide' },
                { name: 'FAQ', href: '/faq' },
                { name: '고객 지원', href: '/support' }
            ]
        },
        {
            title: '법적 고지',
            links: [
                { name: '이용약관', href: '/terms' },
                { name: '개인정보처리방침', href: '/privacy' },
                { name: '쿠키 정책', href: '/cookies' }
            ]
        }
    ]

    return (
        <motion.footer
            className={`border-t transition-colors duration-200 ${
                isDarkMode
                    ? 'bg-gray-900 border-gray-800 text-gray-300'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* 메인 푸터 콘텐츠 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* 브랜드 섹션 */}
                    <motion.div className="lg:col-span-1" variants={itemVariants}>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <Sprout className="w-5 h-5 text-white" />
                            </div>
                            <span className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                                isDarkMode
                                    ? 'from-green-400 to-green-500'
                                    : 'from-green-600 to-green-700'
                            }`}>
                MODi
              </span>
                        </div>

                        <p className={`text-sm leading-relaxed mb-4 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            모두의 디지털 생활을 더 스마트하게 만드는 AI 기반 통신 서비스 플랫폼입니다.
                            가족과 함께 성장하는 새로운 경험을 제공합니다.
                        </p>

                        <div className="flex items-center space-x-1 text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                Made with
              </span>
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                by 참깨라면팀
              </span>
                        </div>
                    </motion.div>

                    {/* 링크 섹션들 */}
                    {footerSections.map((section, sectionIndex) => (
                        <motion.div key={section.title} variants={itemVariants}>
                            <h3 className={`font-semibold mb-4 ${
                                isDarkMode ? 'text-gray-200' : 'text-gray-900'
                            }`}>
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li
                                        key={link.name}
                                        variants={itemVariants}
                                        transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`flex items-center space-x-2 text-sm transition-colors duration-200 hover:text-green-500 ${
                                                isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-600'
                                            }`}
                                        >
                                            {link.icon && link.icon}
                                            <span>{link.name}</span>
                                            {link.href.startsWith('http') && (
                                                <ExternalLink className="w-3 h-3 opacity-50" />
                                            )}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* 하단 구분선 */}
                <motion.div
                    className={`border-t pt-8 ${
                        isDarkMode ? 'border-gray-800' : 'border-gray-200'
                    }`}
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

                        {/* 저작권 정보 */}
                        <div className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            <p>© 2025 MODi. All rights reserved.</p>
                            <p className="mt-1">
                                LG유플러스 유레카 프론트엔드 개발자 과정 - 3조 참깨라면팀
                            </p>
                        </div>

                        {/* 추가 정보 또는 인증 마크 (향후 확장용) */}
                        <div className="flex items-center space-x-4">
                            <motion.div
                                className={`text-xs px-3 py-1 rounded-full border ${
                                    isDarkMode
                                        ? 'border-gray-700 text-gray-400'
                                        : 'border-gray-300 text-gray-500'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                프로토타입 버전
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    )
}
