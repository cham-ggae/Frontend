// src/components/chat/ChatMessage.tsx
'use client'

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import ChatbotInput from './ChatbotInput'
import TtsButton from './TtsButton'
import { familyMember } from '@/types/chat'

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatMessageProps {
  isFamilyMode: boolean
  familyMembers: familyMember[]
  isDarkMode: boolean
}

export default function ChatMessage({
  isFamilyMode,
  familyMembers,
  isDarkMode,
}: ChatMessageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content:
        isFamilyMode && familyMembers.length > 0
          ? `안녕하세요! 가족 맞춤형 요금제 추천 챗봇 MODi입니다. 현재 ${familyMembers.length}명 가족 정보를 바탕으로 도와드릴게요! 💕`
          : '"안녕하세요! 개인 맞춤형 요금제 추천을 위한 MODi 챗봇입니다. 당신의 통신 상황에 맞는 최적의 요금제를 찾아드릴게요!"',
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(scrollToBottom, [messages])

  return (
    <Fragment>
      <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-[#81C784] flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              )}
              <Card
                className={`max-w-[80%] ${msg.isUser
                  ? 'bg-[#388E3C] text-white border-[#388E3C]'
                  : isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-[#81C784]'
                  }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  <div className="flex justify-end items-center mt-1">
                    <span className="text-xs opacity-70">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {!msg.isUser && <TtsButton />}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 입력 컴포넌트에 setMessages 넘겨 줍니다 */}
      <ChatbotInput isFamilyMode={isFamilyMode} setMessages={setMessages} />
    </Fragment>
  )
}
