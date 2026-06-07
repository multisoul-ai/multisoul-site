import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const activityRows = [
  ["10:32:11", "User", "Build analytics dashboard"],
  ["10:32:12", "Agent", "Planning steps..."],
  ["10:32:14", "Tool Call", "SearchFiles src/analytics/**"],
  ["10:32:16", "Tool Call", "ReadFile src/app.ts"],
  ["10:32:36", "RunCommand", "pnpm test"],
  ["10:32:44", "Agent", "All tests passed"],
];

const featureTiles = [
  {
    title: "Remote control",
    accent: "cyan",
    body: "Control your local AI agents from anywhere.",
  },
  {
    title: "Live status",
    accent: "lime",
    body: "Real-time messages, tool calls and task progress.",
  },
  {
    title: "Decision moments",
    accent: "coral",
    body: "Approve the exact step that needs your call.",
  },
  {
    title: "Task complete",
    accent: "sage",
    body: "Get notified the moment the work is finished.",
  },
];

function BrandMark() {
  return (
    <span className="brand-lockup" aria-label="MultiSoul home">
      <svg
        aria-hidden="true"
        className="brand-mini"
        data-multisoul-brand-mark="reference-mascot"
        viewBox="0 0 64 64"
      >
        <path
          d="M32 18V9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="7"
          fill="var(--cream)"
          r="5"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M13 33c1-16 12-25 31-22 12 2 19 12 17 25-2 15-15 23-32 21-17-2-29-13-16-24z"
          fill="var(--cream)"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M19 31c6-7 28-7 36 0 5 5 3 15-5 19-9 5-28 4-35-2-6-5-5-13 4-17z"
          fill="currentColor"
        />
        <ellipse cx="30" cy="41" fill="var(--cream)" rx="3.5" ry="4" />
        <ellipse cx="44" cy="41" fill="var(--cream)" rx="3.5" ry="4" />
        <path
          d="M18 58c10 4 30 4 39-1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3.5"
        />
      </svg>
      <span>MultiSoul</span>
    </span>
  );
}

function Mascot({ className = "" }: { className?: string }) {
  const isHero = className.split(" ").includes("hero-mascot");

  return (
    <Image
      alt="Generated MultiSoul mini robot mascot"
      className={className}
      height={1004}
      loading={isHero ? "eager" : "lazy"}
      sizes={isHero ? "(max-width: 760px) 210px, 252px" : "116px"}
      src="/multisoul-mascot-generated.png"
      width={878}
    />
  );
}

function AgentWindow() {
  return (
    <div className="agent-window" aria-label="MultiSoul desktop companion">
      <div className="agent-window__chrome">
        <span className="dot dot-coral" />
        <span className="dot dot-lime" />
        <span className="dot dot-cyan" />
        <p>MultiSoul Agent</p>
        <span className="agent-window__close">x</span>
      </div>

      <div className="agent-window__task">
        <div>
          <p className="mini-label">Task</p>
          <strong>Build analytics dashboard</strong>
        </div>
        <div className="progress-copy">
          <span>Progress</span>
          <strong>73%</strong>
        </div>
        <div className="progress-track">
          <span />
        </div>
      </div>

      <div className="agent-window__body">
        <div className="agent-tabs">
          <strong>LIVE</strong>
          <span>TOOLS</span>
          <span>FILES</span>
          <span>TERMINAL</span>
        </div>
        <div className="activity-feed">
          {activityRows.map(([time, actor, copy]) => (
            <div className="activity-row" key={`${time}-${actor}`}>
              <time>{time}</time>
              <strong>{actor}</strong>
              <span>{copy}</span>
            </div>
          ))}
        </div>
        <div className="agent-input">
          <span>Ask or send a command...</span>
          <span aria-hidden="true">/</span>
        </div>
      </div>

      <div className="decision-card" aria-label="Decision required">
        <strong>Decision required</strong>
        <span>Deploy to production?</span>
        <button type="button">Approve</button>
        <button type="button">Cancel</button>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="phone-mock" aria-label="MultiSoul mobile app preview">
      <div className="phone-mock__bar">
        <span>9:41</span>
        <span>|||</span>
      </div>
      <div className="phone-mock__agent">
        <span>Local Agent</span>
        <strong>Claude Code</strong>
        <em>Connected</em>
      </div>
      <div className="phone-tabs">
        <strong>LIVE</strong>
        <span>TOOLS</span>
        <span>FILES</span>
        <span>LOG</span>
      </div>
      <div className="phone-feed">
        <p>
          <span>9:41:02</span>
          <strong>User</strong>
          Refactor the data layer and add unit tests.
        </p>
        <p>
          <span>9:41:11</span>
          <strong>Tool Call</strong>
          ReadFile src/lib/client.ts
        </p>
        <p>
          <span>9:41:34</span>
          <strong>Claude Code</strong>
          Running tests...
        </p>
      </div>
      <div className="phone-decision">
        <strong>Decision required</strong>
        <span>Approve change to src/lib/repo.ts?</span>
        <div>
          <button type="button">Approve</button>
          <button type="button">Reject</button>
        </div>
      </div>
    </div>
  );
}

function LockNotification() {
  return (
    <div className="lock-screen" aria-label="MultiSoul lock screen notifications">
      <span className="lock-screen__lock">lock</span>
      <strong>9:41</strong>
      <span>Monday, June 2</span>
      <div className="notification-card">
        <Mascot className="notification-mascot" />
        <div>
          <strong>Decision needed</strong>
          <p>Approve database migration?</p>
        </div>
      </div>
      <div className="notification-card">
        <Mascot className="notification-mascot" />
        <div>
          <strong>Task complete</strong>
          <p>&quot;Analytics dashboard&quot; finished successfully.</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero-stage" aria-labelledby="hero-title">
        <div className="hero-card">
          <nav className="top-nav" aria-label="Primary navigation">
            <Link href="/" className="top-nav__brand">
              <BrandMark />
            </Link>
            <div className="top-nav__links">
              {navItems.map((item) => (
                <Link href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="#download" className="download-pill">
              Download
            </Link>
          </nav>

          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">
                Your AI Agents.
                <span>In Your Pocket.</span>
              </h1>
              <p>
                Remote control for Claude Code, Codex, Cursor and more, running
                on your computer.
              </p>
              <div className="hero-actions">
                <Link href="#download" className="button button-primary">
                  Get Started
                </Link>
                <Link href="#product" className="button button-ghost">
                  Watch Demo
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-label="MultiSoul hero product visual">
              <span className="hero-blob" aria-hidden="true" />
              <span className="orbit-path" aria-hidden="true" />
              <AgentWindow />
              <Mascot className="hero-mascot" />
              <div className="connected-badge">
                <span aria-hidden="true" />
                Connected
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="system-section" id="product" aria-labelledby="system-title">
        <div className="system-intro">
          <p className="section-kicker">06&nbsp;&nbsp; MultiSoul brand manual</p>
          <h2 id="system-title">Cross-platform application</h2>
          <strong>One system. Many souls.</strong>
          <p>
            MultiSoul lives everywhere you work. Your phone controls agents,
            your computer runs them, and every approval stays close.
          </p>
          <Mascot className="system-mascot" />
        </div>

        <div className="device-grid">
          <article className="device-card phone-card">
            <span>Mobile app</span>
            <PhoneMock />
          </article>
          <article className="device-card desktop-card">
            <span>Desktop companion</span>
            <div className="laptop-frame">
              <AgentWindow />
            </div>
          </article>
          <article className="device-card lock-card">
            <span>Lock screen notification</span>
            <LockNotification />
          </article>
        </div>
      </section>

      <section
        className="feature-strip"
        id="how-it-works"
        aria-labelledby="features-title"
      >
        <div className="feature-strip__heading">
          <p className="section-kicker">Remote agent system</p>
          <h2 id="features-title">Every state has a signal.</h2>
        </div>
        <div className="feature-grid">
          {featureTiles.map((tile) => (
            <article className={`feature-card feature-card--${tile.accent}`} key={tile.title}>
              <Mascot className="feature-mascot" />
              <h3>{tile.title}</h3>
              <p>{tile.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="download-band" id="download" aria-labelledby="download-title">
        <div>
          <BrandMark />
          <h2 id="download-title">Remotely yours.</h2>
        </div>
        <Link href="https://github.com/yakami129/multisoul" className="download-band__button">
          Download
        </Link>
      </section>

      <footer className="site-footer" id="pricing">
        <span>One system</span>
        <span>Many platforms</span>
        <span>One soul</span>
      </footer>
      <span className="sr-only" id="docs">
        Docs
      </span>
    </main>
  );
}
