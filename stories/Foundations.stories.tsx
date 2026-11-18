import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { brandColors } from "@/tokens/foundations";

function FoundationsShowcase() {
  const palette = [
    { name: "Carbon Black", token: "--nwk-carbon-black", hex: brandColors.carbonBlack },
    { name: "Graphite", token: "--nwk-graphite", hex: brandColors.graphite },
    { name: "Pure White", token: "--nwk-pure-white", hex: brandColors.pureWhite },
    { name: "Soft White", token: "--nwk-soft-white", hex: brandColors.softWhite },
    { name: "Neutral Cream", token: "--nwk-neutral-cream", hex: brandColors.neutralCream },
    { name: "Silver Gray", token: "--nwk-silver-gray", hex: brandColors.silverGray },
    { name: "Steel Gray", token: "--nwk-steel-gray", hex: brandColors.steelGray },
  ];

  return (
    <div className="space-y-12 p-8 font-sans">
      <div>
        <h2 className="font-display text-2xl font-medium">Paleta Cromática NWK</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {palette.map((color) => (
            <div
              key={color.name}
              className="overflow-hidden rounded-xl border border-[var(--nwk-border-subtle)] bg-white"
            >
              <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
              <div className="p-3">
                <p className="text-xs font-medium text-[#131315]">{color.name}</p>
                <p className="mt-0.5 text-[11px] text-[#6B7078]">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl font-medium">Escala Tipográfica</h2>
        <div className="mt-6 space-y-4">
          <p className="text-display font-medium">Display — Engenharia digital.</p>
          <p className="text-h1 font-medium">H1 — Impacto real.</p>
          <p className="text-h2 font-medium">H2 — Capacidade técnica aplicada</p>
          <p className="text-h3 font-medium">H3 — Da primeira ideia à solução final.</p>
          <p className="text-base text-[#4A4E55]">
            Body Default — Unimos arquitetura de software, design de produto e pensamento
            estratégico para estruturar sistemas consistentes.
          </p>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof FoundationsShowcase> = {
  title: "Foundations/DesignTokens",
  component: FoundationsShowcase,
};

export default meta;
type Story = StoryObj<typeof FoundationsShowcase>;

export const Overview: Story = {};
