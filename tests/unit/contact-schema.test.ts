import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/features/contact/schema";

describe("contactFormSchema", () => {
  it("accepts valid payload with optional company omitted", () => {
    const result = contactFormSchema.safeParse({
      name: "Marina Silva",
      email: "marina@exemplo.com.br",
      company: "",
      solutionType: "Software personalizado",
      description: "Precisamos estruturar uma plataforma web para gestão operacional interna.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email and short description", () => {
    const result = contactFormSchema.safeParse({
      name: "M",
      email: "invalido",
      solutionType: "Website",
      description: "Curto",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("name");
      expect(fields).toContain("email");
      expect(fields).toContain("description");
    }
  });
});
