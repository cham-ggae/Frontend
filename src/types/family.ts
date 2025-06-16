export interface FamilySpace {
    fid: number
    name: string
    inviteCode: string
    combiType: string
    nutrial: number
    createdAt: string
    daysAfterCreation?: number // 가족 스페이스 생성 후 경과 일 수
} // 가족 스페이스 정보 형식

export interface FamilyMember {
    uid: number
    name: string
    age?: string
    gender?: string
    joinDate: string
    planId?: number
    planName?: string
    price?: number
    benefit?: string
    dataUsage?: string
    profileImage?: string
    planSummary?: string
}

export interface CreateFamilyRequest {
    name: string
    combiType: '투게더 결합' | '참쉬운 가족 결합'
} // 가족 생성 후 응답 형식

export interface FamilyDashboardResponse {
    family: FamilySpace
    members: FamilyMember[]
    totalMembers: number
    membersWithPlan: number
} // 가족 대시보트 페이지 조회 응답 형식
