"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Users, Sprout, Phone } from "lucide-react"
import Link from "next/link"
import { TypingAnimation } from "@/components/typing-animation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/contexts/theme-context"
import KakaoLoginButton from "@/components/login/kakaoLoginButton";

export default function HomePage() {
  const { isDarkMode } = useTheme()

  // Animation variants (이전 버전과 동일)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  }

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
        delay: 0,
      },
    },
  }

  const heroImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 1,
        delay: 0.5,
      },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.3, 0.2],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-green-50"}`}>


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TypingAnimation
              text="모두의 디지털 생활,"
              className={`text-5xl font-bold mb-6 leading-tight ${isDarkMode ? "text-white" : "text-green-800"}`}
              speed={150}
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.5 }}>
              <h1 className={`text-5xl font-bold mb-6 leading-tight ${isDarkMode ? "text-white" : "text-green-800"}`}>
                <span className="text-green-600">MODi</span>와 함께
              </h1>
            </motion.div>
            <motion.div
              className={`text-xl mb-8 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3 }}
            >
              <TypingAnimation
                text="최적의 통신 요금제 추천부터 가족과 함께하는 디지털 생활까지, MODi가 당신의 디지털 라이프를 더 스마트하게 만들어 드립니다."
                speed={50}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
            >
              <Link href="/basic-info">
                <KakaoLoginButton />
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Graphic */}
          <motion.div className="flex justify-center" variants={heroImageVariants} initial="hidden" animate="visible">
            <div className="relative">
              <div className="w-80 h-80 relative">
                <motion.div
                  className="absolute inset-0 bg-green-200 rounded-full opacity-30"
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.div
                  className="absolute top-8 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <div className="w-32 h-40 bg-green-500 rounded-t-full rounded-b-lg relative">
                    <motion.div
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Sprout className="w-8 h-8 text-green-800" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Feature Card 1 */}
          <motion.div variants={cardVariants} custom="left">
            <Card
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-green-200"} rounded-2xl hover:shadow-lg transition-shadow`}
            >
              <CardContent className="p-8 text-center">
                <motion.div
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MessageCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-green-800"}`}>
                  요금제 추천 챗봇
                </h3>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                  개인 맞춤형 통신 요금제를 AI 챗봇이 분석하고 추천해드립니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div variants={cardVariants} custom="top">
            <Card
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-green-200"} rounded-2xl hover:shadow-lg transition-shadow`}
            >
              <CardContent className="p-8 text-center">
                <motion.div
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Users className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-green-800"}`}>
                  가족 스페이스
                </h3>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                  가족 구성원과 함께 스페이스를 만들고 통신 생활을 공유하세요.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div variants={cardVariants} custom="bottom">
            <Card
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-green-200"} rounded-2xl hover:shadow-lg transition-shadow`}
            >
              <CardContent className="p-8 text-center">
                <motion.div
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sprout className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-green-800"}`}>
                  새싹 키우기
                </h3>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                  가족과 함께 새싹을 키우며 출석 체크와 활동을 통해 성장시켜보세요.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature Card 4 */}
          <motion.div variants={cardVariants} custom="right">
            <Card
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-green-200"} rounded-2xl hover:shadow-lg transition-shadow`}
            >
              <CardContent className="p-8 text-center">
                <motion.div
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-green-800"}`}>음성 기능</h3>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                  TTS와 STT 기능으로 더 편리하게 챗봇과 대화하세요.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <motion.section
          className={`${isDarkMode ? "bg-gray-800" : "bg-green-100/30"} py-24`}
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
              className={`text-5xl md:text-6xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-green-800"} leading-tight`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true }}
          >
            지금 바로 시작하세요
          </motion.h2>
          <motion.p
              className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
          >
            MODi와 함께 최적의 통신 요금제를 찾고, 가족과 함께 디지털 생활을 더 스마트하게 관리해보세요.
          </motion.p>
          <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
          >
            <Link href="/basic-info">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <KakaoLoginButton />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

    </div>
  )
}
