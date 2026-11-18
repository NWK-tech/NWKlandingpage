import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ProposalDock } from "@/features/proposals/ProposalDock";

export const metadata: Metadata = {
  title: "Laboratório Criativo — Propostas Visuais NWK",
  description:
    "Ambiente isolado para exploração e homologação das duas direções criativas navegáveis da NWK.",
};

export default function ProposalsHubPage() {
  return (
    <div className="min-h-screen bg-[#131315] pt-16 pb-32 text-[#FAFAF8]">
      <Container>
        <div className="flex items-center justify-between border-b border-white/10 pb-8">
          <Logo variant="horizontal" tone="light" />
          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#D9DBDE] transition-colors hover:border-white/35 hover:text-white"
          >
            Ver página institucional atual (/)
          </Link>
        </div>

        <div className="mt-14 max-w-3xl">
          <h1 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] font-medium tracking-[-0.03em]">
            Duas direções criativas navegáveis para a NWK.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#D9DBDE]">
            Protótipos funcionais isolados da página principal, construídos para comparar duas
            abordagens distintas de apresentação tecnológica, movimento e narrativa.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card Proposta A */}
          <Link
            href="/propostas/a"
            className="group flex flex-col justify-between rounded-3xl border border-white/15 bg-[#F2F0EB] p-8 text-[#131315] transition-transform duration-200 hover:-translate-y-1 sm:p-10"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#131315] px-3.5 py-1 text-xs font-medium text-[#FAFAF8]">
                  Proposta A
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#131315]/20 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              <h2 className="font-display mt-6 text-3xl font-medium tracking-tight">
                Tipografia Monumental, Portal Vetorial N! &amp; Trilho Horizontal
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4A4E55]">
                Inspirada em estúdios de direção criativa e experimentos Codrops: abre em pôster
                Neutral Cream (#F2F0EB), expande um portal diagonal no scroll até o palco escuro e
                conduz o visitante por uma galeria horizontal pinada com visuais específicos por
                serviço.
              </p>
            </div>

            <div className="mt-8 border-t border-[#131315]/15 pt-5 text-xs font-medium">
              Abrir Proposta A (/propostas/a) →
            </div>
          </Link>

          {/* Card Proposta B */}
          <Link
            href="/propostas/b"
            className="group flex flex-col justify-between rounded-3xl border border-white/15 bg-[#1B1C22] p-8 text-[#FAFAF8] transition-transform duration-200 hover:-translate-y-1 sm:p-10"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#F2F0EB] px-3.5 py-1 text-xs font-medium text-[#131315]">
                  Proposta B
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              <h2 className="font-display mt-6 text-3xl font-medium tracking-tight">
                Palco de Produtos Vivos, Zoom no Scroll &amp; Bancada Operável
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#D9DBDE]">
                Inspirada nas apresentações de produtos da Apple e na filosofia de Design
                Engineering de Emil Kowalski: o Hero apresenta um ecossistema de 3 produtos que se
                expande durante o scroll pinado, seguido por uma bancada interativa onde o visitante
                opera cada serviço ao vivo.
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5 text-xs font-medium text-[#F2F0EB]">
              Abrir Proposta B (/propostas/b) →
            </div>
          </Link>
        </div>
      </Container>

      <ProposalDock active="hub" />
    </div>
  );
}
