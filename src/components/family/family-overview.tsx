"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn, SlideIn, staggerContainer, staggerItem } from "@/components/ui/animations"
import { useTheme } from "@/contexts/theme-context"
import { Users, TrendingUp, Award } from "lucide-react"
import { motion } from "framer-motion"

interface FamilyMember {
    id: string
    name: string
    plan: string
    usage: string
    avatar: string
}

interface FamilyOverviewProps {
    familyMembers: FamilyMember[]
    totalSavings: number
}

export function FamilyOverview({ familyMembers, totalSavings }: FamilyOverviewProps) {
    const { isDarkMode } = useTheme()

    return (
        <FadeIn>
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} overflow-hidden`}>
                <CardHeader className="bg-gradient-to-r from-[#81C784]/20 to-transparent pb-4">
                    <CardTitle className="flex items-center text-[#388E3C] text-xl">
                        <Users className="w-5 h-5 mr-2" />
                        우리 가족 ({familyMembers.length}명)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <SlideIn direction="up" className="mb-6">
                        <div className={`rounded-xl p-4 ${isDarkMode ? "bg-green-900/20" : "bg-green-50"} text-center`}>
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-[#388E3C]" />
                                <div className="text-2xl font-bold text-[#388E3C]">월 {totalSavings.toLocaleString()}원 절약</div>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <Award className="w-4 h-4 text-yellow-500" />
                                <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} text-sm`}>투게더 결합 할인 적용</p>
                            </div>
                        </div>
                    </SlideIn>

                    <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" animate="show">
                        {familyMembers.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={staggerItem}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                                    isDarkMode ? "bg-gray-700 hover:bg-gray-650" : "bg-[#F1F8E9] hover:bg-[#E8F5E9]"
                                } border border-transparent hover:border-[#81C784]/50 shadow-sm`}
                            >
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-[#81C784]/20 flex items-center justify-center text-3xl mr-4">
                                        {member.avatar}
                                    </div>
                                    <div>
                                        <div className="font-medium text-[#388E3C]">{member.name}</div>
                                        <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                                            {member.plan}
                                        </div>
                                    </div>
                                </div>
                                <Badge className="bg-[#81C784] text-white px-3 py-1 rounded-full">{member.usage}</Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
        </FadeIn>
    )
}
