"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Layers } from "lucide-react";
import { cn } from "@/lib/cn";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { DotMatrixHandsHero } from "@/features/proposals/DotMatrixHandsHero";
import { ProposalDock } from "@/features/proposals/ProposalDock";

const HORIZONTAL_CHAPTERS = [
  {
    id: "sistemas-web",
    title: "Sistemas personalizados e plataformas SaaS",
    problem:
      "Operações críticas travadas em planilhas desconectadas e softwares de prateleira engessados.",
    solution:
      "Arquitetura sob medida com domínio modelado para a regra real do negócio, APIs tipadas e painéis de comando rápidos.",
    image: "/images/propostas/service-software-display.jpg",
    imageAlt:
      "Monitor widescreen de estúdio exibindo camadas translúcidas de arquitetura de software e painéis de sistema",
    capabilities: [
      "Sistemas de gestão sob medida",
      "Plataformas SaaS multi-tenant",
      "APIs REST/GraphQL e microsserviços",
    ],
  },
  {
    id: "ia-automacao",
    title: "Inteligência artificial e automação de processos",
    problem:
      "Triagem manual lenta, retrabalho entre ferramentas isoladas e falta de controle sobre dados sensíveis.",
    solution:
      "Agentes operacionais integrados via API ou executados localmente com privacidade, orquestrando filas e decisões.",
    image: "/images/propostas/service-ai-interface.jpg",
    imageAlt:
      "Notebook e tablet em ambiente escuro com fluxos de trabalho de inteligência artificial e nós de automação flutuando acima das telas",
    capabilities: [
      "Agentes de triagem e atendimento",
      "Inferência local orientada à privacidade",
      "Orquestração de webhooks e ERPs",
    ],
  },
  {
    id: "mobile-apps",
    title: "Aplicativos mobile e experiências em campo",
    problem:
      "Equipes externas e usuários móveis precisando de velocidade, gestos naturais e funcionamento sem internet.",
    solution:
      "Aplicativos multiplataforma com sincronização offline-first, resposta imediata ao toque e integração nativa.",
    image: "/images/propostas/service-mobile-handheld.jpg",
    imageAlt:
      "Smartphone em carbono fosco com três camadas translúcidas de interface mobile e anéis de gesto flutuando sobre a tela",
    capabilities: [
      "Aplicativos iOS e Android",
      "Arquitetura offline-first",
      "Interfaces orientadas a gestos",
    ],
  },
] as const;

const FEATURED_PROJECTS_A = [
  {
    id: "fju-artes-marciais",
    name: "FJU Artes Marciais",
    origin: "Em desenvolvimento",
    category: "Plataforma híbrida de gestão esportiva",
    headline: "Coordenação de modalidades, polos, atletas e eventos em ambiente unificado.",
    image: "/images/propostas/service-mobile-handheld.jpg",
    highlights: [
      "Painel administrativo web combinado a operação mobile no tatame",
      "Cadastro estruturado de atletas, graduações e frequência por turma",
      "Agenda integrada de campeonatos, exames e atividades",
    ],
  },
  {
    id: "nwk-boss-ai",
    name: "NWKBossAI",
    origin: "Proprietário NWK",
    category: "Inteligência artificial e produtividade operacional",
    headline: "Agentes inteligentes para triagem, organização de rotinas e automação.",
    image: "/images/propostas/service-ai-interface.jpg",
    highlights: [
      "Orquestração de tarefas operacionais com contexto persistente",
      "Filas de automação conectadas a ferramentas internas",
      "Apoio à decisão com validação determinística de dados",
    ],
  },
  {
    id: "nwk-studio",
    name: "NWKstudio",
    origin: "Proprietário NWK",
    category: "Plataforma e engenharia de experiências web",
    headline: "Ambiente proprietário para estruturação comercial e entrega de websites premium.",
    image: "/images/propostas/service-software-display.jpg",
    highlights: [
      "Briefing técnico estruturado e arquitetura de informação",
      "Design System modular com validação automatizada WCAG",
      "Pipeline de entrega de landing pages e portais de alta performance",
    ],
  },
] as const;

export function ProposalAExperience() {
  const mainScopeRef = useRef<HTMLElement>(null);
  const horizontalWrapperRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
  const activeProject = FEATURED_PROJECTS_A[selectedProjectIdx] ?? FEATURED_PROJECTS_A[0]!;

  useGSAP(
    () => {
      ensureGsapRegistered();
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (horizontalWrapperRef.current && horizontalTrackRef.current) {
          const track = horizontalTrackRef.current;

          const horizontalTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: horizontalWrapperRef.current,
              pin: true,
              scrub: 0.7,
              start: "top top",
              end: () => `+=${Math.max(1200, track.scrollWidth - window.innerWidth)}`,
              invalidateOnRefresh: true,
            },
          });

          const images = track.querySelectorAll<HTMLElement>(".horizontal-parallax-img");
          images.forEach((img) => {
            gsap.fromTo(
              img,
              { scale: 1.12, xPercent: -5 },
              {
                scale: 1,
                xPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: img,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
        }
      });

      return () => mm.revert();
    },
    { scope: mainScopeRef },
  );

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#131315] selection:bg-[#131315] selection:text-[#FAFAF8]">
      <main ref={mainScopeRef}>
        {/* 1. DOT-MATRIX HANDS HERO (Full-Viewport Live Canvas Halftone + Glitch Dissolve) */}
        <DotMatrixHandsHero />

        {/* 2. SCROLL EXPERIENCE & SERVICES: Sibling GSAP Pinned Horizontal Exhibition Track */}
        <section
          id="trilho-servicos"
          ref={horizontalWrapperRef}
          aria-labelledby="horizontal-services-heading"
          className="relative overflow-hidden border-t border-white/10 bg-[#131315] text-[#FAFAF8]"
        >
          <div
            ref={horizontalTrackRef}
            className="flex flex-col lg:h-screen lg:w-[300vw] lg:flex-row"
          >
            {HORIZONTAL_CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.id}
                className="flex min-h-screen w-full items-center border-b border-white/10 py-20 lg:h-screen lg:w-screen lg:shrink-0 lg:border-r lg:border-b-0 lg:py-0"
              >
                <Container>
                  {index === 0 && (
                    <h2 id="horizontal-services-heading" className="sr-only">
                      Disciplinas e serviços tecnológicos da NWK
                    </h2>
                  )}
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-5">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1 text-xs font-medium text-[#F2F0EB]">
                        <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          Frente {index + 1} de {HORIZONTAL_CHAPTERS.length} · Role para avançar
                        </span>
                      </span>

                      <h3 className="font-display mt-5 text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.025em] text-[#FAFAF8]">
                        {chapter.title}
                      </h3>

                      <div className="mt-6 space-y-4 border-l border-[#F2F0EB]/30 pl-5">
                        <div>
                          <p className="text-xs font-medium text-[#F2F0EB]">
                            Contexto que resolvemos
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#D9DBDE]">
                            {chapter.problem}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#F2F0EB]">Nossa entrega</p>
                          <p className="mt-1 text-sm leading-relaxed text-[#D9DBDE]">
                            {chapter.solution}
                          </p>
                        </div>
                      </div>

                      <ul className="mt-8 flex flex-wrap gap-2">
                        {chapter.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="rounded-full bg-[#F2F0EB] px-4 py-1.5 text-xs font-medium text-[#131315]"
                          >
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-7">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/15 bg-[#1B1C20] shadow-[0_32px_90px_rgba(0,0,0,0.75)]">
                        <div className="horizontal-parallax-img relative h-full w-full">
                          <Image
                            src={chapter.image}
                            alt={chapter.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PROJECT SHOWCASE: Full-Scale Stage */}
        <section
          id="palco-projetos-a"
          aria-labelledby="projects-a-heading"
          className="relative z-20 bg-[#F2F0EB] py-24 pb-36 text-[#131315] sm:py-32"
        >
          <Container>
            <div className="flex flex-col justify-between gap-6 border-b border-[#131315]/15 pb-10 lg:flex-row lg:items-end">
              <h2
                id="projects-a-heading"
                className="font-display max-w-2xl text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em]"
              >
                Produtos digitais em concepção e evolução.
              </h2>
              <p className="max-w-md text-xs leading-relaxed text-[#4A4E55] sm:text-sm">
                Representações conceituais transparentes das arquiteturas em desenvolvimento e das
                iniciativas proprietárias da NWK.
              </p>
            </div>

            {/* Large Typographic Selector */}
            <div
              role="tablist"
              aria-label="Projetos em destaque na Proposta A"
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {FEATURED_PROJECTS_A.map((proj, idx) => {
                const isSelected = idx === selectedProjectIdx;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedProjectIdx(idx)}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-6 text-left transition-all duration-200 active:scale-[0.98]",
                      isSelected
                        ? "border-[#131315] bg-[#131315] text-[#FAFAF8] shadow-[0_20px_50px_rgba(19,19,21,0.22)]"
                        : "border-[#131315]/15 bg-[#FAFAF8] text-[#131315] hover:border-[#131315]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className={isSelected ? "text-[#F2F0EB]" : "text-[#4A4E55]"}>
                        {proj.origin}
                      </span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="font-display mt-3 text-2xl font-medium">{proj.name}</p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        isSelected ? "text-[#D9DBDE]" : "text-[#4A4E55]",
                      )}
                    >
                      {proj.category}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Responsive Stage */}
            <div className="mt-8 overflow-hidden rounded-3xl bg-[#131315] text-[#FAFAF8] shadow-[0_32px_90px_rgba(19,19,21,0.3)]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="grid grid-cols-1 items-center gap-8 p-6 sm:p-12 lg:grid-cols-12"
                >
                  <div className="lg:col-span-6">
                    <span className="rounded-full border border-white/20 px-3.5 py-1 text-xs text-[#F2F0EB]">
                      {activeProject.origin} · {activeProject.category}
                    </span>
                    <h3 className="font-display mt-5 text-3xl font-medium text-[#FAFAF8] sm:text-4xl">
                      {activeProject.name}
                    </h3>
                    <p className="mt-3 text-base text-[#F2F0EB]">{activeProject.headline}</p>

                    <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-[#D9DBDE]">
                      {activeProject.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2F0EB]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15">
                      <Image
                        src={activeProject.image}
                        alt={`Apresentação visual do projeto ${activeProject.name}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </section>
      </main>

      <ProposalDock active="a" />
    </div>
  );
}
