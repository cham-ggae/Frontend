"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, History, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/contexts/theme-context"

interface UserInfo {
  name: string
  email: string
  profileImage: string
  gender: string
  ageGroup: string
  joinDate: string
  userType: string
  testDate: string
}

interface RecommendationHistory {
  id: string
  type: string
  date: string
  isSkipped: boolean
}

export default function MyPage() {
  const { isDarkMode } = useTheme()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "김모디",
    email: "modi@kakao.com",
    profileImage: "/images/modi.png",
    gender: "남성",
    ageGroup: "20-30대",
    joinDate: "2024-01-15",
    userType: "호박벌형",
    testDate: "2024-01-20",
  })

  const [recommendationHistory, setRecommendationHistory] = useState<RecommendationHistory[]>([])

  useEffect(() => {
    // Load user data from localStorage
    const basicInfo = localStorage.getItem("userBasicInfo")
    const history = localStorage.getItem("recommendationHistory")

    if (basicInfo) {
      const { gender, ageGroup } = JSON.parse(basicInfo)
      setUserInfo((prev) => ({ ...prev, gender, ageGroup }))
    }

    if (history) {
      setRecommendationHistory(JSON.parse(history))
    }
  }, [])

  const getUserTypeEmoji = (type: string) => {
    const typeMap: Record<string, string> = {
      호박벌형: "🐝",
      장수풍뎅이형: "🪲",
      무당벌레형: "🐞",
      개미형: "🐜",
      나비형: "🦋",
    }
    return typeMap[type] || "🌱"
  }

  const getUserTypeInfo = (type: string) => {
    const typeInfoMap: Record<string, any> = {
      호박벌형: {
        subtitle: "데이터 쏘는 꿀벌",
        description: "유튜브, 넷플릭스 등 OTT를 즐겨보며 하루 종일 데이터 풀가동!",
        personality: "부지런하고 활동적. 틈만 나면 영상 콘텐츠를 탐색하는 정보 소비꾼!",
        recommendation: "5G 프리미어 에센셜, 5G 프리미어 레귤러",
        message: "꿀벌형인 당신, 멈추지 마세요! 꿀처럼 달콤한 무제한 요금제를 추천해요🍯",
      },
      장수풍뎅이형: {
        subtitle: "내 가족은 내가 지킨다",
        description: "가족과 함께 요금제를 묶고 할인까지 챙기는 전략형 사용자",
        personality: "든든하고 실속파. 가족을 생각하는 따뜻한 계획형 소비자",
        recommendation: "U+투게더 결합, 참 쉬운 가족 결합",
        message: "장수풍뎅이형이라면 가족이 먼저! 함께 쓰면 더 커지는 할인 혜택을 받아보세요🪲",
      },
      무당벌레형: {
        subtitle: "TMI 유발 대화형",
        description: "통화량 많고, 하루 1~2시간은 기본. 문자보다 전화가 편한 타입",
        personality: "수다쟁이, 사람들과의 대화가 에너지 원천인 커뮤니케이터",
        recommendation: "LTE 선택형 요금제, 5G 심플+, 유쓰 5G 스탠다드",
        message: "무당벌레형은 통화가 생명! 무제한으로 수다 떨어도 부담 없는 요금제를 추천해요📞",
      },
      개미형: {
        subtitle: "티끌 모아 태산이겠지",
        description: "데이터는 아껴 쓰고, 통화도 적은 알뜰한 소비자",
        personality: "검소하고 실속형. 요금제는 작아도 충분히 만족!",
        recommendation: "유쓰 5G 미니, 유쓰 5G 슬림+",
        message: "개미형이라면 한 방울도 아깝지요! 알뜰한 당신에게 꼭 맞는 요금제가 있어요🍃",
      },
      나비형: {
        subtitle: "알잘딱깔센 혜택중심형",
        description: "약정 할인, 멤버십, 기기 혜택 등 총체적 혜택을 고려하는 합리주의자",
        personality: "감각적이고 계획적인 소비자. 혜택을 꼼꼼히 따져서 결정함",
        recommendation: "5G 프리미어 플러스, U+ 멤버십 결합 상품",
        message: "나비형은 아름답게 혜택을 날개처럼 펼치죠🦋 지금 당신에게 가장 유리한 조건으로 안내할게요!",
      },
    }
    return typeInfoMap[type] || typeInfoMap["개미형"]
  }

  const currentTypeInfo = getUserTypeInfo(userInfo.userType)

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Sidebar - Desktop */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#388E3C]">마이페이지</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Profile */}
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <CardHeader>
                <CardTitle className="flex items-center text-[#388E3C]">
                  <User className="w-5 h-5 mr-2" />
                  사용자 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <Image
                    src={userInfo.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className={`font-semibold text-xl ${isDarkMode ? "text-white" : "text-[#4E342E]"}`}>
                      {userInfo.name}
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>{userInfo.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"}`}>
                    <span className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 block`}>성별</span>
                    <span className="font-medium text-[#388E3C]">{userInfo.gender}</span>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"}`}>
                    <span className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 block`}>
                      나이대
                    </span>
                    <span className="font-medium text-[#388E3C]">{userInfo.ageGroup}</span>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"}`}>
                    <span className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 block`}>
                      가입일
                    </span>
                    <span className="font-medium text-[#388E3C]">{userInfo.joinDate}</span>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"}`}>
                    <span className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 block`}>
                      검사일
                    </span>
                    <span className="font-medium text-[#388E3C]">{userInfo.testDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Type */}
            <Card className="border border-[#81C784] bg-gradient-to-br from-[#81C784] to-[#388E3C] text-white">
              <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                <div className="text-6xl mb-4">{getUserTypeEmoji(userInfo.userType)}</div>
                <h3 className="text-2xl font-bold mb-2">{userInfo.userType}</h3>
                <p className="text-green-100 text-sm mb-2">{currentTypeInfo.subtitle}</p>
                <p className="text-green-100 text-xs mb-4">{currentTypeInfo.description}</p>
                <Link href="/survey">
                  <Button className="bg-white text-[#388E3C] hover:bg-gray-100">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    다시 검사하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* User Type Details */}
          <Card className={`mt-6 border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader>
              <CardTitle className="text-[#388E3C]">
                {getUserTypeEmoji(userInfo.userType)} {userInfo.userType} 상세 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-[#388E3C]"}`}>특징</h4>
                <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>{currentTypeInfo.description}</p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-[#388E3C]"}`}>성격</h4>
                <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>{currentTypeInfo.personality}</p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-[#388E3C]"}`}>추천 요금제</h4>
                <Badge className="bg-[#81C784] text-white">{currentTypeInfo.recommendation}</Badge>
              </div>
              <div className={`${isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"} p-4 rounded-lg`}>
                <p className={`font-medium text-center ${isDarkMode ? "text-gray-300" : "text-[#388E3C]"}`}>
                  {currentTypeInfo.message}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation History */}
          <Card className={`mt-6 border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader>
              <CardTitle className="flex items-center text-[#388E3C]">
                <History className="w-5 h-5 mr-2" />
                지난 요금제 추천 기록
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendationHistory.length > 0 ? (
                <div className="space-y-4">
                  {recommendationHistory.map((record) => (
                    <div
                      key={record.id}
                      className={`p-4 border border-[#81C784] rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-[#81C784] text-white">
                          {getUserTypeEmoji(record.type)} {record.type}
                        </Badge>
                        <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
                        {record.isSkipped ? "나이대 기반 추천" : "설문조사 기반 추천"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-12 ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                  <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">아직 추천 기록이 없습니다</p>
                  <p className="text-sm">설문조사를 진행해보세요!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6 space-y-4">
            <Link href="/survey">
              <Button className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white py-3">
                <RefreshCw className="w-5 h-5 mr-2" />
                새로운 요금제 추천받기
              </Button>
            </Link>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/chat">
                <Button
                  variant="outline"
                  className={`w-full border-[#81C784] text-[#388E3C] ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#F1F8E9]"
                  }`}
                >
                  AI 상담
                </Button>
              </Link>
              <Link href="/family-space">
                <Button
                  variant="outline"
                  className={`w-full border-[#81C784] text-[#388E3C] ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#F1F8E9]"
                  }`}
                >
                  가족 스페이스
                </Button>
              </Link>
              <Link href="/plant-game">
                <Button
                  variant="outline"
                  className={`w-full border-[#81C784] text-[#388E3C] ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#F1F8E9]"
                  }`}
                >
                  새싹 키우기
                </Button>
              </Link>
            </div>
          </div>

          {/* App Info */}
          <Card className={`mt-6 border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <CardContent className="p-6 text-center">
              <Image src="/images/modiLogo.png" alt="MODi Logo" width={100} height={50} className="mx-auto mb-3" />
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>MODi v1.0.0</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-50 mt-1`}>
                당신에게 딱 맞는 요금제를 찾아드려요
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
