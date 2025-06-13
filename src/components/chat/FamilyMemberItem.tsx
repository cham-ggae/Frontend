import { familyMember } from '@/types/chat';
import React, { memo } from 'react';

interface FamilyMemberItemProps {
  item: familyMember;
  isDarkMode: boolean;
}
const FamilyMemberItem = ({ item, isDarkMode }: FamilyMemberItemProps) => {
  return (
    <div>
      <div
        className={`flex items-center space-x-2 px-3 py-1 rounded-full whitespace-nowrap ${isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
      >
        {/* 이거 img 태그로 수정 필요 */}
        <span className="text-lg">{item.profile_image}</span>
        <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}>
          {item.name}
        </span>
        <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{item.plan_name}</span>
      </div>
    </div>
  );
};

export default memo(FamilyMemberItem);