"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageCircle, Users, Sprout, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useFamilySpace } from "@/contexts/family-space-context"
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { hasFamilySpace } = useFamilySpace()
  const {logout} = useAuth();
  const menuItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "메인페이지",
      disabled: false,
    },
    {
      href: "/chat",
      icon: MessageCircle,
      label: "챗봇",
      disabled: false,
    },
    {
      href: "/family",
      icon: Users,
      label: "가족 스페이스",
      disabled: !hasFamilySpace,
    },
    {
      href: "/plant-game",
      icon: Sprout,
      label: "새싹 키우기",
      disabled: !hasFamilySpace,
    },
    {
      href: "/my-page",
      icon: User,
      label: "마이페이지",
      disabled: false,
    },
  ]

  return (
    <aside
      className={cn(
        "w-64 bg-white dark:bg-gray-800 border-r border-[#81C784] dark:border-gray-600 flex flex-col",
        className,
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-[#388E3C]">
          MODi
        </Link>
        <ThemeToggle variant="ghost" size="icon" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                {item.disabled ? (
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-not-allowed opacity-50",
                      "text-[#4E342E] dark:text-gray-300",
                    )}
                    title="가족 스페이스를 먼저 생성해주세요"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-[#81C784] text-white shadow-sm"
                        : "text-[#4E342E] dark:text-gray-300 hover:bg-[#F1F8E9] dark:hover:bg-gray-700 hover:text-[#388E3C]",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 mt-auto">
        <Button
            onClick={logout}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                "bg-[#81C784] hover:bg-[#66BB6A] text-white"
            )}
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </Button>
      </div>
    </aside>
  )
}
