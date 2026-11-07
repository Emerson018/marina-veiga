export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  isFeatured?: boolean;
  savingsNote?: string;
  howItWorks?: string[];
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
    id: "dossie-estilo",
    title: "Dossiê de Estilo",
    badge: "Entregável & Guia",
    tagline: "Seu mapa de looks para o dia a dia e para viagens",
    description:
      "Um guia visual criado com as peças que você já tem. Você fotografa suas peças, me envia, e eu monto as combinações e organizo tudo em um mapa prático. Assim, você abre o armário e sabe exatamente o que vestir, seja na rotina, no trabalho ou na mala de uma viagem.",
    howItWorks: [
      "Você recebe um passo a passo simples para fotografar suas peças.",
      "Você envia as fotos pelo WhatsApp ou por e-mail.",
      "Eu monto as combinações e preparo o seu mapa de looks.",
      "Você recebe o dossiê pronto em até 7 dias.",
    ],
    deliverables: [
      "Guia rápido de como fotografar suas peças",
      "Looks montados com as suas peças, em formato visual",
      "Mapa de combinações organizado por ocasião: trabalho, lazer, eventos",
      "Roteiros de mala para viagens, com poucas peças e muitas combinações",
      "Entrega digital em alta resolução, para consultar no celular a qualquer hora",
      "Opção de versão impressa e encadernada, sob solicitação",
    ],
    price: "R$ 390",
    installments: "em até 3x de R$ 130",
    paymentTerms: "ou R$ 350 à vista no Pix",
    duration: "Entregue em até 7 dias após o recebimento das fotos",
    modality: "Online",
    whatsappMessage:
      "Olá Mariana! Gostaria de encomendar o meu Dossiê de Estilo.",
  },
  {
    id: "consultoria-completa-360",
    title: "Consultoria 360°",
    badge: "Experiência Integral",
    isFeatured: true,
    savingsNote: "Economia de R$ 770 em relação aos serviços avulsos",
    tagline: "Da descoberta do seu estilo ao closet renovado",
    description:
      "A jornada completa de consultoria de imagem, do início ao fim: análise das suas proporções, closet organizado, compras certas e um mapa de looks para você seguir sozinha depois.",
    deliverables: [
      "Análise de Estilo & Biótipo: seus cortes, comprimentos e tecidos ideais",
      "Closet Detox presencial: triagem das peças e mais de 30 looks montados",
      "Personal Shopper: compras guiadas, de acordo com o seu estilo e orçamento",
      "Dossiê de Estilo: seu mapa de looks para o dia a dia e para viagens, digital (impresso sob solicitação)",
      "30 dias de acompanhamento comigo pelo WhatsApp",
    ],
    price: "R$ 2.190",
    installments: "em até 10x de R$ 219 sem juros no cartão (ou 6x de R$ 365)",
    paymentTerms: "ou R$ 1.970 à vista no Pix",
    duration: "Processo completo em 4 semanas",
    modality: "Híbrido",
    whatsappMessage:
      "Olá Mariana! Tenho interesse na Consultoria 360° e gostaria de verificar disponibilidade de agenda.",
  },
  {
    id: "analise-estilo-biotipo",
    title: "Análise de Estilo & Biótipo",
    badge: "Diagnóstico Fundamental",
    tagline: "",
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
    title: "Closet Detox",
    badge: "Presencial Imersivo",
    tagline: "Triagem estratégica e closet inteligente",
    description:
      "Valorizar o que faz sentido para você, soltar o que não representa a sua melhor versão.",
    deliverables: [
      "Triagem consciente das suas peças",
      "Shopping list das peças essenciais",
      "Organização visual do closet",
    ],
    price: "R$ 990",
    installments: "em até 4x de R$ 247,50 sem juros no cartão",
    paymentTerms: "ou R$ 890 à vista no Pix (com desconto)",
    duration: "Sessão imersiva de 4h",
    modality: "Presencial",
    whatsappMessage:
      "Olá Mariana! Gostaria de agendar o Closet Detox presencial.",
  },
  {
    id: "styling-eventos",
    title: "Styling para Eventos",
    badge: "Ocasião Especial",
    tagline: "O look certo para a sua ocasião especial",
    description:
      "Aniversário, formatura, casamento, promoção no trabalho ou qualquer evento em que você quer chegar segura e bem vestida. Eu faço a curadoria do seu look com peças novas que você ainda pode adquirir e também com o que você já tem no closet.",
    howItWorks: [
      "Você me conta sobre o evento: data, local, dress code e como quer se sentir.",
      "Se for usar peças suas, você fotografa o que tem e me envia (te passo um passo a passo simples).",
      "Eu monto as opções de look e indico peças novas, se fizer sentido.",
      "Você recebe tudo pronto, com orientação de acessórios, calçados e caimento.",
    ],
    deliverables: [
      "Briefing personalizado sobre o evento e o seu estilo",
      "Curadoria de peças novas, com sugestões de marcas e lojas dentro do seu orçamento",
      "Montagem de looks com as peças que você já tem",
      "Até 3 opções de look para o mesmo evento, com acessórios e calçados",
      "Entrega digital, para consultar no celular",
    ],
    price: "R$ 360",
    installments: "em até 3x de R$ 120 sem juros no cartão",
    paymentTerms: "ou R$ 325 à vista no Pix",
    duration: "Consultoria pré-evento",
    modality: "Online",
    whatsappMessage:
      "Olá Mariana! Gostaria de saber mais e agendar o Styling para Eventos.",
  },
  {
    id: "personal-shopper",
    title: "Personal Shopper",
    badge: "Compras Estratégicas",
    tagline: "Compras certeiras e duradouras",
    description:
      "Conduzo você pelas lojas que selecionei para o seu estilo e o seu orçamento, orientando cada escolha. O foco é comprar bem: sem impulso, com versatilidade e peças que valem cada real.",
    deliverables: [
      "Encontro prévio (online ou presencial) para definir seu orçamento e o objetivo das compras",
      "Pré-seleção de lojas e peças antes do encontro",
      "Roteiro exclusivo com peças de alto valor e durabilidade",
      "Aprenda a reconhecer tecidos, caimentos e peças de qualidade, com noção de custo por uso, para comprar com autonomia nas próximas vezes",
      "Tempo e orçamento otimizados",
    ],
    price: "R$ 990",
    installments: "em até 4x de R$ 247,50 sem juros no cartão",
    paymentTerms: "ou R$ 890 à vista no Pix (com desconto)",
    duration: "4h de acompanhamento",
    modality: "Presencial",
    whatsappMessage:
      "Olá Mariana! Gostaria de saber mais sobre a assessoria de Personal Shopper.",
  },
];
