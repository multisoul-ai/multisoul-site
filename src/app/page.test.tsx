import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";
import { metadata } from "./layout";

vi.mock("next/font/google", () => ({
  IBM_Plex_Sans: () => ({ variable: "font-plex-sans" }),
  IBM_Plex_Mono: () => ({ variable: "font-plex-mono" }),
}));

describe("MultiSoul landing page", () => {
  /// 场景描述：产品介绍页应使用新的产品海报作为主视觉，并呈现手机控制本地 agent 的核心定位。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup = Home 组件渲染出的静态 HTML（不依赖浏览器状态）
  ///   hero image  = /product-intro.png（用户提供的新产品介绍图）
  ///   old image   = /demo-1.gif（旧版动图，应从主视觉中移除）
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. renderToStaticMarkup 渲染首页 → 得到完整 HTML 字符串
  ///   2. 检查核心标题和三条功能文案 → 确认产品定位来自新介绍图
  ///   3. 检查图片路径 → 新图存在，旧 gif 不再作为产品主视觉
  ///
  /// 预期结果：
  ///   - 断言 A：主标题应出现，说明首屏聚焦手机控制本地 AI agents
  ///   - 断言 B：三条功能卖点应逐一出现，说明产品介绍完整
  ///   - 断言 C：新图路径应出现，说明页面使用用户提供图片
  ///   - 断言 D：旧图路径不应出现，说明主视觉已替换
  it("renders the refreshed product intro with the provided image", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(
      html,
      "hero headline should state the phone-first local agent control promise",
    ).toContain("Control local AI agents from your phone");
    expect(
      html,
      "supporting copy should explain monitoring, decisions, and machine connection",
    ).toContain("Monitor work, answer decisions, and connect machines");
    expect(
      html,
      "connect-local-agents feature should be visible as a concrete product capability",
    ).toContain("Connect local agents");
    expect(
      html,
      "track-live-activity feature should be visible as a concrete product capability",
    ).toContain("Track live activity");
    expect(
      html,
      "answer-decisions-anywhere feature should be visible as a concrete product capability",
    ).toContain("Answer decisions anywhere");
    expect(
      html,
      "new product-intro image should be referenced in the rendered markup",
    ).toContain("product-intro.png");
    expect(
      html,
      "old demo gif should no longer be used as the product intro visual",
    ).not.toContain("demo-1.gif");
  });

  /// 场景描述：产品介绍页应保留品牌、源码入口与安装入口，同时移除脚手架内容。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   page markup = Home 组件渲染出的静态 HTML（单页，无路由参数）
  ///   positive anchors = MultiSoul + GitHub URL + Quick start
  ///   negative copy    = Create Next App + Deploy Now（Next 模板文案）
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 渲染首页 → 得到 HTML
  ///   2. 检查品牌和两个行动入口 → 确保发布页仍可导向代码与安装
  ///   3. 检查模板文案 → 确保没有回退到脚手架页面
  ///
  /// 预期结果：
  ///   - 断言 A：MultiSoul 应出现，说明品牌露出存在
  ///   - 断言 B：GitHub 链接应出现，说明源码入口保留
  ///   - 断言 C：Quick start 应出现，说明安装入口保留
  ///   - 断言 D：脚手架文案不应出现，说明页面没有模板回归
  it("renders MultiSoul positioning and removes scaffold copy", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html, "brand name should remain visible in the landing page").toContain(
      "MultiSoul",
    );
    expect(
      html,
      "GitHub source link should remain available for technical visitors",
    ).toContain("https://github.com/yakami129/multisoul");
    expect(
      html,
      "quick start section should remain available after the visual refresh",
    ).toContain("Quick start");
    expect(
      html,
      "Create Next App scaffold copy should not appear on the published page",
    ).not.toContain("Create Next App");
    expect(
      html,
      "Deploy Now scaffold CTA should not appear on the published page",
    ).not.toContain("Deploy Now");
  });

  /// 场景描述：搜索与社交预览元数据应匹配新版“手机控制本地 AI agents”的产品介绍。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   metadata.title       = layout 导出的静态标题
  ///   metadata.description = layout 导出的静态描述
  ///   expected title       = "MultiSoul - Control Local AI Agents From Your Phone"
  ///   expected description = 一句话说明本地运行、手机监控、移动端决策
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 读取 layout metadata → 不渲染页面、不访问网络
  ///   2. 比对 title → 确保分享标题与首屏承诺一致
  ///   3. 比对 description → 确保搜索摘要包含产品使用场景
  ///
  /// 预期结果：
  ///   - 断言 A：title 必须等于新版定位，避免旧定位残留
  ///   - 断言 B：description 必须等于新版摘要，避免泛化描述
  it("sets production metadata for search and social previews", () => {
    expect(
      metadata.title,
      "metadata title should match the refreshed hero positioning",
    ).toBe("MultiSoul - Control Local AI Agents From Your Phone");
    expect(
      metadata.description,
      "metadata description should summarize the phone-first local agent workflow",
    ).toBe(
      "Monitor local AI agent work, answer decisions, and connect your machines from iOS or Android.",
    );
  });
});
