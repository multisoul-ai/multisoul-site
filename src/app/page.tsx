import Image from "next/image";
import Link from "next/link";

const features = [
  {
    eyebrow: "Local first",
    title: "No central MultiSoul backend",
    body: "msctl runs on your computer, stores state locally, and exposes only the endpoint your phone connects to.",
  },
  {
    eyebrow: "Live control",
    title: "Watch tools, answer decisions",
    body: "Follow agent messages, tool calls, approvals, and task status without staying at your desk.",
  },
  {
    eyebrow: "Multi-runtime",
    title: "Claude Code, Codex, Cursor Agent",
    body: "Register the runtimes you already use and route mobile conversations to the right local workspace.",
  },
];

const steps = ["Install msctl", "Start local serve", "Scan the QR code"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4efe3] text-[#151711]">
      <section className="relative min-h-[82svh] px-5 py-6 sm:min-h-[88vh] sm:px-8 lg:px-12">
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(#151711_1px,transparent_1px),linear-gradient(90deg,#151711_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-x-0 top-0 h-2 bg-[#151711]" />

        <nav className="relative z-10 flex items-center justify-between gap-4 border-b border-[#151711]/20 pb-5 font-mono text-xs uppercase tracking-[0.22em]">
          <Link href="/" className="font-semibold">
            MultiSoul
          </Link>
          <a
            href="https://github.com/yakami129/multisoul"
            className="rounded-full border border-[#151711] px-4 py-2 transition hover:bg-[#151711] hover:text-[#f4efe3]"
          >
            GitHub
          </a>
        </nav>

        <div className="pointer-events-none absolute bottom-8 right-[-72px] z-[1] w-[260px] opacity-20 sm:bottom-12 sm:right-8 sm:w-[320px] sm:opacity-70 lg:right-24 lg:w-[360px] lg:opacity-100">
          <div className="absolute -left-4 top-4 h-full w-full border-2 border-[#151711] bg-[#f25f4c]" />
          <div className="relative border-2 border-[#151711] bg-[#151711] p-2 shadow-[10px_10px_0_#b6ff4a]">
            <Image
              src="/demo-1.gif"
              alt="MultiSoul mobile app showing an AI agent conversation"
              width={360}
              height={760}
              priority
              unoptimized
              className="h-auto w-full border border-[#f4efe3]/30"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl pt-14 sm:pt-20">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex border border-[#151711] bg-[#b6ff4a] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.24em]">
              Personal AI agent command center
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-normal text-[#151711] sm:text-7xl lg:text-8xl">
              Remote-control local AI agents from your phone.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-[#3e4238]">
              MultiSoul keeps Claude Code, Codex, and Cursor Agent running on
              your own machine while your phone becomes the live console for
              tool calls, approvals, and task completion.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/yakami129/multisoul"
                className="inline-flex h-12 items-center justify-center bg-[#151711] px-6 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[#f4efe3] transition hover:bg-[#2f3328]"
              >
                View source
              </a>
              <a
                href="#quickstart"
                className="inline-flex h-12 items-center justify-center border border-[#151711] px-6 font-mono text-sm font-semibold uppercase tracking-[0.16em] transition hover:bg-[#b6ff4a]"
              >
                Quick start
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#151711] bg-[#151711] px-5 py-5 text-[#f4efe3] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-3 font-mono text-sm uppercase tracking-[0.18em] md:grid-cols-3">
          <p>Zero center backend</p>
          <p>Bearer auth over HTTPS/WSS</p>
          <p>Phone-first agent approvals</p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="border-2 border-[#151711] bg-[#fffaf0] p-6 shadow-[8px_8px_0_#151711]"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#b63d2d]">
                {feature.eyebrow}
              </p>
              <h2 className="mt-5 text-2xl font-bold tracking-normal">
                {feature.title}
              </h2>
              <p className="mt-4 leading-7 text-[#4f5348]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="quickstart"
        className="bg-[#fffaf0] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#b63d2d]">
              Quick start
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-normal sm:text-5xl">
              Bring one local workspace online.
            </h2>
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="grid grid-cols-[64px_1fr] items-center border-2 border-[#151711] bg-[#f4efe3]"
              >
                <span className="flex h-16 items-center justify-center border-r-2 border-[#151711] bg-[#b6ff4a] font-mono text-lg font-semibold">
                  {index + 1}
                </span>
                <p className="px-5 text-lg font-semibold">{step}</p>
              </div>
            ))}
            <pre className="overflow-x-auto border-2 border-[#151711] bg-[#151711] p-5 font-mono text-sm leading-7 text-[#b6ff4a]">
              <code>{`npm install -g @yakami129/msctl
msctl daemon quickstart --token <token> --tailnet true`}</code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
