import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("production deployment workflow", () => {
  /// 场景描述：package.json 应提供一个可由 GitHub Actions 调用的生产发布脚本。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   package.json path = project root + "package.json"
  ///   deploy script     = deploy:production
  ///   required command  = vercel pull + vercel build + vercel deploy --prebuilt
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 读取 package.json → 得到 scripts 配置
  ///   2. 检查 deploy:production → 确保 CI 有单一发布入口
  ///   3. 检查命令内容 → 确保先拉取生产环境配置，再构建并发布预构建产物
  ///
  /// 预期结果：
  ///   - 断言 A：deploy:production 必须存在，说明发布脚本已集成进项目
  ///   - 断言 B：脚本必须执行 Vercel 生产发布链路，避免只运行本地 build
  ///   - 断言 C：scripts 不应覆盖 dev，避免影响本地开发入口
  it("defines a reusable production deploy script", () => {
    const packageJson = JSON.parse(
      readFileSync(join(root, "package.json"), "utf8"),
    ) as { scripts: Record<string, string> };

    expect(
      packageJson.scripts["deploy:production"],
      "deploy:production should exist so GitHub Actions can call the same release script every time",
    ).toBeDefined();
    expect(
      packageJson.scripts["deploy:production"],
      "deploy:production should pull production env, build for production, then deploy the prebuilt output",
    ).toBe(
      'vercel pull --yes --environment=production --token "$VERCEL_TOKEN" && vercel build --prod --token "$VERCEL_TOKEN" && vercel deploy --prebuilt --prod --token "$VERCEL_TOKEN"',
    );
    expect(
      packageJson.scripts.dev,
      "dev script should stay unchanged so local development still starts Next.js",
    ).toBe("next dev");
  });

  /// 场景描述：GitHub Actions 发布流程应在 main 分支收到合并后的 push 时触发生产发布。
  ///
  /// 数据构造（含关键数值的推导过程）：
  ///   workflow path     = project root + ".github/workflows/publish.yml"
  ///   trigger branch    = main（合并 PR 后 GitHub 会向 main 产生 push 事件）
  ///   negative trigger  = pull_request（不应在未合并代码上发布生产环境）
  ///
  /// 执行过程（逐步说明系统如何处理）：
  ///   1. 读取 publish.yml → 得到 workflow 文本
  ///   2. 检查 push + main → 确认合并进入 main 后触发
  ///   3. 检查执行步骤 → 确认安装依赖、运行检查、执行发布脚本
  ///
  /// 预期结果：
  ///   - 断言 A：workflow 必须监听 main push，匹配“合并到 main 后发布”
  ///   - 断言 B：workflow 必须执行 pnpm run deploy:production，复用项目发布脚本
  ///   - 断言 C：workflow 不应监听 pull_request，避免 PR 预览误发生产
  it("publishes only after code is merged into main", () => {
    const workflow = readFileSync(
      join(root, ".github", "workflows", "publish.yml"),
      "utf8",
    );

    expect(
      workflow,
      "workflow should listen for push events because merging a PR into main creates a push on main",
    ).toContain("push:");
    expect(
      workflow,
      "workflow should restrict production deployment to the main branch",
    ).toContain("branches: [main]");
    expect(
      workflow,
      "workflow should call the reusable project deploy script instead of duplicating release commands inline",
    ).toContain("pnpm run deploy:production");
    expect(
      workflow,
      "workflow should not deploy production from pull_request events before code is merged",
    ).not.toContain("pull_request:");
  });
});
