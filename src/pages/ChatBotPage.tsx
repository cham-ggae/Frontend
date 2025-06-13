'use client'
import ChatHeader from '@/components/chat/ChatHeader';
import { Sidebar } from '@/components/sidebar';
import { useTheme } from '@/contexts/theme-context';
import React from 'react';

const ChatBotPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Sidebar className="hidden md:flex" />

      <ChatHeader isDarkMode={isDarkMode} />
    </div>
  );
};

export default ChatBotPage;