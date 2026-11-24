import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

/**
 * Lenis smooth scrolling (darkroomengineering/lenis) — per the `lenis-smooth-scroll` skill.
 * Drives buttery momentum scrolling on wheel/trackpad, and feeds the scroll
 * position that the SunsetDrive background animation follows.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            }}
        >
            {children}
        </ReactLenis>
    )
}
