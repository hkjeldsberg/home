import fs from "fs";
import path from "path";
import { WEB_PROJECTS, MOB_PROJECTS } from "@/lib/projects";

const ALL = [...WEB_PROJECTS, ...MOB_PROJECTS];
const SCREENSHOT_DIR = path.join(__dirname, "..", "public", "screenshots");
const screenshots = fs.readdirSync(SCREENSHOT_DIR);

describe("project data", () => {
  it("has projects", () => {
    expect(WEB_PROJECTS.length).toBeGreaterThan(0);
  });

  it("uses unique ids", () => {
    const ids = ALL.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(ALL.map((p) => [p.id, p] as const))("%s has a name and description", (_, p) => {
    expect(p.name.trim()).not.toBe("");
    expect(p.desc.trim()).not.toBe("");
  });

  it.each(ALL.filter((p) => p.status === "live").map((p) => [p.id, p] as const))(
    "live project %s links to a valid https URL",
    (_, p) => {
      expect(p.href).toMatch(/^https:\/\//);
      expect(() => new URL(p.href)).not.toThrow();
    },
  );

  it("only ships WebP screenshots", () => {
    expect(screenshots.filter((f) => !f.startsWith(".") && !f.endsWith(".webp"))).toEqual([]);
  });

  it("has no orphaned screenshots", () => {
    const ids = new Set(ALL.map((p) => p.id));
    const orphans = screenshots
      .filter((f) => f.endsWith(".webp"))
      .map((f) => f.replace(/\.webp$/, ""))
      .filter((id) => !ids.has(id));
    expect(orphans).toEqual([]);
  });

  it("keeps screenshots small (< 250 KB each)", () => {
    const big = screenshots
      .filter((f) => f.endsWith(".webp"))
      .filter((f) => fs.statSync(path.join(SCREENSHOT_DIR, f)).size > 250 * 1024);
    expect(big).toEqual([]);
  });
});
