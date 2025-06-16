// src/components/chat/ChatbotInput.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/button'
import { Mic, Send } from 'lucide-react'
import { Input } from '../ui/input'
import { useTheme } from '@/contexts/theme-context'
import SttButton from './SttButton'
import { useChatStream } from '@/hooks/useChatStream'
import { Message } from './ChatMessage'
import { v4 as uuidv4 } from 'uuid'

interface ChatbotInputProps {
  isFamilyMode: boolean
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function ChatbotInput({
  isFamilyMode,
  setMessages,
}: ChatbotInputProps) {
  const { isDarkMode } = useTheme()
  const [inputValue, setInputValue] = useState('')
  const { message: aiChunk, isStreaming, error, start, stop } =
    useChatStream()

  // 이 ref 에 새로 추가한 AI placeholder 메시지의 id 를 저장
  const aiMessageIdRef = useRef<string | null>(null)

  // 사용자가 전송 버튼 클릭했을 때
  const handleSend = () => {
    if (!inputValue.trim()) return

    // 1) 사용자 메시지 추가
    const userMsg: Message = {
      id: uuidv4(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    // 2) AI placeholder 메시지 추가 (content는 빈 문자열로 시작)
    const aiId = uuidv4()
    aiMessageIdRef.current = aiId
    const aiMsg: Message = {
      id: aiId,
      content: '',
      isUser: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg, aiMsg])

    // 3) 스트리밍 시작
    start(inputValue)
    setInputValue('')
  }

  // aiChunk가 갱신될 때마다 placeholder 메시지의 content만 업데이트
  useEffect(() => {
    if (!aiMessageIdRef.current) return
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageIdRef.current
          ? { ...msg, content: aiChunk, timestamp: msg.timestamp }
          : msg
      )
    )
  }, [aiChunk, setMessages])

  // 중단 버튼 처리: stop() 부르고 placeholder 메시지 유지
  const handleStop = () => {
    stop()
  }

  return (
    <div
      className={`border-t p-4 ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-[#81C784]'
        }`}
    >
      <div className="max-w-5xl mx-auto flex gap-2">
        <SttButton />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            isFamilyMode
              ? '가족 요금제에 대해 궁금한 점을 물어보세요...'
              : '메시지를 입력하세요...'
          }
          onKeyPress={(e) => (e.key === 'Enter' && !isStreaming) && handleSend()}
          className={`flex-1 border-[#81C784] focus-visible:ring-[#81C784] ${isDarkMode ? 'bg-gray-700 text-white' : ''
            }`}
        />

        {isStreaming ? (
          <Button onClick={handleStop} size="icon" className="bg-red-500">
            중단
          </Button>
        ) : (
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-[#81C784] hover:bg-[#388E3C]"
          >
            <Send className="w-4 h-4" />
          </Button>
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-500">
          에러 발생: {error.message}
        </div>
      )}
    </div>
  )
}
