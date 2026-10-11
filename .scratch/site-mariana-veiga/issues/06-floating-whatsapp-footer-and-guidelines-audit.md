# 06: Floating WhatsApp, Footer institucional e validação final de acessibilidade e performance

**What to build:** O botão flutuante de WhatsApp persistente e acessível, o rodapé institucional completo da marca com links e direitos autorais, e uma suíte de validação e auditoria para garantir conformidade estrita com as *Vercel Web Interface Guidelines* (sem erros de contraste, sem layout shift, anéis de foco ativos, performance e navegação completa por teclado).

**Blocked by:** 05: Showcase do Dossiê de Estilo, etapas de atendimento e FAQ acessível

**Status:** ready-for-agent

- [ ] Botão flutuante de WhatsApp fixo no canto inferior direito com `aria-label="Falar com Mariana Veiga no WhatsApp"`, estado `:focus-visible` e animação de entrada sutil.
- [ ] Rodapé institucional com assinatura tipográfica, indicação de atendimento híbrido, links de navegação e copyright.
- [ ] Auditoria com a skill `web-design-guidelines`: verificação de ausência de `transition: all`, anéis de foco visíveis em todos os elementos clicáveis e `touch-action: manipulation`.
- [ ] Verificação de ausência de CLS em imagens (todas com `width`/`height` explícitos e imagens secundárias com `loading="lazy"`).
- [ ] Teste de ponta a ponta (E2E / integração) confirmando que a aplicação roda limpa sem erros de console ou acessibilidade.
