"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Users, Plus } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/contexts/theme-context"
import { useFamilySpace } from "@/contexts/family-space-context"

export default function DashboardPage() {
  const [inviteCode, setInviteCode] = useState("")
  const { isDarkMode } = useTheme()
  const { hasFamilySpace, createFamilySpace } = useFamilySpace()

  const handleCreateFamilySpace = () => {
    // Create default family members
    const defaultFamilyMembers = [
      { id: "1", name: "아빠", plan: "5G 시그니처", usage: "45GB", avatar: "👨" },
      { id: "2", name: "엄마", plan: "5G 스탠다드", usage: "23GB", avatar: "👩" },
      { id: "3", name: "나", plan: "5G 프리미엄", usage: "67GB", avatar: "🧑" },
    ]

    createFamilySpace(defaultFamilyMembers)
    alert("가족 스페이스가 생성되었습니다!")
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Sidebar - Desktop */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-[#388E3C] mb-2">
            안녕하세요! MODi와 함께 스마트한 통신 생활을 시작해보세요 🌱
          </h1>
          <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} mb-8`}>
            이제 모든 기능을 자유롭게 이용하실 수 있습니다.
          </p>

          {/* Family Invitation Section */}
          <Card className={`mb-8 border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#388E3C]" />
                <h2 className="text-lg font-semibold text-[#388E3C]">가족과 함께 시작하기</h2>
              </div>
              {hasFamilySpace ? (
                <div>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} mb-4`}>
                    가족 스페이스가 생성되었습니다! 이제 가족 스페이스와 새싹 키우기 기능을 이용할 수 있습니다.
                  </p>
                  <div className="flex gap-2">
                    <Link href="/family-space" className="flex-1">
                      <Button className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white">
                        가족 스페이스 바로가기
                      </Button>
                    </Link>
                    <Link href="/plant-game" className="flex-1">
                      <Button className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white">
                        새싹 키우기 바로가기
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} mb-4`}>
                    가족 구성원으로부터 초대 코드를 받으셨나요?
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="초대 코드를 입력하세요 (예: FAM-8392)"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="border-[#81C784] focus-visible:ring-[#81C784]"
                    />
                    <Button className="bg-[#81C784] hover:bg-[#388E3C] text-white">참여하기</Button>
                  </div>
                  <div className="mt-4">
                    <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} mb-2`}>
                      또는 새로운 가족 스페이스를 만들어보세요:
                    </p>
                    <Button
                      className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white"
                      onClick={handleCreateFamilySpace}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      가족 스페이스 만들기
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Mode Card */}
            <Card
              className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-[#388E3C]" />
                  <h2 className="text-lg font-semibold text-[#388E3C]">개인 모드로 시작하기</h2>
                </div>
                <div className="mb-4">
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} mb-2`}>
                    나만의 맞춤형 요금제 추천받기
                  </p>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
                    개인의 통신 사용 패턴을 분석하여 최적의 요금제를 추천받아보세요.
                  </p>
                </div>
                <Link href="/chat">
                  <Button className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white">개인 챗봇 시작하기</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Family Space Card */}
            <Card
              className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-5 h-5 text-[#388E3C]" />
                  <h2 className="text-lg font-semibold text-[#388E3C]">
                    {hasFamilySpace ? "가족 스페이스 관리하기" : "새 가족 스페이스 만들기"}
                  </h2>
                </div>
                <div className="mb-4">
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} mb-2`}>
                    {hasFamilySpace ? "가족과 함께 통신 생활 관리하기" : "가족 구성원들을 초대하여 함께 시작하기"}
                  </p>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
                    {hasFamilySpace
                      ? "가족 스페이스에서 메시지 카드를 주고받고 함께 새싹을 키워보세요."
                      : "가족 스페이스를 만들고 구성원들을 초대하여 함께 통신 생활을 관리해보세요."}
                  </p>
                </div>
                {hasFamilySpace ? (
                  <Link href="/family-space">
                    <Button className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white">
                      가족 스페이스 바로가기
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white"
                    onClick={handleCreateFamilySpace}
                  >
                    가족 스페이스 만들기
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
