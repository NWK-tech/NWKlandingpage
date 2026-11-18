import type {
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
    link: { href: "#projetos", text: "Ver projetos e conceitos" },
    image: "/images/propostas/service-mobile-handheld.jpg",
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
