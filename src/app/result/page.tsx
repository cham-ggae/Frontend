"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"

const userTypes = {
  bee: {
    name: "호박벌형",
    subtitle: "데이터 쏘는 꿀벌",
    emoji: "🐝",
    description: "유튜브, 넷플릭스 등 OTT를 즐겨보며 하루 종일 데이터 풀가동!",
    personality: "부지런하고 활동적. 틈만 나면 영상 콘텐츠를 탐색하는 정보 소비꾼!",
    recommendation: "5G 프리미어 에센셜, 5G 프리미어 레귤러",
    message: "꿀벌형인 당신, 멈추지 마세요! 꿀처럼 달콤한 무제한 요금제를 추천해요🍯",
    color: "bg-yellow-100 border-yellow-300",
    darkColor: "bg-yellow-900/30 border-yellow-700",
  },
  beetle: {
    name: "장수풍뎅이형",
    subtitle: "내 가족은 내가 지킨다",
    emoji: "🪲",
    description: "가족과 함께 요금제를 묶고 할인까지 챙기는 전략형 사용자",
    personality: "든든하고 실속파. 가족을 생각하는 따뜻한 계획형 소비자",
    recommendation: "U+투게더 결합, 참 쉬운 가족 결합",
    message: "장수풍뎅이형이라면 가족이 먼저! 함께 쓰면 더 커지는 할인 혜택을 받아보세요🪲",
    color: "bg-brown-100 border-brown-300",
    darkColor: "bg-amber-900/30 border-amber-700",
  },
  ladybug: {
    name: "무당벌레형",
    subtitle: "TMI 유발 대화형",
    emoji: "🐞",
    description: "통화량 많고, 하루 1~2시간은 기본. 문자보다 전화가 편한 타입",
    personality: "수다쟁이, 사람들과의 대화가 에너지 원천인 커뮤니케이터",
    recommendation: "LTE 선택형 요금제, 5G 심플+, 유쓰 5G 스탠다드",
    message: "무당벌레형은 통화가 생명! 무제한으로 수다 떨어도 부담 없는 요금제를 추천해요📞",
    color: "bg-red-100 border-red-300",
    darkColor: "bg-red-900/30 border-red-700",
  },
  ant: {
    name: "개미형",
    subtitle: "티끌 모아 태산이겠지",
    emoji: "🐜",
    description: "데이터는 아껴 쓰고, 통화도 적은 알뜰한 소비자",
    personality: "검소하고 실속형. 요금제는 작아도 충분히 만족!",
    recommendation: "유쓰 5G 미니, 유쓰 5G 슬림+",
    message: "개미형이라면 한 방울도 아깝지요! 알뜰한 당신에게 꼭 맞는 요금제가 있어요🍃",
    color: "bg-green-100 border-green-300",
    darkColor: "bg-green-900/30 border-green-700",
  },
  butterfly: {
    name: "나비형",
    subtitle: "알잘딱깔센 혜택중심형",
    emoji: "🦋",
    description: "약정 할인, 멤버십, 기기 혜택 등 총체적 혜택을 고려하는 합리주의자",
    personality: "감각적이고 계획적인 소비자. 혜택을 꼼꼼히 따져서 결정함",
    recommendation: "5G 프리미어 플러스, U+ 멤버십 결합 상품",
    message: "나비형은 아름답게 혜택을 날개처럼 펼치죠🦋 지금 당신에게 가장 유리한 조건으로 안내할게요!",
    color: "bg-purple-100 border-purple-300",
    darkColor: "bg-purple-900/30 border-purple-700",
  },
}

export default function ResultPage() {
  const { isDarkMode } = useTheme()
  const [userType, setUserType] = useState<keyof typeof userTypes>("ant")
  const [isSkipped, setIsSkipped] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const skipped = searchParams.get("skipped")
    if (skipped) {
      setIsSkipped(true)
      // Age-based recommendation logic
      const basicInfo = localStorage.getItem("userBasicInfo")
      if (basicInfo) {
        const { ageGroup } = JSON.parse(basicInfo)
        switch (ageGroup) {
          case "teen":
            setUserType("ant")
            break
          case "20-30":
            setUserType("bee")
            break
          case "40-50":
            setUserType("beetle")
            break
          case "60+":
            setUserType("ladybug")
            break
          default:
            setUserType("ant")
        }
      }
    } else {
      // Survey-based recommendation logic
      const answers = localStorage.getItem("surveyAnswers")
      if (answers) {
        const parsedAnswers = JSON.parse(answers)
        // Simple logic to determine user type based on answers
        if (parsedAnswers[2] === "unlimited" && parsedAnswers[5] === "youtube") {
          setUserType("bee")
        } else if (parsedAnswers[1] === "family") {
          setUserType("beetle")
        } else if (parsedAnswers[8] === "over120") {
          setUserType("ladybug")
        } else if (parsedAnswers[4] === "under50") {
          setUserType("ant")
        } else {
          setUserType("butterfly")
        }
      }
    }

    // Save result to history
    const result = {
      type: userType,
      date: new Date().toISOString(),
      isSkipped,
    }
    const history = JSON.parse(localStorage.getItem("recommendationHistory") || "[]")
    history.push(result)
    localStorage.setItem("recommendationHistory", JSON.stringify(history))
  }, [searchParams, userType, isSkipped])

  const currentType = userTypes[userType]

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <header className={`${isDarkMode ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-sm"}`}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className={isDarkMode ? "text-gray-300" : ""}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className={`ml-2 text-lg font-semibold ${isDarkMode ? "text-white" : "text-green-800"}`}>결과</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Result Card */}
        <Card className={`${isDarkMode ? currentType.darkColor : currentType.color} mb-6`}>
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{currentType.emoji}</div>
            <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : "text-green-800"}`}>
              {currentType.name}
            </CardTitle>
            <p className={isDarkMode ? "text-green-400 font-medium" : "text-green-600 font-medium"}>
              {currentType.subtitle}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-green-800"}`}>특징</h3>
              <p className={isDarkMode ? "text-gray-300" : "text-green-700"}>{currentType.description}</p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-green-800"}`}>성격</h3>
              <p className={isDarkMode ? "text-gray-300" : "text-green-700"}>{currentType.personality}</p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-green-800"}`}>추천 요금제</h3>
              <Badge
                variant="secondary"
                className={isDarkMode ? "bg-green-800/50 text-green-100" : "bg-green-200 text-green-800"}
              >
                {currentType.recommendation}
              </Badge>
            </div>
            <div className={`${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} p-4 rounded-lg`}>
              <p className={`font-medium text-center ${isDarkMode ? "text-gray-300" : "text-green-800"}`}>
                {currentType.message}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/chat">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              AI 상담으로 자세한 요금제 알아보기
            </Button>
          </Link>
          <Link href="/family-space">
            <Button
              variant="outline"
              className={`w-full ${
                isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-green-200 text-green-800"
              }`}
            >
              가족 스페이스 만들기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
