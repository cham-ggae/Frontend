"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn, SlideIn, staggerContainer, staggerItem } from "@/components/ui/animations"
import { useTheme } from "@/contexts/theme-context"
import { Users, TrendingUp, Award, User } from "lucide-react"
import { motion } from "framer-motion"
import { FamilyMember, FamilySpace } from "@/types/family.type"

interface FamilyOverviewProps {
    family: FamilySpace
    familyMembers: FamilyMember[]
    totalSavings?: number
}

export function FamilyOverview({ family, familyMembers, totalSavings = 0 }: FamilyOverviewProps) {
    const { isDarkMode } = useTheme()

    // 아바타 이모지 생성 (이름의 첫 글자 기반)
    const getAvatarEmoji = (name: string, index: number) => {
        const emojis = ['👨', '👩', '👦', '👧', '🧑', '👴', '👵']
        return emojis[index % emojis.length] || '👤'
    }

    // 요금제 요약 생성
    const getPlanDisplay = (member: FamilyMember) => {
        if (member.planName && member.price) {
            return `${member.planName} (월 ${member.price.toLocaleString()}원)`
        }
        return member.planSummary || '요금제 없음'
    }

    return (
        <FadeIn>
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} overflow-hidden`}>
                <CardHeader className="bg-gradient-to-r from-[#81C784]/20 to-transparent pb-4">
                    <CardTitle className="flex items-center text-[#388E3C] text-xl">
                        <Users className="w-5 h-5 mr-2" />
                        {family.name} ({familyMembers.length}명)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {totalSavings > 0 && (
                        <SlideIn direction="up" className="mb-6">
                            <div className={`rounded-xl p-4 ${isDarkMode ? "bg-green-900/20" : "bg-green-50"} text-center`}>
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <TrendingUp className="w-5 h-5 text-[#388E3C]" />
                                    <div className="text-2xl font-bold text-[#388E3C]">
                                        월 {totalSavings.toLocaleString()}원 절약
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                    <Award className="w-4 h-4 text-yellow-500" />
                                    <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} text-sm`}>
                                        {family.combiType} 할인 적용
                                    </p>
                                </div>
                            </div>
                        </SlideIn>
                    )}

                    <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" animate="show">
                        {familyMembers.length > 0 ? (
                            familyMembers.map((member, index) => (
                                <motion.div
                                    key={member.uid}
                                    variants={staggerItem}
                                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                                        isDarkMode ? "bg-gray-700 hover:bg-gray-650" : "bg-[#F1F8E9] hover:bg-[#E8F5E9]"
                                    } border border-transparent hover:border-[#81C784]/50 shadow-sm`}
                                >
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-[#81C784]/20 flex items-center justify-center text-2xl mr-4">
                                            {member.profileImage ? (
                                                <img
                                                    src={member.profileImage}
                                                    alt={member.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                getAvatarEmoji(member.name, index)
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-[#388E3C]">{member.name}</div>
                                            <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                                                {getPlanDisplay(member)}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge className="bg-[#81C784] text-white px-3 py-1 rounded-full">
                                        {member.dataUsage || '0GB'}
                                    </Badge>
                                </motion.div>
                            ))
                        ) : (
                            <div className={`text-center py-8 ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                                <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>아직 가족 구성원이 없습니다</p>
                                <p className="text-sm">가족을 초대해보세요!</p>
                            </div>
                        )}
                    </motion.div>
                </CardContent>
            </Card>
        </FadeIn>
    )
}
