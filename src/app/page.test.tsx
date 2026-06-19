import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";
import { metadata } from "./layout";

vi.mock("next/font/google", () => ({
  IBM_Plex_Mono: () => ({ variable: "font-plex-mono" }),
  IBM_Plex_Sans: () => ({ variable: "font-plex-sans" }),
  Inter: () => ({ variable: "font-inter" }),
  Space_Grotesk: () => ({ variable: "font-space-grotesk" }),
}));

describe("MultiSoul landing page", () => {
  /// 场景描述：首页首屏应保留现有标题骨架，但产品介绍文案要对齐 README 中“mobile console for local AI agents”的定位，并明确 App Store 已可下载。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup       = Home 组件渲染出的静态 HTML（不依赖浏览器状态）
  ///   prototype copy    = 首屏核心文案：Your AI Agents. / In Your Pocket.
  ///   nav labels        = Product, How it works, Pricing, Docs, Download
  ///   hero CTAs         = Get Started / Download App（Download App 应紧邻首屏主 CTA，并指向 App Store）
  ///   hero artwork      = /multisoul-feature-intro-en-v2.png（用户提供的新首屏图）
  ///   hero artwork alt  = MultiSoul hero feature introduction artwork
  ///   badge artwork     = /brand-refresh/mascot-app-icon-badge.png（brand refresh 透明底徽标）
  ///   README product copy = A mobile console for local AI agents / watch messages and tool calls in real time / answer approval questions / task completion notifications
  ///   app store note    = Available on the App Store / https://apps.apple.com/sg/app/multisoul/id6763881771
  ///   retired brand mark = data-multisoul-brand-mark="reference-mascot"（旧 inline SVG 头标，应退出）
  ///   retired mock copy = MultiSoul Agent / Build analytics dashboard（旧手写 mock 面板文案）
  ///   old dark-page copy = Control local AI agents from your phone / Quick start / View source
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. renderToStaticMarkup 渲染首页 → 得到完整 HTML 字符串
  ///   2. 检查原型首屏文字、导航与 CTA → 确认文案骨架保持稳定
  ///   3. 检查 README 定位文案与 App Store 下载提示 → 确认首页介绍和当前发布状态正确
  ///   4. 检查 badge 资源、hero 图片路径与旧 mock 文案 → 确认首屏视觉正确且无老残留
  ///
  /// 预期结果：
  ///   - 断言 A：原型标题和副标题应逐一出现，说明首屏方向正确
  ///   - 断言 B：导航与 CTA 应逐一出现，说明站点骨架仍匹配首页结构，且不再保留 Watch Demo
  ///   - 断言 C：README 产品定位和 App Store 下载提示必须出现，说明首页介绍已更新
  ///   - 断言 D：brand-refresh badge 与 v2 图片必须存在，且旧 svg 头标与旧 mock 文案不应出现
  it("renders the README-aligned hero copy with the supplied v2 feature artwork", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(
      html,
      "hero headline should keep the exact first-line promise from the supplied prototype",
    ).toContain("Your AI Agents.");
    expect(
      html,
      "hero accent line should keep the exact pocket-oriented phrase from the supplied prototype",
    ).toContain("In Your Pocket.");
    expect(
      html,
      "hero supporting copy should position MultiSoul as a mobile console for local AI agents",
    ).toContain("A mobile console for local AI agents.");
    expect(
      html,
      "hero supporting copy should promise realtime messages and tool call visibility from the README",
    ).toContain("Watch messages and tool calls in real time");
    expect(
      html,
      "hero supporting copy should mention approval questions from the README",
    ).toContain("answer approval questions");
    expect(
      html,
      "hero supporting copy should mention completion notifications from the README",
    ).toContain("task completion notifications");
    expect(
      html,
      "primary CTA should match the prototype",
    ).toContain("Get Started");
    expect(
      html,
      "secondary hero CTA should let visitors download the live app beside Get Started",
    ).toContain("Download App");
    expect(
      html,
      "secondary hero CTA should point directly to the App Store listing",
    ).toMatch(
      /<a[^>]*href="https:\/\/apps\.apple\.com\/sg\/app\/multisoul\/id6763881771"[^>]*class="button button-ghost"[^>]*>Download App<\/a>/,
    );
    expect(
      html,
      "old Watch Demo CTA should be removed from the hero actions",
    ).not.toContain("Watch Demo");
    expect(
      html,
      "top navigation should expose the Product section from the prototype",
    ).toContain("Product");
    expect(
      html,
      "top navigation should expose the How it works section from the prototype",
    ).toContain("How it works");
    expect(
      html,
      "top navigation should expose the Pricing section from the prototype",
    ).toContain("Pricing");
    expect(
      html,
      "top navigation should expose the Docs section from the prototype",
    ).toContain("Docs");
    expect(
      html,
      "download pill should be visible in the hero navigation",
    ).toContain("Download");
    expect(
      html,
      "brand lockup should use the refreshed transparent badge asset instead of the old inline svg mark",
    ).toContain("%2Fbrand-refresh%2Fmascot-app-icon-badge.png");
    expect(
      html,
      "hero should explicitly tell visitors that MultiSoul is now available on the App Store",
    ).toContain("Available on the App Store");
    expect(
      html,
      "hero and download CTAs should link to the live App Store listing",
    ).toContain("https://apps.apple.com/sg/app/multisoul/id6763881771");
    expect(
      html,
      "hero should not keep the stale App Store in-progress copy after the app is live",
    ).not.toContain("App Store listing in progress");
    expect(
      html,
      "hero artwork should reference the supplied v2 PNG asset from public",
    ).toContain("multisoul-feature-intro-en-v2.png");
    expect(
      html,
      "hero artwork should keep an accessible alt label after the image swap",
    ).toContain("MultiSoul hero feature introduction artwork");
    expect(
      html,
      "old inline svg brand mark should be removed after switching to the transparent badge asset",
    ).not.toContain('data-multisoul-brand-mark="reference-mascot"');
    expect(
      html,
      "old handwritten agent window title should be removed once the hero uses the supplied v2 artwork",
    ).not.toContain("MultiSoul Agent");
    expect(
      html,
      "old handwritten task copy should be removed once the hero uses the supplied v2 artwork",
    ).not.toContain("Build analytics dashboard");
    expect(
      html,
      "old dark landing page headline should not remain after the prototype rebuild",
    ).not.toContain("Control local AI agents from your phone");
    expect(
      html,
      "old source-code CTA should not remain in the consumer-facing hero",
    ).not.toContain("View source");
    expect(
      html,
      "old quick-start section should not remain as the first-page narrative",
    ).not.toContain("Quick start");
  });

  /// 场景描述：产品介绍区应吸收 README 里的运行方式与能力边界，说明没有中心化后端、`msctl` 本地运行，并保留能力概览。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup       = Home 组件渲染出的静态 HTML（单页，无路由参数）
  ///   brand board copy  = Cross-platform application / One system. Many souls.
  ///   product artwork   = /multisoul-feature-intro-en-v3.png（用户提供的次屏介绍图）
  ///   product artwork alt = MultiSoul product workflow feature board
  ///   runtime copy      = There is no central MultiSoul backend / msctl runs locally / stores data locally / public relay tunnel
  ///   feature tiles     = Control Claude Code, Codex, or Cursor Agent CLI / Watch messages, tool calls, and status / Answer AskUserQuestion prompts / Connect one phone to multiple computers
  ///   feature artwork   = /brand-refresh/mascot-phone-standing.png / mascot-laptop-working.png / mascot-decision-pointing.png / icon-agent.png
  ///   retired device copy = Mobile app / Desktop companion / Lock screen notification（旧三张 mock 卡片标题）
  ///   negative copy     = Create Next App + Deploy Now（Next 模板文案）
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 渲染首页 → 得到 HTML
  ///   2. 检查品牌手册相关分区 → 确保页面保留跨平台叙事
  ///   3. 检查本地运行与 relay 文案 → 确认 README 的架构说明落地到页面
  ///   4. 检查能力卡片、对应 brand-refresh 素材、旧设备卡片标题和模板文案 → 确保内容完整且无老结构残留
  ///
  /// 预期结果：
  ///   - 断言 A：品牌名和跨平台口号应出现，说明后续内容继承手册方向
  ///   - 断言 B：v3 图片路径与 alt、以及本地运行文案应出现，说明产品介绍区已换成 README 叙事
  ///   - 断言 C：四个能力物料和不同 transparent 素材应逐一出现，说明页面不再重复同一机器人
  ///   - 断言 D：旧设备卡片标题与模板文案不应出现，说明结构已切换
  it("renders the product section with README-aligned runtime and capability copy", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html, "brand name should remain visible across the refreshed page").toContain(
      "MultiSoul",
    );
    expect(
      html,
      "brand manual headline should include the cross-platform first line after the responsive line-break refinement",
    ).toContain("Cross-platform");
    expect(
      html,
      "brand manual headline should include the application second line after the responsive line-break refinement",
    ).toContain("application");
    expect(
      html,
      "brand manual slogan should appear as a direct continuation of the supplied visual system",
    ).toContain("One system. Many souls.");
    expect(
      html,
      "product section should reference the supplied v3 PNG asset from public",
    ).toContain("multisoul-feature-intro-en-v3.png");
    expect(
      html,
      "product section artwork should keep an accessible alt label after the image swap",
    ).toContain("MultiSoul product workflow feature board");
    expect(
      html,
      "product section should state that there is no central MultiSoul backend",
    ).toContain("There is no central MultiSoul backend.");
    expect(
      html,
      "product section should state that msctl runs locally",
    ).toContain("msctl runs locally");
    expect(
      html,
      "product section should mention local storage from the README",
    ).toContain("stores data locally");
    expect(
      html,
      "product section should mention the default public relay tunnel setup from the README",
    ).toContain("public relay tunnel");
    expect(
      html,
      "capability card should name supported agent runtimes from the README",
    ).toContain("Claude Code, Codex, or Cursor Agent CLI");
    expect(
      html,
      "capability card should mention messages, tool calls, and status watching from the README",
    ).toContain("Watch messages, tool calls, and task status");
    expect(
      html,
      "capability card should mention AskUserQuestion prompts from the README",
    ).toContain("Answer AskUserQuestion prompts");
    expect(
      html,
      "capability card should mention one phone connecting to multiple computers from the README",
    ).toContain("Connect one phone to multiple computers");
    expect(
      html,
      "feature area should use the phone-standing mascot asset for the agent-control card",
    ).toContain("MultiSoul mascot holding a phone");
    expect(
      html,
      "feature area should use the laptop-working mascot asset for the live-status card",
    ).toContain("MultiSoul mascot working from a laptop");
    expect(
      html,
      "feature area should use the decision-pointing mascot asset for the approvals card",
    ).toContain("MultiSoul mascot pointing at a decision");
    expect(
      html,
      "feature area should use the agent icon asset for the multi-machine card",
    ).toContain("MultiSoul agent icon");
    expect(
      html,
      "old mobile device card heading should be removed after replacing the section with a supplied board image",
    ).not.toContain("Mobile app");
    expect(
      html,
      "old desktop device card heading should be removed after replacing the section with a supplied board image",
    ).not.toContain("Desktop companion");
    expect(
      html,
      "old lock screen device card heading should be removed after replacing the section with a supplied board image",
    ).not.toContain("Lock screen notification");
    expect(
      html,
      "Create Next App scaffold copy should not appear on the published page",
    ).not.toContain("Create Next App");
    expect(
      html,
      "Deploy Now scaffold CTA should not appear on the published page",
    ).not.toContain("Deploy Now");
  });

  /// 场景描述：Quick Start 区块应把 README 的安装、配对、注册 agent 和当前 App Store 下载入口讲清楚。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup       = Home 组件渲染出的静态 HTML
  ///   install command   = npm install -g @yakami129/msctl
  ///   daemon command    = msctl daemon quickstart
  ///   pairing copy      = Scan QR / Paste connection string
  ///   register commands = msctl agent codex / claude-code / cursor-cli
  ///   app store note    = Available on the App Store / apps.apple.com/sg/app/multisoul/id6763881771
  ///   quick start icons = /brand-refresh/icon-agent.png / icon-activity.png / icon-tool-call.png / icon-chat.png
  ///   retired asset     = /multisoul-mascot-generated.png（上一版主页主图依赖，不应在 quick start 文案里重新出现）
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 渲染首页 → 得到 HTML
  ///   2. 检查安装与 daemon 命令 → 确认快速上手步骤准确
  ///   3. 检查配对与注册 agent 文案 → 确认 README 的上手闭环完整
  ///   4. 检查 App Store 下载入口、Quick Start 图标和旧 mascot 依赖 → 确认发布状态正确且无历史残留
  ///
  /// 预期结果：
  ///   - 断言 A：安装与 daemon 命令必须出现，说明 Quick Start 可执行
  ///   - 断言 B：扫码配对与 agent 注册命令必须出现，说明连接路径完整
  ///   - 断言 C：App Store 下载提示与 Quick Start 图标必须出现，说明发布状态透明且视觉更丰富
  ///   - 断言 D：旧 mascot PNG 路径不应出现，说明没有回退到历史依赖
  it("renders quick start steps and the live App Store download notice", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(
      html,
      "quick start should include the npm install command from the README",
    ).toContain("npm install -g @yakami129/msctl");
    expect(
      html,
      "quick start should include the daemon quickstart command from the README",
    ).toContain("msctl daemon quickstart");
    expect(
      html,
      "quick start should mention QR pairing from the README",
    ).toContain("Scan QR");
    expect(
      html,
      "quick start should mention the connection-string fallback from the README",
    ).toContain("Paste connection string");
    expect(
      html,
      "quick start should include the codex registration shortcut from the README",
    ).toContain("msctl agent codex");
    expect(
      html,
      "quick start should include the claude-code registration shortcut from the README",
    ).toContain("msctl agent claude-code");
    expect(
      html,
      "quick start should include the cursor-cli registration shortcut from the README",
    ).toContain("msctl agent cursor-cli");
    expect(
      html,
      "page should tell visitors that MultiSoul is now available on the App Store",
    ).toContain("Available on the App Store");
    expect(
      html,
      "quick start should expose the live App Store listing URL",
    ).toContain("https://apps.apple.com/sg/app/multisoul/id6763881771");
    expect(
      html,
      "quick start should not point visitors to GitHub or local builds once the App Store listing is live",
    ).not.toContain("Use GitHub release or a local build today");
    expect(
      html,
      "quick start should not keep the stale local mobile build command once the App Store listing is live",
    ).not.toContain("cd mobile");
    expect(
      html,
      "quick start should use the agent icon asset on the install step",
    ).toContain('alt="Agent icon"');
    expect(
      html,
      "quick start should use the activity icon asset on the service step",
    ).toContain('alt="Activity icon"');
    expect(
      html,
      "quick start should use the tool-call icon asset on the register step",
    ).toContain('alt="Tool call icon"');
    expect(
      html,
      "quick start should use the chat icon asset on the get-app step",
    ).toContain('alt="Chat icon"');
    expect(
      html,
      "old mascot png should still remain absent after the copy refresh",
    ).not.toContain("multisoul-mascot-generated.png");
  });

  /// 场景描述：搜索与社交预览元数据应匹配 README 中“mobile console for local AI agents”的介绍，并说明 App Store 已可下载。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   metadata.title       = layout 导出的静态标题
  ///   metadata.description = layout 导出的静态描述
  ///   expected title       = "MultiSoul - Your AI Agents In Your Pocket"
  ///   expected description = 一句话说明手机控制本地 agent、实时查看工具调用与审批，并指出 App Store 可下载
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 读取 layout metadata → 不渲染页面、不访问网络
  ///   2. 比对 title → 确保分享标题与原型首屏一致
  ///   3. 比对 description → 确保搜索摘要包含 mobile console、实时可见性、审批语境与下载状态
  ///
  /// 预期结果：
  ///   - 断言 A：title 必须等于新版定位，避免旧定位残留
  ///   - 断言 B：description 必须等于 README 对齐后的摘要与 App Store 状态，避免旧文案残留
  it("sets production metadata for search and social previews", () => {
    expect(
      metadata.title,
      "metadata title should match the refreshed hero positioning",
    ).toBe("MultiSoul - Your AI Agents In Your Pocket");
    expect(
      metadata.description,
      "metadata description should summarize the README-aligned mobile console workflow and App Store availability",
    ).toBe(
      "A mobile console for local AI agents with live tool visibility, approval prompts, completion notifications, and App Store download.",
    );
  });
});
