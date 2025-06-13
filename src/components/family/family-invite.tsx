"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FadeIn, SlideIn } from "@/components/ui/animations"
import { useTheme } from "@/contexts/theme-context"
import { Copy, Share2, UserPlus, Check } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export function FamilyInvite() {
    const { isDarkMode } = useTheme()
    const [inviteCode] = useState("MODI2024")
    const [copied, setCopied] = useState(false)

    const copyInviteCode = () => {
        navigator.clipboard.writeText(inviteCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <FadeIn delay={0.1}>
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} overflow-hidden`}>
                <CardHeader className="bg-gradient-to-r from-[#81C784]/20 to-transparent pb-4">
                    <CardTitle className="flex items-center text-[#388E3C] text-xl">
                        <UserPlus className="w-5 h-5 mr-2" />
                        가족 초대하기
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <SlideIn direction="up" className="mb-6">
                        <div className={`rounded-xl p-4 ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"} mb-6`}>
                            <h3 className={`font-medium mb-2 ${isDarkMode ? "text-white" : "text-[#388E3C]"}`}>
                                가족과 함께하면 더 큰 혜택이 있어요!
                            </h3>
                            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
                                가족 구성원을 초대하여 함께 요금제를 관리하고 더 많은 할인 혜택을 받아보세요.
                            </p>
                        </div>
                    </SlideIn>

                    <div className="space-y-4">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
                            초대 코드
                        </label>
                        <div className="flex gap-2">
                            <Input
                                value={inviteCode}
                                readOnly
                                className={`flex-1 border-[#81C784] focus-visible:ring-[#81C784] text-center font-medium tracking-wider ${
                                    isDarkMode ? "bg-gray-700 text-white" : ""
                                }`}
                            />
                            <Button
                                size="icon"
                                onClick={copyInviteCode}
                                className={`${copied ? "bg-green-500" : "bg-[#81C784]"} hover:bg-[#388E3C] text-white transition-colors duration-200`}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>

                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                variant="default"
                                className={`w-full bg-[#81C784] hover:bg-[#388E3C] text-white py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                초대 코드 공유하기
                            </Button>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </FadeIn>
    )
}
