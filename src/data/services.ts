export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  isFeatured?: boolean;
  deliverables: string[];
  price: string;
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
    tagline: "Alinhamento de proporções, silhueta e identidade visual autêntica",
    description:
      "Mapeamento técnico e sensível das suas proporções corporais e da sua essência pessoal para selecionar cortes, tecidos e caimentos que projetam sofisticação e autoconfiança.",
    deliverables: [
      "Diagnóstico completo de proporções corporais e pontos de equilíbrio",
      "Identificação dos estilos predominante e complementar",
      "Diretrizes práticas de decotes, modelagens, comprimentos e tecidos",
      "Guia visual de referências e silhuetas para compras e montagem de looks",
    ],
    price: "R$ 1.290",
    paymentTerms: "em até 6x de R$ 235 ou R$ 1.160 à vista no Pix",
    duration: "2 encontros (online ou presencial)",
    modality: "Híbrido",
    whatsappMessage:
      "Olá Mariana! Gostaria de receber mais informações e datas disponíveis para a Análise de Estilo & Biótipo.",
  },
  {
    id: "revitalizacao-guarda-roupa",
    title: "Revitalização de Guarda-Roupa",
    badge: "Closet Detox",
    tagline: "Triagem estratégica, otimização de peças e closet inteligente",
    description:
      "Uma imersão no seu armário para desapegar do que não representa sua melhor versão, multiplicar combinações de alto impacto e criar um guarda-roupa coeso e funcional.",
    deliverables: [
      "Triagem criteriosa e consciente das peças existentes no acervo",
      "Montagem e registro fotográfico de mais de 30 looks corporativos e casuais",
      "Mapeamento estratégico de peças essenciais faltantes (shopping list)",
      "Setorização visual e organização prática para o dia a dia",
    ],
    price: "R$ 1.890",
    paymentTerms: "em até 6x de R$ 345 ou R$ 1.700 à vista no Pix",
    duration: "Sessão imersiva presencial (aprox. 4h)",
    modality: "Presencial",
    whatsappMessage:
      "Olá Mariana! Gostaria de agendar a Revitalização de Guarda-Roupa (Closet Detox).",
  },
  {
    id: "personal-shopper",
    title: "Personal Shopper",
    badge: "Compras Estratégicas",
    tagline: "Assessoria orientada para aquisições cirúrgicas e duradouras",
    description:
      "Acompanhamento presencial guiado em lojas pré-selecionadas de acordo com seu orçamento e estilo. Compras certeiras, sem compras por impulso e com foco em versatilidade.",
    deliverables: [
      "Pré-seleção personalizada de lojas e peças antes do encontro",
      "Roteiro exclusivo focado em peças de alto valor e durabilidade",
      "Treinamento prático sobre caimento, tecidos nobres e custo por uso",
      "Otimização total de tempo e orçamento planejado",
    ],
    price: "R$ 1.490",
    paymentTerms: "em até 6x de R$ 270 ou R$ 1.340 à vista no Pix",
    duration: "Sessão presencial guiada de até 3h",
    modality: "Presencial",
    whatsappMessage:
      "Olá Mariana! Gostaria de saber mais sobre o serviço de Personal Shopper.",
  },
  {
    id: "consultoria-completa-360",
    title: "Consultoria Completa 360°",
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
    price: "R$ 3.890",
    paymentTerms: "em até 10x de R$ 425 ou R$ 3.500 à vista no Pix",
    duration: "Processo completo ao longo de 4 a 6 semanas",
    modality: "Híbrido",
    whatsappMessage:
      "Olá Mariana! Tenho interesse na Consultoria Completa 360° e gostaria de verificar disponibilidade de agenda.",
  },
  {
    id: "dossie-estilo",
    title: "Dossiê de Estilo Exclusivo",
    badge: "Entregável & Guia",
    tagline: "Seu livro de estilo pessoal definitivo e atemporal",
    description:
      "Um guia editorial exclusivo e personalizado página por página, compilando todas as diretrizes de imagem, cápsulas de looks executivos e referências práticas para o seu cotidiano.",
    deliverables: [
      "Documento editorial personalizado em alta resolução",
      "Guia completo de silhuetas, proporções, cortes e linhas",
      "Cápsula corporativa com catálogo de combinações práticas",
      "Acesso perpétuo para consulta rápida no celular ou impresso",
    ],
    price: "R$ 980",
    paymentTerms: "em até 4x de R$ 265 ou R$ 880 à vista no Pix",
    duration: "Entregue em até 10 dias úteis",
    modality: "Online",
    whatsappMessage:
      "Olá Mariana! Gostaria de encomendar o Dossiê de Estilo Exclusivo.",
  },
];
