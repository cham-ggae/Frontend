"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Plus } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"

export function FamilySpaceRequired() {
  const { isDarkMode } = useTheme()

  return (
    <div className="text-center space-y-8">
      <div>
        <div className="text-8xl mb-6">🏠</div>
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#388E3C]"}`}>
          가족 스페이스가 필요해요
        </h2>
        <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 mb-8`}>
          새싹 키우기는 가족과 함께하는 활동이에요.
          <br />
          먼저 가족 스페이스를 만들어주세요!
        </p>
      </div>

      <Card className={`max-w-md mx-auto border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <CardContent className="p-8 text-center">
          <Users className="w-16 h-16 text-[#388E3C] mx-auto mb-4" />
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-[#388E3C]"}`}>
            가족 스페이스 만들기
          </h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 mb-6`}>
            가족 구성원들과 함께 새싹을 키우고 소통해보세요
          </p>
          <Link href="/family-space">
            <Button className="w-full bg-[#81C784] hover:bg-[#388E3C] text-white">
              <Plus className="w-4 h-4 mr-2" />
              가족 스페이스 만들기
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        💡 가족 스페이스를 만들면 함께 새싹을 키우고 메시지 카드도 주고받을 수 있어요!
      </div>
    </div>
  )
}
