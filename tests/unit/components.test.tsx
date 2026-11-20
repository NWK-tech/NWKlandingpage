import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { RollActionLink } from "@/components/ui/RollActionLink";
import StickyContentWrapper from "@/components/ui/sticky-content-wrapper";
import { ContactSection } from "@/features/home/sections/ContactSection";
import { EngineeringShelfSection } from "@/features/home/sections/EngineeringShelfSection";

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

describe("RollActionLink", () => {
  it("renders as anchor when href is provided and triggers button onClick otherwise", () => {
    const onClick = vi.fn();
    render(
      <>
        <RollActionLink label="Explorar frente" href="#contato" tone="dark" />
        <RollActionLink label="Abrir painel" onClick={onClick} tone="light" />
      </>,
    );

    expect(screen.getByRole("link", { name: "Explorar frente" })).toHaveAttribute("href", "#contato");
    fireEvent.click(screen.getByRole("button", { name: "Abrir painel" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("EngineeringShelfSection", () => {
  it("renders blueprints, filters by category, switches active dossier, and toggles dialog", () => {
    render(<EngineeringShelfSection />);

    expect(screen.getByRole("list", { name: /Estante de cadernos de engenharia/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Sistemas & SaaS" })).toBeInTheDocument();

    // Select a different dossier by clicking its spine
    fireEvent.click(screen.getAllByRole("button", { name: /03\s*Mobile/i })[0]!);
    expect(screen.getByRole("heading", { level: 3, name: "Apps Mobile Offline-First" })).toBeInTheDocument();

    // Filter by IA & Dados
    fireEvent.click(screen.getByRole("button", { name: "IA & Dados" }));
    expect(screen.getByRole("heading", { level: 3, name: "IA & Agentes Locais" })).toBeInTheDocument();

    // Open inspector dialog and close with Escape
    fireEvent.click(screen.getByRole("button", { name: "Inspecionar caderno" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Decisões de Engenharia")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
