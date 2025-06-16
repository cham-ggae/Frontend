"use client"

import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/contexts/theme-context"
import { FamilyInvite } from "@/components/family/family-invite"
import { FamilyMessageCards } from "@/components/family/family-message-cards"
import { FamilyOverview } from "@/components/family/family-overview"
import { FamilyPlanSharing } from "@/components/family/family-plan-sharing"
import { CreateFamilyFlow } from "@/components/family/create-family-flow"
import { FamilyDashboardSkeleton } from "@/components/family/family-dashboard-skeleton"
import { ErrorFallback } from "@/components/error-fallback"
import { motion } from "framer-motion"
import { MobileNav } from "@/components/mobile-nav"
import { Users, AlertCircle } from "lucide-react"
import { useFamily } from "@/hooks/family"
import { useMemo } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FamilySpacePage() {
  const { isDarkMode } = useTheme()
  const {
    hasFamily,
    family,
    dashboard,
    memberCount,
    isLoading,
    error,
    refetch
  } = useFamily()

  // 임시 메시지 카드 데이터 (메시지 API 구현 전까지)
  const mockMessageCards = useMemo(() => [
    {
      id: "1",
      sender: "엄마",
      message: "요금제 바꿔서 돈 아낄 수 있을 것 같아요!",
      design: "heart",
      timestamp: new Date(Date.now() - 3600000), // 1시간 전
      comments: []
    },
    {
      id: "2",
      sender: "아빠",
      message: "5G로 업그레이드 어떨까요?",
      design: "star",
      timestamp: new Date(Date.now() - 7200000), // 2시간 전
      comments: []
    }
  ], [])

  const handleSendCard = (design: string, message: string) => {
    // 메시지 API 구현 후 실제 전송 로직으로 교체
    console.log('메시지 카드 전송:', { design, message })
  }

  // 로딩 상태
  if (isLoading) {
    return (
        <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <Sidebar className="hidden md:flex" />
          <div className="flex-1">
            <FamilyDashboardSkeleton />
          </div>
        </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
        <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <Sidebar className="hidden md:flex" />
          <div className="flex-1 flex items-center justify-center p-6">
            <ErrorFallback
                error={error}
                resetError={refetch}
                title="가족 스페이스 로딩 실패"
                description="가족 정보를 불러오는 중 오류가 발생했습니다."
            />
          </div>
        </div>
    )
  }

  // 가족이 없는 경우
  if (!hasFamily) {
    return (
        <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <Sidebar className="hidden md:flex" />
          <div className="flex-1">
            <CreateFamilyFlow />
          </div>
        </div>
    )
  }

  // 가족은 있지만 대시보드 데이터가 없는 경우
  if (!dashboard) {
    return (
        <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <Sidebar className="hidden md:flex" />
          <div className="flex-1 flex items-center justify-center p-6">
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                가족 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
              </AlertDescription>
            </Alert>
          </div>
        </div>
    )
  }

  return (
      <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        {/* Sidebar - Desktop */}
        <Sidebar className="hidden md:flex" />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6 md:p-8 max-w-6xl mx-auto">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center mb-6">
              <MobileNav />
              <h1 className="text-2xl font-bold text-[#388E3C] ml-2">가족 스페이스</h1>
            </div>

            {/* Desktop Header */}
            <motion.div
                className="hidden md:flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#81C784]/20 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#388E3C]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#388E3C]">가족 스페이스</h1>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                    가족과 함께 통신 생활을 관리하고 소통해보세요
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Family Overview */}
              <FamilyOverview
                  family={dashboard.family}
                  familyMembers={dashboard.members}
              />

              <FamilyInvite family={dashboard.family} />
            </div>

            <FamilyMessageCards
                messageCards={mockMessageCards}
                onSendCard={handleSendCard}
            />

            <FamilyPlanSharing />
          </main>
        </div>
      </div>
  )
}
