import { useLayoutEffect, useRef } from "react"
import type { CSSProperties } from "react"

type Seg = { t: string; grad?: boolean }

type Line = { big: boolean; segs: Seg[] }

/* Two visual tiers: the first two lines are the big bold statement,
   the last two are the smaller tagline underneath. */
const LINES: Line[] = [
    { big: true, segs: [{ t: "Building modern" }] },
    { big: true, segs: [{ t: "web " }, { t: "experiences", grad: true }] },
    { big: false, segs: [{ t: "with code and" }] },
    { big: false, segs: [{ t: "creativity." }] },
]

const RENDER = LINES.map((line) => {
    const total = line.segs.reduce((a, s) => a + s.t.length, 0)
    let i = 0
    return {
        big: line.big,
        segs: line.segs.map((s) => {
            const start = i
            i += s.t.length
            return { ...s, start, total }
        }),
    }
})

const STEP = 0.035

function Chars({ text, start, total, grad }: { text: string; start: number; total: number; grad?: boolean }) {
    return (
        <>
            {[...text].map((c, k) => {
                if (c === " ") return " "
                const i = start + k
                const delay = (total - 1 - i) * STEP
                return (
                    <span
                        key={k}
                        className={grad ? "ch grad" : "ch"}
                        style={
                            {
                                "--i": String(i),
                                "--n": String(total - 1),
                                "--d": `${delay.toFixed(3)}s`,
                            } as CSSProperties
                        }
                    >
                        {c}
                    </span>
                )
            })}
        </>
    )
}

export default function HeroTitle() {
    const rootRef = useRef<HTMLHeadingElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return
        const apply = () => {
            root.querySelectorAll<HTMLElement>(".run").forEach((run) => {
                const w = run.offsetWidth
                run.querySelectorAll<HTMLElement>(".ch.grad").forEach((ch) => {
                    ch.style.setProperty("--gsize", `${w}px`)
                    ch.style.setProperty("--gx", `${-ch.offsetLeft}px`)
                })
            })
        }
        apply()
        const ro = new ResizeObserver(apply)
        ro.observe(root)
        return () => ro.disconnect()
    }, [])

    return (
        <h1
            className="hero-title"
            ref={rootRef}
            aria-label="Building modern web experiences with code and creativity."
        >
            {RENDER.map((line, li) => (
                <span className={`ln ${line.big ? "big" : "sm"}`} key={li} aria-hidden="true">
                    {line.segs.map((s, si) =>
                        s.grad ? (
                            <em className="run" key={si}>
                                <Chars text={s.t} start={s.start} total={s.total} grad />
                            </em>
                        ) : (
                            <Chars key={si} text={s.t} start={s.start} total={s.total} />
                        ),
                    )}
                </span>
            ))}
        </h1>
    )
}
