import { useState } from "react"
import WireTerrainSynth from "./WireTerrainSynth"
import BlockTextReveal from "./BlockTextReveal"
import TextCarousel from "./TextCarousel"
import RotatingText from "./RotatingText"
import type { RotatingTextProps } from "./RotatingText"

const NAV = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
]

const PROJECTS = [
    {
        n: "01",
        title: "JS Quiz",
        tag: "JavaScript · Quiz App",
        url: "https://shaikzeeshanx.github.io/JS-QUIZZ/",
        thumb: "/thumbs/js-quiz.png",
    },
    {
        n: "02",
        title: "SociusAI",
        tag: "AI · Frontend",
        url: "https://sociusai-frontend.vercel.app",
        thumb: "/thumbs/sociusai.png",
    },
    {
        n: "03",
        title: "Jarvis",
        tag: "AI Assistant",
        url: "https://jarvis-nu-three-97.vercel.app",
        thumb: "/thumbs/jarvis.png",
    },
]

const SKILLS = [
    { group: "Programming Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "Java"] },
    {
        group: "Frontend Development",
        items: ["Next.js", "Tailwind CSS", "Advanced CSS", "Responsive Web Design", "Frontend Development"],
    },
    { group: "Backend & Web Technologies", items: ["Node.js", "REST APIs"] },
    { group: "Design", items: ["Figma", "UI Design", "Interface Design"] },
    { group: "Tools & Platforms", items: ["Git", "GitHub"] },
    { group: "Additional", items: ["Video Editing"] },
]

/* module-level so their object identity never changes — an inline literal
   would be a new object every render and restart the entrance tween */
const SKILL_FONT: NonNullable<RotatingTextProps["font"]> = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',
    fontSize: "25px",
    fontWeight: 900,
    letterSpacing: "-0.01em",
    lineHeight: "1.2em",
    textAlign: "left",
}

const SKILL_TRANSITION: NonNullable<RotatingTextProps["transition"]> = {
    type: "tween",
    duration: 0.4,
    delay: 0,
    ease: "easeOut",
    staggerChildren: 0.03,
}

/* one shared backdrop per section — six WebGL contexts would hit the
   browser's per-page limit, so every box reads through the same window */
function FluidBackdrop() {
    return (
        <iframe
            className="fluid-bg"
            src="/fluid.html"
            title=""
            aria-hidden="true"
            tabIndex={-1}
            loading="eager"
        />
    )
}

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function App() {
    const [openSkill, setOpenSkill] = useState<number | null>(null)

    return (
        <div className="page">
            {/* ── Scroll-driven background ── */}
            <div className="bg" aria-hidden="true">
                <WireTerrainSynth
                    background="#A21CAF"
                    skyTop="#7C3AED"
                    lineColor="#22D3EE"
                    accent="#FDE047"
                    density={64}
                    speed={50}
                    relief={100}
                    sunSize={100}
                    stars={60}
                    scrollGain={0.02}
                    settle={1.4}
                />
                <div className="bg-scrim" />
            </div>

            {/* ── Nav ── */}
            <header className="nav">
                <a className="brand" href="#home" onClick={(e) => (e.preventDefault(), scrollTo("home"))}>
                    <span className="brand-mark" />
                    <span className="brand-text">
                        <span className="brand-name">SHAIK ZEESHAN</span>
                        <span className="brand-sub">PORTFOLIO</span>
                    </span>
                </a>
                <nav>
                    {NAV.map((n) => (
                        <button key={n.id} onClick={() => scrollTo(n.id)}>
                            {n.label}
                        </button>
                    ))}
                </nav>
            </header>

            <main>
                {/* ── Hero ── */}
                <section id="home" className="hero">
                    <p className="eyebrow">Frontend Developer · Freelancer</p>
                    <BlockTextReveal
                        text={"Building\nmodern web experiences\nwith code and creativity."}
                        font={{
                            variant: "Bold",
                            fontSize: "clamp(60px, 10vw, 200px)",
                            fontFamily: '"Arial Black", "Helvetica Neue", Helvetica, Arial, sans-serif',
                            fontWeight: 900,
                            lineHeight: "0.94em",
                            letterSpacing: "-0.035em",
                            textAlign: "left",
                            textTransform: "uppercase",
                        }}
                        align="left"
                        textColor="#ffffff"
                        blockColor="#FDE047"
                        revealType="lines"
                        direction="left"
                        rounded={0}
                        speed={50}
                        highlight={[]}
                        style={{
                            minHeight: "40vh",
                            filter: "drop-shadow(0 16px 44px rgba(0, 0, 0, 0.62)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.45))",
                        }}
                    />
                    <div className="hero-actions">
                        <button className="btn primary" onClick={() => scrollTo("work")}>
                            View My Work
                        </button>
                        <button className="btn ghost" onClick={() => scrollTo("contact")}>
                            Contact Me
                        </button>
                    </div>
                    <div className="scroll-hint">
                        <span className="scroll-hint-line" />
                        Scroll to accelerate
                    </div>
                </section>

                {/* ── About ── */}
                <section id="about" className="panel">
                    <div className="panel-head">
                        <span className="index">01</span>
                        <h2>About</h2>
                    </div>
                    <div className="about-grid">
                        <p className="big">
                            I&apos;m Shaik Zeeshan, currently pursuing BTech in Computer Science Engineering. I work
                            as a freelance frontend developer and enjoy transforming ideas into attractive,
                            responsive, and interactive websites.
                        </p>
                        <div className="about-cols">
                            <p>
                                I have learned HTML, CSS, JavaScript, TypeScript, Python, and Java. I also work with
                                modern frontend technologies such as Next.js and Tailwind CSS, along with backend
                                technologies like Node.js and REST APIs.
                            </p>
                            <p>
                                I enjoy building web development projects, exploring new technologies,
                                participating in hackathons, and continuously improving my development skills.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Projects ── */}
                <section id="work" className="panel">
                    <div className="panel-head">
                        <span className="index">02</span>
                        <h2>Projects</h2>
                    </div>
                    <div className="work-stage">
                        <FluidBackdrop />
                        <div className="projects-grid">
                            {PROJECTS.map((p) => (
                                <article key={p.n} className="project-card">
                                    <a className="project-thumb" href={p.url} target="_blank" rel="noreferrer">
                                        <img src={p.thumb} alt={`${p.title} preview`} loading="lazy" />
                                    </a>
                                    <div className="project-body">
                                        <span className="project-n">{p.n}</span>
                                        <h3 className="project-title">
                                            <TextCarousel
                                                items={[{ t: p.title }, { t: p.tag, cls: "alt" }]}
                                                hold={[3600, 2600]}
                                            />
                                        </h3>
                                        <a className="project-link" href={p.url} target="_blank" rel="noreferrer">
                                            View Project →
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Skills ── */}
                <section id="skills" className="panel">
                    <div className="panel-head">
                        <span className="index">03</span>
                        <h2>Skills</h2>
                        <span className="panel-hint">Select a category to expand</span>
                    </div>
                    <div className="skills-stage">
                        <FluidBackdrop />
                        <div className="skills-grid">
                            {SKILLS.map((s, i) => {
                                const open = openSkill === i
                                return (
                                    <div key={s.group} className={`skill-card${open ? " open" : ""}`}>
                                        <button
                                            type="button"
                                            className="skill-head"
                                            aria-expanded={open}
                                            onClick={() => setOpenSkill(open ? null : i)}
                                        >
                                            <span className="skill-title">{s.group}</span>
                                            <span className="skill-meta">
                                                <span className="skill-count">{s.items.length}</span>
                                                <span className="skill-chev" aria-hidden="true">
                                                    +
                                                </span>
                                            </span>
                                        </button>

                                        <div className="skill-body">
                                            <div className="skill-body-inner">
                                                {open ? (
                                                    <div className="skill-rot">
                                                        <RotatingText
                                                            texts={s.items}
                                                            font={SKILL_FONT}
                                                            transition={SKILL_TRANSITION}
                                                            color="#2A0B3F"
                                                            prefixColor="#ffffff"
                                                            badgeBackground="#FDE047"
                                                            badgePaddingX={16}
                                                            badgePaddingY={6}
                                                            badgeRadius={10}
                                                            gap={10}
                                                            staggerFrom="first"
                                                            splitBy="characters"
                                                            auto
                                                        />
                                                    </div>
                                                ) : null}
                                                <ul>
                                                    {s.items.map((it) => (
                                                        <li key={it}>{it}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Contact ── */}
                <section id="contact" className="panel contact">
                    <div className="panel-head">
                        <span className="index">04</span>
                        <h2>Contact</h2>
                    </div>
                    <a className="contact-mail" href="mailto:shaikzeeshan90047@gmail.com">
                        shaikzeeshan90047@gmail.com
                    </a>
                    <div className="contact-links">
                        <a href="https://github.com/shaikzeeshanX" target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                    </div>
                    <footer className="foot">
                        <span>© 2026 Shaik Zeeshan</span>
                        <span>Built with React + Lenis</span>
                    </footer>
                </section>
            </main>
        </div>
    )
}
