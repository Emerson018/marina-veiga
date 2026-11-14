# 05: Header, FAQ, Rodapé e WhatsApp com microinterações

Status: resolved

**What to build:** Refinar o movimento das seções restantes sem mudar layout nem conteúdo.

**Blocked by:** nenhuma

- [x] Header sempre visível; ao sair do hero, encolhe levemente e ganha fundo verde translúcido com desfoque.
- [x] Links e botões com mola amortecida no hover e no toque, sem quique.
- [x] FAQ: manter o acordeom atual e harmonizar as curvas com a Fluidez Editorial.
- [x] Rodapé: entrada em Revelação Sequencial.
- [x] WhatsApp flutuante: entrada atrasada após o hero e microinteração de mola; sem pulsar em loop.
- [x] Nenhum `transition: all`; animar só `transform`/`opacity`.

## Comments

- O header encolhe e ganha fundo logo que a página rola (16 px), não só ao sair do hero: um header transparente sobre conteúdo rolando ficaria ilegível. O encolhimento usa `transform`.
- O WhatsApp flutuante entra por tempo (1,6 s, depois da coreografia do hero), não por posição de rolagem.
- A mola amortecida ficou nos botões de ação. Os links de navegação usam um sublinhado com a curva de seda.
