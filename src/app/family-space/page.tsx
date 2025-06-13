"use client"

import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/contexts/theme-context"
import { useFamilySpace } from "@/contexts/family-space-context"
import { FamilyInvite } from "@/components/family/family-invite"
import { FamilyMessageCards } from "@/components/family/family-message-cards"
import { FamilyOverview } from "@/components/family/family-overview"
import { FamilyPlanSharing } from "@/components/family/family-plan-sharing"
import { motion } from "framer-motion"
import { MobileNav } from "@/components/mobile-nav"
import { Users } from "lucide-react"

export default function FamilySpacePage() {
  const { isDarkMode } = useTheme()
  const { familyMembers, messageCards, addMessageCard } = useFamilySpace()

  const totalSavings = 52000 // 예시 할인 금액

  const handleSendCard = (design: string, message: string) => {
    addMessageCard({
      sender: "나",
      message,
      design,
      timestamp: new Date(),
    })
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
              <FamilyOverview familyMembers={familyMembers} totalSavings={totalSavings} />

              {/* Invite Section */}
              <FamilyInvite />
            </div>

            {/* Message Cards */}
            <FamilyMessageCards messageCards={messageCards} onSendCard={handleSendCard} />

            {/* Plan Sharing */}
            <FamilyPlanSharing />
          </main>
        </div>
      </div>
  )
}
