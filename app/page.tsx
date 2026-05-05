"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TrackKey = "shiva" | "parth";
type Plan = { id: string; label: string; price: string; original: string; subtitle: string; result: string; bestFor: string; highlight?: boolean };
type BookingForm = { name: string; email: string; track: TrackKey; block: string; change: string };

const tracks: Record<TrackKey, { name: string; eyebrow: string; line: string; result: string; dataGraph: { title: string; bars: { label: string; val: number }[] } }> = {
  shiva: { name: "Mind reset", eyebrow: "Shiva / clarity / execution", line: "For students who feel stuck, behind, confused, or unable to act even when they know what to do.", result: "You leave with a clear next move and a simple week map.", dataGraph: { title: "The modern student trap", bars: [{ label: "Content consumption", val: 88 }, { label: "Action output", val: 12 }] } },
  parth: { name: "Body reset", eyebrow: "Parth / routine / consistency", line: "For students who want training discipline, better energy, and a physical routine that actually holds.", result: "You leave with a fitness direction and a routine you can start.", dataGraph: { title: "The consistency trap", bars: [{ label: "Day 1 Motivation", val: 95 }, { label: "Day 14 Routine", val: 15 }] } },
};

const plans: Plan[] = [
  { id: "free-demo", label: "Free Demo Call", price: "Free", original: "Rs. 299", subtitle: "10-min intro", result: "Quick assessment.", bestFor: "To verify trust first." },
  { id: "clarity-call", label: "Clarity Call", price: "Rs. 499", original: "Rs. 999", subtitle: "1:1 reset", result: "A clear next move and action map.", bestFor: "When you know something is wrong but cannot name it." },
  { id: "forge-reset", label: "Forge Reset", price: "Rs. 999", original: "Rs. 1,999", subtitle: "7-14 day support", result: "A reset plan with accountability.", bestFor: "When you need someone to stay with the process.", highlight: true },
];

const proofStats = [["40+", "Students Helped"], ["10+", "Offline Sessions"], ["100+", "Fitness Clients"], ["4", "Products Built"]];

const shivaProof = [
  ["NIT Raipur Research", "Interned at NIT Raipur — real academic research exposure, not just classroom talk.", "/proof/nit-raipur.png"],
  ["Hatchr PM Internship", "Product management internship at Hatchr — learned to build things that ship.", "/proof/hatchr.png"],
  ["Havells Core Dealership", "Operating proof. Handling core business dealership operations teaches trust and execution slowly.", "/proof/shiva-havells.jpeg"],
  ["UNI Ecosystem Builder", "Built UniPathSchool, Uniflow, UniDraw — three working student products, not just ideas.", "/unilogo.png"],
];

const parthProof = [
  ["National Powerlifting Champion", "Won nationals in powerlifting at age 17 — discipline proven on a national stage.", "/proof/parth-medals.png"],
  ["100+ Fitness Clients", "Managed fitness programs for 100+ clients across athletes and students.", "/proof/parth-nationals.jpeg"],
  ["Co-founder & Coach at UniFit", "Leads the body and routine transformation track at UniFit as its co-founder and head coach.", "/proof/unifit.png"],
];

const testimonials = [
  { quote: "He already knew what I couldn't say out loud.", context: "A student after their first clarity call with Shiva." },
  { quote: "I actually started. First time in weeks.", context: "A student who had been stuck for months." },
  { quote: "This made me actually move. Nothing else did.", context: "After a 7-day Forge Reset program." },
  { quote: "Stopped overthinking, started doing. It felt personal.", context: "A student on the Mind Reset track." },
];

const productLinks = [
  ["UniPathSchool", "https://unipathschool.com", "Career guidance platform — real product, real users.", "/proof/unifit.png"],
  ["Uniflow", "https://uniflow.unisoul.store", "Daily habit system built for consistency, not motivation.", "/proof/uniflow-launch.jpeg"],
  ["UniDraw", "https://unidraw.unisoul.store", "Creative product proving the ecosystem is built in public.", "/proof/unidraw.png"],
];

const faqs = [
  ["Is this only for toppers or gym people?", "No. UniCare is for students who still care but feel stuck, behind, distracted, or physically inconsistent."],
  ["What happens after I pick a plan?", "You share a little context, then continue to WhatsApp so the first conversation starts clearly."],
  ["Is this therapy?", "No. It is mentoring, routine design, and accountability. If someone needs clinical help, that should go to a professional."],
  ["Why should I trust this?", "Because the work is visible: products shipped, rooms run, client experience built, powerlifting proof earned, and student-facing execution done."],
];

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("show"); obs.unobserve(e.target); } }), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// WhatsApp group link — redirects to the UniCare community
const UNICARE_WA = "https://chat.whatsapp.com/HqzVaNogUXeHn8Z63da8WL";

function whatsappHref(_track?: TrackKey, _plan?: Plan, _form?: BookingForm) {
  return UNICARE_WA;
}


async function submitLead(input: Record<string, string>) {
  const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  if (!res.ok) throw new Error("Lead capture failed");
}

export default function Home() {
  useReveal();
  const [track, setTrack] = useState<TrackKey>("shiva");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subStatus, setSubStatus] = useState<"idle" | "saving" | "error">("idle");

  return (
    <main className="min-h-screen bg-[#050505] text-[#F8F5F0]">
      <BgMusic src="/music/unicare.mp3" />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-4 py-4 md:px-6 md:py-6" style={{ background: "#070707" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_55%_105%,rgba(255,69,0,0.22),rgba(70,28,8,0.08)_48%,transparent_72%)]" />
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/90">
          {/* Nav */}
          <nav className="flex items-center justify-between px-5 py-5 md:px-8">
            <a href="#" className="flex items-center gap-3">
              <Image src="/unilogo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-semibold tracking-tight text-[#FFDFB3]">Uni<span className="text-[#FF4500]">Care</span></span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#8E8A80]">Take it easy</span>
              </span>
            </a>
            <div className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8E8A80] md:flex">
              <a href="#proof" className="hover:text-[#FFDFB3] transition-colors">Proof</a>
              <a href="#tracks" className="hover:text-[#FFDFB3] transition-colors">Tracks</a>
              <a href="#join" className="hover:text-[#FFDFB3] transition-colors">Join</a>
            </div>
            <a href={whatsappHref(track)} target="_blank" rel="noreferrer" className="rounded-full border border-[#FFDFB3]/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#FFDFB3] hover:bg-white/[0.04] transition-colors">Talk</a>
          </nav>

          {/* Hero content */}
          <div className="px-6 pb-12 pt-8 md:px-12 md:pb-16">
            <div className="max-w-4xl">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="proof-badge proof-badge-ember"><span className="verified-dot" /> Verified mentors</span>
                <span className="proof-badge proof-badge-ember">40+ students helped</span>
                <span className="proof-badge proof-badge-ember">Real products shipped</span>
              </div>
              <h1 className="mt-6 text-5xl font-light leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
                For the student<br />who still cares.
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-[#C2BCB0]">
                UniCare is a small, serious reset space. You come with the confusion, the pressure, the tiredness, the guilt. We sit with it, name it, simplify it, and help you move. No hype. Just honest work.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#proof" className="rounded-full bg-[#FFDFB3] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wide text-[#050505] hover:bg-white transition-colors">See the proof first</a>
                <a href="#join" className="rounded-full border border-white/15 px-8 py-4 text-center text-sm font-medium uppercase tracking-wide text-[#F8F5F0] hover:border-[#FF4500]/60 transition-colors">Start your reset</a>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
              {proofStats.map(([val, label]) => (
                <div key={label} className="trust-card-dark rounded-xl p-5 text-center">
                  <div className="text-3xl font-light tracking-tight text-[#FFE7C4] md:text-4xl">{val}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E8A80]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST TICKER ═══ */}
      <div className="overflow-hidden border-y border-white/5 bg-[#060504] py-5">
        <div className="ticker-track flex w-max gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              {["Built before being sold", "Products you can visit", "Real rooms, real sessions", "Proof before promise", "40+ students helped", "National-level athlete coach"].map((t) => (
                <span key={t} className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#C2BCB0]">{t}<span className="h-1.5 w-1.5 rounded-full bg-[#FF4500]" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PROOF OF WORK — SHIVA ═══ */}
      <section id="proof" className="sec-light px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-6xl reveal">
          <div className="eyebrow mb-4">Proof of work — not promises</div>
          <h2 className="text-4xl font-light tracking-tight text-[#050505] md:text-5xl">
            We show credentials.<br /><span className="text-[#55524E]">Then you decide.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base font-light leading-8 text-[#55524E]">
            Trust is not built by words. It is built by work people can verify. Here is everything behind Shiva and Parth — check it yourself.
          </p>
        </div>

        {/* Shiva proof */}
        <div className="mx-auto mt-14 max-w-6xl reveal">
          <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_80px_rgba(20,12,5,0.07)]">
            <div className="grid gap-0 lg:grid-cols-[0.45fr_0.55fr]">
              <div className="relative min-h-[320px]">
                <Image src="/proof/shiva-public-coach.jpeg" alt="Shiva Rathore coaching" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFE7C4]">UniCare mentor</div>
                  <div className="mt-2 text-3xl font-medium text-white">Shiva Rathore</div>
                  <div className="mt-2 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85 backdrop-blur">Clarity · Direction · Execution</div>
                </div>
              </div>
              <div className="p-7 md:p-10">
                <div className="eyebrow mb-6">Verified credentials</div>
                <div className="grid gap-4">
                  {shivaProof.map(([title, desc, img]) => (
                    <div key={title} className="flex gap-4 rounded-xl border border-black/5 bg-[#FDFBF7] p-4 transition hover:border-[#FF4500]/20 hover:bg-[#FFF7EF]">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={img} alt={title} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-base font-medium text-[#1A1714]">{title} <span className="verified-dot" /></div>
                        <p className="mt-1 text-sm font-light leading-6 text-[#55524E]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parth proof */}
        <div className="mx-auto mt-6 max-w-6xl reveal">
          <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_80px_rgba(20,12,5,0.07)]">
            <div className="grid gap-0 lg:grid-cols-[0.55fr_0.45fr]">
              <div className="p-7 md:p-10">
                <div className="eyebrow mb-6">Verified credentials</div>
                <div className="grid gap-4">
                  {parthProof.map(([title, desc, img]) => (
                    <div key={title} className="flex gap-4 rounded-xl border border-black/5 bg-[#FDFBF7] p-4 transition hover:border-[#FF4500]/20 hover:bg-[#FFF7EF]">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={img} alt={title} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-base font-medium text-[#1A1714]">{title} <span className="verified-dot" /></div>
                        <p className="mt-1 text-sm font-light leading-6 text-[#55524E]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[320px]">
                <Image src="/proof/parth-nationals.jpeg" alt="Parth Pandey at nationals" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFE7C4]">UniCare mentor</div>
                  <div className="mt-2 text-3xl font-medium text-white">Parth Pandey</div>
                  <div className="mt-2 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85 backdrop-blur">Discipline · Body · Consistency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT PROOF ═══ */}
      <section className="bg-[#FDFBF7] px-6 pb-20 md:px-16 md:pb-28">
        <div className="mx-auto max-w-6xl reveal">
          <div className="eyebrow mb-4">UNI ecosystem — shipped products</div>
          <h2 className="text-3xl font-light tracking-tight text-[#050505] md:text-4xl">We built things before asking you to trust us.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {productLinks.map(([name, href, note, image]) => (
              <a key={name} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="trust-card group overflow-hidden">
                <div className="relative h-40">
                  <Image src={image} alt={name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#050505]">Visit live ↗</div>
                </div>
                <div className="p-5">
                  <div className="text-lg font-medium tracking-tight text-[#050505]">{name}</div>
                  <p className="mt-2 text-sm font-light leading-6 text-[#55524E]">{note}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="sec-dark border-y border-white/5 px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-6xl reveal">
          <div className="text-center">
            <div className="eyebrow mb-4">Real words from real students</div>
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">People trust us because of what happened to them.</h2>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.quote} className="trust-card-dark relative overflow-hidden rounded-[1.6rem] p-7">
                <span className="quote-mark">&ldquo;</span>
                <p className="relative z-10 mt-6 text-2xl font-light leading-snug text-[#F8F5F0]">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8E8A80]">{t.context}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8E8A80]">Real conversations. No actors. No scripts.</p>
          </div>
        </div>
      </section>

      {/* ═══ TRACKS ═══ */}
      <section id="tracks" className="sec-light px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-6xl reveal">
          <div className="eyebrow mb-4">Choose your track</div>
          <h2 className="text-4xl font-light tracking-tight text-[#050505] md:text-5xl">Pick the care you need.</h2>
          <p className="mt-5 max-w-xl text-base font-light leading-8 text-[#55524E]">Some students need a mind reset. Some need their body rebuilt. Both are valid. Both are treated seriously.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {(Object.keys(tracks) as TrackKey[]).map((key) => {
              const t = tracks[key]; const active = track === key;
              return (
                <button key={key} onClick={() => setTrack(key)} className={`trust-card group overflow-hidden text-left ${active ? "!border-[#FF4500]/40 shadow-[0_20px_60px_rgba(255,69,0,0.08)]" : ""}`}>
                  <div className="relative h-56 bg-[#0E0B0A] p-6 flex flex-col justify-center border-b border-white/5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E8A80] mb-6">{t.dataGraph.title}</div>
                    <div className="space-y-5">
                      {t.dataGraph.bars.map(bar => (
                        <div key={bar.label}>
                          <div className="flex justify-between font-mono text-[10px] uppercase text-[#C2BCB0] mb-2">
                            <span>{bar.label}</span>
                            <span>{bar.val}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FF4500] bar-grow"
                              style={{ "--bar-width": `${bar.val}%` } as React.CSSProperties}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-full bg-white/10 backdrop-blur-md border border-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F8F5F0]">{active ? "✓ Selected" : "Choose"}</div>
                  </div>
                  <div className="p-7">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF4500]">{t.eyebrow}</div>
                    <div className="mt-3 text-3xl font-light text-[#050505]">{t.name}</div>
                    <p className="mt-3 text-sm font-light leading-7 text-[#55524E]">{t.line}</p>
                    <div className="mt-5 rounded-xl bg-[#F7F1E8] p-4 text-sm font-medium leading-6 text-[#33312E]">{t.result}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="join" className="sec-dark border-y border-white/5 px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center reveal">
            <div className="eyebrow mb-4">Join</div>
            <h2 className="text-4xl font-light tracking-tight md:text-6xl">Start with one honest step.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-7 text-[#8E8A80]">Launch discount active. Pick your plan, share context, start on WhatsApp.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3 md:grid-cols-2 reveal">
            {plans.map((plan) => (
              <article key={plan.id} className={`trust-card-dark overflow-hidden rounded-[1.7rem] p-7 md:p-8 ${plan.highlight ? "!border-[#FF4500]/35 !bg-[#100806]" : ""}`}>
                <div className="eyebrow">{plan.label}</div>
                <div className="mt-6 flex items-end gap-4">
                  <div className="text-5xl font-light tracking-tight text-[#FFDFB3]">{plan.price}</div>
                  <div className="pb-2 text-base font-light text-[#8E8A80] line-through">{plan.original}</div>
                </div>
                <div className="mt-4 proof-badge proof-badge-ember">Launch discount</div>
                <div className="mt-6 grid gap-px bg-white/5">
                  <div className="bg-[#0b0b0b] p-5"><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E8A80]">Result</div><div className="mt-2 text-lg font-light">{plan.result}</div></div>
                  <div className="bg-[#0b0b0b] p-5"><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E8A80]">Best for</div><div className="mt-2 text-lg font-light">{plan.bestFor}</div></div>
                </div>
                <button onClick={() => setActivePlan(plan)} className={`mt-7 block w-full rounded-full px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide transition ${plan.highlight ? "bg-[#FF4500] text-white hover:bg-[#ff5c1f]" : "border border-[#FFDFB3]/20 text-[#FFDFB3] hover:border-[#FF4500]/60"}`}>{plan.subtitle}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="bg-[#FDFBF7] px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-4xl reveal">
          <div className="overflow-hidden rounded-[2rem] bg-[#0b2f2d] p-8 text-[#FDFBF7] md:p-12">
            <div className="eyebrow-cream font-mono text-[11px] uppercase tracking-[0.24em] mb-5">UniCare letters</div>
            <h2 className="text-3xl font-light leading-tight tracking-tight md:text-4xl">Short notes for the student who wants to stay conscious.</h2>
            <p className="mt-5 text-base font-light leading-8 text-[#F4E9D8]/80">Honest reminders. Small prompts for discipline and awareness. No spam.</p>
            <form onSubmit={async (e) => { e.preventDefault(); if (!email.trim()) return; setSubStatus("saving"); try { await submitLead({ source: "newsletter", email }); setSubscribed(true); setSubStatus("idle"); setEmail(""); } catch { setSubStatus("error"); } }} className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
              <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setSubscribed(false); setSubStatus("idle"); }} placeholder="your email" className="rounded-full border border-white/10 bg-black/20 px-5 py-4 text-sm text-white placeholder:text-white/35" />
              <button disabled={subStatus === "saving"} className="rounded-full bg-[#FFDFB3] px-7 py-4 text-sm font-semibold uppercase tracking-wide text-[#050505] hover:bg-white disabled:opacity-70">{subStatus === "saving" ? "Saving" : "Join"}</button>
            </form>
            <p className="mt-4 text-xs font-light text-[#F4E9D8]/60">{subscribed ? "You're on the list. We'll keep it calm." : subStatus === "error" ? "Could not save. Try again." : "No spam. Just care."}</p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-[#FDFBF7] px-6 pb-20 md:px-16 md:pb-28">
        <div className="mx-auto max-w-4xl reveal">
          <div className="eyebrow mb-4">Common questions</div>
          <h2 className="text-3xl font-light tracking-tight text-[#050505] md:text-4xl">Honest answers only.</h2>
          <div className="mt-10 grid gap-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="trust-card group rounded-xl">
                <summary className="cursor-pointer list-none p-5 text-lg font-medium text-[#1A1714] flex items-center justify-between select-none">
                  {q}
                  <span className="faq-icon ml-4 shrink-0 text-[#FF4500] text-xl font-light">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm font-light leading-7 text-[#55524E]">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#020202] px-6 py-14 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/unilogo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="text-2xl font-semibold tracking-tight text-[#FFDFB3]">Uni<span className="text-[#FF4500]">Care</span></span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#8E8A80]">Take it easy</span>
              </span>
            </div>
            <p className="mt-5 max-w-xl text-sm font-light leading-7 text-[#8E8A80]">A serious reset space for students who want clarity, routine, and movement.</p>
          </div>
          <div className="font-mono text-[11px] uppercase leading-8 tracking-[0.16em] text-[#8E8A80] md:text-right">
            Shiva Rathore + Parth Pandey<br />UniCare mentors<br />Mind + body reset
          </div>
        </div>
      </footer>

      {activePlan && <BookingModal plan={activePlan} defaultTrack={track} onTrackChange={setTrack} onClose={() => setActivePlan(null)} />}
    </main>
  );
}

function BgMusic({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const a = ref.current; if (!a) return; a.volume = 0.28;
    let played = false;
    const play = async () => { if (played) return; try { await a.play(); played = true; } catch { } };
    const rm = () => { window.removeEventListener("pointerdown", play); window.removeEventListener("scroll", play); };
    a.addEventListener("play", rm);
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("scroll", play, { once: true, passive: true });
    void play();
    return () => { rm(); a.removeEventListener("play", rm); };
  }, []);
  return <audio ref={ref} src={src} preload="auto" playsInline autoPlay />;
}

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function BookingModal({ plan, defaultTrack, onTrackChange, onClose }: { plan: Plan; defaultTrack: TrackKey; onTrackChange: (t: TrackKey) => void; onClose: () => void }) {
  const [form, setForm] = useState<BookingForm>({ name: "", email: "", track: defaultTrack, block: "", change: "" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  const up = (f: keyof BookingForm, v: string) => { setForm((c) => ({ ...c, [f]: f === "track" ? (v as TrackKey) : v })); if (f === "track") onTrackChange(v as TrackKey); };

  const handlePaymentAndContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErr(false);

    try {
      // 1. Submit lead first (always captured regardless of payment)
      await submitLead({ source: "booking", email: form.email, name: form.name, track: tracks[form.track].name, plan: plan.label, block: form.block, change: form.change });

      // 2. If Razorpay key isn't configured, skip payment and go to WhatsApp
      //    This handles the case where env vars haven't been added to Vercel yet.
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        window.location.href = whatsappHref(form.track, plan, form);
        return;
      }

      // 3. Free plan — skip payment, go straight to WhatsApp
      const numericPrice = parseInt(plan.price.replace(/[^0-9]/g, ""));
      if (isNaN(numericPrice) || numericPrice === 0) {
        window.location.href = whatsappHref(form.track, plan, form);
        return;
      }

      // 4. Load Razorpay script
      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!scriptLoaded) {
        // Script failed to load — still send to WhatsApp, don't block the user
        window.location.href = whatsappHref(form.track, plan, form);
        return;
      }

      // 5. Create order on the server
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericPrice }),
      });
      const order = await orderRes.json();

      // Any server-side error → WhatsApp fallback (lead already captured)
      if (order.error) {
        window.location.href = whatsappHref(form.track, plan, form);
        return;
      }

      // 6. Open Razorpay checkout popup
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "UniCare",
        description: `${plan.label} — ${tracks[form.track].name}`,
        image: "/unilogo.png",
        order_id: order.id,
        handler: function () {
          // Payment successful → redirect to WhatsApp
          window.location.href = whatsappHref(form.track, plan, form);
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: { color: "#FF4500" },
        modal: {
          ondismiss: function () {
            setSaving(false);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      // Even on unexpected errors, send to WhatsApp — lead is already saved
      window.location.href = whatsappHref(form.track, plan, form);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#FDFBF7] text-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-[#0b2f2d] p-7 text-[#FDFBF7] md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFDFB3]">{plan.label}</div>
            <div className="mt-7 text-4xl font-light tracking-tight">{plan.price}</div>
            <div className="mt-3 text-sm font-light text-[#F4E9D8]/70 line-through">{plan.original}</div>
            <p className="mt-7 text-sm font-light leading-7 text-[#F4E9D8]/80">Not a payment form. A clarity form so the first conversation starts properly.</p>
          </div>
          <form onSubmit={handlePaymentAndContinue} className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-5">
              <div><div className="eyebrow">Before WhatsApp</div><h3 className="mt-3 text-3xl font-light tracking-tight">Tell us what you need.</h3></div>
              <button type="button" onClick={onClose} className="rounded-full border border-black/10 px-4 py-2 text-sm text-[#55524E]">Close</button>
            </div>
            <label className="mt-7 block"><span className="text-sm font-medium text-[#33312E]">Your name</span><input required value={form.name} onChange={(e) => up("name", e.target.value)} placeholder="Shiva" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm focus:border-[#FF4500]/45" /></label>
            <label className="mt-5 block"><span className="text-sm font-medium text-[#33312E]">Your email</span><input required type="email" value={form.email} onChange={(e) => up("email", e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm focus:border-[#FF4500]/45" /></label>
            <div className="mt-5"><div className="text-sm font-medium text-[#33312E]">Track</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {(Object.keys(tracks) as TrackKey[]).map((k) => (<button key={k} type="button" onClick={() => up("track", k)} className={`rounded-2xl border p-4 text-left transition ${form.track === k ? "border-[#FF4500]/50 bg-[#FFF7EF]" : "border-black/10 bg-white hover:border-[#FF4500]/30"}`}><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF4500]">{tracks[k].eyebrow}</div><div className="mt-2 text-lg font-light">{tracks[k].name}</div></button>))}
              </div>
            </div>
            <label className="mt-5 block"><span className="text-sm font-medium text-[#33312E]">What is the real block right now?</span><textarea required rows={3} value={form.block} onChange={(e) => up("block", e.target.value)} placeholder="I know what to do but I keep delaying..." className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm focus:border-[#FF4500]/45" /></label>
            <label className="mt-5 block"><span className="text-sm font-medium text-[#33312E]">What should change in 7 days?</span><textarea required rows={3} value={form.change} onChange={(e) => up("change", e.target.value)} placeholder="I want to restart study/gym with a routine..." className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm focus:border-[#FF4500]/45" /></label>
            {err && <p className="mt-5 text-sm font-medium text-[#b42318]">Could not load payment. Please try again.</p>}
            <button disabled={saving} className="mt-6 w-full rounded-full bg-[#050505] px-7 py-4 text-sm font-semibold uppercase tracking-wide text-[#FFDFB3] hover:bg-[#111] disabled:opacity-70">{saving ? "Setting up..." : "Pay & Continue"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
