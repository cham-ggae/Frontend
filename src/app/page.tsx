"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Brain, Users, BarChart3, Sparkles, ArrowRight, CheckCircle, Star } from "lucide-react"
import LoginLogoutButton from "@/components/auth/LoginLogoutButton";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CommAI
            </span>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              <Sparkles className="w-3 h-3 mr-1" />
              Beta
            </Badge>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 hover:scale-105 transition-transform">
              <Star className="w-3 h-3 mr-1" />
              AI 기반 통신 분석
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              당신의 소통 스타일을
              <br />
              <span className="relative">
              AI가 분석합니다
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform scale-x-0 animate-[scaleX_2s_ease-in-out_0.5s_forwards]"></div>
            </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              최신 AI 기술로 당신의 대화 패턴을 분석하고, 개인화된 소통 개선 방안을 제시합니다.
            </p>

            <LoginLogoutButton />

          </div>

          {/* Feature Preview */}
          <div
              className={`grid md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {[
              {
                icon: MessageCircle,
                title: "대화 패턴 분석",
                description: "AI가 당신의 대화 스타일과 선호도를 정확히 파악합니다",
              },
              {
                icon: BarChart3,
                title: "상세한 리포트",
                description: "개인화된 분석 결과와 개선 방안을 제공합니다",
              },
              {
                icon: Users,
                title: "관계 개선",
                description: "더 나은 소통을 위한 맞춤형 조언을 받아보세요",
              },
            ].map((feature, index) => (
                <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div
              className={`text-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              왜{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CommAI</span>를
              선택해야 할까요?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              최첨단 AI 기술과 심리학적 분석을 결합하여 정확하고 유용한 인사이트를 제공합니다
            </p>
          </div>

          <div
              className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {[
              {
                title: "정확한 분석",
                description: "95% 이상의 정확도로 통신 패턴을 분석합니다",
                stat: "95%",
              },
              {
                title: "빠른 결과",
                description: "단 5분만에 상세한 분석 결과를 확인하세요",
                stat: "5분",
              },
              {
                title: "개인화",
                description: "당신만을 위한 맞춤형 개선 방안을 제시합니다",
                stat: "100%",
              },
              {
                title: "지속 지원",
                description: "분석 후에도 계속해서 성장을 도와드립니다",
                stat: "24/7",
              },
            ].map((item, index) => (
                <Card
                    key={index}
                    className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {item.stat}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-4">
            <div
                className={`text-center mb-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">어떻게 작동하나요?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                간단한 3단계로 당신의 소통 스타일을 분석하고 개선 방안을 제시합니다
              </p>
            </div>

            <div
                className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {[
                {
                  step: "01",
                  title: "로그인 & 설정",
                  description: "카카오 계정으로 간편하게 로그인하고 기본 정보를 입력하세요",
                  icon: Users,
                },
                {
                  step: "02",
                  title: "AI 분석",
                  description: "고급 AI 알고리즘이 당신의 대화 패턴과 소통 스타일을 분석합니다",
                  icon: Brain,
                },
                {
                  step: "03",
                  title: "결과 확인",
                  description: "상세한 분석 결과와 개인화된 개선 방안을 확인하세요",
                  icon: BarChart3,
                },
              ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-blue-600 mb-2">STEP {step.step}</div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    {index < 2 && (
                        <div className="hidden md:block absolute top-8 left-full w-full">
                          <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                        </div>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div
              className={`transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 바로 시작해보세요!</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              AI가 분석한 당신만의 소통 스타일을 확인하고, 더 나은 관계를 만들어가는 첫 걸음을 내딛어보세요.
            </p>


          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t py-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">CommAI</span>
            </div>
            <p className="text-sm">© 2024 CommAI. AI 기반 통신 성향 분석 서비스</p>
          </div>
        </footer>
      </div>
  )
}
