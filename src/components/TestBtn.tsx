'use client'
import { test } from '@/service/member';
import { handleApi } from '@/utils/handleApi';
import React from 'react';

const TestBtn = () => {
  const testRequest = async () => {
    const data = await handleApi(() => test());
    console.log(data);
  }
  return (
    <div>
      <button onClick={testRequest}>권한확인테스트버튼</button>
    </div>
  );
};

export default TestBtn;