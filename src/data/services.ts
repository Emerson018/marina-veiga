export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  isFeatured?: boolean;
  deliverables: string[];
  price: string;
  installments: string;
  paymentTerms: string;
  duration: string;
  modality: "Online" | "Presencial" | "Híbrido";
  whatsappMessage: string;
}

export const SERVICES: Service[] = [
  {
    id: "analise-estilo-biotipo",
    title: "Análise de Estilo & Biótipo",
    badge: "Diagnóstico Fundamental",
    tagline: "Juntas, descobrimos as proporções e a essência que fazem de você única, para escolher cortes, tecidos e caimentos que projetam sofisticação e confiança.",
    description:
      "Juntas, descobrimos as proporções e a essência que fazem de você única, para escolher cortes, tecidos e caimentos que projetam sofisticação e confiança.",
    deliverables: [
      "Análise de proporções e pontos de equilíbrio",
      "Estilo predominante e complementar",
      "Diretrizes de decotes, modelagens, comprimentos e tecidos",
      "Guia visual de referências e silhuetas",
    ],
    price: "R$ 590",
    installments: "em até 4x de R$ 147,50 sem juros no cartão",
    paymentTerms: "ou R$ 530 à vista no Pix (com desconto)",
    duration: "2 encontros (online ou presencial)",
    modality: "Híbrido",
    whatsappMessage:
      "Olá Mariana! Gostaria de receber mais informações e datas disponíveis para a Análise de Estilo & Biótipo.",
  },
  {
    id: "closet-detox-presencial",
    title: "Closet Detox (4h)",
    badge: "Presencial Imersivo",
    tagline: "Triagem estratégica, otimização de peças e closet inteligente no seu espaço",
    description:
      "Uma imersão presencial de 4 horas no seu armário para desapegar do que não representa sua melhor versão, multiplicar combinações de alto impacto e criar um guarda-roupa coeso e funcional.",
    deliverables: [
      "Triagem presencial criteriosa e consciente das peças existentes no acervo",
      "Montagem e registro fotográfico de mais de 30 looks corporativos e casuais",
      "Mapeamento estratégico de peças essenciais faltantes (shopping list)",
      "Setorização visual e organização prática para o dia a dia",
    ],
    price: "R$ 990",
    installments: "em até 4x de R$ 247,50 sem juros no cartão",
    paymentTerms: "ou R$ 890 à vista no Pix (com desconto)",
    duration: "Sessão presencial imersiva de 4h",
    modality: "Presencial",
    whatsappMessage:
      "Olá Mariana! Gostaria de agendar o Closet Detox presencial (4h).",
  },
  {
    id: "closet-detox-online",
    title: "Closet Detox Online",
    badge: "100% Remoto",
    tagline: "Consultoria remota guiada para transformar seu guarda-roupa de onde estiver",
    description:
      "Metodologia prática e estruturada à distância: você recebe direcionamento completo para triagem, multiplicação de looks e otimização do closet com total comodidade.",
    deliverables: [
      "Orientação guiada passo a passo para triagem do seu acervo",
      "Montagem de combinações estratégicas registradas digitalmente",
      "Lista direcionada de peças complementares para compras futuras",
      "Suporte para organização prática do espaço do closet",
    ],
    price: "R$ 490",
    installments: "em até 4x de R$ 122,50 sem juros no cartão",
    paymentTerms: "ou R$ 440 à vista no Pix (com desconto)",
    duration: "Sessão guiada online",
    modality: "Online",
    whatsappMessage:
      "Olá Mariana! Gostaria de saber mais e agendar o Closet Detox Online.",
  },
  {
    id: "personal-shopper",
    title: "Personal Shopper (3h)",
    badge: "Compras Estratégicas",
    tagline: "Assessoria orientada para aquisições cirúrgicas e duradouras",
    description:
      "Acompanhamento presencial guiado de 3 horas em lojas pré-selecionadas de acordo com seu orçamento e estilo. Compras certeiras, sem impulsos e com foco em versatilidade.",
    deliverables: [
      "Pré-seleção personalizada de lojas e peças antes do encontro",
      "Roteiro exclusivo focado em peças de alto valor e durabilidade",
      "Treinamento prático sobre caimento, tecidos nobres e custo por uso",
      "Otimização total de tempo e orçamento planejado",
    ],
    price: "R$ 790",
    installments: "em até 4x de R$ 197,50 sem juros no cartão",
    paymentTerms: "ou R$ 710 à vista no Pix (com desconto)",
    duration: "Sessão presencial de 3h",
    modality: "Presencial",
    whatsappMessage:
      "Olá Mariana! Gostaria de saber mais sobre a assessoria de Personal Shopper (3h).",
  },
  {
    id: "consultoria-completa-360",
    title: "Consultoria 360°",
    badge: "Experiência Integral",
    isFeatured: true,
    tagline: "A transformação integral: da descoberta de estilo ao closet renovado",
    description:
      "A experiência definitiva de consultoria de imagem. Uma jornada completa que une análise de biótipo, closet detox, assessoria de compras e entrega do Dossiê de Estilo exclusivo.",
    deliverables: [
      "Análise completa de estilo e biótipo",
      "Sessão completa de Closet Detox com multiplicação de looks",
      "Assessoria personalizada de Personal Shopper",
      "Dossiê de Estilo físico/digital exclusivo e encadernado",
      "30 dias de acompanhamento direto com Mariana Veiga via WhatsApp",
    ],
    price: "R$ 2.190",
    installments: "em até 10x de R$ 219,00 sem juros no cartão (ou 6x de R$ 365,00)",
    paymentTerms: "ou R$ 1.970 à vista no Pix (com desconto)",
    duration: "Processo completo ao longo de 4 a 6 semanas",
    modality: "Híbrido",
    whatsappMessage:
      "Olá Mariana! Tenho interesse na Consultoria 360° e gostaria de verificar disponibilidade de agenda.",
  },
  {
    id: "dossie-estilo",
    title: "Dossiê (só como complemento)",
    badge: "Complemento Exclusivo",
    tagline: "Seu livro de estilo pessoal definitivo e atemporal como adicional sob medida",
    description:
      "Um guia editorial exclusivo e personalizado página por página, compilando todas as diretrizes de imagem, cápsulas de looks executivos e referências práticas para o seu cotidiano.",
    deliverables: [
      "Documento editorial personalizado em alta resolução",
      "Guia completo de silhuetas, proporções, cortes e linhas",
      "Cápsula corporativa com catálogo de combinações práticas",
      "Disponível exclusivamente como complemento aos serviços de consultoria",
    ],
    price: "R$ 390",
    installments: "em até 3x de R$ 130,00 sem juros no cartão",
    paymentTerms: "ou R$ 350 à vista no Pix (com desconto)",
    duration: "Entregue em até 10 dias úteis",
    modality: "Online",
    whatsappMessage:
      "Olá Mariana! Gostaria de solicitar o Dossiê de Estilo como complemento.",
  },
];
