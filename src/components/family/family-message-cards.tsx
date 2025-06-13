"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCardDetail } from "@/components/message-card-detail"
import { MessageCardDisplay } from "@/components/message-card-display"
import { MessageCardModal } from "@/components/message-card-modal"
import { FadeIn, staggerContainer, staggerItem } from "@/components/ui/animations"
import { useTheme } from "@/contexts/theme-context"
import { MessageSquare, Plus, Heart } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface MessageCard {
    id: string
    sender: string
    message: string
    design: string
    timestamp: Date
    comments: any[]
}

interface FamilyMessageCardsProps {
    messageCards: MessageCard[]
    onSendCard: (design: string, message: string) => void
}

export function FamilyMessageCards({ messageCards, onSendCard }: FamilyMessageCardsProps) {
    const { isDarkMode } = useTheme()
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

    const handleCardClick = (cardId: string) => {
        setSelectedCardId(cardId)
    }

    const handleCloseDetail = () => {
        setSelectedCardId(null)
    }

    return (
        <>
            <FadeIn delay={0.2}>
                <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6 overflow-hidden`}>
                    <CardHeader className="bg-gradient-to-r from-[#81C784]/20 to-transparent pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center text-[#388E3C] text-xl">
                                <MessageSquare className="w-5 h-5 mr-2" />
                                가족 메시지 카드
                            </CardTitle>
                            <MessageCardModal onSendCard={onSendCard}>
                                <Button className="bg-[#81C784] hover:bg-[#388E3C] text-white rounded-full px-4 shadow-sm hover:shadow-md transition-all duration-200">
                                    <Plus className="w-4 h-4 mr-2" />
                                    메시지 카드 보내기
                                </Button>
                            </MessageCardModal>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {messageCards.length > 0 ? (
                            <motion.div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="show"
                            >
                                {messageCards.slice(0, 6).map((card) => (
                                    <motion.div
                                        key={card.id}
                                        variants={staggerItem}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <MessageCardDisplay
                                            design={card.design}
                                            message={card.message}
                                            sender={card.sender}
                                            timestamp={new Date(card.timestamp)}
                                            className="h-40 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                                            onClick={() => handleCardClick(card.id)}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className={`text-center py-16 ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Heart className="w-16 h-16 mx-auto mb-4 opacity-50 text-pink-400" />
                                    <p className="text-xl mb-2 font-medium">아직 메시지 카드가 없습니다</p>
                                    <p className="text-sm">가족에게 첫 번째 메시지 카드를 보내보세요!</p>
                                </motion.div>

                                <motion.div
                                    className="mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <MessageCardModal onSendCard={onSendCard}>
                                        <Button className="bg-[#81C784] hover:bg-[#388E3C] text-white px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                                            <Plus className="w-5 h-5 mr-2" />첫 메시지 카드 작성하기
                                        </Button>
                                    </MessageCardModal>
                                </motion.div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </FadeIn>

            {/* Message Card Detail Modal */}
            {selectedCardId && <MessageCardDetail cardId={selectedCardId} onClose={handleCloseDetail} />}
        </>
    )
}
