import type {
  EngineeringBlueprintItem,
  MethodologyStep,
  ProjectItem,
  SolutionItem,
  SolutionTypeOption,
  StickyContentItem,
} from "@/types/content";

export const heroContent = {
  headlinePrimary: "Engenharia digital.",
  headlineSecondary: "Impacto real.",
  description:
    "Projetamos e desenvolvemos softwares personalizados, aplicativos mobile, plataformas web, inteligência artificial e automações para operações que exigem precisão.",
  primaryCta: { label: "Iniciar um projeto", href: "#contato" },
  secondaryCta: { label: "Explorar soluções", href: "#solucoes" },
} as const;

export const manifestoAboutContent = {
  lead: "Tecnologia é o que construímos.",
  accent: "Transformação é o que buscamos.",
  purpose:
    "A NWK nasce para construir tecnologia que resolve problemas reais. Unimos engenharia de software, design de produto e inovação para criar sistemas, aplicativos e plataformas que acompanham a evolução de pessoas, instituições e negócios.",
  principles: [
    {
      title: "Abordagem orientada ao problema",
      description:
        "Antes de definir código ou interface, estruturamos a regra de negócio, os fluxos críticos e a arquitetura que sustenta a operação.",
    },
    {
      title: "Qualidade como requisito de base",
      description:
        "Cada entrega combina tipagem estrita, acessibilidade, performance mensurável e código modular preparado para crescer sem retrabalho.",
    },
    {
      title: "Compromisso com soluções úteis",
      description:
        "Construímos ferramentas digitais claras, confiáveis e fáceis de operar — evitando complexidade artificial e promessas vagas.",
    },
  ],
} as const;

/**
 * Infraestrutura de vídeo das Soluções. Enquanto os clipes definitivos não existirem
 * em /public/videos/solutions, as imagens estáticas continuam como fallback.
 * Ao adicionar os arquivos descritos em public/videos/solutions/README.md, altere
 * para `true`.
 */
const SOLUTION_VIDEOS_READY = false;

const chapterVideo = (slug: string): StickyContentItem["video"] =>
  SOLUTION_VIDEOS_READY
    ? {
        src: `/videos/solutions/${slug}.mp4`,
        webm: `/videos/solutions/${slug}.webm`,
        poster: `/videos/solutions/${slug}.jpg`,
      }
    : undefined;

export const solutionsStickyChapters: StickyContentItem[] = [
  {
    heading: "Sistemas personalizados e plataformas SaaS",
    paragraph:
      "Substituímos planilhas fragmentadas e softwares de prateleira engessados por arquiteturas sob medida, modeladas para a regra real do negócio com APIs tipadas e painéis de comando rápidos.",
    list: [
      "Sistemas de gestão sob medida",
      "Plataformas SaaS multi-tenant",
      "APIs REST/GraphQL e microsserviços",
    ],
    link: { href: "#contato", text: "Iniciar projeto de software" },
    image: "/images/propostas/service-software-display.jpg",
    video: chapterVideo("sistemas"),
    imageAlt:
      "Monitor widescreen de estúdio exibindo camadas translúcidas de arquitetura de software e painéis de sistema",
  },
  {
    heading: "Inteligência artificial e agentes operacionais",
    paragraph:
      "Reduzimos gargalos de triagem, atendimento e análise conectando agentes inteligentes via API ou executados localmente com privacidade, controle determinístico e rastreabilidade.",
    list: [
      "Agentes de triagem e atendimento",
      "Inferência local orientada à privacidade",
      "Fluxos assistidos e apoio à decisão",
    ],
    link: { href: "#contato", text: "Explorar soluções em IA" },
    image: "/images/propostas/service-ai-interface.jpg",
    video: chapterVideo("ia"),
    imageAlt:
      "Notebook e tablet em ambiente escuro com fluxos de trabalho de inteligência artificial e nós de automação flutuando acima das telas",
  },
  {
    heading: "Aplicativos mobile e experiências em campo",
    paragraph:
      "Levamos operações críticas para smartphones com sincronização offline-first, resposta tátil imediata, gestos naturais e integração nativa para equipes externas ou uso contínuo.",
    list: [
      "Aplicativos multiplataforma iOS e Android",
      "Arquitetura offline-first resiliente",
      "Interfaces móveis orientadas a gestos",
    ],
    link: { href: "#contato", text: "Explorar soluções mobile" },
    image: "/images/propostas/service-mobile-handheld.jpg",
    video: chapterVideo("mobile"),
    imageAlt:
      "Smartphone em carbono fosco com três camadas translúcidas de interface mobile e anéis de gesto flutuando sobre a tela",
  },
  {
    heading: "Plataformas web, automações e integrações",
    paragraph:
      "Conectamos ferramentas isoladas, eliminamos retrabalho manual com pipelines tolerantes a falhas e desenvolvemos websites e aplicações web com alta precisão técnica e SEO estruturado.",
    list: [
      "Websites institucionais e aplicações web",
      "Orquestração de webhooks, APIs e ERPs",
      "Design Systems escaláveis e acessíveis",
    ],
    link: { href: "#contato", text: "Falar sobre sua operação" },
    image: "/images/propostas/service-ai-network.jpg",
    video: chapterVideo("web-automacao"),
    imageAlt:
      "Condutos ópticos e blocos modulares em vidro escuro representando integração de dados e automação de processos",
  },
];

export const solutionsContent: {
  heading: string;
  headingMuted: string;
  items: SolutionItem[];
} = {
  heading: "Capacidade técnica aplicada",
  headingMuted: "do núcleo de engenharia à interface.",
  items: [
    {
      id: "engenharia-software",
      title: "Engenharia de software",
      whatWeBuild: "Sistemas personalizados, plataformas digitais, produtos SaaS e soluções corporativas.",
      problemSolved:
        "Substitui planilhas fragmentadas e processos manuais por sistemas estáveis, seguros e moldados à operação real.",
      deliverables: ["Sistemas de gestão sob medida", "Plataformas SaaS", "APIs e serviços escaláveis"],
      featured: true,
      visualVariant: "software",
    },
    {
      id: "inteligencia-artificial",
      title: "Inteligência artificial",
      whatWeBuild: "Assistentes inteligentes, agentes de IA e fluxos integrados com processamento local ou em nuvem.",
      problemSolved:
        "Reduz gargalos de atendimento, triagem e análise operacional conectando modelos de IA a dados reais com controle.",
      deliverables: ["Assistentes e agentes operacionais", "IA local orientada à privacidade", "Fluxos assistidos"],
      featured: true,
      visualVariant: "ai",
    },
    {
      id: "aplicativos-mobile",
      title: "Aplicativos mobile",
      whatWeBuild: "Aplicativos e experiências móveis construídos para uso contínuo em campo ou no dia a dia.",
      problemSolved:
        "Leva operações complexas para smartphones com fluidez, resposta tátil imediata e funcionamento confiável.",
      deliverables: ["Apps multiplataforma", "Experiências offline-first", "Interfaces orientadas a gestos"],
      visualVariant: "mobile",
    },
    {
      id: "desenvolvimento-web",
      title: "Desenvolvimento web",
      whatWeBuild: "Websites institucionais, landing pages de alta precisão, portais e aplicações web.",
      problemSolved:
        "Posiciona empresas com credibilidade técnica, velocidade de carregamento, SEO estruturado e acessibilidade.",
      deliverables: ["Websites institucionais", "Aplicações web interativas", "Portais de conteúdo"],
      visualVariant: "web",
    },
    {
      id: "automacoes-integracoes",
      title: "Automações e integrações",
      whatWeBuild: "Digitalização de rotinas, integração entre sistemas e orquestração de dados.",
      problemSolved:
        "Conecta ferramentas isoladas e elimina retrabalho manual com pipelines rastreáveis e tolerantes a falhas.",
      deliverables: ["Integrações via API", "Automação de processos", "Sincronização de dados"],
      visualVariant: "automation",
    },
    {
      id: "design-produtos",
      title: "Design de produtos digitais",
      whatWeBuild: "Arquitetura de UX/UI, prototipagem interativa e Design Systems escaláveis.",
      problemSolved:
        "Transforma fluxos técnicos complexos em interfaces claras, consistentes e acessíveis para qualquer usuário.",
      deliverables: ["Design Systems e tokens", "Prototipagem navegável", "Direção de interface"],
      visualVariant: "design",
    },
  ],
};

export const projectsContent: {
  heading: string;
  headingMuted: string;
  disclaimer: string;
  items: ProjectItem[];
} = {
  heading: "Vitrine de produtos e iniciativas",
  headingMuted: "em concepção, engenharia e validação.",
  disclaimer:
    "As telas exibidas no palco são representações conceituais da arquitetura de cada projeto, identificadas com transparência enquanto interfaces finais não estão publicadas.",
  items: [
    {
      id: "fju-artes-marciais",
      slug: "fju-artes-marciais",
      name: "FJU Artes Marciais",
      category: "Plataforma de gestão esportiva",
      origin: "Em desenvolvimento",
      deviceType: "hybrid",
      headline: "Gestão esportiva multimodal para equipes, atletas e atividades.",
      description:
        "Plataforma estruturada para organizar modalidades, turmas, acompanhamento de atletas e coordenação de atividades esportivas em ambiente unificado.",
      scope: ["Gestão multimodal", "Painel operacional", "Acompanhamento mobile"],
      conceptLabel: "Representação conceitual — interface em desenvolvimento",
      conceptModules: ["Modalidades e turmas", "Cadastro de atletas", "Agenda de atividades"],
    },
    {
      id: "doce-certo",
      slug: "doce-certo",
      name: "Doce Certo",
      category: "Sistema de gestão e precificação",
      origin: "Em desenvolvimento",
      deviceType: "desktop",
      headline: "Precisão operacional, fichas técnicas e precificação para confeitaria.",
      description:
        "Sistema dedicado ao cálculo estruturado de custos de insumos, fichas técnicas de receitas, formação de preço e organização da rotina produtiva.",
      scope: ["Fichas técnicas", "Engenharia de precificação", "Controle de produção"],
      conceptLabel: "Representação conceitual — interface em desenvolvimento",
      conceptModules: ["Ficha técnica", "Custo por insumo", "Formação de preço"],
    },
    {
      id: "nwk-boss-ai",
      slug: "nwk-boss-ai",
      name: "NWKBossAI",
      category: "Inteligência artificial e produtividade",
      origin: "Proprietário",
      deviceType: "desktop",
      headline: "Assistência pessoal, produtividade e automações integradas.",
      description:
        "Iniciativa proprietária da NWK que explora agentes inteligentes voltados à organização de tarefas, apoio à decisão e automação de rotinas operacionais.",
      scope: ["Produto proprietário", "Agentes de IA", "Orquestração de fluxos"],
      conceptLabel: "Representação conceitual — projeto proprietário NWK",
      conceptModules: ["Agente de triagem", "Fila de automações", "Contexto operacional"],
    },
    {
      id: "zuri",
      slug: "zuri",
      name: "ZURI",
      category: "Inteligência artificial local",
      origin: "Conceito experimental",
      deviceType: "mobile",
      headline: "Inteligência artificial local executada diretamente no dispositivo móvel.",
      description:
        "Projeto experimental voltado à inferência local em smartphones, priorizando privacidade de dados, baixa latência e operação independente de conexão contínua.",
      scope: ["IA embarcada", "Experiência mobile", "Privacidade local"],
      conceptLabel: "Representação conceitual — projeto experimental",
      conceptModules: ["Inferência offline", "Memória local", "Resposta instantânea"],
    },
    {
      id: "nwk-studio",
      slug: "nwk-studio",
      name: "NWKstudio",
      category: "Plataforma e experiências web",
      origin: "Proprietário",
      deviceType: "desktop",
      headline: "Prospecção comercial e desenvolvimento de experiências web.",
      description:
        "Ambiente proprietário concebido para estruturar processos de prospecção comercial e acelerar a entrega de websites e experiências digitais sob medida.",
      scope: ["Produto proprietário", "Experiências web", "Fluxo comercial"],
      conceptLabel: "Representação conceitual — projeto proprietário NWK",
      conceptModules: ["Prospecção estruturada", "Briefing técnico", "Entrega web"],
    },
  ],
};

export const methodologyContent: {
  heading: string;
  headingMuted: string;
  steps: MethodologyStep[];
} = {
  heading: "Do entendimento à evolução",
  headingMuted: "em fluxo contínuo de engenharia.",
  steps: [
    {
      id: "entendimento",
      title: "Entendimento do problema",
      summary: "Mapeamento do contexto operacional, objetivos reais, restrições técnicas e critérios de sucesso.",
      outcome: "Diagnóstico claro de escopo",
    },
    {
      id: "planejamento",
      title: "Planejamento",
      summary: "Definição de prioridades, modelagem de arquitetura, riscos e etapas de entrega.",
      outcome: "Plano técnico executável",
    },
    {
      id: "design-arquitetura",
      title: "Design e arquitetura",
      summary: "Estruturação de fluxos de uso, interface, Design System e contratos técnicos.",
      outcome: "Protótipo e base arquitetural",
    },
    {
      id: "desenvolvimento",
      title: "Desenvolvimento",
      summary: "Implementação incremental com código limpo, tipagem estrita e integrações confiáveis.",
      outcome: "Software funcional e modular",
    },
    {
      id: "validacao",
      title: "Validação",
      summary: "Testes funcionais, responsividade, acessibilidade WCAG e revisão criteriosa de desempenho.",
      outcome: "Homologação técnica e visual",
    },
    {
      id: "entrega-evolucao",
      title: "Entrega e evolução",
      summary: "Publicação assistida, monitoramento e expansão estruturada de novas capacidades.",
      outcome: "Operação estável e evolutiva",
    },
  ],
};

export const contactContent = {
  heading: "O próximo projeto começa aqui.",
  description: "Conte-nos o que você deseja construir. Vamos explorar as possibilidades.",
  solutionTypes: [
    "Software personalizado",
    "Aplicativo",
    "Website",
    "Landing page",
    "Inteligência artificial",
    "Automação",
    "Outros",
  ] satisfies SolutionTypeOption[],
  pendingIntegrationNotice:
    "Canal de envio externo ainda em configuração. Ao submeter, os dados são validados localmente sem transmissão a servidor externo.",
} as const;

export const engineeringShelfContent: {
  eyebrow: string;
  statement: string;
  categories: readonly ("Todos" | EngineeringBlueprintItem["category"])[];
  items: EngineeringBlueprintItem[];
} = {
  eyebrow: "Cadernos de Engenharia",
  statement:
    "Engenharia não é promessa visual. É arquitetura pensada para durar, código tipado sem atalhos e interfaces que respondem com precisão em cada interação.",
  categories: ["Todos", "Engenharia", "IA & Dados", "Experiência"],
  items: [
    {
      id: "caderno-sistemas",
      code: "01",
      title: "Sistemas & SaaS",
      shortTitle: "Sistemas",
      category: "Engenharia",
      surface: "carbon",
      pattern: "architecture-grid",
      badge: "Padrão arquitetural NWK",
      thesis:
        "Substituímos planilhas fragmentadas e softwares legados por arquiteturas modulares multi-tenant construídas para a operação real.",
      summary:
        "Cada sistema nasce com fronteiras claras entre domínio, persistência e interface para crescer sem acumular débito técnico.",
      standards: [
        "Tipagem estrita end-to-end",
        "Domínio isolado de infraestrutura",
        "APIs versionadas e rastreáveis",
      ],
      deliverables: [
        "Modelagem de domínio e banco",
        "Painéis administrativos rápidos",
        "Contratos de API documentados",
      ],
    },
    {
      id: "caderno-ia",
      code: "02",
      title: "IA & Agentes Locais",
      shortTitle: "IA Aplicada",
      category: "IA & Dados",
      surface: "graphite",
      pattern: "signal-waves",
      badge: "Padrão arquitetural NWK",
      thesis:
        "Agentes operacionais conectados via API ou executados localmente com privacidade, previsibilidade e controle determinístico.",
      summary:
        "Projetamos fluxos assistidos por inteligência artificial onde cada decisão crítica possui validação estrutural e trilha de auditoria.",
      standards: [
        "Guardrails e validação de saída",
        "Privacidade e rastreabilidade",
        "Orquestração com fallback determinístico",
      ],
      deliverables: [
        "Agentes de triagem e análise",
        "Pipelines de contexto operacional",
        "Monitoramento de latência e custo",
      ],
    },
    {
      id: "caderno-mobile",
      code: "03",
      title: "Apps Mobile Offline-First",
      shortTitle: "Mobile",
      category: "Experiência",
      surface: "cream",
      pattern: "mobile-layers",
      badge: "Padrão arquitetural NWK",
      thesis:
        "Aplicativos iOS e Android resilientes para equipes em campo e rotinas contínuas, mesmo sob conectividade instável.",
      summary:
        "Priorizamos resposta tátil imediata, gestos naturais e sincronização segura de estado local para evitar perda de dados em operação.",
      standards: [
        "Persistência local e sincronização",
        "Gestos naturais e feedback tátil",
        "Consumo otimizado de rede e bateria",
      ],
      deliverables: [
        "App multiplataforma iOS e Android",
        "Fila de sincronização offline",
        "Publicação assistida em lojas",
      ],
    },
    {
      id: "caderno-web",
      code: "04",
      title: "Plataformas Web & SEO",
      shortTitle: "Web",
      category: "Experiência",
      surface: "soft-white",
      pattern: "web-columns",
      badge: "Padrão arquitetural NWK",
      thesis:
        "Aplicações web e websites institucionais com renderização veloz, acessibilidade real e arquitetura limpa desde o primeiro byte.",
      summary:
        "Estruturamos páginas com semântica rigorosa, zero poluição visual e métricas de carregamento pensadas para dispositivos reais.",
      standards: [
        "Server Components por padrão",
        "Conformidade WCAG 2.2 AA",
        "Core Web Vitals e SEO técnico",
      ],
      deliverables: [
        "Websites institucionais autorais",
        "Aplicações web responsivas",
        "Estrutura semântica e metadados",
      ],
    },
    {
      id: "caderno-automacoes",
      code: "05",
      title: "Automações & Integrações",
      shortTitle: "Automações",
      category: "IA & Dados",
      surface: "carbon",
      pattern: "pipeline-nodes",
      badge: "Padrão arquitetural NWK",
      thesis:
        "Conectamos ERPs, CRMs, webhooks e rotinas internas para eliminar retrabalho manual com pipelines tolerantes a falhas.",
      summary:
        "Toda integração é desenhada para resistir a instabilidades externas com reprocessamento seguro e visibilidade clara de eventos.",
      standards: [
        "Idempotência e reprocessamento seguro",
        "Observabilidade por evento",
        "Desacoplamento por filas e contratos",
      ],
      deliverables: [
        "Conectores de APIs e webhooks",
        "Rotinas assíncronas auditáveis",
        "Alertas operacionais de falha",
      ],
    },
    {
      id: "caderno-design-systems",
      code: "06",
      title: "Design Systems Escaláveis",
      shortTitle: "Design Systems",
      category: "Engenharia",
      surface: "graphite",
      pattern: "token-matrix",
      badge: "Padrão arquitetural NWK",
      thesis:
        "Bibliotecas de componentes documentadas, tokens semânticos e consistência visual preparada para múltiplos produtos evoluírem juntos.",
      summary:
        "Unimos design e engenharia em um vocabulário único de tokens, estados interativos completos e validação automatizada.",
      standards: [
        "Tokens semânticos em CSS Variables",
        "Estados completos de teclado e foco",
        "Documentação viva em Storybook",
      ],
      deliverables: [
        "Arquitetura de tokens e tipografia",
        "Biblioteca de componentes reutilizáveis",
        "Auditoria contínua de acessibilidade",
      ],
    },
  ],
};
