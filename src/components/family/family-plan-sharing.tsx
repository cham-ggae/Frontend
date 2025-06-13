"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn, staggerContainer, staggerItem } from "@/components/ui/animations"
import { useTheme } from "@/contexts/theme-context"
import { CreditCard, ChevronRight, Smartphone, Wifi } from "lucide-react"
import { motion } from "framer-motion"

export function FamilyPlanSharing() {
    const { isDarkMode } = useTheme()

    const plans = [
        {
            id: "plan1",
            name: "5G 시그니처 가족결합",
            description: "월 89,000원 → 67,000원",
            icon: <Smartphone className="w-8 h-8 text-[#388E3C]" />,
            discount: "25%",
            tag: "인기",
        },
        {
            id: "plan2",
            name: "참쉬운 가족결합",
            description: "휴대폰 + 인터넷 결합할인",
            icon: <Wifi className="w-8 h-8 text-[#388E3C]" />,
            discount: "30%",
            tag: "추천",
        },
    ]

    return (
        <FadeIn delay={0.3}>
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} overflow-hidden`}>
                <CardHeader className="bg-gradient-to-r from-[#81C784]/20 to-transparent pb-4">
                    <CardTitle className="flex items-center text-[#388E3C] text-xl">
                        <CreditCard className="w-5 h-5 mr-2" />
                        요금제 공유 목록
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <motion.div className="grid md:grid-cols-2 gap-4" variants={staggerContainer} initial="hidden" animate="show">
                        {plans.map((plan) => (
                            <motion.div
                                key={plan.id}
                                variants={staggerItem}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div
                                    className={`p-5 rounded-xl border ${
                                        isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-[#81C784]/50"
                                    } shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden`}
                                >
                                    {plan.tag && (
                                        <div className="absolute top-0 right-0">
                                            <div
                                                className={`${
                                                    plan.tag === "인기" ? "bg-yellow-500" : "bg-[#81C784]"
                                                } text-white text-xs font-bold px-3 py-1 rounded-bl-lg`}
                                            >
                                                {plan.tag}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start">
                                        <div className="mr-4">{plan.icon}</div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-lg mb-1 text-[#388E3C]">{plan.name}</h4>
                                            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 mb-3`}>
                                                {plan.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                                                    }`}
                                                >
                                                    최대 {plan.discount} 할인
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`border-[#81C784] text-[#388E3C] hover:bg-[#81C784]/10 flex items-center`}
                                                >
                                                    자세히 보기
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-6 text-center">
                        <Button variant="outline" className={`border-[#81C784] text-[#388E3C] hover:bg-[#81C784]/10 px-6`}>
                            모든 요금제 보기
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </FadeIn>
    )
}
