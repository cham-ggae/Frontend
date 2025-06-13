"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, MessageSquare, Share2, Copy } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { useTheme } from "@/contexts/theme-context"
import { MessageCardDisplay } from "@/components/message-card-display"
import { MessageCardModal } from "@/components/message-card-modal"
import { MessageCardDetail } from "@/components/message-card-detail"
import { useFamilySpace } from "@/contexts/family-space-context"

export default function FamilySpacePage() {
  const { isDarkMode } = useTheme()
  const { hasFamilySpace, familyMembers, messageCards, addMessageCard } = useFamilySpace()
  const [inviteCode] = useState("MODI2024")
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  const totalSavings = 52000 // 예시 할인 금액

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode)
    alert("초대 코드가 복사되었습니다!")
  }

  const handleSendCard = (design: string, message: string) => {
    addMessageCard({
      sender: "나",
      message,
      design,
      timestamp: new Date(),
    })
  }

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId)
  }

  const handleCloseDetail = () => {
    setSelectedCardId(null)
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Sidebar - Desktop */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-[#388E3C] mb-6">가족 스페이스</h1>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Family Overview */}
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <CardHeader>
                <CardTitle className="flex items-center text-[#388E3C]">
                  <Users className="w-5 h-5 mr-2" />
                  우리 가족 ({familyMembers.length}명)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#388E3C] mb-2">
                    월 {totalSavings.toLocaleString()}원 절약
                  </div>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>투게더 결합 할인</p>
                </div>

                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-3xl mr-4">{member.avatar}</span>
                        <div>
                          <div className="font-medium text-[#388E3C]">{member.name}</div>
                          <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                            {member.plan}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-[#81C784] text-white">{member.usage}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Invite Section */}
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <CardHeader>
                <CardTitle className="text-[#388E3C]">가족 초대하기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} mb-4`}>
                  가족 구성원으로부터 초대 코드를 받으셨나요?
                </p>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={inviteCode}
                    readOnly
                    className={`flex-1 border-[#81C784] focus-visible:ring-[#81C784] ${
                      isDarkMode ? "bg-gray-700 text-white" : ""
                    }`}
                  />
                  <Button size="sm" onClick={copyInviteCode} className="bg-[#81C784] hover:bg-[#388E3C] text-white">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 mb-4`}>
                  초대 코드를 가족에게 공유하세요
                </p>
                <Button
                  variant="outline"
                  className={`w-full border-[#81C784] text-[#388E3C] ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#F1F8E9]"
                  }`}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  초대 코드 공유하기
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Message Cards */}
          <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-[#388E3C]">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  최근 메시지 카드
                </CardTitle>
                <MessageCardModal onSendCard={handleSendCard}>
                  <Button className="bg-[#81C784] hover:bg-[#388E3C] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    메시지 카드 보내기
                  </Button>
                </MessageCardModal>
              </div>
            </CardHeader>
            <CardContent>
              {messageCards.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {messageCards.slice(0, 6).map((card) => (
                    <MessageCardDisplay
                      key={card.id}
                      design={card.design}
                      message={card.message}
                      sender={card.sender}
                      timestamp={new Date(card.timestamp)}
                      className="h-32"
                      onClick={() => handleCardClick(card.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className={`text-center py-12 ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">아직 메시지 카드가 없습니다</p>
                  <p className="text-sm">첫 번째 메시지 카드를 보내보세요!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Plan Sharing */}
          <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader>
              <CardTitle className="text-[#388E3C]">요금제 공유 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`p-4 border border-[#81C784] rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"}`}
                >
                  <h4 className="font-medium mb-2 text-[#388E3C]">5G 시그니처 가족결합</h4>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 mb-3`}>
                    월 89,000원 → 67,000원
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-[#81C784] text-[#388E3C] ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-white"}`}
                  >
                    자세히 보기
                  </Button>
                </div>
                <div
                  className={`p-4 border border-[#81C784] rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-[#F1F8E9]"}`}
                >
                  <h4 className="font-medium mb-2 text-[#388E3C]">참쉬운 가족결합</h4>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70 mb-3`}>
                    휴대폰 + 인터넷 결합할인
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-[#81C784] text-[#388E3C] ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-white"}`}
                  >
                    자세히 보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Message Card Detail Modal */}
      {selectedCardId && <MessageCardDetail cardId={selectedCardId} onClose={handleCloseDetail} />}
    </div>
  )
}
