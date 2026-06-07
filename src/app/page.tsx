import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const featureTiles = [
  {
    title: "Run your favorite agent CLI",
    accent: "cyan",
    body: "Control Claude Code, Codex, or Cursor Agent CLI from your phone.",
    artSrc: "/brand-refresh/mascot-phone-standing.png",
    artAlt: "MultiSoul mascot holding a phone",
  },
  {
    title: "Follow work live",
    accent: "lime",
    body: "Watch messages, tool calls, and task status in real time, with tool results close behind.",
    artSrc: "/brand-refresh/mascot-laptop-working.png",
    artAlt: "MultiSoul mascot working from a laptop",
  },
  {
    title: "Answer approvals",
    accent: "coral",
    body: "Answer AskUserQuestion prompts and review risky actions without leaving your phone.",
    artSrc: "/brand-refresh/mascot-decision-pointing.png",
    artAlt: "MultiSoul mascot pointing at a decision",
  },
  {
    title: "Connect more than one machine",
    accent: "sage",
    body: "Connect one phone to multiple computers and keep every runner close.",
    artSrc: "/brand-refresh/icon-agent.png",
    artAlt: "MultiSoul agent icon",
  },
];

const quickStartSteps = [
  {
    title: "1. Install msctl",
    detail: "Install the CLI on the computer that runs your agents.",
    command: "npm install -g @yakami129/msctl",
    artSrc: "/brand-refresh/icon-agent.png",
    artAlt: "Agent icon",
  },
  {
    title: "2. Start the local service",
    detail:
      "Run quickstart, open the relay tunnel, then Scan QR or Paste connection string in the app.",
    command: "msctl daemon quickstart",
    artSrc: "/brand-refresh/icon-activity.png",
    artAlt: "Activity icon",
  },
  {
    title: "3. Register an agent",
    detail: "From the project you want to control, register the runtime you already use.",
    command:
      "msctl agent codex\nmsctl agent claude-code\nmsctl agent cursor-cli",
    artSrc: "/brand-refresh/icon-tool-call.png",
    artAlt: "Tool call icon",
  },
  {
    title: "4. Get the app",
    detail:
      "App Store listing in progress. Use GitHub release or a local build today while the listing goes live.",
    command: "cd mobile\npnpm install\npnpm start",
    artSrc: "/brand-refresh/icon-chat.png",
    artAlt: "Chat icon",
  },
];

function BrandMark() {
  return (
    <span className="brand-lockup" aria-label="MultiSoul home">
      <Image
        alt=""
        aria-hidden="true"
        className="brand-mini"
        height={1254}
        sizes="27px"
        src="/brand-refresh/mascot-app-icon-badge.png"
        width={1254}
      />
      <span>MultiSoul</span>
    </span>
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
                A mobile console for local AI agents. Watch messages and tool
                calls in real time, answer approval questions, and receive task
                completion notifications.
              </p>
              <div className="hero-actions">
                <Link href="#quickstart" className="button button-primary">
                  Get Started
                </Link>
                <Link href="#product" className="button button-ghost">
                  Watch Demo
                </Link>
              </div>
              <p className="hero-note">
                App Store listing in progress. Use GitHub release or a local
                build today.
              </p>
            </div>

            <div className="hero-visual" aria-label="MultiSoul hero product visual">
              <div className="hero-artwork-shell">
                <Image
                  alt="MultiSoul hero feature introduction artwork"
                  className="hero-artwork"
                  height={1350}
                  priority
                  sizes="(max-width: 760px) 100vw, (max-width: 1180px) calc(100vw - 96px), (max-width: 1240px) 52vw, 680px"
                  src="/multisoul-feature-intro-en-v2.png"
                  width={2400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="system-section" id="product" aria-labelledby="system-title">
        <div className="system-intro">
          <div className="system-intro__meta">
            <p className="section-kicker">06&nbsp;&nbsp; MultiSoul brand manual</p>
            <span className="system-intro__rule" aria-hidden="true" />
          </div>
          <h2 id="system-title">
            <span>Cross-platform</span>
            <span>application</span>
          </h2>
          <p className="system-intro__tagline">One system. Many souls.</p>
          <p>
            MultiSoul lets you control AI agents running on your own computer
            from your phone.
          </p>
          <p className="system-runtime-copy">
            There is no central MultiSoul backend. msctl runs locally, stores
            data locally, and connects your phone through the default public
            relay tunnel.
          </p>
        </div>

        <div className="product-board">
          <Image
            alt="MultiSoul product workflow feature board"
            className="product-board__image"
            height={1350}
            sizes="(max-width: 760px) 100vw, (max-width: 1024px) calc(100vw - 32px), (max-width: 1240px) 62vw, 820px"
            src="/multisoul-feature-intro-en-v3.png"
            width={2400}
          />
        </div>
      </section>

      <section
        className="feature-strip"
        id="how-it-works"
        aria-labelledby="features-title"
      >
        <div className="feature-strip__heading">
          <p className="section-kicker">What you can do</p>
          <h2 id="features-title">A local runtime, with a phone-native control loop.</h2>
        </div>
        <div className="feature-grid">
          {featureTiles.map((tile) => (
            <article className={`feature-card feature-card--${tile.accent}`} key={tile.title}>
              <Image
                alt={tile.artAlt}
                className={`feature-card__art feature-card__art--${tile.accent}`}
                height={1254}
                sizes="(max-width: 760px) 72px, 96px"
                src={tile.artSrc}
                width={1254}
              />
              <h3>{tile.title}</h3>
              <p>{tile.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quickstart-strip" id="quickstart" aria-labelledby="quickstart-title">
        <div className="quickstart-strip__heading">
          <p className="section-kicker">Quick Start</p>
          <h2 id="quickstart-title">From install to first remote agent in four moves.</h2>
        </div>
        <div className="quickstart-grid">
          {quickStartSteps.map((step) => (
            <article className="quickstart-card" key={step.title}>
              <Image
                alt={step.artAlt}
                className="quickstart-card__art"
                height={1254}
                sizes="56px"
                src={step.artSrc}
                width={1254}
              />
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
              <pre>
                <code>{step.command}</code>
              </pre>
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
