import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Phone, Linkedin, MapPin, ArrowRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { id: "now", label: "Now" },
  { id: "experience", label: "Experience" },
  { id: "impact", label: "Impact" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTyping(text: string, speed = 38) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
}

function CountUp({ to, suffix = "", duration = 1200 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref} className="font-mono">{n}{suffix}</span>;
}

function Nav() {
  const [active, setActive] = useState("now");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive((e.target as HTMLElement).id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "#0e0e10" }}>
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <a href="#now" className="font-mono text-sm text-foreground">
          <span className="text-teal">~/</span>muskanlath
        </a>
        <nav className="surface rounded-full p-1 hidden md:flex items-center">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`px-3 py-1.5 text-xs font-mono rounded-full transition-colors ${
                active === n.id
                  ? "text-white glow-purple bg-purple"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a href="mailto:lathmuskan98@gmail.com" className="font-mono text-xs px-3 py-1.5 rounded-full surface hover:text-teal transition-colors">
          ship_it()
        </a>
      </div>
      <div className="md:hidden mx-auto max-w-6xl px-4 pb-3 overflow-x-auto">
        <div className="surface rounded-full p-1 inline-flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`px-3 py-1.5 text-xs font-mono rounded-full whitespace-nowrap ${active === n.id ? "text-white bg-purple" : "text-muted-foreground"}`}>{n.label}</a>
          ))}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const typed = useTyping("I turn chaos into roadmaps and roadmaps into shipped products.");
  return (
    <section id="now" className="mx-auto max-w-6xl px-4 pt-8 pb-20">
      <div className="surface rounded-2xl overflow-hidden reveal">
        {/* card header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-hairline" style={{ backgroundColor: "var(--surface-2)" }}>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-teal" />
            <span>MUSKAN-001</span>
            <span className="text-muted-foreground/60">· active sprint</span>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground hidden sm:block">priority: P0 · type: hire</div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="font-mono text-xs text-muted-foreground mb-3">MUSKAN-001</div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-6">
            A PM who actually ships<span className="blink" />
          </h1>
          <p className="font-mono text-sm sm:text-base text-teal mb-10 min-h-[1.5em]">{typed}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 font-mono text-sm">
            <Row k="Assignee" v="Muskan Lath" />
            <Row k="Status" v={<><span className="text-teal">●</span> In Progress</>} />
            <Row k="Location" v="Bangalore, India" />
            <Row k="Phone" v="84xxxxxxxx" />
            <Row k="Email" v={<a href="mailto:lathmuskan98@gmail.com" className="hover:text-teal">lathmuskan98@gmail.com</a>} />
            <Row k="LinkedIn" v={<a href="https://www.linkedin.com/in/muskanlath" className="hover:text-teal" target="_blank" rel="noreferrer">muskanlath</a>} />
          </dl>

          <div className="mt-8 pt-6 border-t border-hairline">
            <div className="text-xs font-mono text-muted-foreground mb-3">stack</div>
            <div className="flex flex-wrap gap-2">
              {["Product Strategy", "Generative AI", "B2B SaaS", "Agile"].map((t) => (
                <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-md surface-2 text-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <dt className="text-muted-foreground w-20 shrink-0">{k}:</dt>
      <dd className="text-foreground">{v}</dd>
    </div>
  );
}

type Job = {
  version: string;
  company: string;
  role: string;
  location: string;
  date: string;
  bullets: string[];
  badges: string[];
};

const JOBS: Job[] = [
  {
    version: "v3.0",
    company: "Capgemini Technology Services",
    role: "Product Manager",
    location: "Mumbai, India",
    date: "Aug 2023 – Present",
    bullets: [
      "Owned product strategy, vision, and roadmap for a 0→1 B2B SaaS platform serving 300+ global enterprise clients, driving alignment across engineering, business, and C-suite stakeholders",
      "Led 80+ cross-functional workshops and client interviews, synthesizing insights into roadmap prioritization and feature sequencing",
      "Delivered 2 Generative AI features — ChImp AI and Sentiment Analysis — reducing manual data processing by 25% and enabling faster data-driven decisions",
      "Steered 6+ large-scale platform revamps from discovery to launch, balancing user needs, technical constraints, and business trade-offs",
      "Partnered with Sales on 100+ C-suite enterprise product demos, achieving a 35% deal conversion rate",
      "Reduced task complexity by 20% and drove 50% time savings through data-driven user journey mapping, funnel analysis, and targeted automation",
      "Managed 400+ user stories annually with structured sprint planning, refinement, and backlog management",
    ],
    badges: ["300+ clients", "80+ workshops", "25% less manual work", "35% deal conversion", "50% time saved", "400+ user stories/year"],
  },
  {
    version: "v2.0",
    company: "Workezy",
    role: "Product Management Intern",
    location: "Lucknow, India",
    date: "Apr 2022 – Oct 2022",
    bullets: [
      "Redesigned mobile onboarding experience, reducing onboarding time by 50% and increasing top-of-funnel conversion by 18%",
      "Optimized landing page UX and information architecture, reducing bounce rate by 25%",
      "Improved first-visit conversion by 8%, resulting in a 16% increase in leads",
      "Designed tiered pricing strategies using competitive benchmarking and willingness-to-pay analysis, driving a 12% lift in ARPU during pilot rollout",
      "Prioritized 5 new service categories, driving a 15% increase in listings and 7% boost in user sign-ups",
    ],
    badges: ["50% faster onboarding", "18% top-funnel lift", "25% lower bounce", "12% ARPU lift"],
  },
  {
    version: "v1.0",
    company: "ICICI Bank",
    role: "Deputy Manager",
    location: "Lucknow, India",
    date: "Jul 2019 – Jun 2020",
    bullets: [
      "Managed 100+ HNI accounts (INR 25L+ net worth), driving customer acquisition and lifecycle management",
      "Generated INR 7L+ in revenue by aligning customer needs with high-margin financial products",
      "Achieved top 3.4% performer ranking nationwide through cross-functional Sales and Marketing campaign coordination",
    ],
    badges: ["100+ HNI accounts", "INR 7L+ revenue", "Top 3.4% nationwide"],
  },
];

function Experience() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader tag="git log --feature" title="Feature Changelog" />
      <div className="space-y-4">
        {JOBS.map((job, i) => {
          const isOpen = open === i;
          return (
            <div key={job.version} className="surface rounded-xl overflow-hidden reveal">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--surface-2)] transition-colors"
              >
                <span className="font-mono text-xs px-2 py-1 rounded surface-2 text-purple shrink-0">{job.version}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{job.company} <span className="text-muted-foreground font-normal">· {job.role}</span></div>
                  <div className="font-mono text-xs text-muted-foreground mt-0.5">{job.location} · {job.date}</div>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className="grid transition-all duration-300"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6 pt-1 border-t border-hairline">
                    <ul className="space-y-2.5 mt-4">
                      {job.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <span className="font-mono text-teal shrink-0">+</span>
                          <span className="text-foreground/90">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {job.badges.map((b) => (
                        <span key={b} className="font-mono text-[11px] px-2.5 py-1 rounded-md surface-2 text-teal border border-[color:var(--teal)]/30">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const METRICS: { n: number; suffix?: string; label: string }[] = [
  { n: 300, suffix: "+", label: "Global enterprise clients served" },
  { n: 80, suffix: "+", label: "Cross-functional workshops run" },
  { n: 400, suffix: "+", label: "User stories managed per year" },
  { n: 100, suffix: "+", label: "C-suite product demos delivered" },
  { n: 50, suffix: "%", label: "Time savings through automation" },
  { n: 35, suffix: "%", label: "Deal conversion rate with Sales" },
  { n: 25, suffix: "%", label: "Reduction in manual data processing" },
  { n: 20, suffix: "%", label: "Reduction in task complexity" },
  { n: 6, suffix: "+", label: "Large-scale platform revamps shipped" },
];

function Impact() {
  return (
    <section id="impact" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader tag="SELECT * FROM impact" title="Metrics Dashboard" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {METRICS.map((m) => (
          <div key={m.label} className="surface rounded-xl p-5 reveal hover:border-[color:var(--purple)]/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal">
              <CountUp to={m.n} suffix={m.suffix} />
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-2">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const SKILLS: { group: string; items: { name: string; tip: string }[] }[] = [
  {
    group: "PM Core",
    items: [
      { name: "Product Strategy", tip: "0→1 B2B SaaS platform, 300+ enterprise clients" },
      { name: "Vision & Roadmapping", tip: "End-to-end ownership at Capgemini" },
      { name: "PRDs & BRDs", tip: "400+ user stories per year" },
      { name: "Go-to-Market Strategy", tip: "100+ C-suite demos, 35% conversion" },
      { name: "MVP Definition", tip: "Feature sequencing from 80+ discovery workshops" },
      { name: "Prioritization", tip: "Balancing user needs, tech constraints, business trade-offs" },
      { name: "Backlog Management", tip: "Agile execution across large cross-functional teams" },
    ],
  },
  {
    group: "AI & Data",
    items: [
      { name: "Generative AI", tip: "Shipped 2 Gen AI features at Capgemini" },
      { name: "LLMs", tip: "AI-driven product innovation and use case discovery" },
      { name: "Funnel Analysis", tip: "Reduced bounce 25%, improved onboarding conversion 18%" },
      { name: "SQL", tip: "Data-driven decision making and KPI tracking" },
      { name: "UX & User Research", tip: "80+ interviews, journey mapping, task flow optimization" },
      { name: "Metrics & KPIs", tip: "Defined and tracked success metrics across all products" },
    ],
  },
  {
    group: "Tools & Collaboration",
    items: [
      { name: "Agile / Scrum", tip: "Sprint planning, refinement, and velocity improvement" },
      { name: "Jira", tip: "Primary tool for backlog and story management" },
      { name: "Azure Boards", tip: "Used at Capgemini for cross-team tracking" },
      { name: "Kanban", tip: "Parallel workstream management" },
      { name: "Stakeholder Management", tip: "C-suite, engineering, and business alignment" },
      { name: "Cross-functional Leadership", tip: "Coordinated across Sales, Engineering, Design" },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader tag="import { skills }" title="Tech Stack Grid" />
      <div className="space-y-10">
        {SKILLS.map((g) => (
          <div key={g.group} className="reveal">
            <div className="font-mono text-xs text-muted-foreground mb-4">// {g.group}</div>
            <div className="flex flex-wrap gap-2.5">
              {g.items.map((s) => (
                <SkillTag key={s.name} name={s.name} tip={s.tip} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillTag({ name, tip }: { name: string; tip: string }) {
  return (
    <div className="relative group">
      <span className="inline-block font-mono text-sm px-3.5 py-2 rounded-lg surface text-foreground hover:text-purple hover:border-[color:var(--purple)] transition-colors cursor-default">
        {name}
      </span>
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 max-w-[80vw] opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <div className="rounded-lg p-3 text-xs text-foreground/90"
             style={{ backgroundColor: "#1a1a1f", border: "1px solid #7c3aed" }}>
          {tip}
        </div>
      </div>
    </div>
  );
}

function Education() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader tag="cat education.md" title="Certifications Panel" />
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { school: "Indian Institute of Management, Raipur", degree: "MBA — Strategy and Marketing", date: "Graduated: April 2023" },
          { school: "Mithibai College of Arts, Science and Commerce", degree: "Bachelor of Commerce", date: "Graduated: June 2019" },
        ].map((e) => (
          <div key={e.school} className="surface rounded-xl p-6 reveal">
            <div className="font-mono text-xs text-teal mb-2">EDU</div>
            <div className="font-semibold text-lg">{e.school}</div>
            <div className="text-sm text-foreground/80 mt-1">{e.degree}</div>
            <div className="font-mono text-xs text-muted-foreground mt-3">{e.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ACHIEVEMENTS = [
  { rank: "National Finalist (Top 250 of 250 teams)", event: "GSK Ecube — GlaxoSmithKline Pharma", year: "2022", note: "PPI Awarded" },
  { rank: "National Finalist (Top of 1500+ teams)", event: "GVR Innovathon — Gilbarco Veeder-Root", year: "2022", note: "" },
  { rank: "National Finalist (Top of 1500+ teams)", event: "Microsoft PM Engage — Microsoft", year: "2021", note: "" },
];

function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader tag="ORDER BY rank DESC" title="Leaderboard" />
      <div className="surface rounded-xl overflow-hidden reveal">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground border-b border-hairline" style={{ backgroundColor: "var(--surface-2)" }}>
          <div className="col-span-1">#</div>
          <div className="col-span-6">Rank / Event</div>
          <div className="col-span-2">Year</div>
          <div className="col-span-3">Note</div>
        </div>
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-start border-b border-hairline last:border-b-0 reveal hover:bg-[var(--surface-2)] transition-colors" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="col-span-1 text-2xl"><Trophy className="w-5 h-5 text-teal" /></div>
            <div className="col-span-11 sm:col-span-6">
              <div className="font-mono text-xs text-teal">{a.rank}</div>
              <div className="text-sm mt-1">{a.event}</div>
            </div>
            <div className="col-span-6 sm:col-span-2 font-mono text-sm text-muted-foreground">{a.year}</div>
            <div className="col-span-6 sm:col-span-3 font-mono text-xs text-purple">{a.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader tag="$ ./connect.sh" title="Ship It" />
      <div className="surface rounded-xl overflow-hidden reveal">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-hairline" style={{ backgroundColor: "var(--surface-2)" }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
          <span className="ml-3 font-mono text-xs text-muted-foreground">~/muskan — zsh</span>
        </div>
        <div className="p-6 sm:p-8 font-mono text-sm space-y-3">
          <div><span className="text-teal">$</span> <span className="text-foreground">muskan.connect()</span></div>
          <div className="pl-4 space-y-2 text-foreground/90">
            <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-purple" /><span className="text-muted-foreground w-20">Email</span><a href="mailto:lathmuskan98@gmail.com" className="hover:text-teal">lathmuskan98@gmail.com</a></div>
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-purple" /><span className="text-muted-foreground w-20">Phone</span><span>+91 8400376127</span></div>
            <div className="flex items-center gap-3"><Linkedin className="w-4 h-4 text-purple" /><span className="text-muted-foreground w-20">LinkedIn</span><a href="https://linkedin.com/in/muskan-lath" target="_blank" rel="noreferrer" className="hover:text-teal">linkedin.com/in/muskan-lath</a></div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-purple" /><span className="text-muted-foreground w-20">Location</span><span>Bangalore, India</span></div>
          </div>

          <div className="pt-5">
            <a
              href="mailto:lathmuskan98@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-purple text-white font-mono text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 0 0 1px rgba(124,58,237,0.6), 0 8px 32px rgba(124,58,237,0.35)" }}
            >
              Open Ticket <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center font-mono text-xs text-muted-foreground mt-12">
        © {new Date().getFullYear()} Muskan Lath · built like a sprint card
      </div>
    </section>
  );
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-8 reveal">
      <div className="font-mono text-xs text-purple mb-2">{tag}</div>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0e0e10" }}>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Impact />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
