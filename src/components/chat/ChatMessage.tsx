import { familyMember } from '@/types/chat.type';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import ChatbotInput from './ChatbotInput';
import TtsButton from './TtsButton';


//이거 그냥 임시로 갖다 씀
interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatMessageProps {
  isFamilyMode: boolean;
  familyMembers: familyMember[];
  isDarkMode: boolean;
}
const ChatMessage = ({ isFamilyMode, familyMembers, isDarkMode }: ChatMessageProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "안녕하세요! 개인 맞춤형 요금제 추천을 위한 MODi 챗봇입니다. 당신의 통신 상황에 맞는 최적의 요금제를 찾아드릴게요!",
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    // Update initial message based on family mode
    if (isFamilyMode && familyMembers.length > 0) {
      setMessages([
        {
          id: "1",
          content: `안녕하세요! 가족 맞춤형 요금제 추천을 위한 MODi 챗봇입니다. 현재 ${familyMembers.length}명의 가족 구성원 정보를 바탕으로 최적의 가족 결합 요금제를 찾아드릴게요! 💕`,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    } else {
      setMessages([
        {
          id: "1",
          content:
            "안녕하세요! 개인 맞춤형 요금제 추천을 위한 MODi 챗봇입니다. 당신의 통신 상황에 맞는 최적의 요금제를 찾아드릴게요!",
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }
  }, [isFamilyMode, familyMembers])


  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Fragment>
      <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-[#81C784] flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              )}
              <Card
                className={`max-w-[80%] ${message.isUser
                  ? "bg-[#388E3C] text-white border-[#388E3C]"
                  : isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-[#81C784]"
                  }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <div className="flex justify-end items-center mt-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {!message.isUser && (
                      <TtsButton />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <ChatbotInput isFamilyMode={isFamilyMode} setMessages={setMessages} />
    </Fragment>
  );
};

export default ChatMessage;
