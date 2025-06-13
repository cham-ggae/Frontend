"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Mic, Volume2, Users } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/contexts/theme-context"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface FamilyMember {
  id: string
  name: string
  plan: string
  usage: string
  avatar: string
}

export default function ChatPage() {
  const { isDarkMode } = useTheme()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "안녕하세요! 개인 맞춤형 요금제 추천을 위한 MODi 챗봇입니다. 당신의 통신 상황에 맞는 최적의 요금제를 찾아드릴게요!",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isFamilyMode, setIsFamilyMode] = useState(false)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load family data from localStorage
    const familyData = localStorage.getItem("familyMembers")
    if (familyData) {
      setFamilyMembers(JSON.parse(familyData))
    } else {
      // Default family data if none exists
      setFamilyMembers([
        { id: "1", name: "아빠", plan: "5G 시그니처", usage: "45GB", avatar: "👨" },
        { id: "2", name: "엄마", plan: "5G 스탠다드", usage: "23GB", avatar: "👩" },
        { id: "3", name: "나", plan: "5G 프리미엄", usage: "67GB", avatar: "🧑" },
      ])
    }
  }, [])

  useEffect(() => {
    // Update initial message based on family mode
    if (isFamilyMode && familyMembers.length > 0) {
      setMessages([
        {
          id: "1",
          content: `안녕하세요! 가족 맞춤형 요금제 추천을 위한 MODi 챗봇입니다. 현재 ${familyMembers.length}명의 가족 구성원 정보를 바탕으로 최적의 가족 결합 요금제를 찾아드릴게요! 💕`,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    } else {
      setMessages([
        {
          id: "1",
          content:
            "안녕하세요! 개인 맞춤형 요금제 추천을 위한 MODi 챗봇입니다. 당신의 통신 상황에 맞는 최적의 요금제를 찾아드릴게요!",
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }
  }, [isFamilyMode, familyMembers])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const getAIResponse = (input: string) => {
    if (isFamilyMode) {
      // Family-focused responses
      if (input.includes("데이터") || input.includes("무제한")) {
        return `가족 구성원들의 데이터 사용량을 분석해보니, 총 ${familyMembers.reduce((total, member) => total + Number.parseInt(member.usage), 0)}GB를 사용하고 계시네요! 🪲 가족 무제한 데이터 쉐어링 요금제로 모든 가족이 함께 사용하시면 월 3-5만원 절약이 가능해요!`
      }

      if (input.includes("할인") || input.includes("절약")) {
        return `${familyMembers.length}명 가족 결합 시 최대 월 52,000원까지 절약 가능해요! 🏠 가족 투게더 할인 + 결합 할인으로 더 큰 혜택을 받아보세요. 각 구성원별 맞춤 요금제도 함께 추천드릴게요!`
      }

      if (input.includes("추천") || input.includes("요금제")) {
        return `가족 구성원 분석 결과를 바탕으로 추천드려요! 👨‍👩‍👧‍👦\n\n📱 ${familyMembers[0]?.name}: ${familyMembers[0]?.plan} 유지 추천\n📱 ${familyMembers[1]?.name}: 5G 라이트로 변경 시 월 15,000원 절약\n📱 ${familyMembers[2]?.name}: 현재 요금제 최적화\n\n💰 가족 결합 할인으로 총 월 45,000원 절약 가능!`
      }

      return `가족 모드에서 상담 중이에요! 👨‍👩‍👧‍👦 현재 ${familyMembers.length}명의 가족 구성원 정보를 바탕으로 최적의 가족 결합 요금제를 찾아드릴게요. 더 구체적인 질문을 해주시면 맞춤형 추천을 도와드려요!`
    } else {
      // Individual-focused responses
      if (input.includes("데이터") || input.includes("무제한")) {
        return "데이터를 많이 사용하시는군요! 🐝 호박벌형 같은 분이시네요. 완전 무제한 데이터 요금제와 OTT 번들 상품을 추천드려요!"
      }

      if (input.includes("가족") || input.includes("할인")) {
        return "가족 요금제에 관심이 있으시군요! 🪲 장수풍뎅이형이시네요. 가족 결합 요금제로 더 많은 할인 혜택을 받아보세요! 우측 상단의 가족 모드를 켜시면 더 자세한 가족 맞춤 상담이 가능해요!"
      }

      return "더 자세한 상담을 위해 설문조사를 진행해보시는 것은 어떨까요? 당신에게 딱 맞는 요금제를 찾아드릴게요!"
    }
  }

  const handleFamilyModeToggle = (checked: boolean) => {
    setIsFamilyMode(checked)
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Sidebar - Desktop */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className={`${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-[#81C784]"} border-b p-4`}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-[#388E3C]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  뒤로가기
                </Button>
              </Link>
              <h1 className="ml-4 text-xl font-semibold text-[#388E3C]">
                {isFamilyMode ? "가족 맞춤 챗봇" : "개인 맞춤 챗봇"}
              </h1>
            </div>

            {/* Family Mode Toggle */}
            <div className="flex items-center space-x-3">
              <Users
                className={`w-5 h-5 ${isFamilyMode ? "text-[#388E3C]" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="family-mode"
                  className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}
                >
                  가족 모드
                </Label>
                <Switch id="family-mode" checked={isFamilyMode} onCheckedChange={handleFamilyModeToggle} />
              </div>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-2">
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
              {isFamilyMode
                ? `가족 ${familyMembers.length}명의 통신 패턴에 맞는 최적의 결합 요금제를 추천받아보세요.`
                : "개인의 통신 패턴에 맞는 최적의 요금제를 추천받아보세요."}
            </p>
          </div>
        </header>

        {/* Family Members Info (when family mode is on) */}
        {isFamilyMode && (
          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-[#F1F8E9] border-[#81C784]"} border-b p-4`}
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center space-x-4 overflow-x-auto">
                <span
                  className={`text-sm font-medium whitespace-nowrap ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}
                >
                  가족 구성원:
                </span>
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full whitespace-nowrap ${
                      isDarkMode ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <span className="text-lg">{member.avatar}</span>
                    <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
                      {member.name}
                    </span>
                    <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{member.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#81C784] flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-white text-xs font-bold">{isFamilyMode ? "👨‍👩‍👧‍👦" : "AI"}</span>
                  </div>
                )}
                <Card
                  className={`max-w-[80%] ${
                    message.isUser
                      ? "bg-[#388E3C] text-white border-[#388E3C]"
                      : isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-[#81C784]"
                  }`}
                >
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <div className="flex justify-end items-center mt-1">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {!message.isUser && (
                        <Button variant="ghost" size="sm" className="ml-2 p-1 h-auto">
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-[#81C784]"} border-t p-4`}>
          <div className="max-w-5xl mx-auto flex gap-2">
            <Button variant="outline" size="icon" className="border-[#81C784] text-[#388E3C]">
              <Mic className="w-4 h-4" />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isFamilyMode ? "가족 요금제에 대해 궁금한 점을 물어보세요..." : "메시지를 입력하세요..."}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className={`flex-1 border-[#81C784] focus-visible:ring-[#81C784] ${
                isDarkMode ? "bg-gray-700 text-white" : ""
              }`}
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-[#81C784] hover:bg-[#388E3C]">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
