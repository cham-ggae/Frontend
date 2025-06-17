'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Users } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";
import { familyMember } from '@/types/chat';
import FamilyMemberInfo from './FamilyMemberInfo';
import ChatMessage from './ChatMessage';

interface ChatHeaderProps {
  isDarkMode: boolean;
  sessionId: string;
}
const ChatHeader = ({ isDarkMode, sessionId }: ChatHeaderProps) => {

  const [isFamilyMode, setIsFamilyMode] = useState(false);
  const handleFamilyModeToggle = (checked: boolean) => {
    setIsFamilyMode(checked)
  }

  const [familyMembers, setFamilyMembers] = useState<familyMember[]>([]);

  useEffect(() => {
    // Load family data from localStorage
    const familyData = localStorage.getItem("familyMembers")
    if (familyData) {
      setFamilyMembers(JSON.parse(familyData))
    } else {
      // Default family data if none exists
      setFamilyMembers([
        { name: "아빠", plan_name: "5G 시그니처", profile_image: "👨" },
        { name: "엄마", plan_name: "5G 스탠다드", profile_image: "👩" },
        { name: "나", plan_name: "5G 프리미엄", profile_image: "🧑" },
      ])
    }
  }, [])
  return (
    <div className="flex-1 flex flex-col">
      <header className={`${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-[#81C784]"} border-b p-4`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-[#388E3C]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                뒤로가기
              </Button>
            </Link>
            <h1 className="ml-4 text-xl font-semibold text-[#388E3C]">
              {isFamilyMode ? "가족 맞춤 챗봇" : "개인 맞춤 챗봇"}
            </h1>
          </div>

          {/* Family Mode Toggle */}
          <div className="flex items-center space-x-3">
            <Users
              className={`w-5 h-5 ${isFamilyMode ? "text-[#388E3C]" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            />
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="family-mode"
                className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}
              >
                가족 모드
              </Label>
              <Switch id="family-mode" checked={isFamilyMode} onCheckedChange={handleFamilyModeToggle} />
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-2">
          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
            {isFamilyMode
              ? `가족 ${familyMembers.length}명의 통신 패턴에 맞는 최적의 결합 요금제를 추천받아보세요.`
              : "개인의 통신 패턴에 맞는 최적의 요금제를 추천받아보세요."}
          </p>
        </div>
      </header>
      <FamilyMemberInfo isFamilyMode={isFamilyMode} familyMembers={familyMembers} />
      <ChatMessage isFamilyMode={isFamilyMode} isDarkMode={isDarkMode} familyMembers={familyMembers} sessionId={sessionId} />
    </div>
  );
};

export default ChatHeader;