import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Mic, Send } from 'lucide-react';
import { Input } from '../ui/input';
import { useTheme } from '@/contexts/theme-context';

interface ChatbotInputProps {
  isFamilyMode: boolean;
  setMessages: (a: any) => any;
}
const ChatbotInput = ({ isFamilyMode, setMessages }: ChatbotInputProps) => {
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState("")


  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: any = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: any = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }


  const getAIResponse = (input: string) => {
    // Individual-focused responses
    if (input.includes("데이터") || input.includes("무제한")) {
      return "데이터를 많이 사용하시는군요! 🐝 호박벌형 같은 분이시네요. 완전 무제한 데이터 요금제와 OTT 번들 상품을 추천드려요!"
    }

    if (input.includes("가족") || input.includes("할인")) {
      return "가족 요금제에 관심이 있으시군요! 🪲 장수풍뎅이형이시네요. 가족 결합 요금제로 더 많은 할인 혜택을 받아보세요! 우측 상단의 가족 모드를 켜시면 더 자세한 가족 맞춤 상담이 가능해요!"
    }

    return "더 자세한 상담을 위해 설문조사를 진행해보시는 것은 어떨까요? 당신에게 딱 맞는 요금제를 찾아드릴게요!"
  }

  return (
    <div className={`${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-[#81C784]"} border-t p-4`}>
      <div className="max-w-5xl mx-auto flex gap-2">
        <Button variant="outline" size="icon" className="border-[#81C784] text-[#388E3C]">
          <Mic className="w-4 h-4" />
        </Button>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isFamilyMode ? "가족 요금제에 대해 궁금한 점을 물어보세요..." : "메시지를 입력하세요..."}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className={`flex-1 border-[#81C784] focus-visible:ring-[#81C784] ${isDarkMode ? "bg-gray-700 text-white" : ""
            }`}
        />
        <Button onClick={handleSendMessage} size="icon" className="bg-[#81C784] hover:bg-[#388E3C]">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatbotInput;