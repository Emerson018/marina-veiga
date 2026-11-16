export interface PolicySection {
  title: string;
  content: string[];
}

export interface PolicyDocument {
  id: "termos" | "privacidade";
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const POLICIES: Record<"termos" | "privacidade", PolicyDocument> = {
  termos: {
    id: "termos",
    title: "Termos & Condições da Consultoria",
    subtitle: "Diretrizes de agendamento, atendimento e propriedade intelectual",
    lastUpdated: "Novembro de 2026",
    sections: [
      {
        title: "1. Natureza dos Serviços & Exclusividade",
        content: [
          "Mariana Veiga oferece consultoria de imagem estratégica, dress code executivo e alinhamento de estilo pessoal através de metodologia autoral. O atendimento opera sob número restrito de vagas mensais para assegurar dedicação exclusiva e personalizada a cada cliente.",
          "As sessões ocorrem no formato híbrido: diagnósticos e análises estratégicas realizados online, com etapas práticas presenciais (Closet Detox e Personal Shopper) agendadas individualmente.",
        ],
      },
      {
        title: "2. Agendamento & Política de Reagendamento (48h Úteis)",
        content: [
          "A reserva de datas para etapas presenciais e encontros online vincula o bloqueio exclusivo da agenda da consultora.",
          "Reagendamentos são permitidos sem qualquer ônus caso solicitados com antecedência mínima de 48 horas úteis, mediante alinhamento direto via WhatsApp e disponibilidade de nova data.",
          "Cancelamentos ou reagendamentos comunicados com menos de 48 horas úteis de antecedência, ou o não comparecimento na data acordada, impossibilitam a realocação da vaga e implicam na perda da respectiva sessão presencial ou aplicação de taxa de reposição operacional.",
        ],
      },
      {
        title: "3. Entregáveis & Prazos",
        content: [
          "O Dossiê de Estilo físico/digital exclusivo é elaborado individualmente e entregue em até 7 dias após o recebimento das fotos das peças ou a conclusão das etapas de análise, conforme o serviço contratado.",
          "O acompanhamento contínuo de 30 dias via WhatsApp incluso na Consultoria 360° inicia-se a partir da data de entrega do Dossiê, destinado ao esclarecimento de dúvidas pontuais na montagem de looks e ocasiões profissionais.",
        ],
      },
      {
        title: "4. Propriedade Intelectual & Uso Pessoal",
        content: [
          "Todo o material gráfico, guias, cápsulas de looks, referências e o Dossiê de Estilo disponibilizados são de titularidade autoral de Mariana Veiga Consultoria, concedidos sob licença estritamente pessoal, intransferível e perpétua à cliente contratante.",
          "É terminantemente proibida a reprodução, distribuição comercial, compartilhamento público, edição ou revenda de qualquer conteúdo entregue.",
        ],
      },
      {
        title: "5. Condições Financeiras & Pagamento",
        content: [
          "Os valores de investimento vigentes são os expressos no catálogo oficial do site na data de contratação.",
          "O pagamento pode ser efetuado à vista via Pix, ou parcelado no cartão de crédito em até 4x (ou em até 10x especificamente no pacote Consultoria 360°). A confirmação do agendamento dá-se mediante quitação da primeira parcela ou do valor integral à vista.",
        ],
      },
    ],
  },
  privacidade: {
    id: "privacidade",
    title: "Privacidade & Sigilo de Imagem",
    subtitle: "Compromisso de confidencialidade estrita e conformidade com a LGPD",
    lastUpdated: "Novembro de 2026",
    sections: [
      {
        title: "1. Cláusula de Sigilo Absoluto (Compromisso de Discrição)",
        content: [
          "Reconhecemos a intimidade e a confidencialidade inerentes à análise de armário, rotina profissional e estilo pessoal. Todas as fotos registradas durante as sessões de Closet Detox, montagem de looks, acervo pessoal e avaliações de biotipo são mantidas sob rigoroso sigilo profissional.",
          "Fica expressamente garantido que nenhuma fotografia, imagem de acervo, identificação ou registro visual da cliente será veiculado, publicado ou exposto em redes sociais, portfólios ou materiais comerciais, salvo mediante autorização prévia, expressa e por escrito da própria cliente.",
        ],
      },
      {
        title: "2. Coleta e Finalidade de Tratamento de Dados (LGPD)",
        content: [
          "Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), coletamos exclusivamente dados estritamente necessários para a prestação da consultoria: nome, número de telefone celular/WhatsApp, e-mail, preferências de rotina profissional e medições de proporções corporais.",
          "Estes dados são utilizados unicamente para: (a) contato e alinhamento de agenda; (b) formulação das diretrizes do Dossiê de Estilo; e (c) emissão dos registros financeiros/fiscais da prestação de serviços.",
        ],
      },
      {
        title: "3. Armazenamento Seguro & Não Compartilhamento",
        content: [
          "Não comercializamos, alugamos nem compartilhamos seus dados pessoais ou registros com quaisquer terceiros para fins de marketing ou publicidade.",
          "Os arquivos digitais de trabalho são armazenados em repositórios com autenticação de dois fatores e acesso exclusivo de Mariana Veiga.",
        ],
      },
      {
        title: "4. Canal Direto para Direitos da Titular",
        content: [
          "A cliente titular tem o direito de solicitar a confirmação da existência de tratamento, a correção de dados incompletos ou a exclusão de seus dados e imagens após a conclusão do serviço e o decurso dos prazos legais de guarda.",
          "Toda solicitação referente a privacidade e dados pode ser exercida diretamente através do canal oficial de atendimento via WhatsApp de Mariana Veiga.",
        ],
      },
    ],
  },
};
