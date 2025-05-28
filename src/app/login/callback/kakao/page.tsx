'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { login } from '@/service/member';
import { handleApi } from '@/utils/handleApi';

export default function KakaoCallbackPage() {
  const code = useSearchParams()?.get('code');
  const router = useRouter();

  useEffect(() => {
    console.log(code)
    if (!code) return;
    (async () => {
      try {
        await handleApi(() => login(code));
        router.replace('/');
      } catch {
        alert('로그인 실패');
      }
    })();
  }, [code]);

  return <p>로그인 처리 중…</p>;
}
