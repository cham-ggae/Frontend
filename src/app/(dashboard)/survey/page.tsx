"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"

const surveyQuestions = [
  {
    id: 1,
    question: "어떤 유형의 요금제를 찾고 계신가요?",
    options: [
      { value: "individual", label: "개인용" },
      { value: "family", label: "가족과 함께 하는 요금제" },
      { value: "online", label: "온라인 전용 / 저가형" },
      { value: "tablet", label: "태블릿 / 웨어러블 전용" },
    ],
  },
  {
    id: 2,
    question: "데이터 사용량은 얼마나 되시나요? (1달 기준)",
    options: [
      { value: "under5", label: "5GB 이하" },
      { value: "5to10", label: "5GB 이상 ~ 10GB 이하" },
      { value: "10to50", label: "10GB 이상 ~ 50GB 이하" },
      { value: "over50", label: "50GB 이상" },
    ],
  },
  {
    id: 3,
    question: "원하는 데이터 형태를 선택해주세요.",
    options: [
      { value: "unlimited", label: "완전 무제한" },
      { value: "conditional", label: "조건부 무제한" },
      { value: "sharing", label: "데이터 쉐어링" },
      { value: "any", label: "무관" },
    ],
  },
  {
    id: 4,
    question: "월 예상 지출 금액은 어느 정도로 생각하시나요?",
    options: [
      { value: "under50", label: "5만원 이하" },
      { value: "60to80", label: "6~8만원" },
      { value: "over90", label: "9만원 이상" },
      { value: "any", label: "무관 (혜택/성능 우선)" },
    ],
  },
  {
    id: 5,
    question: "사용 중이거나 관심 있는 구독 서비스가 있나요?",
    options: [
      { value: "youtube", label: "유튜브 프리미엄" },
      { value: "netflix", label: "넷플릭스 / 디즈니+" },
      { value: "tving", label: "티빙 / 왓챠" },
      { value: "music", label: "지니뮤직 / 바이브 / 밀리의 서재" },
    ],
  },
  {
    id: 6,
    question: "약정 기간은 어느 쪽이 좋으신가요?",
    options: [
      { value: "no-contract", label: "무약정" },
      { value: "contract", label: "약정 (요금제 할인 혜택)" },
    ],
  },
  {
    id: 7,
    question: "다음 중 가장 매력적인 혜택은 무엇인가요?",
    options: [
      { value: "discount", label: "요금제 할인 혜택" },
      { value: "subscription", label: "무료 구독 서비스" },
      { value: "data", label: "끊김 없는 데이터 제공" },
    ],
  },
  {
    id: 8,
    question: "하루에 통화를 얼마나 하시나요?",
    options: [
      { value: "under30", label: "30분 이하" },
      { value: "30to60", label: "30분 ~ 1시간" },
      { value: "60to120", label: "1시간 ~ 2시간" },
      { value: "over120", label: "2시간 이상" },
    ],
  },
]

export default function SurveyPage() {
  const { isDarkMode } = useTheme()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [savedAnswers, setSavedAnswers] = useState<Record<number, string>>({})
  const router = useRouter()

  useEffect(() => {
    // Load saved answers from localStorage
    const saved = localStorage.getItem("surveyAnswers")
    if (saved) {
      const parsedAnswers = JSON.parse(saved)
      setSavedAnswers(parsedAnswers)
      setAnswers(parsedAnswers)
    }
  }, [])

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [surveyQuestions[currentQuestion].id]: value }
    setAnswers(newAnswers)
    // Save progress
    localStorage.setItem("surveyAnswers", JSON.stringify(newAnswers))
  }

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Complete survey
      router.push("/result")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSkip = () => {
    // Skip survey and go to age-based recommendation
    router.push("/result?skipped=true")
  }

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <header className={`${isDarkMode ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-sm"}`}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className={isDarkMode ? "text-gray-300" : ""}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className={`ml-2 text-lg font-semibold ${isDarkMode ? "text-white" : "text-green-800"}`}>설문조사</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkip} className={isDarkMode ? "text-gray-300" : ""}>
            <SkipForward className="w-4 h-4 mr-1" />
            건너뛰기
          </Button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className={`flex justify-between text-sm mb-2 ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
            <span>
              {currentQuestion + 1} / {surveyQuestions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className={`h-2 ${isDarkMode ? "bg-gray-700" : ""}`} />
        </div>

        {/* Question Card */}
        <Card
          className={`${
            isDarkMode ? "bg-gray-800 border-gray-700 shadow-gray-900" : "bg-white/90 backdrop-blur-sm shadow-sm"
          } mb-6`}
        >
          <CardHeader>
            <CardTitle className={isDarkMode ? "text-white" : "text-green-800 text-lg"}>
              {surveyQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[surveyQuestions[currentQuestion].id] || ""} onValueChange={handleAnswer}>
              {surveyQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-2 p-2 rounded ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-green-50"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className={`flex-1 cursor-pointer ${isDarkMode ? "text-gray-300" : ""}`}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex-1 ${
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                : "border-green-200 text-green-800"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            이전
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[surveyQuestions[currentQuestion].id]}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            {currentQuestion === surveyQuestions.length - 1 ? "완료" : "다음"}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
