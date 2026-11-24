import { useEffect, useState } from "react"

export interface CarouselItem {
    t: string
    cls?: string
}

interface Props {
    items: CarouselItem[]
    /** ms each item stays put — a number, or one entry per item */
    hold?: number | number[]
    /** ms of the roll itself */
    duration?: number
}

/**
 * TextCarousel — a masked vertical roll. The track slides by exactly one
 * `--tc-h` step per index, so every item lands flush in the window.
 */
export default function TextCarousel({ items, hold = 3000, duration = 750 }: Props) {
    const [i, setI] = useState(0)

    const ms = Array.isArray(hold)
        ? hold[Math.min(i, hold.length - 1)] ?? 3000
        : hold

    useEffect(() => {
        if (items.length < 2) return
        if (typeof window === "undefined" || !window.matchMedia) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const id = window.setTimeout(() => setI((v) => (v + 1) % items.length), ms)
        return () => window.clearTimeout(id)
    }, [i, items.length, ms])

    return (
        <span className="tc">
            <span
                className="tc-track"
                style={{
                    transform: `translateY(calc(${-i} * var(--tc-h)))`,
                    transitionDuration: `${duration}ms`,
                }}
            >
                {items.map((it, k) => (
                    <span key={k} className={it.cls ? `tc-item ${it.cls}` : "tc-item"}>
                        {it.t}
                    </span>
                ))}
            </span>
        </span>
    )
}
