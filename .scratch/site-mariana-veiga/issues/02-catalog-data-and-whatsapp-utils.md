# 02: Modelagem dos 5 serviços de consultoria e gerador de links inteligentes para WhatsApp

**What to build:** Uma camada de dados centralizada e tipada contendo os 5 serviços da consultoria (Análise de Estilo & Biótipo, Revitalização de Guarda-Roupa, Personal Shopper, Consultoria Completa 360°, Dossiê de Estilo) com títulos, descrições, entregáveis e valores tabulares, além de um utilitário puro e testado para montagem dinâmica de links do WhatsApp (`wa.me`) com mensagens codificadas em URI.

**Blocked by:** 01: Setup do projeto Next.js, tema Tailwind e tipografia editorial

**Status:** ready-for-agent

- [ ] Arquivo de dados de serviços exportando a lista tipada dos 5 serviços da consultoria.
- [ ] Cada serviço inclui identificador, título, subtítulo, entregáveis inclusos, valor placeholder formatado e mensagem pré-definida de WhatsApp.
- [ ] Utilitário de WhatsApp gera URLs válidas com número de telefone e texto codificado via `encodeURIComponent`.
- [ ] Testes unitários validando a geração correta das URLs de WhatsApp para cada um dos 5 serviços.
