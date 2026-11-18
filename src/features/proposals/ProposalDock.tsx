"use client";

import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { cn } from "@/lib/cn";

interface ProposalDockProps {
  active: "hub" | "a" | "b";
}

export function ProposalDock({ active }: ProposalDockProps) {
  return (
    <nav
      aria-label="Seletor de propostas visuais NWK"
      className="fixed bottom-4 left-1/2 z-50 flex max-w-[94vw] -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-white/15 bg-[#131315]/92 p-1.5 text-xs text-[#FAFAF8] shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <Link
        href="/propostas"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-transform duration-150 active:scale-[0.97]",
          active === "hub"
            ? "bg-[#F2F0EB] text-[#131315]"
            : "text-[#D9DBDE] hover:bg-white/10 hover:text-white",
        )}
      >
        <Layers className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Visão Geral</span>
      </Link>

      <Link
        href="/propostas/a"
        className={cn(
          "rounded-full px-3 py-1.5 font-medium transition-transform duration-150 active:scale-[0.97]",
          active === "a"
            ? "bg-[#F2F0EB] text-[#131315]"
            : "text-[#D9DBDE] hover:bg-white/10 hover:text-white",
        )}
      >
        <span>Proposta A</span>
        <span className="hidden md:inline"> · Tipografia &amp; Portal N!</span>
      </Link>

      <Link
        href="/propostas/b"
        className={cn(
          "rounded-full px-3 py-1.5 font-medium transition-transform duration-150 active:scale-[0.97]",
          active === "b"
            ? "bg-[#F2F0EB] text-[#131315]"
            : "text-[#D9DBDE] hover:bg-white/10 hover:text-white",
        )}
      >
        <span>Proposta B</span>
        <span className="hidden md:inline"> · Produto Vivo &amp; Ecossistema</span>
      </Link>

      <Link
        href="/"
        title="Voltar para a página institucional atual"
        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1.5 text-[#A0A4AC] transition-colors hover:border-white/25 hover:text-white"
      >
        <ArrowLeft className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Site atual</span>
      </Link>
    </nav>
  );
}
