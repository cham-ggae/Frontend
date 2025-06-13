'use client'
import { useTheme } from '@/contexts/theme-context';
import { familyMember } from '@/types/chat';
import React, { Fragment } from 'react';
import FamilyMemberItem from './FamilyMemberItem';
interface FamilyMemberInfo {
  isFamilyMode: boolean;
  familyMembers: familyMember[];
}
const FamilyMemberInfo = ({ isFamilyMode, familyMembers }: FamilyMemberInfo) => {
  const { isDarkMode } = useTheme();

  return (
    <Fragment>
      {isFamilyMode && (
        <div
          className={`${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-[#F1F8E9] border-[#81C784]"} border-b p-4`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center space-x-4 overflow-x-auto">
              <span
                className={`text-sm font-medium whitespace-nowrap ${isDarkMode ? "text-gray-300" : "text-[#4E342E]"}`}
              >
                가족 구성원:
              </span>
              {familyMembers.map((member, idx) => (
                <FamilyMemberItem isDarkMode={isDarkMode} item={member} key={idx} />
              ))}
            </div>
          </div>
        </div>
      )
      }
    </Fragment>
  );
};

export default FamilyMemberInfo;