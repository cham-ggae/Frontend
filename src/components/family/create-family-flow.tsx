"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FadeIn, SlideIn } from "@/components/ui/animations"
import { useTheme } from "@/contexts/theme-context"
import { Users, UserPlus, Heart, Shield } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useCreateFamily, useJoinFamily, useValidateInviteCode } from "@/hooks/family"
import { CreateFamilyRequest, COMBI_TYPES } from "@/types/family.type"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CreateFamilyFlow() {
    const { isDarkMode } = useTheme()
    const [mode, setMode] = useState<'create' | 'join'>('create')
    const [inviteCode, setInviteCode] = useState('')
    const [familyName, setFamilyName] = useState('')
    const [combiType, setCombiType] = useState<string>('')

    const createFamilyMutation = useCreateFamily()
    const joinFamilyMutation = useJoinFamily()
    const { data: inviteValidation, isLoading: isValidating } = useValidateInviteCode(inviteCode)

    const handleCreateFamily = () => {
        if (!familyName.trim() || !combiType) {
            return
        }

        const request: CreateFamilyRequest = {
            name: familyName.trim(),
            combiType: combiType as any
        }

        createFamilyMutation.mutate(request)
    }

    const handleJoinFamily = () => {
        if (!inviteCode.trim() || inviteCode.length !== 6) {
            return
        }

        joinFamilyMutation.mutate(inviteCode)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <FadeIn>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-full bg-[#81C784]/20 flex items-center justify-center mx-auto mb-4">
                            <Users className="w-10 h-10 text-[#388E3C]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#388E3C] mb-2">가족 스페이스</h1>
                        <p className={`${isDarkMode ? "text-gray-300" : "text-[#4E342E]"} opacity-70`}>
                            가족과 함께 요금제를 관리하고 더 많은 혜택을 받아보세요
                        </p>
                    </div>

                    {/* Mode Selection */}
                    <div className="flex gap-4 mb-8">
                        <Button
                            variant={mode === 'create' ? 'default' : 'outline'}
                            onClick={() => setMode('create')}
                            className={`flex-1 py-6 ${mode === 'create' ? 'bg-[#81C784] hover:bg-[#388E3C]' : 'border-[#81C784] text-[#388E3C] hover:bg-[#81C784]/10'}`}
                        >
                            <Heart className="w-5 h-5 mr-2" />
                            새 가족 만들기
                        </Button>
                        <Button
                            variant={mode === 'join' ? 'default' : 'outline'}
                            onClick={() => setMode('join')}
                            className={`flex-1 py-6 ${mode === 'join' ? 'bg-[#81C784] hover:bg-[#388E3C]' : 'border-[#81C784] text-[#388E3C] hover:bg-[#81C784]/10'}`}
                        >
                            <UserPlus className="w-5 h-5 mr-2" />
                            가족에 참여하기
                        </Button>
                    </div>

                    {mode === 'create' ? (
                        <SlideIn direction="up">
                            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                <CardHeader>
                                    <CardTitle className="flex items-center text-[#388E3C]">
                                        <Heart className="w-5 h-5 mr-2" />
                                        새 가족 스페이스 만들기
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="familyName">가족 이름</Label>
                                        <Input
                                            id="familyName"
                                            placeholder="우리가족"
                                            value={familyName}
                                            onChange={(e) => setFamilyName(e.target.value)}
                                            maxLength={30}
                                            className="border-[#81C784] focus-visible:ring-[#81C784]"
                                        />
                                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                            {familyName.length}/30자
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="combiType">결합 상품 타입</Label>
                                        <Select value={combiType} onValueChange={setCombiType}>
                                            <SelectTrigger className="border-[#81C784] focus:ring-[#81C784]">
                                                <SelectValue placeholder="결합 상품을 선택해주세요" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={COMBI_TYPES.TOGETHER}>
                                                    {COMBI_TYPES.TOGETHER}
                                                </SelectItem>
                                                <SelectItem value={COMBI_TYPES.EASY_FAMILY}>
                                                    {COMBI_TYPES.EASY_FAMILY}
                                                </SelectItem>
                                                <SelectItem value={COMBI_TYPES.UNLIMITED_LOVE}>
                                                    {COMBI_TYPES.UNLIMITED_LOVE}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className={`rounded-xl p-4 ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                                        <div className="flex items-start">
                                            <Shield className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                                            <div>
                                                <h4 className={`font-medium mb-1 ${isDarkMode ? "text-white" : "text-blue-900"}`}>
                                                    가족 스타트 혜택
                                                </h4>
                                                <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-blue-700"}`}>
                                                    가족 구성원 수에 따라 월 최대 52,000원까지 할인받을 수 있어요!
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleCreateFamily}
                                        disabled={!familyName.trim() || !combiType || createFamilyMutation.isPending}
                                        className="w-full bg-[#81C784] hover:bg-[#388E3C] py-6 text-lg"
                                    >
                                        {createFamilyMutation.isPending ? '생성 중...' : '가족 스페이스 만들기'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </SlideIn>
                    ) : (
                        <SlideIn direction="up">
                            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                <CardHeader>
                                    <CardTitle className="flex items-center text-[#388E3C]">
                                        <UserPlus className="w-5 h-5 mr-2" />
                                        가족에 참여하기
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="inviteCode">초대 코드</Label>
                                        <Input
                                            id="inviteCode"
                                            placeholder="6자리 초대 코드를 입력하세요"
                                            value={inviteCode}
                                            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                            maxLength={6}
                                            className="border-[#81C784] focus-visible:ring-[#81C784] text-center font-mono tracking-wider"
                                        />
                                    </div>

                                    {/* 초대 코드 검증 결과 */}
                                    {inviteCode.length === 6 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {isValidating ? (
                                                <Alert>
                                                    <AlertDescription>
                                                        초대 코드를 확인하고 있습니다...
                                                    </AlertDescription>
                                                </Alert>
                                            ) : inviteValidation?.valid ? (
                                                <Alert className="border-green-200 bg-green-50">
                                                    <AlertDescription className="text-green-800">
                                                        <strong>{inviteValidation.familyInfo?.name}</strong>에 참여할 수 있습니다!
                                                        <br />
                                                        현재 구성원: {inviteValidation.familyInfo?.memberCount}명
                                                    </AlertDescription>
                                                </Alert>
                                            ) : (
                                                <Alert className="border-red-200 bg-red-50">
                                                    <AlertDescription className="text-red-800">
                                                        {inviteValidation?.error || '유효하지 않은 초대 코드입니다.'}
                                                    </AlertDescription>
                                                </Alert>
                                            )}
                                        </motion.div>
                                    )}

                                    <Button
                                        onClick={handleJoinFamily}
                                        disabled={
                                            inviteCode.length !== 6 ||
                                            !inviteValidation?.valid ||
                                            joinFamilyMutation.isPending
                                        }
                                        className="w-full bg-[#81C784] hover:bg-[#388E3C] py-6 text-lg"
                                    >
                                        {joinFamilyMutation.isPending ? '참여 중...' : '가족에 참여하기'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </SlideIn>
                    )}
                </FadeIn>
            </div>
        </div>
    )
}
