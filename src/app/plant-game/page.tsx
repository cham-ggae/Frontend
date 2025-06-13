"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Zap } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { PlantDisplay } from "@/components/plant-display"
import { PlantTypeSelector } from "@/components/plant-type-selector"
import { FamilySpaceRequired } from "@/components/family-space-required"
import { DailyMissions } from "@/components/daily-missions"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"
import { useFamilySpace } from "@/contexts/family-space-context"
import { usePlant } from "@/contexts/plant-context"
import { PlantReward } from "@/components/plant-reward" // Declare the PlantReward variable

export default function PlantGamePage() {
  const { isDarkMode } = useTheme()
  const { hasFamilySpace } = useFamilySpace()
  const { plantState, waterPlant, useNutrient } = usePlant()
  const [waterEffects, setWaterEffects] = useState(false)

  // Handle water plant action
  const handleWaterPlant = () => {
    // 실제 앱에서는 현재 로그인한 사용자 정보를 사용
    waterPlant("3", "나", "🧑")

    // 물주기 효과 애니메이션
    setWaterEffects(true)
    setTimeout(() => {
      setWaterEffects(false)
    }, 2000)
  }

  // Handle use nutrient action
  const handleUseNutrient = () => {
    useNutrient()
  }

  // 가족 스페이스가 없으면 생성 화면 표시
  if (!hasFamilySpace) {
    return (
      <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <Sidebar className="hidden md:flex" />
        <div className="flex-1 overflow-auto">
          <main className="p-6 md:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-full">
            <FamilySpaceRequired />
          </main>
        </div>
      </div>
    )
  }

  // 식물이 없으면 선택 화면 표시
  if (!plantState) {
    return (
      <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <Sidebar className="hidden md:flex" />
        <div className="flex-1 overflow-auto">
          <main className="p-6 md:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-full">
            <PlantTypeSelector />
          </main>
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#388E3C]">
              {plantState.type === "flower" ? "🌸" : "🌳"}
              {plantState.type === "flower" ? "꽃" : "나무"} 키우기
            </h1>
            <div className="flex items-center gap-4">
              <Badge className="bg-yellow-500 text-white">🧪 영양제 {plantState.nutrientCount}개</Badge>
              <Badge className="bg-[#81C784] text-white">
                {plantState.type === "flower" ? "🌸" : "🌳"} {plantState.completedCount}그루 완성
              </Badge>
            </div>
          </div>

          {/* Plant Reward (if completed) */}
          {plantState.isCompleted && (
            <div className="mb-6">
              <PlantReward />
            </div>
          )}

          {/* Plant Display */}
          {!plantState.isCompleted && (
            <div className="mb-6">
              <Card
                className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} relative overflow-hidden`}
              >
                <CardContent className="p-8">
                  <div className="relative">
                    <PlantDisplay />

                    {/* Water Effect */}
                    {waterEffects && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={`water-${i}`}
                            className="absolute w-3 h-3 bg-blue-400 rounded-full pointer-events-none"
                            style={{
                              top: "20%",
                              left: "50%",
                            }}
                            initial={{
                              scale: 0,
                              opacity: 0,
                              x: 0,
                              y: 0,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              x: Math.cos((i * 45 * Math.PI) / 180) * 60,
                              y: Math.sin((i * 45 * Math.PI) / 180) * 60,
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        ))}

                        {/* Water Droplet Emojis */}
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={`water-emoji-${i}`}
                            className="absolute text-2xl pointer-events-none"
                            style={{
                              top: "10%",
                              left: `${30 + i * 10}%`,
                            }}
                            initial={{ opacity: 0, y: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              y: -50,
                              scale: [0, 1.2, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              ease: "easeOut",
                            }}
                          >
                            💧
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>

                  {/* Action Buttons - Full Width */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <Button
                      onClick={handleWaterPlant}
                      className="bg-blue-500 hover:bg-blue-600 text-white h-16 text-lg font-semibold"
                    >
                      <Droplets className="w-6 h-6 mr-3" />물 주기
                    </Button>

                    <div className="space-y-2">
                      <Button
                        onClick={handleUseNutrient}
                        disabled={plantState.nutrientCount <= 0 || plantState.nutrientActive}
                        className={`w-full h-12 text-lg font-semibold ${
                          plantState.nutrientActive || plantState.nutrientCount <= 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        } text-white`}
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        {plantState.nutrientActive ? "영양제 효과 적용 중" : "영양제 사용하기"}
                      </Button>
                      <div className="text-xs text-center opacity-70">
                        {plantState.nutrientActive ? (
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            오늘 하루 물주기 포인트 2배 효과 적용 중
                          </motion.div>
                        ) : (
                          <span>영양제를 사용하면 오늘 물주기 포인트가 2배가 됩니다</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Missions */}
          {!plantState.isCompleted && (
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <CardHeader>
                <CardTitle className="text-[#388E3C]">오늘의 미션</CardTitle>
              </CardHeader>
              <CardContent>
                <DailyMissions onWater={handleWaterPlant} />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
