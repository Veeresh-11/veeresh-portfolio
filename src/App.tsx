import { useEffect, useRef, useState } from "react"
import portrait from "./veeresh.jpeg"

/* ----------------------------------------------------------------- data */

const DISCIPLINES = [
  "Full-Stack Development", "Cloud Architecture", "3D Web Graphics",
  "DevSecOps", "LIMS Automation", "Digital Twins",
]

const TOOLS = [
  "Rust", "TypeScript", "Python · FastAPI", "C# · .NET", "Microsoft Azure",
  "Oracle Cloud", "Three.js", "Docker", "GitHub Actions",
]

const CREDENTIALS = [
  { title: "SIH 2022 Winner", sub: "Hardware Edition · Govt of India, MoE" },
  { title: "Microsoft Certified", sub: "AZ-900 & SC-900 · 2024" },
  { title: "2.5+ Years", sub: "Enterprise engineering at Zifo" },
]

const SERVICES = [
  {
    no: "01",
    title: "Full-Stack Cloud Development",
    body: "End-to-end systems on Azure and OCI — typed APIs in FastAPI and .NET Core, Redis-backed services, and resilient data layers built to scale under real load.",
  },
  {
    no: "02",
    title: "Enterprise LIMS & Automation",
    body: "SampleManager and LabVantage environments with hardened C# document transactions, PowerShell automation, and Power BI reporting for global AMER clients.",
  },
  {
    no: "03",
    title: "DevSecOps & Multi-Cloud",
    body: "Security-first GitHub Actions pipelines validated across 12+ scanners — Snyk, SonarQube, Trivy, CodeQL, OWASP ZAP — deployed resiliently across Azure and OCI.",
  },
  {
    no: "04",
    title: "3D Web Graphics & Digital Twins",
    body: "Lightweight, high-performance 3D portals with React, Three.js, and Babylon.js, driven by low-poly assets modelled and rigged in Blender and Maya.",
  },
]

const PROJECTS = [
  {
    name: "Meika Security Suite",
    role: "Lead Architect & Creator",
    tag: "IAM · Rust · DevSecOps",
    body: "A modular, production-ready Identity & Access Management stack blending the ideas behind Okta and Samsung Knox — engineered end-to-end, from a proprietary cipher up to a hardened multi-cloud deployment.",
    year: "2026",
    link: "https://meikadocs.vercel.app/",
    stack: ["Rust", "Python · FastAPI", "Redis", "YAML", "GitHub Actions", "Azure", "OCI"],
    highlights: [
      "Meika256 — a low-latency proprietary 256-bit cipher in Rust with thread-safe memory allocation and optimised execution speed.",
      "Meika Secure — a hardened FastAPI + Redis core driven by granular YAML engines that dictate system authorization rules.",
      "Meika-Devops — a GitHub Actions suite validating codebase health across 12+ scanners (Snyk, SonarQube, Trivy, CodeQL, OWASP ZAP, Bandit, Nuclei).",
      "Multi-cloud deployment of resilient virtual machines and databases across Microsoft Azure and Oracle Cloud (OCI).",
    ],
  },
  {
    name: "Enterprise LIMS Data Platform",
    role: "Analyst — LIMS Software Engineer · Zifo",
    tag: "C# .NET · Oracle · LIMS",
    body: "Architected and customised SampleManager and LabVantage environments for high-tier AMER Pharma, Chemical, Mining, and Food Tech clients under the ThermoFisher partner network.",
    year: "2023—25",
    link: null,
    stack: ["C# · .NET Core", "VB.NET", "PowerShell", "Oracle DB", "PostgreSQL", "Power BI"],
    highlights: [
      "Built a highly secure document transaction framework leveraging advanced C# (.NET Core) compilation patterns.",
      "Engineered scalable backend service layers and platform extensions in VB.NET, .NET Framework, and .NET Core.",
      "Designed low-latency pipelines linking Instrument Manager to Oracle, PostgreSQL, and MySQL databases.",
      "Automated server configuration, database migrations, and executive Power BI reporting via PowerShell across Windows and Linux.",
    ],
  },
  {
    name: "Freelance 3D Web & Portals",
    role: "Freelance Full-Stack & 3D Engineer",
    tag: "Three.js · React · Blender",
    body: "Architected, styled, and delivered lightweight web portals and interactive 3D experiences for 3+ business clients as an independent contractor.",
    year: "2025",
    link: null,
    stack: ["React", "TypeScript", "Three.js", "Babylon.js", "Blender", "Maya"],
    highlights: [
      "Delivered responsive web portals and user platforms for 3+ business clients using React and TypeScript.",
      "Modelled, rigged, and optimised interactive low-poly assets in Blender and Maya.",
      "Built performant 3D web experiences and digital twins with Three.js and Babylon.js.",
    ],
  },
  {
    name: "Loco-Agent Integration Engine",
    role: "AI Systems Developer",
    tag: "Agentic · LLM · Middleware",
    body: "An automated agentic middleware platform for orchestrating LLM reasoning — managing dynamic tool integrations and asynchronous, multi-step workflows.",
    year: "2025",
    link: null,
    stack: ["JavaScript", "LLM Tooling", "Async Workflows"],
    highlights: [
      "Engineered middleware managing dynamic contextual tool integrations for autonomous systems.",
      "Coordinated asynchronous, multi-step reasoning workflows across LLM-driven pipelines.",
    ],
  },
  {
    name: "SIH 2022 Hardware Winner",
    role: "Winner — Smart India Hackathon 2022",
    tag: "IoT · Embedded C · Sensors",
    body: "First-prize hardware-integrated IoT solution at Smart India Hackathon 2022 (Hardware Edition), recognised by the Government of India, Ministry of Education.",
    year: "2022",
    link: null,
    stack: ["Embedded C", "IoT", "Real-time Sensors"],
    highlights: [
      "Designed and built a functional, hardware-integrated IoT solution to solve an industry-level operational bottleneck.",
      "Combined embedded C, real-time sensor processing, and custom embedded mechanics.",
    ],
  },
]

const RECOGNITION = [
  {
    quote:
      "First prize at Smart India Hackathon 2022, Hardware Edition — a functional IoT solution recognised by the Government of India, Ministry of Education.",
    who: "SIH 2022",
    role: "National Hardware Winner",
  },
  {
    quote:
      "2.5 years delivering high-impact LIMS and data automation for global AMER Pharma, Chemical, and Mining clients under the ThermoFisher partner network.",
    who: "Zifo Technologies",
    role: "LIMS Software Engineer",
  },
  {
    quote:
      "Microsoft-certified across Azure Fundamentals (AZ-900) and Security, Compliance & Identity (SC-900), plus an AI Generalist certification from Outskill.",
    who: "Microsoft & Outskill",
    role: "Cloud · Security · AI",
  },
]

const FOCUS = [
  {
    tag: "Security",
    title: "Low-latency cryptography in Rust",
    body: "Building Meika256 — a thread-safe, memory-optimised 256-bit cipher — and the hardened services around it.",
  },
  {
    tag: "3D Web",
    title: "Interactive digital twins",
    body: "Responsive Three.js and Babylon.js experiences powered by optimised low-poly assets from Blender and Maya.",
  },
  {
    tag: "AI Systems",
    title: "Agentic middleware",
    body: "Orchestrating contextual tool use and asynchronous reasoning workflows for autonomous LLM-driven systems.",
  },
]

const NAV = [
  ["about", "About"],
  ["experience", "Experience"],
  ["work", "Projects"],
  ["services", "Services"],
  ["contact", "Contact"],
]

const SOCIALS = [
  ["GitHub", "https://github.com/Veeresh-11"],
  ["LinkedIn", "https://linkedin.com"],
  ["Meika Platform", "https://meikadocs.vercel.app/"],
]

/* --------------------------------------------------------------- sparkle */

function Sparkle({ className = "" }: { className?: string }) {
  return <span className={`text-accent ${className}`}>✦</span>
}

/* ------------------------------------------------------------- cursor */

function useCustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const dot = document.createElement("div")
    const ring = document.createElement("div")
    dot.className = "cursor-dot"
    ring.className = "cursor-ring"
    document.body.append(dot, ring)

    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my
    let raf = 0

    const move = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      const t = e.target as HTMLElement
      ring.dataset.active = t.closest("a, button, [data-cursor]") ? "true" : "false"
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    const leave = () => { dot.style.opacity = "0"; ring.style.opacity = "0" }
    const enter = () => { dot.style.opacity = "1"; ring.style.opacity = "1" }

    window.addEventListener("pointermove", move)
    document.addEventListener("pointerleave", leave)
    document.addEventListener("pointerenter", enter)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerleave", leave)
      document.removeEventListener("pointerenter", enter)
      dot.remove(); ring.remove()
    }
  }, [])
}

/* ------------------------------------------------------------- reveal */

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* --------------------------------------------------------- magnetic btn */

function Magnetic({
  children,
  className = "",
  ...props
}: React.ComponentProps<"a">) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.28}px, ${(e.clientY - (r.top + r.height / 2)) * 0.32}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)"
  }
  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

/* --------------------------------------------------------------- pieces */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
      <Sparkle />
      {children}
    </span>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface/60 px-4 py-2 font-mono text-[12px] tracking-tight text-foreground backdrop-blur-sm">
      {children}
    </span>
  )
}

/* Thin accent bar that tracks scroll progress */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      el.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden
      className="progress fixed inset-x-0 top-0 z-[60] h-0.5 bg-accent"
    />
  )
}

/* Hero name — mask reveal that plays on load */
function HeroName() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      ref.current?.classList.add("is-visible")
    )
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <h1
      ref={ref}
      className="mask mt-6 font-display text-[clamp(2.75rem,9vw,7.5rem)] font-black leading-[0.9] tracking-tight"
    >
      <span>VEERESH</span>
    </h1>
  )
}

/* Live site preview framed as a browser window */
function BrowserFrame({
  url,
  label,
  title,
}: {
  url: string
  label: string
  title: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-2 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
        <span className="mx-2 flex-1 truncate rounded-md bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
          {label}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          data-cursor
          className="font-mono text-[11px] text-accent transition-opacity hover:opacity-70"
        >
          Open ↗
        </a>
      </div>
      <div className="relative aspect-[16/10] bg-background">
        <iframe
          src={url}
          title={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  )
}

/* Line-mask heading — reveals from below when scrolled into view */
function MaskHeading({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <h2 ref={ref} className={`mask ${className}`}>
      <span>{children}</span>
    </h2>
  )
}

/* Count-up number that animates once on scroll into view */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const num = parseFloat(value)
    if (Number.isNaN(num)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const suffix = value.replace(/[0-9.]/g, "")
    const decimals = value.includes(".") ? 1 : 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1200
        const step = (now: number) => {
          const t = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay((num * eased).toFixed(decimals) + suffix)
          if (t < 1) requestAnimationFrame(step)
          else setDisplay(value)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])
  return <span ref={ref}>{display}</span>
}

/* Detailed, expandable project row */
function ProjectRow({
  project,
  index,
  open,
  onToggle,
}: {
  project: (typeof PROJECTS)[number]
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="reveal group border-t border-border" style={{ transitionDelay: `${index * 70}ms` }}>
      <button
        type="button"
        onClick={onToggle}
        data-cursor
        aria-expanded={open}
        className="flex w-full items-start gap-6 py-8 text-left transition-colors duration-300 hover:text-accent"
      >
        <span className="mt-2 hidden font-mono text-[12px] text-muted-foreground sm:block">
          0{index + 1}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <h3 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-tight">
              {project.name}
            </h3>
            <span className="font-mono text-[12px] text-accent">{project.year}</span>
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {project.role} — {project.tag}
          </p>
        </div>
        <span
          className={`mt-3 shrink-0 text-2xl leading-none text-accent transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div className={`expandable ${open ? "open" : ""}`}>
        <div>
          <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{project.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {project.link && (
                <Magnetic
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="mt-6 rounded-full bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-foreground"
                >
                  Visit project ↗
                </Magnetic>
              )}
            </div>
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <Sparkle className="mt-0.5 shrink-0 text-[11px]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- app */

export default function App() {
  useCustomCursor()
  useReveal()
  const [time, setTime] = useState("")
  const [openProject, setOpenProject] = useState<number | null>(0)

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      )
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono text-sm tracking-tight">
            VEERESH<span className="text-accent">✦</span>
          </a>
          <nav className="hidden gap-8 md:flex">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="group relative font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <span className="hidden font-mono text-[12px] text-muted-foreground sm:block">
            MDU · {time} IST
          </span>
        </div>
      </header>

      {/* keyword marquee */}
      <div className="marquee overflow-hidden border-b border-border pt-[4.5rem]">
        <div className="marquee-track py-3">
          {[...DISCIPLINES, ...DISCIPLINES, ...DISCIPLINES].map((d, i) => (
            <span
              key={i}
              className="mx-5 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {d} <Sparkle className="ml-5" />
            </span>
          ))}
        </div>
      </div>

      <main id="top" className="mx-auto max-w-6xl px-6">
        {/* hero */}
        <section className="pt-16 pb-20 md:pt-24">
          <div className="reveal">
            <Eyebrow>Hey! I&rsquo;m a Software Engineer</Eyebrow>
          </div>

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <HeroName />
            </div>
            {/* Portrait */}
            <div className="reveal flex justify-center md:justify-end">
              <div
                data-cursor
                className="float group relative aspect-[4/5] w-60 overflow-hidden rounded-3xl border border-border bg-surface sm:w-72"
              >
                <img
                  src={portrait}
                  alt="Veeresh Babu V K, smiling in front of a red abstract mural"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground backdrop-blur">
                  Madurai, IN
                </span>
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-foreground" />
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="reveal mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end">
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
              I&rsquo;m <span className="text-foreground">Veeresh Babu V K</span> — a
              full-stack cloud developer who builds{" "}
              <span className="text-foreground">secure, low-latency</span> systems,
              multi-cloud infrastructure, and interactive 3D web experiences that
              help teams ship products that perform and scale.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Magnetic
                href="#contact"
                data-cursor
                className="rounded-full bg-accent px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-accent-foreground"
              >
                Let&rsquo;s collaborate
              </Magnetic>
              <Magnetic
                href="#work"
                data-cursor
                className="rounded-full border border-border px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                View work
              </Magnetic>
            </div>
          </div>

          {/* tool pills */}
          <div className="reveal mt-12 flex flex-wrap items-center gap-3">
            {TOOLS.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                <Pill>{t}</Pill>
                {i < TOOLS.length - 1 && <Sparkle className="opacity-50" />}
              </span>
            ))}
          </div>

          {/* credential badges */}
          <div className="reveal mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {CREDENTIALS.map((c) => (
              <div key={c.title} className="bg-background/80 p-6">
                <div className="flex items-center gap-2 font-display text-2xl font-light">
                  <Sparkle className="text-lg" />
                  {c.title}
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {c.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* about */}
        <section id="about" className="border-t border-border py-24">
          <div className="grid gap-12 md:grid-cols-[0.5fr_1fr]">
            <div className="reveal">
              <Eyebrow>About</Eyebrow>
            </div>
            <div className="reveal">
              <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.28]">
                An award-winning biomedical engineer turned systems builder. 2.5
                years at Zifo — a ThermoFisher partner — delivering LIMS and data
                automation for global AMER clients. Today I focus on full-stack
                systems, multi-cloud on{" "}
                <span className="text-accent">Azure &amp; OCI</span>, and 3D web
                graphics.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
                {[
                  ["2.5", "Years · .NET"],
                  ["12+", "Security scanners"],
                  ["4", "Certifications"],
                  ["1st", "SIH 2022 · Hardware"],
                ].map(([n, l], i) => (
                  <div key={l} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                    <div className="font-display text-4xl font-semibold text-accent">
                      <CountUp value={n} />
                    </div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="border-t border-border py-24">
          <div className="reveal mb-12 max-w-2xl">
            <Eyebrow>Experience</Eyebrow>
            <MaskHeading className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05]">
              Two and a half years engineering .NET at scale.
            </MaskHeading>
          </div>

          <article className="reveal overflow-hidden rounded-3xl border border-border bg-surface/40 backdrop-blur-sm">
            <div className="grid gap-8 p-8 md:grid-cols-[1fr_1.3fr] md:p-12">
              <div className="md:border-r md:border-border md:pr-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Most recent salaried role
                </span>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-tight">
                  Analyst — LIMS Software Engineer
                </h3>
                <p className="mt-2 text-lg text-foreground">Zifo Technologies</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  ThermoFisher partner network · Global AMER clients
                </p>
                <div className="mt-6 flex flex-wrap gap-6 border-t border-border pt-6">
                  <div>
                    <div className="font-display text-3xl font-semibold text-accent">
                      <CountUp value="2.5" /> yrs
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Hands-on .NET
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-semibold">
                      Jun &rsquo;23
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      → Sep &rsquo;25
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["C# · .NET Core", "VB.NET", ".NET Framework", "PowerShell", "Oracle DB", "Power BI"].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Delivered high-impact LIMS and data automation for global AMER Pharma, Chemical, Mining, and Food Tech clients.",
                  "Built a highly secure document transaction framework using advanced C# (.NET Core) compilation patterns.",
                  "Engineered scalable backend service layers and platform extensions across VB.NET, .NET Framework, and .NET Core.",
                  "Designed low-latency pipelines linking Instrument Manager to Oracle, PostgreSQL, and MySQL databases.",
                  "Automated server configuration, database migrations, and executive Power BI reporting via PowerShell.",
                ].map((h, i) => (
                  <li
                    key={h}
                    className="reveal flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        {/* services */}
        <section id="services" className="border-t border-border py-24">
          <div className="reveal mb-14 max-w-2xl">
            <Eyebrow>Services</Eyebrow>
            <MaskHeading className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05]">
              Systems built for modern teams.
            </MaskHeading>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I help startups and enterprises design secure, performant software —
              from the cloud infrastructure up to the interface.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <div
                key={s.no}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="reveal group bg-background p-8 transition-colors duration-300 hover:bg-surface md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-muted-foreground">{s.no}</span>
                  <Sparkle className="opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-light">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* work */}
        <section id="work" className="border-t border-border py-24">
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Eyebrow>Projects</Eyebrow>
              <MaskHeading className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05]">
                Digital systems for better business.
              </MaskHeading>
            </div>
            <Magnetic
              href="https://github.com/Veeresh-11"
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="rounded-full border border-border px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
            >
              View all work ↗
            </Magnetic>
          </div>

          {/* featured — Meika Security Suite */}
          <article className="reveal glow relative mb-10 overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-sm md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
                  <Sparkle className="text-[10px] text-accent-foreground" /> Featured · Live
                </span>
                <h3 className="mt-6 font-display text-[clamp(2rem,5vw,3.25rem)] font-black leading-[0.95]">
                  Meika<br />Security Suite
                </h3>
                <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                  {PROJECTS[0].body}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Magnetic
                    href="https://meikadocs.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                    className="rounded-full bg-accent px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-accent-foreground"
                  >
                    Live Platform ↗
                  </Magnetic>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {PROJECTS[0].stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="space-y-4 md:border-l md:border-border md:pl-10">
                {PROJECTS[0].highlights.map((h, i) => (
                  <li
                    key={h}
                    className="reveal flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* live site preview */}
            <div className="relative mt-10">
              <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <Sparkle className="text-[10px]" /> Live platform · meikadocs.vercel.app
              </div>
              <BrowserFrame
                url="https://meikadocs.vercel.app/"
                label="meikadocs.vercel.app"
                title="Meika Security Suite — live platform"
              />
            </div>
          </article>

          <div className="border-b border-border">
            {PROJECTS.slice(1).map((p, i) => (
              <ProjectRow
                key={p.name}
                project={p}
                index={i}
                open={openProject === i}
                onToggle={() => setOpenProject(openProject === i ? null : i)}
              />
            ))}
          </div>
          <p className="mt-6 font-mono text-[12px] text-muted-foreground">
            <Sparkle className="mr-2" /> Click any project to expand the full breakdown.
          </p>
        </section>

        {/* recognition */}
        <section className="border-t border-border py-24">
          <div className="reveal mb-14 max-w-2xl">
            <Eyebrow>Recognition</Eyebrow>
            <MaskHeading className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05]">
              Track record teams trust.
            </MaskHeading>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {RECOGNITION.map((r, i) => (
              <figure
                key={r.who}
                style={{ transitionDelay: `${i * 90}ms` }}
                className="reveal flex flex-col rounded-2xl border border-border bg-surface/50 p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <Sparkle className="text-xl" />
                <blockquote className="mt-6 flex-1 font-display text-lg font-light leading-relaxed">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-mono text-[13px] text-foreground">{r.who}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {r.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* focus / insights */}
        <section className="border-t border-border py-24">
          <div className="reveal mb-14 max-w-2xl">
            <Eyebrow>Currently</Eyebrow>
            <MaskHeading className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05]">
              Where my focus is right now.
            </MaskHeading>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FOCUS.map((f, i) => (
              <div
                key={f.title}
                style={{ transitionDelay: `${i * 90}ms` }}
                className="reveal group rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-surface"
              >
                <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {f.tag}
                </span>
                <h3 className="mt-6 font-display text-xl font-light transition-colors duration-300 group-hover:text-accent">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* contact cta */}
        <section id="contact" className="border-t border-border py-28">
          <div className="reveal text-center">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95]">
              Let&rsquo;s turn ideas into{" "}
              <span className="italic text-accent">systems.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-lg leading-relaxed text-muted-foreground">
              Open to Full-Stack Developer and Digital Twin Engineer roles, plus
              select freelance collaborations.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic
                href="mailto:connectveereshbabu@gmail.com"
                data-cursor
                className="rounded-full bg-accent px-7 py-4 font-mono text-[13px] uppercase tracking-[0.14em] text-accent-foreground"
              >
                connectveereshbabu@gmail.com
              </Magnetic>
              <a
                href="tel:+917010123152"
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                +91 70101 23152
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-display text-lg font-light italic text-muted-foreground">
            Engineering meaningful, secure, and low-latency digital systems that
            inspire, perform, and scale.
          </p>
          <div className="flex flex-wrap gap-6 font-mono text-[12px] uppercase tracking-[0.14em]">
            {SOCIALS.map(([l, href]) => (
              <a
                key={l}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-accent"
              >
                <Sparkle className="text-[10px]" /> {l}
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-8">
          <p className="font-mono text-[11px] text-muted-foreground/60">
            © {new Date().getFullYear()} Veeresh Babu V K — Madurai, Tamil Nadu, India.
          </p>
        </div>
      </footer>
    </div>
  )
}
