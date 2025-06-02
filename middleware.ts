// middleware.ts (프로젝트 루트)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 *  인증 미들웨어
 * - 보호할 경로만 명시 (기본은 모두 공개)
 * - 보호 라우트 추가
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 토큰 확인
    const accessToken =
        request.cookies.get('accessToken')?.value ||
        request.headers.get('authorization')?.replace('Bearer ', '')

    // ===== 보호할 경로만 명시 (화이트리스트 방식) =====
    const protectedPaths = [
        '/admin',         // 관리자
        // 여기에 보호 라우트 경로 추가
    ]

    // 보호된 경로인지 확인
    const isProtectedPath = protectedPaths.some(path =>
        pathname.startsWith(path)
    )

    // 보호된 경로가 아니면 통과
    if (!isProtectedPath) {
        return NextResponse.next()
    }

    // 보호된 경로인데 토큰이 없으면 로그인으로
    if (!accessToken) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // 이미 로그인한 사용자가 로그인 페이지 접근 시 홈으로
    if (pathname === '/login' && accessToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

//  성능 최적화 매처 설정
export const config = {
    matcher: [
        /*
         * 다음을 제외한 모든 경로에서 실행:
         * - API routes는 별도 처리
         * - 정적 파일들 제외
         * - Next.js 내부 파일들 제외
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
