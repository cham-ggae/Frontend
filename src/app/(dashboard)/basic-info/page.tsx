"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"

export default function BasicInfoPage() {
  const { isDarkMode } = useTheme()
  const [gender, setGender] = useState("")
  const [ageGroup, setAgeGroup] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
    if (gender && ageGroup) {
      // Save to localStorage or database
      localStorage.setItem("userBasicInfo", JSON.stringify({ gender, ageGroup }))
      router.push("/dashboard")
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <header className={`${isDarkMode ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-sm"}`}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <Link href="/public">
            <Button variant="ghost" size="sm" className={isDarkMode ? "text-gray-300" : ""}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className={`ml-2 text-lg font-semibold ${isDarkMode ? "text-white" : "text-green-800"}`}>
            기본 정보 입력
          </h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        <Card
          className={`${isDarkMode ? "bg-gray-800 border-gray-700 shadow-gray-900" : "bg-white/90 backdrop-blur-sm"}`}
        >
          <CardHeader>
            <CardTitle className={`text-center ${isDarkMode ? "text-white" : "text-green-800"}`}>
              MODi 서비스 이용을 위해
              <br />
              기본 정보를 입력해주세요
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gender Selection */}
            <div>
              <Label className={`text-base font-medium mb-3 block ${isDarkMode ? "text-white" : "text-green-800"}`}>
                성별
              </Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className={isDarkMode ? "text-gray-300" : ""}>
                    남성
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className={isDarkMode ? "text-gray-300" : ""}>
                    여성
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Age Group Selection */}
            <div>
              <Label className={`text-base font-medium mb-3 block ${isDarkMode ? "text-white" : "text-green-800"}`}>
                나이대
              </Label>
              <RadioGroup value={ageGroup} onValueChange={setAgeGroup}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teen" id="teen" />
                  <Label htmlFor="teen" className={isDarkMode ? "text-gray-300" : ""}>
                    청소년 (10대)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20-30" id="20-30" />
                  <Label htmlFor="20-30" className={isDarkMode ? "text-gray-300" : ""}>
                    20-30대
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="40-50" id="40-50" />
                  <Label htmlFor="40-50" className={isDarkMode ? "text-gray-300" : ""}>
                    40-50대
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60+" id="60+" />
                  <Label htmlFor="60+" className={isDarkMode ? "text-gray-300" : ""}>
                    60대 이상
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!gender || !ageGroup}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              다음 단계로
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
