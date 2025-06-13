"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.5, className = "" }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface SlideInProps {
    children: ReactNode
    direction?: "left" | "right" | "up" | "down"
    delay?: number
    duration?: number
    className?: string
}

export function SlideIn({ children, direction = "up", delay = 0, duration = 0.5, className = "" }: SlideInProps) {
    const directionMap = {
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        up: { x: 0, y: 50 },
        down: { x: 0, y: -50 },
    }

    const initial = directionMap[direction]

    return (
        <motion.div
            initial={{ opacity: 0, ...initial }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}
