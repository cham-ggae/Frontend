"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme-context"

export function FamilyDashboardSkeleton() {
    const { isDarkMode } = useTheme()

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
            {/* Header Skeleton */}
            <div className="hidden md:flex items-center mb-8">
                <Skeleton className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Overview Skeleton */}
                <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                            <Skeleton className="h-8 w-48 mx-auto mb-2" />
                            <Skeleton className="h-4 w-32 mx-auto" />
                        </div>

                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                                <Skeleton className="w-12 h-12 rounded-full mr-4" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                                <Skeleton className="h-6 w-12 rounded-full" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Invite Skeleton */}
                <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                            <Skeleton className="h-4 w-48 mb-2" />
                            <Skeleton className="h-3 w-64" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                        <div className="flex gap-2">
                            <Skeleton className="flex-1 h-10" />
                            <Skeleton className="w-10 h-10" />
                        </div>
                        <Skeleton className="w-full h-12" />
                    </CardContent>
                </Card>
            </div>

            {/* Message Cards Skeleton */}
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-9 w-40" />
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-40 rounded-xl bg-gray-50 dark:bg-gray-700 p-4">
                                <Skeleton className="h-4 w-16 mb-2" />
                                <Skeleton className="h-20 w-full mb-2" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Plan Sharing Skeleton */}
            <Card className={`border border-[#81C784] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-5 rounded-xl border bg-gray-50 dark:bg-gray-700">
                                <div className="flex items-start">
                                    <Skeleton className="w-8 h-8 mr-4" />
                                    <div className="flex-1">
                                        <Skeleton className="h-5 w-32 mb-2" />
                                        <Skeleton className="h-4 w-48 mb-3" />
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                            <Skeleton className="h-8 w-24" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
