import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";
import { metadata } from "./layout";

vi.mock("next/font/google", () => ({
  IBM_Plex_Sans: () => ({ variable: "font-plex-sans" }),
  IBM_Plex_Mono: () => ({ variable: "font-plex-mono" }),
}));

describe("MultiSoul landing page", () => {
  it("renders MultiSoul positioning and removes scaffold copy", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("MultiSoul");
    expect(html).toContain("Personal AI agent command center");
    expect(html).toContain("https://github.com/yakami129/multisoul");
    expect(html).not.toContain("Create Next App");
    expect(html).not.toContain("Deploy Now");
  });

  it("sets production metadata for search and social previews", () => {
    expect(metadata.title).toBe("MultiSoul - Personal AI Agent Console");
    expect(metadata.description).toBe(
      "Remote-control local AI agents from your phone while keeping every byte on your machine.",
    );
  });
});
