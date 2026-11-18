"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  Play,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WifiOff,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ProposalDock } from "@/features/proposals/ProposalDock";

const WORKBENCH_TABS = [
  { id: "software", label: "Engenharia de Software" },
  { id: "ai", label: "Inteligência Artificial" },
  { id: "mobile", label: "Aplicativos Mobile" },
  { id: "web", label: "Plataformas Web" },
  { id: "automation", label: "Automações & APIs" },
] as const;

type WorkbenchTabId = (typeof WORKBENCH_TABS)[number]["id"];

const STORY_PROJECTS = [
  {
    id: "doce-certo",
    name: "Doce Certo",
    status: "Em desenvolvimento",
    category: "Sistema de gestão e engenharia de precificação",
    headline: "Fichas técnicas, custo real por grama e margem calculada ao vivo.",
    narrative:
      "Transforma planilhas soltas de confeitaria em um motor de cálculo determinístico: cada alteração no preço de um insumo recalcula automaticamente todas as receitas, margens e listas de produção.",
    surfaceColor: "#1D1712",
    accentClass: "text-amber-200 border-amber-300/30 bg-amber-300/10",
    modules: [
      {
        title: "Ficha técnica dinâmica",
        metric: "14 insumos vinculados",
        detail: "Rendimento, fator de correção e perda térmica calculados por lote.",
      },
      {
        title: "Simulador de margem",
        metric: "CMV 31.4% · Meta atingida",
        detail: "Comparativo instantâneo entre venda direta, encomenda e delivery.",
      },
      {
        title: "Ordem de produção",
        metric: "Lote diário sincronizado",
        detail: "Explosão automática de insumos para a cozinha conforme a agenda.",
      },
    ],
  },
  {
    id: "zuri",
    name: "ZURI",
    status: "Conceito experimental",
    category: "Inteligência artificial local em dispositivos móveis",
    headline: "Inferência executada no próprio aparelho, sem depender de nuvem.",
    narrative:
      "Exploração experimental da NWK para assistência inteligente com privacidade absoluta: modelos compactos rodam localmente no smartphone, garantindo resposta imediata mesmo sem sinal.",
    surfaceColor: "#131626",
    accentClass: "text-indigo-200 border-indigo-300/30 bg-indigo-400/10",
    modules: [
      {
        title: "Motor neural embarcado",
        metric: "0 Bytes enviados à nuvem",
        detail: "Processamento quantizado direto na NPU/GPU do dispositivo móvel.",
      },
      {
        title: "Memória contextual privada",
        metric: "Índice vetorial criptografado",
        detail: "Busca semântica em notas, documentos e rotinas pessoais offline.",
      },
      {
        title: "Baixa latência em campo",
        metric: "Primeiro token < 90ms",
        detail: "Operação contínua em áreas remotas, subsolo ou modo avião.",
      },
    ],
  },
  {
    id: "fju-artes-marciais",
    name: "FJU Artes Marciais",
    status: "Em desenvolvimento",
    category: "Plataforma multimodal de gestão esportiva",
    headline: "Coordenação unificada de modalidades, tatames, atletas e graduações.",
    narrative:
      "Conecta a coordenação administrativa no desktop ao acompanhamento de presença e evolução técnica pelo smartphone no tatame.",
    surfaceColor: "#111E19",
    accentClass: "text-emerald-200 border-emerald-300/30 bg-emerald-400/10",
    modules: [
      {
        title: "Gestão de modalidades e turmas",
        metric: "6 modalidades integradas",
        detail: "Alocação de instrutores, horários e capacidade operacional por polo.",
      },
      {
        title: "Prontuário de evolução do atleta",
        metric: "Histórico de graduação",
        detail: "Registro de frequência, exames de faixa e participação em eventos.",
      },
      {
        title: "Check-in mobile no tatame",
        metric: "Sincronização híbrida",
        detail: "Chamada rápida por celular com atualização imediata no painel central.",
      },
    ],
  },
] as const;

export function ProposalBExperience() {
  const heroPinRef = useRef<HTMLDivElement>(null);
  const centerStageRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const explodedLayerRef = useRef<HTMLDivElement>(null);
  const [heroStageStep, setHeroStageStep] = useState(0);

  // Interactive Hero state
  const [activeHeroAgent, setActiveHeroAgent] = useState<"triagem" | "automacao" | "auditoria">(
    "triagem",
  );

  // Workbench state
  const [activeTab, setActiveTab] = useState<WorkbenchTabId>("software");

  // Sticky Project Storytelling state
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);

  useGSAP(
    () => {
      ensureGsapRegistered();
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!heroPinRef.current || !centerStageRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroPinRef.current,
            start: "top top",
            end: "+=1100",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.35) setHeroStageStep(0);
              else if (p < 0.72) setHeroStageStep(1);
              else setHeroStageStep(2);
            },
          },
        });

        tl.fromTo(
          centerStageRef.current,
          { scale: 1.05, y: 0 },
          { scale: 0.94, y: -14, ease: "none" },
          0,
        );

        if (leftWingRef.current) {
          tl.fromTo(
            leftWingRef.current,
            { x: 64, y: 24, scale: 0.92 },
            { x: 0, y: 0, scale: 1, ease: "none" },
            0,
          );
        }

        if (rightWingRef.current) {
          tl.fromTo(
            rightWingRef.current,
            { x: -64, y: 24, scale: 0.92 },
            { x: 0, y: 0, scale: 1, ease: "none" },
            0,
          );
        }

        if (explodedLayerRef.current) {
          tl.fromTo(
            explodedLayerRef.current,
            { y: 20, scale: 0.96 },
            { y: 0, scale: 1, ease: "none" },
            0.15,
          );
        }
      });

      return () => mm.revert();
    },
    { scope: heroPinRef },
  );

  const activeStoryProject = STORY_PROJECTS[activeProjectIdx] ?? STORY_PROJECTS[0]!;

  return (
    <div className="min-h-screen bg-[#131315] text-[#FAFAF8] selection:bg-[#F2F0EB] selection:text-[#131315]">
      {/* Floating Translucent Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#131315]/75 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between gap-6">
            <a href="#ecossistema" aria-label="NWK — Início da Proposta B" className="py-1">
              <Logo variant="horizontal" tone="light" />
            </a>

            <nav aria-label="Navegação da Proposta B" className="hidden items-center gap-8 md:flex">
              <a
                href="#ecossistema"
                className="text-sm font-medium text-[#D9DBDE] transition-colors hover:text-white"
              >
                Ecossistema
              </a>
              <a
                href="#workbench"
                className="text-sm font-medium text-[#D9DBDE] transition-colors hover:text-white"
              >
                Engenharia ao Vivo
              </a>
              <a
                href="#vitrine-storytelling"
                className="text-sm font-medium text-[#D9DBDE] transition-colors hover:text-white"
              >
                Produtos em Ação
              </a>
            </nav>

            <a
              href="#contato-proposta-b"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F2F0EB] px-4 text-xs font-medium text-[#131315] transition-transform duration-150 hover:bg-white active:scale-[0.97]"
            >
              <span>Iniciar um projeto</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </header>

      <main>
        {/* 1. HERO: Scroll-Pinned Multi-Device Software Ecosystem */}
        <section
          id="ecossistema"
          ref={heroPinRef}
          aria-labelledby="prop-b-hero-heading"
          className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#131315] pt-24 pb-16"
        >
          {/* Warm cream studio zenith light (surface light, not neon or grid) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[#F2F0EB]/[0.07] blur-[110px]"
          />

          <Container className="relative z-10">
            {/* Direct, un-kickered monumental heading */}
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="prop-b-hero-heading"
                className="font-display text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.03em] text-[#FAFAF8]"
              >
                Engenharia digital que opera na prática.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D9DBDE] sm:text-lg">
                Desenvolvemos sistemas sob medida, aplicativos mobile, agentes de inteligência
                artificial e plataformas web projetados do núcleo de dados à interface.
              </p>
            </div>

            {/* 3-Wing Exploding Product Ecosystem Stage */}
            <div className="relative mt-8 grid grid-cols-1 items-center gap-6 lg:mt-10 lg:grid-cols-12">
              {/* Left Wing: Doce Certo Pricing Engine */}
              <div
                ref={leftWingRef}
                className="order-2 rounded-2xl border border-white/12 bg-[#1A1B20]/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-md lg:order-1 lg:col-span-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-display text-xs font-medium text-[#F2F0EB]">
                    Doce Certo · Precificação
                  </span>
                  <span className="rounded-full bg-amber-300/15 px-2 py-0.5 text-[10px] text-amber-200">
                    Em dev
                  </span>
                </div>
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
                    <span className="text-[#D9DBDE]">Custo de insumos</span>
                    <span className="font-display font-medium text-[#FAFAF8]">Recálculo vivo</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
                    <span className="text-[#D9DBDE]">Ficha técnica</span>
                    <span className="font-display font-medium text-amber-200">Sincronizada</span>
                  </div>
                  <p className="pt-1 text-[11px] leading-snug text-[#A0A4AC]">
                    Representação conceitual do motor de custos e produção.
                  </p>
                </div>
              </div>

              {/* Center Stage: Live Operable NWKBossAI Command Interface */}
              <div
                ref={centerStageRef}
                className="order-1 overflow-hidden rounded-2xl border border-white/18 bg-[#17181C] shadow-[0_32px_90px_rgba(0,0,0,0.75)] lg:order-2 lg:col-span-6"
              >
                {/* Window bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#1E2026] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F2F0EB]/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F2F0EB]/20" />
                    <span className="font-display ml-1 text-xs font-medium text-[#FAFAF8]">
                      NWKBossAI — Orquestração Operacional (Conceito Proprietário)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-[#131315] p-1">
                    {(
                      [
                        { id: "triagem", label: "Triagem IA" },
                        { id: "automacao", label: "Automação" },
                        { id: "auditoria", label: "Telemetria" },
                      ] as const
                    ).map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setActiveHeroAgent(mode.id)}
                        className={cn(
                          "cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition-transform duration-150 active:scale-[0.97]",
                          activeHeroAgent === mode.id
                            ? "bg-[#F2F0EB] text-[#131315]"
                            : "text-[#D9DBDE] hover:text-white",
                        )}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Interactive Screen Body */}
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-12">
                  <div className="space-y-3 sm:col-span-7">
                    <p className="text-xs font-medium text-[#F2F0EB]">
                      {activeHeroAgent === "triagem" &&
                        "Agente analisando prioridades operacionais e alocando filas..."}
                      {activeHeroAgent === "automacao" &&
                        "Pipeline disparando integrações entre APIs, banco de dados e notificações..."}
                      {activeHeroAgent === "auditoria" &&
                        "Monitoramento determinístico de contratos de dados, latência e segurança..."}
                    </p>

                    <div className="space-y-2 rounded-xl border border-white/10 bg-[#131315] p-3.5 text-xs">
                      <div className="flex items-center justify-between text-[#D9DBDE]">
                        <span>Entrada estruturada (Zod Schema)</span>
                        <span className="text-emerald-300">Validado</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-[#F2F0EB] transition-all duration-300"
                          style={{
                            width:
                              activeHeroAgent === "triagem"
                                ? "78%"
                                : activeHeroAgent === "automacao"
                                  ? "92%"
                                  : "100%",
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-[#A0A4AC]">
                        <span>Camada: {activeHeroAgent.toUpperCase()}</span>
                        <span>Execução assistida</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#1D1E24] p-4 sm:col-span-5">
                    <div>
                      <span className="text-[11px] text-[#A0A4AC]">Arquitetura ativa</span>
                      <p className="font-display mt-1 text-sm font-medium text-[#FAFAF8]">
                        Núcleo TypeScript + Filas + Agentes
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-[#F2F0EB]">
                        Web &amp; SaaS
                      </span>
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-[#F2F0EB]">
                        IA Integrada
                      </span>
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-[#F2F0EB]">
                        Mobile Sync
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Wing: ZURI Local Mobile AI */}
              <div
                ref={rightWingRef}
                className="order-3 rounded-2xl border border-white/12 bg-[#1A1B20]/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-md lg:col-span-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-display text-xs font-medium text-[#F2F0EB]">
                    ZURI · IA Local Mobile
                  </span>
                  <span className="rounded-full bg-indigo-400/15 px-2 py-0.5 text-[10px] text-indigo-200">
                    Experimental
                  </span>
                </div>
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
                    <span className="text-[#D9DBDE]">Inferência offline</span>
                    <span className="font-display font-medium text-indigo-200">No dispositivo</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
                    <span className="text-[#D9DBDE]">Privacidade</span>
                    <span className="font-display font-medium text-[#FAFAF8]">100% Local</span>
                  </div>
                  <p className="pt-1 text-[11px] leading-snug text-[#A0A4AC]">
                    Conceito experimental de IA embarcada em smartphones.
                  </p>
                </div>
              </div>
            </div>

            {/* Scroll-linked exploded telemetry strip */}
            <div
              ref={explodedLayerRef}
              className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-4 rounded-full border border-white/12 bg-[#1A1B20]/85 px-6 py-3 text-xs backdrop-blur-md"
            >
              <span className="font-medium text-[#F2F0EB]">
                Estágio do Scroll:{" "}
                {heroStageStep === 0
                  ? "Foco no Produto Central"
                  : heroStageStep === 1
                    ? "Abertura do Ecossistema Multiplataforma"
                    : "Arquitetura Completa Integrada"}
              </span>
              <div className="flex items-center gap-4 text-[#D9DBDE]">
                <span>Role para operar cada disciplina</span>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. SERVICES: Interactive Live Engineering Workbench (Soft White + Cream) */}
        <section
          id="workbench"
          aria-labelledby="workbench-heading"
          className="bg-[#FAFAF8] py-24 text-[#131315] sm:py-32"
        >
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <h2
                id="workbench-heading"
                className="font-display max-w-2xl text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.025em] text-[#131315]"
              >
                Teste na prática como construímos cada frente tecnológica.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[#4A4E55] sm:text-base">
                Interaja com os módulos abaixo para experimentar os mecanismos que projetamos em
                sistemas, inteligência artificial, aplicativos e automações.
              </p>
            </div>

            {/* Emil Kowalski Precision Tab Bar */}
            <div
              role="tablist"
              aria-label="Bancada interativa de serviços NWK"
              className="mt-10 flex flex-wrap gap-2 rounded-2xl border border-[#D9DBDE] bg-[#F2F0EB] p-2"
            >
              {WORKBENCH_TABS.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 active:scale-[0.97]",
                      isSelected
                        ? "bg-[#131315] text-[#FAFAF8] shadow-sm"
                        : "text-[#4A4E55] hover:bg-white/70 hover:text-[#131315]",
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Live Sandbox Stage */}
            <div className="mt-6 overflow-hidden rounded-3xl border border-[#D9DBDE] bg-white shadow-[0_24px_60px_-18px_rgba(19,19,21,0.12)]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  {activeTab === "software" && <SoftwareLiveSandbox />}
                  {activeTab === "ai" && <AiLiveSandbox />}
                  {activeTab === "mobile" && <MobileLiveSandbox />}
                  {activeTab === "web" && <WebLiveSandbox />}
                  {activeTab === "automation" && <AutomationLiveSandbox />}
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </section>

        {/* 3. CREATIVE TRANSITION & PROJECT STORYTELLING: Sticky Color-Shifting Stage */}
        <section
          id="vitrine-storytelling"
          ref={storyContainerRef}
          aria-labelledby="story-heading"
          style={{ backgroundColor: activeStoryProject.surfaceColor }}
          className=" py-24 text-[#FAFAF8] transition-colors duration-700 sm:py-32"
        >
          <Container>
            <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
              <h2
                id="story-heading"
                className="font-display max-w-2xl text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.025em]"
              >
                Produtos e iniciativas com personalidade própria.
              </h2>
              <p className="max-w-md text-xs leading-relaxed text-[#D9DBDE] sm:text-sm">
                As interfaces abaixo são representações conceituais interativas da arquitetura de
                cada projeto da NWK, identificadas com transparência.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left: Project Selector & Narrative Chapters */}
              <div className="space-y-4 lg:col-span-5">
                {STORY_PROJECTS.map((proj, idx) => {
                  const isCurrent = idx === activeProjectIdx;
                  return (
                    <div
                      key={proj.id}
                      className={cn(
                        "rounded-2xl border p-6 transition-all duration-300",
                        isCurrent
                          ? "border-white/25 bg-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProjectIdx(idx);
                          setActiveModuleIdx(0);
                        }}
                        className="w-full cursor-pointer text-left"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-display text-xl font-medium text-[#FAFAF8]">
                            {proj.name}
                          </span>
                          <span
                            className={cn(
                              "rounded-full border px-3 py-0.5 text-xs font-medium",
                              proj.accentClass,
                            )}
                          >
                            {proj.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#D9DBDE]">{proj.category}</p>
                        <p className="mt-3 text-sm font-medium text-[#F2F0EB]">{proj.headline}</p>
                      </button>

                      {isCurrent && (
                        <div className="mt-4 border-t border-white/10 pt-4">
                          <p className="text-xs leading-relaxed text-[#D9DBDE]">{proj.narrative}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {proj.modules.map((mod, mIdx) => (
                              <button
                                key={mod.title}
                                type="button"
                                onClick={() => setActiveModuleIdx(mIdx)}
                                className={cn(
                                  "cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-transform duration-150 active:scale-[0.97]",
                                  activeModuleIdx === mIdx
                                    ? "border-[#F2F0EB] bg-[#F2F0EB] text-[#131315]"
                                    : "border-white/15 bg-white/[0.04] text-[#D9DBDE] hover:border-white/30",
                                )}
                              >
                                {mod.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right: Sticky Interactive Product Stage */}
              <div className="lg:sticky lg:top-24 lg:col-span-7">
                <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#111215]/90 p-6 shadow-[0_32px_90px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <div>
                      <span className="text-xs text-[#D9DBDE]">{activeStoryProject.category}</span>
                      <h3 className="font-display text-2xl font-medium text-[#FAFAF8]">
                        {activeStoryProject.name}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-3.5 py-1 text-xs font-medium",
                        activeStoryProject.accentClass,
                      )}
                    >
                      {activeStoryProject.status} · Representação conceitual
                    </span>
                  </div>

                  {/* Active Module Live Screen */}
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={`${activeStoryProject.id}-${activeModuleIdx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12"
                    >
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:col-span-7">
                        <span className="text-xs font-medium text-[#F2F0EB]">
                          {(activeStoryProject.modules[activeModuleIdx] ??
                            activeStoryProject.modules[0])!.metric}
                        </span>
                        <h4 className="font-display mt-2 text-xl font-medium text-[#FAFAF8]">
                          {(activeStoryProject.modules[activeModuleIdx] ??
                            activeStoryProject.modules[0])!.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-[#D9DBDE]">
                          {(activeStoryProject.modules[activeModuleIdx] ??
                            activeStoryProject.modules[0])!.detail}
                        </p>

                        <div className="mt-6 space-y-2.5">
                          {activeStoryProject.modules.map((m, idx) => (
                            <button
                              key={m.title}
                              type="button"
                              onClick={() => setActiveModuleIdx(idx)}
                              className={cn(
                                "flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-xs transition-colors",
                                idx === activeModuleIdx
                                  ? "bg-[#F2F0EB] font-medium text-[#131315]"
                                  : "bg-white/[0.04] text-[#D9DBDE] hover:bg-white/[0.08]",
                              )}
                            >
                              <span>{m.title}</span>
                              <span>{m.metric}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-[#18191E] sm:col-span-5">
                        <Image
                          src={
                            activeStoryProject.id === "zuri"
                              ? "/images/propostas/service-mobile-handheld.jpg"
                              : "/images/propostas/service-software-display.jpg"
                          }
                          alt={`Visual conceitual de ${activeStoryProject.name}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 30vw"
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-transparent" />
                        <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/15 bg-[#131315]/85 p-3 text-xs text-[#F2F0EB] backdrop-blur-md">
                          Clique nos módulos ao lado para inspecionar a estrutura funcional.
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. CLOSING CTA */}
        <section
          id="contato-proposta-b"
          className="border-t border-white/10 bg-[#131315] py-24 pb-32 text-center"
        >
          <Container>
            <h2 className="font-display mx-auto max-w-3xl text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] font-medium text-[#FAFAF8]">
              Pronto para transformar uma operação em produto digital?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#D9DBDE]">
              Proposta B — Foco em produto vivo, ecossistema multi-dispositivo e bancada interativa
              de serviços.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/#contato"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F2F0EB] px-7 text-sm font-medium text-[#131315] transition-transform duration-150 hover:bg-white active:scale-[0.97]"
              >
                <span>Ir para o formulário de briefing</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <ProposalDock active="b" />
    </div>
  );
}

/* --- Interactive Workbench Sandboxes --- */

function SoftwareLiveSandbox() {
  const [modules, setModules] = useState({
    rbac: true,
    pricing: true,
    audit: false,
  });

  const activeCount = Object.values(modules).filter(Boolean).length;

  return (
    <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F0EB] px-3 py-1 text-xs font-medium text-[#131315]">
          <Database className="h-3.5 w-3.5" />
          <span>Sistemas Personalizados &amp; SaaS</span>
        </div>
        <h3 className="font-display mt-4 text-2xl font-medium text-[#131315]">
          Arquitetura modular moldada à regra de negócio.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4E55]">
          Ative ou desative camadas de engenharia abaixo para visualizar como estruturamos sistemas
          corporativos sem depender de planilhas fragmentadas.
        </p>

        <div className="mt-6 space-y-2.5">
          {(
            [
              { key: "rbac", label: "Controle de acesso por perfil (RBAC)" },
              { key: "pricing", label: "Motor determinístico de regras e cálculos" },
              { key: "audit", label: "Trilha de auditoria e logs de operação" },
            ] as const
          ).map((item) => {
            const on = modules[item.key];
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={on}
                onClick={() => setModules((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-150 active:scale-[0.98]",
                  on
                    ? "border-[#131315] bg-[#131315] text-[#FAFAF8]"
                    : "border-[#D9DBDE] bg-[#FAFAF8] text-[#4A4E55] hover:border-[#131315]",
                )}
              >
                <span>{item.label}</span>
                <span className="text-xs">{on ? "Ativo" : "Inativo"}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-[#131315] p-6 text-[#FAFAF8] lg:col-span-7">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs">
          <span className="font-display font-medium text-[#F2F0EB]">
            Topologia do Sistema ({activeCount} módulos ativos)
          </span>
          <span className="text-emerald-300">Tipagem estrita · TypeScript + Zod</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className={cn(
              "rounded-xl border p-4 transition-all",
              modules.rbac
                ? "border-[#F2F0EB]/40 bg-white/[0.07]"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            <ShieldCheck className="h-5 w-5 text-[#F2F0EB]" />
            <p className="font-display mt-2 text-sm font-medium">Autenticação &amp; Perfis</p>
            <p className="mt-1 text-xs text-[#D9DBDE]">Sessões seguras e escopo por unidade.</p>
          </div>

          <div
            className={cn(
              "rounded-xl border p-4 transition-all",
              modules.pricing
                ? "border-[#F2F0EB]/40 bg-white/[0.07]"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            <Cpu className="h-5 w-5 text-[#F2F0EB]" />
            <p className="font-display mt-2 text-sm font-medium">Domínio &amp; Cálculos</p>
            <p className="mt-1 text-xs text-[#D9DBDE]">Regras isoladas e testadas com Vitest.</p>
          </div>

          <div
            className={cn(
              "rounded-xl border p-4 transition-all",
              modules.audit
                ? "border-[#F2F0EB]/40 bg-white/[0.07]"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            <Activity className="h-5 w-5 text-[#F2F0EB]" />
            <p className="font-display mt-2 text-sm font-medium">Rastreabilidade</p>
            <p className="mt-1 text-xs text-[#D9DBDE]">Histórico completo de alterações.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiLiveSandbox() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const prompts = [
    {
      label: "Classificar demanda comercial recebida",
      output:
        "Intenção: Sistema personalizado · Escopo: ERP + Mobile · Prioridade encaminhada para arquitetura.",
      mode: "Agente de Triagem (Nuvem / API)",
    },
    {
      label: "Resumir histórico operacional sem internet",
      output:
        "Processado localmente no dispositivo (0 bytes externos): 3 pendências críticas identificadas.",
      mode: "Inferência Local (Conceito ZURI)",
    },
  ];

  const active = prompts[selectedPrompt] ?? prompts[0]!;

  return (
    <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F0EB] px-3 py-1 text-xs font-medium text-[#131315]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Inteligência Artificial Aplicada</span>
        </div>
        <h3 className="font-display mt-4 text-2xl font-medium text-[#131315]">
          Agentes conectados à operação real com controle.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4E55]">
          Selecione um cenário abaixo para observar como integramos modelos de IA com validação de
          dados e privacidade.
        </p>

        <div className="mt-6 space-y-2.5">
          {prompts.map((p, idx) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setSelectedPrompt(idx)}
              className={cn(
                "w-full cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-150 active:scale-[0.98]",
                selectedPrompt === idx
                  ? "border-[#131315] bg-[#131315] text-[#FAFAF8]"
                  : "border-[#D9DBDE] bg-[#FAFAF8] text-[#4A4E55] hover:border-[#131315]",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#131315] p-6 text-[#FAFAF8] lg:col-span-7">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
          <span className="font-medium text-[#F2F0EB]">{active.mode}</span>
          <span className="text-[#D9DBDE]">Saída estruturada</span>
        </div>
        <p className="font-display mt-5 text-base leading-relaxed text-[#FAFAF8]">
          “{active.output}”
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#D9DBDE]">
          <span className="rounded-full border border-white/15 px-3 py-1">
            1. Sanitização de contexto
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1">
            2. Inferência controlada
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1">
            3. Validação de resposta
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileLiveSandbox() {
  const [offlineMode, setOfflineMode] = useState(true);
  const [syncedCount, setSyncedCount] = useState(12);

  return (
    <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F0EB] px-3 py-1 text-xs font-medium text-[#131315]">
          <Smartphone className="h-3.5 w-3.5" />
          <span>Aplicativos Mobile</span>
        </div>
        <h3 className="font-display mt-4 text-2xl font-medium text-[#131315]">
          Experiências móveis fluidas e prontas para uso em campo.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4E55]">
          Alterne o estado de conectividade ou registre uma atividade para testar o comportamento
          offline-first.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOfflineMode((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#131315] bg-[#131315] px-4 py-2.5 text-xs font-medium text-[#FAFAF8] transition-transform duration-150 active:scale-[0.97]"
          >
            <WifiOff className="h-3.5 w-3.5" />
            <span>{offlineMode ? "Modo Offline Ativo" : "Conectado à Nuvem"}</span>
          </button>

          <button
            type="button"
            onClick={() => setSyncedCount((c) => c + 1)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#D9DBDE] bg-[#F2F0EB] px-4 py-2.5 text-xs font-medium text-[#131315] transition-transform duration-150 active:scale-[0.97]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Registrar check-in ({syncedCount})</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center rounded-2xl bg-[#131315] p-6 text-[#FAFAF8] lg:col-span-7">
        <div className="w-full max-w-xs rounded-3xl border border-white/20 bg-[#1B1C22] p-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-display font-medium text-[#F2F0EB]">NWK Mobile Runtime</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px]">
              {offlineMode ? "Fila Local SQLite" : "Sincronizado"}
            </span>
          </div>
          <div className="mt-4 rounded-2xl bg-[#131315] p-4">
            <p className="text-xs text-[#D9DBDE]">Registros armazenados no aparelho</p>
            <p className="font-display mt-1 text-2xl font-medium text-[#FAFAF8]">
              {syncedCount} atividades
            </p>
            <p className="mt-2 text-[11px] text-emerald-300">
              Zero perda de dados durante oscilação de rede.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebLiveSandbox() {
  const [surfaceTone, setSurfaceTone] = useState<"carbon" | "cream">("carbon");

  return (
    <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <h3 className="font-display text-2xl font-medium text-[#131315]">
          Websites institucionais, landing pages e Design Systems.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4E55]">
          Construímos aplicações web com carregamento instantâneo, SEO técnico estruturado,
          acessibilidade WCAG 2.2 AA e tokens consistentes.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setSurfaceTone("carbon")}
            className={cn(
              "cursor-pointer rounded-xl border px-4 py-2.5 text-xs font-medium transition-transform active:scale-[0.97]",
              surfaceTone === "carbon"
                ? "border-[#131315] bg-[#131315] text-[#FAFAF8]"
                : "border-[#D9DBDE] bg-[#FAFAF8] text-[#131315]",
            )}
          >
            Superfície Carbon (#131315)
          </button>
          <button
            type="button"
            onClick={() => setSurfaceTone("cream")}
            className={cn(
              "cursor-pointer rounded-xl border px-4 py-2.5 text-xs font-medium transition-transform active:scale-[0.97]",
              surfaceTone === "cream"
                ? "border-[#131315] bg-[#131315] text-[#FAFAF8]"
                : "border-[#D9DBDE] bg-[#FAFAF8] text-[#131315]",
            )}
          >
            Superfície Cream (#F2F0EB)
          </button>
        </div>
      </div>

      <div
        className={cn(
          "rounded-2xl border p-6 transition-colors duration-300 lg:col-span-7",
          surfaceTone === "carbon"
            ? "border-[#131315] bg-[#131315] text-[#FAFAF8]"
            : "border-[#D9DBDE] bg-[#F2F0EB] text-[#131315]",
        )}
      >
        <p className="text-xs font-medium opacity-75">Inspeção de Tokens &amp; Contraste</p>
        <p className="font-display mt-2 text-2xl font-medium">
          Precisão tipográfica e contraste verificado.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-current/20 px-3 py-1">Next.js App Router</span>
          <span className="rounded-full border border-current/20 px-3 py-1">WCAG 2.2 AA</span>
          <span className="rounded-full border border-current/20 px-3 py-1">Storybook</span>
        </div>
      </div>
    </div>
  );
}

function AutomationLiveSandbox() {
  const [step, setStep] = useState(3);

  return (
    <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F0EB] px-3 py-1 text-xs font-medium text-[#131315]">
          <Workflow className="h-3.5 w-3.5" />
          <span>Automações e Integrações</span>
        </div>
        <h3 className="font-display mt-4 text-2xl font-medium text-[#131315]">
          Sistemas conversando sem retrabalho manual.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4E55]">
          Dispare uma simulação de evento para percorrer o pipeline de integração entre sistemas.
        </p>
        <button
          type="button"
          onClick={() => setStep((s) => (s >= 3 ? 1 : s + 1))}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#131315] px-5 py-3 text-xs font-medium text-[#FAFAF8] transition-transform duration-150 active:scale-[0.97]"
        >
          <Play className="h-3.5 w-3.5" />
          <span>Avançar estágio do pipeline ({step}/3)</span>
        </button>
      </div>

      <div className="rounded-2xl bg-[#131315] p-6 text-[#FAFAF8] lg:col-span-7">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { id: 1, title: "1. Captura & Webhook", desc: "Recebimento validado via API" },
            { id: 2, title: "2. Transformação", desc: "Normalização e regras de negócio" },
            { id: 3, title: "3. Sincronização", desc: "Atualização no ERP e notificação" },
          ].map((node) => {
            const done = step >= node.id;
            return (
              <div
                key={node.id}
                className={cn(
                  "rounded-xl border p-4 transition-all",
                  done
                    ? "border-[#F2F0EB]/40 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.02]",
                )}
              >
                <CheckCircle2 className="h-4 w-4 text-[#F2F0EB]" />
                <p className="font-display mt-2 text-sm font-medium">{node.title}</p>
                <p className="mt-1 text-xs text-[#D9DBDE]">{node.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
