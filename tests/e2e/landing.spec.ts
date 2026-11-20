import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("NWK Institutional Website", () => {
  test("loads without console/page errors and passes axe-core WCAG AA checks", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Engenharia digital.");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
    expect(errors).toEqual([]);
  });

  test("has no horizontal overflow across responsive widths", async ({ page }) => {
    const widths = [320, 375, 390, 768, 1024, 1440, 1920];
    await page.goto("/");

    for (const width of widths) {
      await page.setViewportSize({ width, height: 844 });
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, `Overflow detected at ${width}px`).toBe(false);
    }
  });

  test("supports solutions matrix, methodology steps, and contact form", async ({
    page,
  }) => {
    await page.goto("/");

    // Solutions asymmetric matrix
    const mobileBtn = page.getByRole("button", { name: /Aplicativos mobile/i });
    await mobileBtn.click();
    await expect(mobileBtn).toHaveAttribute("aria-expanded", "true");

    // Methodology: all six steps are exposed as an ordered list
    const steps = page.getByRole("list", { name: "Etapas do processo" }).getByRole("heading", {
      level: 3,
    });
    await expect(steps).toHaveCount(6);
    await expect(steps.filter({ hasText: "Design e arquitetura" })).toHaveCount(1);

    // Contact form: solution type is a radio group
    await page.getByRole("radio", { name: "Aplicativo" }).check({ force: true });
    await expect(page.getByRole("radio", { name: "Aplicativo" })).toBeChecked();

    // Contact form validation
    await page.getByLabel(/Nome/i).fill("Ana Beatriz");
    await page.getByLabel(/E-mail/i).fill("ana@exemplo.com.br");
    await page
      .getByLabel(/Descrição do projeto/i)
      .fill("Projeto de plataforma web institucional e sistema interno sob medida.");
    await page.getByRole("button", { name: /Validar solicitação/i }).click();

    await expect(page.getByRole("status")).toContainText("validados localmente");
  });

  test("supports mobile menu and reduced motion preference", async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    if (isMobile) {
      const menuBtn = page.getByRole("button", { name: /Abrir menu de navegação/i });
      await menuBtn.click();
      await expect(page.getByRole("navigation", { name: "Navegação mobile" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("navigation", { name: "Navegação mobile" })).toBeHidden();
    } else {
      await page.keyboard.press("Tab");
      const skipLink = page.getByRole("link", { name: /Pular para o conteúdo principal/i });
      await expect(skipLink).toBeFocused();
    }
  });

  test("isolated proposals (/propostas/a and /propostas/b) pass axe-core WCAG AA and have zero overflow", async ({
    page,
  }) => {
    for (const route of ["/propostas", "/propostas/a", "/propostas/b"]) {
      await page.goto(route);
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(scan.violations, `Axe violations on ${route}`).toEqual([]);

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, `Overflow detected on ${route}`).toBe(false);
    }
  });

  test("engineering shelf switches dossiers, opens accessible spec dialog, and closes with Escape", async ({
    page,
  }) => {
    await page.goto("/");
    const shelf = page.locator("#engenharia");
    await shelf.scrollIntoViewIfNeeded();

    // Filter by category and verify active dossier updates
    await shelf.getByRole("button", { name: "IA & Dados" }).click();
    await expect(shelf.getByRole("heading", { level: 3, name: "IA & Agentes Locais" })).toBeVisible();

    // Reset filter to Todos and open dossier dialog
    await shelf.getByRole("button", { name: "Todos" }).click();
    const inspectBtn = shelf.getByRole("button", { name: "Inspecionar caderno", exact: true });
    await inspectBtn.scrollIntoViewIfNeeded();
    await inspectBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Padrão arquitetural NWK")).toBeVisible();

    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("reduced motion disables pinning/kinetic layout and stays accessible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(500);
    expect(await page.locator(".pin-spacer").count()).toBe(0);
    expect(await page.locator("#sobre [data-kinetic=on], #sobre[data-kinetic=on]").count()).toBe(0);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
  });
});
