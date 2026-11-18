import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import StickyContentWrapper from "@/components/ui/sticky-content-wrapper";
import { ContactSection } from "@/features/home/sections/ContactSection";

describe("Button", () => {
  it("renders as anchor when href is provided", () => {
    render(<Button href="#contato">Iniciar</Button>);
    const link = screen.getByRole("link", { name: "Iniciar" });
    expect(link).toHaveAttribute("href", "#contato");
  });

  it("sets aria-busy and disables button when loading", () => {
    render(<Button loading>Enviando</Button>);
    const btn = screen.getByRole("button", { name: "Enviando" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });
});

describe("Accordion", () => {
  it("toggles aria-expanded on click", () => {
    render(
      <Accordion
        items={[
          { id: "a", title: "Primeiro", content: <p>Conteúdo A</p> },
          { id: "b", title: "Segundo", content: <p>Conteúdo B</p> },
        ]}
      />,
    );

    const first = screen.getByRole("button", { name: /Primeiro/i });
    const second = screen.getByRole("button", { name: /Segundo/i });

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });
});

describe("ContactSection", () => {
  it("shows accessible validation errors and honest local-only status on valid submit", () => {
    render(<ContactSection />);

    fireEvent.click(screen.getByRole("button", { name: /Validar solicitação/i }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(2);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Carlos Eduardo" } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "carlos@organizacao.com.br" },
    });
    fireEvent.change(screen.getByLabelText(/Descrição do projeto/i), {
      target: {
        value: "Desenvolvimento de sistema personalizado para automação de rotinas internas.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /Validar solicitação/i }));
    expect(screen.getByRole("status")).toHaveTextContent(
      /validados localmente com sucesso.*pendente de configuração/i,
    );
  });
});

describe("StickyContentWrapper", () => {
  it("renders NWK chapters with headings, capabilities list, and links", () => {
    render(<StickyContentWrapper />);

    expect(
      screen.getByRole("heading", { name: /Sistemas personalizados e plataformas SaaS/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Sistemas de gestão sob medida/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Iniciar projeto de software/i }),
    ).toHaveAttribute("href", "#contato");
  });
});
