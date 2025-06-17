'use client'
import ChatHeader from '@/components/chat/ChatHeader';
import { Sidebar } from '@/components/sidebar';
import { useTheme } from '@/contexts/theme-context';
import React, { useState } from 'react';

const ChatBotPage = () => {
  const { isDarkMode } = useTheme();
  const [sessionId] = useState(() =>
    // 모던 브라우저라면
    window.crypto?.randomUUID?.() ??
    // 폴백
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  )

  console.log(sessionId)

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Sidebar className="hidden md:flex" />
      <ChatHeader isDarkMode={isDarkMode} />

    </div>
  );
};

export default ChatBotPage;