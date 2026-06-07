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
  /// 场景描述：首页首屏应一比一呈现用户提供原型中的导航、标题、CTA、桌面 agent 面板和连接状态。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup       = Home 组件渲染出的静态 HTML（不依赖浏览器状态）
  ///   prototype copy    = 用户第一张图中的可见文本：Your AI Agents. / In Your Pocket. / Connected
  ///   nav labels        = Product, How it works, Pricing, Docs, Download
  ///   old dark-page copy = Control local AI agents from your phone / Quick start / View source
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. renderToStaticMarkup 渲染首页 → 得到完整 HTML 字符串
  ///   2. 检查原型首屏文字 → 确认页面承接用户目标图
  ///   3. 检查 agent 面板和连接状态 → 确认右侧主视觉不是空装饰
  ///   4. 检查旧页面文案 → 确认深色旧版叙事已经退出首屏
  ///
  /// 预期结果：
  ///   - 断言 A：原型标题和副标题应逐一出现，说明首屏方向正确
  ///   - 断言 B：导航与 CTA 应逐一出现，说明站点骨架匹配原型
  ///   - 断言 C：agent 面板和 Connected 状态应出现，说明产品视觉完整
  ///   - 断言 D：旧版深色页文案不应出现，说明没有回退到旧首页
  it("renders the cream hero prototype with product console details", () => {
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
      "supporting copy should name Claude Code, Codex, Cursor, and local computer execution",
    ).toContain("Remote control for Claude Code, Codex, Cursor and more");
    expect(
      html,
      "primary CTA should match the prototype",
    ).toContain("Get Started");
    expect(
      html,
      "secondary CTA should match the prototype",
    ).toContain("Watch Demo");
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
      "desktop companion card should identify the in-prototype agent window",
    ).toContain("MultiSoul Agent");
    expect(
      html,
      "mock task should make the desktop companion visual read as a real product state",
    ).toContain("Build analytics dashboard");
    expect(
      html,
      "connection badge should match the supplied prototype status chip",
    ).toContain("Connected");
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

  /// 场景描述：页面应吸收品牌手册中的跨平台、实时状态、决策和完成通知物料，而不是只渲染一张静态首屏。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup       = Home 组件渲染出的静态 HTML（单页，无路由参数）
  ///   brand board copy  = Cross-platform application / One system. Many souls.
  ///   feature tiles     = Remote control, Live status, Decision moments, Task complete
  ///   negative copy     = Create Next App + Deploy Now（Next 模板文案）
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 渲染首页 → 得到 HTML
  ///   2. 检查品牌手册相关分区 → 确保页面使用后两张图的风格和物料语言
  ///   3. 检查功能卡片 → 确保远程控制、实时状态、决策和完成通知都有落点
  ///   4. 检查模板文案 → 确保没有回退到脚手架页面
  ///
  /// 预期结果：
  ///   - 断言 A：品牌名和跨平台口号应出现，说明后续内容继承手册方向
  ///   - 断言 B：四个功能物料应逐一出现，说明页面不是只有静态 hero
  ///   - 断言 C：模板文案不应出现，说明页面没有脚手架回归
  it("renders brand-system feature material below the hero", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html, "brand name should remain visible across the refreshed page").toContain(
      "MultiSoul",
    );
    expect(
      html,
      "brand manual headline should anchor the cross-platform product section",
    ).toContain("Cross-platform application");
    expect(
      html,
      "brand manual slogan should appear as a direct continuation of the supplied visual system",
    ).toContain("One system. Many souls.");
    expect(
      html,
      "remote-control tile should make the phone-to-computer workflow explicit",
    ).toContain("Remote control");
    expect(
      html,
      "live-status tile should make realtime agent feedback explicit",
    ).toContain("Live status");
    expect(
      html,
      "decision-moments tile should make approvals explicit",
    ).toContain("Decision moments");
    expect(
      html,
      "task-complete tile should make completion notifications explicit",
    ).toContain("Task complete");
    expect(
      html,
      "Create Next App scaffold copy should not appear on the published page",
    ).not.toContain("Create Next App");
    expect(
      html,
      "Deploy Now scaffold CTA should not appear on the published page",
    ).not.toContain("Deploy Now");
  });

  /// 场景描述：页面中的 mascot 必须使用基于用户参考图生成的真实图片资产，而不是继续输出旧的 inline SVG 机器人。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup       = Home 组件渲染出的静态 HTML
  ///   image asset       = /multisoul-mascot-generated.png（生成后落盘到 public，供 HTML 引用）
  ///   image alt         = Generated MultiSoul mini robot mascot（说明这是生成图片资产）
  ///   old svg marker    = data-multisoul-mascot="reference-hero"（上一版 inline SVG mascot，应移除）
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 渲染首页 → 得到 HTML
  ///   2. 检查图片路径 → 确认页面直接引用生成后的 PNG 资产
  ///   3. 检查图片 alt → 确认可访问名称描述生成 mascot
  ///   4. 检查旧 SVG marker → 确认 current HTML 不再内联旧机器人 SVG
  ///
  /// 预期结果：
  ///   - 断言 A：生成图片路径必须存在，说明 HTML 使用新图片资产
  ///   - 断言 B：生成图片 alt 必须存在，说明替换后仍可访问
  ///   - 断言 C：旧 SVG marker 不应出现，说明旧 inline mascot 已被移除
  ///   - 断言 D：旧 SVG aria label 不应出现，说明旧 SVG 组件没有残留
  it("uses the generated mascot image asset instead of the inline svg robot", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(
      html,
      "generated mascot png should be referenced by the rendered page",
    ).toContain("multisoul-mascot-generated.png");
    expect(
      html,
      "generated mascot image should keep an accessible alt label",
    ).toContain("Generated MultiSoul mini robot mascot");
    expect(
      html,
      "old inline svg mascot marker should be gone after replacing it with a generated image asset",
    ).not.toContain('data-multisoul-mascot="reference-hero"');
    expect(
      html,
      "old inline svg mascot aria label should be gone after replacing it with a generated image asset",
    ).not.toContain("MultiSoul reference robot mascot with phone and sage cape");
  });

  /// 场景描述：搜索与社交预览元数据应匹配新版“Your AI Agents. In Your Pocket.”产品介绍。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   metadata.title       = layout 导出的静态标题
  ///   metadata.description = layout 导出的静态描述
  ///   expected title       = "MultiSoul - Your AI Agents In Your Pocket"
  ///   expected description = 一句话说明远程控制 Claude Code、Codex、Cursor 等本地 agent
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 读取 layout metadata → 不渲染页面、不访问网络
  ///   2. 比对 title → 确保分享标题与原型首屏一致
  ///   3. 比对 description → 确保搜索摘要包含支持的 agent 产品和本地电脑语境
  ///
  /// 预期结果：
  ///   - 断言 A：title 必须等于新版定位，避免旧定位残留
  ///   - 断言 B：description 必须等于新版摘要，避免泛化描述
  it("sets production metadata for search and social previews", () => {
    expect(
      metadata.title,
      "metadata title should match the refreshed hero positioning",
    ).toBe("MultiSoul - Your AI Agents In Your Pocket");
    expect(
      metadata.description,
      "metadata description should summarize the phone-first local agent workflow",
    ).toBe(
      "Remote control for Claude Code, Codex, Cursor, and more while they keep running on your computer.",
    );
  });
});
