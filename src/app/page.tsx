import Image from "next/image";
import Link from "next/link";

const features = [
  {
    eyebrow: "Pair by QR",
    title: "Connect local agents",
    body: "Pair a machine by QR code and keep your code, chats, and agent runtime on your own computer.",
  },
  {
    eyebrow: "Live hub",
    title: "Track live activity",
    body: "See pending questions, running sessions, tool progress, and unread completions in one mobile hub.",
  },
  {
    eyebrow: "Mobile decisions",
    title: "Answer decisions anywhere",
    body: "Review AskUserQuestion prompts, approve actions, and send context from iOS or Android.",
  },
];

const stats = [
  "Local runtime stays on your machine",
  "Live questions, progress, and completions",
  "Available on iOS and Android",
];

const steps = [
  "Install msctl globally",
  "Start the local service",
  "Scan the QR code from the app",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#f7f2eb]">
      <section className="relative border-b border-white/10 px-4 pb-10 pt-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6633] to-transparent" />

        <nav className="relative z-10 mx-auto flex max-w-[1480px] items-center justify-between gap-4 border-b border-white/10 pb-5 font-mono text-xs uppercase tracking-[0.18em] text-white/70">
          <Link href="/" className="flex items-center gap-3 font-semibold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ff6633] text-base font-black text-black">
              M
            </span>
            MultiSoul
          </Link>
          <a
            href="https://github.com/yakami129/multisoul"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-4 text-white transition hover:border-[#ff6633] hover:text-[#ff6633]"
          >
            GitHub
          </a>
        </nav>

        <div className="relative z-10 mx-auto max-w-[1480px] pt-10 sm:pt-14">
          <div className="max-w-5xl">
            <p className="mb-5 inline-flex rounded-full border border-[#ff6633]/40 bg-[#ff6633]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8a63]">
              Local agents. Mobile control.
            </p>
            <h1
              aria-label="Control local AI agents from your phone"
              className="max-w-5xl break-words text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-7xl sm:leading-[0.9] lg:text-8xl"
            >
              Control{" "}
              <br className="sm:hidden" />
              <span className="text-[#ff6633]">local AI agents</span>{" "}
              <br className="sm:hidden" />
              <span>from your phone</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68 sm:text-2xl sm:leading-9">
              Monitor work, answer decisions, and connect machines without
              leaving your mobile workflow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/yakami129/multisoul"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff6633] px-6 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-[#ff825c]"
              >
                View source
              </a>
              <a
                href="#quickstart"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                Quick start
              </a>
            </div>
          </div>

          <figure className="mt-10 overflow-hidden rounded-[20px] border border-white/12 bg-black shadow-[0_30px_90px_rgba(255,102,51,0.18)] sm:rounded-[28px]">
            <Image
              src="/product-intro.png"
              alt="MultiSoul product overview showing local AI agents controlled from a phone"
              width={1672}
              height={941}
              preload
              sizes="(max-width: 768px) 100vw, 92vw"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#101010] px-4 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/62 sm:text-xs sm:tracking-[0.16em] md:grid-cols-3">
          {stats.map((item) => (
            <p key={item} className="flex min-w-0 items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#5bd66b]" />
              <span className="min-w-0 break-words">{item}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8a63]">
              What your phone becomes
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
              A live console for the agents already working on your machine.
            </h2>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1480px] gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[24px] border border-white/12 bg-[#151515] p-6 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8a63]">
                {feature.eyebrow}
              </p>
              <h3 className="mt-5 text-2xl font-bold tracking-normal text-white">
                {feature.title}
              </h3>
              <p className="mt-4 leading-7 text-white/62">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="quickstart"
        className="border-t border-white/10 bg-[#f6f0e8] px-4 py-16 text-[#101010] sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#d44a24]">
              Quick start
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-normal sm:text-6xl">
              Bring your first local workspace online.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#4b463f]">
              MultiSoul keeps the agent runtime local. Your phone connects to
              the machine you choose, then stays close enough for approvals,
              questions, and progress checks.
            </p>
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="grid grid-cols-[64px_1fr] items-center rounded-2xl border border-[#151711]/15 bg-white"
              >
                <span className="flex h-16 items-center justify-center border-r-2 border-[#151711] bg-[#b6ff4a] font-mono text-lg font-semibold">
                  {index + 1}
                </span>
                <p className="px-5 text-lg font-semibold">{step}</p>
              </div>
            ))}
            <pre className="overflow-x-auto rounded-2xl bg-[#101010] p-5 font-mono text-sm leading-7 text-[#5bd66b]">
              <code>{`npm install -g @yakami129/msctl
msctl daemon quickstart --token <token> --tailnet true`}</code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
